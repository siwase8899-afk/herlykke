// 패턴 분석 유틸리티
import { DailyLog, SYMPTOMS, ACTIVITIES, MOOD_OPTIONS } from './logTypes';

// 기분 트렌드 데이터
export interface MoodTrendData {
  date: string;
  mood: number;
  dayOfWeek: string;
}

// 증상 빈도 데이터
export interface SymptomFrequencyData {
  symptomId: string;
  name: string;
  emoji: string;
  count: number;
  avgSeverity: number;
  percentage: number;
}

// 수면 패턴 데이터
export interface SleepPatternData {
  avgHours: number;
  avgQuality: number;
  bestDay: string | null;
  worstDay: string | null;
  qualityTrend: 'improving' | 'declining' | 'stable';
}

// 활동 상관관계 데이터
export interface ActivityCorrelationData {
  activityId: string;
  name: string;
  emoji: string;
  type: 'positive' | 'trigger';
  daysWithActivity: number;
  avgMoodWith: number;
  avgMoodWithout: number;
  impact: 'positive' | 'negative' | 'neutral';
  impactScore: number; // -2 to +2
}

// 주간 요약
export interface WeeklySummary {
  avgMood: number;
  moodTrend: 'improving' | 'declining' | 'stable';
  totalLogs: number;
  topSymptom: SymptomFrequencyData | null;
  bestActivity: ActivityCorrelationData | null;
  worstTrigger: ActivityCorrelationData | null;
}

// 기분 트렌드 계산
export function calculateMoodTrend(logs: DailyLog[]): MoodTrendData[] {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return logs
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((log) => {
      const date = new Date(log.date);
      return {
        date: log.date,
        mood: log.mood,
        dayOfWeek: dayNames[date.getDay()],
      };
    });
}

// 증상 빈도 계산
export function calculateSymptomFrequency(logs: DailyLog[]): SymptomFrequencyData[] {
  const symptomCounts: Record<string, { count: number; totalSeverity: number }> = {};

  logs.forEach((log) => {
    log.symptoms.forEach((symptom) => {
      if (!symptomCounts[symptom.symptomId]) {
        symptomCounts[symptom.symptomId] = { count: 0, totalSeverity: 0 };
      }
      symptomCounts[symptom.symptomId].count++;
      symptomCounts[symptom.symptomId].totalSeverity += symptom.severity;
    });
  });

  const totalLogs = logs.length;

  return Object.entries(symptomCounts)
    .map(([symptomId, data]) => {
      const symptom = SYMPTOMS.find((s) => s.id === symptomId);
      return {
        symptomId,
        name: symptom?.name || symptomId,
        emoji: symptom?.emoji || '❓',
        count: data.count,
        avgSeverity: data.totalSeverity / data.count,
        percentage: (data.count / totalLogs) * 100,
      };
    })
    .sort((a, b) => b.count - a.count);
}

// 수면 시간 계산 (HH:MM 형식)
function calculateSleepHours(bedTime: string, wakeTime: string): number {
  if (!bedTime || !wakeTime) return 0;

  const [bedH, bedM] = bedTime.split(':').map(Number);
  const [wakeH, wakeM] = wakeTime.split(':').map(Number);

  let bedMinutes = bedH * 60 + bedM;
  let wakeMinutes = wakeH * 60 + wakeM;

  if (wakeMinutes < bedMinutes) {
    wakeMinutes += 24 * 60;
  }

  return (wakeMinutes - bedMinutes) / 60;
}

// 수면 패턴 분석
export function analyzeSleepPattern(logs: DailyLog[]): SleepPatternData {
  const logsWithSleep = logs.filter((log) => log.sleep?.bedTime && log.sleep?.wakeTime);

  if (logsWithSleep.length === 0) {
    return {
      avgHours: 0,
      avgQuality: 0,
      bestDay: null,
      worstDay: null,
      qualityTrend: 'stable',
    };
  }

  const sleepData = logsWithSleep.map((log) => ({
    date: log.date,
    hours: calculateSleepHours(log.sleep.bedTime, log.sleep.wakeTime),
    quality: log.sleep.quality,
  }));

  const avgHours = sleepData.reduce((sum, d) => sum + d.hours, 0) / sleepData.length;
  const avgQuality = sleepData.reduce((sum, d) => sum + d.quality, 0) / sleepData.length;

  const sortedByQuality = [...sleepData].sort((a, b) => b.quality - a.quality);
  const bestDay = sortedByQuality[0]?.date || null;
  const worstDay = sortedByQuality[sortedByQuality.length - 1]?.date || null;

  // 트렌드 계산 (최근 3일 vs 이전)
  let qualityTrend: 'improving' | 'declining' | 'stable' = 'stable';
  if (sleepData.length >= 5) {
    const recent = sleepData.slice(-3);
    const earlier = sleepData.slice(0, -3);
    const recentAvg = recent.reduce((sum, d) => sum + d.quality, 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, d) => sum + d.quality, 0) / earlier.length;

    if (recentAvg - earlierAvg > 0.5) qualityTrend = 'improving';
    else if (earlierAvg - recentAvg > 0.5) qualityTrend = 'declining';
  }

  return {
    avgHours,
    avgQuality,
    bestDay,
    worstDay,
    qualityTrend,
  };
}

// 활동 상관관계 분석
export function analyzeActivityCorrelation(logs: DailyLog[]): ActivityCorrelationData[] {
  if (logs.length < 3) return [];

  const activityData: Record<string, { moodsWith: number[]; moodsWithout: number[] }> = {};

  // 모든 활동 초기화
  ACTIVITIES.forEach((activity) => {
    activityData[activity.id] = { moodsWith: [], moodsWithout: [] };
  });

  // 각 로그에서 활동별 기분 수집
  logs.forEach((log) => {
    ACTIVITIES.forEach((activity) => {
      if (log.activities.includes(activity.id)) {
        activityData[activity.id].moodsWith.push(log.mood);
      } else {
        activityData[activity.id].moodsWithout.push(log.mood);
      }
    });
  });

  return ACTIVITIES
    .filter((activity) => activityData[activity.id].moodsWith.length >= 1)
    .map((activity) => {
      const data = activityData[activity.id];
      const avgMoodWith = data.moodsWith.length > 0
        ? data.moodsWith.reduce((a, b) => a + b, 0) / data.moodsWith.length
        : 0;
      const avgMoodWithout = data.moodsWithout.length > 0
        ? data.moodsWithout.reduce((a, b) => a + b, 0) / data.moodsWithout.length
        : 0;

      const diff = avgMoodWith - avgMoodWithout;
      let impact: 'positive' | 'negative' | 'neutral' = 'neutral';
      if (diff > 0.3) impact = 'positive';
      else if (diff < -0.3) impact = 'negative';

      return {
        activityId: activity.id,
        name: activity.name,
        emoji: activity.emoji,
        type: activity.type,
        daysWithActivity: data.moodsWith.length,
        avgMoodWith,
        avgMoodWithout,
        impact,
        impactScore: Math.round(diff * 10) / 10,
      };
    })
    .sort((a, b) => Math.abs(b.impactScore) - Math.abs(a.impactScore));
}

// 주간 요약 생성
export function generateWeeklySummary(logs: DailyLog[]): WeeklySummary {
  if (logs.length === 0) {
    return {
      avgMood: 0,
      moodTrend: 'stable',
      totalLogs: 0,
      topSymptom: null,
      bestActivity: null,
      worstTrigger: null,
    };
  }

  const avgMood = logs.reduce((sum, log) => sum + log.mood, 0) / logs.length;

  // 트렌드 계산
  let moodTrend: 'improving' | 'declining' | 'stable' = 'stable';
  if (logs.length >= 4) {
    const sortedLogs = [...logs].sort((a, b) => a.date.localeCompare(b.date));
    const half = Math.floor(sortedLogs.length / 2);
    const firstHalf = sortedLogs.slice(0, half);
    const secondHalf = sortedLogs.slice(half);

    const firstAvg = firstHalf.reduce((sum, log) => sum + log.mood, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, log) => sum + log.mood, 0) / secondHalf.length;

    if (secondAvg - firstAvg > 0.3) moodTrend = 'improving';
    else if (firstAvg - secondAvg > 0.3) moodTrend = 'declining';
  }

  const symptoms = calculateSymptomFrequency(logs);
  const activities = analyzeActivityCorrelation(logs);

  const positiveActivities = activities.filter((a) => a.type === 'positive' && a.impact === 'positive');
  const negativeActivities = activities.filter((a) => a.type === 'trigger' && a.impact === 'negative');

  return {
    avgMood,
    moodTrend,
    totalLogs: logs.length,
    topSymptom: symptoms[0] || null,
    bestActivity: positiveActivities[0] || null,
    worstTrigger: negativeActivities[0] || null,
  };
}

// 리포트 가능 여부 확인
export function canGenerateReport(logs: DailyLog[]): boolean {
  return logs.length >= 7;
}

// 리포트 진행률 (7일 기준)
export function getReportProgress(logs: DailyLog[]): { current: number; target: number; percentage: number } {
  const target = 7;
  const current = Math.min(logs.length, target);
  return {
    current,
    target,
    percentage: (current / target) * 100,
  };
}

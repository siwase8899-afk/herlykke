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

// ============================
// 변화 리포트 (주간/월간 비교)
// ============================

// 증상 변화 데이터
export interface SymptomChange {
  symptomId: string;
  name: string;
  emoji: string;
  previousCount: number;
  currentCount: number;
  previousAvgSeverity: number;
  currentAvgSeverity: number;
  change: number;
  direction: 'improved' | 'worsened' | 'same';
}

// 주간 비교 데이터
export interface PeriodComparison {
  current: WeeklySummary;
  previous: WeeklySummary;
  currentPeriod: { start: string; end: string };
  previousPeriod: { start: string; end: string };
  moodChange: number;
  moodChangeDirection: 'up' | 'down' | 'same';
  symptomChanges: SymptomChange[];
  sleepChange: { hours: number; quality: number };
  insight: string;
}

// 월간 리포트 데이터
export interface MonthlyReport {
  weeks: Array<{
    weekNumber: number;
    period: { start: string; end: string };
    summary: WeeklySummary;
    sleep: SleepPatternData;
  }>;
  overallTrend: 'improving' | 'declining' | 'stable';
  totalLogs: number;
  insight: string;
}

// 날짜 유틸: N일 전 날짜 문자열
function getDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

// 주간 비교 분석 (이번 주 vs 지난 주)
export function compareWeeklyPeriods(logs: DailyLog[]): PeriodComparison | null {
  if (logs.length < 7) return null;

  const today = getDaysAgo(0);
  const weekAgo = getDaysAgo(7);
  const twoWeeksAgo = getDaysAgo(14);

  const currentLogs = logs.filter((l) => l.date > weekAgo && l.date <= today);
  const previousLogs = logs.filter((l) => l.date > twoWeeksAgo && l.date <= weekAgo);

  if (currentLogs.length === 0) return null;

  const current = generateWeeklySummary(currentLogs);
  const previous = previousLogs.length > 0
    ? generateWeeklySummary(previousLogs)
    : { avgMood: 0, moodTrend: 'stable' as const, totalLogs: 0, topSymptom: null, bestActivity: null, worstTrigger: null };

  // 기분 변화율 계산
  let moodChange = 0;
  let moodChangeDirection: 'up' | 'down' | 'same' = 'same';
  if (previous.avgMood > 0) {
    moodChange = Math.round(((current.avgMood - previous.avgMood) / previous.avgMood) * 100);
    if (moodChange > 5) moodChangeDirection = 'up';
    else if (moodChange < -5) moodChangeDirection = 'down';
  }

  // 증상 변화 계산
  const currentSymptoms = calculateSymptomFrequency(currentLogs);
  const previousSymptoms = calculateSymptomFrequency(previousLogs);

  const allSymptomIds = new Set([
    ...currentSymptoms.map((s) => s.symptomId),
    ...previousSymptoms.map((s) => s.symptomId),
  ]);

  const symptomChanges: SymptomChange[] = Array.from(allSymptomIds).map((symptomId) => {
    const curr = currentSymptoms.find((s) => s.symptomId === symptomId);
    const prev = previousSymptoms.find((s) => s.symptomId === symptomId);
    const symptom = SYMPTOMS.find((s) => s.id === symptomId);

    const currentCount = curr?.count || 0;
    const previousCount = prev?.count || 0;
    const change = currentCount - previousCount;

    let direction: 'improved' | 'worsened' | 'same' = 'same';
    if (change < 0) direction = 'improved';
    else if (change > 0) direction = 'worsened';

    return {
      symptomId,
      name: symptom?.name || symptomId,
      emoji: symptom?.emoji || '❓',
      previousCount,
      currentCount,
      previousAvgSeverity: prev?.avgSeverity || 0,
      currentAvgSeverity: curr?.avgSeverity || 0,
      change,
      direction,
    };
  }).sort((a, b) => Math.abs(b.change) - Math.abs(a.change));

  // 수면 변화 계산
  const currentSleep = analyzeSleepPattern(currentLogs);
  const previousSleep = analyzeSleepPattern(previousLogs);

  const sleepChange = {
    hours: Math.round((currentSleep.avgHours - previousSleep.avgHours) * 10) / 10,
    quality: Math.round((currentSleep.avgQuality - previousSleep.avgQuality) * 10) / 10,
  };

  // 규칙 기반 인사이트 생성
  const insight = generateChangeInsight(moodChangeDirection, symptomChanges, sleepChange);

  return {
    current,
    previous,
    currentPeriod: { start: weekAgo, end: today },
    previousPeriod: { start: twoWeeksAgo, end: weekAgo },
    moodChange,
    moodChangeDirection,
    symptomChanges,
    sleepChange,
    insight,
  };
}

// 월간 리포트 생성 (4주간 주차별 분석)
export function generateMonthlyReport(logs: DailyLog[]): MonthlyReport | null {
  if (logs.length < 14) return null;

  const weeks: MonthlyReport['weeks'] = [];

  for (let i = 0; i < 4; i++) {
    const weekEnd = getDaysAgo(i * 7);
    const weekStart = getDaysAgo((i + 1) * 7);
    const weekLogs = logs.filter((l) => l.date > weekStart && l.date <= weekEnd);

    if (weekLogs.length > 0) {
      weeks.unshift({
        weekNumber: 4 - i,
        period: { start: weekStart, end: weekEnd },
        summary: generateWeeklySummary(weekLogs),
        sleep: analyzeSleepPattern(weekLogs),
      });
    }
  }

  if (weeks.length < 2) return null;

  // 전체 트렌드 계산
  const firstWeekMood = weeks[0]?.summary.avgMood || 0;
  const lastWeekMood = weeks[weeks.length - 1]?.summary.avgMood || 0;
  let overallTrend: 'improving' | 'declining' | 'stable' = 'stable';
  if (lastWeekMood - firstWeekMood > 0.3) overallTrend = 'improving';
  else if (firstWeekMood - lastWeekMood > 0.3) overallTrend = 'declining';

  const totalLogs = weeks.reduce((sum, w) => sum + w.summary.totalLogs, 0);

  const insight = overallTrend === 'improving'
    ? '한 달간 전반적으로 컨디션이 좋아지고 있어요. 꾸준히 기록하면서 좋은 패턴을 유지해보세요.'
    : overallTrend === 'declining'
    ? '최근 컨디션이 예전보다 힘들 수 있어요. 무리하지 말고 쉬는 것도 중요해요.'
    : '한 달간 비교적 안정적인 상태를 유지하고 있어요. 지금의 패턴을 잘 기억해두세요.';

  return { weeks, overallTrend, totalLogs, insight };
}

// 변화 인사이트 생성 (규칙 기반)
function generateChangeInsight(
  moodDirection: 'up' | 'down' | 'same',
  symptomChanges: SymptomChange[],
  sleepChange: { hours: number; quality: number }
): string {
  const improved = symptomChanges.filter((s) => s.direction === 'improved');
  const worsened = symptomChanges.filter((s) => s.direction === 'worsened');

  if (moodDirection === 'up' && improved.length > 0) {
    return `기분이 좋아지고, ${improved[0].name}도 줄어들고 있어요. 지금 하고 있는 것들이 도움이 되고 있는 것 같아요.`;
  }
  if (moodDirection === 'up' && sleepChange.quality > 0) {
    return '기분과 수면 모두 개선되고 있어요. 이 흐름을 유지해보세요.';
  }
  if (moodDirection === 'down' && worsened.length > 0) {
    return `${worsened[0].name}이(가) 늘었어요. 무리하지 않는 선에서 관리해보세요.`;
  }
  if (sleepChange.quality > 0.5) {
    return '수면의 질이 좋아지고 있어요. 잠을 잘 자는 것이 증상 관리에 큰 도움이 돼요.';
  }
  if (sleepChange.quality < -0.5) {
    return '수면이 불안정해지고 있어요. 자기 전 루틴을 점검해보세요.';
  }
  if (improved.length > 0) {
    return `${improved[0].name}이(가) 줄어들고 있어요. 좋은 변화예요.`;
  }
  return '꾸준히 기록하고 있어요. 기록이 쌓일수록 더 정확한 패턴을 찾을 수 있어요.';
}

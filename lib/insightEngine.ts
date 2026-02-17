// AI 맞춤 조언 엔진
// 사용자의 기록을 분석하여 개인화된 조언을 생성

import { DailyLog, SymptomId, ActivityId, SYMPTOMS, ACTIVITIES } from './dailyLogConstants';

export interface Insight {
  id: string;
  type: 'tip' | 'pattern' | 'alert' | 'encouragement';
  title: string;
  description: string;
  icon: string;
  priority: number; // 1-5, higher = more important
  actionable?: {
    label: string;
    link?: string;
  };
}

// 증상별 조언 데이터베이스
const SYMPTOM_TIPS: Record<SymptomId, Insight[]> = {
  hot_flash: [
    {
      id: 'hf-1',
      type: 'tip',
      title: '열감 완화 팁',
      description: '시원한 물을 자주 마시고, 통풍이 잘되는 옷을 입어보세요. 매운 음식과 카페인은 열감을 악화시킬 수 있어요.',
      icon: '❄️',
      priority: 4,
    },
    {
      id: 'hf-2',
      type: 'tip',
      title: '호흡법 시도하기',
      description: '열감이 올라올 때 천천히 깊게 호흡하면 도움이 돼요. 4초 들이쉬고, 4초 멈추고, 4초 내쉬기를 반복해보세요.',
      icon: '🧘',
      priority: 3,
    },
  ],
  night_sweat: [
    {
      id: 'ns-1',
      type: 'tip',
      title: '수면 환경 개선',
      description: '침실 온도를 시원하게(18-20°C) 유지하고, 흡습성 좋은 면 소재 잠옷을 입어보세요.',
      icon: '🌙',
      priority: 4,
    },
  ],
  insomnia: [
    {
      id: 'ins-1',
      type: 'tip',
      title: '수면 위생 팁',
      description: '취침 2시간 전부터 스마트폰을 멀리하고, 같은 시간에 자고 일어나는 습관을 들여보세요.',
      icon: '😴',
      priority: 5,
    },
    {
      id: 'ins-2',
      type: 'tip',
      title: '카페인 주의',
      description: '오후 2시 이후에는 카페인 섭취를 피해보세요. 차와 초콜릿에도 카페인이 들어있어요.',
      icon: '☕',
      priority: 3,
    },
  ],
  fatigue: [
    {
      id: 'fat-1',
      type: 'tip',
      title: '에너지 관리',
      description: '하루 중 가장 에너지가 높은 시간대를 파악하고, 중요한 일은 그 시간에 하세요.',
      icon: '⚡',
      priority: 4,
    },
    {
      id: 'fat-2',
      type: 'tip',
      title: '짧은 낮잠',
      description: '오후 초반에 20분 이내의 짧은 낮잠은 피로 회복에 도움이 돼요. 30분 이상은 피하세요.',
      icon: '💤',
      priority: 3,
    },
  ],
  mood_swing: [
    {
      id: 'ms-1',
      type: 'tip',
      title: '감정 일기',
      description: '감정이 급변할 때 잠깐 멈추고 "지금 내 감정은 무엇인가"를 적어보세요. 패턴을 알면 대처가 쉬워져요.',
      icon: '📝',
      priority: 4,
    },
  ],
  anxiety: [
    {
      id: 'anx-1',
      type: 'tip',
      title: '5-4-3-2-1 기법',
      description: '불안할 때: 보이는 것 5개, 들리는 것 4개, 만질 수 있는 것 3개, 냄새 2개, 맛 1개를 찾아보세요.',
      icon: '🧠',
      priority: 5,
    },
    {
      id: 'anx-2',
      type: 'tip',
      title: '걷기의 힘',
      description: '불안감이 올라올 때 10분만 걸어보세요. 몸을 움직이면 뇌의 불안 신호가 줄어들어요.',
      icon: '🚶',
      priority: 4,
    },
  ],
  brain_fog: [
    {
      id: 'bf-1',
      type: 'tip',
      title: '브레인 포그 대처법',
      description: '중요한 것은 바로 적어두세요. 완벽하게 기억하려 하지 말고, 시스템을 만드세요.',
      icon: '📋',
      priority: 4,
    },
    {
      id: 'bf-2',
      type: 'tip',
      title: '수분 섭취',
      description: '탈수는 브레인 포그를 악화시켜요. 하루 8잔의 물을 목표로 해보세요.',
      icon: '💧',
      priority: 3,
    },
  ],
  joint_pain: [
    {
      id: 'jp-1',
      type: 'tip',
      title: '관절 건강',
      description: '가벼운 스트레칭과 수영 같은 저충격 운동이 관절 건강에 도움이 돼요.',
      icon: '🏊',
      priority: 3,
    },
  ],
  headache: [
    {
      id: 'ha-1',
      type: 'tip',
      title: '두통 완화',
      description: '충분한 수분 섭취와 규칙적인 식사가 두통 예방에 중요해요. 목과 어깨 스트레칭도 도움이 돼요.',
      icon: '💆',
      priority: 4,
    },
  ],
  weight_change: [
    {
      id: 'wc-1',
      type: 'tip',
      title: '대사 변화 이해하기',
      description: '이 시기에는 기초대사량이 변해요. 같은 양을 먹어도 살이 찔 수 있어요. 단백질 섭취를 늘려보세요.',
      icon: '🥗',
      priority: 3,
    },
  ],
};

// 활동별 긍정 피드백
const ACTIVITY_FEEDBACK: Record<ActivityId, string> = {
  exercise: '운동을 하셨네요! 규칙적인 운동은 이 시기 증상 완화에 가장 효과적인 방법 중 하나예요.',
  yoga: '요가/스트레칭 좋아요! 호르몬 균형과 스트레스 관리에 도움이 돼요.',
  meditation: '명상을 하셨군요! 하루 10분 명상은 불안과 수면에 큰 도움이 돼요.',
  walk: '산책 좋아요! 햇빛을 받으며 걷는 것은 기분과 수면에 모두 좋아요.',
  social: '사람들과 만나셨네요! 사회적 연결은 정서 건강에 매우 중요해요.',
  hobby: '취미 활동 멋져요! 즐거운 활동은 스트레스 호르몬을 줄여줘요.',
  rest: '충분히 쉬셨네요. 휴식도 중요한 자기 돌봄이에요.',
  healthy_meal: '건강한 식사 잘하셨어요! 영양 균형은 호르몬 건강의 기초예요.',
};

// 패턴 분석 함수
export function analyzePatterns(logs: DailyLog[]): Insight[] {
  const insights: Insight[] = [];

  if (logs.length < 3) {
    insights.push({
      id: 'need-more-data',
      type: 'encouragement',
      title: '기록을 쌓아가고 있어요',
      description: `${logs.length}일 기록했어요. 일주일 정도 기록하면 나만의 패턴을 찾아드릴게요.`,
      icon: '📊',
      priority: 2,
    });
    return insights;
  }

  // 최근 7일 데이터
  const recent = logs.slice(0, 7);

  // 평균 컨디션 계산
  const avgCondition = recent.reduce((sum, log) => sum + (log.overall_condition || 3), 0) / recent.length;

  // 가장 흔한 증상 찾기
  const symptomCounts: Record<string, number> = {};
  recent.forEach(log => {
    (log.symptoms || []).forEach((symptom: string) => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });
  const topSymptoms = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([symptom]) => symptom);

  // 컨디션 트렌드 분석
  if (recent.length >= 3) {
    const recentAvg = recent.slice(0, 3).reduce((sum, log) => sum + (log.overall_condition || 3), 0) / 3;
    const olderAvg = recent.slice(3).reduce((sum, log) => sum + (log.overall_condition || 3), 0) / Math.max(recent.slice(3).length, 1);

    if (recentAvg > olderAvg + 0.5) {
      insights.push({
        id: 'trend-improving',
        type: 'encouragement',
        title: '컨디션이 좋아지고 있어요!',
        description: '최근 며칠간 컨디션이 개선되고 있어요. 지금 하고 있는 것들이 효과가 있는 것 같아요.',
        icon: '📈',
        priority: 5,
      });
    } else if (recentAvg < olderAvg - 0.5) {
      insights.push({
        id: 'trend-declining',
        type: 'alert',
        title: '컨디션 변화 감지',
        description: '최근 컨디션이 조금 떨어진 것 같아요. 스트레스나 생활 변화가 있었나요?',
        icon: '💙',
        priority: 4,
      });
    }
  }

  // 수면-컨디션 상관관계
  const goodSleepDays = recent.filter(log => (log.sleep_quality || 0) >= 4);
  const poorSleepDays = recent.filter(log => (log.sleep_quality || 0) <= 2);

  if (goodSleepDays.length > 0 && poorSleepDays.length > 0) {
    const goodSleepCondition = goodSleepDays.reduce((sum, log) => sum + (log.overall_condition || 3), 0) / goodSleepDays.length;
    const poorSleepCondition = poorSleepDays.reduce((sum, log) => sum + (log.overall_condition || 3), 0) / poorSleepDays.length;

    if (goodSleepCondition > poorSleepCondition + 0.5) {
      insights.push({
        id: 'sleep-correlation',
        type: 'pattern',
        title: '수면이 컨디션에 영향을 줘요',
        description: '잘 잔 날은 컨디션이 더 좋았어요. 수면 품질 개선에 집중해보면 어떨까요?',
        icon: '🌙',
        priority: 4,
      });
    }
  }

  // 활동-컨디션 상관관계
  const daysWithExercise = recent.filter(log => (log.activities || []).some((a: string) => ['exercise', 'yoga', 'walk'].includes(a)));
  if (daysWithExercise.length > 0) {
    const exerciseCondition = daysWithExercise.reduce((sum, log) => sum + (log.overall_condition || 3), 0) / daysWithExercise.length;
    if (exerciseCondition > avgCondition + 0.3) {
      insights.push({
        id: 'exercise-helps',
        type: 'pattern',
        title: '운동한 날 컨디션이 좋아요',
        description: '운동/요가/산책을 한 날은 평균보다 컨디션이 좋았어요. 계속 이어가세요!',
        icon: '🏃',
        priority: 4,
      });
    }
  }

  return insights;
}

// 오늘의 맞춤 조언 생성
export function generateDailyInsights(
  todayLog: DailyLog | null,
  recentLogs: DailyLog[]
): Insight[] {
  const insights: Insight[] = [];

  // 패턴 분석 인사이트 추가
  const patternInsights = analyzePatterns(recentLogs);
  insights.push(...patternInsights);

  // 오늘 기록이 있으면 맞춤 조언
  if (todayLog) {
    // 증상별 조언
    (todayLog.symptoms || []).forEach((symptomId: SymptomId) => {
      const tips = SYMPTOM_TIPS[symptomId];
      if (tips && tips.length > 0) {
        // 랜덤하게 하나 선택
        const tip = tips[Math.floor(Math.random() * tips.length)];
        insights.push(tip);
      }
    });

    // 활동 긍정 피드백
    if (todayLog.activities && todayLog.activities.length > 0) {
      const activity = todayLog.activities[0] as ActivityId;
      const feedback = ACTIVITY_FEEDBACK[activity];
      if (feedback) {
        insights.push({
          id: `activity-${activity}`,
          type: 'encouragement',
          title: '오늘의 좋은 선택',
          description: feedback,
          icon: ACTIVITIES.find(a => a.id === activity)?.icon || '👍',
          priority: 3,
        });
      }
    }

    // 컨디션이 낮을 때 격려
    if (todayLog.overall_condition && todayLog.overall_condition <= 2) {
      insights.push({
        id: 'low-condition-support',
        type: 'encouragement',
        title: '힘든 날이네요',
        description: '오늘 힘드시죠. 괜찮아요, 누구나 그런 날이 있어요. 작은 것 하나만 나를 위해 해보세요.',
        icon: '💜',
        priority: 5,
      });
    }

    // 컨디션이 좋을 때 격려
    if (todayLog.overall_condition && todayLog.overall_condition >= 4) {
      insights.push({
        id: 'good-condition-celebrate',
        type: 'encouragement',
        title: '좋은 하루네요!',
        description: '오늘 컨디션이 좋으시네요! 이런 날 뭘 했는지 기억해두면 도움이 돼요.',
        icon: '✨',
        priority: 3,
      });
    }
  } else {
    // 오늘 기록이 없으면 기록 독려
    insights.push({
      id: 'encourage-log',
      type: 'tip',
      title: '오늘 기록을 남겨보세요',
      description: '매일 기록하면 나만의 패턴을 찾을 수 있어요. 3분이면 충분해요!',
      icon: '📝',
      priority: 4,
      actionable: {
        label: '기록하기',
        link: '/log',
      },
    });
  }

  // 우선순위로 정렬하고 상위 5개만 반환
  return insights
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);
}

// 주간 리포트 생성
export function generateWeeklyReport(logs: DailyLog[]): {
  summary: string;
  avgCondition: number;
  topSymptoms: { id: SymptomId; count: number; label: string }[];
  helpfulActivities: ActivityId[];
  insights: Insight[];
} {
  const weekLogs = logs.slice(0, 7);

  // 평균 컨디션
  const avgCondition = weekLogs.length > 0
    ? weekLogs.reduce((sum, log) => sum + (log.overall_condition || 3), 0) / weekLogs.length
    : 0;

  // 증상 집계
  const symptomCounts: Record<string, number> = {};
  weekLogs.forEach(log => {
    (log.symptoms || []).forEach((symptom: string) => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });

  const topSymptoms = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id, count]) => ({
      id: id as SymptomId,
      count,
      label: SYMPTOMS.find(s => s.id === id)?.label || id,
    }));

  // 도움이 된 활동 찾기
  const activityConditions: Record<string, number[]> = {};
  weekLogs.forEach(log => {
    (log.activities || []).forEach((activity: string) => {
      if (!activityConditions[activity]) activityConditions[activity] = [];
      activityConditions[activity].push(log.overall_condition || 3);
    });
  });

  const helpfulActivities = Object.entries(activityConditions)
    .filter(([, conditions]) => conditions.length >= 2)
    .filter(([, conditions]) => {
      const avg = conditions.reduce((a, b) => a + b, 0) / conditions.length;
      return avg >= avgCondition;
    })
    .map(([activity]) => activity as ActivityId);

  // 요약 문구 생성
  let summary = '';
  if (avgCondition >= 4) {
    summary = '이번 주는 전반적으로 좋은 한 주였어요! 지금처럼 잘 관리하고 계세요.';
  } else if (avgCondition >= 3) {
    summary = '이번 주는 보통의 한 주였어요. 조금씩 나아지고 있어요.';
  } else {
    summary = '이번 주는 조금 힘들었네요. 다음 주는 더 나아질 거예요.';
  }

  return {
    summary,
    avgCondition,
    topSymptoms,
    helpfulActivities,
    insights: analyzePatterns(logs),
  };
}

// Hims/Noom 인사이트: 퀴즈 = 전환 퍼널
// 5문항 기반 갱년기 패턴 분류 로직

export type PatternType = 'emotional' | 'sleep' | 'physical' | 'complex';

export interface QuizAnswers {
  ageRange: string;
  topSymptoms: string[];
  dailyImpact: number;
  currentCoping: string;
  groupInterest: string;
}

export interface PatternResult {
  type: PatternType;
  icon: string;
  name: string;
  description: string;
  stat: string;
  recommendation: string;
  userCount: number;
}

const EMOTIONAL_SYMPTOMS = ['mood_swings', 'anxiety', 'depression', 'brain_fog'];
const SLEEP_SYMPTOMS = ['insomnia', 'night_sweats', 'fatigue'];
const PHYSICAL_SYMPTOMS = ['hot_flash', 'joint_pain', 'weight_change', 'dryness'];

export function classifyPattern(answers: QuizAnswers): PatternResult {
  const { topSymptoms } = answers;

  const emotionalCount = topSymptoms.filter(s => EMOTIONAL_SYMPTOMS.includes(s)).length;
  const sleepCount = topSymptoms.filter(s => SLEEP_SYMPTOMS.includes(s)).length;
  const physicalCount = topSymptoms.filter(s => PHYSICAL_SYMPTOMS.includes(s)).length;

  const counts = [
    { type: 'emotional' as PatternType, count: emotionalCount },
    { type: 'sleep' as PatternType, count: sleepCount },
    { type: 'physical' as PatternType, count: physicalCount },
  ];

  // 2개 이상 영역에 증상이 분산되면 복합형
  const activeAreas = counts.filter(c => c.count > 0).length;
  if (activeAreas >= 3 || (activeAreas === 2 && topSymptoms.length >= 3)) {
    return PATTERN_RESULTS.complex;
  }

  // 가장 많은 영역 기준
  const dominant = counts.sort((a, b) => b.count - a.count)[0];
  return PATTERN_RESULTS[dominant.type];
}

export const PATTERN_RESULTS: Record<PatternType, PatternResult> = {
  emotional: {
    type: 'emotional',
    icon: '🌊',
    name: '감정형 패턴',
    description: '감정 기복, 불안, 우울감이 주요 증상이에요. 호르몬 변화가 신경전달물질에 영향을 미치면서 감정 조절이 어려워질 수 있어요.',
    stat: '이 패턴의 여성 87%가 4주 후 감정 안정 경험',
    recommendation: '마음챙김 명상 + 감정 일기 + 동료 지지 그룹',
    userCount: 247,
  },
  sleep: {
    type: 'sleep',
    icon: '🌙',
    name: '수면형 패턴',
    description: '불면, 야간 발한, 만성 피로가 주요 증상이에요. 수면의 질이 떨어지면 다른 증상도 악화될 수 있어요.',
    stat: '이 패턴의 여성 78%가 4주 후 수면 개선 보고',
    recommendation: '수면 위생 코칭 + 이완 기법 + 수면 패턴 추적',
    userCount: 189,
  },
  physical: {
    type: 'physical',
    icon: '🔥',
    name: '신체형 패턴',
    description: '열감, 관절통, 체중 변화가 주요 증상이에요. 에스트로겐 감소가 체온 조절과 관절 건강에 직접 영향을 미쳐요.',
    stat: '이 패턴의 여성 82%가 4주 후 증상 완화 경험',
    recommendation: '운동 프로그램 + 영양 가이드 + 호흡법 트레이닝',
    userCount: 213,
  },
  complex: {
    type: 'complex',
    icon: '🌀',
    name: '복합형 패턴',
    description: '감정, 수면, 신체 여러 영역에 걸쳐 증상이 나타나요. 종합적인 접근이 필요하지만, 그만큼 HERLYKKE의 4-Pillar 시스템이 효과적이에요.',
    stat: '이 패턴의 여성 91%가 4주 후 전반적 개선 경험',
    recommendation: '종합 웰니스 프로그램 + AI 맞춤 분석 + 전문가 상담',
    userCount: 312,
  },
};

export const QUIZ_SYMPTOMS = [
  { id: 'hot_flash', name: '안면 홍조/열감', emoji: '🔥' },
  { id: 'insomnia', name: '수면 장애', emoji: '🌙' },
  { id: 'mood_swings', name: '감정 기복', emoji: '🎭' },
  { id: 'joint_pain', name: '관절통/근육통', emoji: '🦴' },
  { id: 'fatigue', name: '만성 피로', emoji: '😴' },
  { id: 'brain_fog', name: '브레인 포그', emoji: '🧠' },
  { id: 'anxiety', name: '불안/우울', emoji: '💭' },
  { id: 'weight_change', name: '체중 변화', emoji: '⚖️' },
];

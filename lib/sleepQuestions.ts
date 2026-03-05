// 수면 온보딩 5문항 — v9 기준
// 갱년기 시그널을 자연스럽게 감지하는 구조

export interface SleepOption {
  id: string;
  label: string;
  emoji?: string;
  signal?: 'menopause' | 'chronic' | 'normal'; // 내부 분류용
}

export interface SleepQuestion {
  id: string;
  section: number; // 1-5
  question: string;
  subtext?: string;
  type: 'single' | 'multi' | 'scale' | 'duration';
  options: SleepOption[];
}

export const SLEEP_QUESTIONS: SleepQuestion[] = [
  {
    id: 'q1_pattern',
    section: 1,
    question: '요즘 잠이 어떠세요?',
    subtext: '가장 가까운 것을 골라주세요',
    type: 'single',
    options: [
      { id: 'hard_to_fall', label: '잠들기까지 시간이 너무 오래 걸려요', emoji: '😶‍🌫️' },
      { id: 'wake_up_middle', label: '새벽에 자꾸 깨요', emoji: '😳', signal: 'menopause' },
      { id: 'early_wake', label: '너무 일찍 깨고 다시 못 자요', emoji: '😩' },
      { id: 'not_refreshed', label: '자도 잔 것 같지 않아요', emoji: '😪', signal: 'chronic' },
    ],
  },
  {
    id: 'q2_menopause_signal',
    section: 2,
    question: '잠자리에서 이런 경험이 있으신가요?',
    subtext: '해당되는 것을 모두 골라주세요',
    type: 'multi',
    options: [
      { id: 'hot_flash', label: '갑자기 몸이 확 달아오른다', emoji: '🔥', signal: 'menopause' },
      { id: 'night_sweat', label: '자다가 땀이 나서 깬다', emoji: '💦', signal: 'menopause' },
      { id: 'heart_racing', label: '심장이 두근거린다', emoji: '💓', signal: 'menopause' },
      { id: 'none_above', label: '해당 없음', emoji: '✌️' },
    ],
  },
  {
    id: 'q3_duration',
    section: 3,
    question: '수면 문제가 언제부터 시작됐나요?',
    subtext: '대략적으로 괜찮아요',
    type: 'duration',
    options: [
      { id: 'recent_1month', label: '최근 한 달 이내', emoji: '🌱' },
      { id: '3to6months', label: '3-6개월 됐어요', emoji: '🌿' },
      { id: 'over_6months', label: '6개월 이상', emoji: '🌳', signal: 'chronic' },
      { id: 'always', label: '원래 잠을 못 자는 편이에요', emoji: '😮‍💨', signal: 'chronic' },
    ],
  },
  {
    id: 'q4_tried',
    section: 4,
    question: '지금까지 시도해 본 방법이 있나요?',
    subtext: '해당되는 것을 모두 골라주세요',
    type: 'multi',
    options: [
      { id: 'magnesium', label: '마그네슘 등 영양제', emoji: '💊' },
      { id: 'yoga_stretch', label: '요가나 스트레칭', emoji: '🧘‍♀️' },
      { id: 'aroma', label: '아로마·족욕', emoji: '🕯️' },
      { id: 'nothing', label: '아직 뭘 해봐야 할지 모르겠어요', emoji: '🤷‍♀️' },
    ],
  },
  {
    id: 'q5_interest',
    section: 5,
    question: '수면 개선에 가장 관심 있는 분야는요?',
    subtext: '맞춤 레시피를 추천해 드려요',
    type: 'single',
    options: [
      { id: 'nutrition', label: '영양제·식품', emoji: '🌿' },
      { id: 'yoga_relax', label: '요가·이완법', emoji: '🧘‍♀️' },
      { id: 'environment', label: '수면 환경 (침구·조명)', emoji: '🌙' },
      { id: 'routine', label: '잠자리 루틴', emoji: '📓' },
    ],
  },
];

// 답변 기반 수면 유형 분류
export type SleepType = 'menopause_related' | 'chronic_insomnia' | 'general_sleep';

export interface SleepProfile {
  type: SleepType;
  label: string;
  description: string;
  recommendedCategories: string[];
}

export const SLEEP_PROFILES: Record<SleepType, SleepProfile> = {
  menopause_related: {
    type: 'menopause_related',
    label: '호르몬 변화형 수면장애',
    description: '갱년기 호르몬 변화와 관련된 수면 문제일 수 있어요. 비슷한 경험을 먼저 겪은 언니들이 많아요.',
    recommendedCategories: ['yoga_relax', 'nutrition', 'environment'],
  },
  chronic_insomnia: {
    type: 'chronic_insomnia',
    label: '만성 수면 부족형',
    description: '오래된 수면 문제로 몸이 지쳐있을 수 있어요. 루틴부터 하나씩 바꿔가는 게 효과적이에요.',
    recommendedCategories: ['routine', 'nutrition', 'yoga_relax'],
  },
  general_sleep: {
    type: 'general_sleep',
    label: '수면 개선 시작형',
    description: '아직 심각하지 않지만 지금 관리하면 뇌 건강까지 지킬 수 있어요.',
    recommendedCategories: ['routine', 'environment', 'yoga_relax'],
  },
};

export function classifySleepType(answers: Record<string, string | string[]>): SleepType {
  const q2 = answers['q2_menopause_signal'];
  const hasMenopauseSignal = Array.isArray(q2)
    ? q2.some((v) => ['hot_flash', 'night_sweat', 'heart_racing'].includes(v))
    : false;

  const q3 = answers['q3_duration'];
  const isChronic = q3 === 'over_6months' || q3 === 'always';

  const q1 = answers['q1_pattern'];
  const hasWakeUp = q1 === 'wake_up_middle';

  if (hasMenopauseSignal || hasWakeUp) return 'menopause_related';
  if (isChronic) return 'chronic_insomnia';
  return 'general_sleep';
}

// 데일리 로그 타입 정의

export interface SymptomEntry {
  symptomId: string;
  severity: 1 | 2 | 3 | 4 | 5;
}

export interface SleepEntry {
  bedTime: string;    // "22:30"
  wakeTime: string;   // "06:30"
  quality: 1 | 2 | 3 | 4 | 5;
}

export interface DailyLog {
  id: string;
  date: string; // "2026-02-15"

  // 컨디션 (1-5)
  mood: 1 | 2 | 3 | 4 | 5;

  // 감정 태그 (복수 선택)
  moodTags: string[];

  // 증상
  symptoms: SymptomEntry[];

  // 수면
  sleep: SleepEntry;

  // 활동/트리거
  activities: string[];

  // 메모
  note?: string;

  createdAt: string;
}

// 증상 정의
export interface Symptom {
  id: string;
  name: string;
  emoji: string;
  category: 'physical' | 'emotional' | 'cognitive';
}

// 활동 정의
export interface Activity {
  id: string;
  name: string;
  emoji: string;
  type: 'positive' | 'trigger';
  category: 'physical' | 'mental' | 'selfcare' | 'social' | 'trigger';
}

// 증상 목록
export const SYMPTOMS: Symptom[] = [
  { id: 'hot_flash', name: '핫플래시', emoji: '🔥', category: 'physical' },
  { id: 'night_sweat', name: '식은땀', emoji: '💦', category: 'physical' },
  { id: 'insomnia', name: '수면장애', emoji: '😴', category: 'physical' },
  { id: 'joint_pain', name: '관절통', emoji: '💪', category: 'physical' },
  { id: 'headache', name: '두통', emoji: '🤕', category: 'physical' },
  { id: 'fatigue', name: '피로감', emoji: '😩', category: 'physical' },
  { id: 'dry_skin', name: '피부건조', emoji: '🏜️', category: 'physical' },
  { id: 'palpitation', name: '두근거림', emoji: '💓', category: 'physical' },
  { id: 'weight_gain', name: '체중 변화', emoji: '⚖️', category: 'physical' },
  { id: 'bloating', name: '복부팽만', emoji: '🫠', category: 'physical' },
  { id: 'brain_fog', name: '브레인포그', emoji: '🧠', category: 'cognitive' },
  { id: 'mood_swings', name: '감정기복', emoji: '😢', category: 'emotional' },
  { id: 'anxiety', name: '불안감', emoji: '😰', category: 'emotional' },
  { id: 'irritability', name: '짜증', emoji: '😤', category: 'emotional' },
  { id: 'low_libido', name: '성욕 저하', emoji: '💔', category: 'emotional' },
];

// 활동 목록
export const ACTIVITIES: Activity[] = [
  // 신체 활동
  { id: 'exercise', name: '운동', emoji: '🏃', type: 'positive', category: 'physical' },
  { id: 'yoga', name: '요가/스트레칭', emoji: '🧘‍♀️', type: 'positive', category: 'physical' },
  { id: 'walk', name: '산책', emoji: '🚶', type: 'positive', category: 'physical' },
  { id: 'swimming', name: '수영/수중운동', emoji: '🏊', type: 'positive', category: 'physical' },
  { id: 'strength', name: '근력 운동', emoji: '💪', type: 'positive', category: 'physical' },
  // 정신 건강
  { id: 'meditation', name: '명상', emoji: '🧘', type: 'positive', category: 'mental' },
  { id: 'breathing', name: '호흡 운동', emoji: '🌬️', type: 'positive', category: 'mental' },
  { id: 'journaling', name: '일기/저널링', emoji: '📝', type: 'positive', category: 'mental' },
  { id: 'reading', name: '독서', emoji: '📖', type: 'positive', category: 'mental' },
  { id: 'hobby', name: '취미활동', emoji: '🎨', type: 'positive', category: 'mental' },
  // 셀프케어
  { id: 'bath', name: '반신욕/족욕', emoji: '🛁', type: 'positive', category: 'selfcare' },
  { id: 'supplement', name: '영양제 복용', emoji: '💊', type: 'positive', category: 'selfcare' },
  { id: 'hydration', name: '충분한 수분', emoji: '💧', type: 'positive', category: 'selfcare' },
  { id: 'skincare', name: '피부 관리', emoji: '✨', type: 'positive', category: 'selfcare' },
  // 사회적 활동
  { id: 'social', name: '친구/모임', emoji: '👭', type: 'positive', category: 'social' },
  { id: 'nature', name: '자연 속 시간', emoji: '🌿', type: 'positive', category: 'social' },
  // 트리거
  { id: 'alcohol', name: '음주', emoji: '🍷', type: 'trigger', category: 'trigger' },
  { id: 'caffeine', name: '카페인', emoji: '☕', type: 'trigger', category: 'trigger' },
  { id: 'spicy_food', name: '매운 음식', emoji: '🌶️', type: 'trigger', category: 'trigger' },
  { id: 'late_meal', name: '야식', emoji: '🍜', type: 'trigger', category: 'trigger' },
  { id: 'stress', name: '스트레스', emoji: '😰', type: 'trigger', category: 'trigger' },
  { id: 'sleep_lack', name: '수면 부족', emoji: '😵', type: 'trigger', category: 'trigger' },
  { id: 'screen_time', name: '스크린타임', emoji: '📱', type: 'trigger', category: 'trigger' },
  { id: 'overwork', name: '과로', emoji: '🏢', type: 'trigger', category: 'trigger' },
];

// 기분 이모지
export const MOOD_OPTIONS = [
  { value: 1, emoji: '😫', label: '매우 안좋음' },
  { value: 2, emoji: '😕', label: '안좋음' },
  { value: 3, emoji: '😐', label: '보통' },
  { value: 4, emoji: '🙂', label: '좋음' },
  { value: 5, emoji: '😊', label: '매우 좋음' },
] as const;

// 수면 품질 이모지
export const SLEEP_QUALITY_OPTIONS = [
  { value: 1, emoji: '😵', label: '매우 안좋음' },
  { value: 2, emoji: '😴', label: '안좋음' },
  { value: 3, emoji: '😐', label: '보통' },
  { value: 4, emoji: '😌', label: '좋음' },
  { value: 5, emoji: '😇', label: '매우 좋음' },
] as const;

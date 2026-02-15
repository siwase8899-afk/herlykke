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

  // 기분 (1-5)
  mood: 1 | 2 | 3 | 4 | 5;

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
  { id: 'brain_fog', name: '브레인포그', emoji: '🧠', category: 'cognitive' },
  { id: 'mood_swings', name: '감정기복', emoji: '😢', category: 'emotional' },
  { id: 'anxiety', name: '불안감', emoji: '😰', category: 'emotional' },
  { id: 'irritability', name: '짜증', emoji: '😤', category: 'emotional' },
];

// 활동 목록
export const ACTIVITIES: Activity[] = [
  { id: 'exercise', name: '운동', emoji: '🏃', type: 'positive' },
  { id: 'meditation', name: '명상', emoji: '🧘', type: 'positive' },
  { id: 'walk', name: '산책', emoji: '🚶', type: 'positive' },
  { id: 'alcohol', name: '음주', emoji: '🍷', type: 'trigger' },
  { id: 'caffeine', name: '카페인', emoji: '☕', type: 'trigger' },
  { id: 'stress', name: '스트레스', emoji: '😰', type: 'trigger' },
  { id: 'late_meal', name: '야식', emoji: '🍜', type: 'trigger' },
  { id: 'screen_time', name: '스크린타임', emoji: '📱', type: 'trigger' },
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

// 매일 기록할 증상 목록
export const SYMPTOMS = [
  { id: 'hot_flash', label: '안면 홍조/열감', icon: '🔥' },
  { id: 'night_sweat', label: '식은땀', icon: '💦' },
  { id: 'insomnia', label: '수면 장애', icon: '🌙' },
  { id: 'fatigue', label: '피로감', icon: '😴' },
  { id: 'mood_swing', label: '감정 기복', icon: '🎭' },
  { id: 'anxiety', label: '불안감', icon: '😰' },
  { id: 'brain_fog', label: '브레인 포그', icon: '🌫️' },
  { id: 'joint_pain', label: '관절통', icon: '🦴' },
  { id: 'headache', label: '두통', icon: '🤕' },
  { id: 'weight_change', label: '체중 변화', icon: '⚖️' },
] as const;

// 활동 목록
export const ACTIVITIES = [
  { id: 'exercise', label: '운동', icon: '🏃' },
  { id: 'yoga', label: '요가/스트레칭', icon: '🧘' },
  { id: 'meditation', label: '명상', icon: '🧘‍♀️' },
  { id: 'walk', label: '산책', icon: '🚶' },
  { id: 'social', label: '사람 만남', icon: '👥' },
  { id: 'hobby', label: '취미 활동', icon: '🎨' },
  { id: 'rest', label: '충분한 휴식', icon: '🛋️' },
  { id: 'healthy_meal', label: '건강한 식사', icon: '🥗' },
] as const;

// 감정 태그 (2레이어: 컨디션 선택 후 구체적 감정 복수 선택)
// 색은 tone 2톤(긍정=세이지, 부정=라벤더)으로 통일 — 구분은 이모지/라벨이 담당.
// 14색 무지개를 폐기해 따뜻한 브랜드와 일관성 확보(가독성·정돈).
const TONE_CHIP_POSITIVE = 'bg-hlk-primary-light text-hlk-primary-dark border-hlk-primary-light';
const TONE_CHIP_NEGATIVE = 'bg-hlk-lavender-light text-hlk-lavender border-hlk-lavender-light';

export const MOOD_TAGS = [
  // 긍정
  { id: 'happy', label: '행복해요', emoji: '😊', tone: 'positive' as const, color: TONE_CHIP_POSITIVE },
  { id: 'calm', label: '평온해요', emoji: '😌', tone: 'positive' as const, color: TONE_CHIP_POSITIVE },
  { id: 'energetic', label: '활력있어요', emoji: '💪', tone: 'positive' as const, color: TONE_CHIP_POSITIVE },
  { id: 'grateful', label: '감사해요', emoji: '🙏', tone: 'positive' as const, color: TONE_CHIP_POSITIVE },
  { id: 'proud', label: '뿌듯해요', emoji: '🌟', tone: 'positive' as const, color: TONE_CHIP_POSITIVE },
  { id: 'hopeful', label: '희망적이에요', emoji: '🌈', tone: 'positive' as const, color: TONE_CHIP_POSITIVE },
  // 부정
  { id: 'tired', label: '피곤해요', emoji: '😮‍💨', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
  { id: 'anxious', label: '불안해요', emoji: '😰', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
  { id: 'irritable', label: '예민해요', emoji: '😤', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
  { id: 'sad', label: '우울해요', emoji: '😢', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
  { id: 'tearful', label: '눈물이 나요', emoji: '🥲', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
  { id: 'listless', label: '무기력해요', emoji: '🫠', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
  { id: 'lonely', label: '외로워요', emoji: '🏝️', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
  { id: 'frustrated', label: '답답해요', emoji: '😶‍🌫️', tone: 'negative' as const, color: TONE_CHIP_NEGATIVE },
] as const;

// 아침 컨디션 레벨 — 따뜻한 의미 스케일(임상적 빨강→초록 신호등 폐기)
export const CONDITION_LEVELS = [
  { value: 1, label: '힘들어요', emoji: '😫', color: 'bg-hlk-error' },
  { value: 2, label: '안좋아요', emoji: '😔', color: 'bg-hlk-warning-fill' },
  { value: 3, label: '보통이에요', emoji: '😐', color: 'bg-hlk-surface-warm' },
  { value: 4, label: '괜찮아요', emoji: '🙂', color: 'bg-hlk-primary-light' },
  { value: 5, label: '상쾌해요', emoji: '😊', color: 'bg-hlk-primary' },
] as const;

// 타입 정의
export type SymptomId = typeof SYMPTOMS[number]['id'];
export type ActivityId = typeof ACTIVITIES[number]['id'];
export type MoodTagId = typeof MOOD_TAGS[number]['id'];

export interface DailyLog {
  id: string;
  user_id: string;
  log_date: string;
  overall_condition: number | null;
  symptoms: SymptomId[];
  symptom_intensity: number | null;
  sleep_hours: number | null;
  sleep_quality: number | null;
  activities: ActivityId[];
  notes: string | null;
  mood_tags: MoodTagId[];
  created_at: string;
  updated_at: string;
}

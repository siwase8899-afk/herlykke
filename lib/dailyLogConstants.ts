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
export const MOOD_TAGS = [
  // 긍정
  { id: 'happy', label: '행복해요', emoji: '😊', tone: 'positive' as const, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'calm', label: '평온해요', emoji: '😌', tone: 'positive' as const, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'energetic', label: '활력있어요', emoji: '💪', tone: 'positive' as const, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'grateful', label: '감사해요', emoji: '🙏', tone: 'positive' as const, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'proud', label: '뿌듯해요', emoji: '🌟', tone: 'positive' as const, color: 'bg-lime-100 text-lime-700 border-lime-200' },
  { id: 'hopeful', label: '희망적이에요', emoji: '🌈', tone: 'positive' as const, color: 'bg-pink-100 text-pink-700 border-pink-200' },
  // 부정
  { id: 'tired', label: '피곤해요', emoji: '😮‍💨', tone: 'negative' as const, color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { id: 'anxious', label: '불안해요', emoji: '😰', tone: 'negative' as const, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'irritable', label: '예민해요', emoji: '😤', tone: 'negative' as const, color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'sad', label: '우울해요', emoji: '😢', tone: 'negative' as const, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'tearful', label: '눈물이 나요', emoji: '🥲', tone: 'negative' as const, color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { id: 'listless', label: '무기력해요', emoji: '🫠', tone: 'negative' as const, color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { id: 'lonely', label: '외로워요', emoji: '🏝️', tone: 'negative' as const, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { id: 'frustrated', label: '답답해요', emoji: '😶‍🌫️', tone: 'negative' as const, color: 'bg-stone-100 text-stone-700 border-stone-200' },
] as const;

// 아침 컨디션 레벨
export const CONDITION_LEVELS = [
  { value: 1, label: '힘들어요', emoji: '😫', color: 'bg-red-500' },
  { value: 2, label: '안좋아요', emoji: '😔', color: 'bg-orange-500' },
  { value: 3, label: '보통이에요', emoji: '😐', color: 'bg-yellow-500' },
  { value: 4, label: '괜찮아요', emoji: '🙂', color: 'bg-lime-500' },
  { value: 5, label: '상쾌해요', emoji: '😊', color: 'bg-green-500' },
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

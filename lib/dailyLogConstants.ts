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

// 기분 태그
export const MOOD_TAGS = [
  { id: 'happy', label: '행복해요', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'calm', label: '평온해요', color: 'bg-green-100 text-green-700' },
  { id: 'energetic', label: '활력있어요', color: 'bg-orange-100 text-orange-700' },
  { id: 'tired', label: '피곤해요', color: 'bg-gray-100 text-gray-700' },
  { id: 'anxious', label: '불안해요', color: 'bg-purple-100 text-purple-700' },
  { id: 'irritable', label: '예민해요', color: 'bg-red-100 text-red-700' },
  { id: 'sad', label: '우울해요', color: 'bg-blue-100 text-blue-700' },
  { id: 'hopeful', label: '희망적이에요', color: 'bg-pink-100 text-pink-700' },
] as const;

// 컨디션 레벨
export const CONDITION_LEVELS = [
  { value: 1, label: '매우 안좋음', emoji: '😫', color: 'bg-red-500' },
  { value: 2, label: '안좋음', emoji: '😔', color: 'bg-orange-500' },
  { value: 3, label: '보통', emoji: '😐', color: 'bg-yellow-500' },
  { value: 4, label: '좋음', emoji: '🙂', color: 'bg-lime-500' },
  { value: 5, label: '매우 좋음', emoji: '😊', color: 'bg-green-500' },
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

// ALMA App 상수

export const APP_NAME = 'ALMA';

// 색상 팔레트 - "Soulful Depth" (8사 경쟁 분석 기반 리프레시)
export const Colors = {
  primary: '#1A6B5A',       // Deep Teal (깊이, 자신감)
  primaryLight: '#E6F5F0',
  primaryDark: '#0E4D3E',
  accent: '#D4850A',        // Warm Amber (따뜻함, 활력)
  accentLight: '#FFF3E0',
  accentDark: '#B06E00',
  secondary: '#2D2926',     // Warm Charcoal (세련됨)
  secondaryLight: '#E8E4E0',
  background: '#FEFCF8',
  surface: '#FFFFFF',
  surfaceWarm: '#FBF5EC',
  text: '#1C1917',
  textSecondary: '#57534E',
  textTertiary: '#A8A29E',
  border: '#E7E5E4',
  error: '#DC2626',
  success: '#15803D',
  warning: '#EA580C',
} as const;

// 인증 레벨
export const AuthLevel = {
  LV1_VISITOR: 'lv1_visitor',
  LV2_MEMBER: 'lv2_member',
  LV3_VERIFIED: 'lv3_verified',
  LV4_SELFIE: 'lv4_selfie',
  LV5_LEADER: 'lv5_leader',
} as const;

export type AuthLevelType = typeof AuthLevel[keyof typeof AuthLevel];

// 인증 레벨 배지
export const AuthBadge: Record<AuthLevelType, string> = {
  lv1_visitor: '\uD83C\uDF31',   // 🌱
  lv2_member: '\uD83C\uDF3F',    // 🌿
  lv3_verified: '\u2705',         // ✅
  lv4_selfie: '\uD83D\uDCF8',   // 📸
  lv5_leader: '\u2B50',          // ⭐
};

// 갱년기 단계
export const MenopauseStage = {
  PREPARATION: 'preparation',
  PERIMENOPAUSE: 'perimenopause',
  MENOPAUSE_ACTIVE: 'menopause_active',
  POSTMENOPAUSE_EARLY: 'postmenopause_early',
  POSTMENOPAUSE_STABLE: 'postmenopause_stable',
  UNKNOWN: 'unknown',
} as const;

export type MenopauseStageType = typeof MenopauseStage[keyof typeof MenopauseStage];

// 갱년기 단계 한국어 라벨
export const MenopauseStageLabel: Record<MenopauseStageType, string> = {
  preparation: '준비기',
  perimenopause: '갱년기 전기',
  menopause_active: '갱년기',
  postmenopause_early: '폐경 후 초기',
  postmenopause_stable: '폐경 후 안정기',
  unknown: '확인 중',
};

// 증상 목록 (체크인 설문용)
export const PhysicalSymptoms = [
  { key: 'hot_flash', label: '열감 / 안면홍조', emoji: '🔥' },
  { key: 'insomnia', label: '수면 장애', emoji: '🌙' },
  { key: 'joint_pain', label: '관절통 / 근육통', emoji: '🦴' },
  { key: 'dryness', label: '건조함 (눈, 피부, 입)', emoji: '🏜️' },
  { key: 'weight_change', label: '체중 변화', emoji: '⚖️' },
  { key: 'brain_fog', label: '기억력 / 집중력 저하', emoji: '🌫️' },
  { key: 'fatigue', label: '만성 피로', emoji: '😴' },
  { key: 'headache', label: '두통', emoji: '🤕' },
  { key: 'palpitation', label: '심장 두근거림', emoji: '💓' },
  { key: 'digestion', label: '소화 장애', emoji: '🤢' },
] as const;

export const EmotionalSymptoms = [
  { key: 'depression', label: '이유 없는 우울감 / 무기력', emoji: '😞' },
  { key: 'anxiety', label: '불안감 / 초조함', emoji: '😰' },
  { key: 'mood_swing', label: '감정기복 (갑자기 짜증, 눈물)', emoji: '🌊' },
  { key: 'low_confidence', label: '자신감 저하', emoji: '😔' },
  { key: 'loneliness', label: '외로움 / 고립감', emoji: '🫥' },
  { key: 'loss_femininity', label: '여성으로서의 상실감', emoji: '🩷' },
  { key: 'identity_crisis', label: '"나는 누구지?" 정체성 혼란', emoji: '❓' },
  { key: 'future_anxiety', label: '미래에 대한 막연한 불안', emoji: '🌫️' },
] as const;

// 반응 타입 (공감 중심)
export const ReactionTypes = [
  { key: 'empathy', label: '공감', emoji: '😢' },
  { key: 'hug', label: '안아줘요', emoji: '🫶' },
  { key: 'me_too', label: '나도!', emoji: '🙋' },
  { key: 'cheer', label: '힘내요', emoji: '💪' },
  { key: 'thanks', label: '고마워요', emoji: '🙏' },
] as const;

// 기분 이모지 (데일리 체크인용)
export const MoodEmojis = [
  { value: 1, emoji: '😢', label: '힘들어요' },
  { value: 2, emoji: '😕', label: '별로예요' },
  { value: 3, emoji: '😐', label: '그저 그래요' },
  { value: 4, emoji: '🙂', label: '괜찮아요' },
  { value: 5, emoji: '😊', label: '좋아요' },
] as const;

export interface ConciergeMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ConciergeContext {
  /** User's recent symptoms (last 7 days) */
  recentSymptoms: string[];
  /** User's sleep pattern type */
  sleepType: string;
  /** Average sleep hours */
  avgSleepHours: number;
  /** User's mood trend */
  moodTrend: 'improving' | 'declining' | 'stable';
  /** Display name */
  displayName: string;
}

export interface ConciergeRequest {
  messages: { role: 'user' | 'assistant'; content: string }[];
  context: ConciergeContext;
}

export const SUGGESTED_QUESTIONS = [
  '오늘 밤 잠을 잘 자려면 어떻게 해야 할까요?',
  '새벽에 자꾸 깨는데 어떻게 하면 좋을까요?',
  '열감이 심해서 잠이 안 와요',
  '스트레스가 심한 날 수면 루틴 추천해주세요',
  '마그네슘이 수면에 도움이 되나요?',
  '호흡법으로 잠드는 방법을 알려주세요',
];

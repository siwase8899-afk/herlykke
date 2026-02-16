// 커뮤니티 투표 데이터

export interface PollOption {
  id: string;
  text: string;
  emoji?: string;
  votes: number;
}

export interface Poll {
  id: string;
  type: 'single' | 'empathy'; // single: 선택형, empathy: 공감형
  question: string;
  description?: string;
  options: PollOption[];
  totalVotes: number;
  category: 'symptom' | 'lifestyle' | 'tips' | 'general';
  createdAt: string;
  expiresAt?: string; // 만료일 (선택)
  isActive: boolean;
}

export interface UserVote {
  odp: string;
  optionId: string;
  votedAt: string;
}

// 데모 투표 데이터
export const DEMO_POLLS: Poll[] = [
  {
    id: 'poll_1',
    type: 'empathy',
    question: '핫플래시가 오면 가장 곤란한 상황은?',
    options: [
      { id: 'opt_1_1', text: '회의 중에 갑자기 올 때', emoji: '💼', votes: 127 },
      { id: 'opt_1_2', text: '사람들 앞에서 발표할 때', emoji: '🎤', votes: 89 },
      { id: 'opt_1_3', text: '대중교통 안에서', emoji: '🚇', votes: 156 },
      { id: 'opt_1_4', text: '잠들려고 누웠는데 올 때', emoji: '🛏️', votes: 203 },
    ],
    totalVotes: 575,
    category: 'symptom',
    createdAt: '2026-02-14T10:00:00Z',
    isActive: true,
  },
  {
    id: 'poll_2',
    type: 'single',
    question: '요즘 가장 힘든 증상은?',
    description: '이번 주에 가장 많이 겪은 증상을 선택해주세요',
    options: [
      { id: 'opt_2_1', text: '수면 장애', emoji: '😴', votes: 234 },
      { id: 'opt_2_2', text: '피로감', emoji: '😩', votes: 312 },
      { id: 'opt_2_3', text: '감정 기복', emoji: '😢', votes: 189 },
      { id: 'opt_2_4', text: '브레인포그', emoji: '🧠', votes: 145 },
    ],
    totalVotes: 880,
    category: 'symptom',
    createdAt: '2026-02-13T09:00:00Z',
    isActive: true,
  },
  {
    id: 'poll_3',
    type: 'empathy',
    question: '갱년기라고 말했을 때 주변 반응...',
    options: [
      { id: 'opt_3_1', text: '"아직 젊은데 벌써?"라고 함', emoji: '🙄', votes: 298 },
      { id: 'opt_3_2', text: '이해해주고 배려해줌', emoji: '🤗', votes: 87 },
      { id: 'opt_3_3', text: '별거 아닌 것처럼 넘김', emoji: '😑', votes: 245 },
      { id: 'opt_3_4', text: '아직 말 못 했음...', emoji: '🤐', votes: 321 },
    ],
    totalVotes: 951,
    category: 'general',
    createdAt: '2026-02-12T14:00:00Z',
    isActive: true,
  },
  {
    id: 'poll_4',
    type: 'single',
    question: '잠들기 전에 하는 루틴이 있나요?',
    options: [
      { id: 'opt_4_1', text: '따뜻한 차 마시기', emoji: '🍵', votes: 156 },
      { id: 'opt_4_2', text: '스트레칭/요가', emoji: '🧘', votes: 89 },
      { id: 'opt_4_3', text: '핸드폰 보다가 잠듦', emoji: '📱', votes: 267 },
      { id: 'opt_4_4', text: '특별히 없음', emoji: '😴', votes: 134 },
    ],
    totalVotes: 646,
    category: 'lifestyle',
    createdAt: '2026-02-11T16:00:00Z',
    isActive: true,
  },
  {
    id: 'poll_5',
    type: 'empathy',
    question: '갱년기 정보를 어디서 얻나요?',
    options: [
      { id: 'opt_5_1', text: '인터넷 검색', emoji: '🔍', votes: 378 },
      { id: 'opt_5_2', text: '주변 언니/친구', emoji: '👭', votes: 156 },
      { id: 'opt_5_3', text: '병원/의사 상담', emoji: '👩‍⚕️', votes: 89 },
      { id: 'opt_5_4', text: 'HERLYKKE 같은 앱', emoji: '📱', votes: 67 },
    ],
    totalVotes: 690,
    category: 'general',
    createdAt: '2026-02-10T11:00:00Z',
    isActive: true,
  },
];

// 카테고리 정보
export const POLL_CATEGORIES = {
  symptom: { label: '증상', emoji: '🩺', color: 'bg-red-100 text-red-700' },
  lifestyle: { label: '생활', emoji: '🏠', color: 'bg-blue-100 text-blue-700' },
  tips: { label: '꿀팁', emoji: '💡', color: 'bg-yellow-100 text-yellow-700' },
  general: { label: '일반', emoji: '💬', color: 'bg-gray-100 text-gray-700' },
};

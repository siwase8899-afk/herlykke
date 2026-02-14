// 커뮤니티 상수 및 타입

// 카테고리
export const CATEGORIES = [
  { id: 'daily', label: '일상 이야기', icon: '☀️', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'symptoms', label: '증상 공유', icon: '💬', color: 'bg-purple-100 text-purple-700' },
  { id: 'tips', label: '꿀팁 공유', icon: '💡', color: 'bg-green-100 text-green-700' },
  { id: 'question', label: '질문있어요', icon: '❓', color: 'bg-blue-100 text-blue-700' },
  { id: 'support', label: '응원해요', icon: '💜', color: 'bg-pink-100 text-pink-700' },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

// 익명 닉네임 생성용
const ADJECTIVES = [
  '따뜻한', '포근한', '밝은', '용감한', '씩씩한',
  '다정한', '부드러운', '활기찬', '편안한', '고운',
  '맑은', '향기로운', '싱그러운', '빛나는', '사랑스러운',
];

const NOUNS = [
  '햇살', '바람', '구름', '꽃잎', '별빛',
  '나비', '새싹', '이슬', '달빛', '무지개',
  '봄날', '여름밤', '가을빛', '겨울꽃', '아침',
];

export function generateAnonymousName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 100);
  return `${adj} ${noun}${num}`;
}

// 타입 정의
export interface Post {
  id: string;
  user_id: string;
  anonymous_name: string;
  title: string | null;
  content: string;
  category: CategoryId;
  tags: string[];
  like_count: number;
  comment_count: number;
  view_count: number;
  is_pinned: boolean;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  // 추가 필드 (조인 데이터)
  is_liked?: boolean;
  is_mine?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  anonymous_name: string;
  content: string;
  like_count: number;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  // 추가 필드
  is_liked?: boolean;
  is_mine?: boolean;
  replies?: Comment[];
}

// 시간 포맷팅
export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;

  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

// 데모 게시글
export const DEMO_POSTS: Post[] = [
  {
    id: '1',
    user_id: 'demo1',
    anonymous_name: '따뜻한 햇살42',
    title: null,
    content: '오늘 아침에 또 열감이 왔는데, 깊게 호흡하니까 조금 나아졌어요. 여러분도 호흡법 한번 해보세요!',
    category: 'tips',
    tags: ['열감', '호흡법'],
    like_count: 24,
    comment_count: 8,
    view_count: 156,
    is_pinned: false,
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    user_id: 'demo2',
    anonymous_name: '포근한 바람15',
    title: null,
    content: '요즘 자꾸 단어가 생각이 안 나요ㅠㅠ 저만 그런 건가요? 회의 중에 갑자기 머리가 하얘져서 당황했어요...',
    category: 'symptoms',
    tags: ['브레인포그'],
    like_count: 45,
    comment_count: 23,
    view_count: 342,
    is_pinned: false,
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    user_id: 'demo3',
    anonymous_name: '밝은 구름77',
    title: null,
    content: '남편한테 갱년기 증상 얘기했더니 "다 그런 거야"라고 해서 서운했는데... 여기 오니까 위로가 되네요. 저만 그런 게 아니었어요 😢💜',
    category: 'daily',
    tags: ['가족', '공감'],
    like_count: 89,
    comment_count: 31,
    view_count: 567,
    is_pinned: false,
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '4',
    user_id: 'demo4',
    anonymous_name: '용감한 꽃잎33',
    title: null,
    content: '수면 장애가 심해서 멜라토닌 영양제 먹기 시작했어요. 혹시 드셔보신 분 있으신가요? 효과가 있을까요?',
    category: 'question',
    tags: ['수면장애', '영양제'],
    like_count: 12,
    comment_count: 15,
    view_count: 234,
    is_pinned: false,
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8시간 전
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: '5',
    user_id: 'demo5',
    anonymous_name: '다정한 별빛88',
    title: null,
    content: '오늘 힘드신 분들, 다 괜찮아질 거예요. 저도 작년에 정말 힘들었는데 지금은 많이 나아졌어요. 함께해요 💪',
    category: 'support',
    tags: ['응원', '희망'],
    like_count: 156,
    comment_count: 42,
    view_count: 892,
    is_pinned: true,
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// 데모 댓글
export const DEMO_COMMENTS: Comment[] = [
  {
    id: 'c1',
    post_id: '2',
    user_id: 'demo6',
    parent_id: null,
    anonymous_name: '씩씩한 나비22',
    content: '저도요ㅠㅠ 브레인포그라고 하더라고요. 갱년기 증상 중 하나래요. 혼자가 아니에요!',
    like_count: 12,
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'c2',
    post_id: '2',
    user_id: 'demo7',
    parent_id: null,
    anonymous_name: '부드러운 새싹11',
    content: '저는 메모하는 습관을 들였어요. 완벽하게 기억하려고 하지 말고 적어두면 편해요!',
    like_count: 8,
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

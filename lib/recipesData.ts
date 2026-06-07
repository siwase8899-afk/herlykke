// 수면 레시피 데이터 — Real Ink 시스템 기반
// 메이트 PICK: 공감 임계치(50+) 자동 선정

export type RecipeCategory = 'all' | 'nutrition' | 'yoga' | 'environment' | 'routine';

export const RECIPE_CATEGORIES: { id: RecipeCategory; label: string; emoji: string }[] = [
  { id: 'all', label: '전체', emoji: '✨' },
  { id: 'nutrition', label: '영양제·식품', emoji: '🌿' },
  { id: 'yoga', label: '요가·이완', emoji: '🧘‍♀️' },
  { id: 'environment', label: '수면 환경', emoji: '🌙' },
  { id: 'routine', label: '잠자리 루틴', emoji: '📓' },
];

export type CuratorLevel = 1 | 2 | 3 | 4 | 5;

export const CURATOR_LEVELS: Record<CuratorLevel, { name: string; badge: string; color: string }> = {
  1: { name: '잠 못 자는 중', badge: '🌙', color: '#A8A29E' },
  2: { name: '잠 되찾는 중', badge: '⭐', color: '#C98E87' },
  3: { name: '수면 메이트', badge: '✨', color: '#6F9CA6' },
  4: { name: '수면 멘토', badge: '💎', color: '#5A8590' },
  5: { name: '수면 셀러', badge: '👑', color: '#A888A8' },
};

export interface Recipe {
  id: string;
  category: Exclude<RecipeCategory, 'all'>;
  title: string;
  curatorNickname: string;
  curatorLevel: CuratorLevel;
  realInkImageUrl: string; // 손글씨 사진 URL
  ingredients: string[]; // 재료 (제품/방법)
  method: string; // 루틴 방법
  result: string; // 효과/결과
  tags: string[];
  likes: number; // 공감 수
  isAnniePick: boolean; // likes >= 50 자동 선정
  duration: string; // 사용 기간
  createdAt: string;
  productLink?: string; // 쿠팡 파트너스 링크 (옵션)
  productName?: string;
}

// 메이트 PICK 자동 선정 임계치
export const ANNIE_PICK_THRESHOLD = 50;

export const RECIPES: Recipe[] = [
  {
    id: 'r01',
    category: 'nutrition',
    title: '마그네슘 + 족욕 조합으로 새벽 각성 없앤 방법',
    curatorNickname: '잠꾸러기탈출',
    curatorLevel: 3,
    realInkImageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=600&h=400&fit=crop&q=80',
    ingredients: ['마그네슘 글리시네이트 400mg', 'L-테아닌 200mg', '라벤더 에센셜 오일 3방울', '족욕 대야'],
    method: '자기 1시간 전: 족욕 15분(라벤더 3방울). 족욕 후 마그네슘+테아닌 복용. 조명 어둡게. 핸드폰 멀리.',
    result: '3주 후 새벽 3시 각성이 없어졌어요. 아침에 개운함이 달라요.',
    tags: ['#마그네슘', '#족욕', '#새벽각성', '#3주효과'],
    likes: 124,
    isAnniePick: true,
    duration: '3개월',
    createdAt: '2026-02-10T08:00:00Z',
    productLink: 'https://link.coupang.com/a/example1',
    productName: '나우푸드 마그네슘 글리시네이트',
  },
  {
    id: 'r02',
    category: 'yoga',
    title: '자기 전 10분 요가 니드라로 열감 없이 잠드는 법',
    curatorNickname: '요가메이트45',
    curatorLevel: 3,
    realInkImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&q=80',
    ingredients: ['요가 매트', '쿨링 타올 (선택)', '유튜브 요가니드라 영상'],
    method: '누워서 몸 스캔 → 발끝부터 머리까지 의식 이동. 호흡은 4-7-8 방식. 10분 버전 유튜브 틀고 따라하기.',
    result: '열감 올라올 때 해봤더니 10분 안에 체온 내려가는 느낌. 그대로 잠들어요.',
    tags: ['#요가니드라', '#열감', '#열감관리', '#무료'],
    likes: 89,
    isAnniePick: true,
    duration: '2개월',
    createdAt: '2026-02-14T08:00:00Z',
  },
  {
    id: 'r03',
    category: 'environment',
    title: '침실 온도 + 냉감 침구 세팅으로 땀 없이 자는 법',
    curatorNickname: '수면탐정',
    curatorLevel: 2,
    realInkImageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&q=80',
    ingredients: ['냉감 소재 이불 (竹섬유 or 텐셀)', '침실 온도 18-20도 유지', '소형 선풍기'],
    method: '잠들기 30분 전부터 침실 온도 낮추기. 이불은 텐셀 소재로 교체. 선풍기는 발 방향으로.',
    result: '땀이 나서 깨는 횟수가 주 5회 → 주 1-2회로 줄었어요.',
    tags: ['#냉감침구', '#침실온도', '#야간발한', '#텐셀'],
    likes: 67,
    isAnniePick: true,
    duration: '1개월',
    createdAt: '2026-02-20T08:00:00Z',
    productLink: 'https://link.coupang.com/a/example3',
    productName: '텐셀 냉감 이불',
  },
  {
    id: 'r04',
    category: 'routine',
    title: '수면 일기 + 핸드폰 금지 루틴으로 수면 점수 올린 방법',
    curatorNickname: '다이어리마니아',
    curatorLevel: 2,
    realInkImageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&q=80',
    ingredients: ['A5 다이어리', '볼펜', '핸드폰 충전기 (침실 밖)'],
    method: '자기 전 5분: 오늘 수면 점수(1-5) + 한 줄 메모 손으로 쓰기. 핸드폰은 문 밖에 두기. 딱 이것만.',
    result: '2주 후 스스로 패턴 발견. 커피 늦게 마신 날 수면 점수가 낮더라고요. 지금 잘 자요.',
    tags: ['#수면일기', '#핸드폰금지', '#루틴', '#패턴발견'],
    likes: 53,
    isAnniePick: true,
    duration: '6주',
    createdAt: '2026-02-25T08:00:00Z',
  },
  {
    id: 'r05',
    category: 'nutrition',
    title: '발레리안 루트 차로 입면 시간 30분 줄인 경험',
    curatorNickname: '허브덕후',
    curatorLevel: 2,
    realInkImageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&q=80',
    ingredients: ['발레리안 루트 허브티', '라벤더 필로우 스프레이'],
    method: '자기 45분 전 발레리안 루트 차 한 잔. 베개에 라벤더 스프레이 2번. 향 맡으면서 천천히 호흡.',
    result: '잠드는 데 1시간 걸리던 게 30분으로 줄었어요. 발레리안 특유 향이 싫은 분은 주의.',
    tags: ['#발레리안', '#허브티', '#입면', '#아로마'],
    likes: 41,
    isAnniePick: false,
    duration: '2개월',
    createdAt: '2026-03-01T08:00:00Z',
    productLink: 'https://link.coupang.com/a/example5',
    productName: '티칸 발레리안 루트 티백',
  },
  {
    id: 'r06',
    category: 'yoga',
    title: '4-7-8 호흡법으로 새벽에 깼을 때 다시 잠드는 방법',
    curatorNickname: '숨쉬는여자',
    curatorLevel: 2,
    realInkImageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&q=80',
    ingredients: ['없음 (도구 필요 없음)'],
    method: '새벽에 깼을 때: 4초 들이쉬고 → 7초 멈추고 → 8초 내쉬기. 5회 반복. 절대 핸드폰 보지 않기.',
    result: '처음엔 5분 걸렸는데 2주 후엔 2-3회 만에 잠들어요. 완전 무료라서 더 좋아요.',
    tags: ['#호흡법', '#478호흡', '#새벽각성', '#무료'],
    likes: 78,
    isAnniePick: true,
    duration: '3주',
    createdAt: '2026-02-18T08:00:00Z',
  },
  {
    id: 'r07',
    category: 'environment',
    title: '블루라이트 차단 안경 + 조명 루틴으로 수면 주기 회복',
    curatorNickname: '빛조절러',
    curatorLevel: 1,
    realInkImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&q=80',
    ingredients: ['블루라이트 차단 안경', '스마트 전구 (색온도 조절 가능)', '일몰 후 조명 2700K 이하 설정'],
    method: '오후 8시부터 블루라이트 안경 착용. 집 조명 오렌지색으로 바꾸기. TV는 야간모드.',
    result: '수면 주기가 앞당겨졌어요. 11시면 졸려지기 시작. 아직 완벽하진 않지만 확실히 달라졌어요.',
    tags: ['#블루라이트', '#조명조절', '#수면주기', '#입문'],
    likes: 29,
    isAnniePick: false,
    duration: '1개월',
    createdAt: '2026-03-03T08:00:00Z',
  },
  {
    id: 'r08',
    category: 'routine',
    title: '커피 컷오프 시간 바꿨더니 수면 질이 달라진 이야기',
    curatorNickname: '커피끊은날',
    curatorLevel: 1,
    realInkImageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&q=80',
    ingredients: ['커피 (없애는 게 아니라 시간 조절)', '디카페인 커피 (오후 대체용)'],
    method: '오후 1시 이후 카페인 완전 차단. 오후엔 디카페인으로. 처음 1주일은 두통 있을 수 있음.',
    result: '2주 후 새벽 각성 횟수 확 줄었어요. 커피 때문인 줄 몰랐는데 정말 신기해요.',
    tags: ['#커피컷오프', '#카페인', '#새벽각성', '#2주효과'],
    likes: 62,
    isAnniePick: true,
    duration: '2개월',
    createdAt: '2026-02-28T08:00:00Z',
  },
  {
    id: 'r09',
    category: 'nutrition',
    title: '트립토판 많은 음식 저녁 루틴으로 자연 수면 유도',
    curatorNickname: '음식치료사',
    curatorLevel: 2,
    realInkImageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&q=80',
    ingredients: ['바나나', '따뜻한 우유 or 두유', '아몬드 한 줌'],
    method: '자기 2시간 전: 바나나 1개 + 따뜻한 두유 한 잔. 트립토판이 멜라토닌으로 전환됨. 비용 거의 0원.',
    result: '영양제 전에 식품으로 먼저 접근해봤어요. 2주 후부터 효과 느꼈어요. 무엇보다 부작용이 없어서 좋아요.',
    tags: ['#트립토판', '#바나나', '#천연멜라토닌', '#무비용'],
    likes: 45,
    isAnniePick: false,
    duration: '1개월',
    createdAt: '2026-03-04T08:00:00Z',
  },
  {
    id: 'r10',
    category: 'yoga',
    title: '다리 올리기 자세(Legs-up-wall) 10분으로 잠 준비하는 법',
    curatorNickname: '벽에다리올리기',
    curatorLevel: 2,
    realInkImageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&q=80',
    ingredients: ['요가 매트 or 이불 (쿠션용)', '벽'],
    method: '누워서 다리를 벽에 올리기. 10분 유지. 부교감신경 활성화. 생리통, 다리 부종에도 좋아요.',
    result: '자기 전에 하면 몸이 무거워지면서 졸음이 와요. 생각보다 빨리 잠드는 것 같아요.',
    tags: ['#비파리타카라니', '#다리올리기', '#요가', '#무료'],
    likes: 37,
    isAnniePick: false,
    duration: '3주',
    createdAt: '2026-03-05T08:00:00Z',
  },
];

// 메이트 PICK 레시피 (likes >= ANNIE_PICK_THRESHOLD)
export function getAnniePickRecipes(): Recipe[] {
  return RECIPES.filter((r) => r.isAnniePick).sort((a, b) => b.likes - a.likes);
}

// 카테고리별 필터
export function getRecipesByCategory(category: RecipeCategory): Recipe[] {
  if (category === 'all') return RECIPES.sort((a, b) => b.likes - a.likes);
  return RECIPES.filter((r) => r.category === category).sort((a, b) => b.likes - a.likes);
}

// ID로 찾기
export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}

// 솔루션 마켓플레이스 데이터
// solutions/page.tsx와 solutions/[id]/page.tsx에서 공유

export const SOLUTION_CATEGORIES = [
  { id: 'all', label: '전체', icon: '✨' },
  { id: 'coaching', label: '변화 동반자 코칭', icon: '🤝' },
  { id: 'meditation', label: '명상/요가', icon: '🧘‍♀️' },
  { id: 'exercise', label: '운동', icon: '🏃‍♀️' },
  { id: 'nutrition', label: '영양제', icon: '💊' },
  { id: 'counseling', label: '상담', icon: '💬' },
  { id: 'lifestyle', label: '라이프스타일', icon: '🌙' },
  { id: 'product', label: '추천 제품', icon: '🛍️' },
] as const;

export type SolutionCategory = typeof SOLUTION_CATEGORIES[number]['id'];

export interface Solution {
  id: string;
  category: string;
  title: string;
  provider: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  reviews: number;
  price: string;
  matchScore: number;
  forSymptoms: string[];
}

export const SOLUTIONS: Solution[] = [
  // 갱년기 코칭
  {
    id: 's0-1', category: 'coaching', title: '1:1 변화 동반자 코칭', provider: 'HERLYKKE 웰니스',
    description: '이 시기 전문 코치와 8주간 1:1 동반자 여정. 증상 관리부터 라이프스타일 개선까지 맞춤 가이드.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
    tags: ['1:1코칭', '8주프로그램', '맞춤관리'], rating: 4.9, reviews: 89, price: '월 120,000원', matchScore: 96,
    forSymptoms: ['hot_flash', 'mood_swing', 'anxiety', 'insomnia'],
  },
  {
    id: 's0-2', category: 'coaching', title: '변화의 첫걸음 코칭', provider: 'HERLYKKE 웰니스',
    description: '변화 초기에 있는 분을 위한 4주 입문 코칭. 증상 이해하기, 나만의 관리법 찾기.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop',
    tags: ['입문', '4주', '기초관리'], rating: 4.8, reviews: 156, price: '월 80,000원', matchScore: 94,
    forSymptoms: ['fatigue', 'brain_fog', 'mood_swing'],
  },
  {
    id: 's0-3', category: 'coaching', title: '그룹 코칭 클래스', provider: 'HERLYKKE 웰니스',
    description: '같은 증상을 가진 5-8명이 함께하는 주 1회 그룹 코칭. 공감과 실천을 동시에.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop',
    tags: ['그룹', '주1회', '커뮤니티'], rating: 4.7, reviews: 234, price: '월 50,000원', matchScore: 90,
    forSymptoms: ['anxiety', 'mood_swing', 'insomnia'],
  },
  // 명상/요가
  {
    id: 's1', category: 'meditation', title: '이 시기를 위한 명상 프로그램', provider: 'HERLYKKE 웰니스',
    description: '열감과 불안을 다스리는 10분 호흡 명상. 매일 아침 또는 증상이 나타날 때 활용하세요.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    tags: ['열감', '불안', '수면'], rating: 4.8, reviews: 234, price: '무료', matchScore: 95,
    forSymptoms: ['hot_flash', 'anxiety', 'insomnia'],
  },
  {
    id: 's2', category: 'meditation', title: '숙면을 위한 요가 니드라', provider: '마인드풀 요가',
    description: '잠들기 전 20분, 깊은 이완으로 수면의 질을 높이는 요가 니드라 가이드.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    tags: ['수면', '이완', '스트레스'], rating: 4.9, reviews: 189, price: '월 9,900원', matchScore: 92,
    forSymptoms: ['insomnia', 'anxiety', 'fatigue'],
  },
  {
    id: 's3', category: 'meditation', title: '감정 조절 마음챙김', provider: 'HERLYKKE 웰니스',
    description: '감정 기복이 심할 때 활용하는 5분 마음챙김 기법. 언제 어디서나 간편하게.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop',
    tags: ['감정조절', '스트레스', '불안'], rating: 4.7, reviews: 156, price: '무료', matchScore: 88,
    forSymptoms: ['mood_swing', 'anxiety'],
  },
  // 운동
  {
    id: 's4', category: 'exercise', title: '이 시기 맞춤 필라테스', provider: '헬시라이프 스튜디오',
    description: '관절에 무리 없이 코어와 유연성을 강화하는 40대-50대 맞춤 필라테스.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    tags: ['관절', '유연성', '코어'], rating: 4.8, reviews: 312, price: '월 29,000원', matchScore: 90,
    forSymptoms: ['joint_pain', 'fatigue', 'weight_gain'],
  },
  {
    id: 's5', category: 'exercise', title: '아침 10분 스트레칭', provider: 'HERLYKKE 웰니스',
    description: '아침에 몸을 깨우고 하루를 활기차게 시작하는 간단한 스트레칭 루틴.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    tags: ['아침루틴', '활력', '유연성'], rating: 4.6, reviews: 287, price: '무료', matchScore: 85,
    forSymptoms: ['fatigue', 'joint_pain'],
  },
  {
    id: 's6', category: 'exercise', title: '걷기 운동 프로그램', provider: '워킹 웰니스',
    description: '하루 30분 걷기로 체중 관리와 기분 개선. 단계별 프로그램 제공.',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=300&fit=crop',
    tags: ['걷기', '체중관리', '기분개선'], rating: 4.5, reviews: 198, price: '무료', matchScore: 82,
    forSymptoms: ['weight_gain', 'mood_swing', 'fatigue'],
  },
  // 영양제
  {
    id: 's7', category: 'nutrition', title: '이 시기를 위한 종합 영양제', provider: '뉴트리웰',
    description: '이소플라본, 비타민D, 칼슘이 함께 든 이 시기 여성 맞춤 종합 영양제.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    tags: ['이소플라본', '비타민D', '칼슘'], rating: 4.7, reviews: 523, price: '월 35,000원', matchScore: 94,
    forSymptoms: ['hot_flash', 'joint_pain', 'fatigue'],
  },
  {
    id: 's8', category: 'nutrition', title: '숙면 마그네슘', provider: '슬립케어',
    description: '수면의 질을 높이는 마그네슘 + 테아닌 복합제. 자기 전 1정.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=300&fit=crop',
    tags: ['수면', '마그네슘', '이완'], rating: 4.8, reviews: 412, price: '월 28,000원', matchScore: 91,
    forSymptoms: ['insomnia', 'anxiety', 'fatigue'],
  },
  {
    id: 's9', category: 'nutrition', title: '오메가3 + 감마리놀렌산', provider: '오메가케어',
    description: '피부 건조와 관절 건강에 도움을 주는 고함량 오메가3.',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=300&fit=crop',
    tags: ['피부', '관절', '오메가3'], rating: 4.6, reviews: 289, price: '월 32,000원', matchScore: 87,
    forSymptoms: ['skin_dry', 'joint_pain'],
  },
  // 상담
  {
    id: 's10', category: 'counseling', title: '이 시기 전문 심리상담', provider: '마음돌봄 센터',
    description: '이 시기의 우울, 불안을 전문으로 다루는 심리상담사와 1:1 상담.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
    tags: ['심리상담', '우울', '불안'], rating: 4.9, reviews: 167, price: '회당 80,000원', matchScore: 93,
    forSymptoms: ['anxiety', 'mood_swing'],
  },
  {
    id: 's11', category: 'counseling', title: '변화의 시기 영양 컨설팅', provider: '뉴트리 클리닉',
    description: '개인 증상에 맞는 식단과 영양제를 추천받는 1:1 영양 상담.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    tags: ['영양상담', '식단', '맞춤추천'], rating: 4.7, reviews: 134, price: '회당 50,000원', matchScore: 86,
    forSymptoms: ['weight_gain', 'fatigue', 'skin_dry'],
  },
  {
    id: 's12', category: 'counseling', title: '온라인 그룹 상담', provider: 'HERLYKKE 웰니스',
    description: '비슷한 증상을 가진 5-8명이 함께하는 주 1회 온라인 그룹 상담.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop',
    tags: ['그룹상담', '공감', '커뮤니티'], rating: 4.8, reviews: 98, price: '월 40,000원', matchScore: 89,
    forSymptoms: ['anxiety', 'mood_swing'],
  },
  // 라이프스타일
  {
    id: 's13', category: 'lifestyle', title: '쿨링 베개 & 이불', provider: '슬립테크',
    description: '열감으로 인한 수면 방해를 줄여주는 냉감 소재 침구 세트.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    tags: ['수면', '열감', '냉감침구'], rating: 4.6, reviews: 234, price: '159,000원', matchScore: 92,
    forSymptoms: ['hot_flash', 'night_sweat', 'insomnia'],
  },
  {
    id: 's14', category: 'lifestyle', title: '수면 트래킹 스마트밴드', provider: '헬스테크',
    description: '수면 패턴을 분석하고 최적의 수면 시간을 추천하는 웨어러블 기기.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
    tags: ['수면분석', '웨어러블', '스마트밴드'], rating: 4.5, reviews: 178, price: '89,000원', matchScore: 84,
    forSymptoms: ['insomnia', 'fatigue'],
  },
  {
    id: 's15', category: 'lifestyle', title: '아로마 테라피 세트', provider: '센트웰',
    description: '라벤더, 캐모마일 등 이완에 도움을 주는 에센셜 오일 세트.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
    tags: ['아로마', '이완', '스트레스'], rating: 4.7, reviews: 312, price: '45,000원', matchScore: 80,
    forSymptoms: ['anxiety', 'insomnia'],
  },
  // 추천 제품
  {
    id: 's16', category: 'product', title: '핫플래시 쿨링 스프레이', provider: '쿨미스트',
    description: '갑작스러운 열감이 올 때 얼굴에 뿌리는 쿨링 미스트.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    tags: ['열감', '쿨링', '휴대용'], rating: 4.4, reviews: 456, price: '18,000원', matchScore: 88,
    forSymptoms: ['hot_flash'],
  },
  {
    id: 's17', category: 'product', title: '이 시기를 위한 보습 크림', provider: '더마케어',
    description: '호르몬 변화로 건조해진 피부를 위한 고보습 페이셜 크림.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=300&fit=crop',
    tags: ['보습', '피부', '건조'], rating: 4.6, reviews: 289, price: '48,000원', matchScore: 85,
    forSymptoms: ['skin_dry'],
  },
  {
    id: 's18', category: 'product', title: '관절 보호 무릎 밴드', provider: '조인트케어',
    description: '운동 시 무릎 관절을 보호하는 압박 밴드. 일상 착용 가능.',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
    tags: ['관절', '운동', '보호대'], rating: 4.5, reviews: 167, price: '25,000원', matchScore: 82,
    forSymptoms: ['joint_pain'],
  },
];

// 증상별 추천 매핑
export const SYMPTOM_SOLUTIONS: Record<string, string[]> = {
  hot_flash: ['meditation', 'lifestyle', 'nutrition'],
  night_sweat: ['lifestyle', 'nutrition'],
  insomnia: ['meditation', 'lifestyle', 'nutrition'],
  mood_swing: ['meditation', 'counseling', 'exercise'],
  anxiety: ['meditation', 'counseling', 'exercise'],
  fatigue: ['exercise', 'nutrition', 'lifestyle'],
  brain_fog: ['exercise', 'nutrition', 'meditation'],
  joint_pain: ['exercise', 'nutrition', 'product'],
  weight_gain: ['exercise', 'nutrition'],
  skin_dry: ['nutrition', 'product', 'lifestyle'],
};

// 솔루션 ID로 찾기
export function getSolutionById(id: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.id === id);
}

// 리뷰 타입
export interface SolutionReview {
  id: string;
  userId: string;
  solutionId: string;
  rating: number;
  beforeSymptoms: Array<{ symptomId: string; severity: number }>;
  afterSymptoms: Array<{ symptomId: string; severity: number }>;
  usageDuration: string;
  content: string;
  stage?: string;
  ageRange?: string;
  isVerified: boolean;
  createdAt: string;
}

// 사용 기간 옵션
export const USAGE_DURATIONS = [
  { id: '1week', label: '1주 미만' },
  { id: '1month', label: '1개월' },
  { id: '3months', label: '3개월' },
  { id: '6months', label: '6개월 이상' },
] as const;

// 데모 리뷰 데이터
export const DEMO_REVIEWS: SolutionReview[] = [
  {
    id: 'review_1', userId: 'demo-1', solutionId: 's7', rating: 5,
    beforeSymptoms: [{ symptomId: 'hot_flash', severity: 4 }],
    afterSymptoms: [{ symptomId: 'hot_flash', severity: 2 }],
    usageDuration: '3months', content: '이소플라본 3개월 먹었는데 열감이 확실히 줄었어요. 밤에 잠도 더 잘 오고요.',
    stage: '활발기', ageRange: '50-54세', isVerified: true, createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: 'review_2', userId: 'demo-2', solutionId: 's7', rating: 4,
    beforeSymptoms: [{ symptomId: 'fatigue', severity: 4 }, { symptomId: 'joint_pain', severity: 3 }],
    afterSymptoms: [{ symptomId: 'fatigue', severity: 2 }, { symptomId: 'joint_pain', severity: 2 }],
    usageDuration: '1month', content: '아직 1달밖에 안 됐는데 피로감이 좀 나아진 느낌이에요. 좀 더 먹어볼 생각입니다.',
    stage: '전기', ageRange: '45-49세', isVerified: true, createdAt: '2026-02-05T08:00:00Z',
  },
  {
    id: 'review_3', userId: 'demo-3', solutionId: 's1', rating: 5,
    beforeSymptoms: [{ symptomId: 'anxiety', severity: 4 }],
    afterSymptoms: [{ symptomId: 'anxiety', severity: 2 }],
    usageDuration: '1month', content: '매일 아침 10분씩 하고 있는데, 불안이 많이 줄었어요. 무료라서 더 좋아요.',
    stage: '활발기', ageRange: '50-54세', isVerified: true, createdAt: '2026-01-28T08:00:00Z',
  },
  {
    id: 'review_4', userId: 'demo-4', solutionId: 's8', rating: 5,
    beforeSymptoms: [{ symptomId: 'insomnia', severity: 5 }],
    afterSymptoms: [{ symptomId: 'insomnia', severity: 2 }],
    usageDuration: '3months', content: '수면제 대신 마그네슘 먹기 시작했어요. 처음엔 별 차이 못 느꼈는데 2주 지나니까 확실히 잠이 잘 와요.',
    stage: '후기', ageRange: '55-59세', isVerified: true, createdAt: '2026-02-01T08:00:00Z',
  },
];

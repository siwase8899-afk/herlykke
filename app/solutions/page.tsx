'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// 솔루션 카테고리
const SOLUTION_CATEGORIES = [
  { id: 'all', label: '전체', icon: '✨' },
  { id: 'meditation', label: '명상/요가', icon: '🧘‍♀️' },
  { id: 'exercise', label: '운동', icon: '🏃‍♀️' },
  { id: 'nutrition', label: '영양제', icon: '💊' },
  { id: 'counseling', label: '상담', icon: '💬' },
  { id: 'lifestyle', label: '라이프스타일', icon: '🌙' },
  { id: 'product', label: '추천 제품', icon: '🛍️' },
];

// 증상별 추천 매핑
const SYMPTOM_SOLUTIONS: Record<string, string[]> = {
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

// 솔루션 데이터
const SOLUTIONS = [
  // 명상/요가
  {
    id: 's1',
    category: 'meditation',
    title: '갱년기 전용 명상 프로그램',
    provider: 'ALMA 웰니스',
    description: '열감과 불안을 다스리는 10분 호흡 명상. 매일 아침 또는 증상이 나타날 때 활용하세요.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    tags: ['열감', '불안', '수면'],
    rating: 4.8,
    reviews: 234,
    price: '무료',
    matchScore: 95,
    forSymptoms: ['hot_flash', 'anxiety', 'insomnia'],
  },
  {
    id: 's2',
    category: 'meditation',
    title: '숙면을 위한 요가 니드라',
    provider: '마인드풀 요가',
    description: '잠들기 전 20분, 깊은 이완으로 수면의 질을 높이는 요가 니드라 가이드.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    tags: ['수면', '이완', '스트레스'],
    rating: 4.9,
    reviews: 189,
    price: '월 9,900원',
    matchScore: 92,
    forSymptoms: ['insomnia', 'anxiety', 'fatigue'],
  },
  {
    id: 's3',
    category: 'meditation',
    title: '감정 조절 마음챙김',
    provider: 'ALMA 웰니스',
    description: '감정 기복이 심할 때 활용하는 5분 마음챙김 기법. 언제 어디서나 간편하게.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop',
    tags: ['감정조절', '스트레스', '불안'],
    rating: 4.7,
    reviews: 156,
    price: '무료',
    matchScore: 88,
    forSymptoms: ['mood_swing', 'anxiety'],
  },

  // 운동
  {
    id: 's4',
    category: 'exercise',
    title: '갱년기 맞춤 필라테스',
    provider: '헬시라이프 스튜디오',
    description: '관절에 무리 없이 코어와 유연성을 강화하는 40대-50대 맞춤 필라테스.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    tags: ['관절', '유연성', '코어'],
    rating: 4.8,
    reviews: 312,
    price: '월 29,000원',
    matchScore: 90,
    forSymptoms: ['joint_pain', 'fatigue', 'weight_gain'],
  },
  {
    id: 's5',
    category: 'exercise',
    title: '아침 10분 스트레칭',
    provider: 'ALMA 웰니스',
    description: '아침에 몸을 깨우고 하루를 활기차게 시작하는 간단한 스트레칭 루틴.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    tags: ['아침루틴', '활력', '유연성'],
    rating: 4.6,
    reviews: 287,
    price: '무료',
    matchScore: 85,
    forSymptoms: ['fatigue', 'joint_pain'],
  },
  {
    id: 's6',
    category: 'exercise',
    title: '걷기 운동 프로그램',
    provider: '워킹 웰니스',
    description: '하루 30분 걷기로 체중 관리와 기분 개선. 단계별 프로그램 제공.',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=300&fit=crop',
    tags: ['걷기', '체중관리', '기분개선'],
    rating: 4.5,
    reviews: 198,
    price: '무료',
    matchScore: 82,
    forSymptoms: ['weight_gain', 'mood_swing', 'fatigue'],
  },

  // 영양제
  {
    id: 's7',
    category: 'nutrition',
    title: '여성 갱년기 종합 영양제',
    provider: '뉴트리웰',
    description: '이소플라본, 비타민D, 칼슘이 함께 든 갱년기 여성 맞춤 종합 영양제.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    tags: ['이소플라본', '비타민D', '칼슘'],
    rating: 4.7,
    reviews: 523,
    price: '월 35,000원',
    matchScore: 94,
    forSymptoms: ['hot_flash', 'joint_pain', 'fatigue'],
  },
  {
    id: 's8',
    category: 'nutrition',
    title: '숙면 마그네슘',
    provider: '슬립케어',
    description: '수면의 질을 높이는 마그네슘 + 테아닌 복합제. 자기 전 1정.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=300&fit=crop',
    tags: ['수면', '마그네슘', '이완'],
    rating: 4.8,
    reviews: 412,
    price: '월 28,000원',
    matchScore: 91,
    forSymptoms: ['insomnia', 'anxiety', 'fatigue'],
  },
  {
    id: 's9',
    category: 'nutrition',
    title: '오메가3 + 감마리놀렌산',
    provider: '오메가케어',
    description: '피부 건조와 관절 건강에 도움을 주는 고함량 오메가3.',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=300&fit=crop',
    tags: ['피부', '관절', '오메가3'],
    rating: 4.6,
    reviews: 289,
    price: '월 32,000원',
    matchScore: 87,
    forSymptoms: ['skin_dry', 'joint_pain'],
  },

  // 상담
  {
    id: 's10',
    category: 'counseling',
    title: '갱년기 전문 심리상담',
    provider: '마음돌봄 센터',
    description: '갱년기 우울, 불안을 전문으로 다루는 심리상담사와 1:1 상담.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
    tags: ['심리상담', '우울', '불안'],
    rating: 4.9,
    reviews: 167,
    price: '회당 80,000원',
    matchScore: 93,
    forSymptoms: ['anxiety', 'mood_swing'],
  },
  {
    id: 's11',
    category: 'counseling',
    title: '갱년기 영양 컨설팅',
    provider: '뉴트리 클리닉',
    description: '개인 증상에 맞는 식단과 영양제를 추천받는 1:1 영양 상담.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    tags: ['영양상담', '식단', '맞춤추천'],
    rating: 4.7,
    reviews: 134,
    price: '회당 50,000원',
    matchScore: 86,
    forSymptoms: ['weight_gain', 'fatigue', 'skin_dry'],
  },
  {
    id: 's12',
    category: 'counseling',
    title: '온라인 그룹 상담',
    provider: 'ALMA 웰니스',
    description: '비슷한 증상을 가진 5-8명이 함께하는 주 1회 온라인 그룹 상담.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop',
    tags: ['그룹상담', '공감', '커뮤니티'],
    rating: 4.8,
    reviews: 98,
    price: '월 40,000원',
    matchScore: 89,
    forSymptoms: ['anxiety', 'mood_swing'],
  },

  // 라이프스타일
  {
    id: 's13',
    category: 'lifestyle',
    title: '쿨링 베개 & 이불',
    provider: '슬립테크',
    description: '열감으로 인한 수면 방해를 줄여주는 냉감 소재 침구 세트.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    tags: ['수면', '열감', '냉감침구'],
    rating: 4.6,
    reviews: 234,
    price: '159,000원',
    matchScore: 92,
    forSymptoms: ['hot_flash', 'night_sweat', 'insomnia'],
  },
  {
    id: 's14',
    category: 'lifestyle',
    title: '수면 트래킹 스마트밴드',
    provider: '헬스테크',
    description: '수면 패턴을 분석하고 최적의 수면 시간을 추천하는 웨어러블 기기.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
    tags: ['수면분석', '웨어러블', '스마트밴드'],
    rating: 4.5,
    reviews: 178,
    price: '89,000원',
    matchScore: 84,
    forSymptoms: ['insomnia', 'fatigue'],
  },
  {
    id: 's15',
    category: 'lifestyle',
    title: '아로마 테라피 세트',
    provider: '센트웰',
    description: '라벤더, 캐모마일 등 이완에 도움을 주는 에센셜 오일 세트.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
    tags: ['아로마', '이완', '스트레스'],
    rating: 4.7,
    reviews: 312,
    price: '45,000원',
    matchScore: 80,
    forSymptoms: ['anxiety', 'insomnia'],
  },

  // 추천 제품
  {
    id: 's16',
    category: 'product',
    title: '핫플래시 쿨링 스프레이',
    provider: '쿨미스트',
    description: '갑작스러운 열감이 올 때 얼굴에 뿌리는 쿨링 미스트.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    tags: ['열감', '쿨링', '휴대용'],
    rating: 4.4,
    reviews: 456,
    price: '18,000원',
    matchScore: 88,
    forSymptoms: ['hot_flash'],
  },
  {
    id: 's17',
    category: 'product',
    title: '갱년기 전용 보습 크림',
    provider: '더마케어',
    description: '호르몬 변화로 건조해진 피부를 위한 고보습 페이셜 크림.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=300&fit=crop',
    tags: ['보습', '피부', '건조'],
    rating: 4.6,
    reviews: 289,
    price: '48,000원',
    matchScore: 85,
    forSymptoms: ['skin_dry'],
  },
  {
    id: 's18',
    category: 'product',
    title: '관절 보호 무릎 밴드',
    provider: '조인트케어',
    description: '운동 시 무릎 관절을 보호하는 압박 밴드. 일상 착용 가능.',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
    tags: ['관절', '운동', '보호대'],
    rating: 4.5,
    reviews: 167,
    price: '25,000원',
    matchScore: 82,
    forSymptoms: ['joint_pain'],
  },
];

type SolutionCategory = typeof SOLUTION_CATEGORIES[number]['id'];
type Solution = typeof SOLUTIONS[number];

export default function SolutionsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<SolutionCategory>('all');
  const [userSymptoms, setUserSymptoms] = useState<string[]>(['hot_flash', 'insomnia', 'fatigue']); // 데모용
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'reviews'>('match');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 사용자의 최근 기록에서 증상을 가져옴
    setTimeout(() => setLoading(false), 500);
  }, []);

  // 필터링 및 정렬
  const filteredSolutions = SOLUTIONS
    .filter(s => selectedCategory === 'all' || s.category === selectedCategory)
    .map(s => ({
      ...s,
      // 사용자 증상과 매치되는지 확인
      isRecommended: s.forSymptoms.some(symptom => userSymptoms.includes(symptom)),
    }))
    .sort((a, b) => {
      // 추천 솔루션 우선
      if (a.isRecommended !== b.isRecommended) return a.isRecommended ? -1 : 1;
      // 정렬 기준
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  const recommendedCount = filteredSolutions.filter(s => s.isRecommended).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-alma-primary to-alma-accent flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl">AI</span>
          </div>
          <p className="text-alma-text-secondary">맞춤 솔루션을 분석 중이에요...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alma-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-alma-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-alma-text-tertiary hover:text-alma-text transition-colors">
            ← 대시보드
          </Link>
          <h1 className="font-bold text-alma-text">AI 맞춤 솔루션</h1>
          <Link href="/insights" className="text-alma-primary text-sm font-medium">
            인사이트
          </Link>
        </div>
      </header>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-alma-primary to-alma-accent">
        <div className="max-w-4xl mx-auto px-5 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-bold">AI</span>
            </div>
            <div className="text-white">
              <h2 className="font-bold text-lg">나에게 맞는 솔루션을 찾았어요</h2>
              <p className="text-white/80 text-sm">
                최근 기록된 증상을 분석해서 <span className="font-semibold">{recommendedCount}개</span>의 솔루션을 추천해요
              </p>
            </div>
          </div>

          {/* User's symptoms */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-white/60 text-sm">내 주요 증상:</span>
            {userSymptoms.map((symptom, i) => (
              <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                {symptom === 'hot_flash' ? '열감' : symptom === 'insomnia' ? '수면장애' : '피로감'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-[57px] z-40 bg-white border-b border-alma-border">
        <div className="max-w-4xl mx-auto px-5 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {SOLUTION_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-alma-primary text-white'
                    : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="max-w-4xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-alma-text-secondary">
            {filteredSolutions.length}개의 솔루션
          </p>
          <div className="flex gap-2">
            {[
              { id: 'match', label: '매치순' },
              { id: 'rating', label: '평점순' },
              { id: 'reviews', label: '리뷰순' },
            ].map(option => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id as typeof sortBy)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  sortBy === option.id
                    ? 'bg-alma-text text-white'
                    : 'text-alma-text-tertiary hover:text-alma-text'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <main className="max-w-4xl mx-auto px-5 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSolutions.map(solution => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>

        {filteredSolutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-alma-text-secondary">해당 카테고리에 솔루션이 없어요.</p>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-alma-border">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Link
            href="/log"
            className="flex-1 py-3 bg-alma-bg text-alma-text font-medium rounded-xl text-center hover:bg-alma-border transition-all"
          >
            오늘 기록하기
          </Link>
          <Link
            href="/match"
            className="flex-1 py-3 bg-alma-primary text-white font-bold rounded-xl text-center hover:bg-alma-primary-dark transition-all"
          >
            비슷한 친구 찾기
          </Link>
        </div>
      </div>
    </div>
  );
}

// Solution Card Component
function SolutionCard({ solution }: { solution: Solution & { isRecommended: boolean } }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-lg ${
      solution.isRecommended ? 'border-alma-primary/30 ring-1 ring-alma-primary/20' : 'border-alma-border'
    }`}>
      {/* Image */}
      <div className="relative aspect-[4/3]">
        <Image
          src={solution.image}
          alt={solution.title}
          fill
          className="object-cover"
        />
        {/* Match Score */}
        {solution.isRecommended && (
          <div className="absolute top-3 left-3 bg-alma-primary px-3 py-1 rounded-full">
            <span className="text-white text-xs font-bold">{solution.matchScore}% 매치</span>
          </div>
        )}
        {/* Category */}
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full">
          <span className="text-xs text-alma-text-secondary">
            {SOLUTION_CATEGORIES.find(c => c.id === solution.category)?.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-alma-text line-clamp-1">{solution.title}</h3>
        </div>
        <p className="text-xs text-alma-text-tertiary mb-2">{solution.provider}</p>
        <p className="text-sm text-alma-text-secondary line-clamp-2 mb-3">
          {solution.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {solution.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-alma-bg text-alma-text-tertiary rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between pt-3 border-t border-alma-border">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium text-alma-text">{solution.rating}</span>
            <span className="text-xs text-alma-text-tertiary">({solution.reviews})</span>
          </div>
          <span className="text-sm font-bold text-alma-primary">{solution.price}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button className="w-full py-2.5 bg-alma-primary-light text-alma-primary font-medium rounded-xl hover:bg-alma-primary hover:text-white transition-all">
          자세히 보기
        </button>
      </div>
    </div>
  );
}

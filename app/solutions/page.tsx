'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SOLUTIONS, SOLUTION_CATEGORIES, DEMO_REVIEWS } from '@/lib/solutionsData';
import type { Solution, SolutionCategory } from '@/lib/solutionsData';
import { BreathingLoader } from '@/components/ui/BreathingLoader';

export default function SolutionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<SolutionCategory>('all');
  const [userSymptoms] = useState<string[]>(['hot_flash', 'insomnia', 'fatigue']); // 데모용
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
      <div className="min-h-screen bg-hlk-bg flex flex-col items-center justify-center gap-4">
        <BreathingLoader size="lg" showGuide />
        <p className="text-sm text-hlk-text-tertiary mt-4 animate-slow-fade-in-delay-2">
          맞춤 솔루션을 분석 중이에요...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hlk-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-hlk-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-hlk-text-tertiary hover:text-hlk-text transition-colors">
            ← 대시보드
          </Link>
          <h1 className="font-bold text-hlk-text">맞춤 솔루션</h1>
          <Link href="/insights" className="text-hlk-primary text-sm font-medium">
            패턴 리포트
          </Link>
        </div>
      </header>

      {/* Recommendation Banner */}
      <div className="bg-gradient-to-r from-hlk-primary to-hlk-accent">
        <div className="max-w-4xl mx-auto px-5 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
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
      <div className="sticky top-[57px] z-40 bg-white border-b border-hlk-border">
        <div className="max-w-4xl mx-auto px-5 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {SOLUTION_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-hlk-primary text-white'
                    : 'bg-hlk-bg text-hlk-text-secondary hover:bg-hlk-border'
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
          <p className="text-sm text-hlk-text-secondary">
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
                    ? 'bg-hlk-text text-white'
                    : 'text-hlk-text-tertiary hover:text-hlk-text'
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
            <p className="text-hlk-text-secondary">해당 카테고리에 솔루션이 없어요.</p>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-hlk-border">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Link
            href="/log"
            className="flex-1 py-3 bg-hlk-bg text-hlk-text font-medium rounded-xl text-center hover:bg-hlk-border transition-all"
          >
            오늘 기록하기
          </Link>
          <Link
            href="/community"
            className="flex-1 py-3 bg-hlk-primary text-white font-bold rounded-xl text-center hover:bg-hlk-primary-dark transition-all"
          >
            함께하기
          </Link>
        </div>
      </div>
    </div>
  );
}

// Solution Card Component
function SolutionCard({ solution }: { solution: Solution & { isRecommended: boolean } }) {
  const reviewCount = DEMO_REVIEWS.filter((r) => r.solutionId === solution.id).length;

  return (
    <Link
      href={`/solutions/${solution.id}`}
      className={`block bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-lg ${
        solution.isRecommended ? 'border-hlk-primary/30 ring-1 ring-hlk-primary/20 animate-glow-pulse' : 'border-hlk-border'
      }`}
    >
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
          <div className="absolute top-3 left-3 bg-hlk-primary px-3 py-1 rounded-full">
            <span className="text-white text-xs font-bold">{solution.matchScore}% 매치</span>
          </div>
        )}
        {/* Category */}
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full">
          <span className="text-xs text-hlk-text-secondary">
            {SOLUTION_CATEGORIES.find(c => c.id === solution.category)?.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-hlk-text line-clamp-1">{solution.title}</h3>
        </div>
        <p className="text-xs text-hlk-text-tertiary mb-2">{solution.provider}</p>
        <p className="text-sm text-hlk-text-secondary line-clamp-2 mb-3">
          {solution.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {solution.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-hlk-bg text-hlk-text-tertiary rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between pt-3 border-t border-hlk-border">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium text-hlk-text">{solution.rating}</span>
            <span className="text-xs text-hlk-text-tertiary">({solution.reviews})</span>
            {reviewCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-hlk-primary-light text-hlk-primary rounded text-[10px] font-medium">
                인증 {reviewCount}
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-hlk-primary">{solution.price}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <span className="block w-full py-2.5 bg-hlk-primary-light text-hlk-primary font-medium rounded-xl text-center hover:bg-hlk-primary hover:text-white transition-all">
          자세히 보기
        </span>
      </div>
    </Link>
  );
}

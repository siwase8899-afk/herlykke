'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getSolutionById, SOLUTIONS, DEMO_REVIEWS, SOLUTION_CATEGORIES } from '@/lib/solutionsData';
import type { SolutionReview } from '@/lib/solutionsData';
import { ReviewCard } from '@/components/solutions/ReviewCard';
import { ReviewForm } from '@/components/solutions/ReviewForm';
import { SYMPTOMS } from '@/lib/logTypes';

export default function SolutionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const solution = getSolutionById(id);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [localReviews, setLocalReviews] = useState<SolutionReview[]>([]);

  // 이 솔루션의 리뷰 (데모 + 로컬)
  const reviews = useMemo(() => {
    const demoForThis = DEMO_REVIEWS.filter((r) => r.solutionId === id);
    return [...localReviews, ...demoForThis];
  }, [id, localReviews]);

  // 평균 별점
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // 관련 솔루션 (같은 카테고리, 최대 3개)
  const relatedSolutions = solution
    ? SOLUTIONS.filter((s) => s.category === solution.category && s.id !== solution.id).slice(0, 3)
    : [];

  const handleReviewSubmit = (review: {
    rating: number;
    beforeSymptoms: Array<{ symptomId: string; severity: number }>;
    afterSymptoms: Array<{ symptomId: string; severity: number }>;
    usageDuration: string;
    content: string;
  }) => {
    const newReview: SolutionReview = {
      id: `local_${Date.now()}`,
      userId: 'demo-user',
      solutionId: id,
      rating: review.rating,
      beforeSymptoms: review.beforeSymptoms,
      afterSymptoms: review.afterSymptoms,
      usageDuration: review.usageDuration,
      content: review.content,
      stage: '활발기',
      ageRange: '50-54세',
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    setShowReviewForm(false);
  };

  if (!solution) {
    return (
      <div className="min-h-screen bg-hlk-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h2 className="font-bold text-hlk-text mb-2">솔루션을 찾을 수 없어요</h2>
          <Link href="/solutions" className="text-hlk-primary text-sm">
            ← 솔루션 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = SOLUTION_CATEGORIES.find((c) => c.id === solution.category)?.label;

  return (
    <div className="min-h-screen bg-hlk-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-hlk-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/solutions" className="text-hlk-text-tertiary hover:text-hlk-text transition-colors">
            ← 솔루션 목록
          </Link>
          <h1 className="font-bold text-hlk-text text-sm line-clamp-1 max-w-[200px] text-center">{solution.title}</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Hero Image */}
        <div className="relative aspect-[16/9]">
          <Image
            src={solution.image}
            alt={solution.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="px-3 py-1 bg-white/90 rounded-full text-xs text-hlk-text-secondary">
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Solution Info */}
        <div className="px-5 py-6 bg-white">
          <h2 className="text-xl font-bold text-hlk-text mb-1">{solution.title}</h2>
          <p className="text-sm text-hlk-text-tertiary mb-4">{solution.provider}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-bold text-hlk-text">{solution.rating}</span>
              <span className="text-xs text-hlk-text-tertiary">({solution.reviews})</span>
            </div>
            <span className="text-lg font-bold text-hlk-primary">{solution.price}</span>
          </div>

          <p className="text-sm text-hlk-text-secondary leading-relaxed mb-4">
            {solution.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {solution.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-hlk-bg text-hlk-text-secondary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* 관련 증상 */}
          {solution.forSymptoms.length > 0 && (
            <div className="pt-4 border-t border-hlk-border">
              <p className="text-xs text-hlk-text-tertiary mb-2">관련 증상</p>
              <div className="flex flex-wrap gap-2">
                {solution.forSymptoms.map((symptomId) => {
                  const symptom = SYMPTOMS.find((s) => s.id === symptomId);
                  if (!symptom) return null;
                  return (
                    <span key={symptomId} className="px-3 py-1 bg-hlk-primary-light text-hlk-primary rounded-full text-sm">
                      {symptom.emoji} {symptom.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 인증 리뷰 섹션 */}
        <div className="mt-2 px-5 py-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-hlk-text flex items-center gap-2">
                인증 리뷰
                <span className="px-2 py-0.5 bg-hlk-primary-light text-hlk-primary rounded-full text-xs font-medium">
                  {reviews.length}
                </span>
              </h3>
              {reviews.length > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-sm font-bold text-hlk-text">{avgRating}</span>
                  <span className="text-xs text-hlk-text-tertiary">평균</span>
                </div>
              )}
            </div>
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-4 py-2 bg-hlk-primary text-white text-sm font-medium rounded-xl hover:bg-hlk-primary-dark transition-all"
              >
                리뷰 쓰기
              </button>
            )}
          </div>

          {/* 리뷰 작성 폼 */}
          {showReviewForm && (
            <div className="mb-6">
              <ReviewForm
                solutionId={id}
                solutionTitle={solution.title}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {/* 리뷰 목록 */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-3xl mb-3">📝</p>
              <p className="text-sm text-hlk-text-secondary mb-1">아직 리뷰가 없어요</p>
              <p className="text-xs text-hlk-text-tertiary">첫 번째 인증 리뷰를 남겨보세요</p>
            </div>
          )}
        </div>

        {/* 관련 솔루션 */}
        {relatedSolutions.length > 0 && (
          <div className="mt-2 px-5 py-6 bg-white">
            <h3 className="font-bold text-hlk-text mb-4">관련 솔루션</h3>
            <div className="space-y-3">
              {relatedSolutions.map((related) => (
                <Link
                  key={related.id}
                  href={`/solutions/${related.id}`}
                  className="flex items-center gap-4 p-3 bg-hlk-bg rounded-xl hover:bg-hlk-border transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-hlk-text line-clamp-1">{related.title}</h4>
                    <p className="text-xs text-hlk-text-tertiary">{related.provider}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-500 text-xs">★ {related.rating}</span>
                      <span className="text-xs text-hlk-primary font-medium">{related.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 하단 여백 */}
        <div className="h-24" />
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4 bg-white border-t border-hlk-border">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Link
            href="/solutions"
            className="flex-1 py-3 bg-hlk-bg text-hlk-text font-medium rounded-xl text-center hover:bg-hlk-border transition-all"
          >
            목록으로
          </Link>
          <button className="flex-1 py-3 bg-hlk-primary text-white font-bold rounded-xl hover:bg-hlk-primary-dark transition-all">
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

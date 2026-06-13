'use client';

import { SYMPTOMS } from '@/lib/logTypes';
import type { SolutionReview } from '@/lib/solutionsData';

interface ReviewCardProps {
  review: SolutionReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
  };

  const getDurationLabel = (duration: string) => {
    const map: Record<string, string> = {
      '1week': '1주 미만',
      '1month': '1개월',
      '3months': '3개월',
      '6months': '6개월 이상',
    };
    return map[duration] || duration;
  };

  // Before/After 중 가장 큰 변화 증상 찾기
  const biggestChange = review.beforeSymptoms.length > 0
    ? review.beforeSymptoms.reduce((best, before) => {
        const after = review.afterSymptoms.find((a) => a.symptomId === before.symptomId);
        const change = before.severity - (after?.severity || before.severity);
        if (change > (best?.change || 0)) {
          return { symptomId: before.symptomId, before: before.severity, after: after?.severity || before.severity, change };
        }
        return best;
      }, null as { symptomId: string; before: number; after: number; change: number } | null)
    : null;

  const biggestSymptom = biggestChange
    ? SYMPTOMS.find((s) => s.id === biggestChange.symptomId)
    : null;

  return (
    <div className="card-glass rounded-2xl p-5">
      {/* Before/After 증상 변화 */}
      {biggestChange && biggestSymptom && (
        <div className="flex items-center gap-2 mb-3 p-3 bg-hlk-bg rounded-xl">
          <span className="text-lg">{biggestSymptom.emoji}</span>
          <span className="text-sm font-semibold text-hlk-text">{biggestSymptom.name}</span>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-sm font-bold text-hlk-error">{biggestChange.before}/5</span>
            <span className="text-hlk-text-tertiary">→</span>
            <span className="text-sm font-bold text-hlk-success">{biggestChange.after}/5</span>
          </div>
          <span className="text-xs text-hlk-text-tertiary">| {getDurationLabel(review.usageDuration)}</span>
        </div>
      )}

      {/* 리뷰 본문 */}
      <p className="text-sm text-hlk-text leading-relaxed mb-3">
        &ldquo;{review.content}&rdquo;
      </p>

      {/* 별점 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={`text-sm ${star <= review.rating ? 'text-hlk-star' : 'text-hlk-border'}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      {/* 메타 정보 */}
      <div className="flex items-center gap-2 text-xs text-hlk-text-tertiary">
        {review.stage && <span>{review.stage}</span>}
        {review.stage && review.ageRange && <span>·</span>}
        {review.ageRange && <span>{review.ageRange}</span>}
        {(review.stage || review.ageRange) && <span>·</span>}
        {review.isVerified && (
          <span className="flex items-center gap-1 text-hlk-primary font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            인증 리뷰
          </span>
        )}
        <span className="ml-auto">{formatDate(review.createdAt)}</span>
      </div>
    </div>
  );
}

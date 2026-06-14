'use client';

import { useState } from 'react';
import { SYMPTOMS } from '@/lib/logTypes';
import { USAGE_DURATIONS } from '@/lib/solutionsData';

interface ReviewFormProps {
  solutionId: string;
  solutionTitle: string;
  onSubmit: (review: {
    rating: number;
    beforeSymptoms: Array<{ symptomId: string; severity: number }>;
    afterSymptoms: Array<{ symptomId: string; severity: number }>;
    usageDuration: string;
    content: string;
  }) => void;
  onCancel: () => void;
}

export function ReviewForm({ solutionTitle, onSubmit, onCancel }: ReviewFormProps) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [usageDuration, setUsageDuration] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [beforeSeverity, setBeforeSeverity] = useState<Record<string, number>>({});
  const [afterSeverity, setAfterSeverity] = useState<Record<string, number>>({});
  const [content, setContent] = useState('');

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((s) => s !== id);
        const newBefore = { ...beforeSeverity };
        const newAfter = { ...afterSeverity };
        delete newBefore[id];
        delete newAfter[id];
        setBeforeSeverity(newBefore);
        setAfterSeverity(newAfter);
        return updated;
      }
      setBeforeSeverity((prev) => ({ ...prev, [id]: 3 }));
      setAfterSeverity((prev) => ({ ...prev, [id]: 2 }));
      return [...prev, id];
    });
  };

  const canProceedStep1 = rating > 0 && usageDuration;
  const canProceedStep2 = selectedSymptoms.length > 0;
  const canSubmit = content.trim().length >= 10;

  const handleSubmit = () => {
    onSubmit({
      rating,
      beforeSymptoms: selectedSymptoms.map((id) => ({ symptomId: id, severity: beforeSeverity[id] || 3 })),
      afterSymptoms: selectedSymptoms.map((id) => ({ symptomId: id, severity: afterSeverity[id] || 2 })),
      usageDuration,
      content: content.trim(),
    });
  };

  return (
    <div className="card-glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-hlk-border bg-hlk-bg">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-hlk-text">리뷰 작성</h3>
          <button onClick={onCancel} className="text-hlk-text-tertiary hover:text-hlk-text">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-hlk-text-tertiary mt-1">{solutionTitle}</p>
        {/* Progress */}
        <div className="flex gap-1 mt-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-hlk-primary' : 'bg-hlk-border'}`} />
          ))}
        </div>
      </div>

      <div className="p-5">
        {step === 1 && (
          <div className="space-y-5">
            {/* 별점 */}
            <div>
              <label className="text-sm font-medium text-hlk-text block mb-3">만족도</label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-all ${star <= rating ? 'text-hlk-star scale-110' : 'text-hlk-border'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* 사용 기간 */}
            <div>
              <label className="text-sm font-medium text-hlk-text block mb-3">사용 기간</label>
              <div className="grid grid-cols-2 gap-2">
                {USAGE_DURATIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setUsageDuration(d.id)}
                    className={`py-3 px-4 rounded-xl text-sm transition-all ${
                      usageDuration === d.id
                        ? 'bg-hlk-primary text-white'
                        : 'border border-hlk-border text-hlk-text-secondary hover:bg-hlk-bg'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                canProceedStep1
                  ? 'bg-hlk-primary text-white'
                  : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            {/* 증상 선택 */}
            <div>
              <label className="text-sm font-medium text-hlk-text block mb-2">관련 증상 선택</label>
              <p className="text-xs text-hlk-text-tertiary mb-3">이 솔루션과 관련된 증상을 선택해주세요</p>
              <div className="flex flex-wrap gap-2">
                {SYMPTOMS.slice(0, 10).map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`px-3 py-2 rounded-full text-sm transition-all ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'bg-hlk-primary text-white'
                        : 'bg-hlk-bg text-hlk-text-secondary hover:bg-hlk-border'
                    }`}
                  >
                    {symptom.emoji} {symptom.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Before/After 강도 */}
            {selectedSymptoms.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-hlk-text">증상 변화 (사용 전 → 후)</p>
                {selectedSymptoms.map((symptomId) => {
                  const symptom = SYMPTOMS.find((s) => s.id === symptomId);
                  if (!symptom) return null;
                  return (
                    <div key={symptomId} className="bg-hlk-bg rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span>{symptom.emoji}</span>
                        <span className="text-sm font-medium text-hlk-text">{symptom.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-hlk-text-tertiary mb-2">사용 전</p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((v) => (
                              <button
                                key={v}
                                onClick={() => setBeforeSeverity((prev) => ({ ...prev, [symptomId]: v }))}
                                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                                  (beforeSeverity[symptomId] || 3) >= v
                                    ? 'bg-hlk-error text-white'
                                    : 'bg-white border border-hlk-border'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-hlk-text-tertiary mb-2">사용 후</p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((v) => (
                              <button
                                key={v}
                                onClick={() => setAfterSeverity((prev) => ({ ...prev, [symptomId]: v }))}
                                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                                  (afterSeverity[symptomId] || 2) >= v
                                    ? 'bg-hlk-success text-white'
                                    : 'bg-white border border-hlk-border'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border border-hlk-border rounded-xl text-sm text-hlk-text-secondary">
                이전
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  canProceedStep2
                    ? 'bg-hlk-primary text-white'
                    : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
                }`}
              >
                다음
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            {/* 자유 후기 */}
            <div>
              <label className="text-sm font-medium text-hlk-text block mb-2">후기 작성</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="이 솔루션을 사용하면서 느낀 점을 자유롭게 적어주세요 (10자 이상)"
                rows={5}
                className="w-full px-4 py-3 border border-hlk-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hlk-primary/30 focus:border-hlk-primary resize-none"
              />
              <p className="text-xs text-hlk-text-tertiary mt-1 text-right">
                {content.length}자
              </p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 py-3 border border-hlk-border rounded-xl text-sm text-hlk-text-secondary">
                이전
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  canSubmit
                    ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark'
                    : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
                }`}
              >
                리뷰 등록하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Tip, CATEGORY_INFO, DIFFICULTY_INFO } from '@/lib/tipsData';
import { SYMPTOMS } from '@/lib/logTypes';

interface TipCardProps {
  tip: Tip;
  reason?: string;
  showSymptom?: boolean;
}

export function TipCard({ tip, reason, showSymptom = true }: TipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryInfo = CATEGORY_INFO[tip.category];
  const difficultyInfo = DIFFICULTY_INFO[tip.difficulty];
  const symptom = SYMPTOMS.find((s) => s.id === tip.symptomId);

  return (
    <div
      className={`card-glass rounded-2xl overflow-hidden transition-all ${
        isExpanded ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* 헤더 - 클릭 가능 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-start gap-3"
      >
        <span className="text-2xl">{tip.emoji}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-hlk-text">{tip.title}</h4>
          {reason && (
            <p className="text-xs text-hlk-text-tertiary mt-0.5">{reason}</p>
          )}
          {showSymptom && symptom && (
            <span className="inline-flex items-center gap-1 text-xs text-hlk-primary mt-1">
              {symptom.emoji} {symptom.name}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-hlk-text-tertiary transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 확장된 내용 */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-hlk-border">
          <p className="text-sm text-hlk-text-secondary leading-relaxed mt-3">
            {tip.description}
          </p>

          {/* 메타 정보 */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`text-xs px-2 py-1 rounded-full ${categoryInfo.color}`}>
              {categoryInfo.emoji} {categoryInfo.label}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-hlk-bg text-hlk-text-secondary">
              난이도: <span className={difficultyInfo.color}>{difficultyInfo.label}</span>
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-hlk-bg text-hlk-text-secondary">
              효과: {tip.timeToEffect}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { PhysicalSymptoms, EmotionalSymptoms } from '../../lib/constants';

const CLUSTER_LABELS: Record<string, string> = {
  vasomotor: '열감/수면 중심',
  emotional_dominant: '감정 중심',
  musculoskeletal: '관절/피로 중심',
  mood_focused: '기분 변화 중심',
  mixed: '복합형',
};

interface SymptomSummaryProps {
  physicalSymptoms: string[];
  emotionalSymptoms: string[];
  cluster: string;
}

export function SymptomSummary({ physicalSymptoms, emotionalSymptoms, cluster }: SymptomSummaryProps) {
  const physicalItems = PhysicalSymptoms.filter((s) => physicalSymptoms.includes(s.key));
  const emotionalItems = EmotionalSymptoms.filter((s) => emotionalSymptoms.includes(s.key));

  return (
    <div className="bg-hlk-surface rounded-2xl border border-hlk-border p-6">
      <h3 className="text-base font-bold text-hlk-text mb-1">나의 증상 패턴</h3>
      <p className="text-sm text-hlk-primary font-medium mb-4">
        {CLUSTER_LABELS[cluster] || cluster}
      </p>

      {physicalItems.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-hlk-text-tertiary font-medium mb-2">신체 증상</p>
          <div className="flex flex-wrap gap-2">
            {physicalItems.map((s) => (
              <span key={s.key} className="text-sm bg-hlk-primary-light/50 text-hlk-primary-dark px-3 py-1 rounded-full">
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {emotionalItems.length > 0 && (
        <div>
          <p className="text-xs text-hlk-text-tertiary font-medium mb-2">감정 변화</p>
          <div className="flex flex-wrap gap-2">
            {emotionalItems.map((s) => (
              <span key={s.key} className="text-sm bg-hlk-secondary-light/50 text-hlk-secondary px-3 py-1 rounded-full">
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

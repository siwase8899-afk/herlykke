'use client';

import { MenopauseStageLabel } from '../../lib/constants';
import type { MenopauseStage } from '../../types/database';
import { Sparkles } from 'lucide-react';

const CONFIDENCE_LABEL: Record<string, string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
};

interface StageCardProps {
  stage: MenopauseStage;
  confidence: 'high' | 'medium' | 'low';
  description: string;
}

export function StageCard({ stage, confidence, description }: StageCardProps) {
  return (
    <div className="card-glass rounded-2xl p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-hlk-primary-light text-hlk-primary">
        <Sparkles className="h-6 w-6" aria-hidden />
      </div>
      <p className="text-sm text-hlk-primary font-semibold mb-2">
        당신은 현재
      </p>
      <h2 className="text-2xl font-bold text-hlk-text mb-3">
        {MenopauseStageLabel[stage] || '확인 중'}
      </h2>
      <p className="text-[15px] text-hlk-text-secondary leading-relaxed mb-4">
        {description}
      </p>
      <span className={`
        inline-block text-xs font-medium px-3 py-1 rounded-full
        ${confidence === 'high'
          ? 'bg-hlk-success/10 text-hlk-success'
          : 'bg-hlk-warning/10 text-hlk-warning'
        }
      `}>
        신뢰도: {CONFIDENCE_LABEL[confidence]}
      </span>
    </div>
  );
}

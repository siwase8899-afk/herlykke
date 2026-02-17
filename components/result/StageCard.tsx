'use client';

import { MenopauseStageLabel } from '../../lib/constants';
import type { MenopauseStage } from '../../types/database';

const STAGE_EMOJI: Record<string, string> = {
  preparation: '🌱',
  perimenopause: '🌿',
  menopause_active: '🌺',
  postmenopause_early: '🍂',
  postmenopause_stable: '🌳',
  unknown: '❓',
};

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
    <div className="bg-hlk-surface rounded-2xl border border-hlk-border p-8 text-center">
      <div className="text-5xl mb-4">{STAGE_EMOJI[stage]}</div>
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

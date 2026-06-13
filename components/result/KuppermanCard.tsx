'use client';

import type { KuppermanResult, KuppermanLevel } from '../../lib/stageClassifier';
import { BarChart3 } from 'lucide-react';

const LEVEL_CONFIG: Record<KuppermanLevel, { color: string; bg: string; dot: string }> = {
  normal:   { color: 'text-hlk-success',  bg: 'bg-hlk-success/10', dot: 'bg-hlk-success' },
  mild:     { color: 'text-hlk-primary',  bg: 'bg-hlk-primary-light', dot: 'bg-hlk-primary' },
  moderate: { color: 'text-hlk-warning',  bg: 'bg-hlk-warning/10', dot: 'bg-hlk-warning' },
  severe:   { color: 'text-hlk-error',    bg: 'bg-hlk-error/10', dot: 'bg-hlk-error' },
};

interface KuppermanCardProps {
  result: KuppermanResult;
}

export function KuppermanCard({ result }: KuppermanCardProps) {
  const config = LEVEL_CONFIG[result.level];
  const percentage = Math.round((result.score / result.maxScore) * 100);
  const activeDetails = result.details.filter(d => d.severity > 0);

  return (
    <div className="card-glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-hlk-primary" aria-hidden />
        <h3 className="text-base font-bold text-hlk-text">변화 지수</h3>
        <span className="text-xs text-hlk-text-tertiary ml-auto">체크인 답변 기반</span>
      </div>

      {/* 점수 표시 */}
      <div className="text-center mb-5">
        <div className="text-4xl font-black text-hlk-text mb-1">
          {result.score}<span className="text-lg font-normal text-hlk-text-tertiary">/{result.maxScore}</span>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
          <span className={`h-2 w-2 rounded-full ${config.dot}`} aria-hidden />
          {result.levelLabel}
        </span>
      </div>

      {/* 게이지 바 */}
      <div className="mb-5">
        <div className="h-3 bg-hlk-bg rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(percentage, 2)}%`,
              background: result.level === 'normal' ? '#15803D'
                : result.level === 'mild' ? '#6F9CA6'
                : result.level === 'moderate' ? '#EA580C'
                : '#DC2626',
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-hlk-text-tertiary">
          <span>정상 (0-6)</span>
          <span>경미 (7-15)</span>
          <span>중등도 (16-30)</span>
          <span>중증 (31+)</span>
        </div>
      </div>

      {/* 상위 증상 상세 */}
      {activeDetails.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-hlk-text-secondary mb-2">주요 증상 점수</p>
          <div className="space-y-2">
            {activeDetails
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((d) => (
                <div key={d.key} className="flex items-center gap-2">
                  <span className="text-xs text-hlk-text-secondary w-24 truncate">{d.label}</span>
                  <div className="flex-1 h-2 bg-hlk-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-hlk-primary rounded-full"
                      style={{ width: `${(d.score / (d.weight * 3)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-hlk-text w-8 text-right">
                    {d.score}/{d.weight * 3}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <p className="text-[10px] text-hlk-text-tertiary mt-4 text-center leading-relaxed">
        체크인 답변을 바탕으로 현재 변화 정도를 간단히 정리한 참고 지표입니다.
      </p>
    </div>
  );
}

'use client';

import type { KuppermanResult, KuppermanLevel } from '../../lib/stageClassifier';

const LEVEL_CONFIG: Record<KuppermanLevel, { color: string; bg: string; emoji: string }> = {
  normal:   { color: 'text-alma-success',  bg: 'bg-alma-success/10', emoji: '🟢' },
  mild:     { color: 'text-alma-primary',  bg: 'bg-alma-primary-light', emoji: '🟡' },
  moderate: { color: 'text-alma-warning',  bg: 'bg-alma-warning/10', emoji: '🟠' },
  severe:   { color: 'text-alma-error',    bg: 'bg-alma-error/10', emoji: '🔴' },
};

interface KuppermanCardProps {
  result: KuppermanResult;
}

export function KuppermanCard({ result }: KuppermanCardProps) {
  const config = LEVEL_CONFIG[result.level];
  const percentage = Math.round((result.score / result.maxScore) * 100);
  const activeDetails = result.details.filter(d => d.severity > 0);

  return (
    <div className="bg-alma-surface rounded-2xl border border-alma-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📊</span>
        <h3 className="text-base font-bold text-alma-text">변화 지수</h3>
        <span className="text-xs text-alma-text-tertiary ml-auto">쿠퍼만 기반</span>
      </div>

      {/* 점수 표시 */}
      <div className="text-center mb-5">
        <div className="text-4xl font-black text-alma-text mb-1">
          {result.score}<span className="text-lg font-normal text-alma-text-tertiary">/{result.maxScore}</span>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
          {config.emoji} {result.levelLabel}
        </span>
      </div>

      {/* 게이지 바 */}
      <div className="mb-5">
        <div className="h-3 bg-alma-bg rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(percentage, 2)}%`,
              background: result.level === 'normal' ? '#15803D'
                : result.level === 'mild' ? '#1A6B5A'
                : result.level === 'moderate' ? '#EA580C'
                : '#DC2626',
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-alma-text-tertiary">
          <span>정상 (0-6)</span>
          <span>경미 (7-15)</span>
          <span>중등도 (16-30)</span>
          <span>중증 (31+)</span>
        </div>
      </div>

      {/* 상위 증상 상세 */}
      {activeDetails.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-alma-text-secondary mb-2">주요 증상 점수</p>
          <div className="space-y-2">
            {activeDetails
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((d) => (
                <div key={d.key} className="flex items-center gap-2">
                  <span className="text-xs text-alma-text-secondary w-24 truncate">{d.label}</span>
                  <div className="flex-1 h-2 bg-alma-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-alma-primary rounded-full"
                      style={{ width: `${(d.score / (d.weight * 3)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-alma-text w-8 text-right">
                    {d.score}/{d.weight * 3}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <p className="text-[10px] text-alma-text-tertiary mt-4 text-center leading-relaxed">
        임상에서 사용되는 쿠퍼만 갱년기 지수(Kupperman Index) 기반
      </p>
    </div>
  );
}

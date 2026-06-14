'use client';

import { WeeklySummary } from '@/lib/patternAnalysis';
import { MOOD_OPTIONS } from '@/lib/logTypes';
import { EmojiIcon } from '@/lib/iconMap';

interface WeeklySummaryCardProps {
  summary: WeeklySummary;
  dateRange: string;
}

export function WeeklySummaryCard({ summary, dateRange }: WeeklySummaryCardProps) {
  const moodEmoji = MOOD_OPTIONS.find((m) => m.value === Math.round(summary.avgMood))?.emoji || '😐';

  const getTrendIcon = (trend: 'improving' | 'declining' | 'stable') => {
    switch (trend) {
      case 'improving':
        return { icon: '📈', text: '개선 중', color: 'text-hlk-success' };
      case 'declining':
        return { icon: '📉', text: '주의 필요', color: 'text-hlk-error' };
      default:
        return { icon: '➡️', text: '유지 중', color: 'text-hlk-warning' };
    }
  };

  const trend = getTrendIcon(summary.moodTrend);

  return (
    <div className="bg-gradient-to-br from-hlk-primary to-hlk-accent rounded-3xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/70 text-sm">{dateRange}</p>
          <h2 className="text-xl font-bold">주간 리포트</h2>
        </div>
        <EmojiIcon emoji={moodEmoji} size={32} className="text-white" />
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
          <p className="text-2xl font-bold font-[family-name:var(--font-serif)]">{summary.avgMood.toFixed(1)}</p>
          <p className="text-xs text-white/70">평균 기분</p>
        </div>
        <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
          <p className="text-2xl font-bold font-[family-name:var(--font-serif)]">{summary.totalLogs}</p>
          <p className="text-xs text-white/70">기록 일수</p>
        </div>
        <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
          <EmojiIcon emoji={trend.icon} size={22} className="text-white" />
          <p className="text-xs text-white/70 mt-0.5">{trend.text}</p>
        </div>
      </div>

      {/* 주요 인사이트 */}
      <div className="space-y-2 text-sm">
        {summary.topSymptom && (
          <div className="flex items-center gap-2">
            <span className="text-white/70">가장 많은 증상:</span>
            <span className="font-medium">
              {summary.topSymptom.emoji} {summary.topSymptom.name}
              <span className="text-white/70 ml-1">({summary.topSymptom.count}회)</span>
            </span>
          </div>
        )}
        {summary.bestActivity && (
          <div className="flex items-center gap-2">
            <span className="text-white/70">도움이 된 활동:</span>
            <span className="font-medium">
              {summary.bestActivity.emoji} {summary.bestActivity.name}
            </span>
          </div>
        )}
        {summary.worstTrigger && (
          <div className="flex items-center gap-2">
            <span className="text-white/70">주의할 트리거:</span>
            <span className="font-medium">
              {summary.worstTrigger.emoji} {summary.worstTrigger.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

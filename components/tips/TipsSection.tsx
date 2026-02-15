'use client';

import { useState } from 'react';
import { DailyLog } from '@/lib/logTypes';
import { getPersonalizedTips, getTipsForTodaySymptoms, RecommendedTip } from '@/lib/tipRecommendation';
import { CATEGORY_INFO } from '@/lib/tipsData';
import { TipCard } from './TipCard';

interface TipsSectionProps {
  logs: DailyLog[];
  todayLog?: DailyLog;
}

type FilterCategory = 'all' | 'lifestyle' | 'nutrition' | 'exercise' | 'mindfulness';

export function TipsSection({ logs, todayLog }: TipsSectionProps) {
  const [filter, setFilter] = useState<FilterCategory>('all');

  // 오늘 증상 기반 팁
  const todayTips = getTipsForTodaySymptoms(todayLog, 3);

  // 전체 패턴 기반 팁
  const personalizedTips = getPersonalizedTips(logs, 10);

  // 필터링
  const filteredTips = filter === 'all'
    ? personalizedTips
    : personalizedTips.filter((tip) => tip.category === filter);

  const filterButtons: { key: FilterCategory; label: string; emoji: string }[] = [
    { key: 'all', label: '전체', emoji: '✨' },
    { key: 'lifestyle', label: '생활', emoji: '🏠' },
    { key: 'nutrition', label: '영양', emoji: '🥗' },
    { key: 'exercise', label: '운동', emoji: '🏃' },
    { key: 'mindfulness', label: '마음', emoji: '🧘' },
  ];

  return (
    <div className="space-y-6">
      {/* 오늘 증상 기반 추천 */}
      {todayTips.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💡</span>
            <h3 className="font-semibold text-alma-text">오늘을 위한 팁</h3>
          </div>
          <div className="space-y-3">
            {todayTips.map((tip) => (
              <TipCard key={tip.id} tip={tip} reason={tip.reason} showSymptom={false} />
            ))}
          </div>
        </div>
      )}

      {/* 전체 맞춤 팁 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <h3 className="font-semibold text-alma-text">나를 위한 맞춤 팁</h3>
          </div>
          <span className="text-xs text-alma-text-tertiary">
            {filteredTips.length}개
          </span>
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
                filter === btn.key
                  ? 'bg-alma-primary text-white'
                  : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
              }`}
            >
              {btn.emoji} {btn.label}
            </button>
          ))}
        </div>

        {/* 팁 목록 */}
        {filteredTips.length > 0 ? (
          <div className="space-y-3">
            {filteredTips.map((tip) => (
              <TipCard key={tip.id} tip={tip} reason={tip.reason} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-alma-text-tertiary">
            <p>해당 카테고리의 팁이 없어요</p>
          </div>
        )}
      </div>

      {/* 팁이 없을 때 */}
      {personalizedTips.length === 0 && todayTips.length === 0 && (
        <div className="bg-white rounded-2xl p-6 border border-alma-border text-center">
          <span className="text-4xl mb-3 block">💡</span>
          <h3 className="font-semibold text-alma-text mb-2">맞춤 팁을 준비 중이에요</h3>
          <p className="text-sm text-alma-text-secondary">
            증상을 기록하면 나에게 맞는 케어 팁을 추천해드릴게요
          </p>
        </div>
      )}
    </div>
  );
}

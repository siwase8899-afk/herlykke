'use client';

import { ACTIVITIES } from '@/lib/logTypes';

interface ActivityTagsProps {
  selected: string[];
  onToggle: (activityId: string) => void;
}

export function ActivityTags({ selected, onToggle }: ActivityTagsProps) {
  const positiveActivities = ACTIVITIES.filter((a) => a.type === 'positive');
  const triggerActivities = ACTIVITIES.filter((a) => a.type === 'trigger');

  return (
    <div>
      <h2 className="text-2xl font-bold text-alma-text mb-3 text-center">
        오늘 어떤 활동을 했나요?
      </h2>
      <p className="text-alma-text-secondary mb-8 text-center">
        해당되는 활동을 모두 선택해주세요
      </p>

      <div className="max-w-md mx-auto space-y-6">
        {/* 긍정적 활동 */}
        <div>
          <p className="text-sm font-semibold text-alma-primary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            좋은 활동
          </p>
          <div className="flex flex-wrap gap-2">
            {positiveActivities.map((activity) => {
              const isSelected = selected.includes(activity.id);
              return (
                <button
                  key={activity.id}
                  onClick={() => onToggle(activity.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                    isSelected
                      ? 'bg-green-100 border-2 border-green-400 text-green-700'
                      : 'bg-white border-2 border-alma-border text-alma-text-secondary hover:border-green-300'
                  }`}
                >
                  <span>{activity.emoji}</span>
                  <span className="text-sm font-medium">{activity.name}</span>
                  {isSelected && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 트리거 활동 */}
        <div>
          <p className="text-sm font-semibold text-alma-accent mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            증상에 영향을 줄 수 있는 활동
          </p>
          <div className="flex flex-wrap gap-2">
            {triggerActivities.map((activity) => {
              const isSelected = selected.includes(activity.id);
              return (
                <button
                  key={activity.id}
                  onClick={() => onToggle(activity.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-2 border-amber-400 text-amber-700'
                      : 'bg-white border-2 border-alma-border text-alma-text-secondary hover:border-amber-300'
                  }`}
                >
                  <span>{activity.emoji}</span>
                  <span className="text-sm font-medium">{activity.name}</span>
                  {isSelected && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 안내 */}
        <p className="text-center text-xs text-alma-text-tertiary">
          활동 기록은 나중에 증상 패턴을 분석하는 데 도움이 돼요
        </p>
      </div>
    </div>
  );
}

'use client';

import { ACTIVITIES } from '@/lib/logTypes';

interface ActivityTagsProps {
  selected: string[];
  onToggle: (activityId: string) => void;
}

const CATEGORY_CONFIG = {
  physical: { label: '신체 활동', color: 'green', dot: 'bg-green-400', selected: 'bg-green-100 border-green-400 text-green-700', hover: 'hover:border-green-300' },
  mental: { label: '정신 건강', color: 'blue', dot: 'bg-blue-400', selected: 'bg-blue-100 border-blue-400 text-blue-700', hover: 'hover:border-blue-300' },
  selfcare: { label: '셀프케어', color: 'purple', dot: 'bg-purple-400', selected: 'bg-purple-100 border-purple-400 text-purple-700', hover: 'hover:border-purple-300' },
  social: { label: '사회적 활동', color: 'teal', dot: 'bg-teal-400', selected: 'bg-teal-100 border-teal-400 text-teal-700', hover: 'hover:border-teal-300' },
  trigger: { label: '증상에 영향을 줄 수 있는 활동', color: 'amber', dot: 'bg-amber-400', selected: 'bg-amber-100 border-amber-400 text-amber-700', hover: 'hover:border-amber-300' },
} as const;

const CATEGORY_ORDER: (keyof typeof CATEGORY_CONFIG)[] = ['physical', 'mental', 'selfcare', 'social', 'trigger'];

export function ActivityTags({ selected, onToggle }: ActivityTagsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-alma-text mb-3 text-center">
        오늘 어떤 활동을 했나요?
      </h2>
      <p className="text-alma-text-secondary mb-8 text-center">
        해당되는 활동을 모두 선택해주세요
      </p>

      <div className="max-w-md mx-auto space-y-5">
        {CATEGORY_ORDER.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const activities = ACTIVITIES.filter((a) => a.category === cat);
          if (activities.length === 0) return null;

          return (
            <div key={cat}>
              <p className={`text-sm font-semibold ${cat === 'trigger' ? 'text-alma-accent' : 'text-alma-primary'} mb-3 flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                {config.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {activities.map((activity) => {
                  const isSelected = selected.includes(activity.id);
                  return (
                    <button
                      key={activity.id}
                      onClick={() => onToggle(activity.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                        isSelected
                          ? `${config.selected} border-2`
                          : `bg-white border-2 border-alma-border text-alma-text-secondary ${config.hover}`
                      }`}
                    >
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
          );
        })}

        {/* 안내 */}
        <p className="text-center text-xs text-alma-text-tertiary">
          활동 기록은 나중에 AI가 증상 패턴을 분석하는 데 도움이 돼요
        </p>
      </div>
    </div>
  );
}

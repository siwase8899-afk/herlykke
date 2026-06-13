'use client';

import { ACTIVITIES } from '@/lib/logTypes';

interface ActivityTagsProps {
  selected: string[];
  onToggle: (activityId: string) => void;
}

const CATEGORY_CONFIG = {
  physical: { label: '신체 활동', color: 'green', dot: 'bg-hlk-primary', selected: 'bg-hlk-primary-light border-hlk-primary text-hlk-primary-dark', hover: 'hover:border-hlk-primary' },
  mental: { label: '수면에 도움 되는 활동', color: 'blue', dot: 'bg-hlk-accent', selected: 'bg-hlk-accent-light border-hlk-accent text-hlk-accent-dark', hover: 'hover:border-hlk-accent' },
  selfcare: { label: '저녁 루틴', color: 'purple', dot: 'bg-hlk-clay', selected: 'bg-hlk-clay-light border-hlk-clay text-hlk-clay-dark', hover: 'hover:border-hlk-clay' },
  social: { label: '사회적 활동', color: 'teal', dot: 'bg-hlk-lavender', selected: 'bg-hlk-lavender-light border-hlk-lavender text-hlk-lavender', hover: 'hover:border-hlk-lavender' },
  trigger: { label: '수면을 방해할 수 있는 활동', color: 'amber', dot: 'bg-hlk-indigo', selected: 'bg-hlk-indigo-light border-hlk-indigo text-hlk-indigo', hover: 'hover:border-hlk-indigo' },
} as const;

const CATEGORY_ORDER: (keyof typeof CATEGORY_CONFIG)[] = ['physical', 'mental', 'selfcare', 'social', 'trigger'];

export function ActivityTags({ selected, onToggle }: ActivityTagsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-hlk-text mb-3 text-center">
        어제 어떤 활동을 했나요?
      </h2>
      <p className="text-hlk-text-secondary mb-8 text-center">
        수면에 영향을 준 활동을 기록해주세요
      </p>

      <div className="max-w-md mx-auto space-y-5">
        {CATEGORY_ORDER.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const activities = ACTIVITIES.filter((a) => a.category === cat);
          if (activities.length === 0) return null;

          return (
            <div key={cat}>
              <p className={`text-sm font-semibold ${cat === 'trigger' ? 'text-hlk-accent' : 'text-hlk-primary'} mb-3 flex items-center gap-2`}>
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
                          : `bg-white border-2 border-hlk-border text-hlk-text-secondary ${config.hover}`
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
        <p className="text-center text-xs text-hlk-text-tertiary">
          활동 기록은 수면 패턴 분석에 도움이 돼요
        </p>
      </div>
    </div>
  );
}

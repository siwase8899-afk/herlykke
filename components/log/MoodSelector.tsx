'use client';

import { MOOD_OPTIONS } from '@/lib/logTypes';
import { MOOD_TAGS } from '@/lib/dailyLogConstants';

interface MoodSelectorProps {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (mood: 1 | 2 | 3 | 4 | 5) => void;
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
}

export function MoodSelector({ value, onChange, selectedTags, onToggleTag }: MoodSelectorProps) {
  return (
    <div className="text-center">
      {/* Layer 1: 전반적 컨디션 */}
      <h2 className="text-2xl font-bold text-alma-text mb-3">
        오늘 전반적인 컨디션은 어때요?
      </h2>
      <p className="text-alma-text-secondary mb-8">
        몸과 마음을 종합해서 선택해주세요
      </p>

      <div className="flex justify-center gap-4">
        {MOOD_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value as 1 | 2 | 3 | 4 | 5)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
              value === option.value
                ? 'bg-alma-primary-light border-2 border-alma-primary scale-110'
                : 'bg-white border-2 border-alma-border hover:border-alma-primary/50'
            }`}
          >
            <span className="text-4xl">{option.emoji}</span>
            <span
              className={`text-xs font-medium ${
                value === option.value ? 'text-alma-primary' : 'text-alma-text-tertiary'
              }`}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Layer 2: 감정 태그 (컨디션 선택 후 표시) */}
      {value !== null && (
        <div className="mt-10 animate-fade-in">
          <h3 className="text-lg font-bold text-alma-text mb-2">
            좀 더 구체적으로, 지금 어떤 느낌이에요?
          </h3>
          <p className="text-sm text-alma-text-tertiary mb-5">
            해당되는 것을 모두 선택해주세요 (선택)
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {MOOD_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => onToggleTag(tag.id)}
                  className={`
                    inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium
                    border transition-all
                    ${isSelected
                      ? tag.color + ' border-current scale-105'
                      : 'bg-white text-alma-text-secondary border-alma-border hover:border-alma-primary/40'
                    }
                  `}
                >
                  <span>{tag.emoji}</span>
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

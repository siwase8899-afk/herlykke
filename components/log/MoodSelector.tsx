'use client';

import { MOOD_OPTIONS } from '@/lib/logTypes';

interface MoodSelectorProps {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (mood: 1 | 2 | 3 | 4 | 5) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-alma-text mb-3">
        오늘 기분이 어떠세요?
      </h2>
      <p className="text-alma-text-secondary mb-8">
        가장 가까운 것을 선택해주세요
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
    </div>
  );
}

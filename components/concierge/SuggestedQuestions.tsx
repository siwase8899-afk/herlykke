'use client';

import { SUGGESTED_QUESTIONS } from '@/lib/conciergeTypes';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  limit?: number;
}

export function SuggestedQuestions({ onSelect, limit = 4 }: SuggestedQuestionsProps) {
  const questions = SUGGESTED_QUESTIONS.slice(0, limit);

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q)}
          className="px-3 py-2 bg-white border border-hlk-border/60 rounded-full text-sm text-hlk-text-secondary hover:border-hlk-primary/30 hover:text-hlk-primary transition-all duration-200"
        >
          {q}
        </button>
      ))}
    </div>
  );
}

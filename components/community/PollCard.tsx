'use client';

import { useState } from 'react';
import { Poll, PollOption, POLL_CATEGORIES } from '@/lib/pollData';

interface PollCardProps {
  poll: Poll;
  onVote?: (pollId: string, optionId: string) => void;
  votedOptionId?: string | null;
}

export function PollCard({ poll, onVote, votedOptionId }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(votedOptionId || null);
  const [hasVoted, setHasVoted] = useState(!!votedOptionId);
  const [localPoll, setLocalPoll] = useState(poll);

  const categoryInfo = POLL_CATEGORIES[poll.category];

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    setSelectedOption(optionId);
    setHasVoted(true);

    // 로컬 상태 업데이트
    setLocalPoll((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    }));

    onVote?.(poll.id, optionId);
  };

  const getPercentage = (votes: number) => {
    if (localPoll.totalVotes === 0) return 0;
    return Math.round((votes / localPoll.totalVotes) * 100);
  };

  const getWinningOption = () => {
    return localPoll.options.reduce((max, opt) =>
      opt.votes > max.votes ? opt : max
    );
  };

  const winningOption = getWinningOption();

  return (
    <div className="bg-white rounded-2xl border border-alma-border overflow-hidden">
      {/* 헤더 */}
      <div className="p-4 border-b border-alma-border">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo.color}`}>
            {categoryInfo.emoji} {categoryInfo.label}
          </span>
          <span className="text-xs text-alma-text-tertiary">
            {localPoll.totalVotes.toLocaleString()}명 참여
          </span>
        </div>
        <h3 className="font-semibold text-alma-text">{poll.question}</h3>
        {poll.description && (
          <p className="text-sm text-alma-text-tertiary mt-1">{poll.description}</p>
        )}
      </div>

      {/* 선택지 */}
      <div className="p-4 space-y-2">
        {localPoll.options.map((option) => {
          const percentage = getPercentage(option.votes);
          const isSelected = selectedOption === option.id;
          const isWinning = hasVoted && option.id === winningOption.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full relative overflow-hidden rounded-xl transition-all ${
                hasVoted
                  ? 'cursor-default'
                  : 'hover:border-alma-primary cursor-pointer'
              } ${
                isSelected
                  ? 'border-2 border-alma-primary bg-alma-primary-light'
                  : 'border-2 border-alma-border'
              }`}
            >
              {/* 배경 바 (투표 후) */}
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                    isWinning ? 'bg-alma-primary/20' : 'bg-alma-bg'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              {/* 컨텐츠 */}
              <div className="relative flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  {option.emoji && <span className="text-lg">{option.emoji}</span>}
                  <span className={`text-sm ${isSelected ? 'font-semibold text-alma-primary' : 'text-alma-text'}`}>
                    {option.text}
                  </span>
                </div>

                {hasVoted ? (
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${
                      isWinning ? 'text-alma-primary' : 'text-alma-text-secondary'
                    }`}>
                      {percentage}%
                    </span>
                    {isSelected && (
                      <svg className="w-5 h-5 text-alma-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-alma-border" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 푸터 */}
      {!hasVoted && (
        <div className="px-4 pb-4">
          <p className="text-xs text-alma-text-tertiary text-center">
            선택하면 다른 분들의 결과를 볼 수 있어요
          </p>
        </div>
      )}
    </div>
  );
}

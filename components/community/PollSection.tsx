'use client';

import { useState, useEffect } from 'react';
import { Poll, DEMO_POLLS } from '@/lib/pollData';
import { PollCard } from './PollCard';

interface PollSectionProps {
  limit?: number;
  defaultExpanded?: boolean;
}

// 로컬스토리지 키
const VOTED_POLLS_KEY = 'hlk-voted-polls';

export function PollSection({ limit = 2, defaultExpanded = false }: PollSectionProps) {
  const [polls] = useState<Poll[]>(DEMO_POLLS);
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setMounted(true);
    // 로컬스토리지에서 투표 기록 불러오기
    const saved = localStorage.getItem(VOTED_POLLS_KEY);
    if (saved) {
      setVotedPolls(JSON.parse(saved));
    }
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    const newVotedPolls = { ...votedPolls, [pollId]: optionId };
    setVotedPolls(newVotedPolls);
    localStorage.setItem(VOTED_POLLS_KEY, JSON.stringify(newVotedPolls));
  };

  // 아직 투표하지 않은 투표 우선 표시
  const sortedPolls = [...polls].sort((a, b) => {
    const aVoted = !!votedPolls[a.id];
    const bVoted = !!votedPolls[b.id];
    if (aVoted === bVoted) return 0;
    return aVoted ? 1 : -1;
  });

  // 투표 안 한 것 개수
  const unvotedCount = polls.filter(p => !votedPolls[p.id]).length;

  // 컴팩트 모드: 1개만, 확장시: limit개
  const displayPolls = expanded ? sortedPolls.slice(0, limit) : sortedPolls.slice(0, 1);

  if (!mounted) {
    return (
      <div className="card-glass rounded-2xl p-4 animate-pulse">
        <div className="h-5 bg-hlk-bg rounded w-1/4 mb-3" />
        <div className="h-12 bg-hlk-bg rounded-xl" />
      </div>
    );
  }

  return (
    <div className="card-glass rounded-2xl overflow-hidden">
      {/* 컴팩트 헤더 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-hlk-bg/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-hlk-primary/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-hlk-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-hlk-text text-sm">오늘의 투표</span>
              {unvotedCount > 0 && (
                <span className="px-1.5 py-0.5 bg-hlk-accent text-white text-[10px] font-bold rounded-full">
                  {unvotedCount}개 참여 가능
                </span>
              )}
            </div>
            <p className="text-xs text-hlk-text-tertiary mt-0.5">
              {polls.length}개 진행 중
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 확장 아이콘 */}
          <svg
            className={`w-5 h-5 text-hlk-text-tertiary transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 투표 카드들 */}
      <div className="px-4 pb-4 space-y-3">
        {displayPolls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            votedOptionId={votedPolls[poll.id]}
            onVote={handleVote}
          />
        ))}

        {/* 더보기/접기 버튼 */}
        {polls.length > 1 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2 text-xs text-hlk-primary font-medium hover:bg-hlk-primary-light rounded-lg transition-colors"
          >
            {expanded ? '접기' : `투표 더보기 (${polls.length - 1}개)`}
          </button>
        )}
      </div>
    </div>
  );
}

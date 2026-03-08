'use client';

import Link from 'next/link';
import { SUGGESTED_QUESTIONS } from '@/lib/conciergeTypes';

interface ConciergeCardProps {
  displayName?: string;
}

export function ConciergeCard({ displayName = '회원' }: ConciergeCardProps) {
  const todayQuestion = SUGGESTED_QUESTIONS[
    Math.floor((Date.now() / 86400000)) % SUGGESTED_QUESTIONS.length
  ];

  return (
    <Link
      href="/concierge"
      className="group block bg-white/90 backdrop-blur-sm rounded-3xl border border-hlk-border/60 p-5 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-hlk-primary-light flex items-center justify-center flex-shrink-0">
          <span className="text-xl">🌙</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-hlk-text">수면 동료</h3>
            <span className="px-2 py-0.5 bg-hlk-primary text-white text-[10px] font-bold rounded-full">AI</span>
          </div>
          <p className="text-xs text-hlk-text-secondary mb-3">
            수면 고민을 함께 나눠요
          </p>
          <div className="px-3 py-2.5 bg-hlk-bg rounded-xl text-xs text-hlk-text-tertiary truncate">
            &ldquo;{todayQuestion}&rdquo;
          </div>
        </div>
        <svg className="w-4 h-4 text-hlk-text-tertiary flex-shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

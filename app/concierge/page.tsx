'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { ConciergeChat } from '@/components/concierge/ConciergeChat';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import BookingFlow from '@/components/consultation/BookingFlow';
import type { ConciergeContext } from '@/lib/conciergeTypes';

type Tab = 'ai' | 'expert';

export default function ConciergePage() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('ai');

  const displayName = user?.user_metadata?.name || '회원';

  const context: ConciergeContext = useMemo(() => ({
    recentSymptoms: [],
    sleepType: 'unknown',
    avgSleepHours: 0,
    moodTrend: 'stable',
    displayName,
  }), [displayName]);

  return (
    <div className="min-h-screen bg-hlk-bg relative flex flex-col">
      <FloatingOrbs />

      {/* Header */}
      <div className="relative z-10 border-b border-hlk-border bg-white/80 backdrop-blur-sm px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-hlk-primary-light flex items-center justify-center">
            <span className="text-lg">{activeTab === 'ai' ? '🌙' : '👩‍⚕️'}</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-hlk-text">
              {activeTab === 'ai' ? '수면 동료' : '전문가 상담'}
            </h1>
            <p className="text-[11px] text-hlk-text-tertiary">
              {activeTab === 'ai'
                ? (isLoggedIn ? `${displayName}님의 수면 동료` : 'AI 수면 웰니스 어시스턴트')
                : '수면 전문가와 1:1 상담 예약'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 bg-white/60 backdrop-blur-sm border-b border-hlk-border">
        <div className="max-w-2xl mx-auto flex">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-all duration-300 border-b-2 ${
              activeTab === 'ai'
                ? 'text-hlk-primary border-hlk-primary'
                : 'text-hlk-text-tertiary border-transparent hover:text-hlk-text-secondary'
            }`}
          >
            AI 수면 동료
          </button>
          <button
            onClick={() => setActiveTab('expert')}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-all duration-300 border-b-2 ${
              activeTab === 'expert'
                ? 'text-hlk-primary border-hlk-primary'
                : 'text-hlk-text-tertiary border-transparent hover:text-hlk-text-secondary'
            }`}
          >
            전문가 상담
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'ai' ? (
        <div className="relative z-10 flex-1 max-w-2xl mx-auto w-full">
          <ConciergeChat context={context} />
        </div>
      ) : (
        <div className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          <BookingFlow />
        </div>
      )}
    </div>
  );
}

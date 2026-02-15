'use client';

import Link from 'next/link';

interface ReportLockedProps {
  currentDays: number;
  targetDays: number;
  percentage: number;
}

export function ReportLocked({ currentDays, targetDays, percentage }: ReportLockedProps) {
  const remainingDays = targetDays - currentDays;

  return (
    <div className="bg-white rounded-2xl p-8 border border-alma-border text-center">
      {/* 잠금 아이콘 */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-alma-bg flex items-center justify-center">
        <span className="text-4xl">🔒</span>
      </div>

      <h2 className="text-xl font-bold text-alma-text mb-2">
        패턴 리포트가 곧 열려요!
      </h2>
      <p className="text-alma-text-secondary mb-6">
        {remainingDays}일만 더 기록하면<br />
        나만의 패턴을 분석해 드릴게요
      </p>

      {/* 진행률 */}
      <div className="max-w-xs mx-auto mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-alma-text-tertiary">진행률</span>
          <span className="font-semibold text-alma-primary">
            {currentDays} / {targetDays}일
          </span>
        </div>
        <div className="h-3 bg-alma-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-alma-primary to-alma-accent rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* 미리보기 항목 */}
      <div className="bg-alma-bg rounded-xl p-4 mb-6">
        <p className="text-sm font-medium text-alma-text mb-3">
          7일 후 확인할 수 있는 것들:
        </p>
        <div className="space-y-2 text-sm text-alma-text-secondary">
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span>기분 변화 트렌드</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span>가장 많이 나타나는 증상</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>나에게 도움이 되는 활동</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>주의해야 할 트리거</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/log/new"
        className="inline-flex items-center justify-center w-full py-4 bg-alma-accent text-white font-bold rounded-full hover:bg-alma-accent/90 transition-all"
      >
        오늘 기록하기
        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
}

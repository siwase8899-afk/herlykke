'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, LockKeyhole, NotebookPen } from 'lucide-react';

export default function CheckinIntro() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-hlk-surface to-hlk-primary-light/35 flex flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(245,216,197,0.75),rgba(255,249,242,0)_70%)]" />
      <div className="relative max-w-md mx-auto px-6 py-10 flex-1 flex flex-col">
        <Link href="/" className="inline-flex items-center text-hlk-text-secondary hover:text-hlk-text mb-10 text-sm animate-slow-fade-in">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로
        </Link>

        <div className="flex-1 flex flex-col justify-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-hlk-border bg-white shadow-soft-md animate-slow-fade-in-delay-1">
            <NotebookPen className="h-10 w-10 text-hlk-primary-dark" aria-hidden />
          </div>

          <h1 className="text-3xl font-extrabold text-hlk-text text-center leading-snug mb-3 animate-slow-fade-in-delay-1">
            지금의 변화를
            <br />
            천천히 확인해볼게요
          </h1>
          <p className="text-hlk-text-secondary text-center leading-relaxed mb-10 max-w-xs mx-auto animate-slow-fade-in-delay-2">
            정답을 찾는 시간이 아니에요.
            <br />
            몸과 마음의 신호를 조용히 정리해봅니다.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { icon: Clock3, label: '1분이면 충분', sub: '부담 없이' },
              { icon: LockKeyhole, label: '가입 없이', sub: '먼저 확인' },
              { icon: NotebookPen, label: '패턴 정리', sub: '내 언어로' },
              { icon: CheckCircle2, label: '정답 없음', sub: '편하게 선택' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="card-glass rounded-2xl p-4 text-center shadow-soft-md animate-slow-fade-in"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <Icon className="mx-auto mb-3 h-6 w-6 text-hlk-primary-dark" aria-hidden />
                  <p className="text-sm font-semibold text-hlk-text">{item.label}</p>
                  <p className="text-xs text-hlk-text-tertiary">{item.sub}</p>
                </div>
              );
            })}
          </div>

          <div className="card-glass rounded-2xl p-5 mb-8 text-center shadow-soft-sm animate-slow-fade-in-delay-3">
            <p className="text-sm text-hlk-text-secondary leading-relaxed">
              잠, 열감, 감정 변화는 <span className="font-semibold text-hlk-clay-dark">따로 떨어진 문제</span>가 아닐 수 있어요.
              <br />
              <span className="text-xs text-hlk-text-tertiary mt-1 block">먼저 지금 가장 가까운 신호부터 골라봅니다.</span>
            </p>
          </div>

          <Link
            href="/checkin/1"
            className="group w-full flex items-center justify-center gap-2 py-4 bg-hlk-clay text-white text-lg font-semibold rounded-2xl hover:bg-hlk-clay-dark transition-all duration-300 shadow-lg shadow-hlk-clay/20 hover:-translate-y-0.5 animate-subtle-pulse"
          >
            1분 체크인 시작하기
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
          <p className="text-center text-hlk-text-tertiary text-xs mt-4">
            가입 없이 &middot; 1분 소요 &middot; 무료
          </p>
          <p className="text-center text-hlk-text-tertiary text-[11px] leading-relaxed mt-5 px-2">
            ※ 본 체크인은 의학적 진단이 아닌 참고용입니다. 증상이 지속되면 전문의 상담을 권장합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

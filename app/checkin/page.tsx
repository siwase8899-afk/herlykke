'use client';

import Link from 'next/link';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { SleepCycleViz } from '@/components/ui/SleepCycleViz';

const CHECKIN_ORBS = [
  { size: 160, x: '5%',  y: '10%', color: 'rgba(202, 218, 237, 0.15)', delay: '0s',  duration: '20s' },
  { size: 120, x: '80%', y: '20%', color: 'rgba(240, 207, 201, 0.10)', delay: '-3s', duration: '24s' },
  { size: 100, x: '60%', y: '70%', color: 'rgba(202, 218, 237, 0.08)', delay: '-7s', duration: '18s' },
];

export default function CheckinIntro() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-hlk-primary-light via-hlk-bg to-hlk-bg flex flex-col overflow-hidden">
      {/* Floating ambient orbs */}
      <FloatingOrbs orbs={CHECKIN_ORBS} />

      <div className="relative max-w-md mx-auto px-6 py-10 flex-1 flex flex-col">
        {/* Back */}
        <Link href="/" className="inline-flex items-center text-hlk-text-secondary hover:text-hlk-text mb-10 text-sm animate-slow-fade-in">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로
        </Link>

        <div className="flex-1 flex flex-col justify-center">
          {/* Animated moon illustration — breathes gently */}
          <div className="mx-auto mb-8 animate-slow-fade-in-delay-1">
            <SleepCycleViz quality={80} size={96} animate animationSpeed={4000} />
          </div>

          {/* Heading — warm, empathetic */}
          <h1 className="text-3xl font-extrabold text-hlk-text text-center leading-snug mb-3 animate-slow-fade-in-delay-1">
            오늘 밤, 어떠셨어요?
          </h1>
          <p className="text-hlk-text-secondary text-center leading-relaxed mb-10 max-w-xs mx-auto animate-slow-fade-in-delay-2">
            괜찮아요, 천천히 알아가면 돼요.
            <br />
            5가지 질문이면 충분해요.
          </p>

          {/* Emotional benefits — soft cards with stagger */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { icon: '⏱', label: '1분이면 충분', sub: '부담 없이' },
              { icon: '🤫', label: '닉네임으로', sub: '나만 아는 기록' },
              { icon: '💌', label: '맞춤 레시피', sub: '나에게 맞는 방법' },
              { icon: '🤝', label: '혼자가 아니에요', sub: '같은 경험의 동료들' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-hlk-border/60 text-center animate-slow-fade-in"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <span className="text-2xl block mb-2">{item.icon}</span>
                <p className="text-sm font-semibold text-hlk-text">{item.label}</p>
                <p className="text-xs text-hlk-text-tertiary">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Stress awareness nudge */}
          <div className="bg-hlk-accent-light/60 rounded-2xl p-5 mb-8 text-center animate-slow-fade-in-delay-3">
            <p className="text-sm text-hlk-text-secondary leading-relaxed">
              잠이 안 오는 게 <span className="font-semibold text-hlk-accent">스트레스</span> 때문일 수도,
              <br />
              <span className="font-semibold text-hlk-accent">몸의 변화</span> 때문일 수도 있어요.
              <br />
              <span className="text-xs text-hlk-text-tertiary mt-1 block">함께 알아볼까요?</span>
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/checkin/1"
            className="group w-full flex items-center justify-center gap-2 py-4 bg-hlk-primary text-white text-lg font-semibold rounded-2xl hover:bg-hlk-primary-dark transition-all duration-300 shadow-lg shadow-hlk-primary/15 hover:-translate-y-0.5 animate-subtle-pulse"
          >
            수면 체크인 시작하기
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
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

'use client';

import Link from 'next/link';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function CTAFooter() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${sectionVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'}`}>
      <div className="bg-hlk-secondary px-6 md:px-8 py-24 md:py-32 relative">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-hlk-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-hlk-accent/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Step chips */}
          <div className="inline-flex items-center gap-2 mb-10">
            {['수면 체크인', '수면 레시피', '언니 PICK'].map((label, i) => (
              <span key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                  i === 0 ? 'bg-hlk-primary/30 text-hlk-primary-light' : 'bg-white/5 text-white/40'
                }`}>
                  {label}
                </span>
              </span>
            ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            먼저 겪은 언니들이
            <br />
            기다리고 있어요
          </h2>

          <p className="text-white/50 text-lg mb-12 max-w-md mx-auto">
            1분이면 충분해요. 혼자 끙끙대던 밤, 이제 끝내볼까요?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/checkin"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-hlk-accent text-white text-lg font-bold rounded-full hover:bg-hlk-accent-dark transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-hlk-accent/20"
            >
              내 수면 상태 확인하기
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <a
              href="https://open.kakao.com/o/gyF0fwgi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-white/50 text-sm font-medium rounded-full border border-white/10 hover:border-white/25 hover:text-white/70 transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7-.2.7-.7 2.5-.8 2.9 0 0 0 .1.1.1s.1 0 .2 0c.3-.2 3-2 4.2-2.8.5.1 1 .1 1.6.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
              </svg>
              카카오톡에서 먼저 만나요
            </a>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/25">
            {['설정할 것 없어요', '3분이면 충분', '닉네임으로 활동', '언제든 멈출 수 있어요'].map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/15" />}
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

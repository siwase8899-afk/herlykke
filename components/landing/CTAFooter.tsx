'use client';

import Link from 'next/link';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function CTAFooter() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${sectionVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'}`}>
      <div className="bg-gradient-to-br from-hlk-secondary via-hlk-secondary to-[#3d3835] px-6 md:px-8 py-24 md:py-32">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-hlk-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Step preview */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur rounded-full mb-10">
            <span className="flex items-center gap-2 text-hlk-accent text-sm font-medium">
              <span className="w-6 h-6 rounded-full bg-hlk-accent flex items-center justify-center text-white text-xs font-bold">1</span>
              체크인
            </span>
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="flex items-center gap-2 text-white/70 text-sm">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">2</span>
              커뮤니티
            </span>
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="flex items-center gap-2 text-white/70 text-sm">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">3</span>
              맞춤 솔루션
            </span>
          </div>

          <p className="text-hlk-secondary-light mb-3">
            &lsquo;나만 이런가?&rsquo; 싶었다면, 아니에요 — 다 그래요
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            여기, &lsquo;나도 그래&rsquo; 하는
            <br />
            사람들이 모여 있어요
          </h2>
          <p className="text-hlk-secondary-light/80 mb-12">
            3분이면 충분해요. 혼자 끙끙대던 밤, 이제 끝내볼까요?
          </p>

          <Link
            href="/checkin"
            className="group btn-fill-hover btn-fill-hover--accent inline-flex items-center justify-center px-10 py-5 bg-hlk-accent text-white text-lg font-bold rounded-full hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] animate-subtle-pulse"
          >
            지금 나의 상태 확인하기
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* Soft CTA */}
          <div className="mt-8">
            <p className="text-sm text-white/50 mb-2">아직 준비가 안 됐다면</p>
            <a
              href="https://open.kakao.com/o/gyF0fwgi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FEE500] text-[#3C1E1E] text-sm font-medium rounded-full hover:bg-[#FDD835] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7-.2.7-.7 2.5-.8 2.9 0 0 0 .1.1.1s.1 0 .2 0c.3-.2 3-2 4.2-2.8.5.1 1 .1 1.6.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
              </svg>
              카카오톡에서 먼저 만나요
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10 text-sm text-hlk-secondary-light/70">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-hlk-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              설정할 것 없어요
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-hlk-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              3분이면 충분
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-hlk-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              100% 익명 보장
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-hlk-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              언제든 멈출 수 있어요
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

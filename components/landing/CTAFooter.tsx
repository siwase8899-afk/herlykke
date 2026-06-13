'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function CTAFooter() {
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${sectionVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'}`}>
      <div className="relative bg-hlk-secondary px-6 py-20 md:px-8 md:py-28">
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-hlk-clay-light/70">
            Start With Check-in
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            오늘의 변화를
            <br />
            조용히 확인해볼까요?
          </h2>

          <p className="text-white/50 text-lg mb-12 max-w-md mx-auto">
            1분이면 충분합니다. 결과를 단정하지 않고, 지금의 나를 이해하는 문장부터 시작해요.
          </p>

          <div className="flex items-center justify-center mb-10">
            <Link
              href="/checkin"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-hlk-clay text-white text-lg font-bold rounded-full hover:bg-hlk-clay-dark transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-hlk-clay/20"
            >
              1분 체크인 시작하기
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/25">
            {['가입 없이 시작', '무료 체크인', '언제든 멈출 수 있어요'].map((t, i) => (
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

'use client';

import { useEffect, useRef, useState } from 'react';

const COMPARISONS = [
  {
    not: '수면 트래킹 도구',
    is: '수면 언니가 추천하는 수면 레시피 마켓',
  },
  {
    not: '건강기능식품 쇼핑몰',
    is: '커뮤니티 공감으로 검증된 큐레이션 커머스',
  },
  {
    not: '갱년기 의료 앱',
    is: '수면 동기들이랑 같이 잠 되찾기',
  },
  {
    not: '일방향 콘텐츠 플랫폼',
    is: '유저가 스스로 발견하는 구조',
  },
];

export default function WhatMakesDifferent() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold text-hlk-primary tracking-[0.2em] uppercase mb-4">
            What Makes Us Different
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text">
            HERLYKKE는{' '}
            <span className="text-hlk-primary italic">다릅니다</span>
          </h2>
        </div>

        {/* Comparison rows */}
        <div className="space-y-4">
          {COMPARISONS.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {/* ✕ 우리가 아닌 것 */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-hlk-surface border border-hlk-border">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-hlk-border-light/60 flex items-center justify-center text-hlk-text-tertiary text-sm font-bold">
                  ✕
                </span>
                <span className="text-hlk-text-tertiary line-through text-sm md:text-base">
                  {item.not}
                </span>
              </div>

              {/* ✓ 우리인 것 */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-hlk-primary/[0.07] border border-hlk-primary/15">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-hlk-primary flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </span>
                <span className="text-hlk-text font-medium text-sm md:text-base">
                  {item.is}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

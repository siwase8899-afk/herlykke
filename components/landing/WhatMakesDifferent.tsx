'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

const COMPARISONS = [
  {
    not: '수면 점수만 보여주는 도구',
    is: '수면과 마음의 변화를 함께 읽는 체크인',
  },
  {
    not: '건강기능식품 쇼핑몰',
    is: '필요한 루틴을 천천히 발견하는 커뮤니티',
  },
  {
    not: '의료 앱',
    is: '의료 밖의 일상 언어를 찾는 웰니스 공간',
  },
  {
    not: '일방향 콘텐츠 플랫폼',
    is: '비슷한 경험을 가진 사람들이 함께 만드는 이야기',
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
    <section id="why-herlykke" ref={ref} className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-sm font-semibold text-hlk-primary mb-4">
            HERLYKKE가 다른 점
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text">
            관리보다 먼저,
            <br />
            이해에서 시작합니다
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
              {/* 우리가 아닌 것 */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-hlk-surface border border-hlk-border">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-hlk-border-light/60 flex items-center justify-center text-hlk-text-tertiary text-sm font-bold">
                  <X className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-hlk-text-tertiary line-through text-sm md:text-base">
                  {item.not}
                </span>
              </div>

              {/* 우리인 것 */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-hlk-primary/[0.07] border border-hlk-primary/15">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-hlk-primary flex items-center justify-center text-white text-sm font-bold">
                  <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
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

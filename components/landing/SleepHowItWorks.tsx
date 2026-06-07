'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const STEPS = [
  {
    icon: '📱',
    title: '카카오 로그인',
    time: '30초',
    desc: '1탭으로 간편하게',
  },
  {
    icon: '📋',
    title: '수면 유형 분석',
    time: '1분',
    desc: '5문항으로 나의 수면 패턴 파악',
  },
  {
    icon: '🤝',
    title: '수면 동기 만나기',
    time: '즉시',
    desc: '나 같은 사람이 있었구나!',
  },
  {
    icon: '📖',
    title: '수면 레시피 발견',
    time: null,
    desc: '메이트의 검증된 수면 개선법',
  },
  {
    icon: '💜',
    title: '메이트 PICK',
    time: null,
    desc: '공감으로 검증된 제품 추천',
  },
];

export default function SleepHowItWorks() {
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
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold text-hlk-primary tracking-[0.2em] uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text">
            첫 5분이면 충분해요
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-hlk-border md:-translate-x-px" />

          <div className="space-y-10 md:space-y-12">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-600 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  {/* Icon circle on the line */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-hlk-surface border-2 border-hlk-primary/30 flex items-center justify-center text-lg z-10">
                    {step.icon}
                  </div>

                  {/* Content card — mobile: always right; desktop: alternating */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:mr-auto md:text-right md:pr-0' : 'md:ml-auto md:text-left md:pl-0'
                    }`}
                  >
                    <div className="bg-hlk-surface rounded-2xl p-5 border border-hlk-border">
                      <div className={`flex items-center gap-2 mb-1.5 ${isLeft ? 'md:justify-end' : ''}`}>
                        <h3 className="text-base font-bold text-hlk-text">
                          {step.title}
                        </h3>
                        {step.time && (
                          <span className="text-[11px] font-semibold text-hlk-primary bg-hlk-primary/10 px-2 py-0.5 rounded-full">
                            {step.time}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-hlk-text-secondary">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <Link
            href="/checkin"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-hlk-primary text-white font-semibold rounded-full hover:bg-hlk-primary-dark transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-hlk-primary/15"
          >
            지금 시작하기
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-hlk-text-tertiary text-sm mt-4">
            가입 없이 바로 &middot; 1분 소요 &middot; 닉네임으로 활동
          </p>
        </div>
      </div>
    </section>
  );
}

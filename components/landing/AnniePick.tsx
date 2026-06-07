'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function AnniePick() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-8 bg-hlk-surface-warm">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-xs font-semibold text-hlk-accent tracking-[0.2em] uppercase mb-4">
              Trust System
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text leading-tight mb-6">
              커뮤니티가 검증한
              <br />
              레시피만 메이트 PICK
            </h2>
            <p className="text-base text-hlk-text-secondary leading-relaxed mb-10">
              플랫폼이 고르는 게 아니에요.
              공감이 50개 이상이면 자동으로 선정됩니다.
            </p>

            {/* Trust steps — numbered with line */}
            <div className="space-y-6">
              {[
                {
                  num: '01',
                  title: '손글씨 인증',
                  desc: '손글씨 1장이 있어야 레시피가 됩니다. AI 콘텐츠를 차단합니다.',
                },
                {
                  num: '02',
                  title: '커뮤니티 검증',
                  desc: '공감 50개 이상이면 메이트 PICK으로 자동 선정. 플랫폼 편집 없음.',
                },
                {
                  num: '03',
                  title: '메이트의 서약',
                  desc: '"직접 경험한 것만 추천합니다"를 닉네임으로 서명합니다.',
                },
              ].map((item, i) => (
                <div
                  key={item.num}
                  className={`flex gap-4 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${200 + i * 150}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-hlk-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {item.num}
                    </div>
                    {i < 2 && <div className="w-px flex-1 bg-hlk-border mt-2" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-bold text-hlk-text mb-1">{item.title}</h3>
                    <p className="text-sm text-hlk-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Quote card with glass effect */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative">
              {/* Decorative bg */}
              <div className="absolute -inset-4 bg-hlk-primary/5 rounded-[2rem] -rotate-2" />

              <div className="relative bg-hlk-secondary rounded-3xl p-8 md:p-10 text-white overflow-hidden">
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-hlk-primary/20 rounded-full blur-[60px] pointer-events-none" />

                <svg className="w-10 h-10 text-white/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-xl md:text-2xl font-bold leading-snug mb-8 relative">
                  ChatGPT도 수면 레시피 써줍니다.
                  <br />
                  우리는 <span className="text-hlk-accent">손글씨 인증</span>만 받습니다.
                </p>

                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 bg-white text-hlk-secondary px-6 py-3 rounded-full font-semibold text-sm hover:bg-hlk-primary-light transition-all duration-300"
                >
                  커뮤니티 둘러보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

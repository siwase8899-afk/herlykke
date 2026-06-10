'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CHANGE_WORDS = ['수면', '호흡', '루틴'];

export default function SleepHero() {
  const [showContent, setShowContent] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isWordAnimating, setIsWordAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWordAnimating(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % CHANGE_WORDS.length);
        setIsWordAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      {/* Soft dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-8 py-20 text-center">
        {/* Logo */}
        <div
          className={`mb-10 transition-all duration-1000 ease-out ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p
            className="font-[family-name:var(--font-serif)] italic text-3xl md:text-4xl tracking-tight"
            style={{ color: '#FFFFFF', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}
          >
            Her · Lykke
          </p>
          <div className="w-10 h-px bg-white/45 mx-auto my-3.5" />
          <p
            className="text-[11px] md:text-xs tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
          >
            덴마크어로 &lsquo;그녀의 행복&rsquo;
          </p>
        </div>

        {/* Headline */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out delay-200 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-4"
            style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.15)' }}
          >
            <span className="relative inline-block overflow-hidden align-bottom">
              <span
                className={`inline-block transition-all duration-500 ease-out ${
                  isWordAnimating
                    ? 'opacity-0 -translate-y-[110%]'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                {CHANGE_WORDS[wordIndex]}
              </span>
            </span>
            이 달라지면
          </h1>
          <p
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]"
            style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.15)' }}
          >
            하루가 달라집니다.
          </p>
        </div>

        {/* Sub copy */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p
            className="text-lg md:text-xl leading-relaxed max-w-lg mx-auto"
            style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 8px rgba(0,0,0,0.15)' }}
          >
            지금 당신의 밤은 편안한가요?
            <br />
            같은 밤을 지나온 메이트들의 수면 레시피가 모여 있어요.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-1000 ease-out delay-700 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* CTA — gradient glow behind button */}
          <div className="relative group inline-flex rounded-full p-[2px]" style={{ background: 'var(--cta-gradient)' }}>
            {/* Blurred glow clone — sits behind, scales on hover */}
            <span
              className="absolute -z-10 block h-full w-full rounded-full transition-transform duration-500 group-hover:scale-[1.2]"
              style={{
                background: 'inherit',
                filter: 'blur(0.6em)',
                animation: 'ctaGlowSpin 8s linear infinite',
              }}
            />
            <Link
              href="/checkin"
              className="relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-black text-white font-bold rounded-full z-10"
            >
              나의 수면 체크하기
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <button
            onClick={() => document.getElementById('landing-content')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-full border-2 border-white/50 hover:border-white/80 hover:bg-white/15 backdrop-blur-sm transition-all duration-300"
            style={{ color: '#FFFFFF', textShadow: '0 1px 6px rgba(0,0,0,0.1)' }}
          >
            수면 레시피 보기
          </button>
        </div>

        {/* Micro trust */}
        <div
          className={`flex items-center justify-center gap-5 text-xs transition-all duration-1000 ease-out delay-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 8px rgba(0,0,0,0.3), 0 0 2px rgba(0,0,0,0.15)' }}
        >
          <span>가입 없이 시작</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>1분 소요</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>4050 여성 수면 커뮤니티</span>
        </div>

        {/* 스크롤 유도 화살표 */}
        <button
          onClick={() => document.getElementById('landing-content')?.scrollIntoView({ behavior: 'smooth' })}
          className={`mt-14 flex flex-col items-center gap-1.5 mx-auto transition-all duration-1000 ease-out delay-[1200ms] ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="아래로 스크롤"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            scroll
          </span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

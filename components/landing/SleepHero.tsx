'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

const CHANGE_WORDS = ['수면', '호흡', '루틴'];

export default function SleepHero() {
  const [showContent, setShowContent] = useState(false);
  const [wordIndex, setWordIndex] = useState(2);
  const [isWordAnimating, setIsWordAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWordAnimating(true);
      setTimeout(() => {
        setWordIndex((current) => (current + 1) % CHANGE_WORDS.length);
        setIsWordAnimating(false);
      }, 420);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative -mt-16 flex min-h-screen items-center overflow-hidden bg-hlk-indigo pt-16 md:-mt-[72px] md:pt-[72px]">
      <div
        className="hero-bg-drift absolute inset-0 scale-[1.04] bg-cover bg-center md:bg-[center_44%]"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(41,49,76,0.08)_0%,rgba(80,51,34,0.08)_46%,rgba(53,38,28,0.16)_100%)]" aria-hidden />
      <div className="hero-light-drift absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.18)_0%,rgba(255,244,226,0.10)_34%,rgba(41,49,76,0.04)_100%)]" aria-hidden />
      <div className="hero-grain absolute inset-0 opacity-[0.16]" aria-hidden />

<div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-14 text-center md:px-8 md:py-20">
        <div
          className={`mb-9 transition-all duration-1000 ease-out ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p
            className="font-[family-name:var(--font-serif)] text-3xl italic tracking-normal text-white md:text-4xl"
            style={{ textShadow: '0 2px 18px rgba(41, 49, 76, 0.36)' }}
          >
            Her · Lykke
          </p>
          <div className="mx-auto my-3.5 h-px w-10 bg-white/45" />
          <p
            className="text-[11px] font-medium tracking-[0.24em] text-white/90 md:text-xs"
            style={{ textShadow: '0 1px 10px rgba(41, 49, 76, 0.34)' }}
          >
            덴마크어로 &lsquo;그녀의 행복&rsquo;
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ease-out delay-150 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1
            className="text-[2.7rem] font-extrabold leading-[1.14] tracking-normal text-white md:text-[4.2rem] lg:text-[4.75rem]"
            style={{ textShadow: '0 3px 28px rgba(41, 49, 76, 0.42), 0 1px 6px rgba(41, 49, 76, 0.32)' }}
          >
            <span className="relative inline-block min-w-[2.15em] overflow-hidden align-bottom">
              <span
                className={`inline-block transition-all duration-500 ease-out ${
                  isWordAnimating
                    ? 'opacity-0 -translate-y-[115%]'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                {CHANGE_WORDS[wordIndex]}
              </span>
            </span>
            이 달라지면
            <br />
            하루가 달라집니다.
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-base font-semibold leading-[1.75] text-white/95 md:text-xl"
            style={{ textShadow: '0 2px 14px rgba(41, 49, 76, 0.40)' }}
          >
            지금 당신의 밤은 편안한가요?
            <br className="hidden sm:block" />
            먼저 내 몸과 마음의 변화를 조용히 확인해보세요.
          </p>
        </div>

        <div
          className={`mt-10 flex flex-col items-center justify-center gap-4 transition-all duration-1000 ease-out delay-300 sm:flex-row ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            href="/checkin"
            className="group relative inline-flex min-h-14 min-w-[230px] items-center justify-center gap-2 rounded-full p-[2px] md:text-base"
            style={{ background: 'var(--cta-gradient)' }}
          >
            <span
              className="absolute -z-10 block h-full w-full rounded-full opacity-80 transition-transform duration-500 group-hover:scale-[1.16]"
              style={{
                background: 'inherit',
                filter: 'blur(0.55em)',
                animation: 'ctaGlowSpin 8s linear infinite',
              }}
              aria-hidden
            />
            <span className="relative z-10 inline-flex h-full min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-black px-9 py-3.5 font-bold text-white">
              나의 수면 체크하기
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
          <button
            onClick={() => document.getElementById('why-herlykke')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex min-h-14 min-w-[210px] items-center justify-center rounded-full border-2 border-white/55 bg-white/10 px-9 py-4 text-base font-bold text-white backdrop-blur-sm hover:border-white/85 hover:bg-white/18"
          >
            HERLYKKE 보기
          </button>
        </div>

        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-white/82 transition-all duration-1000 ease-out delay-500 md:text-sm ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ textShadow: '0 1px 10px rgba(41, 49, 76, 0.28)' }}
        >
          {['가입 없이 시작', '1분 소요', '무료 체크인'].map((item, index) => (
            <span key={item} className="flex items-center gap-3">
              {index > 0 && <span className="h-1 w-1 rounded-full bg-white/45" aria-hidden />}
              {item}
            </span>
          ))}
        </div>

        <div
          className={`mt-12 transition-all duration-1000 ease-out delay-700 md:mt-16 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => document.getElementById('why-herlykke')?.scrollIntoView({ behavior: 'smooth' })}
            className="mx-auto flex flex-col items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/60"
            aria-label="아래 섹션으로 이동"
          >
            SCROLL
            <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

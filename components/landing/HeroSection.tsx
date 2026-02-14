'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SYMPTOM_CHARACTERS, type SymptomCharacter } from '@/lib/characters';

// 히어로에서 순환할 캐릭터들 (Sol 인사이트: 아시아 여성 증상 순서)
const heroCharacters: SymptomCharacter[] = [
  SYMPTOM_CHARACTERS.find(c => c.id === 'joint_pain')!,    // 관절통 - 아시아 여성 1위
  SYMPTOM_CHARACTERS.find(c => c.id === 'fatigue')!,       // 피로감
  SYMPTOM_CHARACTERS.find(c => c.id === 'insomnia')!,      // 수면장애
  SYMPTOM_CHARACTERS.find(c => c.id === 'mood_swings')!,   // 감정기복
  SYMPTOM_CHARACTERS.find(c => c.id === 'hot_flash')!,     // 열감
  SYMPTOM_CHARACTERS.find(c => c.id === 'brain_fog')!,     // 브레인포그
  SYMPTOM_CHARACTERS.find(c => c.id === 'anxiety')!,       // 불안
  SYMPTOM_CHARACTERS.find(c => c.id === 'weight_change')!, // 체중변화
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroCharacters.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentChar = heroCharacters[currentIndex];

  return (
    <section className="relative overflow-hidden">
      {/* 밝은 그라데이션 배경 (이전 브랜딩) */}
      <div className="bg-gradient-to-br from-alma-primary-light via-white to-alma-accent-light">
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-alma-border mb-6">
                <span className="w-2 h-2 bg-alma-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-alma-text-secondary">갱년기, 유머로 극복하기</span>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-alma-text leading-[1.1] mb-4">
                나만 그런 거
                <br />
                <span className="text-alma-primary">아니었어.</span>
              </h1>

              {/* 다이나믹 증상 + 유머 */}
              <div className="mb-8">
                <p className="text-lg md:text-xl text-alma-text-secondary leading-relaxed mb-2">
                  지금 겪고 있는{' '}
                  <span
                    className={`inline-block font-bold text-alma-accent transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                  >
                    {currentChar.name}
                  </span>
                  ,
                </p>
                <p
                  className={`text-base text-alma-text-tertiary transition-all duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  &ldquo;{currentChar.tagline}&rdquo;
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/checkin"
                className="inline-flex items-center justify-center px-8 py-4 bg-alma-primary text-white font-bold rounded-full hover:bg-alma-primary-dark active:scale-[0.98] transition-all shadow-lg shadow-alma-primary/30"
              >
                내 증상 체크하기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Trust text */}
              <p className="mt-6 text-sm text-alma-text-tertiary">
                3분이면 충분해요 · 100% 무료 · 로그인 없이 바로 시작
              </p>
            </div>

            {/* Right: Character Card */}
            <div className="relative flex justify-center">
              {/* Main Character Card */}
              <div
                className={`relative bg-white rounded-3xl p-6 md:p-8 border border-alma-border shadow-xl max-w-sm w-full transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                {/* Emoji & Nickname */}
                <div className="text-center mb-6">
                  <div
                    className="text-7xl md:text-8xl mb-4 transition-transform duration-300"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                  >
                    {currentChar.emoji}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-alma-text mb-1">
                    {currentChar.nickname}
                  </h3>
                  <p className="text-sm text-alma-primary font-medium">
                    {currentChar.name}
                  </p>
                </div>

                {/* Tagline Card */}
                <div
                  className="bg-alma-bg rounded-2xl p-4 border border-alma-border"
                >
                  <p className="text-center text-alma-text-secondary text-sm md:text-base leading-relaxed">
                    &ldquo;{currentChar.description}&rdquo;
                  </p>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-3 -right-3 bg-alma-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  공감 1,234
                </div>
              </div>

              {/* Background decoration circles */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-alma-primary/10 blur-3xl" />
              <div className="absolute -z-10 top-0 right-0 w-32 h-32 rounded-full bg-alma-accent/10 blur-2xl" />
            </div>
          </div>

          {/* Character Dots Navigation */}
          <div className="flex justify-center gap-2 mt-10">
            {heroCharacters.map((char, idx) => (
              <button
                key={char.id}
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setIsVisible(true);
                  }, 300);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-alma-primary w-8'
                    : 'bg-alma-border hover:bg-alma-text-tertiary'
                }`}
                aria-label={char.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-alma-secondary text-white">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p className="text-center text-white/70 text-sm mb-6 tracking-wide">
            We see you. We hear you. 당신의 이야기에 귀 기울이고 있어요.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-accent">87%</p>
              <p className="text-sm text-white/80 mt-1">2주 내 공감 경험</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">1,200+</p>
              <p className="text-sm text-white/80 mt-1">함께하는 여성들</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-accent">48세</p>
              <p className="text-sm text-white/80 mt-1">한국 평균 시작 나이</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
              <p className="text-sm text-white/80 mt-1">익명 보장</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SYMPTOM_CHARACTERS, type SymptomCharacter } from '@/lib/characters';

const heroCharacters: SymptomCharacter[] = [
  SYMPTOM_CHARACTERS.find(c => c.id === 'joint_pain')!,
  SYMPTOM_CHARACTERS.find(c => c.id === 'fatigue')!,
  SYMPTOM_CHARACTERS.find(c => c.id === 'insomnia')!,
  SYMPTOM_CHARACTERS.find(c => c.id === 'mood_swings')!,
  SYMPTOM_CHARACTERS.find(c => c.id === 'hot_flash')!,
  SYMPTOM_CHARACTERS.find(c => c.id === 'brain_fog')!,
  SYMPTOM_CHARACTERS.find(c => c.id === 'anxiety')!,
  SYMPTOM_CHARACTERS.find(c => c.id === 'weight_change')!,
];

const HEADLINE = '나만 그런 거';
const HEADLINE2 = '아니었어.';

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Typing effect state
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const fullText = HEADLINE + HEADLINE2;

  // Typing animation
  useEffect(() => {
    if (typedCount < fullText.length) {
      const timer = setTimeout(() => {
        setTypedCount(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setTypingDone(true);
      const subTimer = setTimeout(() => setShowSub(true), 300);
      const ctaTimer = setTimeout(() => setShowCTA(true), 600);
      return () => {
        clearTimeout(subTimer);
        clearTimeout(ctaTimer);
      };
    }
  }, [typedCount, fullText.length]);

  // Character rotation
  useEffect(() => {
    if (!typingDone) return;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroCharacters.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [typingDone]);

  const currentChar = heroCharacters[currentIndex];

  // Split typed text into headline parts
  const typed1 = fullText.slice(0, Math.min(typedCount, HEADLINE.length));
  const typed2 = typedCount > HEADLINE.length ? fullText.slice(HEADLINE.length, typedCount) : '';
  const showCursor = !typingDone;

  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-hlk-primary-light via-white to-hlk-accent-light">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-hlk-border mb-8">
                <div className="flex -space-x-1">
                  <span className="w-2 h-2 bg-hlk-primary rounded-full" />
                  <span className="w-2 h-2 bg-hlk-accent rounded-full" />
                  <span className="w-2 h-2 bg-hlk-primary rounded-full animate-pulse" />
                </div>
                <span className="text-sm font-medium text-hlk-text-secondary">두번째 봄을 지나는 당신, 혼자가 아니에요</span>
              </div>

              {/* Main headline — C2MTL 인사이트: 대담한 크기 + 타이트 행간으로 임팩트 */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-hlk-text mb-6 tracking-tight">
                {typed1}
                {typedCount <= HEADLINE.length && showCursor && (
                  <span className="typing-cursor text-hlk-primary">|</span>
                )}
                {typed2 && (
                  <>
                    <br />
                    <span className="text-hlk-primary">
                      {typed2}
                      {typedCount > HEADLINE.length && showCursor && (
                        <span className="typing-cursor">|</span>
                      )}
                    </span>
                  </>
                )}
              </h1>

              {/* Dynamic symptom — fades in after typing */}
              <div className={`mb-10 transition-all duration-700 ${showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-lg md:text-xl text-hlk-text-secondary leading-relaxed mb-2">
                  지금 겪고 있는{' '}
                  <span
                    className={`inline-block font-bold text-hlk-accent transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                  >
                    {currentChar.name}
                  </span>
                  ,
                </p>
                <p
                  className={`text-base text-hlk-text-tertiary transition-all duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  &ldquo;{currentChar.tagline}&rdquo;
                </p>
              </div>

              {/* CTA — C2MTL 물리 이징으로 부드러운 등장 */}
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}>
                <Link
                  href="/checkin"
                  className="btn-fill-hover btn-fill-hover--accent inline-flex items-center justify-center px-10 py-5 bg-hlk-accent text-white text-lg font-bold rounded-full hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] transition-all animate-subtle-pulse"
                >
                  지금 나의 상태 확인하기
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="https://open.kakao.com/o/gyF0fwgi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-5 bg-[#FEE500] text-[#191919] text-lg font-bold rounded-full hover:bg-[#FEE500]/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] transition-all"
                >
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.8 5.108 4.509 6.457-.2.744-.723 2.694-.828 3.112-.13.518.19.51.399.371.164-.109 2.612-1.726 3.672-2.424.733.104 1.487.159 2.248.159 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
                  </svg>
                  카카오 오픈채팅 참여하기
                </a>
              </div>
            </div>

            {/* Right: Character Card — slides in from right */}
            <div className="relative flex justify-center">
              <div
                className={`relative bg-white rounded-3xl p-8 md:p-10 border border-hlk-border shadow-xl max-w-sm w-full transition-all duration-600 ${
                  isVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-4'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}
              >
                <div className="text-center mb-8">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl mb-5 mx-auto flex items-center justify-center transition-transform duration-300"
                    style={{ backgroundColor: currentChar.color }}
                  >
                    <span className="text-white text-3xl md:text-4xl font-black">
                      {currentChar.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-hlk-text mb-1">
                    {currentChar.nickname}
                  </h3>
                  <p className="text-sm text-hlk-primary font-medium">
                    {currentChar.name}
                  </p>
                </div>

                <div className="bg-hlk-bg rounded-2xl p-5 border border-hlk-border">
                  <p className="text-center text-hlk-text-secondary text-sm md:text-base leading-relaxed">
                    &ldquo;{currentChar.description}&rdquo;
                  </p>
                </div>

                <div className="absolute -top-3 -right-3 bg-hlk-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  공감 1,234
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-hlk-primary/10 blur-3xl" />
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-14">
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
                    ? 'bg-hlk-primary w-8'
                    : 'bg-hlk-border hover:bg-hlk-text-tertiary'
                }`}
                aria-label={char.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

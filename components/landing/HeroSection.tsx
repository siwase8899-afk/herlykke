'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Evernow 인사이트: 증상 순환 텍스트로 공감+포괄성 전달
const cyclingSymptoms = [
  '안면 홍조',
  '수면 장애',
  '감정 기복',
  '관절통',
  '만성 피로',
  '브레인 포그',
  '불안감',
  '체중 변화',
];

export function HeroSection() {
  const [symptomIndex, setSymptomIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setSymptomIndex((prev) => (prev + 1) % cyclingSymptoms.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Teal-Amber gradient background */}
      <div className="bg-gradient-to-br from-alma-primary-light via-white to-alma-accent-light">
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {/* Badge — 실제 포지셔닝 표현 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-alma-border mb-6">
                <span className="w-2 h-2 bg-alma-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-alma-text-secondary">한국 최초 갱년기 전용 커뮤니티</span>
              </div>

              {/* Main headline — 보존: ALMA 최강 카피 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-alma-text leading-[1.1] mb-4">
                나만 그런 거
                <br />
                <span className="text-alma-primary">아니었어.</span>
              </h1>

              {/* 다이나믹 증상 순환 텍스트 (Evernow 인사이트) */}
              <p className="text-lg md:text-xl text-alma-text-secondary leading-relaxed mb-2">
                지금 겪고 있는{' '}
                <span
                  className={`inline-block font-bold text-alma-accent transition-opacity duration-300 ${
                    isVisible ? 'opacity-100 symptom-cycle-enter' : 'opacity-0'
                  }`}
                >
                  {cyclingSymptoms[symptomIndex]}
                </span>
                ,
              </p>
              <p className="text-lg md:text-xl text-alma-text-secondary leading-relaxed mb-8">
                비슷한 친구들과 편하게 나눠요.
              </p>

              {/* CTA */}
              <Link
                href="/checkin"
                className="inline-flex items-center justify-center px-8 py-4 bg-alma-primary text-white font-bold rounded-full hover:bg-alma-primary-dark active:scale-[0.98] transition-all shadow-lg shadow-alma-primary/30"
              >
                무료로 시작하기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Trust text */}
              <p className="mt-6 text-sm text-alma-text-tertiary">
                3분이면 충분해요 · 100% 무료 · 로그인 없이 바로 시작
              </p>
            </div>

            {/* Right: Photo collage */}
            <div className="relative hidden md:block">
              <div className="relative">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop&crop=face"
                    alt="Smiling Korean woman"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-alma-secondary/20 to-transparent" />
                </div>

                {/* Floating card 1 */}
                <div className="absolute -top-4 -left-4 bg-white px-5 py-3 rounded-2xl shadow-xl border border-alma-border">
                  <p className="text-sm font-semibold text-alma-text">반가워요!</p>
                  <p className="text-xs text-alma-text-tertiary">같은 고민을 나눠요</p>
                </div>

                {/* Floating card 2 */}
                <div className="absolute -bottom-4 -right-4 bg-alma-primary px-5 py-3 rounded-2xl shadow-xl">
                  <p className="text-sm font-bold text-white">나도 그래요</p>
                  <p className="text-xs text-white/80">공감 1,234</p>
                </div>

                {/* Small photos */}
                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 flex flex-col gap-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face"
                      alt="Community member"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face"
                      alt="Community member"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-alma-accent flex items-center justify-center">
                    <span className="text-white font-bold text-sm">+999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section — 구체적 수치 신뢰 (Midi 인사이트) */}
      <div className="bg-alma-surface-warm border-t border-alma-border">
        <div className="max-w-6xl mx-auto px-5 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-primary-dark">91%</p>
              <p className="text-sm text-alma-text-secondary mt-1">혼자 겪고 있어요</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-accent-dark">3분</p>
              <p className="text-sm text-alma-text-secondary mt-1">체크인 소요시간</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-secondary">10가지</p>
              <p className="text-sm text-alma-text-secondary mt-1">주요 증상 분석</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

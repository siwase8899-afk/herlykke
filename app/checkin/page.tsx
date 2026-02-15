'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { SYMPTOM_CHARACTERS } from '@/lib/characters';

// 랜덤하게 3개 캐릭터 선택
const getRandomCharacters = () => {
  const shuffled = [...SYMPTOM_CHARACTERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

const infoItems = [
  { emoji: '⏱️', text: '약 3분 소요' },
  { emoji: '🔒', text: '모든 응답은 안전하게 보호됩니다' },
  { emoji: '📊', text: '결과는 즉시 확인 가능' },
  { emoji: '👤', text: '로그인 없이 바로 시작' },
];

function SignupBanner() {
  const searchParams = useSearchParams();
  const fromSignup = searchParams.get('from') === 'signup';

  if (!fromSignup) return null;

  return (
    <div className="bg-alma-primary/10 border border-alma-primary/20 rounded-xl px-4 py-3 mb-6 text-center">
      <p className="text-sm text-alma-text-secondary">
        💡 회원가입을 위해 먼저 간단한 체크인을 완료해주세요
      </p>
    </div>
  );
}

export default function CheckinIntro() {
  const [featuredChars, setFeaturedChars] = useState(SYMPTOM_CHARACTERS.slice(0, 3));
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  useEffect(() => {
    setFeaturedChars(getRandomCharacters());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCharIndex((prev) => (prev + 1) % featuredChars.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [featuredChars.length]);

  const activeChar = featuredChars[activeCharIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-alma-primary-light via-alma-bg to-alma-accent-light">
      <div className="max-w-md mx-auto px-6 md:px-8 py-10">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center text-alma-text-secondary hover:text-alma-text mb-10">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로
        </Link>

        {/* Signup redirect banner */}
        <Suspense fallback={null}>
          <SignupBanner />
        </Suspense>

        <div className="flex flex-col items-center text-center">
          {/* Calm 인사이트: 첫 화면 = 감정 — 따뜻한 인사 */}
          <div className="mb-6">
            <p className="text-lg text-alma-text-secondary mb-2">안녕하세요 👋</p>
            <h2 className="text-2xl font-bold text-alma-text">
              오늘 <span className="text-alma-primary">어떤 하루</span>였나요?
            </h2>
          </div>

          {/* Animated Character Display */}
          <div className="relative mb-8">
            {/* Background glow */}
            <div className="absolute inset-0 bg-alma-primary/10 rounded-full blur-3xl scale-150" />

            {/* Character carousel */}
            <div className="relative bg-white rounded-3xl p-6 border border-alma-border shadow-lg w-64">
              <div className="text-6xl mb-3 transition-all duration-300">
                {activeChar?.emoji}
              </div>
              <p className="text-lg font-bold text-alma-text mb-1">
                {activeChar?.nickname}
              </p>
              <p className="text-sm text-alma-accent">
                &ldquo;{activeChar?.tagline}&rdquo;
              </p>

              {/* Character dots */}
              <div className="flex justify-center gap-2 mt-4">
                {featuredChars.map((char, idx) => (
                  <button
                    key={char.id}
                    onClick={() => setActiveCharIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeCharIndex ? 'bg-alma-primary w-6' : 'bg-alma-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Title — August 인사이트: "두 번째 시작" 프레이밍 */}
          <h1 className="text-2xl font-bold text-alma-text mb-3">
            3분 갱년기 체크인
          </h1>
          <p className="text-alma-primary font-medium leading-relaxed mb-2">
            두 번째 삶의 시작, 함께 준비해요
          </p>
          <p className="text-alma-text-tertiary text-sm leading-relaxed mb-8">
            19개 질문에 답하면<br />
            나의 갱년기 단계와 맞춤 관리법을<br />
            바로 확인할 수 있어요.
          </p>

          {/* Info items */}
          <div className="w-full space-y-4 mb-10 text-left">
            {infoItems.map((item) => (
              <div key={item.text} className="flex items-center gap-4 px-5 py-4 bg-white rounded-xl border border-alma-border shadow-sm">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm text-alma-text-secondary">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA — Headspace/Linear 인사이트: "0원" 강조 */}
          <Link href="/checkin/1" className="w-full">
            <Button variant="primary" size="lg" className="w-full bg-alma-accent hover:bg-alma-accent/90 text-white shadow-lg shadow-alma-accent/30">
              <span className="text-xl font-black mr-2">0원</span>
              시작하기
            </Button>
          </Link>

          {/* Trust markers */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-alma-text-tertiary">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-alma-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              설정 없이 바로
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-alma-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              100% 익명
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-alma-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              언제든 멈춤 가능
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

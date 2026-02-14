'use client';

import { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-[#1a2744]">
      <div className="max-w-md mx-auto px-5 py-8">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로
        </Link>

        <div className="flex flex-col items-center text-center">
          {/* Animated Character Display */}
          <div className="relative mb-8">
            {/* Background glow */}
            <div className="absolute inset-0 bg-alma-accent/20 rounded-full blur-3xl scale-150" />

            {/* Character carousel */}
            <div className="relative bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 w-64">
              <div className="text-6xl mb-3 transition-all duration-300">
                {activeChar?.emoji}
              </div>
              <p className="text-lg font-bold text-white mb-1">
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
                      idx === activeCharIndex ? 'bg-alma-accent w-6' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-3">
            3분 갱년기 체크인
          </h1>
          <p className="text-white/70 leading-relaxed mb-2">
            혹시 나도...?
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            19개 질문에 답하면<br />
            나의 갱년기 단계와 맞춤 관리법을<br />
            바로 확인할 수 있어요.
          </p>

          {/* Info items */}
          <div className="w-full space-y-3 mb-8 text-left">
            {infoItems.map((item) => (
              <div key={item.text} className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm text-white/80">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="/checkin/1" className="w-full">
            <Button variant="primary" size="lg" className="w-full bg-alma-accent hover:bg-alma-accent/90">
              시작하기
            </Button>
          </Link>

          {/* Fun text */}
          <p className="mt-6 text-sm text-white/40">
            걱정 마세요, 웃으면서 체크할 수 있어요 😄
          </p>
        </div>
      </div>
    </div>
  );
}

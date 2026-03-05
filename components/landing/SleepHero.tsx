'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const EMPATHY_TAGS = [
  '#새벽3시에깨요',
  '#자도잔것같지않아',
  '#열감때문에못자요',
  '#잠드는데1시간',
  '#수면제먹기싫어',
  '#갱년기탓인가요',
];

const TYPING_PHRASES = [
  '요즘 갑자기 잠이 안 오시나요?',
  '새벽에 자꾸 눈이 떠지시나요?',
  '자도 잔 것 같지 않으신가요?',
];

export default function SleepHero() {
  const [tagIndex, setTagIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // 공감 태그 자동 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((i) => (i + 1) % EMPATHY_TAGS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 타이핑 애니메이션
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    let i = 0;
    setDisplayText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (i < phrase.length) {
        setDisplayText(phrase.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        // 2.5초 후 다음 문구
        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        }, 2500);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [phraseIndex]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 bg-hlk-bg relative overflow-hidden">
      {/* 배경 원형 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.06] bg-hlk-primary -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.06] bg-hlk-accent translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full">
        {/* 상단 뱃지 */}
        <div className="inline-flex items-center gap-2 bg-hlk-primary-light text-hlk-primary text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span>🌙</span>
          <span>4050 여성 수면·뇌건강 커뮤니티 마켓</span>
        </div>

        {/* 메인 헤딩 — 타이핑 */}
        <h1 className="text-4xl md:text-5xl font-bold text-hlk-text mb-4 min-h-[1.2em]">
          {displayText}
          <span
            className={`inline-block w-0.5 h-10 bg-hlk-primary ml-1 align-middle ${
              isTyping ? 'animate-pulse' : 'opacity-0'
            }`}
          />
        </h1>

        <p className="text-xl text-hlk-text-secondary mb-8 leading-relaxed">
          나만 그런 줄 알았는데, 먼저 겪은 <strong className="text-hlk-primary">언니</strong>들이 있었어요.
          <br className="hidden md:block" />
          검증된 <strong className="text-hlk-primary">수면 레시피</strong>로 함께 잠을 되찾아요.
        </p>

        {/* 공감 태그 */}
        <div className="flex flex-wrap gap-2 mb-10">
          {EMPATHY_TAGS.map((tag, i) => (
            <span
              key={tag}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-500 ${
                i === tagIndex
                  ? 'bg-hlk-primary text-white font-medium scale-105'
                  : 'bg-hlk-surface-warm text-hlk-text-secondary'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/checkin"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-hlk-primary text-white text-lg font-semibold rounded-2xl hover:bg-hlk-primary-dark transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-hlk-primary/20"
          >
            🌙 내 수면 상태 확인하기
          </Link>
          <Link
            href="/recipes"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-hlk-surface text-hlk-primary text-lg font-semibold rounded-2xl border-2 border-hlk-primary/20 hover:border-hlk-primary transition-all duration-300"
          >
            ✨ 수면 레시피 보기
          </Link>
        </div>

        {/* 신뢰 지표 */}
        <div className="flex items-center gap-6 mt-10 text-sm text-hlk-text-tertiary">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-hlk-success animate-pulse" />
            커뮤니티 활동 중
          </span>
          <span>레시피 {10}개+</span>
          <span>경험을 공유해요</span>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SYMPTOM_CHARACTERS } from '@/lib/characters';
import { useSymptomEmpathyStore } from '@/stores/symptomEmpathyStore';

export function SymptomGrid() {
  const [mounted, setMounted] = useState(false);
  const { todayEmpathized, empathyCounts, toggleEmpathy, resetIfNewDay } = useSymptomEmpathyStore();

  useEffect(() => {
    setMounted(true);
    resetIfNewDay();
  }, [resetIfNewDay]);

  // 전체 오늘 공감 수
  const totalTodayCount = Object.values(empathyCounts).reduce((sum, count) => sum + count, 0);

  // 내가 오늘 공감한 수
  const myEmpathyCount = todayEmpathized.length;

  if (!mounted) {
    return (
      <section className="px-6 md:px-8 py-24 md:py-32 bg-white border-t border-alma-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-alma-bg rounded w-1/2 mx-auto mb-4" />
            <div className="h-4 bg-alma-bg rounded w-1/3 mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-alma-bg rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-8 py-24 md:py-32 bg-white border-t border-alma-border">
      <div className="max-w-4xl mx-auto">
        {/* 상단 배지 */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-alma-accent/10 rounded-full">
            <span className="text-sm">🤝</span>
            <span className="text-xs font-bold text-alma-accent uppercase tracking-wider">함께해요</span>
          </span>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-alma-text mb-3">
            오늘 어떤 증상을 겪었나요?
          </h2>
          <p className="text-alma-text-secondary mb-4">
            탭하면 "나도!" 공감이 추가돼요
          </p>
          {/* 실시간 카운트 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-alma-primary-light rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alma-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-alma-primary" />
            </span>
            <span className="text-sm font-medium text-alma-primary">
              오늘 <strong>{totalTodayCount.toLocaleString()}명</strong>이 함께 공감 중
            </span>
          </div>
        </div>

        {/* 증상 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {SYMPTOM_CHARACTERS.map((char) => {
            const isEmpathized = todayEmpathized.includes(char.id);
            const count = empathyCounts[char.id] || 0;

            return (
              <button
                key={char.id}
                onClick={() => toggleEmpathy(char.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all ${
                  isEmpathized
                    ? 'border-alma-primary bg-alma-primary-light shadow-md scale-[1.02]'
                    : 'border-alma-border bg-white hover:border-alma-primary/50 hover:shadow-sm'
                }`}
              >
                {/* 이모지 */}
                <div className="text-4xl mb-2">{char.emoji}</div>

                {/* 증상명 */}
                <p className={`font-semibold text-sm mb-1 ${
                  isEmpathized ? 'text-alma-primary' : 'text-alma-text'
                }`}>
                  {char.name}
                </p>

                {/* 공감 수 - 항상 표시 */}
                <p className={`text-xs ${
                  isEmpathized ? 'text-alma-primary font-medium' : 'text-alma-text-tertiary'
                }`}>
                  {count.toLocaleString()}명
                </p>

                {/* 나도! 배지 */}
                {isEmpathized && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-alma-primary text-white text-[10px] font-bold rounded-full">
                    나도!
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 하단 CTA 영역 */}
        {myEmpathyCount > 0 ? (
          // 공감한 경우
          <div className="bg-gradient-to-r from-alma-primary-light to-alma-accent-light rounded-2xl p-6 text-center">
            <p className="text-lg font-bold text-alma-text mb-2">
              오늘 <span className="text-alma-primary">{myEmpathyCount}개</span> 증상에 공감했어요
            </p>
            <p className="text-sm text-alma-text-secondary mb-5">
              비슷한 경험을 나누고, 상세하게 기록해보세요
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/log/new"
                className="inline-flex items-center justify-center px-6 py-3 bg-alma-accent text-white font-bold rounded-full hover:bg-alma-accent/90 transition-all shadow-lg shadow-alma-accent/30"
              >
                오늘 기록하기
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-alma-primary font-semibold rounded-full border-2 border-alma-primary hover:bg-alma-primary-light transition-all"
              >
                커뮤니티에서 이야기하기
              </Link>
            </div>
          </div>
        ) : (
          // 공감 전
          <div className="text-center">
            <p className="text-sm text-alma-text-tertiary mb-4">
              증상을 탭해서 공감하거나, 바로 기록을 시작해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/log/new"
                className="inline-flex items-center justify-center px-6 py-3 bg-alma-primary text-white font-semibold rounded-full hover:bg-alma-primary-dark transition-all"
              >
                오늘 기록 시작하기
              </Link>
              <Link
                href="/community"
                className="text-alma-primary font-medium hover:underline py-3"
              >
                커뮤니티 둘러보기 →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

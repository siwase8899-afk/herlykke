'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SYMPTOM_CHARACTERS, SYMPTOM_CATEGORIES, type SymptomCategory } from '@/lib/characters';
import { useSymptomEmpathyStore } from '@/stores/symptomEmpathyStore';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function SymptomGrid() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<SymptomCategory>('body');
  const { todayEmpathized, empathyCounts, toggleEmpathy, resetIfNewDay } = useSymptomEmpathyStore();
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    setMounted(true);
    resetIfNewDay();
  }, [resetIfNewDay]);

  // 전체 오늘 공감 수
  const totalTodayCount = Object.values(empathyCounts).reduce((sum, count) => sum + count, 0);

  // 내가 오늘 공감한 수
  const myEmpathyCount = todayEmpathized.length;

  // 현재 탭의 증상들
  const currentSymptoms = SYMPTOM_CHARACTERS.filter((c) => c.category === activeTab);

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
    <section ref={sectionRef} className={`px-6 md:px-8 py-24 md:py-32 bg-white border-t border-alma-border ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-4xl mx-auto">
        {/* 상단 배지 */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-alma-accent/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-alma-accent" />
            <span className="text-xs font-bold text-alma-accent uppercase tracking-wider">함께해요</span>
          </span>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-alma-text mb-3">
            오늘 당신의 몸은 뭐라고 했나요?
          </h2>
          <p className="text-alma-text-secondary mb-4">
            탭 한 번이면 &ldquo;나도 그래!&rdquo; — 혼자가 아니에요
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

        {/* 카테고리 탭 */}
        <div className="flex justify-center gap-2 mb-8">
          {SYMPTOM_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            const catCount = SYMPTOM_CHARACTERS
              .filter((c) => c.category === cat.id)
              .filter((c) => todayEmpathized.includes(c.id))
              .length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? `bg-${cat.color} text-white shadow-md`
                    : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                }`}
                style={isActive ? {
                  backgroundColor: cat.id === 'body' ? 'var(--color-alma-primary)' : cat.id === 'mind' ? 'var(--color-alma-accent)' : 'var(--color-alma-secondary)',
                } : undefined}
              >
                {cat.label}
                {catCount > 0 && (
                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isActive ? 'bg-white/30 text-white' : 'bg-alma-primary text-white'
                  }`}>
                    {catCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 증상 그리드 — A+C: 위트 카피 히어로 + 마이크로 인터랙션 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {currentSymptoms.map((char) => {
            const isEmpathized = todayEmpathized.includes(char.id);
            const count = empathyCounts[char.id] || 0;

            return (
              <button
                key={char.id}
                onClick={() => toggleEmpathy(char.id)}
                className={`group relative text-left rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
                  isEmpathized
                    ? 'shadow-lg scale-[1.02]'
                    : 'hover:shadow-xl hover:-translate-y-1 hover:border-alma-primary/20'
                }`}
                style={{
                  backgroundColor: isEmpathized ? char.color : undefined,
                }}
              >
                {/* 배경 — 비선택 시 연한 컬러 */}
                {!isEmpathized && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-300"
                    style={{ backgroundColor: char.color }}
                  />
                )}

                {/* 상단: 증상명 (작은 레이블) + 컬러 도트 */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${isEmpathized ? 'bg-white/50' : ''}`}
                    style={!isEmpathized ? { backgroundColor: char.color } : undefined}
                  />
                  <p className={`text-[11px] font-semibold uppercase tracking-wide ${
                    isEmpathized ? 'text-white/60' : 'text-alma-text-tertiary'
                  }`}>
                    {char.name}
                  </p>
                </div>

                {/* 태그라인 — 히어로 텍스트 (위트 포인트) */}
                <p className={`text-base md:text-lg font-bold leading-snug mb-3 transition-transform duration-300 group-hover:translate-x-0.5 ${
                  isEmpathized ? 'text-white' : 'text-alma-text'
                }`}>
                  {char.tagline}
                </p>

                {/* 설명 — 호버 시 서서히 나타남 */}
                <p className={`text-[11px] leading-relaxed mb-2 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500 overflow-hidden ${
                  isEmpathized ? 'text-white/70 max-h-12 opacity-100' : 'text-alma-text-secondary'
                }`}>
                  {char.description}
                </p>

                {/* 공감 수 */}
                <p className={`text-[11px] font-medium ${
                  isEmpathized ? 'text-white/80' : 'text-alma-text-tertiary'
                }`}>
                  {count.toLocaleString()}명 공감
                </p>

                {/* 나도! 배지 — 팝인 애니메이션 */}
                {isEmpathized && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/25 backdrop-blur-sm text-white text-[10px] font-bold rounded-full animate-[popIn_0.3s_ease-out]">
                    나도!
                  </div>
                )}

                {/* 호버 힌트 — 비선택 시만 */}
                {!isEmpathized && (
                  <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-medium" style={{ color: char.color }}>
                      탭해서 공감
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 전체 증상 수 안내 */}
        <p className="text-center text-xs text-alma-text-tertiary mb-8">
          총 {SYMPTOM_CHARACTERS.length}개 증상 · {SYMPTOM_CATEGORIES.map((c) =>
            `${c.label} ${SYMPTOM_CHARACTERS.filter((s) => s.category === c.id).length}개`
          ).join(' · ')}
        </p>

        {/* 하단 CTA 영역 */}
        {myEmpathyCount > 0 ? (
          <div className="bg-gradient-to-r from-alma-primary-light to-alma-accent-light rounded-2xl p-6 text-center">
            <p className="text-lg font-bold text-alma-text mb-2">
              {myEmpathyCount}개 증상에 <span className="text-alma-primary">&ldquo;나도!&rdquo;</span> 했어요
            </p>
            <p className="text-sm text-alma-text-secondary mb-5">
              같은 마음인 사람들이 기다리고 있어요
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/log/new"
                className="inline-flex items-center justify-center px-6 py-3 bg-alma-accent text-white font-bold rounded-full hover:bg-alma-accent/90 transition-all shadow-lg shadow-alma-accent/30"
              >
                오늘 나의 상황 기록하기
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
          <div className="text-center">
            <p className="text-sm text-alma-text-tertiary mb-4">
              증상을 탭해서 공감하거나, 바로 기록을 시작해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/log/new"
                className="inline-flex items-center justify-center px-6 py-3 bg-alma-primary text-white font-semibold rounded-full hover:bg-alma-primary-dark transition-all"
              >
                오늘 나의 상황 기록하기
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

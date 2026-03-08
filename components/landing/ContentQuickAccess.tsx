'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { columns, sleepCategoryLabels, type SleepCategory } from '@/lib/columnsData';
import { getAnniePickRecipes } from '@/lib/recipesData';
import { SOLUTIONS } from '@/lib/solutionsData';

/* ── Types ── */
type Tab = 'columns' | 'recipes' | 'solutions';
type SleepProblem = 'falling-asleep' | 'night-waking' | 'early-waking' | 'morning-fatigue';

/* ── Static data ── */
const TABS: { id: Tab; label: string }[] = [
  { id: 'columns', label: '수면 회복 가이드' },
  { id: 'recipes', label: '수면 레시피' },
  { id: 'solutions', label: '맞춤 솔루션' },
];

const PROBLEMS: { id: SleepProblem; label: string; categories: SleepCategory[] }[] = [
  { id: 'falling-asleep', label: '잠들기 어렵다', categories: ['falling-asleep', 'mind-sleep'] },
  { id: 'night-waking', label: '밤에 자주 깬다', categories: ['night-waking'] },
  { id: 'early-waking', label: '새벽에 깬다', categories: ['early-waking'] },
  { id: 'morning-fatigue', label: '아침에 피곤하다', categories: ['morning-fatigue', 'body-signal', 'sleep-routine'] },
];

/* ── Helpers ── */
const symptomMap: Record<SleepProblem, string[]> = {
  'falling-asleep': ['insomnia', 'anxiety'],
  'night-waking': ['insomnia', 'hot_flash', 'night_sweat'],
  'early-waking': ['insomnia', 'anxiety'],
  'morning-fatigue': ['fatigue', 'brain_fog', 'joint_pain'],
};

function filterColumns(problem: SleepProblem | null) {
  if (!problem) return columns.slice(0, 4);
  const cats = PROBLEMS.find((p) => p.id === problem)?.categories ?? [];
  const filtered = columns.filter((c) => cats.includes(c.sleepCategory));
  return filtered.length > 0 ? filtered.slice(0, 4) : columns.slice(0, 4);
}

function filterSolutions(problem: SleepProblem | null) {
  if (!problem) return SOLUTIONS.slice(0, 4);
  const syms = symptomMap[problem];
  const filtered = SOLUTIONS.filter((s) => s.forSymptoms.some((f) => syms.includes(f)));
  return filtered.length > 0 ? filtered.slice(0, 4) : SOLUTIONS.slice(0, 4);
}

/* ── Component ── */
export default function ContentQuickAccess() {
  const [activeTab, setActiveTab] = useState<Tab>('columns');
  const [activeProblem, setActiveProblem] = useState<SleepProblem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const topRecipes = getAnniePickRecipes().slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filteredColumns = filterColumns(activeProblem);
  const filteredSolutions = filterSolutions(activeProblem);

  const ctaHref = activeTab === 'columns' ? '/columns' : activeTab === 'recipes' ? '/recipes' : '/solutions';

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden" style={{ background: '#F6F7F4' }}>
      {/* Subtle background gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(111,156,166,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 80%, rgba(212,149,106,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* ─── 1. SECTION HEADER ─── */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: '#6F9CA6' }}>
            Content Hub
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight mb-5" style={{ color: '#2F3A3D' }}>
            지금 바로 읽어보세요
          </h2>
          <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: '#6B7C80' }}>
            수면 회복 가이드, 커뮤니티 검증 레시피, 맞춤 솔루션을 한 곳에서
          </p>
        </div>

        {/* ─── 2. PROBLEM-BASED DISCOVERY ─── */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <p className="text-sm font-medium mb-5" style={{ color: '#6B7C80' }}>
            오늘 당신의 밤은 어떤가요?
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {PROBLEMS.map((problem) => {
              const isActive = activeProblem === problem.id;
              return (
                <button
                  key={problem.id}
                  onClick={() => setActiveProblem(isActive ? null : problem.id)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    background: isActive ? '#6F9CA6' : '#ffffff',
                    color: isActive ? '#ffffff' : '#4A5C60',
                    border: `1px solid ${isActive ? '#6F9CA6' : '#D8DDD9'}`,
                    boxShadow: isActive
                      ? '0 2px 12px -2px rgba(111,156,166,0.3)'
                      : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  {problem.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 3. CONTENT TYPE TABS ─── */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          <div
            className="inline-flex rounded-full p-1"
            style={{ background: '#EAEDEA', border: '1px solid #D8DDD9' }}
            role="tablist"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                  style={{
                    background: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#2F3A3D' : '#8A9599',
                    boxShadow: isActive ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 4. FEATURED CONTENT CARDS ─── */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Columns */}
          {activeTab === 'columns' && (
            <div key={`columns-${activeProblem}`} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredColumns.map((col, i) => (
                <Link
                  key={col.slug}
                  href={`/columns/${col.slug}`}
                  className="group relative flex flex-col bg-white rounded-[22px] p-6 border transition-all duration-500 ease-out hover:-translate-y-1 animate-slow-fade-in"
                  style={{
                    borderColor: '#E4E8E5',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                    animationDelay: `${i * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 30px -8px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(111,156,166,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)';
                    e.currentTarget.style.borderColor = '#E4E8E5';
                  }}
                >
                  <span
                    className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-semibold mb-4"
                    style={{ background: 'rgba(111,156,166,0.1)', color: '#5A8590' }}
                  >
                    {sleepCategoryLabels[col.sleepCategory]}
                  </span>
                  <h3
                    className="font-bold text-[15px] leading-snug mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-hlk-primary"
                    style={{ color: '#2F3A3D' }}
                  >
                    {col.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed line-clamp-2 mb-4" style={{ color: '#8A9599' }}>
                    {col.subtitle}
                  </p>
                  <div
                    className="mt-auto pt-4 flex items-center gap-2"
                    style={{ borderTop: '1px solid #EFF2F0' }}
                  >
                    <span className="text-xs font-medium" style={{ color: '#6B7C80' }}>{col.expert.name}</span>
                    <span className="text-xs" style={{ color: '#B0BABE' }}>·</span>
                    <span className="text-xs" style={{ color: '#B0BABE' }}>{col.readTime}분 읽기</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Recipes */}
          {activeTab === 'recipes' && (
            <div key="recipes" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {topRecipes.map((recipe, i) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="group relative flex flex-col bg-white rounded-[22px] overflow-hidden border transition-all duration-500 ease-out hover:-translate-y-1 animate-slow-fade-in"
                  style={{
                    borderColor: '#E4E8E5',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                    animationDelay: `${i * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 30px -8px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(111,156,166,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)';
                    e.currentTarget.style.borderColor = '#E4E8E5';
                  }}
                >
                  <div className="relative aspect-[4/3]" style={{ background: '#EFF2F0' }}>
                    <img
                      src={recipe.realInkImageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    {recipe.isAnniePick && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: '#B8E0C6', color: '#2F3A3D' }}
                      >
                        PICK
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3
                      className="font-bold text-[15px] leading-snug mb-3 line-clamp-2"
                      style={{ color: '#2F3A3D' }}
                    >
                      {recipe.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs font-medium" style={{ color: '#6B7C80' }}>
                        {recipe.curatorNickname}
                      </span>
                      <span className="text-xs flex items-center gap-1" style={{ color: '#B0BABE' }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {recipe.likes}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Solutions */}
          {activeTab === 'solutions' && (
            <div key={`solutions-${activeProblem}`} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredSolutions.map((sol, i) => (
                <Link
                  key={sol.id}
                  href={`/solutions/${sol.id}`}
                  className="group relative flex flex-col bg-white rounded-[22px] p-6 border transition-all duration-500 ease-out hover:-translate-y-1 animate-slow-fade-in"
                  style={{
                    borderColor: '#E4E8E5',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                    animationDelay: `${i * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 30px -8px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(111,156,166,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)';
                    e.currentTarget.style.borderColor = '#E4E8E5';
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-sm" style={{ color: '#D4A574' }}>★</span>
                    <span className="text-sm font-medium" style={{ color: '#2F3A3D' }}>{sol.rating}</span>
                    <span className="text-xs" style={{ color: '#B0BABE' }}>({sol.reviews})</span>
                  </div>
                  <h3
                    className="font-bold text-[15px] leading-snug mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-hlk-primary"
                    style={{ color: '#2F3A3D' }}
                  >
                    {sol.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed line-clamp-2 mb-4" style={{ color: '#8A9599' }}>
                    {sol.description}
                  </p>
                  <span className="mt-auto text-sm font-bold" style={{ color: '#5A8590' }}>
                    {sol.price}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ─── 5. BOTTOM CTA ─── */}
        <div
          className={`text-center mt-14 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '550ms' }}
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-500 ease-out hover:gap-3.5"
            style={{
              background: '#ffffff',
              color: '#5A8590',
              border: '1px solid #D8DDD9',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px -4px rgba(111,156,166,0.2)';
              e.currentTarget.style.borderColor = 'rgba(111,156,166,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = '#D8DDD9';
            }}
          >
            지금 나에게 맞는 수면 콘텐츠 더 보기
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

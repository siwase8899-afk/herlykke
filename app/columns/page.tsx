'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { columns, sleepCategoryLabels, type SleepCategory } from '@/lib/columnsData';
import { useAuth } from '@/lib/authContext';

type FilterType = 'all' | SleepCategory;

export default function ColumnsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ColumnsContent />
    </Suspense>
  );
}

function ColumnsContent() {
  const { isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeFilter, setActiveFilter] = useState<FilterType>(
    (categoryParam as FilterType) || 'all'
  );

  const filteredColumns = useMemo(() => {
    if (activeFilter === 'all') return columns;
    return columns.filter((c) => c.sleepCategory === activeFilter);
  }, [activeFilter]);

  const activeLabel =
    activeFilter === 'all'
      ? '전체'
      : sleepCategoryLabels[activeFilter] || activeFilter;

  // 카테고리별 카운트
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    columns.forEach((col) => {
      counts[col.sleepCategory] = (counts[col.sleepCategory] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <section className="relative bg-hlk-primary-light px-6 md:px-8 pt-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-hlk-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Sleep Recovery Guide
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-hlk-text leading-tight mb-4">
            전문가가 들려주는
            <br />
            <span className="text-hlk-primary">수면 회복 이야기</span>
          </h1>
          <p className="text-lg text-hlk-text-secondary max-w-2xl">
            산부인과, 정신건강의학과, 수면의학 전문의가
            <br />
            몸의 변화와 수면에 대해 쉽고 따뜻하게 설명합니다.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-18 z-40 bg-white/95 backdrop-blur-md border-b border-hlk-border">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {/* 전체 */}
            <FilterChip
              label="전체"
              count={columns.length}
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            />

            {/* 수면 카테고리별 */}
            {(Object.entries(sleepCategoryLabels) as [SleepCategory, string][]).map(([slug, label]) => (
              <FilterChip
                key={slug}
                label={label}
                count={categoryCounts[slug] || 0}
                active={activeFilter === slug}
                onClick={() => setActiveFilter(slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Column Cards */}
      <section className="px-6 md:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Result count */}
          <p className="text-sm text-hlk-text-tertiary mb-6">
            <span className="font-semibold text-hlk-text">{activeLabel}</span> 관련 가이드{' '}
            <span className="text-hlk-primary font-bold">{filteredColumns.length}</span>편
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColumns.map((column, idx) => (
              <Link
                key={column.slug}
                href={`/columns/${column.slug}`}
                className="group block card-glass rounded-2xl overflow-hidden card-hover animate-slow-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Category badge + read time */}
                <div className="px-6 pt-6 pb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-hlk-primary/10 text-hlk-primary">
                      {sleepCategoryLabels[column.sleepCategory]}
                    </span>
                    <span className="text-xs text-hlk-text-tertiary">
                      {column.readTime}분 읽기
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-hlk-text leading-snug mb-2 group-hover:text-hlk-primary transition-colors line-clamp-2">
                    {column.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-hlk-text-secondary leading-relaxed line-clamp-2 mb-4">
                    {column.subtitle}
                  </p>
                </div>

                {/* Expert + Sleep Impact */}
                <div className="px-6 pb-6 pt-3 border-t border-hlk-border-light">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-hlk-secondary-light flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-hlk-text">
                        {column.expert.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-hlk-text truncate">
                        {column.expert.name}
                      </p>
                      <p className="text-xs text-hlk-text-tertiary truncate">
                        {column.expert.title}
                      </p>
                    </div>
                  </div>
                  {/* Sleep Impact */}
                  <SleepImpactDots impact={column.sleepImpact} />
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredColumns.length === 0 && (
            <div className="text-center py-20">
              <p className="text-hlk-text-tertiary text-lg">
                해당 카테고리의 가이드가 아직 없어요.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 text-hlk-primary font-semibold hover:underline"
              >
                전체 가이드 보기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-hlk-secondary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {isLoggedIn ? '오늘의 컨디션은 어떠세요?' : '읽는 것만으로는 부족하다면'}
            </h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              {isLoggedIn ? (
                <>매일 기록하면 나만의 패턴이 보여요.<br />오늘의 컨디션을 기록해보세요.</>
              ) : (
                <>3분 체크인으로 나의 변화 단계를 확인하고,<br />나에게 맞는 관리법을 찾아보세요.</>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={isLoggedIn ? '/log/new' : '/checkin'}
                className="px-8 py-3 bg-hlk-accent text-white font-semibold rounded-full hover:bg-hlk-accent/90 transition-colors"
              >
                {isLoggedIn ? '오늘 기록하기' : '나의 상태 확인하기'}
              </Link>
              <Link
                href={isLoggedIn ? '/insights' : '/community'}
                className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors"
              >
                {isLoggedIn ? '패턴 리포트 보기' : '함께하기 둘러보기'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// 수면 영향도 표시 컴포넌트
function SleepImpactDots({ impact }: { impact: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-hlk-text-tertiary">수면 영향도</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full ${
              i <= impact ? 'bg-hlk-primary' : 'bg-hlk-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Filter Chip 컴포넌트
function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  const baseClass =
    'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0';

  const activeClass = 'bg-hlk-secondary text-white shadow-sm';
  const inactiveClass =
    'bg-white text-hlk-text-secondary border border-hlk-border hover:border-hlk-primary/30 hover:text-hlk-text';

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${active ? activeClass : inactiveClass}`}
    >
      {label}
      <span
        className={`text-xs ${active ? 'text-white/70' : 'text-hlk-text-tertiary'}`}
      >
        {count}
      </span>
    </button>
  );
}

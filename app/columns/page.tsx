'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { columns, symptomLabels, type ColumnCategory } from '@/lib/columnsData';
import { useAuth } from '@/lib/authContext';

// Flo 인사이트: 카테고리 필터 + 카드 그리드 → 탐색성 극대화
// Elektra 인사이트: 전문가 프로필 강조 → 신뢰 구축
// Sol 인사이트: 아시아 여성 맥락 → 공감대 형성

type FilterType = 'all' | ColumnCategory | string;

export default function ColumnsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-hlk-bg" />}>
      <ColumnsContent />
    </Suspense>
  );
}

function ColumnsContent() {
  const { isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeFilter, setActiveFilter] = useState<FilterType>(
    categoryParam || 'all'
  );

  // 증상별 그룹핑
  const symptomGroups = useMemo(() => {
    const groups: Record<string, { label: string; category: ColumnCategory; count: number }> = {};
    columns.forEach((col) => {
      if (!groups[col.symptomSlug]) {
        groups[col.symptomSlug] = {
          label: col.symptom,
          category: col.category,
          count: 0,
        };
      }
      groups[col.symptomSlug].count++;
    });
    return groups;
  }, []);

  const filteredColumns = useMemo(() => {
    if (activeFilter === 'all') return columns;
    if (activeFilter === 'body' || activeFilter === 'mind') {
      return columns.filter((c) => c.category === activeFilter);
    }
    // symptomSlug 필터
    return columns.filter((c) => c.symptomSlug === activeFilter);
  }, [activeFilter]);

  const activeLabel =
    activeFilter === 'all'
      ? '전체'
      : activeFilter === 'body'
        ? '몸의 신호'
        : activeFilter === 'mind'
          ? '마음의 신호'
          : symptomLabels[activeFilter] || activeFilter;

  return (
    <div className="min-h-screen bg-hlk-bg">
      {/* Hero */}
      <section className="bg-hlk-primary-light px-6 md:px-8 pt-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-hlk-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Expert Columns
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-hlk-text leading-tight mb-4">
            전문가가 알려주는
            <br />
            <span className="text-hlk-primary">두번째 봄 이야기</span>
          </h1>
          <p className="text-lg text-hlk-text-secondary max-w-2xl">
            산부인과, 정신건강의학과, 수면의학 등 각 분야 전문의가 쉽고 따뜻하게 풀어드려요.
            <br />
            검색하면 광고뿐인 정보 대신, 여기서 제대로 읽어보세요.
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
            {/* 대분류 */}
            <FilterChip
              label="몸의 신호"
              icon="heart"
              count={columns.filter((c) => c.category === 'body').length}
              active={activeFilter === 'body'}
              onClick={() => setActiveFilter('body')}
              color="primary"
            />
            <FilterChip
              label="마음의 신호"
              icon="mind"
              count={columns.filter((c) => c.category === 'mind').length}
              active={activeFilter === 'mind'}
              onClick={() => setActiveFilter('mind')}
              color="accent"
            />

            <div className="w-px bg-hlk-border mx-1 shrink-0" />

            {/* 증상별 */}
            {Object.entries(symptomGroups).map(([slug, info]) => (
              <FilterChip
                key={slug}
                label={info.label}
                count={info.count}
                active={activeFilter === slug}
                onClick={() => setActiveFilter(slug)}
                color={info.category === 'body' ? 'primary' : 'accent'}
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
            <span className="font-semibold text-hlk-text">{activeLabel}</span> 관련 전문가 컬럼{' '}
            <span className="text-hlk-primary font-bold">{filteredColumns.length}</span>편
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColumns.map((column, idx) => (
              <Link
                key={column.slug}
                href={`/columns/${column.slug}`}
                className="group block bg-white rounded-2xl border border-hlk-border overflow-hidden card-hover"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Category badge */}
                <div className="px-6 pt-6 pb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        column.category === 'body'
                          ? 'bg-hlk-primary/10 text-hlk-primary'
                          : 'bg-hlk-accent/10 text-hlk-accent'
                      }`}
                    >
                      {column.symptom}
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

                {/* Expert */}
                <div className="px-6 pb-6 pt-3 border-t border-hlk-border-light">
                  <div className="flex items-center gap-3">
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
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredColumns.length === 0 && (
            <div className="text-center py-20">
              <p className="text-hlk-text-tertiary text-lg">
                해당 카테고리의 전문가 컬럼이 아직 없어요.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 text-hlk-primary font-semibold hover:underline"
              >
                전체 전문가 컬럼 보기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner — Elektra 인사이트: 콘텐츠 끝에 항상 다음 액션 */}
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
                {isLoggedIn ? 'AI 맞춤 조언 보기' : '커뮤니티 둘러보기'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Filter Chip 컴포넌트
function FilterChip({
  label,
  count,
  active,
  onClick,
  icon,
  color = 'default',
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon?: 'heart' | 'mind';
  color?: 'primary' | 'accent' | 'default';
}) {
  const baseClass =
    'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0';

  const activeClass =
    color === 'primary'
      ? 'bg-hlk-primary text-white shadow-sm'
      : color === 'accent'
        ? 'bg-hlk-accent text-white shadow-sm'
        : 'bg-hlk-secondary text-white shadow-sm';

  const inactiveClass =
    'bg-white text-hlk-text-secondary border border-hlk-border hover:border-hlk-primary/30 hover:text-hlk-text';

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${active ? activeClass : inactiveClass}`}
    >
      {icon === 'heart' && (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
      {icon === 'mind' && (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )}
      {label}
      <span
        className={`text-xs ${active ? 'text-white/70' : 'text-hlk-text-tertiary'}`}
      >
        {count}
      </span>
    </button>
  );
}

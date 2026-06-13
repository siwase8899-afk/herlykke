'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { columns, sleepCategoryLabels } from '@/lib/columnsData';

export default function FeaturedColumns() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Pick 4 diverse columns (different sleepCategories)
  const featured = columns.filter((_, i) => [0, 2, 4, 6].includes(i)).slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 bg-hlk-surface">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-sm font-semibold text-hlk-accent mb-3">
              더 알아보고 싶을 때
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text leading-tight">
              몸의 변화를
              <br />
              차분히 이해하는 글
            </h2>
          </div>
          <Link
            href="/columns"
            className={`hidden md:inline-flex items-center gap-2 text-hlk-primary font-semibold text-sm hover:gap-3 transition-all duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            전체 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((col, i) => (
            <Link
              key={col.slug}
              href={`/columns/${col.slug}`}
              className={`group block card-glass rounded-2xl overflow-hidden card-hover ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-hlk-primary/10 text-hlk-primary">
                    {sleepCategoryLabels[col.sleepCategory]}
                  </span>
                  <span className="text-xs text-hlk-text-tertiary">{col.readTime}분</span>
                </div>
                <h3 className="font-bold text-hlk-text text-base leading-snug mb-2 line-clamp-2 group-hover:text-hlk-primary transition-colors">
                  {col.title}
                </h3>
                <p className="text-sm text-hlk-text-secondary line-clamp-2 leading-relaxed">
                  {col.subtitle}
                </p>
              </div>
              <div className="px-5 pb-4 pt-3 border-t border-hlk-border-light">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-hlk-secondary-light flex items-center justify-center">
                      <span className="text-xs font-bold text-hlk-text">{col.expert.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-hlk-text">{col.expert.name}</p>
                      <p className="text-[10px] text-hlk-text-tertiary">{col.expert.title}</p>
                    </div>
                  </div>
                  {/* Sleep Impact */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <span
                        key={j}
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          j <= col.sleepImpact ? 'bg-hlk-primary' : 'bg-hlk-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            href="/columns"
            className="inline-flex items-center gap-2 text-hlk-primary font-semibold text-sm"
          >
            전체 가이드 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}

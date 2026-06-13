'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAnniePickRecipes, RECIPES } from '@/lib/recipesData';
import { CURATOR_LEVELS } from '@/lib/recipesData';

export default function RecipeShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Show top 6 recipes (AnniePick integrated)
  const anniePicks = getAnniePickRecipes();
  const topRecipes = [...anniePicks, ...RECIPES.filter((r) => !r.isAnniePick)]
    .slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-8 bg-hlk-surface-warm">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-14">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-sm font-semibold text-hlk-accent mb-4">
              작게 시작하는 루틴
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text leading-tight">
              먼저 지나온 사람들이
              <br />
              남겨둔 방법들
            </h2>
          </div>
          <div
            className={`md:text-right transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <p className="text-base text-hlk-text-secondary leading-relaxed">
              대단한 해결책보다 실제로 해본 작은 방법을 모읍니다.
              <br className="hidden md:block" />
              내 몸에 맞는지는 천천히 살펴보면 됩니다.
            </p>
          </div>
        </div>

        {/* Recipe cards — 6 cards in responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {topRecipes.map((recipe, i) => {
            const level = CURATOR_LEVELS[recipe.curatorLevel];
            return (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className={`group bg-hlk-surface rounded-3xl overflow-hidden border card-healthcare ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${recipe.isAnniePick ? 'animate-shimmer' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Experience card image */}
                <div className="relative aspect-[4/3] bg-hlk-surface-warm overflow-hidden">
                  <img
                    src={recipe.realInkImageUrl}
                    alt="커뮤니티 경험 카드"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {recipe.isAnniePick && (
                    <div className="absolute top-3 right-3 bg-hlk-highlight text-hlk-text text-[10px] font-bold px-2.5 py-1 rounded-full">
                      PICK
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium px-2.5 py-1 rounded-full text-hlk-text-secondary">
                    경험 기반 루틴
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-hlk-text-secondary">{recipe.curatorNickname}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: level.color + '12', color: level.color }}
                    >
                      {level.name}
                    </span>
                  </div>

                  <h3 className="font-bold text-hlk-text leading-snug mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>

                  <p className="text-sm text-hlk-text-secondary leading-relaxed line-clamp-2 mb-4">
                    &ldquo;{recipe.result}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-hlk-border">
                    <div className="flex gap-1.5">
                      {recipe.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[11px] text-hlk-text-tertiary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] text-hlk-text-tertiary tabular-nums flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {recipe.likes}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <Link
            href="/recipes"
            className="group inline-flex items-center gap-2 text-hlk-primary font-semibold text-base hover:gap-3 transition-all duration-300"
          >
            루틴 자료 전체 보기
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-xs text-hlk-text-tertiary mt-2">
            작은 기록이 쌓이면 나에게 맞는 방향이 보입니다
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAnniePickRecipes } from '@/lib/recipesData';
import { CURATOR_LEVELS } from '@/lib/recipesData';

export default function RecipeShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const topRecipes = getAnniePickRecipes().slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-hlk-bg">
      <div className="max-w-3xl mx-auto">
        {/* 헤딩 */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-hlk-accent-light text-hlk-accent text-sm font-medium px-4 py-2 rounded-full mb-4">
            <span>✍️</span>
            <span>손글씨 인증</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text mb-4">
            언니들의 수면 레시피
          </h2>
          <p className="text-hlk-text-secondary text-lg leading-relaxed">
            손으로 직접 쓴 경험만 올라옵니다.
            <br className="hidden md:block" />
            커뮤니티 공감으로 검증된 레시피예요.
          </p>
        </div>

        {/* 레시피 카드 3장 */}
        <div className="flex flex-col gap-4 mb-10">
          {topRecipes.map((recipe, i) => {
            const level = CURATOR_LEVELS[recipe.curatorLevel];
            return (
              <div
                key={recipe.id}
                className={`bg-hlk-surface rounded-2xl overflow-hidden border border-hlk-border hover:border-hlk-primary/30 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex gap-0">
                  {/* 손글씨 이미지 */}
                  <div className="w-32 md:w-40 flex-shrink-0 relative">
                    <img
                      src={recipe.realInkImageUrl}
                      alt="Real Ink 손글씨"
                      className="w-full h-full object-cover"
                    />
                    {/* 손글씨 인증 배지 */}
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full flex flex-col items-center">
                      <span className="flex items-center gap-1">
                        <span>✍️</span>
                        <span className="text-hlk-text">손글씨 인증</span>
                      </span>
                      <span className="text-[9px] text-hlk-text-tertiary leading-none">Real Ink</span>
                    </div>
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 p-4">
                    {/* 큐레이터 정보 */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">{level.badge}</span>
                      <span className="text-xs text-hlk-text-secondary">{recipe.curatorNickname}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: level.color + '20', color: level.color }}
                      >
                        {level.name}
                      </span>
                      {recipe.isAnniePick && (
                        <span className="text-xs bg-hlk-accent-light text-hlk-accent px-2 py-0.5 rounded-full font-medium ml-auto">
                          ✨ 언니 PICK
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-hlk-text text-sm leading-snug mb-2 line-clamp-2">
                      {recipe.title}
                    </h3>

                    {/* 결과 요약 */}
                    <p className="text-hlk-text-secondary text-xs leading-relaxed line-clamp-2 mb-3">
                      &ldquo;{recipe.result}&rdquo;
                    </p>

                    {/* 태그 + 공감 */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {recipe.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-hlk-text-secondary flex items-center gap-1">
                        ❤️ {recipe.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 더보기 CTA */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-hlk-surface border-2 border-hlk-primary text-hlk-primary font-semibold rounded-2xl hover:bg-hlk-primary hover:text-white transition-all duration-300"
          >
            수면 레시피 전체 보기 →
          </Link>
          <p className="text-hlk-text-tertiary text-sm mt-3">
            진심 한 장이 있어야 레시피가 됩니다
          </p>
        </div>
      </div>
    </section>
  );
}

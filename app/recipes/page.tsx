'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RECIPES, RECIPE_CATEGORIES, getAnniePickRecipes, getRecipesByCategory, RecipeCategory } from '@/lib/recipesData';
import RecipeCard from '@/components/recipes/RecipeCard';

export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState<RecipeCategory>('all');
  const anniePicks = getAnniePickRecipes().slice(0, 3);
  const filteredRecipes = getRecipesByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-hlk-bg">
      {/* 헤더 */}
      <div className="bg-hlk-primary text-white px-6 pt-16 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm px-3 py-1.5 rounded-full mb-4">
            <span>✍️</span>
            <span>Real Ink Verified</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">수면 레시피</h1>
          <p className="text-white/80 leading-relaxed">
            손으로 직접 쓴 경험만 올라옵니다.
            <br />
            커뮤니티 공감으로 검증된 레시피예요.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* 언니 PICK 섹션 */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h2 className="text-lg font-bold text-hlk-text">언니 PICK</h2>
            <span className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-2 py-1 rounded-full ml-1">
              공감 TOP
            </span>
          </div>
          <p className="text-sm text-hlk-text-secondary mb-4">
            공감이 50개 이상 모인 레시피예요. 플랫폼이 아닌 커뮤니티가 선정했어요.
          </p>
          <div className="flex flex-col gap-3">
            {anniePicks.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} layout="list" />
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-hlk-border mb-8" />

        {/* 카테고리 필터 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {RECIPE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-hlk-primary text-white shadow-md'
                  : 'bg-hlk-surface text-hlk-text-secondary border border-hlk-border hover:border-hlk-primary/30'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* 레시피 그리드 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-hlk-text">
              {activeCategory === 'all' ? '전체 레시피' : RECIPE_CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </h3>
            <span className="text-sm text-hlk-text-tertiary">{filteredRecipes.length}개</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} layout="grid" />
            ))}
          </div>
        </div>

        {/* 레시피 올리기 CTA */}
        <div className="mt-10 bg-hlk-primary-light rounded-2xl p-6 text-center border border-hlk-primary/20">
          <div className="text-3xl mb-3">✍️</div>
          <h3 className="font-bold text-hlk-text mb-2">당신의 수면 레시피도 올려보세요</h3>
          <p className="text-sm text-hlk-text-secondary leading-relaxed mb-4">
            손글씨 1장으로 시작해요.
            <br />
            공감이 쌓이면 <strong className="text-hlk-primary">언니 PICK</strong>이 됩니다.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hlk-primary text-white font-semibold rounded-xl hover:bg-hlk-primary-dark transition-colors"
          >
            커뮤니티에서 시작하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}

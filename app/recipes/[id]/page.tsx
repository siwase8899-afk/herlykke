'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getRecipeById, CURATOR_LEVELS, RECIPE_CATEGORIES } from '@/lib/recipesData';
import RealInkBadge from '@/components/recipes/RealInkBadge';
import { analytics } from '@/lib/analytics';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipe = getRecipeById(params.id as string);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-hlk-text-secondary mb-4">레시피를 찾을 수 없어요</p>
          <Link href="/recipes" className="text-hlk-primary font-medium">← 돌아가기</Link>
        </div>
      </div>
    );
  }

  const level = CURATOR_LEVELS[recipe.curatorLevel];
  const categoryLabel = RECIPE_CATEGORIES.find((c) => c.id === recipe.category);

  return (
    <div className="min-h-screen pb-20">
      {/* 뒤로가기 */}
      <div className="sticky top-0 bg-hlk-bg/90 backdrop-blur-sm border-b border-hlk-border z-10 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-hlk-text-secondary hover:text-hlk-text text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          수면 레시피
        </button>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* 손글씨 이미지 */}
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[3/2]">
          <img
            src={recipe.realInkImageUrl}
            alt="Real Ink 손글씨"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <RealInkBadge size="md" />
          </div>
          {recipe.isAnniePick && (
            <div className="absolute top-3 right-3">
              <span className="text-sm bg-hlk-accent text-white px-3 py-1.5 rounded-full font-medium">
                ✨ 메이트 PICK
              </span>
            </div>
          )}
        </div>

        {/* 큐레이터 정보 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: level.color + '20' }}>
            {level.badge}
          </div>
          <div>
            <p className="font-semibold text-hlk-text text-sm">{recipe.curatorNickname}</p>
            <p className="text-xs" style={{ color: level.color }}>{level.name}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {categoryLabel && (
              <span className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-2 py-1 rounded-full">
                {categoryLabel.emoji} {categoryLabel.label}
              </span>
            )}
            <span className="text-sm text-hlk-text-secondary">❤️ {recipe.likes}</span>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-hlk-text mb-6 leading-snug">
          {recipe.title}
        </h1>

        {/* 레시피 포맷: 재료 + 방법 + 결과 */}
        <div className="space-y-5 mb-8">
          {/* 재료 */}
          <div className="card-glass rounded-2xl p-5">
            <h2 className="font-bold text-hlk-text mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-hlk-primary-light text-hlk-primary rounded-lg flex items-center justify-center text-xs font-bold">재</span>
              재료
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-hlk-text-secondary">
                  <span className="text-hlk-primary mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 방법 */}
          <div className="card-glass rounded-2xl p-5">
            <h2 className="font-bold text-hlk-text mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-hlk-accent-light text-hlk-accent rounded-lg flex items-center justify-center text-xs font-bold">법</span>
              방법
            </h2>
            <p className="text-sm text-hlk-text-secondary leading-relaxed">
              {recipe.method}
            </p>
          </div>

          {/* 결과 */}
          <div className="bg-hlk-primary-light rounded-2xl p-5 border border-hlk-primary/20">
            <h2 className="font-bold text-hlk-primary mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-hlk-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              메이트의 후기
            </h2>
            <p className="text-hlk-text leading-relaxed font-medium">
              &ldquo;{recipe.result}&rdquo;
            </p>
            <p className="text-xs text-hlk-text-secondary mt-2">
              사용 기간: {recipe.duration}
            </p>
          </div>
        </div>

        {/* 제품 링크 */}
        {recipe.productLink && recipe.productName && (
          <div className="bg-hlk-accent-light rounded-2xl p-5 mb-8 border border-hlk-accent/20">
            <p className="text-xs text-hlk-text-secondary mb-1">이 레시피에서 사용한 제품</p>
            <p className="font-semibold text-hlk-text mb-3">{recipe.productName}</p>
            <a
              href={recipe.productLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.recipeProductClicked(recipe.id, recipe.productName!)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-hlk-accent text-white text-sm font-semibold rounded-xl hover:bg-hlk-accent-dark transition-colors"
            >
              제품 보러가기 →
            </a>
            <p className="text-xs text-hlk-text-tertiary mt-2">
              * 메이트가 직접 써본 제품이에요
            </p>
          </div>
        )}

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-sm text-hlk-text-secondary bg-hlk-surface-warm px-3 py-1.5 rounded-full border border-hlk-border">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Link
            href="/community"
            className="w-full flex items-center justify-center gap-2 py-4 bg-hlk-primary text-white font-semibold rounded-2xl hover:bg-hlk-primary-dark transition-colors shadow-lg shadow-hlk-primary/20"
          >
            💬 커뮤니티에서 후기 나누기
          </Link>
          <Link
            href="/recipes"
            className="w-full flex items-center justify-center gap-2 py-3 bg-hlk-surface text-hlk-text-secondary font-medium rounded-2xl border border-hlk-border hover:border-hlk-primary/30 transition-colors"
          >
            ← 다른 레시피 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

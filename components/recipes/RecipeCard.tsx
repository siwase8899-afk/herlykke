'use client';

import Link from 'next/link';
import { Recipe, CURATOR_LEVELS } from '@/lib/recipesData';
import RealInkBadge from './RealInkBadge';
import { EmojiIcon } from '@/lib/iconMap';

// 깨진 손글씨 이미지 폴백 — 브랜드 톤(웜크림 + 세이지 초승달) 플레이스홀더
const FALLBACK_INK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23F1EADD'/%3E%3Cpath d='M70 38a24 24 0 1 0 12 36 18 18 0 0 1-12-36z' fill='%235E8C94' opacity='0.45'/%3E%3C/svg%3E";
const onInkError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_INK;
};

interface RecipeCardProps {
  recipe: Recipe;
  layout?: 'grid' | 'list';
}

export default function RecipeCard({ recipe, layout = 'grid' }: RecipeCardProps) {
  const level = CURATOR_LEVELS[recipe.curatorLevel];

  if (layout === 'list') {
    return (
      <Link href={`/recipes/${recipe.id}`}>
        <div className="bg-hlk-surface rounded-2xl overflow-hidden border border-hlk-border card-healthcare flex">
          {/* 손글씨 이미지 */}
          <div className="w-28 md:w-36 flex-shrink-0 relative">
            <img
              src={recipe.realInkImageUrl}
              alt="Real Ink 손글씨"
              onError={onInkError}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <RealInkBadge />
            </div>
          </div>

          {/* 내용 */}
          <div className="flex-1 p-4">
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              <EmojiIcon emoji={level.badge} size={14} />
              <span className="text-xs text-hlk-text-secondary">{recipe.curatorNickname}</span>
              {recipe.isAnniePick && (
                <span className="text-xs bg-hlk-accent-light text-hlk-accent px-2 py-0.5 rounded-full font-medium ml-auto">
                  <EmojiIcon emoji="✨" size={12} /> 메이트 PICK
                </span>
              )}
            </div>
            <h3 className="font-semibold text-hlk-text text-sm leading-snug mb-2 line-clamp-2">
              {recipe.title}
            </h3>
            <p className="text-hlk-text-secondary text-xs leading-relaxed line-clamp-2 mb-3">
              &ldquo;{recipe.result}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {recipe.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-hlk-text-secondary"><EmojiIcon emoji="❤️" size={12} /> {recipe.likes}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // grid layout
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="bg-hlk-surface rounded-2xl overflow-hidden border border-hlk-border card-healthcare h-full flex flex-col">
        {/* 손글씨 이미지 */}
        <div className="relative aspect-[4/3]">
          <img
            src={recipe.realInkImageUrl}
            alt="Real Ink 손글씨"
              onError={onInkError}
            className="w-full h-full object-cover"
          />
          {/* 배지들 */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <RealInkBadge />
          </div>
          {recipe.isAnniePick && (
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-hlk-accent text-white px-2.5 py-1 rounded-full font-medium">
                ✨ 메이트 PICK
              </span>
            </div>
          )}
        </div>

        {/* 내용 */}
        <div className="p-4 flex-1 flex flex-col">
          {/* 큐레이터 */}
          <div className="flex items-center gap-1.5 mb-2">
            <EmojiIcon emoji={level.badge} size={14} />
            <span className="text-xs text-hlk-text-secondary">{recipe.curatorNickname}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full ml-auto"
              style={{ backgroundColor: level.color + '15', color: level.color }}
            >
              {level.name}
            </span>
          </div>

          <h3 className="font-semibold text-hlk-text text-sm leading-snug mb-2 flex-1 line-clamp-2">
            {recipe.title}
          </h3>

          {/* 결과 요약 */}
          <p className="text-hlk-text-secondary text-xs leading-relaxed line-clamp-2 mb-3">
            &ldquo;{recipe.result}&rdquo;
          </p>

          {/* 태그 + 공감 */}
          <div className="flex items-center justify-between pt-2 border-t border-hlk-border-light">
            <div className="flex gap-1">
              {recipe.tags.slice(0, 1).map((tag) => (
                <span key={tag} className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-hlk-text-secondary"><EmojiIcon emoji="❤️" size={12} /> {recipe.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { columns, sleepCategoryLabels } from '@/lib/columnsData';
import { getAnniePickRecipes } from '@/lib/recipesData';

interface PersonalizedFeedProps {
  /** User's recent symptom IDs */
  symptoms?: string[];
}

// Map dashboard symptom IDs to sleepCategory slugs
const SYMPTOM_TO_SLUG: Record<string, string[]> = {
  hot_flash: ['night-waking'],
  insomnia: ['night-waking', 'falling-asleep'],
  fatigue: ['morning-fatigue'],
  mood_swing: ['mind-sleep'],
  anxiety: ['falling-asleep'],
  brain_fog: ['mind-sleep'],
  joint_pain: ['body-signal', 'morning-fatigue'],
  night_sweat: ['night-waking'],
  headache: ['morning-fatigue'],
  weight_change: ['body-signal'],
};

export function PersonalizedFeed({ symptoms = ['hot_flash', 'insomnia', 'fatigue'] }: PersonalizedFeedProps) {
  // Match columns by symptom
  const matchedSlugs = symptoms.flatMap((s) => SYMPTOM_TO_SLUG[s] || []);
  const matchedColumns = columns.filter((c) => matchedSlugs.includes(c.sleepCategory)).slice(0, 4);
  const matchedRecipes = getAnniePickRecipes().slice(0, 3);

  const allItems = [
    ...matchedColumns.map((col) => ({
      type: 'column' as const,
      id: col.slug,
      title: col.title,
      subtitle: col.expert.name + ' · ' + col.readTime + '분 읽기',
      href: `/columns/${col.slug}`,
      badge: sleepCategoryLabels[col.sleepCategory],
      badgeColor: 'primary' as const,
    })),
    ...matchedRecipes.map((r) => ({
      type: 'recipe' as const,
      id: r.id,
      title: r.title,
      subtitle: r.curatorNickname + ' · 공감 ' + r.likes,
      href: `/recipes/${r.id}`,
      badge: '레시피',
      badgeColor: 'accent' as const,
    })),
  ].slice(0, 6);

  if (allItems.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-bold text-hlk-text">나에게 맞는 콘텐츠</h2>
          <p className="text-xs text-hlk-text-tertiary">최근 증상을 기반으로 추천해요</p>
        </div>
        <Link href="/columns" className="text-xs text-hlk-primary hover:underline">
          더보기
        </Link>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
        {allItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex-shrink-0 w-[240px] bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-hlk-border/60 hover:border-hlk-primary/20 hover:shadow-md transition-all"
          >
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2 ${
                item.badgeColor === 'primary'
                  ? 'bg-hlk-primary/10 text-hlk-primary'
                  : 'bg-hlk-accent/10 text-hlk-accent'
              }`}
            >
              {item.badge}
            </span>
            <h3 className="text-sm font-bold text-hlk-text leading-snug mb-2 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs text-hlk-text-tertiary">{item.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

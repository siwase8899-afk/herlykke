'use client';

import Link from 'next/link';
import { columns } from '@/lib/columnsData';
import { getAnniePickRecipes } from '@/lib/recipesData';

export function TodaysReading() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );

  const todayColumn = columns[dayOfYear % columns.length];
  const anniePicks = getAnniePickRecipes();
  const todayRecipe = anniePicks[dayOfYear % anniePicks.length];

  const cards = [
    {
      type: '전문가 컬럼',
      emoji: '📚',
      title: todayColumn.title,
      sub: todayColumn.expert.name + ' · ' + todayColumn.readTime + '분',
      href: `/columns/${todayColumn.slug}`,
      color: 'bg-hlk-primary/10 text-hlk-primary',
    },
    {
      type: '수면 레시피',
      emoji: '✍️',
      title: todayRecipe.title,
      sub: todayRecipe.curatorNickname + ' · 공감 ' + todayRecipe.likes,
      href: `/recipes/${todayRecipe.id}`,
      color: 'bg-hlk-accent/10 text-hlk-accent',
    },
    {
      type: '오늘의 팁',
      emoji: '💡',
      title: '자기 전 90분 전 따뜻한 샤워하기',
      sub: '수면 위생',
      href: '/insights',
      color: 'bg-hlk-highlight/20 text-hlk-text',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-hlk-text">오늘의 추천</h2>
        <Link href="/columns" className="text-xs text-hlk-primary hover:underline">
          전체 보기
        </Link>
      </div>
      <div className="space-y-3">
        {cards.map((card) => (
          <Link
            key={card.type}
            href={card.href}
            className="group flex items-start gap-3 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-hlk-border/60 hover:border-hlk-primary/20 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-hlk-surface-warm flex items-center justify-center flex-shrink-0 text-lg">
              {card.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1 ${card.color}`}>
                {card.type}
              </span>
              <h3 className="text-sm font-bold text-hlk-text leading-snug line-clamp-2 group-hover:text-hlk-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-hlk-text-tertiary mt-0.5">{card.sub}</p>
            </div>
            <svg className="w-4 h-4 text-hlk-text-tertiary flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

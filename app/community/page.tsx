'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CommunityTalkTab } from '@/components/community/CommunityTalkTab';
import { MessageCircle, Moon, Sparkles, type LucideIcon } from 'lucide-react';
import { MateAvatar, RecipeObject } from '@/components/visuals/CommunityVisuals';

type TabId = 'checkin' | 'talk' | 'recipes';

const TABS: { id: TabId; Icon: LucideIcon; label: string }[] = [
  { id: 'checkin', Icon: Moon, label: '오늘 수면' },
  { id: 'talk', Icon: MessageCircle, label: '고민&경험' },
  { id: 'recipes', Icon: Sparkles, label: '메이트 PICK' },
];

const DEMO_CHECKINS = [
  { nickname: '달빛요정', score: 3, tag: '#새벽각성', time: '1분 전' },
  { nickname: '수면탐정', score: 4, tag: '#족욕후', time: '5분 전' },
  { nickname: '마그네슘메이트', score: 5, tag: '#레시피효과!', time: '12분 전' },
  { nickname: '잠꾸러기탈출', score: 2, tag: '#열감', time: '23분 전' },
  { nickname: '라벤더팬', score: 4, tag: '#아로마', time: '31분 전' },
];

const DEMO_PICKS = [
  { id: 'r01', title: '마그네슘 + 족욕으로 새벽 각성 없앤 방법', curator: '잠꾸러기탈출', likes: 124 },
  { id: 'r06', title: '4-7-8 호흡법으로 새벽에 깼을 때 다시 잠드는 방법', curator: '숨쉬는여자', likes: 78 },
  { id: 'r08', title: '커피 컷오프 시간 바꿨더니 수면 질이 달라진 이야기', curator: '커피끊은날', likes: 62 },
  { id: 'r02', title: '자기 전 10분 요가 니드라로 열감 없이 잠드는 법', curator: '요가메이트45', likes: 89 },
];

// Sleep checkin widget
function SleepCheckinWidget() {
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const SCORES = [
    { value: 1, label: '최악' },
    { value: 2, label: '나쁨' },
    { value: 3, label: '보통' },
    { value: 4, label: '좋음' },
    { value: 5, label: '최고' },
  ];

  if (submitted) {
    return (
      <div className="bg-hlk-primary-light rounded-2xl p-5 text-center animate-scale-in">
        <div className="mb-2"><Moon size={32} className="mx-auto text-hlk-primary" /></div>
        <p className="font-semibold text-hlk-primary">오늘 수면 기록 완료!</p>
        <p className="text-sm text-hlk-text-secondary mt-1">수면 점수 {score}/5점</p>
      </div>
    );
  }

  return (
      <div className="card-glass relative overflow-hidden rounded-2xl p-5">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-hlk-primary-light/65 blur-2xl" aria-hidden />
        <div className="relative mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-hlk-text">오늘 밤 수면은 어떠셨나요?</p>
            <p className="mt-1 text-xs text-hlk-text-secondary">짧게 남긴 기록이 내 패턴을 보여줘요.</p>
          </div>
          <div className="hidden h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-hlk-surface-warm sm:flex">
            <RecipeObject seed="sleep-checkin" size={58} />
          </div>
        </div>
      <div className="flex justify-between mb-4">
        {SCORES.map((s) => (
          <button
            key={s.value}
            onClick={() => setScore(s.value)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
              score === s.value ? 'bg-hlk-primary-light scale-110' : 'hover:bg-hlk-surface-warm'
            }`}
          >
            <Moon size={24} strokeWidth={1.75} style={{ opacity: 0.25 + (s.value / 5) * 0.75 }} className="text-hlk-primary" />
            <span className="text-xs text-hlk-text-tertiary">{s.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => score && setSubmitted(true)}
        disabled={!score}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
          score
            ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark'
            : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
        }`}
      >
        기록하기
      </button>
    </div>
  );
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabId>('checkin');

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="relative overflow-hidden bg-hlk-primary-dark px-6 pb-8 pt-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(111,92,158,0.28)_0%,transparent_65%)]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-hlk-bg/95 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold mb-1 animate-slow-fade-in">수면 커뮤니티</h1>
          <p className="max-w-sm text-white/88 text-sm animate-slow-fade-in-delay-1">
            나만 이런 게 아니었어요. 오늘의 밤을 조용히 나누는 곳.
          </p>
        </div>
      </div>

      {/* Tab nav */}
      <div className="sticky top-0 bg-hlk-bg/95 backdrop-blur-sm border-b border-hlk-border z-10">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex">
            {TABS.map((tab) => {
              const Icon = tab.Icon;
              return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-4 text-sm font-medium border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-hlk-primary text-hlk-primary'
                    : 'border-transparent text-hlk-text-secondary hover:text-hlk-text'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                <span>{tab.label}</span>
              </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Sleep checkin tab */}
        {activeTab === 'checkin' && (
          <div className="animate-slow-fade-in">
            <SleepCheckinWidget />

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold text-hlk-text-secondary">지금 이 순간 체크인 중</h2>
                <div className="flex gap-0.5">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-hlk-primary" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-hlk-primary" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-hlk-primary" />
                </div>
              </div>
              <div className="space-y-3">
                {DEMO_CHECKINS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 card-glass rounded-xl px-4 py-3 animate-slow-fade-in"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <MateAvatar seed={item.nickname} size={40} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-hlk-text">{item.nickname}</span>
                        <span className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div
                            key={j}
                            className={`w-3 h-1.5 rounded-full transition-all duration-500 ${
                              j < item.score ? 'bg-hlk-primary' : 'bg-hlk-border'
                            }`}
                            style={{ transitionDelay: `${j * 50}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-hlk-text-tertiary">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-hlk-border bg-hlk-surface-warm p-5 sm:grid-cols-[86px_1fr]">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/70">
                <RecipeObject seed="sleep-pattern" size={72} />
              </div>
              <div>
                <p className="text-sm font-semibold text-hlk-text mb-1">수면 기록이 쌓이면</p>
                <p className="text-xs text-hlk-text-secondary leading-relaxed">
                  나의 수면 패턴을 발견할 수 있어요. 어떤 방법이 효과 있었는지도 보여요.
                  30일이 쌓이면 메이트 PICK에 도전해볼 수 있어요.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Talk tab — 실제 글쓰기 CRUD */}
        {activeTab === 'talk' && <CommunityTalkTab />}

        {/* Recipes tab */}
        {activeTab === 'recipes' && (
          <div className="animate-slow-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-bold text-hlk-text">커뮤니티가 선정한 레시피</h2>
            </div>
            <p className="text-sm text-hlk-text-secondary mb-6">
              공감 50개 이상이 모인 레시피만 올라와요. 동기들이 골랐어요.
            </p>

            <div className="space-y-3">
              {DEMO_PICKS.map((pick, i) => (
                <Link
                  key={pick.id}
                  href={`/recipes/${pick.id}`}
                  className="block animate-slow-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="card-glass rounded-2xl p-5 hover:border-hlk-primary/30 hover:shadow-sm transition-all duration-300 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-hlk-primary-light flex items-center justify-center flex-shrink-0">
                      <RecipeObject seed={pick.title} size={54} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-hlk-text leading-snug mb-1 line-clamp-2">
                        {pick.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-hlk-text-tertiary">{pick.curator}</span>
                        <span className="text-xs text-hlk-text-secondary ml-auto flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          {pick.likes}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs bg-hlk-highlight text-hlk-text px-2.5 py-1 rounded-full font-bold flex-shrink-0">
                      PICK
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-hlk-primary/20 bg-hlk-primary-light p-5 sm:grid-cols-[72px_1fr]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60">
                <RecipeObject seed="write-recipe" size={62} />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-hlk-text mb-1">나의 수면 레시피 올리기</p>
                <p className="text-xs text-hlk-text-secondary leading-relaxed mb-3">
                  손글씨 1장과 함께 올려주세요. 진심 한 장이 있어야 레시피가 됩니다.
                </p>
                <Link
                  href="/recipes"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-hlk-primary text-white text-sm font-semibold rounded-xl hover:bg-hlk-primary-dark transition-colors"
                >
                  레시피 전체 보기 →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

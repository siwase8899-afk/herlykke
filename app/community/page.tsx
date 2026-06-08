'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { SleepCycleViz } from '@/components/ui/SleepCycleViz';
import { CommunityTalkTab } from '@/components/community/CommunityTalkTab';

type TabId = 'checkin' | 'talk' | 'recipes';

const TABS: { id: TabId; emoji: string; label: string }[] = [
  { id: 'checkin', emoji: '🌙', label: '오늘 수면' },
  { id: 'talk', emoji: '💬', label: '고민&경험' },
  { id: 'recipes', emoji: '✨', label: '메이트 PICK' },
];

const DEMO_CHECKINS = [
  { nickname: '달빛요정', score: 3, tag: '#새벽각성', time: '1분 전', emoji: '😮‍💨' },
  { nickname: '수면탐정', score: 4, tag: '#족욕후', time: '5분 전', emoji: '😊' },
  { nickname: '마그네슘메이트', score: 5, tag: '#레시피효과!', time: '12분 전', emoji: '😄' },
  { nickname: '잠꾸러기탈출', score: 2, tag: '#열감', time: '23분 전', emoji: '😳' },
  { nickname: '라벤더팬', score: 4, tag: '#아로마', time: '31분 전', emoji: '🥰' },
];

const DEMO_PICKS = [
  { id: 'r01', emoji: '🌿', title: '마그네슘 + 족욕으로 새벽 각성 없앤 방법', curator: '잠꾸러기탈출', likes: 124 },
  { id: 'r06', emoji: '🧘‍♀️', title: '4-7-8 호흡법으로 새벽에 깼을 때 다시 잠드는 방법', curator: '숨쉬는여자', likes: 78 },
  { id: 'r08', emoji: '☕', title: '커피 컷오프 시간 바꿨더니 수면 질이 달라진 이야기', curator: '커피끊은날', likes: 62 },
  { id: 'r02', emoji: '🌙', title: '자기 전 10분 요가 니드라로 열감 없이 잠드는 법', curator: '요가메이트45', likes: 89 },
];

// Sleep checkin widget
function SleepCheckinWidget() {
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const SCORES = [
    { value: 1, emoji: '😞', label: '최악' },
    { value: 2, emoji: '😕', label: '나쁨' },
    { value: 3, emoji: '😐', label: '보통' },
    { value: 4, emoji: '😊', label: '좋음' },
    { value: 5, emoji: '😄', label: '최고' },
  ];

  if (submitted) {
    return (
      <div className="bg-hlk-primary-light rounded-2xl p-5 text-center animate-scale-in">
        <div className="text-3xl mb-2">{SCORES.find((s) => s.value === score)?.emoji}</div>
        <p className="font-semibold text-hlk-primary">오늘 수면 기록 완료!</p>
        <p className="text-sm text-hlk-text-secondary mt-1">수면 점수 {score}/5점</p>
      </div>
    );
  }

  return (
    <div className="bg-hlk-surface rounded-2xl p-5 border border-hlk-border">
      <p className="font-semibold text-hlk-text mb-4">오늘 밤 수면은 어떠셨나요?</p>
      <div className="flex justify-between mb-4">
        {SCORES.map((s) => (
          <button
            key={s.value}
            onClick={() => setScore(s.value)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
              score === s.value ? 'bg-hlk-primary-light scale-110' : 'hover:bg-hlk-surface-warm'
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
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
    <div className="min-h-screen bg-hlk-bg relative">
      <FloatingOrbs />
      {/* Header with animated moon */}
      <div className="bg-gradient-to-r from-hlk-primary to-hlk-primary-dark text-white px-6 pt-16 pb-6 relative overflow-hidden">
        <div className="absolute top-4 right-6 opacity-30">
          <SleepCycleViz quality={75} size={48} />
        </div>
        <div className="max-w-2xl mx-auto relative">
          <h1 className="text-2xl font-bold mb-1 animate-slow-fade-in">수면 커뮤니티</h1>
          <p className="text-white/80 text-sm animate-slow-fade-in-delay-1">나만 이런 게 아니었어요. 여기 다들 있어요.</p>
        </div>
      </div>

      {/* Tab nav */}
      <div className="sticky top-0 bg-hlk-bg/95 backdrop-blur-sm border-b border-hlk-border z-10">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-4 text-sm font-medium border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-hlk-primary text-hlk-primary'
                    : 'border-transparent text-hlk-text-secondary hover:text-hlk-text'
                }`}
              >
                <span className="text-base">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
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
                    className="flex items-center gap-3 bg-hlk-surface rounded-xl px-4 py-3 border border-hlk-border animate-slow-fade-in"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
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

            <div className="mt-6 bg-hlk-surface-warm rounded-2xl p-5 border border-hlk-border">
              <p className="text-sm font-semibold text-hlk-text mb-1">수면 기록이 쌓이면</p>
              <p className="text-xs text-hlk-text-secondary leading-relaxed">
                나의 수면 패턴을 발견할 수 있어요. 어떤 방법이 효과 있었는지도 보여요.
                30일이 쌓이면 메이트 PICK에 도전해볼 수 있어요.
              </p>
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
                  <div className="bg-hlk-surface rounded-2xl p-5 border border-hlk-border hover:border-hlk-primary/30 hover:shadow-sm transition-all duration-300 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-hlk-primary-light flex items-center justify-center text-2xl flex-shrink-0">
                      {pick.emoji}
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

            <div className="mt-6 bg-hlk-primary-light rounded-2xl p-5 text-center border border-hlk-primary/20">
              <div className="text-2xl mb-2">✍️</div>
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
        )}
      </div>
    </div>
  );
}

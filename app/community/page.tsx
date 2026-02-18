'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { TodaySymptomsWidget } from '@/components/community/TodaySymptomsWidget';

// 탭 정의
type TabId = 'kakao' | 'empathy';

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: 'kakao', label: '카톡 토크방', emoji: '\uD83D\uDCAC' },
  { id: 'empathy', label: '증상 공감', emoji: '\uD83D\uDC9C' },
];

// 카카오 토크방 데이터
const KAKAO_ROOMS = [
  {
    id: 'hot-flash',
    emoji: '\u2600\uFE0F',
    name: '열감/안면홍조',
    members: 38,
    href: '#kakao-hotflash',
    color: 'bg-red-50 text-red-600 border-red-100',
  },
  {
    id: 'sleep',
    emoji: '\uD83C\uDF19',
    name: '수면장애',
    members: 45,
    href: '#kakao-sleep',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    id: 'emotion',
    emoji: '\uD83D\uDC9C',
    name: '감정/우울',
    members: 52,
    href: '#kakao-emotion',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    id: 'general',
    emoji: '\uD83D\uDCAC',
    name: '전체 수다방',
    members: 124,
    href: '#kakao-general',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  },
];

export default function CommunityPage() {
  return <CommunityContent />;
}

function CommunityContent() {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<TabId>('kakao');
  const [clickedRoom, setClickedRoom] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    await supabase.auth.getUser();
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hlk-bg flex items-center justify-center">
        <div className="text-hlk-text-secondary">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hlk-bg">
      {/* 페이지 헤더 + 탭 */}
      <div className="sticky top-16 z-40">
        <div className="bg-gradient-to-r from-hlk-primary to-hlk-accent">
          <div className="max-w-2xl mx-auto px-6 md:px-8 py-5 text-white">
            <h1 className="text-xl font-bold mb-0.5">함께하기</h1>
            <p className="text-white/70 text-xs">같은 경험을 나누는 가장 편한 방법</p>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white border-b border-hlk-border">
          <div className="max-w-2xl mx-auto px-6 md:px-8 py-2.5">
            <div className="flex gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedTab === tab.id
                      ? 'bg-hlk-primary text-white shadow-sm'
                      : 'bg-hlk-bg text-hlk-text-secondary hover:bg-hlk-border'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 탭 콘텐츠 */}
      <main className="max-w-2xl mx-auto px-6 md:px-8 py-6">

        {/* 카톡 토크방 탭 */}
        {selectedTab === 'kakao' && (
          <div className="bg-white rounded-2xl border border-hlk-border overflow-hidden">
            <div className="p-5 pb-3">
              <h2 className="font-bold text-hlk-text mb-1">증상별 카카오 토크방</h2>
              <p className="text-xs text-hlk-text-secondary">
                같은 증상을 겪고 있는 분들과 실시간으로 이야기해요
              </p>
            </div>

            <div className="px-4 pb-4 space-y-2">
              {KAKAO_ROOMS.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setClickedRoom(room.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all hover:shadow-sm ${room.color}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{room.emoji}</span>
                    <span className="text-sm font-medium">{room.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {clickedRoom === room.id ? (
                      <span className="text-xs font-medium">곧 오픈!</span>
                    ) : (
                      <>
                        <span className="text-xs opacity-70">곧 오픈</span>
                        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              ))}

              {clickedRoom && (
                <div className="p-3 bg-hlk-primary-light rounded-xl text-center">
                  <p className="text-sm text-hlk-primary font-medium">
                    카카오 토크방을 준비하고 있어요!
                  </p>
                  <p className="text-xs text-hlk-text-secondary mt-1">
                    체크인을 완료하시면 오픈 시 초대해 드릴게요
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-hlk-border mt-3">
                <p className="text-center text-[11px] text-hlk-text-tertiary">
                  카톡 닉네임으로 편하게 참여하세요
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 증상 공감 탭 */}
        {selectedTab === 'empathy' && (
          <TodaySymptomsWidget defaultExpanded />
        )}
      </main>
    </div>
  );
}

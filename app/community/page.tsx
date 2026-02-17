'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { TodaySymptomsWidget } from '@/components/community/TodaySymptomsWidget';

// Match 데모 프로필 데이터
const DEMO_PROFILES = [
  {
    id: '1',
    anonymous_name: '따뜻한 햇살',
    age_group: '40대 초반',
    stage: '변화 시작기',
    situation: '직장인',
    main_symptoms: ['열감', '수면장애', '피로감'],
    interests: ['요가', '명상', '독서'],
    bio: '비슷한 경험을 나눌 친구를 찾고 있어요. 함께 이야기하며 위로받고 싶어요.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face',
    match_percent: 92,
    online: true,
    match_reason: '같은 증상 3개 · 같은 상황',
  },
  {
    id: '2',
    anonymous_name: '포근한 바람',
    age_group: '40대 중반',
    stage: '변화 활발기',
    situation: '직장인',
    main_symptoms: ['브레인포그', '감정기복', '열감'],
    interests: ['운동', '요리', '정원가꾸기'],
    bio: '직장 생활하면서 갱년기 겪고 있어요. 같은 상황인 분들과 소통하고 싶어요.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face',
    match_percent: 87,
    online: false,
    match_reason: '같은 증상 2개 · 같은 관심사',
  },
  {
    id: '3',
    anonymous_name: '밝은 달빛',
    age_group: '50대 초반',
    stage: '변화 안정기',
    situation: '자녀 독립 후',
    main_symptoms: ['관절통', '피로감', '수면장애'],
    interests: ['산책', '명상', '뜨개질'],
    bio: '갱년기 끝자락에 있어요. 경험을 나누고 후배들에게 도움이 되고 싶어요.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face',
    match_percent: 78,
    online: true,
    match_reason: '멘토링 가능 · 경험 공유',
  },
  {
    id: '4',
    anonymous_name: '싱그러운 아침',
    age_group: '40대 후반',
    stage: '변화 활발기',
    situation: '1인가구',
    main_symptoms: ['열감', '불안', '피부건조'],
    interests: ['필라테스', '카페투어', '영화'],
    bio: '혼자 고민하다가 HERLYKKE를 알게 됐어요. 솔직하게 이야기 나눌 수 있는 친구를 찾아요.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    match_percent: 85,
    online: true,
    match_reason: '같은 증상 2개 · 같은 상황',
  },
  {
    id: '5',
    anonymous_name: '고운 꽃잎',
    age_group: '40대 초반',
    stage: '변화 시작기',
    situation: '재취업 준비',
    main_symptoms: ['생리불순', '피로감', '두통'],
    interests: ['요가', '독서', '음악감상'],
    bio: '최근에 증상이 시작됐어요. 선배님들의 조언이 필요해요!',
    image: 'https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=400&h=400&fit=crop&crop=face',
    match_percent: 90,
    online: false,
    match_reason: '같은 단계 · 조언 필요',
  },
  {
    id: '6',
    anonymous_name: '향기로운 봄',
    age_group: '50대 초반',
    stage: '변화 안정기',
    situation: '자영업/창업',
    main_symptoms: ['수면장애', '열감', '관절통'],
    interests: ['등산', '요가', '봉사활동'],
    bio: '긍정적인 마인드로 이 시기를 보내고 있어요. 함께 응원해요!',
    image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=400&h=400&fit=crop&crop=face',
    match_percent: 75,
    online: true,
    match_reason: '비슷한 관심사 · 긍정 에너지',
  },
];

type Profile = typeof DEMO_PROFILES[number];

// 탭 정의
type TabId = 'empathy' | 'kakao' | 'match';

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: 'empathy', label: '증상 공감', emoji: '\uD83D\uDC9C' },
  { id: 'kakao', label: '카톡 토크방', emoji: '\uD83D\uDCAC' },
  { id: 'match', label: '친구 찾기', emoji: '\uD83E\uDD1D' },
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
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<TabId>('empathy');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Match 상태
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!isSupabaseConfigured) {
      setUser({ id: 'demo' });
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  };

  const requireAuth = (action: () => void) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    action();
  };

  const handleLike = (profile: Profile) => {
    requireAuth(() => {
      setLikedProfiles([...likedProfiles, profile.id]);
      if (Math.random() > 0.5) {
        setMatchedProfile(profile);
        setShowMatchModal(true);
      }
    });
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

        {/* 증상 공감 탭 */}
        {selectedTab === 'empathy' && (
          <TodaySymptomsWidget defaultExpanded />
        )}

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
                <a
                  key={room.id}
                  href={room.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all hover:shadow-sm ${room.color}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{room.emoji}</span>
                    <span className="text-sm font-medium">{room.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-70">{room.members}명</span>
                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}

              <div className="pt-3 border-t border-hlk-border mt-3">
                <p className="text-center text-[11px] text-hlk-text-tertiary">
                  카톡 닉네임으로 편하게 참여하세요
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 친구 찾기 탭 */}
        {selectedTab === 'match' && (
          <MatchSection
            profiles={DEMO_PROFILES}
            likedProfiles={likedProfiles}
            onLike={handleLike}
          />
        )}
      </main>

      {/* Login Prompt Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-hlk-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-hlk-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-hlk-text mb-2">함께하기에 참여하세요</h2>
            <p className="text-sm text-hlk-text-secondary mb-6">
              친구 찾기와 매칭은 회원만 이용할 수 있어요.<br />
              무료 가입하고 비슷한 친구를 만나보세요!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 py-3 border border-hlk-border rounded-xl text-hlk-text-secondary hover:bg-hlk-bg transition-colors"
              >
                둘러볼게요
              </button>
              <Link
                href="/signup"
                className="flex-1 py-3 bg-hlk-primary text-white font-medium rounded-xl hover:bg-hlk-primary-dark transition-colors text-center"
              >
                로그인하기
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Match Modal — 매칭 성공 + 1:1 카톡 대화 */}
      {showMatchModal && matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMatchModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm mx-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hlk-primary to-hlk-accent flex items-center justify-center mx-auto mb-4 animate-[popIn_0.5s_ease-out]">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-hlk-text mb-2">매치됐어요!</h2>
            <p className="text-hlk-text-secondary mb-4">
              <span className="font-semibold text-hlk-primary">{matchedProfile.anonymous_name}</span>님도
              회원님에게 관심을 보였어요!
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-hlk-primary">
                <Image
                  src={matchedProfile.image}
                  alt={matchedProfile.anonymous_name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="bg-hlk-bg rounded-xl p-4 mb-4">
              <p className="text-xs text-hlk-text-tertiary mb-2">공통 관심 증상</p>
              <div className="flex flex-wrap justify-center gap-2">
                {matchedProfile.main_symptoms.slice(0, 2).map((symptom, i) => (
                  <span key={i} className="px-3 py-1 bg-hlk-primary-light text-hlk-primary rounded-full text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            {/* 1:1 카카오톡 대화 연결 */}
            <a
              href="#kakao-1on1-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#FEE500] text-[#3C1E1E] text-sm font-bold rounded-xl hover:bg-[#FDD835] transition-colors mb-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.62 0 0-.02.16.08.22.1.06.22.01.22.01.29-.04 3.37-2.2 3.9-2.57.69.1 1.4.15 2.13.15 5.52 0 10-3.58 10-7.94S17.52 3 12 3z" />
              </svg>
              카카오톡으로 1:1 대화하기
            </a>

            <button
              onClick={() => setShowMatchModal(false)}
              className="w-full py-3 border border-hlk-border rounded-xl text-hlk-text-secondary hover:bg-hlk-bg transition-colors"
            >
              나중에
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Match Section Component
function MatchSection({
  profiles,
  likedProfiles,
  onLike,
}: {
  profiles: Profile[];
  likedProfiles: string[];
  onLike: (profile: Profile) => void;
}) {
  return (
    <div>
      {/* 소개 + 3축 매칭 설명 */}
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold text-hlk-text mb-1">나를 이해하는 친구 찾기</h2>
        <p className="text-sm text-hlk-text-secondary">증상 + 상황이 비슷한 여성들과 연결돼요</p>
      </div>

      <div className="bg-gradient-to-r from-hlk-accent-light to-hlk-primary-light rounded-xl p-3.5 mb-5">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-xs text-hlk-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-hlk-primary" />
            증상 클러스터
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-xs text-hlk-accent font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-hlk-accent" />
            생활 상황
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-xs text-hlk-secondary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-hlk-secondary" />
            관심사
          </span>
        </div>
      </div>

      {/* 프로필 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl overflow-hidden border border-hlk-border hover:shadow-md transition-all"
          >
            <div className="relative aspect-square">
              <Image
                src={profile.image}
                alt={profile.anonymous_name}
                fill
                className="object-cover"
              />
              {profile.online && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
              <div className="absolute top-2 left-2 bg-hlk-primary px-2 py-0.5 rounded-full">
                <span className="text-xs font-bold text-white">{profile.match_percent}%</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-hlk-text text-sm truncate">{profile.anonymous_name}</h3>
              <p className="text-xs text-hlk-text-tertiary">{profile.age_group}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs px-2 py-0.5 bg-hlk-accent-light text-hlk-accent rounded-full">
                  {profile.situation}
                </span>
                <span className="text-xs text-hlk-text-tertiary">{profile.stage}</span>
              </div>
              <p className="text-xs text-hlk-primary mt-2 line-clamp-1">
                {profile.match_reason}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onLike(profile)}
                  disabled={likedProfiles.includes(profile.id)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    likedProfiles.includes(profile.id)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-hlk-primary text-white hover:bg-hlk-primary-dark'
                  }`}
                >
                  {likedProfiles.includes(profile.id) ? '좋아요!' : '좋아요'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

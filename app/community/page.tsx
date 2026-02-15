'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  CATEGORIES,
  TABS,
  DEMO_POSTS,
  formatTimeAgo,
  generateAnonymousName,
  type Post,
  type CategoryId,
  type TabId,
} from '@/lib/communityConstants';
import { PollSection } from '@/components/community/PollSection';

// Match 데모 프로필 데이터
const DEMO_PROFILES = [
  {
    id: '1',
    anonymous_name: '따뜻한 햇살',
    age_group: '40대 초반',
    stage: '갱년기 전기',
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
    stage: '갱년기',
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
    stage: '갱년기 후기',
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
    stage: '갱년기',
    situation: '1인가구',
    main_symptoms: ['열감', '불안', '피부건조'],
    interests: ['필라테스', '카페투어', '영화'],
    bio: '혼자 고민하다가 ALMA를 알게 됐어요. 솔직하게 이야기 나눌 수 있는 친구를 찾아요.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    match_percent: 85,
    online: true,
    match_reason: '같은 증상 2개 · 같은 상황',
  },
  {
    id: '5',
    anonymous_name: '고운 꽃잎',
    age_group: '40대 초반',
    stage: '갱년기 전기',
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
    stage: '갱년기 후기',
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

export default function CommunityPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-secondary">로딩 중...</div>
      </div>
    }>
      <CommunityContent />
    </Suspense>
  );
}

function CommunityContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'match' ? 'match' : 'polls';

  const [posts, setPosts] = useState<Post[]>(DEMO_POSTS);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<TabId | 'polls' | 'match'>(initialTab);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);

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
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('is_hidden', false)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(50);

      if (data && data.length > 0) {
        setPosts(data);
      }
    }
    // 게스트도 데모 데이터로 볼 수 있도록 user 없어도 로딩 완료
    setLoading(false);
  };

  // 게스트 액션 가드: 로그인 필요 시 모달 표시
  const requireAuth = (action: () => void) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    action();
  };

  // Match 핸들러
  const handleLike = (profile: Profile) => {
    requireAuth(() => {
      setLikedProfiles([...likedProfiles, profile.id]);
      if (Math.random() > 0.5) {
        setMatchedProfile(profile);
        setShowMatchModal(true);
      }
    });
  };

  // 선택된 탭에 해당하는 카테고리들 가져오기
  const selectedTabData = TABS.find(tab => tab.id === selectedTab);
  const filteredPosts = selectedTab === 'polls' || selectedTab === 'match'
    ? []
    : selectedTabData
      ? posts.filter(post => selectedTabData.categories.includes(post.category))
      : [];

  const pinnedPosts = filteredPosts.filter(post => post.is_pinned);
  const regularPosts = filteredPosts.filter(post => !post.is_pinned);

  const getCategoryInfo = (categoryId: CategoryId) => {
    return CATEGORIES.find(c => c.id === categoryId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-secondary">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alma-bg">
      {/* Secret Talks 고정 헤더 — 라이브 인디케이터 */}
      <div className="sticky top-16 z-40">
        <div className="bg-gradient-to-r from-alma-secondary to-alma-secondary-dark">
          <div className="max-w-2xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide">Secret Talks</p>
                <p className="text-[10px] text-white/60">100% 익명 · 안전한 공간</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* 타이핑 인디케이터 — 누군가 글 쓰는 중 */}
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/10 rounded-full">
                <div className="flex gap-0.5">
                  <span className="typing-dot w-1 h-1 rounded-full bg-white/80" />
                  <span className="typing-dot w-1 h-1 rounded-full bg-white/80" />
                  <span className="typing-dot w-1 h-1 rounded-full bg-white/80" />
                </div>
                <span className="text-[10px] text-white/60 ml-1">작성 중</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold animate-live-pulse">{posts.length}+</p>
                <p className="text-[10px] text-white/60">대화 중</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Filter - 4개 탭 */}
        <div className="bg-white border-b border-alma-border">
          <div className="max-w-2xl mx-auto px-6 md:px-8 py-3">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab('polls')}
                className={`flex-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTab === 'polls'
                    ? 'bg-alma-primary text-white'
                    : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                }`}
              >
                투표
              </button>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTab === tab.id
                      ? 'bg-alma-primary text-white'
                      : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => setSelectedTab('match')}
                className={`flex-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTab === 'match'
                    ? 'bg-alma-primary text-white'
                    : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                }`}
              >
                친구 찾기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <main className="max-w-2xl mx-auto px-6 md:px-8 py-6">
        {/* 라이브 활동 인디케이터 — 게시글/투표 탭에서만 */}
        {selectedTab !== 'match' && (
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-alma-text-tertiary">
                지금 <strong className="text-alma-text-secondary">12명</strong>이 읽고 있어요
              </span>
            </div>
            <span className="text-xs text-alma-text-tertiary">
              오늘 새 글 <strong className="text-alma-accent">3</strong>개
            </span>
          </div>
        )}

        {/* 오늘의 대화 주제 — 대화 시작 유도 (투표/게시글 탭) */}
        {selectedTab !== 'match' && (
          <div className="bg-gradient-to-r from-alma-primary-light to-alma-accent-light rounded-2xl p-5 mb-6 border border-alma-primary/10">
            <p className="text-[11px] font-semibold text-alma-primary uppercase tracking-wider mb-2">
              오늘의 대화 주제
            </p>
            <p className="text-base font-bold text-alma-text mb-3">
              &ldquo;갱년기 증상이 시작된 걸 처음 알아챈 순간은?&rdquo;
            </p>
            <button
              onClick={() => requireAuth(() => setShowWriteModal(true))}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-alma-primary text-sm font-semibold rounded-full border border-alma-primary/20 hover:bg-alma-primary hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              나의 이야기 쓰기
            </button>
          </div>
        )}

        {/* 오늘의 투표 탭 */}
        {selectedTab === 'polls' && (
          <div className="mb-6">
            <PollSection limit={5} defaultExpanded />
          </div>
        )}

        {/* 친구 찾기 탭 (기존 /match 통합) */}
        {selectedTab === 'match' && (
          <MatchSection
            profiles={DEMO_PROFILES}
            likedProfiles={likedProfiles}
            onLike={handleLike}
            onShowMatchModal={(profile) => {
              setMatchedProfile(profile);
              setShowMatchModal(true);
            }}
          />
        )}

        {/* 게시글 목록 - 투표/매치 탭이 아닐 때만 */}
        {selectedTab !== 'polls' && selectedTab !== 'match' && (
          <>
            {/* Pinned Posts */}
            {pinnedPosts.length > 0 && (
              <div className="mb-4">
                {pinnedPosts.map(post => (
                  <PostCard key={post.id} post={post} getCategoryInfo={getCategoryInfo} isPinned />
                ))}
              </div>
            )}

            {/* Regular Posts */}
            <div className="space-y-3">
              {regularPosts.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-alma-border text-center">
                  <p className="text-alma-text-secondary">아직 게시글이 없어요.</p>
                  <button
                    onClick={() => requireAuth(() => setShowWriteModal(true))}
                    className="mt-4 px-6 py-2 bg-alma-primary text-white rounded-full text-sm font-medium"
                  >
                    첫 글 작성하기
                  </button>
                </div>
              ) : (
                regularPosts.map(post => (
                  <PostCard key={post.id} post={post} getCategoryInfo={getCategoryInfo} />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Write Modal */}
      {showWriteModal && (
        <WriteModal
          onClose={() => setShowWriteModal(false)}
          onSubmit={async (newPost) => {
            if (!isSupabaseConfigured) {
              const demoPost: Post = {
                id: `demo-${Date.now()}`,
                user_id: 'demo',
                anonymous_name: generateAnonymousName(),
                title: null,
                content: newPost.content,
                category: newPost.category,
                tags: newPost.tags,
                like_count: 0,
                comment_count: 0,
                view_count: 0,
                is_pinned: false,
                is_hidden: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_mine: true,
              };
              setPosts([demoPost, ...posts]);
              setShowWriteModal(false);
              return;
            }

            if (user) {
              const { data } = await supabase
                .from('posts')
                .insert({
                  user_id: user.id,
                  anonymous_name: generateAnonymousName(),
                  content: newPost.content,
                  category: newPost.category,
                  tags: newPost.tags,
                })
                .select()
                .single();

              if (data) {
                setPosts([{ ...data, is_mine: true }, ...posts]);
              }
            }
            setShowWriteModal(false);
          }}
        />
      )}

      {/* Login Prompt Modal (게스트용) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-alma-secondary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-alma-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-alma-text mb-2">함께 이야기할 준비 됐나요?</h2>
            <p className="text-sm text-alma-text-secondary mb-6">
              글쓰기, 댓글, 좋아요는 회원만 이용할 수 있어요.<br />
              무료 가입하고 솔직한 대화에 참여해요!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 py-3 border border-alma-border rounded-xl text-alma-text-secondary hover:bg-alma-bg transition-colors"
              >
                둘러볼게요
              </button>
              <Link
                href="/signup"
                className="flex-1 py-3 bg-alma-primary text-white font-medium rounded-xl hover:bg-alma-primary-dark transition-colors text-center"
              >
                로그인하기
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Match Modal */}
      {showMatchModal && matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMatchModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm mx-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-alma-primary to-alma-accent flex items-center justify-center mx-auto mb-4 animate-[popIn_0.5s_ease-out]">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-alma-text mb-2">매치됐어요!</h2>
            <p className="text-alma-text-secondary mb-6">
              <span className="font-semibold text-alma-primary">{matchedProfile.anonymous_name}</span>님도
              회원님에게 관심을 보였어요!
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-alma-primary">
                <Image
                  src={matchedProfile.image}
                  alt={matchedProfile.anonymous_name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="bg-alma-bg rounded-xl p-4 mb-6">
              <p className="text-xs text-alma-text-tertiary mb-2">공통 관심 증상</p>
              <div className="flex flex-wrap justify-center gap-2">
                {matchedProfile.main_symptoms.slice(0, 2).map((symptom, i) => (
                  <span key={i} className="px-3 py-1 bg-alma-primary-light text-alma-primary rounded-full text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowMatchModal(false)}
                className="flex-1 py-3 border border-alma-border rounded-xl text-alma-text-secondary hover:bg-alma-bg transition-colors"
              >
                나중에
              </button>
              <button
                onClick={() => {
                  setShowMatchModal(false);
                  setSelectedTab('daily-support');
                }}
                className="flex-1 py-3 bg-alma-primary text-white font-medium rounded-xl hover:bg-alma-primary-dark transition-colors"
              >
                대화하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Write Button (Mobile) - 게스트일 때 로그인 유도 */}
      {selectedTab !== 'match' && (
        <button
          onClick={() => requireAuth(() => setShowWriteModal(true))}
          className="fixed bottom-6 right-6 w-14 h-14 bg-alma-primary text-white rounded-full shadow-lg hover:bg-alma-primary-dark transition-all flex items-center justify-center md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Match Section Component (기존 /match 페이지 내용을 탭으로)
function MatchSection({
  profiles,
  likedProfiles,
  onLike,
}: {
  profiles: Profile[];
  likedProfiles: string[];
  onLike: (profile: Profile) => void;
  onShowMatchModal: (profile: Profile) => void;
}) {
  return (
    <div>
      {/* 매칭 소개 */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-alma-text mb-1">
          나를 이해하는 친구 찾기
        </h2>
        <p className="text-sm text-alma-text-secondary mb-3">
          증상 + 상황이 비슷한 여성들과 연결돼요
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-alma-accent-light rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alma-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-alma-accent" />
          </span>
          <span className="text-sm text-alma-accent font-semibold">평균 응답 시간 47분</span>
        </div>
      </div>

      {/* 3축 매칭 설명 */}
      <div className="bg-gradient-to-r from-alma-accent-light to-alma-primary-light rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-alma-primary flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-alma-text">3축 매칭 시스템</p>
            <p className="text-xs text-alma-text-secondary">
              체크인 데이터 기반 증상 + 상황 + 관심사 매칭
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-xs text-alma-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-alma-primary" />
            증상 클러스터
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-xs text-alma-accent font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-alma-accent" />
            생활 상황
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-xs text-alma-secondary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-alma-secondary" />
            관심사
          </span>
        </div>
      </div>

      {/* 프로필 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-2xl overflow-hidden border border-alma-border hover:shadow-lg transition-all"
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
              <div className="absolute top-2 left-2 bg-alma-primary px-2 py-0.5 rounded-full">
                <span className="text-xs font-bold text-white">{profile.match_percent}%</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-alma-text text-sm truncate">{profile.anonymous_name}</h3>
              <p className="text-xs text-alma-text-tertiary">{profile.age_group}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs px-2 py-0.5 bg-alma-accent-light text-alma-accent rounded-full">
                  {profile.situation}
                </span>
                <span className="text-xs text-alma-text-tertiary">{profile.stage}</span>
              </div>
              <p className="text-xs text-alma-primary mt-2 line-clamp-1">
                ✓ {profile.match_reason}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onLike(profile)}
                  disabled={likedProfiles.includes(profile.id)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    likedProfiles.includes(profile.id)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-alma-primary text-white hover:bg-alma-primary-dark'
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

// Post Card Component
function PostCard({
  post,
  getCategoryInfo,
  isPinned = false,
}: {
  post: Post;
  getCategoryInfo: (id: CategoryId) => typeof CATEGORIES[number] | undefined;
  isPinned?: boolean;
}) {
  const category = getCategoryInfo(post.category);

  return (
    <Link href={`/community/${post.id}`}>
      <div className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md ${
        isPinned ? 'border-alma-primary/30 bg-alma-primary-light/30' : 'border-alma-border'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {isPinned && (
              <span className="text-xs bg-alma-primary text-white px-2 py-0.5 rounded-full">
                고정
              </span>
            )}
            {category && (
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${category.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${category.dot}`} />
                {category.label}
              </span>
            )}
          </div>
          <span className="text-xs text-alma-text-tertiary">
            {formatTimeAgo(post.created_at)}
          </span>
        </div>

        {/* Content */}
        <p className="text-[15px] text-alma-text leading-relaxed line-clamp-3">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs text-alma-primary bg-alma-primary-light px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-alma-border">
          <span className="text-sm text-alma-text-secondary">{post.anonymous_name}</span>
          <div className="flex items-center gap-4 text-sm text-alma-text-tertiary">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.like_count}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.comment_count}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.view_count}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Write Modal Component
function WriteModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (post: { content: string; category: CategoryId; tags: string[] }) => void;
}) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryId>('daily');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({ content: content.trim(), category, tags });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-alma-border flex items-center justify-between">
          <button onClick={onClose} className="text-alma-text-tertiary">
            취소
          </button>
          <h2 className="font-bold text-alma-text">글쓰기</h2>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className={`font-bold ${
              content.trim()
                ? 'text-alma-primary'
                : 'text-alma-text-tertiary'
            }`}
          >
            완료
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-60px)]">
          {/* Category Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium text-alma-text mb-2 block">
              카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                    category === cat.id
                      ? 'bg-alma-primary text-white'
                      : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${category === cat.id ? 'bg-white/60' : cat.dot}`} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-4">
            <label className="text-sm font-medium text-alma-text mb-2 block">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="나누고 싶은 이야기를 편하게 적어주세요. 익명으로 공유됩니다."
              className="w-full h-40 p-4 border border-alma-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-alma-primary/20 focus:border-alma-primary text-alma-text placeholder:text-alma-text-tertiary"
              maxLength={1000}
            />
            <p className="text-right text-xs text-alma-text-tertiary mt-1">
              {content.length}/1000
            </p>
          </div>

          {/* Tags Input */}
          <div className="mb-4">
            <label className="text-sm font-medium text-alma-text mb-2 block">
              태그 (선택, 최대 5개)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="태그 입력 후 Enter"
                className="flex-1 px-4 py-2 border border-alma-border rounded-xl focus:outline-none focus:ring-2 focus:ring-alma-primary/20 focus:border-alma-primary text-alma-text placeholder:text-alma-text-tertiary"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-alma-bg text-alma-text-secondary rounded-xl hover:bg-alma-border transition-colors"
              >
                추가
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-alma-primary-light text-alma-primary rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="w-4 h-4 rounded-full hover:bg-alma-primary/20 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Flo 스타일 Privacy Notice */}
          <div className="bg-gradient-to-r from-alma-secondary-light to-alma-primary-light rounded-xl p-4 border border-alma-secondary/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-alma-secondary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-alma-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-alma-text">Secret Talks 익명 보장</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-alma-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-alma-text-secondary">
                  자동 생성 닉네임 &quot;따뜻한 햇살&quot; 등으로 활동
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-alma-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-alma-text-secondary">
                  실명, 연락처, 프로필 사진 절대 공개 안 됨
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-alma-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-alma-text-secondary">
                  말하기 어려웠던 이야기, 여기서 편하게 나눠요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

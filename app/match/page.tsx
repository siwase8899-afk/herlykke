'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Peanut 인사이트: 증상 + 상황 기반 매칭
// "Find women who get it" — 같은 상황을 이해하는 친구 찾기

// 상황 태그 (Peanut 스타일)
const SITUATION_TAGS = [
  { id: 'working', label: '직장인', icon: '💼' },
  { id: 'single', label: '1인가구', icon: '🏠' },
  { id: 'empty_nest', label: '자녀 독립 후', icon: '🕊️' },
  { id: 'job_seeking', label: '재취업 준비', icon: '📝' },
  { id: 'caregiver', label: '부모님 돌봄', icon: '🤲' },
  { id: 'entrepreneur', label: '자영업/창업', icon: '🏪' },
];

// 데모 프로필 데이터 (Peanut 인사이트: 상황 필드 추가)
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
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
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
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
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
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face',
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
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
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
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
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
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
    match_percent: 75,
    online: true,
    match_reason: '비슷한 관심사 · 긍정 에너지',
  },
];

type Profile = typeof DEMO_PROFILES[number];

export default function MatchPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>(DEMO_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  const currentProfile = profiles[currentIndex];

  const handleLike = (profile: Profile) => {
    setLikedProfiles([...likedProfiles, profile.id]);

    // 50% 확률로 매치 시뮬레이션 (데모용)
    if (Math.random() > 0.5) {
      setMatchedProfile(profile);
      setShowMatchModal(true);
    }

    if (viewMode === 'cards') {
      goToNext();
    }
  };

  const handlePass = () => {
    goToNext();
  };

  const goToNext = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const getSymptomMatchCount = (symptoms: string[]) => {
    // 데모: 내 증상과 비교 (실제로는 사용자 데이터 기반)
    const mySymptoms = ['열감', '수면장애', '피로감'];
    return symptoms.filter(s => mySymptoms.includes(s)).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-secondary">친구를 찾고 있어요...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alma-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-alma-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-alma-text-tertiary hover:text-alma-text transition-colors">
            ← 대시보드
          </Link>
          <h1 className="font-bold text-alma-text">친구 찾기</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'cards' ? 'bg-alma-primary text-white' : 'text-alma-text-tertiary'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-alma-primary text-white' : 'text-alma-text-tertiary'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Peanut 스타일: 공감 헤드라인 */}
      <div className="max-w-2xl mx-auto px-5 pt-6 pb-2">
        <div className="text-center">
          <h2 className="text-xl font-bold text-alma-text mb-1">
            나를 이해하는 친구 찾기
          </h2>
          <p className="text-sm text-alma-text-secondary">
            증상 + 상황이 비슷한 여성들과 연결돼요
          </p>
        </div>
      </div>

      {/* Info Banner — Peanut 스타일 */}
      <div className="max-w-2xl mx-auto px-5 py-4">
        <div className="bg-gradient-to-r from-alma-accent-light to-alma-primary-light rounded-2xl p-4">
          {/* 매칭 기준 설명 */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-alma-primary flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-alma-text">AI가 분석한 맞춤 매칭</p>
              <p className="text-xs text-alma-text-secondary">
                체크인 데이터 기반 증상 + 상황 + 관심사 매칭
              </p>
            </div>
          </div>

          {/* 매칭 기준 태그 */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/80 rounded-full text-xs text-alma-primary font-medium">
              🩺 증상 유사도
            </span>
            <span className="px-3 py-1 bg-white/80 rounded-full text-xs text-alma-accent font-medium">
              💼 생활 상황
            </span>
            <span className="px-3 py-1 bg-white/80 rounded-full text-xs text-alma-secondary font-medium">
              ⭐ 관심사
            </span>
            <span className="px-3 py-1 bg-white/80 rounded-full text-xs text-alma-text-secondary font-medium">
              🔒 100% 익명
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-5 pb-8">
        {viewMode === 'cards' ? (
          /* Card View - Badoo Style */
          <div className="relative">
            {currentProfile && (
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-alma-border">
                {/* Profile Image */}
                <div className="relative aspect-[3/4] max-h-[500px]">
                  <Image
                    src={currentProfile.image}
                    alt={currentProfile.anonymous_name}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Online Indicator */}
                  {currentProfile.online && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-alma-text">온라인</span>
                    </div>
                  )}

                  {/* Match Percentage */}
                  <div className="absolute top-4 left-4 bg-alma-primary px-3 py-1.5 rounded-full">
                    <span className="text-sm font-bold text-white">{currentProfile.match_percent}% 매치</span>
                  </div>

                  {/* Profile Info — Peanut 스타일 */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-1">{currentProfile.anonymous_name}</h2>
                    <p className="text-white/80 text-sm mb-2">
                      {currentProfile.age_group} · {currentProfile.stage}
                    </p>

                    {/* 상황 태그 (Peanut 인사이트) */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-alma-accent/90 rounded-full text-xs font-medium mb-3">
                      <span>💼</span>
                      <span>{currentProfile.situation}</span>
                    </div>

                    {/* Symptoms */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {currentProfile.main_symptoms.map((symptom, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-white/90 leading-relaxed mb-2">
                      {currentProfile.bio}
                    </p>

                    {/* 매칭 이유 (Peanut 인사이트: "Find women who get it") */}
                    <div className="flex items-center gap-1.5 text-alma-accent text-xs">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{currentProfile.match_reason}</span>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="p-5 border-t border-alma-border">
                  <p className="text-xs text-alma-text-tertiary mb-2">관심사</p>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-alma-bg text-alma-text-secondary rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 pt-0 flex justify-center gap-6">
                  <button
                    onClick={handlePass}
                    className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors group"
                  >
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleLike(currentProfile)}
                    className="w-16 h-16 rounded-full bg-alma-primary flex items-center justify-center hover:bg-alma-primary-dark transition-colors shadow-lg shadow-alma-primary/30"
                  >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="w-16 h-16 rounded-full bg-alma-accent-light flex items-center justify-center hover:bg-alma-accent/20 transition-colors group">
                    <svg className="w-8 h-8 text-alma-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="mt-4 text-center text-sm text-alma-text-tertiary">
              {currentIndex + 1} / {profiles.length}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-2 gap-4">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl overflow-hidden border border-alma-border hover:shadow-lg transition-all group"
              >
                {/* Image */}
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

                {/* Info — Peanut 스타일 */}
                <div className="p-3">
                  <h3 className="font-semibold text-alma-text text-sm truncate">{profile.anonymous_name}</h3>
                  <p className="text-xs text-alma-text-tertiary">{profile.age_group}</p>

                  {/* 상황 + 단계 */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs px-2 py-0.5 bg-alma-accent-light text-alma-accent rounded-full">
                      {profile.situation}
                    </span>
                    <span className="text-xs text-alma-text-tertiary">{profile.stage}</span>
                  </div>

                  {/* 매칭 이유 */}
                  <p className="text-xs text-alma-primary mt-2 line-clamp-1">
                    ✓ {profile.match_reason}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleLike(profile)}
                      disabled={likedProfiles.includes(profile.id)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                        likedProfiles.includes(profile.id)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-alma-primary text-white hover:bg-alma-primary-dark'
                      }`}
                    >
                      {likedProfiles.includes(profile.id) ? '좋아요!' : '좋아요'}
                    </button>
                    <button className="px-3 py-2 bg-alma-bg rounded-lg hover:bg-alma-border transition-colors">
                      <svg className="w-4 h-4 text-alma-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Match Modal */}
      {showMatchModal && matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMatchModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm mx-4 text-center animate-bounce-in">
            {/* Celebration */}
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-alma-text mb-2">매치됐어요!</h2>
            <p className="text-alma-text-secondary mb-6">
              <span className="font-semibold text-alma-primary">{matchedProfile.anonymous_name}</span>님도
              회원님에게 관심을 보였어요!
            </p>

            {/* Profile Preview */}
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

            {/* Shared Symptoms */}
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

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowMatchModal(false)}
                className="flex-1 py-3 border border-alma-border rounded-xl text-alma-text-secondary hover:bg-alma-bg transition-colors"
              >
                나중에
              </button>
              <Link
                href="/community"
                className="flex-1 py-3 bg-alma-primary text-white font-medium rounded-xl hover:bg-alma-primary-dark transition-colors"
              >
                대화하기
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

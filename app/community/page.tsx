'use client';

import { useEffect, useState } from 'react';
import { useCheckinStore } from '../../stores/checkinStore';
import { classifySymptomCluster } from '../../lib/stageClassifier';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

const SAMPLE_POSTS = [
  {
    nickname: '봄날의산책',
    badge: '🌿',
    stage: '갱년기 전기',
    content: '요즘 밤에 열감이 올라와서 이불을 뻈다 덮었다 반복해요. 남편은 모르겠대요.. 같은 분 계세요?',
    reactions: { empathy: 12, me_too: 8, cheer: 5 },
  },
  {
    nickname: '차한잔',
    badge: '🌺',
    stage: '갱년기',
    content: '마그네슘 먹기 시작한 지 3주째인데 확실히 수면이 좀 나아진 것 같아요. 혹시 드시는 분 있으세요?',
    reactions: { empathy: 6, me_too: 15, thanks: 9 },
  },
  {
    nickname: '하늘빛',
    badge: '🌿',
    stage: '갱년기 전기',
    content: '어제 회의 중에 갑자기 눈물이 나올 뻔했어요. 다행히 참았는데... 이게 갱년기 때문인 건지, 제가 나약한 건지 모르겠어요.',
    reactions: { empathy: 23, hug: 18, cheer: 11 },
  },
];

const REACTION_EMOJI: Record<string, string> = {
  empathy: '😢',
  hug: '🫶',
  me_too: '🙋',
  cheer: '💪',
  thanks: '🙏',
};

const GROUPS = [
  { id: 'hot_flash', emoji: '🔥', name: '열감/수면 그룹', members: 24, cluster: 'vasomotor' },
  { id: 'emotional', emoji: '💭', name: '마음 그룹', members: 18, cluster: 'emotional_dominant' },
  { id: 'general', emoji: '🌈', name: '종합 그룹', members: 31, cluster: 'mixed' },
];

export default function CommunityPage() {
  const store = useCheckinStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const cluster = hydrated && store.physicalSymptoms.length > 0
    ? classifySymptomCluster(store.physicalSymptoms, store.emotionalSymptoms)
    : 'mixed';

  return (
    <div className="min-h-screen bg-alma-bg">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">👩‍👩‍👧‍👧</div>
          <h1 className="text-2xl font-bold text-alma-text mb-2">
            ALMA 커뮤니티
          </h1>
          <p className="text-sm text-alma-text-secondary">
            비슷한 경험을 하는 여성들과 익명으로 이야기해요
          </p>
        </div>

        {/* 커뮤니티 미리보기 */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-alma-text mb-4">
            이런 대화가 오가고 있어요
          </h2>
          <div className="space-y-3">
            {SAMPLE_POSTS.map((post, i) => (
              <div key={i} className="bg-alma-surface rounded-2xl border border-alma-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span>{post.badge}</span>
                  <span className="text-sm font-semibold text-alma-text">{post.nickname}</span>
                  <span className="text-xs text-alma-primary bg-alma-primary-light px-2 py-0.5 rounded-full">
                    {post.stage}
                  </span>
                </div>
                <p className="text-[15px] text-alma-text leading-relaxed mb-3">
                  {post.content}
                </p>
                <div className="flex gap-3">
                  {Object.entries(post.reactions).map(([type, count]) => (
                    <span key={type} className="text-xs text-alma-text-secondary flex items-center gap-1">
                      {REACTION_EMOJI[type]} {count}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 그룹 선택 */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-alma-text mb-4">
            카카오톡 그룹 참여하기
          </h2>
          <div className="space-y-3">
            {GROUPS.map((group) => (
              <div
                key={group.id}
                className={`
                  bg-alma-surface rounded-2xl border p-4 flex items-center justify-between
                  ${hydrated && group.cluster === cluster
                    ? 'border-alma-primary border-2'
                    : 'border-alma-border'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-alma-text">
                      {group.name}
                      {hydrated && group.cluster === cluster && (
                        <span className="ml-2 text-xs text-alma-primary font-medium">추천</span>
                      )}
                    </h3>
                    <p className="text-xs text-alma-text-tertiary">{group.members}명 참여 중</p>
                  </div>
                </div>
                <button className="text-sm font-semibold text-alma-primary bg-alma-primary-light px-4 py-2 rounded-xl hover:bg-alma-primary hover:text-white transition-colors cursor-pointer">
                  참여
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-alma-text-tertiary text-center mt-3">
            카카오톡 오픈채팅으로 연결됩니다
          </p>
        </div>

        {/* 커뮤니티 규칙 */}
        <div className="bg-alma-surface rounded-2xl border border-alma-border p-5 mb-8">
          <h3 className="text-sm font-bold text-alma-text mb-3">커뮤니티 규칙</h3>
          <ul className="space-y-2 text-sm text-alma-text-secondary">
            <li className="flex gap-2"><span>🤝</span> 서로 존중하고 공감하며 대화해요</li>
            <li className="flex gap-2"><span>🔒</span> 개인 정보를 공유하지 않아요</li>
            <li className="flex gap-2"><span>💊</span> 의학적 조언 대신 경험을 나눠요</li>
            <li className="flex gap-2"><span>🚫</span> 광고, 홍보는 금지예요</li>
          </ul>
        </div>

        <Link href="/" className="block">
          <Button variant="ghost" size="md" className="w-full">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}

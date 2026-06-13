'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import {
  loadPosts,
  submitPost,
  loadLikedPostIds,
  togglePostLike,
  loadProfileFromServer,
  submitReport,
  type CommunityPost,
} from '@/lib/supabaseSync';
import { checkContent } from '@/lib/moderation';
import { EmojiIcon } from '@/lib/iconMap';

// 게스트/미리보기용 데모
const DEMO_POSTS: CommunityPost[] = [
  { id: 'demo-1', anonymousName: '허브덕후', content: '발레리안 루트 차 진짜 효과 있는 분 계세요? 저는 2주 됐는데 조금씩 나아지는 것 같아서요...', category: 'question', tags: [], likeCount: 12, commentCount: 7, createdAt: '', userId: null },
  { id: 'demo-2', anonymousName: '요가메이트45', content: '자기 전 다리 올리기 자세 해보신 분? 처음엔 이상했는데 이게 진짜 잠이 잘 와요. 10분만 해봐요!', category: 'tips', tags: [], likeCount: 31, commentCount: 15, createdAt: '', userId: null },
  { id: 'demo-3', anonymousName: '새벽3시단골', content: '남편이 왜 새벽에 자꾸 깨냐고 해서... 속상했는데 여기 오니까 다들 비슷하시더라고요. 저만이 아니었어요', category: 'support', tags: [], likeCount: 67, commentCount: 23, createdAt: '', userId: null },
];

const CATEGORIES = [
  { id: 'support', label: '고민' },
  { id: 'tips', label: '경험' },
  { id: 'question', label: '질문' },
];

const CATEGORY_LABEL: Record<string, string> = {
  support: '고민', tips: '경험', question: '질문', daily: '일상', symptoms: '증상',
};

function relativeTime(iso: string): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return '방금 전';
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  return `${Math.floor(hr / 24)}일 전`;
}

export function CommunityTalkTab() {
  const { user, isLoggedIn, isDemo } = useAuth();
  const isRealUser = isLoggedIn && !isDemo && !!user;

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('익명의 메이트');

  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [category, setCategory] = useState('support');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    const [serverPosts, liked] = await Promise.all([
      loadPosts(),
      user ? loadLikedPostIds(user.id) : Promise.resolve([]),
    ]);
    setPosts(serverPosts);
    setLikedIds(new Set(liked));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (isRealUser) {
      refresh();
      loadProfileFromServer(user!.id).then((p) => {
        if (p?.nickname) setNickname(p.nickname);
      });
    } else {
      setLoading(false);
    }
  }, [isRealUser, user, refresh]);

  const handleSubmit = async () => {
    const content = draft.trim();
    if (!content || !user) return;
    const mod = checkContent(content);
    if (!mod.ok) {
      setError(mod.reason || '내용을 확인해주세요.');
      return;
    }
    setSubmitting(true);
    setError('');
    const res = await submitPost(user.id, nickname, content, category);
    setSubmitting(false);
    if (res.success) {
      setDraft('');
      setModalOpen(false);
      refresh();
    } else {
      setError('저장에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleLike = async (post: CommunityPost) => {
    if (!user) return;
    const liked = likedIds.has(post.id);
    // 낙관적 업데이트
    setLikedIds((prev) => {
      const next = new Set(prev);
      liked ? next.delete(post.id) : next.add(post.id);
      return next;
    });
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, likeCount: p.likeCount + (liked ? -1 : 1) } : p))
    );
    await togglePostLike(user.id, post.id, liked);
  };

  const [reportedIds, setReportedIds] = useState<Set<string>>(new Set());
  const handleReport = async (post: CommunityPost) => {
    if (!user || reportedIds.has(post.id)) return;
    if (!confirm('이 글을 신고할까요? 운영자가 검토합니다.')) return;
    setReportedIds((prev) => new Set(prev).add(post.id));
    await submitReport(user.id, { postId: post.id });
  };

  // 게스트/미리보기: 데모 읽기 전용 + 로그인 유도
  if (!isRealUser) {
    return (
      <div className="animate-slow-fade-in">
        <Link
          href="/login"
          className="w-full flex items-center gap-3 card-glass rounded-2xl px-5 py-4 text-hlk-text-secondary text-sm mb-6 hover:border-hlk-primary/30 transition-colors"
        >
          <EmojiIcon emoji="✏️" size={18} />
          <span>로그인하고 수면 고민·경험을 나눠보세요</span>
        </Link>
        <DemoList />
        <p className="text-center text-xs text-hlk-text-tertiary mt-6">미리보기 — 로그인하면 실제로 글을 쓰고 공감할 수 있어요</p>
      </div>
    );
  }

  return (
    <div className="animate-slow-fade-in">
      <p className="text-[11px] text-hlk-text-tertiary leading-relaxed mb-3 px-1">
        <EmojiIcon emoji="💛" size={14} className="text-hlk-clay" /> 경험 공유는 환영해요. 의약품 복용을 단정적으로 권하는 의료 조언은 삼가주세요. 부적절한 글은 신고할 수 있어요.
      </p>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full flex items-center gap-3 card-glass rounded-2xl px-5 py-4 text-hlk-text-secondary text-sm mb-6 hover:border-hlk-primary/30 transition-colors"
      >
        <EmojiIcon emoji="✏️" size={18} />
        <span>수면 고민이나 경험을 나눠보세요...</span>
      </button>

      {loading ? (
        <p className="text-center text-sm text-hlk-text-tertiary py-10">불러오는 중...</p>
      ) : posts.length === 0 ? (
        <div className="card-glass rounded-2xl p-8 text-center">
          <div className="mb-3"><EmojiIcon emoji="🌙" size={28} className="text-hlk-primary" /></div>
          <p className="font-semibold text-hlk-text mb-1">아직 글이 없어요</p>
          <p className="text-sm text-hlk-text-secondary mb-5">첫 글의 주인공이 되어보세요. 같은 밤을 지나는 메이트들이 기다려요.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex px-5 py-2.5 bg-hlk-primary text-white text-sm font-semibold rounded-xl hover:bg-hlk-primary-dark transition-colors"
          >
            첫 글 쓰기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="card-glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-hlk-primary-light flex items-center justify-center"><EmojiIcon emoji="🌙" size={16} className="text-hlk-primary" /></div>
                <span className="text-sm font-medium text-hlk-text">{post.anonymousName}</span>
                <span className="text-xs text-hlk-text-tertiary bg-hlk-surface-warm px-2 py-0.5 rounded-full">
                  {CATEGORY_LABEL[post.category] || post.category}
                </span>
                <span className="text-xs text-hlk-text-tertiary ml-auto">{relativeTime(post.createdAt)}</span>
              </div>
              <p className="text-sm text-hlk-text leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-hlk-border/40">
                <button
                  onClick={() => handleLike(post)}
                  className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full transition-all ${
                    likedIds.has(post.id)
                      ? 'bg-hlk-primary-light text-hlk-primary font-semibold'
                      : 'text-hlk-text-secondary hover:bg-hlk-surface-warm'
                  }`}
                >
                  <EmojiIcon emoji="💜" size={14} /> 공감 {post.likeCount > 0 ? post.likeCount : ''}
                </button>
                <span className="text-xs text-hlk-text-tertiary"><EmojiIcon emoji="💬" size={14} /> {post.commentCount}</span>
                <button
                  onClick={() => handleReport(post)}
                  disabled={reportedIds.has(post.id)}
                  className="text-xs text-hlk-text-tertiary hover:text-hlk-text ml-auto disabled:opacity-50"
                >
                  {reportedIds.has(post.id) ? '신고됨' : '신고'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 글쓰기 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4" onClick={() => !submitting && setModalOpen(false)}>
          <div className="bg-hlk-surface rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-hlk-text">수면 이야기 나누기</h3>
              <button onClick={() => setModalOpen(false)} className="text-hlk-text-tertiary text-sm">닫기</button>
            </div>
            <div className="flex gap-2 mb-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    category === c.id ? 'bg-hlk-primary text-white' : 'bg-hlk-surface-warm text-hlk-text-secondary'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={1000}
              rows={5}
              autoFocus
              placeholder="익명으로 공유돼요. 같은 밤을 지나는 메이트들에게 편하게 이야기해보세요."
              className="w-full rounded-xl border border-hlk-border bg-hlk-bg p-3 text-sm text-hlk-text resize-none focus:outline-none focus:border-hlk-primary"
            />
            {error && <p className="text-xs text-hlk-error mt-2">{error}</p>}
            <p className="text-[11px] text-hlk-text-tertiary mt-2 leading-relaxed">
              ※ 경험 공유는 환영해요. 의약품 복용을 단정적으로 권하는 의료 조언은 삼가주세요.
            </p>
            <button
              onClick={handleSubmit}
              disabled={!draft.trim() || submitting}
              className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                draft.trim() && !submitting
                  ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark'
                  : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
              }`}
            >
              {submitting ? '올리는 중...' : '올리기'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DemoList() {
  return (
    <div className="space-y-4">
      {DEMO_POSTS.map((post) => (
        <div key={post.id} className="card-glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-hlk-primary-light flex items-center justify-center"><EmojiIcon emoji="🌙" size={16} className="text-hlk-primary" /></div>
            <span className="text-sm font-medium text-hlk-text">{post.anonymousName}</span>
            <span className="text-xs text-hlk-text-tertiary ml-auto">미리보기</span>
          </div>
          <p className="text-sm text-hlk-text leading-relaxed mb-4">{post.content}</p>
          <div className="flex items-center gap-3 pt-3 border-t border-hlk-border/40">
            <span className="inline-flex items-center gap-1.5 text-sm text-hlk-text-secondary">💜 공감 {post.likeCount}</span>
            <span className="text-xs text-hlk-text-tertiary ml-auto"><EmojiIcon emoji="💬" size={14} /> {post.commentCount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

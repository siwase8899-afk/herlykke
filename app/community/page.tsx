'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  CATEGORIES,
  DEMO_POSTS,
  formatTimeAgo,
  generateAnonymousName,
  type Post,
  type CategoryId,
} from '@/lib/communityConstants';

export default function CommunityPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(DEMO_POSTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);

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
      // Load real posts from Supabase
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
    setLoading(false);
  };

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

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
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-alma-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-alma-text-tertiary hover:text-alma-text transition-colors">
            ← 대시보드
          </Link>
          <h1 className="font-bold text-alma-text">커뮤니티</h1>
          <button
            onClick={() => setShowWriteModal(true)}
            className="text-alma-primary font-medium hover:underline"
          >
            글쓰기
          </button>
        </div>
      </header>

      {/* Category Filter */}
      <div className="sticky top-[57px] z-40 bg-white border-b border-alma-border">
        <div className="max-w-2xl mx-auto px-5 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-alma-primary text-white'
                  : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
              }`}
            >
              전체
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-alma-primary text-white'
                    : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts List */}
      <main className="max-w-2xl mx-auto px-5 py-4">
        {/* Flo 인사이트: Secret Chats 스타일 익명 커뮤니티 배너 */}
        <div className="bg-gradient-to-br from-alma-secondary to-alma-secondary-dark rounded-2xl p-5 mb-4 text-white">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              <div>
                <p className="text-sm font-bold">Secret Talks</p>
                <p className="text-xs text-white/70">익명 대화 공간</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-alma-accent">{posts.length}+</p>
              <p className="text-xs text-white/70">대화 중</p>
            </div>
          </div>

          {/* 핵심 메시지 */}
          <p className="text-sm text-white/90 mb-4 leading-relaxed">
            솔직하게 말하기 어려웠던 이야기들,
            <br />
            <span className="font-semibold text-alma-accent">여기서는 편하게 나눌 수 있어요.</span>
          </p>

          {/* 익명 보장 태그 */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              🔒 100% 익명
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              👤 자동 닉네임
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              🛡️ 안전한 공간
            </span>
          </div>
        </div>

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
                onClick={() => setShowWriteModal(true)}
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
      </main>

      {/* Write Modal */}
      {showWriteModal && (
        <WriteModal
          onClose={() => setShowWriteModal(false)}
          onSubmit={async (newPost) => {
            if (!isSupabaseConfigured) {
              // Demo mode - add locally
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

            // Real Supabase insert
            if (user) {
              const { data, error } = await supabase
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

      {/* Floating Write Button (Mobile) */}
      <button
        onClick={() => setShowWriteModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-alma-primary text-white rounded-full shadow-lg hover:bg-alma-primary-dark transition-all flex items-center justify-center md:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
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
              <span className={`text-xs px-2 py-0.5 rounded-full ${category.color}`}>
                {category.icon} {category.label}
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
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    category === cat.id
                      ? 'bg-alma-primary text-white'
                      : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                  }`}
                >
                  {cat.icon} {cat.label}
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
              <span className="text-lg">🔐</span>
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

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  CATEGORIES,
  DEMO_POSTS,
  DEMO_COMMENTS,
  formatTimeAgo,
  generateAnonymousName,
  type Post,
  type Comment,
  type CategoryId,
} from '@/lib/communityConstants';

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    loadData();
  }, [postId]);

  const loadData = async () => {
    if (!isSupabaseConfigured) {
      // Demo mode - 게스트/회원 모두 데모 데이터로 접근 가능
      setUser({ id: 'demo' });
      const demoPost = DEMO_POSTS.find(p => p.id === postId);
      if (demoPost) {
        setPost(demoPost);
        setComments(DEMO_COMMENTS.filter(c => c.post_id === postId));
      }
      setLoading(false);
      return;
    }

    // Supabase 모드: 게스트도 게시글 읽기 가능
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }

    // 게시글 로드 (로그인 여부와 관계없이)
    const { data: postData } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (postData) {
      setPost(postData);

      // Increment view count
      await supabase
        .from('posts')
        .update({ view_count: postData.view_count + 1 })
        .eq('id', postId);

      // 로그인된 경우만 좋아요 확인
      if (user) {
        const { data: likeData } = await supabase
          .from('likes')
          .select('id')
          .eq('user_id', user.id)
          .eq('post_id', postId)
          .single();

        setIsLiked(!!likeData);
      }

      // Load comments (모두 접근 가능)
      const { data: commentsData } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('is_hidden', false)
        .order('created_at', { ascending: true });

      if (commentsData) {
        setComments(commentsData);
      }
    }
    setLoading(false);
  };

  // 게스트 액션 가드
  const requireAuth = (action: () => void) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    action();
  };

  const handleLike = async () => {
    requireAuth(async () => {
      if (!user || !post) return;

      if (!isSupabaseConfigured) {
        setIsLiked(!isLiked);
        setPost({
          ...post,
          like_count: isLiked ? post.like_count - 1 : post.like_count + 1,
        });
        return;
      }

      if (isLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', post.id);

        setIsLiked(false);
        setPost({ ...post, like_count: post.like_count - 1 });
      } else {
        await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: post.id });

        setIsLiked(true);
        setPost({ ...post, like_count: post.like_count + 1 });
      }
    });
  };

  const handleSubmitComment = async () => {
    requireAuth(async () => {
      if (!user || !post || !newComment.trim()) return;

      const commentData = {
        post_id: post.id,
        user_id: user.id,
        parent_id: replyTo?.id || null,
        anonymous_name: generateAnonymousName(),
        content: newComment.trim(),
      };

      if (!isSupabaseConfigured) {
        const demoComment: Comment = {
          id: `demo-${Date.now()}`,
          ...commentData,
          like_count: 0,
          is_hidden: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_mine: true,
        };
        setComments([...comments, demoComment]);
        setPost({ ...post, comment_count: post.comment_count + 1 });
        setNewComment('');
        setReplyTo(null);
        return;
      }

      const { data } = await supabase
        .from('comments')
        .insert(commentData)
        .select()
        .single();

      if (data) {
        setComments([...comments, { ...data, is_mine: true }]);
        setPost({ ...post, comment_count: post.comment_count + 1 });
        setNewComment('');
        setReplyTo(null);
      }
    });
  };

  const getCategoryInfo = (categoryId: CategoryId) => {
    return CATEGORIES.find(c => c.id === categoryId);
  };

  // Group comments with replies
  const parentComments = comments.filter(c => !c.parent_id);
  const repliesMap = comments
    .filter(c => c.parent_id)
    .reduce((acc, reply) => {
      if (!acc[reply.parent_id!]) {
        acc[reply.parent_id!] = [];
      }
      acc[reply.parent_id!].push(reply);
      return acc;
    }, {} as Record<string, Comment[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-secondary">로딩 중...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-alma-bg flex flex-col items-center justify-center">
        <p className="text-alma-text-secondary mb-4">게시글을 찾을 수 없어요.</p>
        <Link
          href="/community"
          className="text-alma-primary hover:underline"
        >
          커뮤니티로 돌아가기
        </Link>
      </div>
    );
  }

  const category = getCategoryInfo(post.category);

  return (
    <div className="min-h-screen bg-alma-bg pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-alma-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-alma-text-tertiary hover:text-alma-text transition-colors"
          >
            ← 뒤로
          </button>
          <h1 className="font-bold text-alma-text">게시글</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Post Content */}
      <main className="max-w-2xl mx-auto px-5 py-6">
        <article className="bg-white rounded-2xl border border-alma-border overflow-hidden">
          {/* Post Header */}
          <div className="p-5 border-b border-alma-border">
            <div className="flex items-center justify-between mb-3">
              {category && (
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${category.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${category.dot}`} />
                  {category.label}
                </span>
              )}
              <span className="text-xs text-alma-text-tertiary">
                {formatTimeAgo(post.created_at)}
              </span>
            </div>
            <p className="text-sm text-alma-text-secondary">{post.anonymous_name}</p>
          </div>

          {/* Post Body */}
          <div className="p-5">
            <p className="text-[15px] text-alma-text leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-4">
                {post.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-alma-primary bg-alma-primary-light px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="px-5 py-4 border-t border-alma-border flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-colors ${
                  isLiked ? 'text-red-500' : 'text-alma-text-tertiary hover:text-red-500'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">{post.like_count}</span>
              </button>
              <div className="flex items-center gap-2 text-alma-text-tertiary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm">{post.comment_count}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-alma-text-tertiary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm">{post.view_count}</span>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-6">
          <h2 className="font-bold text-alma-text mb-4">
            댓글 {comments.length}개
          </h2>

          {/* Comments List */}
          <div className="space-y-3">
            {parentComments.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-alma-border text-center">
                <p className="text-alma-text-tertiary text-sm">아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
              </div>
            ) : (
              parentComments.map(comment => (
                <div key={comment.id}>
                  <CommentCard
                    comment={comment}
                    onReply={() => requireAuth(() => setReplyTo({ id: comment.id, name: comment.anonymous_name }))}
                  />
                  {/* Replies */}
                  {repliesMap[comment.id] && (
                    <div className="ml-6 mt-2 space-y-2">
                      {repliesMap[comment.id].map(reply => (
                        <CommentCard
                          key={reply.id}
                          comment={reply}
                          isReply
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Comment Input - 게스트일 때 가입 유도 메시지 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-alma-border px-5 py-3 z-50">
        <div className="max-w-2xl mx-auto">
          {!user ? (
            <Link
              href="/signup"
              className="block w-full py-3 bg-alma-primary text-white font-medium rounded-xl text-center hover:bg-alma-primary-dark transition-colors"
            >
              로그인하고 이야기 나누기
            </Link>
          ) : (
            <>
              {replyTo && (
                <div className="flex items-center justify-between mb-2 px-2">
                  <span className="text-xs text-alma-text-secondary">
                    <span className="text-alma-primary">{replyTo.name}</span>님에게 답글 작성 중
                  </span>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="text-xs text-alma-text-tertiary hover:text-alma-text"
                  >
                    취소
                  </button>
                </div>
              )}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
                  placeholder={replyTo ? '답글을 입력하세요...' : '댓글을 입력하세요...'}
                  className="flex-1 px-4 py-3 bg-alma-bg border border-alma-border rounded-xl focus:outline-none focus:ring-2 focus:ring-alma-primary/20 focus:border-alma-primary text-alma-text placeholder:text-alma-text-tertiary"
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className={`px-5 py-3 rounded-xl font-medium transition-all ${
                    newComment.trim()
                      ? 'bg-alma-primary text-white hover:bg-alma-primary-dark'
                      : 'bg-alma-border text-alma-text-tertiary'
                  }`}
                >
                  등록
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
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
              댓글과 좋아요는 회원만 이용할 수 있어요.<br />
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
    </div>
  );
}

// Comment Card Component
function CommentCard({
  comment,
  onReply,
  isReply = false,
}: {
  comment: Comment;
  onReply?: () => void;
  isReply?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl p-4 border border-alma-border ${isReply ? 'bg-alma-bg' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-alma-text">{comment.anonymous_name}</span>
        <span className="text-xs text-alma-text-tertiary">{formatTimeAgo(comment.created_at)}</span>
      </div>
      <p className="text-[15px] text-alma-text leading-relaxed">{comment.content}</p>
      <div className="flex items-center gap-4 mt-3">
        <button className="text-xs text-alma-text-tertiary hover:text-alma-text flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {comment.like_count}
        </button>
        {onReply && (
          <button
            onClick={onReply}
            className="text-xs text-alma-text-tertiary hover:text-alma-primary"
          >
            답글
          </button>
        )}
      </div>
    </div>
  );
}

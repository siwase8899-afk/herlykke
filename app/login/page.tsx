'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/lib/authContext';

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 이미 로그인 상태면 대시보드로 리다이렉트
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [authLoading, isLoggedIn, router]);

  if (authLoading || isLoggedIn) {
    return <div className="min-h-screen" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isSupabaseConfigured) {
      // Demo mode - just redirect to dashboard
      router.push('/dashboard');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push('/dashboard');
    } catch (err: unknown) {
      const m = (err instanceof Error ? err.message : '').toLowerCase();
      if (m.includes('invalid login credentials')) {
        setError('이메일 또는 비밀번호가 맞지 않아요. 처음이시면 홈에서 체크인 후 가입해 주세요.');
      } else if (m.includes('email not confirmed')) {
        setError('이메일 인증이 필요해요. 메일함의 인증 링크를 눌러주세요.');
      } else if (m.includes('email logins are disabled')) {
        setError('이메일 로그인이 일시적으로 꺼져 있어요. 잠시 후 다시 시도해 주세요.');
      } else {
        setError(err instanceof Error ? err.message : '오류가 발생했어요. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-hlk-surface to-hlk-primary-light/35 flex flex-col">
      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-8 py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="card-glass rounded-3xl p-8 md:p-10 shadow-soft-md">
            {/* Title */}
            <div className="text-center mb-8">
              <p className="text-xs font-bold tracking-widest text-hlk-primary-dark uppercase mb-3">
                Member Login
              </p>
              <h1 className="text-3xl font-extrabold text-hlk-text mb-3">
                다시 만나서 반가워요
              </h1>
              <p className="text-base text-hlk-text-secondary">
                로그인하고 기록을 이어가세요
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-hlk-text mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-hlk-border bg-white text-hlk-text placeholder:text-hlk-text-tertiary focus:border-hlk-clay focus:ring-2 focus:ring-hlk-clay/20 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-hlk-text mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6자 이상"
                  className="w-full px-4 py-3.5 rounded-xl border border-hlk-border bg-white text-hlk-text placeholder:text-hlk-text-tertiary focus:border-hlk-clay focus:ring-2 focus:ring-hlk-clay/20 outline-none transition-all"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 bg-hlk-clay-light border border-hlk-clay/30 rounded-xl text-sm text-hlk-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-hlk-clay text-white font-bold rounded-xl hover:bg-hlk-clay-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-hlk-clay/20"
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </form>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-hlk-text-tertiary hover:text-hlk-text transition-colors">
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

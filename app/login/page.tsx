'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/lib/authContext';

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 이미 로그인 상태면 대시보드로 리다이렉트
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [authLoading, isLoggedIn, router]);

  if (authLoading || isLoggedIn) {
    return <div className="min-h-screen bg-hlk-bg" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!isSupabaseConfigured) {
      // Demo mode - just redirect to dashboard
      router.push('/dashboard');
      return;
    }

    try {
      if (isLogin) {
        // 로그인
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        // 회원가입
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (error) throw error;
        setMessage('가입 확인 이메일을 보냈어요. 이메일을 확인해주세요!');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('오류가 발생했어요. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hlk-bg flex flex-col">
      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-8 py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-hlk-border">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-hlk-text mb-2">
                {isLogin ? '다시 만나서 반가워요' : '함께해요'}
              </h1>
              <p className="text-hlk-text-secondary">
                {isLogin ? '로그인하고 기록을 이어가세요' : '가입하고 매일 기록을 시작하세요'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-hlk-text mb-1.5">
                    이름 (닉네임)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="커뮤니티에서 사용할 이름"
                    className="w-full px-4 py-3 rounded-xl border border-hlk-border focus:border-hlk-primary focus:ring-2 focus:ring-hlk-primary/20 outline-none transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-hlk-text mb-1.5">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-hlk-border focus:border-hlk-primary focus:ring-2 focus:ring-hlk-primary/20 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-hlk-text mb-1.5">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6자 이상"
                  className="w-full px-4 py-3 rounded-xl border border-hlk-border focus:border-hlk-primary focus:ring-2 focus:ring-hlk-primary/20 outline-none transition-all"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  {error}
                </div>
              )}

              {message && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-hlk-primary text-white font-bold rounded-xl hover:bg-hlk-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? '처리 중...' : isLogin ? '로그인' : '가입하기'}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setMessage('');
                }}
                className="text-sm text-hlk-text-secondary hover:text-hlk-primary transition-colors"
              >
                {isLogin ? '계정이 없으신가요? 가입하기' : '이미 계정이 있으신가요? 로그인'}
              </button>
            </div>
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

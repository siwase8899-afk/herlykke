'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { ScrollProgress } from './ScrollProgress';

const guestNavItems = [
  { label: '수면 가이드', href: '/columns' },
  { label: '수면 레시피', href: '/recipes' },
  { label: '커뮤니티', href: '/community' },
  { label: '수면 체크인', href: '/checkin' },
];

const authNavItems = [
  { label: '대시보드', href: '/dashboard' },
  { label: '수면 동료', href: '/concierge' },
  { label: '수면 가이드', href: '/columns' },
  { label: '수면 레시피', href: '/recipes' },
  { label: '커뮤니티', href: '/community' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, isLoading, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = isLoggedIn ? authNavItems : guestNavItems;
  const ctaLabel = isLoggedIn ? '오늘 기록하기' : '시작하기';
  const ctaHref = isLoggedIn ? '/log/new' : '/checkin';
  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || '회원';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`backdrop-blur-lg border-b transition-all duration-500 ${
            isScrolled
              ? 'bg-hlk-bg/95 border-hlk-border/60 shadow-soft-sm'
              : 'bg-hlk-bg/80 border-hlk-border/40'
          }`}
          style={{ transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}
        >
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="flex items-center justify-between h-16 md:h-[72px]">
              {/* Logo — serif, bold */}
              <Link
                href={isLoggedIn ? '/dashboard' : '/'}
                className="text-xl font-bold text-hlk-text tracking-tight font-[family-name:var(--font-display)]"
                             >
                HERLYKKE
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-hlk-text-secondary hover:text-hlk-text transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* CTA */}
                <Link
                  href={ctaHref}
                  className="px-6 py-2.5 bg-hlk-primary text-white text-sm font-semibold rounded-full hover:bg-hlk-primary-dark transition-colors"
                >
                  {ctaLabel}
                </Link>

                {/* Profile / Login */}
                {!isLoading && (
                  isLoggedIn ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-hlk-text">
                        {displayName}
                      </span>
                      <button
                        onClick={logout}
                        className="text-sm text-hlk-text-tertiary hover:text-hlk-text transition-colors"
                      >
                        로그아웃
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="text-sm text-hlk-text-tertiary hover:text-hlk-text transition-colors"
                    >
                      로그인
                    </Link>
                  )
                )}
              </nav>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center"
                aria-label="메뉴 열기"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span
                    className={`block h-0.5 bg-hlk-text transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-hlk-text transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-hlk-text transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-hlk-bg/95 backdrop-blur-md border-b border-hlk-border overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}
        >
          <div className="px-6 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-base text-hlk-text-secondary hover:text-hlk-text transition-colors py-3"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href={ctaHref}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-6 py-3.5 bg-hlk-primary text-white font-semibold rounded-full"
              >
                {ctaLabel}
              </Link>
            </div>

            {!isLoading && (
              isLoggedIn ? (
                <div className="flex items-center justify-between pt-4 border-t border-hlk-border">
                  <span className="text-sm text-hlk-text">{displayName}</span>
                  <button
                    onClick={() => { setIsMenuOpen(false); logout(); }}
                    className="text-sm text-hlk-text-tertiary hover:text-hlk-text transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-sm text-hlk-text-tertiary hover:text-hlk-text transition-colors py-3"
                >
                  로그인
                </Link>
              )
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
}

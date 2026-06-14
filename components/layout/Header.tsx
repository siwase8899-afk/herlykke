'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { ScrollProgress } from './ScrollProgress';

const guestNavItems = [
  { label: 'HERLYKKE', href: '/#why-herlykke' },
];

const authNavItems = [
  { label: '대시보드', href: '/dashboard' },
  { label: '이야기', href: '/columns' },
  { label: '루틴', href: '/recipes' },
  { label: '커뮤니티', href: '/community' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, isLoading, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = isLoggedIn ? authNavItems : guestNavItems;
  const ctaLabel = isLoggedIn ? '오늘 기록하기' : '처음이에요';
  const ctaHref = isLoggedIn ? '/log/new' : '/checkin';
  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || '회원';
  const isHomeHeroTop = pathname === '/' && !isScrolled && !isMenuOpen;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`backdrop-blur-lg border-b transition-all duration-500 ${
            isHomeHeroTop
              ? 'bg-transparent border-white/10'
              : isScrolled
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
                className="flex items-center"
              >
                <img
                  src="/herlykke-logo-primary.svg"
                  alt="HERLYKKE"
                  className={`h-8 w-auto md:h-9 ${isHomeHeroTop ? 'brightness-0 invert' : ''}`}
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm transition-colors ${
                      isHomeHeroTop ? 'text-white/75 hover:text-white' : 'text-hlk-text-secondary hover:text-hlk-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Profile / Login */}
                {!isLoading && (
                  isLoggedIn ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-hlk-text">
                        {displayName}
                      </span>
                      <button
                        onClick={logout}
                        className={`text-sm transition-colors ${
                          isHomeHeroTop ? 'text-white/65 hover:text-white' : 'text-hlk-text-tertiary hover:text-hlk-text'
                        }`}
                      >
                        로그아웃
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                        isHomeHeroTop
                          ? 'border border-white/45 bg-white/15 text-white hover:bg-white/25'
                          : 'border border-hlk-primary-dark/30 bg-white text-hlk-primary-dark hover:border-hlk-primary-dark hover:bg-hlk-primary-light'
                      }`}
                    >
                      로그인
                    </Link>
                  )
                )}

                {/* CTA */}
                <Link
                  href={ctaHref}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    isHomeHeroTop
                      ? 'bg-white text-hlk-secondary hover:bg-hlk-clay-light'
                      : 'bg-hlk-clay text-white hover:bg-hlk-clay-dark'
                  }`}
                >
                  {ctaLabel}
                </Link>
              </nav>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center"
                aria-label="메뉴 열기"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span
                    className={`block h-0.5 transition-all duration-300 ${
                      isHomeHeroTop ? 'bg-white' : 'bg-hlk-text'
                    } ${
                      isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 transition-all duration-300 ${
                      isHomeHeroTop ? 'bg-white' : 'bg-hlk-text'
                    } ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 transition-all duration-300 ${
                      isHomeHeroTop ? 'bg-white' : 'bg-hlk-text'
                    } ${
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
                  className="block w-full text-center px-6 py-3.5 bg-white text-hlk-primary-dark font-semibold rounded-full border border-hlk-primary-dark/30"
                >
                  로그인
                </Link>
              )
            )}

            <div className="pt-3">
              <Link
                href={ctaHref}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-6 py-3.5 bg-hlk-clay text-white font-semibold rounded-full"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
}

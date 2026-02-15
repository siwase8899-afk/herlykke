'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

const guestNavItems = [
  { label: '전문가 컬럼', href: '/columns' },
  { label: '커뮤니티', href: '/community' },
  { label: '솔루션', href: '/solutions' },
];

const authNavItems = [
  { label: '대시보드', href: '/dashboard' },
  { label: '전문가 컬럼', href: '/columns' },
  { label: '커뮤니티', href: '/community' },
  { label: '솔루션', href: '/solutions' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, isLoading, user, logout } = useAuth();

  const navItems = isLoggedIn ? authNavItems : guestNavItems;
  const ctaLabel = isLoggedIn ? '오늘 기록하기' : '시작하기';
  const ctaHref = isLoggedIn ? '/log/new' : '/checkin';
  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || '회원';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white/90 backdrop-blur-md border-b border-alma-border">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="flex items-center justify-between h-16 md:h-18">
              {/* Logo */}
              <Link
                href={isLoggedIn ? '/dashboard' : '/'}
                className="text-xl font-bold text-alma-primary tracking-tight"
              >
                ALMA
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) =>
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-alma-text-secondary hover:text-alma-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-alma-text-secondary hover:text-alma-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  )
                )}

                {/* CTA Button */}
                <Link
                  href={ctaHref}
                  className="px-6 py-2.5 bg-alma-accent text-white text-sm font-semibold rounded-full hover:bg-alma-accent/90 transition-colors"
                >
                  {ctaLabel}
                </Link>

                {/* Profile / Login */}
                {!isLoading && (
                  isLoggedIn ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-alma-text">
                        {displayName}
                      </span>
                      <button
                        onClick={logout}
                        className="text-sm text-alma-text-tertiary hover:text-alma-text transition-colors"
                      >
                        로그아웃
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="text-sm font-medium text-alma-text-tertiary hover:text-alma-primary transition-colors"
                    >
                      이미 회원이신가요?
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
                    className={`block h-0.5 bg-alma-text transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-alma-text transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-alma-text transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white/95 backdrop-blur-md border-b border-alma-border transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-base font-medium text-alma-text-secondary hover:text-alma-primary transition-colors py-2"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-base font-medium text-alma-text-secondary hover:text-alma-primary transition-colors py-2"
                >
                  {item.label}
                </a>
              )
            )}

            {/* Mobile CTA */}
            <Link
              href={ctaHref}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-6 py-3 bg-alma-accent text-white font-semibold rounded-full hover:bg-alma-accent/90 transition-colors"
            >
              {ctaLabel}
            </Link>

            {/* Mobile Profile / Login */}
            {!isLoading && (
              isLoggedIn ? (
                <div className="flex items-center justify-between pt-2 border-t border-alma-border">
                  <span className="text-sm font-medium text-alma-text">
                    {displayName}
                  </span>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="text-sm text-alma-text-tertiary hover:text-alma-text transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-sm font-medium text-alma-text-tertiary hover:text-alma-primary transition-colors py-2"
                >
                  이미 회원이신가요?
                </Link>
              )
            )}
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-18" />
    </>
  );
}

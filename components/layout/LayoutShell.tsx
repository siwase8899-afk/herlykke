'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/authContext';
import { Header } from './Header';
import { Footer } from './Footer';

// 체크인/결과 페이지는 자체 네비게이션 사용 → Header/Footer 숨김
const FLOW_ROUTES = ['/checkin', '/result'];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFlowRoute = FLOW_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <AuthProvider>
      {/* v4: 앱 전역 오로라 배경 (고정, 콘텐츠 뒤) */}
      <div className="app-aurora" aria-hidden="true">
        <span className="app-aurora__blob app-aurora__blob--sage" />
        <span className="app-aurora__blob app-aurora__blob--gold" />
        <span className="app-aurora__blob app-aurora__blob--orange" />
        <span className="app-aurora__blob app-aurora__blob--rose" />
        <span className="app-aurora__blob app-aurora__blob--plum" />
      </div>
      {isFlowRoute ? (
        children
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </AuthProvider>
  );
}

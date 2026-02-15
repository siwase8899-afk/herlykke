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

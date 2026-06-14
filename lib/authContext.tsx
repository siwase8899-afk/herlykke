'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isDemo: boolean;
  logout: () => Promise<void>;
}

const DEMO_USER = {
  id: 'demo-user',
  email: 'demo@herlykke.com',
  user_metadata: { name: '데모 사용자' },
} as unknown as User;

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  isDemo: false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isDemo = !isSupabaseConfigured;

  useEffect(() => {
    // ⚠️ 임시 로그인 우회 (출시 전 제거): 플래그가 있으면 데모 유저로 로그인 처리
    if (typeof window !== 'undefined' && localStorage.getItem('hlk_bypass_login') === '1') {
      setUser(DEMO_USER);
      setIsLoading(false);
      return;
    }
    if (!isSupabaseConfigured) {
      setUser(DEMO_USER);
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    if (typeof window !== 'undefined') localStorage.removeItem('hlk_bypass_login'); // 임시 우회 해제
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !!user,
        isDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

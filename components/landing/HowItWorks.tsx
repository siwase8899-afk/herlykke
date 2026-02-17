'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const CareIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const EducationIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const pillars = [
  {
    id: 'care',
    pillar: 'CARE',
    title: '나를 돌보기',
    headline: '매일 3분, 몸과 마음 체크인',
    desc: '증상, 수면, 기분을 매일 간편하게 기록하고 컨디션 변화를 추적해요.',
    features: ['일일 증상 기록', '수면/활동 추적', '컨디션 변화 추적'],
    Icon: CareIcon,
    color: 'bg-hlk-primary',
    lightColor: 'bg-hlk-primary-light',
    href: '/log',
  },
  {
    id: 'education',
    pillar: 'EDUCATION',
    title: '나를 이해하기',
    headline: 'AI 분석과 전문가 콘텐츠',
    desc: '축적된 데이터로 나만의 패턴을 발견하고, 전문가 컬럼으로 깊이 이해해요.',
    features: ['AI 패턴 분석', '전문가 컬럼', '맞춤 조언'],
    Icon: EducationIcon,
    color: 'bg-hlk-accent',
    lightColor: 'bg-hlk-accent-light',
    href: '/insights',
  },
  {
    id: 'support',
    pillar: 'SUPPORT',
    title: '맞춤 솔루션',
    headline: '증상별 큐레이션된 솔루션',
    desc: '명상, 운동, 영양제, 상담까지. 나에게 맞는 솔루션을 추천받아요.',
    features: ['7개 카테고리', '매치 점수', '리뷰 기반 추천'],
    Icon: SupportIcon,
    color: 'bg-hlk-secondary',
    lightColor: 'bg-hlk-secondary-light',
    href: '/solutions',
  },
  {
    id: 'community',
    pillar: 'COMMUNITY',
    title: '함께하기',
    headline: '비슷한 여성들과 연결',
    desc: '같은 증상, 같은 고민을 나누는 친구를 찾아요. 카톡 토크방에서 편하게.',
    features: ['카카오 토크방', '친구 찾기', '오늘의 투표'],
    Icon: CommunityIcon,
    color: 'bg-gradient-to-r from-hlk-primary to-hlk-accent',
    lightColor: 'bg-gradient-to-r from-hlk-primary-light to-hlk-accent-light',
    href: '/community',
  },
];

// 게스트도 각 서비스 페이지를 직접 볼 수 있도록 리다이렉트 없음
const guestHrefMap: Record<string, string> = {};

export function HowItWorks() {
  const { isLoggedIn } = useAuth();
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className={`px-6 md:px-8 py-24 md:py-32 bg-white ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-hlk-accent-light text-hlk-accent-dark text-xs font-semibold tracking-wide uppercase rounded-full mb-6">
            HERLYKKE 4-Pillar
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hlk-text mb-6 tracking-tight">
            HERLYKKE의 <span className="text-hlk-primary">4가지 약속</span>
          </h2>
          <p className="text-lg text-hlk-text-secondary max-w-2xl mx-auto">
            Care · Education · Support · Community
            <br />
            두번째 봄의 모든 순간을 함께해요.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const href = !isLoggedIn && guestHrefMap[pillar.href]
              ? guestHrefMap[pillar.href]
              : pillar.href;
            const isSupport = pillar.id === 'support';
            return (
            <Link
              key={pillar.id}
              href={href}
              className={`group relative bg-hlk-bg rounded-3xl p-10 border overflow-hidden hover:shadow-xl hover:border-hlk-primary/30 hover:-translate-y-1 ${
                isSupport ? 'border-hlk-accent/30' : 'border-hlk-border'
              } ${sectionVisible ? `stagger-${Math.min(pillars.indexOf(pillar) + 1, 4)}` : ''}`}
            >
              {isSupport && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-hlk-accent text-white text-[10px] font-bold tracking-wider rounded-full">
                  추천
                </span>
              )}
              <div className={`inline-block px-3 py-1 ${pillar.color} rounded-full text-white text-xs font-bold tracking-wider mb-6`}>
                {pillar.pillar}
              </div>

              <div className="flex gap-6">
                <div className={`w-16 h-16 rounded-2xl ${pillar.lightColor} flex items-center justify-center flex-shrink-0 text-hlk-text group-hover:scale-110`} style={{ transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}>
                  <pillar.Icon />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-hlk-text-tertiary mb-1">{pillar.title}</p>
                  <h3 className="text-xl font-bold text-hlk-text mb-3 group-hover:text-hlk-primary transition-colors">
                    {pillar.headline}
                  </h3>
                  <p className="text-sm text-hlk-text-secondary leading-relaxed mb-5">
                    {pillar.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {pillar.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-white rounded-full text-xs text-hlk-text-secondary border border-hlk-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute top-10 right-10 w-10 h-10 rounded-full bg-hlk-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-hlk-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
            );
          })}
        </div>

        {/* 데이터 플라이휠 — Flo 인사이트: 기록→AI 정확도↑→사용↑ 자기강화 루프 */}
        <div className="mt-16 bg-gradient-to-r from-hlk-primary-light via-white to-hlk-accent-light rounded-3xl p-8 md:p-12 border border-hlk-border">
          <div className="text-center mb-8">
            <p className="text-sm text-hlk-primary font-semibold uppercase tracking-wider mb-2">
              Data Flywheel
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-hlk-text">
              기록할수록 <span className="text-hlk-primary">더 정확해져요</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: '매일 기록', desc: '3분 체크인으로 증상·기분·활동 기록' },
              { step: '2', title: 'AI 패턴 분석', desc: '데이터가 쌓일수록 정확한 패턴 발견' },
              { step: '3', title: '맞춤 추천', desc: '나의 증상에 맞는 솔루션과 조언' },
              { step: '4', title: '변화 확인', desc: '개선 과정을 눈으로 확인하며 동기 부여' },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative">
                <div className="w-10 h-10 rounded-full bg-hlk-primary text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <p className="text-sm font-bold text-hlk-text mb-1">{item.title}</p>
                <p className="text-xs text-hlk-text-secondary leading-relaxed">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 -right-3 text-hlk-primary/40">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-hlk-text-tertiary mt-6">
            이 순환이 반복될수록 AI가 나를 더 잘 이해하게 돼요
          </p>
        </div>
      </div>
    </section>
  );
}

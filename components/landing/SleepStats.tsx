'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function SleepStats() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15, triggerOnce: true });
  const { displayValue: mainStat } = useCountUp({ end: 44.7, decimals: 1, suffix: '%', duration: 2000, enabled: isVisible });
  const { displayValue: riskStat } = useCountUp({ end: 40, decimals: 0, suffix: '%', duration: 1800, enabled: isVisible });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold text-hlk-primary tracking-[0.2em] uppercase mb-4">
            Why Sleep Matters
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-hlk-text leading-tight max-w-lg">
            40대의 수면이
            <br />
            60대 뇌 건강을 결정합니다
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Big stat card */}
          <div
            className={`md:col-span-2 bg-hlk-primary rounded-3xl p-8 md:p-10 text-white relative overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
            <p className="text-sm font-medium text-white/60 mb-2">50-60대 여성 불면증</p>
            <p className="text-6xl md:text-7xl font-black mb-4 tabular-nums">{mainStat}</p>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              50대 이상 여성 거의 절반이 불면증을 경험합니다. 갱년기 호르몬 변화가 주요 원인입니다.
            </p>
            <p className="text-white/40 text-xs mt-4">메디게이트뉴스</p>
          </div>

          {/* Stacked small cards */}
          <div className="flex flex-col gap-4">
            <div
              className={`flex-1 bg-hlk-accent-light rounded-3xl p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <p className="text-4xl font-black text-hlk-accent mb-2 tabular-nums">{riskStat}</p>
              <p className="text-sm font-medium text-hlk-text leading-snug">만성 불면증과 치매 위험 증가 연관성</p>
              <p className="text-xs text-hlk-text-tertiary mt-2">Mayo Clinic 2025</p>
            </div>

            <div
              className={`flex-1 bg-hlk-primary-light rounded-3xl p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-4xl font-black text-hlk-primary mb-2">2/3</p>
              <p className="text-sm font-medium text-hlk-text leading-snug">치매 환자 중 여성 비율</p>
              <p className="text-xs text-hlk-text-tertiary mt-2">보건복지부 2023</p>
            </div>
          </div>

          {/* Full-width connection card */}
          <div
            className={`md:col-span-3 bg-hlk-surface rounded-3xl p-8 md:p-10 border border-hlk-border transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <div className="w-10 h-10 rounded-2xl bg-hlk-primary-light flex items-center justify-center">
                      <svg className="w-5 h-5 text-hlk-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                  ),
                  title: '수면으로 시작해요',
                  desc: '새벽 각성, 열감, 야간 발한 — 갱년기 신호일 수 있어요.',
                },
                {
                  icon: (
                    <div className="w-10 h-10 rounded-2xl bg-hlk-accent-light flex items-center justify-center">
                      <svg className="w-5 h-5 text-hlk-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                  ),
                  title: '커뮤니티에서 자연스럽게',
                  desc: '같은 경험의 동료들이 먼저 발견한 방법을 공유해요.',
                },
                {
                  icon: (
                    <div className="w-10 h-10 rounded-2xl bg-hlk-primary-light flex items-center justify-center">
                      <svg className="w-5 h-5 text-hlk-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  ),
                  title: '수면이 뇌 건강까지',
                  desc: '깊은 수면 중 뇌 노폐물이 제거됩니다 (글림프계).',
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-3">
                  {item.icon}
                  <h3 className="font-bold text-hlk-text">{item.title}</h3>
                  <p className="text-sm text-hlk-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-hlk-text-tertiary mt-8 pt-6 border-t border-hlk-border leading-relaxed">
              * 수면과 치매는 강한 상관관계가 있으며, 직접 인과관계는 연구 중입니다.
              본 플랫폼은 의료 서비스가 아닌 커뮤니티 정보 공유 서비스입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

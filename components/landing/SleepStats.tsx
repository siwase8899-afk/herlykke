'use client';

import { Lightbulb, MessageSquare, Moon } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const CONNECTION_ITEMS = [
  {
    icon: Moon,
    tone: 'primary',
    title: '수면으로 시작해요',
    desc: '새벽 각성, 열감, 야간 발한은 몸이 보내는 신호일 수 있어요.',
  },
  {
    icon: MessageSquare,
    tone: 'accent',
    title: '커뮤니티에서 자연스럽게',
    desc: '같은 경험의 동료들이 먼저 발견한 방법을 공유해요.',
  },
  {
    icon: Lightbulb,
    tone: 'primary',
    title: '수면이 뇌 건강까지',
    desc: '깊은 수면 중 뇌 노폐물이 제거됩니다 (글림프계).',
  },
];

export default function SleepStats() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15, triggerOnce: true });
  const { displayValue: mainStat } = useCountUp({
    end: 44.7,
    decimals: 1,
    suffix: '%',
    duration: 2000,
    enabled: isVisible,
  });
  const { displayValue: riskStat } = useCountUp({
    end: 40,
    decimals: 0,
    suffix: '%',
    duration: 1800,
    enabled: isVisible,
  });

  return (
    <section id="sleep-stats" ref={ref} className="relative overflow-hidden bg-hlk-primary-light/70 px-6 py-24 md:px-8 md:py-32">
      <div className="stats-motion-wash absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-5xl">
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-hlk-primary">
            Why Sleep Matters
          </p>
          <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-normal text-hlk-text md:text-[3.25rem]">
            오늘의 수면이
            <br />
            내일의 회복을 만듭니다
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div
            className={`relative overflow-hidden rounded-[28px] bg-hlk-primary p-8 text-white shadow-soft-lg transition-all duration-700 md:col-span-2 md:p-10 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="stats-orb absolute right-[-36px] top-[-36px] h-48 w-48 rounded-full bg-white/8" aria-hidden />
            <p className="mb-3 text-base font-semibold text-white/68">수면 고민이 있는 사람들의 불면</p>
            <p className="mb-5 text-6xl font-black tabular-nums text-white md:text-7xl">{mainStat}</p>
            <p className="max-w-lg text-base font-medium leading-relaxed text-white/78">
              수면 고민이 있는 많은 사람이 불면증을 경험합니다. 몸의 리듬 변화가 주요 원인입니다.
            </p>
            <p className="mt-6 text-sm font-medium text-white/45">메디게이트뉴스</p>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className={`flex-1 rounded-[28px] bg-hlk-accent-light p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <p className="mb-2 text-5xl font-black tabular-nums text-hlk-accent">{riskStat}</p>
              <p className="text-base font-bold leading-snug text-hlk-text">만성 불면증과 치매 위험 증가 연관성</p>
              <p className="mt-3 text-sm text-hlk-text-tertiary">Mayo Clinic 2025</p>
            </div>

            <div
              className={`flex-1 rounded-[28px] bg-hlk-surface/70 p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="mb-2 text-5xl font-black text-hlk-primary">2/3</p>
              <p className="text-base font-bold leading-snug text-hlk-text">인지 건강을 걱정하는 사람이 늘고 있어요</p>
              <p className="mt-3 text-sm text-hlk-text-tertiary">보건복지부 2023</p>
            </div>
          </div>

          <div
            className={`rounded-[28px] border border-hlk-border bg-hlk-surface p-8 shadow-soft-sm transition-all duration-700 md:col-span-3 md:p-10 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {CONNECTION_ITEMS.map((item) => {
                const Icon = item.icon;
                const isAccent = item.tone === 'accent';
                return (
                  <div key={item.title} className="flex flex-col gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isAccent ? 'bg-hlk-accent-light text-hlk-accent' : 'bg-hlk-primary-light text-hlk-primary'
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-lg font-extrabold text-hlk-text">{item.title}</h3>
                    <p className="text-base leading-relaxed text-hlk-text-secondary">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 border-t border-hlk-border pt-6 text-xs leading-relaxed text-hlk-text-tertiary">
              * 수면과 치매는 강한 상관관계가 있으며, 직접 인과관계는 연구 중입니다.
              본 플랫폼은 의료 서비스가 아닌 커뮤니티 정보 공유 서비스입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  {
    number: '44.7%',
    label: '50-60대 여성 불면증 환자 비율',
    source: '메디게이트뉴스',
    color: 'text-hlk-primary',
    bg: 'bg-hlk-primary-light',
  },
  {
    number: '40%',
    label: '만성 불면증과 치매 위험 증가 연관성',
    source: 'Mayo Clinic 2025',
    color: 'text-hlk-accent',
    bg: 'bg-hlk-accent-light',
  },
  {
    number: '2/3',
    label: '치매 환자 중 여성 비율',
    source: '보건복지부 2023',
    color: 'text-hlk-primary',
    bg: 'bg-hlk-primary-light',
  },
];

export default function SleepStats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-hlk-surface-warm">
      <div className="max-w-3xl mx-auto">
        {/* 헤딩 */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-hlk-text-secondary text-sm font-medium uppercase tracking-widest mb-3">
            왜 지금 수면 관리인가
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text mb-4">
            40대의 수면이<br />
            60대 뇌 건강을 결정합니다
          </h2>
          <p className="text-hlk-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
            수면 부족과 치매 위험 사이의 강한 연관성이 확인됐습니다.
            <br className="hidden md:block" />
            4050 여성이 특히 취약한 이유가 있어요.
          </p>
        </div>

        {/* Stats 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-2xl p-6 text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
              <div className="text-hlk-text font-medium text-sm leading-snug mb-2">{stat.label}</div>
              <div className="text-hlk-text-tertiary text-xs">{stat.source}</div>
            </div>
          ))}
        </div>

        {/* 트로이 목마 설명 */}
        <div
          className={`bg-hlk-surface rounded-2xl p-8 border border-hlk-border transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          <h3 className="text-xl font-bold text-hlk-text mb-4">
            수면 문제, 갱년기와 연결되어 있을 수 있어요
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🌙</span>
              <p className="text-hlk-text-secondary leading-relaxed">
                <strong className="text-hlk-text">수면으로 시작해요.</strong>{' '}
                새벽 각성, 열감, 야간 발한 — 이게 갱년기 신호일 수 있어요.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💬</span>
              <p className="text-hlk-text-secondary leading-relaxed">
                <strong className="text-hlk-text">커뮤니티에서 자연스럽게 알게 돼요.</strong>{' '}
                같은 경험을 가진 갱년기 동기들이 먼저 발견했어요.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🧠</span>
              <p className="text-hlk-text-secondary leading-relaxed">
                <strong className="text-hlk-text">수면 관리가 뇌 건강까지 지켜요.</strong>{' '}
                깊은 수면 중 뇌 노폐물이 제거됩니다 (글림프계 메커니즘).
              </p>
            </div>
          </div>

          <p className="text-xs text-hlk-text-tertiary mt-6 leading-relaxed">
            * 수면과 치매는 강한 상관관계가 있으며, 직접 인과관계는 연구 중입니다.
            본 플랫폼은 의료 서비스가 아닌 커뮤니티 정보 공유 서비스입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

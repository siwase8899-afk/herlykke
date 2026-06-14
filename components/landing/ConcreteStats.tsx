'use client';

import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// 숫자 카운트업 애니메이션
function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!isVisible) return;

    // 숫자 부분 추출
    const numMatch = target.match(/[\d.]+/);
    if (!numMatch) return;

    const endNum = parseFloat(numMatch[0]);
    const suffix = target.replace(numMatch[0], '');
    const isFloat = target.includes('.');
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;

    let step = 0;
    setDisplay(isFloat ? `0${suffix}` : `0${suffix}`);

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = endNum * eased;

      if (step >= steps) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(isFloat ? `${current.toFixed(1)}${suffix}` : `${Math.round(current)}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return display;
}

// Evernow 인사이트: 구체적 성과 수치 + Flo 데이터 루프 가치 + Peanut 커뮤니티 활성도
export function ConcreteStats() {
  const stats = [
    {
      number: '850만',
      label: '이 시기를 지나는 한국의 많은 사람',
      detail: '45-60세 수면 고민 인구',
      color: 'text-hlk-primary',
    },
    {
      number: '87%',
      label: '증상 인지 부족',
      detail: '"이게 몸의 변화인지 몰랐어요"',
      color: 'text-hlk-accent',
    },
    {
      number: '78%',
      label: '일상관리 향상',
      detail: '4주 기록 후 자가보고',
      color: 'text-hlk-primary',
    },
    {
      number: '92%',
      label: '추천 의향',
      detail: '"친구에게도 알려주고 싶어요"',
      color: 'text-hlk-accent',
    },
  ];

  const insights = [
    { text: '아시아권 사람 평균 생애 전환 연령 48-49세 (서양 51세보다 빠름)', source: 'Sol Research' },
    { text: '한국의 많은 사람 1위 증상: 관절통/근육통 (서양은 핫플래시)', source: 'Sol Asia Data' },
    { text: '이 시기를 위한 전용 커뮤니티: 한국 0개 vs 글로벌 5개+', source: 'HERLYKKE 시장 조사' },
  ];

  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  // Count-up for each stat
  const count0 = useCountUp(stats[0].number, sectionVisible);
  const count1 = useCountUp(stats[1].number, sectionVisible);
  const count2 = useCountUp(stats[2].number, sectionVisible);
  const count3 = useCountUp(stats[3].number, sectionVisible);
  const counts = [count0, count1, count2, count3];

  return (
    <section ref={sectionRef} className={`px-6 md:px-8 py-24 md:py-32 bg-hlk-bg ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-hlk-accent font-semibold mb-2 uppercase tracking-wider">
            Real Results
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-hlk-text tracking-tight">
            숫자가 말해주는 HERLYKKE
          </h2>
        </div>

        {/* C2MTL 인사이트: 카드 대신 세퍼레이터 기반 통계 블록 — 절제된 임팩트 */}
        <div className="card-glass rounded-2xl mb-16 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-hlk-border">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-10 px-6 ${sectionVisible ? `stagger-${Math.min(i + 1, 4)}` : ''}`}
              >
                <p className={`text-5xl md:text-6xl font-black ${stat.color} mb-3 tabular-nums tracking-tight`}>
                  {counts[i]}
                </p>
                <p className="font-semibold text-hlk-text mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-hlk-text-tertiary">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 한국 몸과 마음의 변화 인사이트 — Sol/경쟁사 분석 기반 */}
        <div className="card-glass rounded-2xl p-8">
          <p className="text-sm font-semibold text-hlk-primary mb-6 text-center">
            알고 계셨나요?
          </p>
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={insight.text} className="flex items-start gap-4 p-4 bg-hlk-bg rounded-xl">
                <div className="w-8 h-8 rounded-full bg-hlk-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-hlk-primary">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-hlk-text">{insight.text}</p>
                  <p className="text-xs text-hlk-text-tertiary mt-1">{insight.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

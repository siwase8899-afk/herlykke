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
      label: '이 시기를 지나는 한국 여성',
      detail: '45-60세 여성 인구',
      color: 'text-alma-primary',
    },
    {
      number: '87%',
      label: '증상 인지 부족',
      detail: '"이게 갱년기인지 몰랐어요"',
      color: 'text-alma-accent',
    },
    {
      number: '78%',
      label: '일상관리 향상',
      detail: '4주 기록 후 자가보고',
      color: 'text-alma-primary',
    },
    {
      number: '92%',
      label: '추천 의향',
      detail: '"친구에게도 알려주고 싶어요"',
      color: 'text-alma-accent',
    },
  ];

  const insights = [
    { text: '아시아 여성 평균 폐경 연령 48-49세 (서양 51세보다 빠름)', source: 'Sol Research' },
    { text: '한국 여성 1위 증상: 관절통/근육통 (서양은 핫플래시)', source: 'Sol Asia Data' },
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
    <section ref={sectionRef} className={`px-6 md:px-8 py-24 md:py-32 bg-alma-bg ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-alma-accent font-semibold mb-2 uppercase tracking-wider">
            Real Results
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-alma-text">
            숫자가 말해주는 HERLYKKE
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl p-8 border border-alma-border text-center hover:shadow-xl hover:-translate-y-1 transition-all ${sectionVisible ? `stagger-${Math.min(i + 1, 4)}` : ''}`}
            >
              <p className={`text-4xl md:text-5xl font-black ${stat.color} mb-3`}>
                {counts[i]}
              </p>
              <p className="font-semibold text-alma-text mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-alma-text-tertiary">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 한국 갱년기 인사이트 — Sol/경쟁사 분석 기반 */}
        <div className="bg-white rounded-2xl p-8 border border-alma-border">
          <p className="text-sm font-semibold text-alma-primary mb-6 text-center">
            알고 계셨나요?
          </p>
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div key={insight.text} className="flex items-start gap-4 p-4 bg-alma-bg rounded-xl">
                <div className="w-8 h-8 rounded-full bg-alma-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-alma-primary">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-alma-text">{insight.text}</p>
                  <p className="text-xs text-alma-text-tertiary mt-1">{insight.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

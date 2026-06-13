'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ClipboardList, MessageCircle, NotebookPen, Route } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardList,
    title: '1분 체크인',
    time: '1분',
    desc: '수면, 열감, 감정 변화 중 지금 가장 가까운 신호를 고릅니다.',
  },
  {
    icon: Route,
    title: '변화 패턴 확인',
    time: '바로',
    desc: '의학적 진단이 아니라 내 상태를 설명할 수 있는 문장을 얻습니다.',
  },
  {
    icon: MessageCircle,
    title: '비슷한 이야기 보기',
    time: '선택',
    desc: '나와 비슷한 경험을 가진 사람들의 조용한 기록을 살펴봅니다.',
  },
  {
    icon: NotebookPen,
    title: '작은 루틴으로 연결',
    time: '천천히',
    desc: '오늘 밤 해볼 수 있는 수면, 호흡, 생활 루틴을 발견합니다.',
  },
];

export default function SleepHowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-hlk-surface px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-sm font-semibold text-hlk-primary">시작은 짧고, 선택은 천천히</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-normal text-hlk-text md:text-[2.7rem]">
            첫 1분이면 충분해요
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-hlk-text-secondary">
            가입, 결제, 커뮤니티 참여를 서두르지 않습니다. 먼저 내 상태를 조용히 확인하고,
            필요한 만큼만 다음 단계로 넘어갑니다.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`rounded-[22px] border border-hlk-border bg-white p-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hlk-primary-light text-hlk-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="rounded-full bg-hlk-bg px-3 py-1 text-xs font-semibold text-hlk-text-tertiary">
                    {step.time}
                  </span>
                </div>
                <h3 className="font-bold text-hlk-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-hlk-text-secondary">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '520ms' }}
        >
          <Link
            href="/checkin"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-hlk-clay px-8 py-3.5 font-semibold text-white shadow-soft-md hover:bg-hlk-clay-dark"
          >
            1분 체크인 시작하기
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <p className="mt-4 text-sm text-hlk-text-tertiary">
            가입 없이 시작하고, 언제든 멈출 수 있어요.
          </p>
        </div>
      </div>
    </section>
  );
}

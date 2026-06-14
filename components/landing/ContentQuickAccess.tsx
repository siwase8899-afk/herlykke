'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Flame,
  Moon,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react';

type ConcernId = 'night-waking' | 'heat' | 'mood' | 'brain-fog';

const CONCERNS: {
  id: ConcernId;
  label: string;
  helper: string;
  icon: typeof Moon;
  next: string;
}[] = [
  {
    id: 'night-waking',
    label: '새벽에 자주 깨요',
    helper: '잠이 얕아지고 다시 잠들기 어려운 밤',
    icon: Moon,
    next: '수면 패턴과 열감, 피로 신호를 함께 확인합니다.',
  },
  {
    id: 'heat',
    label: '열감이 올라와요',
    helper: '갑자기 얼굴이 뜨거워지거나 땀이 나는 순간',
    icon: Flame,
    next: '열감이 수면과 감정 변화에 미치는 흐름을 살펴봅니다.',
  },
  {
    id: 'mood',
    label: '감정이 흔들려요',
    helper: '이유 없이 예민하거나 마음이 가라앉는 날',
    icon: Waves,
    next: '수면 부족, 스트레스, 몸의 리듬 변화가 겹친 지점을 정리합니다.',
  },
  {
    id: 'brain-fog',
    label: '머리가 흐려요',
    helper: '집중력, 기억력, 아침 피로가 신경 쓰이는 변화',
    icon: Brain,
    next: '기억력과 피로감을 수면 회복 관점에서 함께 봅니다.',
  },
];

const WHAT_YOU_GET = [
  {
    icon: CheckCircle2,
    title: '내 변화 패턴',
    desc: '수면, 열감, 감정 변화를 한 번에 정리해 지금의 상태를 이해합니다.',
  },
  {
    icon: Users,
    title: '로그인 후 열리는 연결',
    desc: '체크인 이후 필요한 경우에만 비슷한 경험의 이야기와 커뮤니티로 이어집니다.',
  },
  {
    icon: Sparkles,
    title: '개인화된 루틴',
    desc: '수면 레시피와 루틴은 로그인 후 내 체크인 결과에 맞춰 보여줍니다.',
  },
];

export default function ContentQuickAccess() {
  const [activeConcern, setActiveConcern] = useState<ConcernId>('night-waking');
  const active = CONCERNS.find((item) => item.id === activeConcern) ?? CONCERNS[0];
  const ActiveIcon = active.icon;

  return (
    <section id="landing-content" className="bg-hlk-surface px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-hlk-primary">먼저 지금의 나를 골라보세요</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-normal text-hlk-text md:text-[2.7rem]">
            어떤 변화가 가장 신경 쓰이나요?
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-hlk-text-secondary md:text-lg">
            잠, 열감, 감정, 집중력처럼 흩어진 변화를 하나씩 고르며 시작합니다.
            선택은 진단이 아니라 지금의 나를 이해하기 위한 작은 문입니다.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {CONCERNS.map((concern) => {
            const Icon = concern.icon;
            const isActive = activeConcern === concern.id;
            return (
              <button
                key={concern.id}
                type="button"
                onClick={() => setActiveConcern(concern.id)}
                className={`rounded-2xl border p-5 text-left transition-all ${
                  isActive
                    ? 'border-hlk-primary bg-hlk-primary text-white shadow-soft-md'
                    : 'border-hlk-border bg-white text-hlk-text hover:border-hlk-primary/40'
                }`}
              >
                <Icon className={`mb-5 h-7 w-7 ${isActive ? 'text-white' : 'text-hlk-primary'}`} aria-hidden />
                <p className="text-base font-bold">{concern.label}</p>
                <p className={`mt-2 text-sm leading-relaxed ${isActive ? 'text-white/75' : 'text-hlk-text-tertiary'}`}>
                  {concern.helper}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="rounded-[24px] border border-hlk-border bg-hlk-bg p-6 md:p-8">
            <p className="text-sm font-semibold text-hlk-clay">체크인 후 받을 수 있는 것</p>
            <div className="mt-6 space-y-5">
              {WHAT_YOU_GET.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-hlk-primary shadow-soft-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-bold text-hlk-text">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-hlk-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/checkin"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-hlk-clay px-6 py-3.5 font-semibold text-white hover:bg-hlk-clay-dark"
            >
              나의 변화 체크하기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>

          <div className="rounded-[24px] border border-hlk-border bg-white p-6 md:p-8">
            <p className="text-sm font-semibold text-hlk-primary">공개 홈에서는 여기까지만 보여줍니다</p>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-hlk-text md:text-3xl">
              먼저 체크인하고,
              <br />
              그다음 필요한 것만 엽니다
            </h3>
            <p className="mt-5 text-base leading-[1.8] text-hlk-text-secondary">
              HERLYKKE의 공개 홈페이지는 콘텐츠를 먼저 쏟아내지 않습니다. 지금 가장 가까운 변화를 고르고,
              체크인 결과를 본 뒤에 수면 레시피, 커뮤니티, 읽을거리가 자연스럽게 연결됩니다.
            </p>

            <div className="mt-8 rounded-[22px] bg-hlk-primary-light/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hlk-primary">Selected signal</p>
              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-hlk-primary shadow-soft-sm">
                  <ActiveIcon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <p className="font-extrabold text-hlk-text">{active.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-hlk-text-secondary">{active.next}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['체크인', '결과 확인', '로그인 후 맞춤 경험'].map((step, index) => (
                <div key={step} className="rounded-2xl border border-hlk-border bg-hlk-surface px-4 py-4 text-center">
                  <p className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-hlk-clay text-sm font-bold text-white">
                    {index + 1}
                  </p>
                  <p className="text-sm font-bold text-hlk-text">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

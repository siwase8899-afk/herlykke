'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Progressive Disclosure: 접힌 상태(고민) → 펼친 상태(여정 Before→HERLYKKE→After)
const personas = [
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    name: '지은',
    role: 'IT기업 마케팅 팀장',
    age: '44세, 워킹맘',
    pain: '회의 중 갑자기 얼굴이 빨개지고, 생리가 불규칙해졌는데 이게 갱년기인지 모르겠어요.',
    need: '내 상태 파악하기',
    needHref: '/checkin',
    bgColor: 'bg-hlk-primary-light',
    accentColor: 'text-hlk-primary',
    borderColor: 'border-hlk-primary',
    benchmark: '폐경이행기 초기',
    journey: {
      before: '회의 중 갑자기 열이 오르고, 생리 주기가 들쭉날쭉. 검색하면 건기식 광고뿐, 병원에서는 "다 그래요".',
      herlykke: [
        '3분 체크인으로 폐경이행기 초기 확인',
        '매일 증상 기록 시작 — 열감·스트레스 연결 패턴 발견',
      ],
      after: '회의 전 호흡법으로 대처 가능. 내 몸의 신호를 읽을 수 있게 됐어요.',
      duration: '4주',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
    name: '수진',
    role: '프리랜서 번역가',
    age: '51세, 1인가구',
    pain: '우울, 불안, 불면이 심한데 혼자 겪으니 너무 외로워요. 내 감정이 갱년기 때문인지 알고 싶어요.',
    need: '같은 동료 찾기',
    needHref: '/community',
    bgColor: 'bg-hlk-accent-light',
    accentColor: 'text-hlk-accent',
    borderColor: 'border-hlk-accent',
    benchmark: '폐경 전후',
    journey: {
      before: '혼자 사니까 말할 곳이 없었어요. 우울한 건지 갱년기인지 구분도 안 되고, 새벽마다 깨서 천장만 봤어요.',
      herlykke: [
        '카톡 토크방에서 같은 증상의 동료 발견',
        '감정 기록 → AI 분석으로 "이 시기의 우울"과 연관성 확인',
      ],
      after: '같은 증상 친구 3명이 생겼어요. 새벽에 깨도 토크방에 한마디 하면 아침에 답장이 와 있어요.',
      duration: '6주',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    name: '미영',
    role: '최근 퇴직',
    age: '57세, 자녀 독립',
    pain: '증상은 좀 나아졌는데 관절통이 남아있고, 퇴직 후 정체성 혼란이 와요.',
    need: '맞춤 솔루션 찾기',
    needHref: '/solutions',
    bgColor: 'bg-hlk-secondary-light',
    accentColor: 'text-hlk-secondary',
    borderColor: 'border-hlk-secondary',
    benchmark: '폐경 후기',
    journey: {
      before: '열감은 줄었는데 관절이 아파서 계단이 무서워요. 퇴직 후 "나는 뭐 하는 사람이지?" 혼란이 왔어요.',
      herlykke: [
        '솔루션에서 관절 관리 프로그램 시작',
        '토크방에서 후배들에게 경험 공유하며 멘토 역할',
      ],
      after: '맞춤 운동 루틴으로 관절통 관리 중. 토크방 멘토 활동이 새로운 보람이 됐어요.',
      duration: '8주',
    },
  },
];

export function PersonaCards() {
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className={`px-6 md:px-8 py-16 md:py-24 bg-hlk-bg ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-hlk-secondary-light text-hlk-secondary text-sm font-semibold rounded-full mb-4">
            <span className="flex -space-x-1">
              <span className="w-2 h-2 bg-hlk-primary rounded-full" />
              <span className="w-2 h-2 bg-hlk-accent rounded-full" />
              <span className="w-2 h-2 bg-hlk-primary rounded-full" />
            </span>
            이런 분들을 위해 만들었어요
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text mb-4">
            혹시 나의 이야기인가요?
          </h2>
          <p className="text-lg text-hlk-text-secondary">
            카드를 탭하면 비슷한 분의 <span className="text-hlk-accent font-semibold">실제 여정</span>을 볼 수 있어요
          </p>
        </div>

        {/* Persona cards - Progressive Disclosure */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {personas.map((p) => {
            const isExpanded = expandedPersona === p.name;

            return (
              <div
                key={p.name}
                className={`bg-white rounded-2xl border p-8 transition-all duration-500 cursor-pointer ${
                  isExpanded
                    ? `${p.borderColor} shadow-xl`
                    : 'border-hlk-border hover:shadow-xl hover:border-hlk-primary/20 hover:-translate-y-1'
                }`}
                onClick={() => setExpandedPersona(isExpanded ? null : p.name)}
              >
                {/* 프로필 헤더 */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${
                    isExpanded ? p.borderColor : 'border-hlk-border'
                  }`}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-hlk-text">{p.name} · {p.age}</div>
                    <div className="text-xs text-hlk-text-tertiary">{p.role}</div>
                  </div>
                  <span className={`ml-auto text-[10px] px-2 py-1 ${p.bgColor} ${p.accentColor} rounded-full font-medium`}>
                    {p.benchmark}
                  </span>
                </div>

                {/* 고민 */}
                <p className="text-sm text-hlk-text-secondary leading-relaxed mb-4">
                  &ldquo;{p.pain}&rdquo;
                </p>

                {/* 펼침 힌트 / 접기 표시 */}
                {!isExpanded && (
                  <div className="flex items-center justify-between">
                    <Link
                      href={p.needHref}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-2 text-xs font-semibold ${p.accentColor} px-3 py-1.5 ${p.bgColor} rounded-full hover:opacity-80 transition-opacity`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      {p.need}
                    </Link>
                    <span className="text-[11px] text-hlk-text-tertiary">
                      여정 보기
                      <svg className="w-3 h-3 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                )}

                {/* 여정 — 펼쳤을 때만 */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-hlk-border space-y-5">
                    {/* BEFORE */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-hlk-text-tertiary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-hlk-text-tertiary">B</span>
                        </div>
                        <div className="w-px flex-1 bg-hlk-border mt-1" />
                      </div>
                      <div className="pb-2">
                        <p className="text-[11px] font-semibold text-hlk-text-tertiary uppercase tracking-wider mb-1">Before</p>
                        <p className="text-sm text-hlk-text-secondary leading-relaxed">{p.journey.before}</p>
                      </div>
                    </div>

                    {/* HERLYKKE */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full ${p.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-[10px] font-bold ${p.accentColor}`}>H</span>
                        </div>
                        <div className="w-px flex-1 bg-hlk-border mt-1" />
                      </div>
                      <div className="pb-2">
                        <p className={`text-[11px] font-semibold ${p.accentColor} uppercase tracking-wider mb-1`}>HERLYKKE 시작</p>
                        <ul className="space-y-1.5">
                          {p.journey.herlykke.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-hlk-text leading-relaxed">
                              <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.accentColor}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* AFTER */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-hlk-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-hlk-accent">!</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[11px] font-semibold text-hlk-accent uppercase tracking-wider">After {p.journey.duration}</p>
                        </div>
                        <p className="text-sm font-medium text-hlk-text leading-relaxed">{p.journey.after}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={p.needHref}
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center justify-center gap-2 w-full py-3 ${p.bgColor} ${p.accentColor} font-semibold text-sm rounded-xl hover:opacity-80 transition-opacity`}
                    >
                      {p.need}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>

                    {/* 접기 */}
                    <p className="text-center text-[11px] text-hlk-text-tertiary">
                      탭해서 접기
                      <svg className="w-3 h-3 inline ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

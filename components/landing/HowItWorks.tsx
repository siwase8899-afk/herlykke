import Link from 'next/link';

// SVG Icons as components
const ChecklistIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const journey = [
  {
    step: '01',
    title: '내 상태 체크인',
    desc: '3분이면 충분해요. 지금 몸과 마음이 보내는 신호를 확인해요.',
    detail: '신체 증상 + 감정 변화 + 생활 패턴',
    Icon: ChecklistIcon,
    color: 'bg-alma-primary',
    href: '/log',
  },
  {
    step: '02',
    title: 'AI 맞춤 인사이트',
    desc: '기록을 분석해서 나만의 패턴을 찾고 맞춤 조언을 받아요.',
    detail: '패턴 분석 · 주간 리포트 · 맞춤 조언',
    Icon: SparklesIcon,
    color: 'bg-alma-accent',
    href: '/insights',
  },
  {
    step: '03',
    title: '커뮤니티에서 나누기',
    desc: '익명으로 편하게. 공감과 해결책을 함께 찾아요.',
    detail: '여성 전용 · 완전 익명 · 큐레이션된 대화',
    Icon: ChatIcon,
    color: 'bg-alma-secondary',
    href: '/community',
  },
  {
    step: '04',
    title: '나만의 대시보드',
    desc: '기록 현황, 통계, 인사이트를 한눈에 확인해요.',
    detail: '기록 히스토리 · 통계 분석 · 맞춤 추천',
    Icon: UsersIcon,
    color: 'bg-gradient-to-r from-alma-primary to-alma-accent',
    href: '/dashboard',
  },
];

const solutions = [
  { label: '명상/요가', desc: '마음 챙김' },
  { label: '운동 프로그램', desc: '신체 활력' },
  { label: '영양제/건기식', desc: '맞춤 보충' },
  { label: '전문 상담', desc: '심리 케어' },
  { label: '라이프스타일', desc: '슬립테크 등' },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-alma-accent-light text-alma-accent-dark text-sm font-semibold rounded-full mb-4">
            ALMA와 함께하는 여정
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text mb-4">
            혼자 고민하지 마세요.
            <br />
            <span className="text-alma-primary">같이 해결해요.</span>
          </h2>
        </div>

        {/* Journey Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {journey.map((item, i) => (
            <Link
              key={item.step}
              href={item.href}
              className="relative bg-alma-bg rounded-2xl p-6 border border-alma-border hover:shadow-lg hover:border-alma-primary/30 transition-all group cursor-pointer"
            >
              {/* Step number */}
              <div className={`absolute -top-3 -left-1 px-3 py-1 ${item.color} rounded-lg text-white text-xs font-bold shadow-md`}>
                STEP {item.step}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-alma-border flex items-center justify-center mb-4 mt-2 text-alma-text group-hover:text-alma-primary transition-colors">
                <item.Icon />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-alma-text mb-2 group-hover:text-alma-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-alma-text-secondary leading-relaxed mb-3">
                {item.desc}
              </p>
              <p className="text-xs text-alma-text-tertiary">
                {item.detail}
              </p>

              {/* Click indicator */}
              <div className="mt-4 flex items-center text-xs font-medium text-alma-primary opacity-0 group-hover:opacity-100 transition-opacity">
                바로가기
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Connector arrow (desktop) */}
              {i < journey.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-alma-primary/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-alma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Solutions Preview */}
        <div className="bg-gradient-to-br from-alma-primary-light via-white to-alma-accent-light rounded-3xl p-8 md:p-10 border border-alma-border">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-alma-text mb-2">
              나에게 맞는 솔루션을 찾아드려요
            </h3>
            <p className="text-sm text-alma-text-secondary">
              체크인 결과를 기반으로 초개인화된 웰니스 솔루션을 추천해요
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {solutions.map((sol) => (
              <div
                key={sol.label}
                className="px-5 py-3 bg-white rounded-full border border-alma-border hover:border-alma-primary hover:shadow-md transition-all cursor-pointer"
              >
                <p className="text-sm font-medium text-alma-text">{sol.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/checkin"
            className="inline-flex items-center justify-center px-8 py-4 bg-alma-primary text-white text-base font-bold rounded-full hover:bg-alma-primary-dark active:scale-[0.98] transition-all shadow-lg shadow-alma-primary/30"
          >
            지금 바로 시작하기
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

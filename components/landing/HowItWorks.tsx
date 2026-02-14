import Link from 'next/link';

// Becca의 사용자 여정: 체크인 → 기록 → 매칭 → 커뮤니티 → 솔루션
const journey = [
  {
    step: '01',
    title: '내 상태 체크인',
    desc: '3분이면 충분해요. 지금 몸과 마음이 보내는 신호를 확인해요.',
    detail: '신체 증상 + 감정 변화 + 생활 패턴',
    emoji: '📋',
    color: 'bg-alma-primary-dark',
  },
  {
    step: '02',
    title: '나와 비슷한 친구 찾기',
    desc: '비슷한 증상, 비슷한 상황의 여성들과 매칭돼요.',
    detail: '같은 단계 · 같은 고민 · 안전한 연결',
    emoji: '🤝',
    color: 'bg-alma-accent-dark',
  },
  {
    step: '03',
    title: '커뮤니티에서 나누기',
    desc: '익명으로 편하게. 공감과 해결책을 함께 찾아요.',
    detail: '여성 전용 · 완전 익명 · 큐레이션된 대화',
    emoji: '💬',
    color: 'bg-alma-secondary',
  },
  {
    step: '04',
    title: '나에게 맞는 솔루션',
    desc: '명상, 운동, 상담, 제품까지. 내 상태에 딱 맞는 방법을 찾아요.',
    detail: '초개인화 추천 · 전문가 연결 · 큐레이션 커머스',
    emoji: '✨',
    color: 'bg-gradient-to-r from-alma-primary-dark to-alma-secondary',
  },
];

const solutions = [
  { icon: '🧘', label: '명상/요가', desc: '마음 챙김' },
  { icon: '🏃', label: '운동 프로그램', desc: '신체 활력' },
  { icon: '💊', label: '영양제/건기식', desc: '맞춤 보충' },
  { icon: '👩‍⚕️', label: '전문 상담', desc: '심리 케어' },
  { icon: '🛍️', label: '라이프스타일', desc: '슬립테크 등' },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-20 bg-alma-surface">
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
            <div
              key={item.step}
              className="relative bg-alma-bg rounded-2xl p-6 border border-alma-border hover:shadow-lg transition-all group"
            >
              {/* Step number */}
              <div className={`absolute -top-3 -left-1 px-3 py-1 ${item.color} rounded-lg text-white text-xs font-bold shadow-md`}>
                STEP {item.step}
              </div>

              {/* Emoji */}
              <div className="text-4xl mb-4 mt-2 group-hover:scale-110 transition-transform">
                {item.emoji}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-alma-text mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-alma-text-secondary leading-relaxed mb-3">
                {item.desc}
              </p>
              <p className="text-xs text-alma-text-tertiary">
                {item.detail}
              </p>

              {/* Connector arrow (desktop) */}
              {i < journey.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-alma-border flex items-center justify-center">
                    <svg className="w-3 h-3 text-alma-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Solutions Preview */}
        <div className="bg-gradient-to-br from-alma-primary-light/50 to-alma-accent-light/50 rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-alma-text mb-2">
              나에게 맞는 솔루션을 찾아드려요
            </h3>
            <p className="text-sm text-alma-text-secondary">
              체크인 결과를 기반으로 초개인화된 웰니스 솔루션을 추천해요
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {solutions.map((sol) => (
              <div
                key={sol.label}
                className="flex items-center gap-3 px-5 py-3 bg-alma-surface rounded-xl border border-alma-border hover:shadow-md transition-all"
              >
                <span className="text-2xl">{sol.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-alma-text">{sol.label}</p>
                  <p className="text-xs text-alma-text-tertiary">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/checkin"
            className="inline-flex items-center justify-center px-8 py-4 bg-alma-secondary text-white text-base font-semibold rounded-xl hover:bg-alma-secondary/90 active:scale-[0.98] transition-all shadow-lg shadow-alma-secondary/20"
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

'use client';

import Link from 'next/link';

const SLEEP_TAGS = ['#새벽각성', '#열감', '#잠들기힘들어', '#수면부족', '#피로'];

export default function CheckinIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hlk-primary-light via-hlk-bg to-hlk-accent-light flex flex-col">
      <div className="max-w-md mx-auto px-6 py-10 flex-1 flex flex-col">
        {/* Back */}
        <Link href="/" className="inline-flex items-center text-hlk-text-secondary hover:text-hlk-text mb-10 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로
        </Link>

        <div className="flex-1 flex flex-col justify-center">
          {/* 아이콘 */}
          <div className="text-6xl text-center mb-6">🌙</div>

          {/* 헤딩 */}
          <h1 className="text-3xl font-bold text-hlk-text text-center leading-snug mb-3">
            내 수면 상태
            <br />
            확인해볼까요?
          </h1>
          <p className="text-hlk-text-secondary text-center leading-relaxed mb-8">
            5가지 질문으로 수면 유형을 파악하고
            <br />
            맞는 레시피를 추천해 드려요.
          </p>

          {/* 공감 태그 */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {SLEEP_TAGS.map((tag) => (
              <span key={tag} className="text-sm text-hlk-text-secondary bg-white px-3 py-1.5 rounded-full border border-hlk-border">
                {tag}
              </span>
            ))}
          </div>

          {/* 안내 정보 */}
          <div className="space-y-3 mb-10">
            {[
              { emoji: '⏱️', text: '1분이면 충분해요' },
              { emoji: '🔒', text: '로그인 없이 · 닉네임으로 활동' },
              { emoji: '✨', text: '맞춤 수면 레시피 즉시 확인' },
              { emoji: '🧠', text: '갱년기 신호도 자연스럽게 파악' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-hlk-border">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm text-hlk-text-secondary">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/checkin/1"
            className="w-full flex items-center justify-center gap-2 py-4 bg-hlk-primary text-white text-lg font-semibold rounded-2xl hover:bg-hlk-primary-dark transition-all duration-300 shadow-lg shadow-hlk-primary/20"
          >
            🌙 수면 체크인 시작하기
          </Link>
          <p className="text-center text-hlk-text-tertiary text-xs mt-4">
            가입 없이 · 1분 소요 · 무료
          </p>
        </div>
      </div>
    </div>
  );
}

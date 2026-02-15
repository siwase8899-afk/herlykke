import Image from 'next/image';

export function FounderSection() {
  return (
    <section className="px-6 md:px-8 py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-alma-primary-light text-alma-primary text-sm font-semibold rounded-full mb-4">
            왜 ALMA를 만들었나요?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text mb-4">
            창업자의 이야기
          </h2>
          <p className="text-lg text-alma-text-secondary">
            <span className="text-alma-accent font-semibold">딸을 위해</span>,
            <span className="text-alma-primary font-semibold"> 나를 위해</span>,
            <span className="text-alma-accent font-semibold"> 어머니를 위해</span> —
            모든 세대의 여성을 위해
          </p>
        </div>

        {/* Founder card */}
        <div className="bg-gradient-to-br from-alma-primary-light/50 via-white to-alma-accent-light/50 rounded-3xl p-8 md:p-12 border border-alma-border shadow-sm">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar and info */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face"
                  alt="Becca - ALMA Founder"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <p className="text-xl font-bold text-alma-text">Becca</p>
                <p className="text-sm text-alma-text-secondary">ALMA 대표</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <span className="text-xs px-3 py-1 bg-alma-primary text-white font-medium rounded-full">40대</span>
                  <span className="text-xs px-3 py-1 bg-alma-accent text-white font-medium rounded-full">갱년기 당사자</span>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1">
              <blockquote className="text-base md:text-lg text-alma-text leading-[1.9] space-y-4">
                <p>
                  &ldquo;어느 날 갑자기 열감이 올라오고, 이유 없이 눈물이 났어요.
                  검색해봐도 건기식 광고뿐이고, 주변에 말하기도 어려웠어요.
                </p>
                <p>
                  <span className="text-alma-primary font-semibold">20년간 40-50대 여성분들과 직접 소통하며 일해왔는데,</span>{' '}
                  이 세대 여성들이 갱년기를 얼마나 혼자 겪고 있는지 알게 됐어요.
                </p>
                <p>
                  갱년기는 끝이 아니에요.{' '}
                  <span className="inline-block px-4 py-1.5 bg-alma-accent text-white rounded-lg font-bold">
                    두 번째 삶의 시작
                  </span>
                  이에요. 혼자 겪을 필요 없다는 걸 알려드리고 싶어서 ALMA를 만들었습니다.&rdquo;
                </p>
              </blockquote>

              {/* Credentials */}
              <div className="mt-8 pt-6 border-t border-alma-border">
                <p className="text-sm text-alma-text-tertiary mb-3 font-medium">경력</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm px-4 py-2 bg-alma-bg rounded-full text-alma-text-secondary font-medium">
                    마케팅/브랜딩 20년+
                  </span>
                  <span className="text-sm px-4 py-2 bg-alma-bg rounded-full text-alma-text-secondary font-medium">
                    40-50대 여성 소통 8년
                  </span>
                  <span className="text-sm px-4 py-2 bg-alma-bg rounded-full text-alma-text-secondary font-medium">
                    스타트업 창업자
                  </span>
                </div>
              </div>

              {/* ALMA의 3가지 약속 */}
              <div className="mt-8 pt-6 border-t border-alma-border">
                <p className="text-sm font-bold text-alma-text mb-4">ALMA의 약속</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-alma-primary-light rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-alma-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium text-alma-text">진짜 정보만</p>
                      <p className="text-xs text-alma-text-tertiary">광고 아닌 실제 경험</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-alma-primary-light rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-alma-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium text-alma-text">완전한 익명</p>
                      <p className="text-xs text-alma-text-tertiary">100% 프라이버시 보장</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-alma-accent-light rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-alma-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium text-alma-text">당사자가 만든 서비스</p>
                      <p className="text-xs text-alma-text-tertiary">갱년기를 직접 겪는 사람이</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

export function FounderSection() {
  return (
    <section className="px-5 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-alma-primary-light text-alma-primary text-sm font-semibold rounded-full mb-4">
            왜 ALMA를 만들었나요?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-alma-text">
            창업자의 이야기
          </h2>
        </div>

        {/* Founder card */}
        <div className="bg-gradient-to-br from-alma-primary-light/50 via-white to-alma-accent-light/50 rounded-3xl p-8 md:p-12 border border-alma-border shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar and info */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face"
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
                  <span className="inline-block px-4 py-1.5 bg-alma-primary text-white rounded-lg font-bold">
                    혼자 겪을 필요 없다는 걸 알려드리고 싶어서
                  </span>
                  {' '}ALMA를 만들었습니다.&rdquo;
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

              {/* ALMA의 약속 — Elektra Core Values 한국화 */}
              <div className="mt-8 pt-6 border-t border-alma-border">
                <p className="text-sm text-alma-text-tertiary mb-4 font-medium">ALMA의 약속</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-alma-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-alma-primary" />
                    진짜 정보만
                  </div>
                  <div className="flex items-center gap-2 text-sm text-alma-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-alma-primary" />
                    완전한 익명
                  </div>
                  <div className="flex items-center gap-2 text-sm text-alma-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-alma-accent" />
                    광고 없는 공간
                  </div>
                  <div className="flex items-center gap-2 text-sm text-alma-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-alma-accent" />
                    데이터 기반 맞춤
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

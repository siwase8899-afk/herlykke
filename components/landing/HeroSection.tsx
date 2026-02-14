'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Light purple background - Badoo style */}
      <div className="bg-alma-primary-light">
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {/* Main headline - Big, bold, friendly */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-alma-primary leading-[1.1] mb-6">
                나만 그런 거 아니었어.
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-alma-text-secondary leading-relaxed mb-8">
                묻어 두었던 이야기,
                <br />
                비슷한 친구들과 편하게 나눠요.
              </p>

              {/* CTA */}
              <Link
                href="/checkin"
                className="inline-flex items-center justify-center px-8 py-4 bg-alma-secondary text-white font-semibold rounded-full hover:bg-alma-secondary/90 active:scale-[0.98] transition-all shadow-lg"
              >
                시작하기
              </Link>

              {/* Trust text */}
              <p className="mt-6 text-sm text-alma-text-tertiary">
                3분이면 충분해요 · 100% 무료 · 850만 여성이 함께해요
              </p>
            </div>

            {/* Right: Citrus Character Illustration */}
            <div className="relative hidden md:flex justify-center">
              {/* Warm gradient background */}
              <div className="absolute w-80 h-80 bg-alma-primary/30 rounded-full blur-3xl" />

              {/* Citrus Woman Character */}
              <div className="relative z-10">
                {/* Main character container */}
                <div className="relative w-72 h-80">
                  {/* Orange slice background - hair/halo */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56">
                    {/* Orange outer ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-alma-primary via-amber-400 to-orange-400 shadow-xl" />
                    {/* Orange inner */}
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-amber-200 to-orange-300" />
                    {/* Orange segments */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#f5e6c8" strokeWidth="1" />
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <line
                          key={angle}
                          x1="50"
                          y1="50"
                          x2={50 + 42 * Math.cos((angle * Math.PI) / 180)}
                          y2={50 + 42 * Math.sin((angle * Math.PI) / 180)}
                          stroke="#f5e6c8"
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Woman face */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-40 h-48">
                    {/* Face */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-40 bg-gradient-to-b from-amber-100 to-amber-200 rounded-[50%_50%_45%_45%] shadow-lg" />
                    {/* Hair */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-36 h-20 bg-alma-secondary rounded-t-full" />
                    {/* Eyes */}
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 flex gap-6">
                      <div className="w-3 h-4 bg-alma-text rounded-full" />
                      <div className="w-3 h-4 bg-alma-text rounded-full" />
                    </div>
                    {/* Smile */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-8 h-4 border-b-[3px] border-alma-text rounded-b-full" />
                    {/* Cheeks - citrus colored */}
                    <div className="absolute top-20 left-6 w-5 h-3 bg-alma-primary/40 rounded-full" />
                    <div className="absolute top-20 right-6 w-5 h-3 bg-alma-primary/40 rounded-full" />
                  </div>

                  {/* Small citrus decorations */}
                  <div className="absolute top-8 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 shadow-md flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-yellow-100" />
                  </div>
                  <div className="absolute bottom-24 left-0 w-6 h-6 rounded-full bg-gradient-to-br from-lime-300 to-green-400 shadow-md" />
                </div>

                {/* Floating badges */}
                <div className="absolute top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-md border border-alma-border">
                  <span className="text-sm font-medium text-alma-text">반가워요 👋</span>
                </div>
                <div className="absolute bottom-16 -left-8 bg-white px-4 py-2 rounded-full shadow-md border border-alma-border">
                  <span className="text-sm font-medium text-alma-text">나도 그래요 🍊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section - Cream */}
      <div className="bg-alma-surface-warm border-t border-alma-border">
        <div className="max-w-6xl mx-auto px-5 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-primary-dark">91%</p>
              <p className="text-sm text-alma-text-secondary mt-1">혼자 겪고 있어요</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-accent-dark">3분</p>
              <p className="text-sm text-alma-text-secondary mt-1">체크인 소요시간</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-alma-secondary">850만</p>
              <p className="text-sm text-alma-text-secondary mt-1">함께하는 여성</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

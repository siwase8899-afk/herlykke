import Link from 'next/link';

export function CTAFooter() {
  return (
    <section className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-alma-secondary via-alma-secondary to-[#3d3835] px-5 py-20">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-alma-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-alma-secondary-light mb-3">
            한국 갱년기 전용 디지털 커뮤니티, 처음입니다
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            나와 비슷한 여성들이
            <br />
            기다리고 있어요
          </h2>
          <p className="text-alma-secondary-light/80 mb-10">
            3분이면 충분해요. 지금 바로 시작해 보세요.
          </p>
          <Link
            href="/checkin"
            className="inline-flex items-center justify-center px-10 py-5 bg-alma-primary text-alma-text text-lg font-bold rounded-2xl hover:bg-alma-primary-dark active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/20"
          >
            무료 체크인 시작하기
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-alma-secondary-light/70">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              로그인 없이 바로 시작
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              완전 무료
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              여성 전용 커뮤니티
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              개인정보 암호화
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-alma-text px-5 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Logo and tagline */}
            <div>
              <p className="text-xl font-bold text-white mb-1">ALMA</p>
              <p className="text-sm text-gray-400">
                갱년기 여성의 두 번째 삶을 함께하는 커뮤니티
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/checkin" className="hover:text-white transition-colors">
                체크인
              </Link>
              <Link href="/community" className="hover:text-white transition-colors">
                커뮤니티
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-4">
              이 서비스는 의료 서비스가 아니며, 전문의 상담을 대체하지 않습니다.
              체크인 결과는 참고용이며, 정확한 진단을 위해서는 전문의 상담을 권장합니다.
            </p>
            <p className="text-xs text-gray-500">
              &copy; 2026 ALMA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}

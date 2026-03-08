import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-hlk-secondary px-6 md:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Logo and tagline */}
          <div>
            <p className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-display)]">
              HERLYKKE
            </p>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              잠을 되찾는 여정, 혼자 걷지 않아도 됩니다
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-white/70">
            <Link href="/checkin" className="hover:text-white transition-colors">
              수면 체크인
            </Link>
            <Link href="/recipes" className="hover:text-white transition-colors">
              수면 레시피
            </Link>
            <Link href="/community" className="hover:text-white transition-colors">
              커뮤니티
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-xs text-white/50 mb-3 leading-relaxed">
            이 서비스는 의료 서비스가 아니며, 전문의 상담을 대체하지 않습니다.
            체크인 결과는 참고용이며, 정확한 진단을 위해서는 전문의 상담을 권장합니다.
          </p>
          <p className="text-xs text-white/50">
            &copy; 2026 HERLYKKE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

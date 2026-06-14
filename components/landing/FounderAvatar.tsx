// 창업자(Becca) 손그림풍 일러스트 아바타.
// 사진 대신 사용하는 SVG 일러스트.
// 브랜드 톤(세이지 #6F9CA6 / 라벤더 #C9A6C9 / 따뜻한 크림)을 따른다.

export function FounderAvatar({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      role="img"
      aria-label="Becca, HERLYKKE 창업자 일러스트"
    >
      {/* 배경 — 따뜻한 크림 원 */}
      <circle cx="40" cy="40" r="40" fill="#F6EBDF" />

      {/* 어깨 / 상의 (어두운 톤) */}
      <path
        d="M12 80 C14 62 26 55 40 55 C54 55 66 62 68 80 Z"
        fill="#2E3A3D"
      />

      {/* 목 */}
      <path d="M34 49 H46 V57 C46 60 34 60 34 57 Z" fill="#EBC4A6" />
      <path d="M34 53 C37 56 43 56 46 53 L46 57 C43 59 37 59 34 57 Z" fill="#DDB196" opacity="0.6" />

      {/* 진주 목걸이 (사진 디테일 반영) */}
      {[30, 34, 38, 42, 46, 50].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={58 + Math.abs(i - 2.5) * 0.8}
          r="1.5"
          fill="#FBF7F2"
          stroke="#9FB9BE"
          strokeWidth="0.6"
        />
      ))}

      {/* 뒷머리 (단발) */}
      <path
        d="M21 38 C20 20 60 20 59 38 C59 47 55 52 50 53 C54 46 54 30 40 30 C26 30 26 46 30 53 C25 52 21 47 21 38 Z"
        fill="#3D3331"
      />

      {/* 얼굴 */}
      <ellipse cx="40" cy="37" rx="14.5" ry="16" fill="#F3D4BC" />

      {/* 앞머리 (자연스러운 사이드 뱅) */}
      <path
        d="M25 34 C25 22 55 22 55 34 C51 27 46 28 41 28 C38 28 33 27 30 30 C28 31 26 32 25 34 Z"
        fill="#3D3331"
      />

      {/* 볼 터치 (라벤더 톤) */}
      <circle cx="31" cy="42" r="2.6" fill="#C9A6C9" opacity="0.45" />
      <circle cx="49" cy="42" r="2.6" fill="#C9A6C9" opacity="0.45" />

      {/* 눈썹 */}
      <path d="M30 33.5 Q34 32 37.5 33.3" fill="none" stroke="#4A3F3A" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M42.5 33.3 Q46 32 50 33.5" fill="none" stroke="#4A3F3A" strokeWidth="1.1" strokeLinecap="round" />

      {/* 눈 — 평온하게 감은 곡선 (웰니스 톤) */}
      <path d="M30 37 Q33.5 39.5 37 37" fill="none" stroke="#4A3F3A" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M43 37 Q46.5 39.5 50 37" fill="none" stroke="#4A3F3A" strokeWidth="1.4" strokeLinecap="round" />

      {/* 코 */}
      <path d="M40 39 Q41.2 42 39.2 42.6" fill="none" stroke="#D9A98A" strokeWidth="1" strokeLinecap="round" />

      {/* 미소 */}
      <path d="M35.5 45.5 Q40 49 44.5 45.5" fill="none" stroke="#B5746A" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

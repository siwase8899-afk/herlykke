'use client';

import { Coffee, Leaf, Moon, NotebookPen, Sparkles, Wind } from 'lucide-react';

const MATE_PALETTES = [
  { bg: '#F6EBDF', face: '#F1C9AE', hair: '#3D3331', top: '#789986', line: '#4A3F3A' },
  { bg: '#DCE8DF', face: '#E8B999', hair: '#2E3A3D', top: '#F0642B', line: '#38443D' },
  { bg: '#EEE3F0', face: '#F3D4BC', hair: '#4A332B', top: '#6F89A8', line: '#3D3331' },
  { bg: '#F5D8C5', face: '#EBC4A6', hair: '#39333F', top: '#C9A6C9', line: '#4A332B' },
  { bg: '#FFF3E8', face: '#F1C4A8', hair: '#5A3B31', top: '#6F9F7A', line: '#4A3F3A' },
];

function hash(value = 'mate') {
  return value.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function MateAvatar({ seed = 'mate', size = 44, className = '' }: { seed?: string; size?: number; className?: string }) {
  const value = hash(seed);
  const palette = MATE_PALETTES[value % MATE_PALETTES.length];
  const shape = value % 4;
  const glasses = value % 5 === 0;
  const smile = value % 3 !== 0;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="메이트 일러스트">
      <rect x="0" y="0" width="64" height="64" rx={shape === 0 ? 20 : 32} fill={palette.bg} />
      <path
        d={shape % 2 === 0 ? 'M8 56 C13 43 24 38 32 38 C42 38 53 43 57 56 Z' : 'M6 58 C13 46 21 40 32 40 C43 40 51 46 58 58 Z'}
        fill={palette.top}
      />
      <path
        d={shape === 1 ? 'M14 31 C13 13 51 13 50 31 C50 39 45 44 39 46 C42 38 42 25 32 23 C22 25 22 38 25 46 C19 44 14 39 14 31 Z' : 'M15 32 C15 14 49 14 49 32 C49 40 44 45 39 46 C42 38 41 26 32 24 C23 26 22 38 25 46 C20 45 15 40 15 32 Z'}
        fill={palette.hair}
      />
      <ellipse cx="32" cy="31" rx="12" ry="13.5" fill={palette.face} />
      <path
        d={shape === 2 ? 'M20 27 C22 18 34 17 46 27 C38 23 28 22 20 27 Z' : 'M20 27 C22 19 42 18 45 27 C38 23 28 23 20 27 Z'}
        fill={palette.hair}
      />
      <circle cx="25" cy="35" r="2.3" fill="#E7A27B" opacity="0.38" />
      <circle cx="39" cy="35" r="2.3" fill="#E7A27B" opacity="0.38" />
      {glasses ? (
        <g fill="none" stroke={palette.line} strokeWidth="1.1">
          <circle cx="26.8" cy="31.5" r="3.2" />
          <circle cx="37.2" cy="31.5" r="3.2" />
          <path d="M30 31.5 H34" />
        </g>
      ) : (
        <>
          <path d="M24 31.5 Q26.5 33.2 29 31.5" fill="none" stroke={palette.line} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M35 31.5 Q37.5 33.2 40 31.5" fill="none" stroke={palette.line} strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
      <path d={smile ? 'M27 38 Q32 41 37 38' : 'M28 39 Q32 37 36 39'} fill="none" stroke="#B5746A" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M13 12 C18 8 25 8 30 11" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function CommunityNightScene({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 220" className={className} role="img" aria-label="수면 커뮤니티 일러스트">
      <defs>
        <linearGradient id="communityMoonGradient" x1="20%" x2="80%" y1="10%" y2="95%">
          <stop offset="0%" stopColor="#F5D8C5" />
          <stop offset="50%" stopColor="#DCE8DF" />
          <stop offset="100%" stopColor="#789986" />
        </linearGradient>
      </defs>
      <g className="community-scene-float">
        <ellipse cx="180" cy="188" rx="128" ry="22" fill="#2E3A3D" opacity="0.12" />
        <circle cx="180" cy="86" r="50" fill="url(#communityMoonGradient)" opacity="0.96" />
        <path d="M190 43 C171 54 164 82 176 106 C187 128 212 136 233 125 C219 144 188 148 164 131 C138 112 132 75 150 50 C160 37 174 30 190 29 C191 34 191 39 190 43 Z" fill="#5D7767" opacity="0.42" />
      </g>
      <g className="community-scene-bubbles" fill="#FFF7EF" opacity="0.92">
        <rect x="42" y="74" width="92" height="42" rx="18" />
        <rect x="226" y="90" width="92" height="42" rx="18" />
        <rect x="92" y="135" width="176" height="42" rx="20" />
      </g>
      <g fill="none" strokeLinecap="round">
        <path d="M64 94 H112" stroke="#789986" strokeWidth="4" opacity="0.52" />
        <path d="M246 110 H300" stroke="#F0642B" strokeWidth="4" opacity="0.42" />
        <path d="M118 156 H242" stroke="#C9A6C9" strokeWidth="4" opacity="0.46" />
        <path d="M34 44 C58 25 86 31 98 55" stroke="#F5D8C5" strokeWidth="5" opacity="0.56" />
        <path d="M278 48 C304 32 328 42 334 70" stroke="#DCE8DF" strokeWidth="5" opacity="0.62" />
      </g>
      <g className="community-scene-stars" fill="#FFF7EF">
        <circle cx="92" cy="32" r="3" opacity="0.7" />
        <circle cx="272" cy="30" r="2.2" opacity="0.62" />
        <circle cx="318" cy="152" r="2.6" opacity="0.5" />
        <circle cx="44" cy="154" r="2" opacity="0.48" />
      </g>
    </svg>
  );
}

const RECIPE_ICONS = [Leaf, Wind, Coffee, Moon, NotebookPen, Sparkles];

export function RecipeObject({ seed = 'recipe', size = 52 }: { seed?: string; size?: number }) {
  const value = hash(seed);
  const Icon = RECIPE_ICONS[value % RECIPE_ICONS.length];
  const variant = value % 4;

  if (variant === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="수면 레시피 일러스트">
        <rect x="8" y="10" width="48" height="42" rx="16" fill="#FFF7EF" />
        <path d="M19 43 C26 48 40 48 47 42" fill="none" stroke="#E5BD94" strokeWidth="5" strokeLinecap="round" />
        <path d="M16 23 H42" stroke="#789986" strokeWidth="4" strokeLinecap="round" opacity="0.72" />
        <path d="M16 31 H34" stroke="#D2A77A" strokeWidth="4" strokeLinecap="round" opacity="0.74" />
        <circle cx="46" cy="22" r="8" fill="#DCE8DF" />
        <foreignObject x="34" y="28" width="22" height="22">
          <div className="flex h-full w-full items-center justify-center text-hlk-primary">
            <Icon size={18} strokeWidth={1.8} />
          </div>
        </foreignObject>
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="수면 레시피 일러스트">
        <path d="M19 16 H45 C51 16 55 20 55 26 V46 C55 51 51 55 45 55 H19 C13 55 9 51 9 46 V26 C9 20 13 16 19 16 Z" fill="#F5D8C5" />
        <path d="M17 50 C24 41 42 41 49 49" fill="none" stroke="#FFF7EF" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
        <circle cx="24" cy="25" r="8" fill="#FFF7EF" opacity="0.92" />
        <circle cx="44" cy="30" r="6" fill="#DCE8DF" />
        <foreignObject x="22" y="31" width="26" height="26">
          <div className="flex h-full w-full items-center justify-center text-hlk-clay-dark">
            <Icon size={22} strokeWidth={1.8} />
          </div>
        </foreignObject>
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="수면 레시피 일러스트">
        <rect x="12" y="8" width="40" height="48" rx="13" fill="#DCE8DF" />
        <path d="M20 17 H44" stroke="#789986" strokeWidth="4" strokeLinecap="round" opacity="0.78" />
        <path d="M20 41 H36" stroke="#E5BD94" strokeWidth="5" strokeLinecap="round" />
        <path d="M44 32 C38 36 29 36 22 30" fill="none" stroke="#FFF7EF" strokeWidth="5" strokeLinecap="round" />
        <foreignObject x="20" y="21" width="24" height="24">
          <div className="flex h-full w-full items-center justify-center text-hlk-primary-dark">
            <Icon size={21} strokeWidth={1.8} />
          </div>
        </foreignObject>
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="수면 레시피 일러스트">
      <rect x="5" y="7" width="54" height="50" rx="18" fill="#FFF7EF" />
      <path d="M14 48 C22 54 42 54 50 46" fill="none" stroke="#F5D8C5" strokeWidth="5" strokeLinecap="round" />
      <circle cx="47" cy="18" r="8" fill="#DCE8DF" />
      <circle cx="20" cy="22" r="6" fill="#F5D8C5" />
      <foreignObject x="19" y="19" width="26" height="26">
        <div className="flex h-full w-full items-center justify-center text-hlk-primary">
          <Icon size={22} strokeWidth={1.8} />
        </div>
      </foreignObject>
    </svg>
  );
}

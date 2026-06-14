'use client';

type ExpertAvatarProps = {
  seed?: string;
  size?: number;
  className?: string;
  label?: string;
};

const PALETTES = [
  { bg: '#F6EBDF', hair: '#3D3331', top: '#6F9F7A', blush: '#DCA08A', line: '#4A3F3A' },
  { bg: '#DCE8DF', hair: '#2F3A34', top: '#F0642B', blush: '#C9A6C9', line: '#38443D' },
  { bg: '#F5D8C5', hair: '#4A332B', top: '#6F89A8', blush: '#E7A27B', line: '#4A332B' },
  { bg: '#EEE3F0', hair: '#39333F', top: '#789986', blush: '#F0B794', line: '#3D3331' },
];

function hashString(value = 'expert') {
  return value.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function ExpertAvatar({ seed = 'expert', size = 80, className = '', label = '전문가 일러스트' }: ExpertAvatarProps) {
  const hash = hashString(seed);
  const palette = PALETTES[hash % PALETTES.length];
  const hasGlasses = hash % 2 === 0;
  const shortHair = hash % 3 === 0;
  const sidePart = hash % 4 === 0;
  const portraitFrame = hash % 3;
  const accessory = hash % 5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      role="img"
      aria-label={label}
    >
      {portraitFrame === 0 ? (
        <circle cx="40" cy="40" r="40" fill={palette.bg} />
      ) : portraitFrame === 1 ? (
        <rect x="3" y="3" width="74" height="74" rx="24" fill={palette.bg} />
      ) : (
        <path d="M40 2 C61 2 78 18 78 40 C78 62 61 78 40 78 C18 78 2 62 2 40 C2 18 18 2 40 2 Z" fill={palette.bg} />
      )}
      <path
        d="M17 24 C26 10 54 10 63 25"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.48"
      />
      <path
        d="M14 59 C22 50 31 50 40 58 C49 66 58 66 66 56"
        fill="none"
        stroke={palette.blush}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.35"
      />

      {accessory === 0 && (
        <path d="M55 18 C61 20 64 25 63 31" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.54" />
      )}
      {accessory === 1 && (
        <g fill="#FFFFFF" opacity="0.52">
          <circle cx="18" cy="22" r="2" />
          <circle cx="63" cy="47" r="1.6" />
          <circle cx="56" cy="16" r="1.3" />
        </g>
      )}
      {accessory === 2 && (
        <path d="M16 19 C23 13 31 14 37 20" fill="none" stroke={palette.top} strokeWidth="2.6" strokeLinecap="round" opacity="0.38" />
      )}

      <path
        d="M13 80 C15 63 26 56 40 56 C54 56 65 63 67 80 Z"
        fill={palette.top}
      />
      <path d="M34 49 H46 V57 C46 60 34 60 34 57 Z" fill="#EBC4A6" />
      <path d="M34 53 C37 56 43 56 46 53 L46 57 C43 59 37 59 34 57 Z" fill="#DDB196" opacity="0.55" />

      {shortHair ? (
        <path
          d="M23 38 C20 21 60 21 57 39 C56 48 51 53 44 55 C49 47 50 32 40 29 C30 32 31 47 36 55 C29 53 24 48 23 38 Z"
          fill={palette.hair}
        />
      ) : hash % 7 === 0 ? (
        <path
          d="M18 39 C17 18 63 18 62 39 C62 55 55 64 47 65 C52 48 53 31 40 28 C27 31 28 48 33 65 C25 64 18 55 18 39 Z"
          fill={palette.hair}
        />
      ) : (
        <path
          d="M20 40 C17 19 63 18 60 40 C59 54 53 61 46 62 C51 50 53 31 40 28 C27 31 29 50 34 62 C27 61 21 54 20 40 Z"
          fill={palette.hair}
        />
      )}

      <ellipse cx="40" cy="38" rx="14.5" ry="16.2" fill="#F3D4BC" />
      <path
        d={sidePart
          ? 'M25 34 C29 24 41 21 56 34 C49 27 40 29 35 30 C31 31 28 32 25 34 Z'
          : 'M25 34 C25 23 55 23 55 34 C50 28 46 28 40 29 C34 28 30 28 25 34 Z'}
        fill={palette.hair}
      />

      <circle cx="31" cy="43" r="2.7" fill={palette.blush} opacity="0.42" />
      <circle cx="49" cy="43" r="2.7" fill={palette.blush} opacity="0.42" />

      <path d="M30 34 Q34 32.4 37.5 33.8" fill="none" stroke={palette.line} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M42.5 33.8 Q46 32.4 50 34" fill="none" stroke={palette.line} strokeWidth="1.1" strokeLinecap="round" />

      {hasGlasses ? (
        <g fill="none" stroke={palette.line} strokeWidth="1.2" opacity="0.9">
          <circle cx="33.5" cy="38" r="4" />
          <circle cx="46.5" cy="38" r="4" />
          <path d="M37.5 38 H42.5" />
        </g>
      ) : (
        <>
          <path d="M30.5 38 Q33.5 40 36.5 38" fill="none" stroke={palette.line} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M43.5 38 Q46.5 40 49.5 38" fill="none" stroke={palette.line} strokeWidth="1.35" strokeLinecap="round" />
        </>
      )}

      <path d="M40 39.5 Q41.2 42.5 39.2 43" fill="none" stroke="#D9A98A" strokeWidth="1" strokeLinecap="round" />
      <path d="M35.7 46 Q40 48.8 44.4 46" fill="none" stroke="#B5746A" strokeWidth="1.25" strokeLinecap="round" />

      <path
        d="M24 68 C30 64 50 64 56 68"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
}

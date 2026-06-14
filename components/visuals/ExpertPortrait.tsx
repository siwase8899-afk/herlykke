'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExpertAvatar } from '@/components/visuals/ExpertAvatar';
import type { Expert } from '@/lib/columnsData';

type ExpertPortraitProps = {
  expert: Expert;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
};

const SIZE_CLASS = {
  xs: 'h-8 w-8 rounded-xl',
  sm: 'h-10 w-10 rounded-xl',
  md: 'h-14 w-14 rounded-2xl',
  lg: 'h-16 w-16 rounded-2xl',
};

const PIXEL_SIZE = {
  xs: 32,
  sm: 40,
  md: 56,
  lg: 64,
};

export function ExpertPortrait({
  expert,
  size = 'sm',
  className = '',
  priority = false,
}: ExpertPortraitProps) {
  const [failed, setFailed] = useState(false);
  const pixelSize = PIXEL_SIZE[size];

  return (
    <div
      className={`${SIZE_CLASS[size]} relative shrink-0 overflow-hidden bg-hlk-primary-light ring-1 ring-white/80 shadow-[0_8px_24px_rgba(46,58,61,0.10)] ${className}`}
    >
      {!failed && expert.imageSrc ? (
        <Image
          src={expert.imageSrc}
          alt={`${expert.name} 전문가 가이드 일러스트`}
          fill
          sizes={`${pixelSize}px`}
          className="object-cover"
          priority={priority}
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <ExpertAvatar
          seed={expert.name}
          size={pixelSize}
          label={`${expert.name} 전문가 가이드 일러스트`}
        />
      )}
    </div>
  );
}

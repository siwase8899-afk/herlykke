'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  size?: 'narrow' | 'medium' | 'wide';
  padding?: 'normal' | 'compact';
  background?: 'default' | 'white' | 'warm' | 'dark';
}

const sizeMap = {
  narrow: 'max-w-3xl',
  medium: 'max-w-5xl',
  wide: 'max-w-6xl',
};

const paddingMap = {
  normal: 'py-24 md:py-32',
  compact: 'py-16 md:py-24',
};

const bgMap = {
  default: 'bg-alma-bg',
  white: 'bg-white',
  warm: 'bg-alma-surface-warm',
  dark: 'bg-alma-secondary text-white',
};

export function SectionWrapper({
  children,
  id,
  className = '',
  size = 'wide',
  padding = 'normal',
  background = 'default',
}: SectionWrapperProps) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id={id}
      className={`${bgMap[background]} ${paddingMap[padding]} ${className}`}
    >
      <div
        ref={ref}
        className={`${sizeMap[size]} mx-auto px-6 md:px-8 section-enter ${isVisible ? 'visible' : ''}`}
      >
        {children}
      </div>
    </section>
  );
}

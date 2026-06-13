'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  // C2MTL 인사이트: 물리 이징 + scaleY 배경 채움 효과
  const baseStyles = 'font-semibold rounded-full cursor-pointer inline-flex items-center justify-center btn-fill-hover';

  const variants = {
    primary: 'bg-hlk-clay text-white btn-fill-hover--primary hover:bg-hlk-clay-dark hover:-translate-y-0.5 active:scale-[0.98]',
    secondary: 'bg-white text-hlk-primary border-2 border-hlk-primary btn-fill-hover--secondary hover:-translate-y-0.5 active:scale-[0.98]',
    ghost: 'bg-transparent text-hlk-primary hover:bg-hlk-primary-light/50',
  };

  const sizes = {
    lg: 'px-8 py-4 text-lg w-full',
    md: 'px-6 py-3.5 text-base',
    sm: 'px-4 py-2.5 text-sm',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

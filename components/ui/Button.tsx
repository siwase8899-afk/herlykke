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
  const baseStyles = 'font-semibold rounded-full transition-all duration-200 cursor-pointer inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-alma-primary text-white hover:bg-alma-primary-dark active:scale-[0.98]',
    secondary: 'bg-white text-alma-primary border-2 border-alma-primary hover:bg-alma-primary-light active:scale-[0.98]',
    ghost: 'bg-transparent text-alma-primary hover:bg-alma-primary-light/50',
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

import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'text-link' | 'nav-active' | 'nav-inactive';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  className = '',
  disabled = false,
  children,
}) => {
  const baseStyles = 'transition-all duration-150 ease-in-out rounded-none outline-none font-sans';

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles =
        'w-full py-3 px-4 bg-primary-fixed-dim text-on-primary-fixed font-bold text-label-md hover:bg-primary-container uppercase tracking-wider';
      break;
    case 'outline':
      variantStyles =
        'px-4 py-2 border-2 border-primary-fixed-dim text-primary-fixed-dim font-bold text-label-sm hover:bg-primary-fixed-dim hover:text-on-primary-fixed uppercase tracking-wider';
      break;
    case 'text-link':
      variantStyles =
        'text-primary-fixed-dim font-bold text-label-md flex items-center gap-1 hover:underline uppercase tracking-widest bg-transparent p-0 border-none cursor-pointer';
      break;
    case 'nav-active':
      variantStyles =
        'w-full flex items-center gap-3 px-4 py-3 bg-secondary-container text-primary-fixed-dim font-medium border-l-4 border-primary-fixed-dim';
      break;
    case 'nav-inactive':
      variantStyles =
        'w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-primary-fixed';
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};

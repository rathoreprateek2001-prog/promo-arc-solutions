import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline-gold' | 'link';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asLink = false,
  href,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-10 px-6 text-[11px]',
    md: 'h-12 px-8 text-xs',
    lg: 'h-14 px-10 text-xs tracking-[0.25em]',
  }[size];

  const baseClasses = `relative inline-flex items-center justify-center font-sans uppercase font-medium tracking-[0.2em] transition-all overflow-hidden cursor-pointer select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A] disabled:opacity-50 disabled:pointer-events-none ${sizeClasses} ${className}`;

  if (variant === 'primary') {
    const primaryContent = (
      <>
        {/* Sliding Gold Layer */}
        <span
          className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          aria-hidden="true"
        />
        {/* Button Text on top */}
        <span className="relative z-10 text-white flex items-center gap-2">
          {children}
        </span>
      </>
    );

    if (asLink && href) {
      return (
        <a
          href={href}
          className={`group bg-[#1A1A1A] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] ${baseClasses}`}
        >
          {primaryContent}
        </a>
      );
    }

    return (
      <button
        className={`group bg-[#1A1A1A] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] ${baseClasses}`}
        {...props}
      >
        {primaryContent}
      </button>
    );
  }

  if (variant === 'secondary') {
    const secondaryClasses = `bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F8F6] duration-500 ${baseClasses}`;
    if (asLink && href) {
      return (
        <a href={href} className={secondaryClasses}>
          {children}
        </a>
      );
    }
    return (
      <button className={secondaryClasses} {...props}>
        {children}
      </button>
    );
  }

  if (variant === 'outline-gold') {
    const goldClasses = `bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A] duration-500 ${baseClasses}`;
    if (asLink && href) {
      return (
        <a href={href} className={goldClasses}>
          {children}
        </a>
      );
    }
    return (
      <button className={goldClasses} {...props}>
        {children}
      </button>
    );
  }

  // Link variant
  const linkClasses = `p-0 h-auto font-sans text-xs uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-500 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-500 ${className}`;
  if (asLink && href) {
    return (
      <a href={href} className={linkClasses}>
        {children}
      </a>
    );
  }
  return (
    <button className={linkClasses} {...props}>
      {children}
    </button>
  );
};

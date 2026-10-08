import React from 'react';

export interface SectionHeaderProps {
  overline?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = React.memo(({
  overline,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}>
      {overline && (
        <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
          <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#6C6863] font-medium">
            {overline}
          </span>
          <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
        </div>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.05] tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="font-sans text-[#6C6863] text-base md:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
});

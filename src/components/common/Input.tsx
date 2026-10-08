import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className = '',
  placeholder,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A] font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        placeholder={placeholder}
        className={`w-full h-12 bg-transparent border-0 border-b border-[#1A1A1A]/30 focus:border-[#D4AF37] focus:outline-none text-sm text-[#1A1A1A] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863]/70 transition-colors duration-500 py-2 px-0 ${
          error ? 'border-red-600' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 font-sans mt-1">{error}</p>}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  id,
  className = '',
  placeholder,
  rows = 4,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A] font-medium"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        placeholder={placeholder}
        className={`w-full bg-transparent border-0 border-b border-[#1A1A1A]/30 focus:border-[#D4AF37] focus:outline-none text-sm text-[#1A1A1A] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863]/70 transition-colors duration-500 py-2 px-0 resize-none ${
          error ? 'border-red-600' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 font-sans mt-1">{error}</p>}
    </div>
  );
};

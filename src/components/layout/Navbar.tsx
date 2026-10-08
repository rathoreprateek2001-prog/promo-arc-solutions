import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Platforms', href: '#platforms' },
    { label: 'Experience', href: '#experience' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Approach', href: '#approach' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-[background-color,box-shadow] duration-500">
      {/* Main Navbar */}
      <div 
        className={`w-full border-b border-[#1A1A1A]/10 transition-[background-color,box-shadow,padding] duration-500 ${
          isScrolled 
            ? 'bg-[#F9F8F6]/98 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-4' 
            : 'bg-[#F9F8F6] py-5 md:py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 flex items-center justify-between">
          {/* Masthead Brand */}
          <a href="#" className="group flex flex-col">
            <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] tracking-wider uppercase group-hover:text-[#D4AF37] transition-colors duration-500 font-normal">
              Promo Arc Solutions
            </span>
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#6C6863]">
              Virtual Assistance
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[11px] lg:text-xs uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-500 font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-500 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <Button variant="primary" size="sm" asLink href="#contact">
              Let's Work Together
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A] hover:text-[#D4AF37] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-1" /> : <Menu className="w-6 h-6 stroke-1" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F9F8F6] border-b border-[#1A1A1A]/20 px-8 py-8 space-y-6 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-xl text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-300 py-1 border-b border-[#1A1A1A]/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#1A1A1A]/10 space-y-4">
            <div className="text-xs font-sans text-[#6C6863]">
              Inquiries: <a href="mailto:eric@promoarcsolutions.in" className="text-[#1A1A1A]">eric@promoarcsolutions.in</a>
            </div>
            <div className="text-xs font-sans text-[#6C6863]">
              Direct: <a href="tel:+918890846737" className="text-[#1A1A1A]">+91 88908 46737</a>
            </div>
            <Button
              variant="primary"
              size="md"
              asLink
              href="#contact"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Work Together
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#F9F8F6] border-t border-[#1A1A1A] relative z-10">
      {/* Top Pre-Footer Editorial Statement */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-16 md:py-20 border-b border-[#F9F8F6]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D4AF37]" aria-hidden="true" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Virtual Assistance Architecture
              </span>
              <span className="h-px w-8 bg-[#D4AF37]" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F9F8F6] font-normal leading-[1.05]">
              Smarter Support for <span className="italic text-[#D4AF37]">Promotional Product</span> Businesses.
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-[#EBE5DE]/80 hover:text-[#D4AF37] transition-colors duration-500 py-3 border-b border-[#F9F8F6]/20 hover:border-[#D4AF37] cursor-pointer"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-4 h-4 stroke-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Colophon */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl tracking-wider uppercase text-[#F9F8F6]">
              Promo Arc Solutions
            </h3>
            <p className="font-sans text-sm text-[#EBE5DE]/70 leading-relaxed max-w-sm">
              Dedicated virtual assistance and creative support engineered specifically for distributors, suppliers, and decorators in the promotional product industry.
            </p>
            <div className="space-y-2 pt-2">
              <div className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                Core Competencies
              </div>
              <p className="font-sans text-xs text-[#EBE5DE]/60 leading-relaxed">
                Promotional Products • Operations • Client Support • Graphic Design • Vector Design
              </p>
            </div>
          </div>

          {/* Service Directory */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] pb-2 border-b border-[#F9F8F6]/10">
              Services
            </div>
            <ul className="space-y-2.5 font-sans text-xs text-[#EBE5DE]/80">
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Promotional Product Support</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Order Management</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Client Support</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Graphic Design</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Vector Design & Artwork</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Webstore Operations</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Reporting & Operations</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors duration-300">Social Media Support</a></li>
            </ul>
          </div>

          {/* Industry Platforms */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] pb-2 border-b border-[#F9F8F6]/10">
              Platforms
            </div>
            <ul className="space-y-2.5 font-sans text-xs text-[#EBE5DE]/80">
              <li>ASI / ESP</li>
              <li>SAGE</li>
              <li>Distributor Central</li>
              <li>Commonsku</li>
              <li>AIM</li>
              <li>Antera</li>
              <li>OpenCart</li>
              <li>Sprout Social</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] pb-2 border-b border-[#F9F8F6]/10">
              Direct Contact
            </div>
            <div className="space-y-4 font-sans text-xs text-[#EBE5DE]/80">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#EBE5DE]/40 mb-1">Electronic Mail</span>
                <a 
                  href="mailto:eric@promoarcsolutions.in" 
                  className="inline-flex items-center gap-2 text-sm text-[#F9F8F6] hover:text-[#D4AF37] transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  eric@promoarcsolutions.in
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#EBE5DE]/40 mb-1">Telephone</span>
                <a 
                  href="tel:+918890846737" 
                  className="inline-flex items-center gap-2 text-sm text-[#F9F8F6] hover:text-[#D4AF37] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  +91 88908 46737
                </a>
              </div>
              <div className="pt-2">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#EBE5DE]/40 mb-1">Operational Hours</span>
                <p className="text-xs text-[#EBE5DE]/60">
                  Coordinated across US Time Zones (EST / CST / PST) & Global standard hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colophon Bottom Bar */}
      <div className="border-t border-[#F9F8F6]/10 py-6 px-8 md:px-16 text-center md:text-left">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#EBE5DE]/50">
          <div>
            © {new Date().getFullYear()} Promo Arc Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Accuracy First</span>
            <span>•</span>
            <span>Reliable Workflows</span>
            <span>•</span>
            <span>Bespoke Assistance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

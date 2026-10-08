import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  const overlineRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          const y = window.scrollY;
          if (y <= 850) {
            const exitStart = 150;
            const exitDistance = 600;
            const progress = Math.min(Math.max((y - exitStart) / exitDistance, 0), 1);

            const panTransform = `translate3d(${-progress * 60}px, 0, 0)`;
            const panOpacity = String(Math.max(0, 1 - progress));

            if (overlineRef.current) {
              overlineRef.current.style.transform = panTransform;
              overlineRef.current.style.opacity = panOpacity;
            }
            if (leftColRef.current) {
              leftColRef.current.style.transform = panTransform;
              leftColRef.current.style.opacity = panOpacity;
            }
            if (rightColRef.current) {
              const scale = 1 + progress * 0.08;
              rightColRef.current.style.transform = `scale3d(${scale}, ${scale}, 1)`;
              rightColRef.current.style.opacity = panOpacity;
            }
          }
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-12 pb-24 md:pt-16 md:pb-32 px-8 md:px-16 overflow-hidden">
      {/* Container aligned to 1600px */}
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Editorial Overline (Pan Motion) */}
        <div 
          ref={overlineRef}
          className="flex items-center border-b border-[#1A1A1A]/15 pb-4 mb-12 md:mb-16"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
            <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#6C6863] font-medium">
              Virtual Assistance • Promotional Products
            </span>
            <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
          </div>
        </div>

        {/* Asymmetric 12-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (Columns 1-7): Pan Motion */}
          <div 
            ref={leftColRef}
            className="lg:col-span-7 space-y-8 md:space-y-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] 2xl:text-[6.25rem] text-[#1A1A1A] leading-[0.92] tracking-tight font-normal">
              Smarter Support for{' '}
              <span className="italic font-normal text-[#D4AF37] block sm:inline">
                Promotional Product
              </span>{' '}
              Businesses.
            </h1>

            <p className="font-sans text-base md:text-lg text-[#6C6863] leading-relaxed max-w-xl font-normal">
              Promo Arc Solutions provides reliable virtual assistance and creative support for the promotional product industry — helping businesses manage products, orders, clients, artwork, webstores, and day-to-day operations with greater accuracy and efficiency.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button variant="primary" size="lg" asLink href="#contact">
                Let's Work Together
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="secondary" size="lg" asLink href="#services">
                Explore Services
              </Button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-8 border-t border-[#1A1A1A]/10 grid grid-cols-3 gap-6 text-[#1A1A1A]">
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-[#1A1A1A]">2+</span>
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#6C6863]">Years Industry</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-[#1A1A1A]">10+</span>
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#6C6863]">US Accounts</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-[#1A1A1A]">100%</span>
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#6C6863]">Accuracy First</span>
              </div>
            </div>
          </div>

          {/* Right Column (Columns 8-12): Succession Motion Image Showcase */}
          <div 
            ref={rightColRef}
            className="lg:col-span-5 relative"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="group relative">
              {/* Main Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#1A1A1A]/10 bg-[#EBE5DE]">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                  alt="High-end promotional product design and operations studio"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                  loading="eager"
                />
                
                {/* Subtle Inner Border Frame */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" />

                {/* Corner Decorative Accent */}
                <div className="absolute top-4 right-4 bg-[#1A1A1A] text-[#F9F8F6] font-sans text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 z-20">
                  Precision Sourcing
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/40 to-transparent p-6 text-white z-20">
                  <div className="font-serif text-lg tracking-wide">
                    The Art of Operational Flow
                  </div>
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#EBE5DE]/80">
                    Behind-the-scenes precision for distributors & suppliers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import aboutImage from '../../assets/about-workspace.jpg';

const corePillars = [
  {
    title: 'Accuracy',
    desc: 'Flawless PO data, exact item specifications, and meticulous proof validation before production.',
    icon: ShieldCheck,
  },
  {
    title: 'Reliability',
    desc: 'Consistent day-in-day-out operational throughput adhering rigorously to your internal SLAs.',
    icon: CheckCircle2,
  },
  {
    title: 'Efficiency',
    desc: 'Optimized turnaround times across supplier inquiries, quoting, presentations, and order entry.',
    icon: Zap,
  },
  {
    title: 'Creative Support',
    desc: 'Vector artwork cleanup, virtual mockups, presentation decks, and marketing collateral.',
    icon: Sparkles,
  },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  // Direct DOM scroll update — zero React re-renders during exit scrolling, 120 FPS hardware composited
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const winH = window.innerHeight;

        // Only compute exit scrub when section is scrolled past
        const exitThreshold = Math.min(320, winH * 0.35);
        const exitDistance = 380;
        let progress = 0;
        if (rect.bottom < exitThreshold && rect.bottom > -exitDistance) {
          progress = Math.min(1, Math.max(0, (exitThreshold - rect.bottom) / exitDistance));
        }

        const opacity = String(Math.max(0, 1 - progress));

        if (imageColRef.current) {
          imageColRef.current.style.transform = `translate3d(${-progress * 60}px, 0, 0)`;
          imageColRef.current.style.opacity = opacity;
        }

        if (textColRef.current) {
          const scale = 1 + progress * 0.04;
          textColRef.current.style.transform = `scale3d(${scale}, ${scale}, 1)`;
          textColRef.current.style.opacity = opacity;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 md:py-32 px-8 md:px-16 border-t border-[#1A1A1A]/10 bg-[#F9F8F6] relative overflow-hidden"
      style={{ contain: 'paint' }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column (Columns 1-5): Pan Image Showcase */}
          <div 
            ref={imageColRef}
            className="lg:col-span-5 space-y-8"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative group overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#1A1A1A]/15 aspect-[3/4] bg-[#EBE5DE]">
              <img
                src={aboutImage}
                alt="Promo Arc Solutions operational workspace"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1800ms] ease-out"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] pointer-events-none" />
            </div>

            {/* Asymmetric Taupe Information Plaque */}
            <div className="p-8 bg-[#EBE5DE] border border-[#1A1A1A]/10">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#6C6863] block mb-2">
                Operational Foundation
              </span>
              <p className="font-sans text-xs text-[#1A1A1A] leading-relaxed">
                We embed seamlessly into your existing enterprise stack—ASI ESP, SAGE, Commonsku, or custom ERPs—operating as an extension of your core team.
              </p>
            </div>
          </div>

          {/* Right Column (Columns 6-12): Succession Motion Text Box */}
          <div 
            ref={textColRef}
            className="lg:col-span-7 space-y-10"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Header with Canva Ascend Motion */}
            <div className="space-y-4">
              {/* Overline */}
              <div className="flex items-center gap-3">
                <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
                <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#6C6863] font-medium">
                  About Promo Arc Solutions
                </span>
                <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.05] tracking-tight">
                <span className="inline-block mr-3">
                  Practical Support.
                </span>{' '}
                <span className="inline-block mr-3 italic text-[#D4AF37]">
                  Accurate Work.
                </span>{' '}
                <span className="inline-block">
                  Better Operations.
                </span>
              </h2>
            </div>

            {/* Editorial Drop Cap Paragraph */}
            <p className="editorial-drop-cap font-sans text-base md:text-lg text-[#1A1A1A] leading-relaxed font-normal">
              Promo Arc Solutions provides specialized virtual assistance for businesses operating in the promotional product industry. From product research and order processing to client support, graphic design, vector artwork, webstore operations, reporting, and social media support, our services are designed to take care of the operational work behind the scenes.
            </p>

            {/* Secondary Paragraph */}
            <p className="font-sans text-base text-[#6C6863] leading-relaxed">
              When distributors and suppliers scale, administrative burden and artwork backlogs can jeopardize turnaround commitments. We act as your reliable operational backbone—ensuring POs are accurate, proofs are pristine, and supplier deadlines are met with zero compromise.
            </p>

            {/* Core Focus Pillars */}
            <div className="pt-6 space-y-6">
              <div className="border-b border-[#1A1A1A]/15 pb-3">
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1A1A1A] font-medium">
                  The Four Pillars of Support
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {corePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-6 bg-transparent border-t border-[#1A1A1A]/30 hover:border-t-[#D4AF37] transition-colors duration-500 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-xl text-[#1A1A1A]">
                          {pillar.title}
                        </h4>
                        <Icon className="w-4 h-4 text-[#D4AF37] stroke-1" />
                      </div>
                      <p className="font-sans text-xs text-[#6C6863] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

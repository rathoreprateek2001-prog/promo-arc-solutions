import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { CardSpread } from '../common/CardSpread';
import { SERVICES_LIST, type ServiceDetail } from '../../data/servicesData';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isReadyForScroll, setIsReadyForScroll] = useState<boolean>(false);

  // 1) Viewport Entrance Trigger via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            setTimeout(() => setIsReadyForScroll(true), 900);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2) Scroll Exit Scrub — direct hardware-composited DOM updates, zero React re-renders
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const winH = window.innerHeight;

        // Only begin exit scrub when the section bottom leaves the viewport
        const exitThreshold = Math.min(380, winH * 0.45);
        const exitDistance = 420;
        let progress = 0;

        if (rect.bottom < exitThreshold) {
          progress = Math.min(1, Math.max(0, (exitThreshold - rect.bottom) / exitDistance));
        }

        const opacity = String(Math.max(0, 1 - progress * 1.2));

        if (leftColRef.current) {
          leftColRef.current.style.transform = `translate3d(${-progress * 55}px, ${-progress * 20}px, 0)`;
          leftColRef.current.style.opacity = opacity;
        }

        if (rightColRef.current) {
          rightColRef.current.style.transform = `translate3d(${progress * 55}px, ${-progress * 20}px, 0) scale(${1 - progress * 0.03})`;
          rightColRef.current.style.opacity = opacity;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const activeService: ServiceDetail | null =
    hoveredIndex !== null && SERVICES_LIST[hoveredIndex]
      ? SERVICES_LIST[hoveredIndex]
      : null;

  // Initial / entrance styles for left column
  const leftColumnTransform = !hasEntered ? 'translate3d(-70px, 0, 0)' : 'translate3d(0, 0, 0)';
  const leftColumnOpacity = !hasEntered ? 0 : 1;
  const leftColumnTransition = !isReadyForScroll
    ? 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)'
    : 'none';

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-28 md:py-36 px-8 md:px-16 overflow-hidden bg-[#F9F8F6] min-h-[850px] flex items-center"
      style={{ contain: 'paint' }}
    >
      {/* Soft Feathered Boundaries (Top & Bottom) */}
      <div 
        className="absolute top-0 inset-x-0 h-32 md:h-48 bg-gradient-to-b from-[#F9F8F6] via-[#F9F8F6]/85 to-transparent pointer-events-none z-20" 
      />
      <div 
        className="absolute bottom-0 inset-x-0 h-32 md:h-48 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/85 to-transparent pointer-events-none z-20" 
      />

      {/* GPU-Cached Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {SERVICES_LIST.map((service, idx) => {
          const isActive = activeService?.num === service.num;
          return (
            <div
              key={service.num}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1.0) translateZ(0)' : 'scale(1.06) translateZ(0)',
                transition: 'opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'opacity, transform',
              }}
            >
              <img
                src={service.bgImage}
                alt={service.title}
                className="w-full h-full object-cover brightness-[0.93] contrast-[1.03]"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Feathered Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(249, 248, 246, 0.76) 25%, rgba(249, 248, 246, 0.93) 85%, #F9F8F6 100%)',
          }}
        />
      </div>

      {/* Main Dual-Column Layout */}
      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Dynamic Topic Content */}
          <div 
            ref={leftColRef}
            className="lg:col-span-5 relative min-h-[440px] flex flex-col justify-center"
            style={{
              transform: leftColumnTransform,
              opacity: leftColumnOpacity,
              transition: leftColumnTransition,
              willChange: 'transform, opacity',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {activeService ? (
                <motion.div
                  key={activeService.num}
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1.0, y: 0 }}
                  exit={{ opacity: 0, scale: 1.03, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-6"
                >
                  {/* Category Overline with Gold Accent */}
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
                    <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#6C6863] font-medium">
                      {activeService.category} Discipline // {activeService.num}
                    </span>
                    <span className="h-px w-8 md:w-12 bg-[#D4AF37]" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-[1.1] tracking-tight">
                    {activeService.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="font-sans text-sm sm:text-base text-[#4A4744] leading-relaxed font-normal"
                  >
                    {activeService.desc}
                  </p>

                  {/* Key Deliverables Block */}
                  <div className="pt-6 border-t border-[#1A1A1A]/15 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] font-semibold">
                        Key Deliverables
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activeService.deliverables.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-3 p-3 bg-white/75 border border-[#1A1A1A]/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          <span 
                            className="font-sans text-xs md:text-sm text-[#1A1A1A] font-medium"
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Default Overview */
                <motion.div
                  key="default-overview"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1.0 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-8"
                >
                  <SectionHeader
                    overline="Comprehensive Capabilities"
                    title={
                      <>
                        Operational & Creative{' '}
                        <span className="italic text-[#D4AF37]">Services</span>
                      </>
                    }
                    description="Tailored virtual assistance engineered to handle every stage of your promotional product lifecycle with exacting standards."
                  />

                  {/* Guidance Box */}
                  <div className="p-6 bg-white/60 border border-[#1A1A1A]/10 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-[#D4AF37]">
                      <ArrowRight className="w-4 h-4" />
                      <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
                        Interactive Portfolio Spread
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#6C6863] leading-relaxed">
                      Glide your cursor across the cards on the right to preview specialized workflows, verified software competencies, and production deliverables.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Card Spread */}
          <div 
            ref={rightColRef}
            className="lg:col-span-7 h-[500px] md:h-[560px] flex items-center justify-center relative"
            style={{ willChange: 'transform, opacity' }}
          >
            <CardSpread
              services={SERVICES_LIST}
              hoveredIndex={hoveredIndex}
              onHoverChange={setHoveredIndex}
              hasEntered={hasEntered}
              isReadyForScroll={isReadyForScroll}
              arc={94}
              radius={440}
              lift={47}
              push={10}
              pushReach={5}
              restOpacity={0.9}
              cardWidth={180}
              cardHeight={260}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useRef, useEffect, useCallback } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Target, Compass, Layers, Coins, Clock, TrendingUp } from 'lucide-react';

// Module-scope constant — never recreated
const pillars = [
  {
    num: '01',
    title: 'Accuracy First',
    desc: 'Promotional product work runs on precise details — product specs, imprint methods, artwork files, order quantities, and client requirements. A missed detail can mean a reprint or a missed deadline. We treat every detail as critical.',
    tag: 'ZERO-ERROR STANDARD',
    icon: Target,
  },
  {
    num: '02',
    title: 'Industry-Fluent Support',
    desc: 'We already know how promotional product distributors and suppliers operate — sourcing platforms, line sheets, vendor portals, and order workflows. No lengthy onboarding, no learning curve — support that fits into how you already work.',
    tag: 'INDUSTRY READY',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Operational + Creative, One Partner',
    desc: 'From sourcing and order management to presentations and graphic/vector artwork, both the operational and creative side of your business are handled by one dedicated team — not split across multiple vendors.',
    tag: 'FULL-SERVICE SUPPORT',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Lower Cost Than In-House Hiring',
    desc: 'Get dedicated, skilled support at a fraction of the cost of a full-time hire — no salary, benefits, office space, or training overhead. You pay only for the work that gets done.',
    tag: 'COST-EFFICIENT',
    icon: Coins,
  },
  {
    num: '05',
    title: 'Reliable Workflow Support',
    desc: 'Tasks are organized, tracked, and managed to keep orders, artwork approvals, and client requests moving — so nothing sits waiting in an inbox.',
    tag: 'ALWAYS ON TRACK',
    icon: Clock,
  },
  {
    num: '06',
    title: 'Scalable, On-Demand Assistance',
    desc: "Use us for a single task, ongoing daily operations, or everything in between. Support scales up during busy seasons and scales back down when it's quiet — no long-term commitment required.",
    tag: 'FLEXIBLE BY DESIGN',
    icon: TrendingUp,
  },
];

// Exact 3D Carousel Parameters from card-spread-demo
const MAX_ROTATION = 28;
const MAX_DEPTH = 176;
const CARD_GAP = 62;
const MIN_SCALE = 0.78;
const TOTAL_CARDS = pillars.length;

export const WhyUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const isSnappingRef = useRef(false);
  const scrollProgressRef = useRef(0);
  const currentCardIndexRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardPointerStart = useRef<{ x: number; y: number } | null>(null);

  // Drag / Swipe handling on the 3D Stage (from card-spread-demo)
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  // Direct DOM update applying the exact 3D carousel motion formulas from card-spread-demo
  const updateCards = useCallback((activeIndex: number) => {
    const activeIntIndex = Math.min(TOTAL_CARDS - 1, Math.max(0, Math.round(activeIndex)));

    if (counterRef.current) {
      counterRef.current.textContent = `[ ${pillars[activeIntIndex].num} / 06 — ${pillars[activeIntIndex].tag} ]`;
    }

    const cardWidth = window.innerWidth >= 768 ? 380 : window.innerWidth >= 640 ? 340 : 300;

    for (let idx = 0; idx < cardRefs.current.length; idx++) {
      const card = cardRefs.current[idx];
      if (!card) continue;

      // Cards are ALWAYS aligned to whole card positions — never floating in between!
      const offset = idx - activeIntIndex;
      const absOffset = Math.abs(offset);

      const translateX = offset * (cardWidth + CARD_GAP);
      const translateZ = -Math.min(MAX_DEPTH * 2.5, absOffset * MAX_DEPTH);
      const rotateY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, -offset * MAX_ROTATION));
      const scale = Math.max(MIN_SCALE, 1 - absOffset * (1 - MIN_SCALE));
      const opacity = absOffset > 3 ? 0 : Math.max(0.35, 1 - absOffset * 0.22);
      const zIndex = 100 - Math.round(absOffset * 10);
      const isCenter = absOffset === 0;

      card.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(zIndex);
      card.style.pointerEvents = absOffset > 3 ? 'none' : 'auto';
      card.style.cursor = isCenter ? 'default' : 'pointer';
      card.style.boxShadow = isCenter
        ? '0 25px 50px -12px rgba(45, 52, 40, 0.65), 0 0 0 1.5px rgba(255, 255, 255, 0.25)'
        : '0 15px 30px -10px rgba(0, 0, 0, 0.45)';

      const dot = card.querySelector('[data-dot]') as HTMLElement | null;
      if (dot) {
        dot.style.backgroundColor = isCenter ? '#D4AF37' : 'rgba(255,255,255,0.4)';
      }
    }
  }, []);

  // Open / Center a specific card and synchronize scroll position seamlessly
  const goToCard = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(TOTAL_CARDS - 1, index));
    const now = Date.now();
    if (currentCardIndexRef.current === clampedIndex && now - lastClickTimeRef.current < 250) {
      return;
    }
    lastClickTimeRef.current = now;
    currentCardIndexRef.current = clampedIndex;

    // 1. Lock snapping so scroll listeners don't fight this transition
    isSnappingRef.current = true;

    // 2. Immediately update cards in DOM — CSS cubic-bezier glides them into place instantly
    updateCards(clampedIndex);

    // 3. Smoothly align document scroll position so scrolling resumes seamlessly from this card
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const trackTop = rect.top + scrollTop;
      const totalScrollable = rect.height - window.innerHeight;
      const targetProgress = clampedIndex / (TOTAL_CARDS - 1);
      const targetScroll = trackTop + targetProgress * totalScrollable;

      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetScroll, {
          duration: 0.75,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }

      scrollProgressRef.current = targetProgress;
    }

    // 4. Release snap lock after the CSS transition and scroll settle
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = setTimeout(() => {
      isSnappingRef.current = false;
    }, 650);
  }, [updateCards]);

  // Scroll listener with discrete card transitions and gentle track alignment
  useEffect(() => {
    let rafId: number | null = null;
    let magneticTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;

        // Skip scroll updates while a card click or snap glide is in motion
        if (isSnappingRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

        const currentProgress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
        scrollProgressRef.current = currentProgress;

        // Target index is ALWAYS an integer — cards are always centered, never floating in between!
        const targetIndex = Math.min(TOTAL_CARDS - 1, Math.max(0, Math.round(currentProgress * (TOTAL_CARDS - 1))));

        if (targetIndex !== currentCardIndexRef.current) {
          currentCardIndexRef.current = targetIndex;
          updateCards(targetIndex);
        }

        // Gentle magnetic track alignment — waits for natural scroll momentum to finish (300ms)
        if (magneticTimeout) clearTimeout(magneticTimeout);
        magneticTimeout = setTimeout(() => {
          if (!containerRef.current || isSnappingRef.current) return;
          const r = containerRef.current.getBoundingClientRect();
          const scrollable = r.height - window.innerHeight;
          if (scrollable <= 0) return;
          const prog = -r.top / scrollable;
          if (prog >= 0 && prog <= 1) {
            const nearestCard = Math.min(TOTAL_CARDS - 1, Math.max(0, Math.round(prog * (TOTAL_CARDS - 1))));
            const cardTargetProg = nearestCard / (TOTAL_CARDS - 1);
            if (Math.abs(prog - cardTargetProg) > 0.05) {
              goToCard(nearestCard);
            }
          }
        }, 300);
      });
    };

    const handleResize = () => {
      updateCards(currentCardIndexRef.current);
    };

    // Synchronously position cards immediately on mount so they appear with zero delay
    if (containerRef.current) {
      const r = containerRef.current.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      const prog = scrollable > 0 ? Math.min(1, Math.max(0, -r.top / scrollable)) : 0;
      const initIdx = Math.min(TOTAL_CARDS - 1, Math.max(0, Math.round(prog * (TOTAL_CARDS - 1))));
      currentCardIndexRef.current = initIdx;
      updateCards(initIdx);
    } else {
      updateCards(0);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (magneticTimeout) clearTimeout(magneticTimeout);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [goToCard, updateCards]);

  // Pointer drag/swipe event handlers for the carousel stage
  const handleStagePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
  };

  const handleStagePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };

  const handleStagePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDelta.current < -40) {
      const cur = currentCardIndexRef.current;
      if (cur < TOTAL_CARDS - 1) goToCard(cur + 1);
    } else if (dragDelta.current > 40) {
      const cur = currentCardIndexRef.current;
      if (cur > 0) goToCard(cur - 1);
    }
    dragDelta.current = 0;
  };

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="relative h-[280vh] bg-[#F9F8F6] border-t border-[#1A1A1A]/10 overflow-x-clip"
    >
      {/* Pinned Viewport Container */}
      <div
        className="sticky top-0 w-full flex flex-col justify-between overflow-x-clip pt-6 md:pt-8 pb-5 md:pb-6 px-6 md:px-16"
        style={{ height: 'calc(100vh / var(--site-zoom, 1))', minHeight: 'calc(100vh / var(--site-zoom, 1))' }}
      >
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end border-b border-[#1A1A1A]/15 pb-3 md:pb-4">
            <div className="lg:col-span-8">
              <SectionHeader
                overline="Strategic Advantage"
                title={
                  <>
                    Why <span className="italic text-[#D4AF37]">Promo Arc Solutions?</span>
                  </>
                }
                description="Extra hands, not extra headcount. From sourcing & presentation to order management to design. We handle it promptly and accurately, so your team stays focused on selling."
              />
            </div>
            <div
              ref={counterRef}
              className="lg:col-span-4 text-left lg:text-right font-sans text-xs uppercase tracking-[0.2em] text-[#6C6863]"
            >
              [ 01 / 06 — ZERO-ERROR STANDARD ]
            </div>
          </div>
        </div>

        {/* 3D Perspective Stage — 1200px perspective matching card-spread-demo */}
        <div 
          className="flex-1 w-full max-w-[1600px] mx-auto flex items-center justify-center relative py-1 cursor-grab active:cursor-grabbing"
          onPointerDown={handleStagePointerDown}
          onPointerMove={handleStagePointerMove}
          onPointerUp={handleStagePointerUp}
          onPointerLeave={handleStagePointerUp}
        >
          <div
            className="w-full h-[350px] md:h-[380px] flex items-center justify-center relative"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              // Frame-0 initial positioning — cards render in 3D carousel position instantly on page load
              const initOffset = idx;
              const initAbsOffset = Math.abs(initOffset);
              const cardWidth = 380;
              const initX = initOffset * (cardWidth + CARD_GAP);
              const initZ = -Math.min(MAX_DEPTH * 2.5, initAbsOffset * MAX_DEPTH);
              const initRotY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, -initOffset * MAX_ROTATION));
              const initScale = Math.max(MIN_SCALE, 1 - initAbsOffset * (1 - MIN_SCALE));
              const initOpacity = initAbsOffset > 3 ? 0 : Math.max(0.35, 1 - initAbsOffset * 0.22);
              const initZIndex = 100 - Math.round(initAbsOffset * 10);
              const isCenter = idx === 0;

              return (
                <div
                  key={pillar.num}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onPointerDown={(e) => {
                    cardPointerStart.current = { x: e.clientX, y: e.clientY };
                  }}
                  onPointerUp={(e) => {
                    if (cardPointerStart.current) {
                      const dist = Math.hypot(e.clientX - cardPointerStart.current.x, e.clientY - cardPointerStart.current.y);
                      cardPointerStart.current = null;
                      if (dist < 12) {
                        e.stopPropagation();
                        goToCard(idx);
                      }
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCard(idx);
                  }}
                  className="absolute w-[300px] sm:w-[340px] md:w-[380px] h-[330px] md:h-[355px] p-6 md:p-8 flex flex-col justify-between cursor-pointer rounded-2xl select-none"
                  style={{
                    backgroundColor: '#7D8971',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    transform: `translate3d(${initX}px, 0, ${initZ}px) rotateY(${initRotY}deg) scale(${initScale})`,
                    opacity: initOpacity,
                    zIndex: initZIndex,
                    pointerEvents: initAbsOffset > 3 ? 'none' : 'auto',
                    cursor: isCenter ? 'default' : 'pointer',
                    boxShadow: isCenter
                      ? '0 25px 50px -12px rgba(45, 52, 40, 0.65), 0 0 0 1.5px rgba(255, 255, 255, 0.25)'
                      : '0 15px 30px -10px rgba(0, 0, 0, 0.45)',
                    // Softened, cushioned transition for smooth luxury glide
                    transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, box-shadow 0.5s ease',
                  }}
                >
                  {/* Subtle Inner Glass Highlight */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none" />

                  {/* Top Card Bar */}
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                      <span className="font-serif text-2xl md:text-3xl text-[#F9F8F6]/90 font-light tracking-tight">
                        {pillar.num}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-black/15 flex items-center justify-center border border-white/15">
                        <Icon className="w-4 h-4 stroke-1.5 text-[#D4AF37]" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-serif text-xl md:text-2xl text-[#F9F8F6] font-normal leading-snug tracking-tight">
                      {pillar.title}
                    </h3>

                    {/* Card Description */}
                    <p className="font-sans text-xs md:text-[13px] text-[#F9F8F6]/90 leading-relaxed line-clamp-3 md:line-clamp-4">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bottom Tag / Badge */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between relative z-10">
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#F9F8F6] font-semibold bg-black/20 px-2.5 py-0.5 rounded-full border border-white/10">
                      {pillar.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#F9F8F6]/70 text-[11px] font-mono">
                      <span
                        data-dot
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: idx === 0 ? '#D4AF37' : 'rgba(255,255,255,0.4)' }}
                      />
                      {pillar.num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

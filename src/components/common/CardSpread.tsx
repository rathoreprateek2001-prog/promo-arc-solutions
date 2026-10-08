import React, { useState, useRef, useEffect, useMemo, type CSSProperties } from "react";
import { motion, type Transition } from "framer-motion";
import type { ServiceDetail } from "../../data/servicesData";

export interface CardSpreadProps {
  services: ServiceDetail[];
  hoveredIndex?: number | null;
  onHoverChange?: (index: number | null) => void;
  hasEntered?: boolean;
  isReadyForScroll?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  arc?: number;
  cardColor?: string;
  cardPadding?: number;
  borderColor?: string;
  shadow?: number;
  lift?: number;
  push?: number;
  pushReach?: number;
  restOpacity?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  stagger?: number;
  fit?: boolean;
  maxScale?: number;
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const CardSpread: React.FC<CardSpreadProps> = ({
  services,
  hoveredIndex: externalHoveredIndex,
  onHoverChange,
  hasEntered = true,
  isReadyForScroll = false,
  cardWidth = 180,
  cardHeight = 260,
  radius = 440,
  arc = 94,
  cardColor = "#1A1A1A",
  cardPadding = 0,
  borderColor = "rgba(212, 175, 55, 0.3)",
  shadow = 0.35,
  lift = 47,
  push = 10,
  pushReach = 5,
  restOpacity = 0.9,
  stiffness = 160,
  damping = 18,
  mass = 0.9,
  stagger = 0.05,
  fit = true,
  maxScale = 1,
  interactive = true,
  className = "",
  style,
}) => {
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fanWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const totalCards = services.length;

  const activeHoveredIndex = externalHoveredIndex !== undefined ? externalHoveredIndex : internalHoveredIndex;

  const updateHoveredIndex = (idx: number | null) => {
    setInternalHoveredIndex(idx);
    if (onHoverChange) {
      onHoverChange(idx);
    }
  };

  const baseAngles = useMemo(() => {
    if (totalCards <= 1) return [0];
    const step = arc / (totalCards - 1);
    const startAngle = -arc / 2;
    return Array.from({ length: totalCards }, (_, i) => startAngle + i * step);
  }, [totalCards, arc]);

  const theoreticalWidth = useMemo(() => {
    const maxAngleRad = ((arc / 2) * Math.PI) / 180;
    const spreadSpan = 2 * radius * Math.sin(maxAngleRad);
    return spreadSpan + cardWidth * 1.35;
  }, [arc, radius, cardWidth]);

  const theoreticalHeight = useMemo(() => {
    const maxAngleRad = ((arc / 2) * Math.PI) / 180;
    const sagitta = radius * (1 - Math.cos(maxAngleRad));
    return cardHeight + sagitta + lift + 50;
  }, [arc, radius, cardHeight, lift]);

  useEffect(() => {
    if (!fit || !containerRef.current) {
      setScale(1);
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;

      const scaleX = (width - 32) / theoreticalWidth;
      const scaleY = (height - 32) / theoreticalHeight;
      const calculatedScale = Math.min(scaleX, scaleY, maxScale);
      setScale(Math.max(0.35, calculatedScale));
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [fit, theoreticalWidth, theoreticalHeight, maxScale]);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const latestPointer = useRef<{ clientX: number; clientY: number } | null>(null);

  // Optimized angular hit-testing throttled via requestAnimationFrame (120fps lock)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive || !fanWrapperRef.current || totalCards === 0) return;

    latestPointer.current = { clientX: e.clientX, clientY: e.clientY };

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!fanWrapperRef.current || !latestPointer.current) return;

        const { clientX, clientY } = latestPointer.current;
        const rect = fanWrapperRef.current.getBoundingClientRect();
        const zoom = parseFloat(getComputedStyle(document.documentElement).zoom || '1') || 1;

        // Determine coordinate normalization under CSS zoom
        const expectedUnzoomedWidth = theoreticalWidth * scale;
        const isRectZoomed = Math.abs(rect.width - expectedUnzoomedWidth * zoom) < Math.abs(rect.width - expectedUnzoomedWidth);

        let ptX = clientX;
        let ptY = clientY;
        let effectiveScale = scale;

        if (isRectZoomed) {
          // In Chromium 128+, getBoundingClientRect is scaled to visual pixels matching clientX/clientY
          effectiveScale = rect.width / theoreticalWidth;
        } else if (zoom !== 1) {
          // If getBoundingClientRect is unzoomed, convert client pointer to CSS layout pixels
          ptX = clientX / zoom;
          ptY = clientY / zoom;
          effectiveScale = scale;
        }

        const originX = rect.left + rect.width / 2;
        const originY = rect.top + (40 + radius) * effectiveScale;

        const dx = ptX - originX;
        const dy = originY - ptY;

        if (dy <= 0) {
          if (activeHoveredIndex !== null) updateHoveredIndex(null);
          return;
        }

        const distance = Math.hypot(dx, dy) / effectiveScale;
        const minDistance = radius - cardHeight - 60;
        const maxDistance = radius + 80;

        if (distance < minDistance || distance > maxDistance) {
          if (activeHoveredIndex !== null) updateHoveredIndex(null);
          return;
        }

        const mouseAngle = Math.atan2(dx, dy) * (180 / Math.PI);
        const step = arc / (totalCards - 1);
        const startAngle = -arc / 2;

        if (mouseAngle < startAngle - step * 0.6 || mouseAngle > -startAngle + step * 0.6) {
          if (activeHoveredIndex !== null) updateHoveredIndex(null);
          return;
        }

        let targetIndex = Math.round((mouseAngle - startAngle) / step);
        targetIndex = Math.max(0, Math.min(totalCards - 1, targetIndex));

        if (activeHoveredIndex !== null) {
          const currentAngle = startAngle + activeHoveredIndex * step;
          const delta = mouseAngle - currentAngle;
          if (Math.abs(delta) < step * 0.6) {
            targetIndex = activeHoveredIndex;
          }
        }

        if (activeHoveredIndex !== targetIndex) {
          updateHoveredIndex(targetIndex);
        }
      });
    }
  };

  const handlePointerLeave = () => {
    latestPointer.current = null;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (activeHoveredIndex !== null) updateHoveredIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive) return;
    if (e.key === "ArrowRight") {
      updateHoveredIndex(activeHoveredIndex === null ? 0 : Math.min(totalCards - 1, activeHoveredIndex + 1));
    } else if (e.key === "ArrowLeft") {
      updateHoveredIndex(activeHoveredIndex === null ? totalCards - 1 : Math.max(0, activeHoveredIndex - 1));
    } else if (e.key === "Escape") {
      updateHoveredIndex(null);
    }
  };

  const getCardTransform = (index: number) => {
    const baseAngle = baseAngles[index];
    if (activeHoveredIndex === null || !interactive) {
      return { angle: baseAngle, isHovered: false, opacity: restOpacity, zIndex: index + 1 };
    }

    const isHovered = activeHoveredIndex === index;
    let pushDelta = 0;
    const diff = index - activeHoveredIndex;

    if (!isHovered && Math.abs(diff) <= pushReach) {
      const sign = diff > 0 ? 1 : -1;
      const weight = (pushReach + 1 - Math.abs(diff)) / pushReach;
      pushDelta = sign * push * weight;
    }

    const opacity = isHovered ? 1 : restOpacity;
    const zIndex = isHovered ? 100 : 50 - Math.abs(diff);

    return {
      angle: baseAngle + pushDelta,
      isHovered,
      opacity,
      zIndex,
    };
  };

  const springTransition: Transition = {
    type: "spring",
    stiffness,
    damping,
    mass,
  };

  const boxShadowValue = useMemo(() => {
    if (shadow <= 0) return "none";
    return `0 ${12 * shadow}px ${30 * shadow}px rgba(0, 0, 0, ${shadow * 1.5}), 0 2px 10px rgba(0,0,0,0.4)`;
  }, [shadow]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      tabIndex={interactive ? 0 : undefined}
      role="region"
      aria-label="Interactive Card Spread"
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none outline-none ${className}`}
      style={style}
    >
      <div
        ref={fanWrapperRef}
        className="relative flex items-center justify-center pointer-events-none"
        style={{
          width: theoreticalWidth,
          height: theoreticalHeight,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: "transform 0.15s ease-out",
        }}
      >
        {services.map((service, index) => {
          const { angle, isHovered, opacity, zIndex } = getCardTransform(index);

          // Entrance Stagger Motion: from right towards left (+70px + offset -> 0px)
          const enterOffsetX = 70 + (7 - index) * 14;
          const currentX = !hasEntered ? enterOffsetX : 0;
          const currentOpacity = !hasEntered ? 0 : opacity;

          return (
            <motion.div
              key={service.id}
              initial={{
                opacity: 0,
                x: enterOffsetX,
                rotate: 0,
                y: 80,
                scale: 0.9,
              }}
              animate={{
                opacity: currentOpacity,
                x: currentX,
                rotate: angle,
                y: isHovered ? -lift : 0,
                scale: isHovered ? 1.06 : 1,
              }}
              transition={{
                ...springTransition,
                x: {
                  duration: !isReadyForScroll ? 0.9 : 0,
                  delay: !isReadyForScroll ? (7 - index) * stagger : 0,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: { 
                  duration: !isReadyForScroll ? 0.6 : 0, 
                  delay: !isReadyForScroll ? (7 - index) * stagger : 0 
                },
              }}
              className="absolute left-1/2 top-10 outline-none overflow-hidden group cursor-pointer transition-colors duration-300"
              style={{
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                backgroundColor: cardColor,
                padding: cardPadding,
                border: isHovered ? "1px solid #D4AF37" : `1px solid ${borderColor}`,
                boxShadow: isHovered ? `0 16px 36px rgba(212, 175, 55, 0.22), ${boxShadowValue}` : boxShadowValue,
                zIndex,
                transformOrigin: `50% ${radius}px`,
                willChange: "transform",
                pointerEvents: "none",
              }}
            >
              {/* Card Face Content with SVG Vector Icon */}
              <div className="w-full h-full p-5 flex flex-col justify-between relative bg-gradient-to-b from-[#242424] to-[#161616] text-[#F9F8F6]">
                {/* Subtle Inner Border */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />



                {/* Center: Prominent SVG Vector Icon */}
                <div className="flex-1 flex items-center justify-center p-3 z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={service.iconSvg}
                      alt={service.title}
                      className="w-full h-full object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Bottom: Refined Service Title */}
                <div className="z-10 pt-2 border-t border-white/10">
                  <span className="block font-serif text-xs md:text-sm text-center text-white/90 truncate group-hover:text-[#D4AF37] transition-colors duration-300">
                    {service.shortTitle}
                  </span>
                </div>

                {/* Subtle Luxury Card Shine */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSpread;

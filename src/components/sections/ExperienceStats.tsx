import React, { useState } from 'react';
import { motion } from 'framer-motion';
import experienceBg from '../../assets/experience-bg.png';

export const ExperienceStats: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    {
      figure: '2+',
      unit: 'Years',
      label: 'Of Industry Experience',
      caption: 'Dedicated focus on promotional products, artwork cleanup, and order pipelines.',
    },
    {
      figure: '10+',
      unit: 'Accounts',
      label: 'US Client Accounts Supported',
      caption: 'Direct collaboration with US-based distributors and enterprise supplier teams.',
    },
    {
      figure: '200+',
      unit: 'Locations',
      label: 'Locations Coordinated',
      caption: 'Nationwide fulfillment and time-critical event deliveries managed flawlessly.',
    },
  ];

  return (
    <section 
      id="experience" 
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="pt-24 md:pt-32 pb-36 md:pb-44 lg:pb-48 bg-[#2E221B] text-[#F9F8F6] border-y border-[#2E221B] relative z-10 overflow-hidden transition-colors duration-700 cursor-default"
    >
      {/* Dynamic Background Image Reveal Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <img
          src={experienceBg}
          alt="Operational workspace and client accounts"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
          style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1.0)' }}
          loading="lazy"
        />
        {/* Scrim overlay: deep espresso tint preserving 100% text legibility and brand color harmony */}
        <div className="absolute inset-0 bg-[#2E221B]/75 transition-opacity duration-700" />
        {/* Soft edge gradients top & bottom to maintain seamless section borders */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E221B] via-transparent to-[#2E221B] opacity-70" />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-16 space-y-16 relative z-10">
        {/* Editorial Heading */}
        <div className="border-b border-[#F9F8F6]/15 pb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]" aria-hidden="true" />
            <motion.span
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]"
            >
              Proven Operational Track Record
            </motion.span>
            <span className="h-px w-8 bg-[#D4AF37]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F9F8F6] font-normal leading-[1.05]">
            <motion.span
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Validated Scale &
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="italic text-[#D4AF37]"
            >
              Demonstrated Impact
            </motion.span>
          </h2>
        </div>

        {/* 3 Stats Columns with Thin Vertical Dividers and Generous Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`space-y-4 ${
                idx !== 0 ? 'md:border-l md:border-[#F9F8F6]/15 md:pl-8 lg:pl-12' : ''
              } md:pr-4 lg:pr-6 pb-4`}
            >
              <div className="flex items-baseline gap-2">
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                  className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#F9F8F6] tracking-tight"
                >
                  {stat.figure}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 * idx }}
                  className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4AF37]"
                >
                  {stat.unit}
                </motion.span>
              </div>
              <motion.h3
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="font-serif text-lg text-[#F9F8F6] font-normal"
              >
                {stat.label}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * idx }}
                className="font-sans text-xs text-[#EBE5DE]/60 leading-relaxed max-w-xs sm:max-w-sm"
              >
                {stat.caption}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

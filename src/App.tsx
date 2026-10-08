import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Platforms } from './components/sections/Platforms';
import { ExperienceStats } from './components/sections/ExperienceStats';
import { WhyUs } from './components/sections/WhyUs';
import { Approach } from './components/sections/Approach';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const App: React.FC = () => {
  useEffect(() => {
    // Initialize Locomotive / Lenis with pure physics continuous LERP (eliminates tween shivering)
    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    // Synchronize Lenis virtual scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    (window as any).lenis = lenis;

    // Seamless anchor link navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const elem = document.querySelector(href);
        if (elem) {
          lenis.scrollTo(elem as HTMLElement, { offset: -40, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.off('scroll', ScrollTrigger.update);
      delete (window as any).lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* Editorial Masthead & Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Platforms />
        <ExperienceStats />
        <WhyUs />
        <Approach />
        <Contact />
      </main>

      {/* Inverted Colophon Footer */}
      <Footer />
    </div>
  );
};

export default App;


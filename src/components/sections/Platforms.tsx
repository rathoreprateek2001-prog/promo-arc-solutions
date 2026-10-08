import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { FoldText } from '../common/FoldText';
import { Layers, Cpu, Share2 } from 'lucide-react';

export const Platforms: React.FC = () => {
  const categories = [
    {
      category: 'Promotional Product Tools',
      description: 'Industry-standard research, sourcing, presentation, and CRM order environments.',
      icon: Layers,
      tools: [
        { name: 'ASI / ESP', badge: 'Industry Benchmark' },
        { name: 'SAGE', badge: 'Research & Sourcing' },
        { name: 'Distributor Central', badge: 'Verified Suppliers' },
        { name: 'Commonsku', badge: 'Workflow ERP' },
        { name: 'AIM', badge: 'Distributor Network' },
        { name: 'Antera', badge: 'Business Management' },
      ],
    },
    {
      category: 'Operations & Enterprise Systems',
      description: 'Backend infrastructure, database accuracy, inventory synchronicity, and KPI governance.',
      icon: Cpu,
      tools: [
        { name: 'CRM Systems', badge: 'Lead & Client Records' },
        { name: 'Order Management Systems', badge: 'End-to-End Tracking' },
        { name: 'KPI Dashboards', badge: 'Live Metrics' },
        { name: 'Webstore Backend Operations', badge: 'SKU & Content Prep' },
        { name: 'OpenCart', badge: 'Store Administration' },
        { name: 'MS Office Suite', badge: 'Excel & Data Auditing' },
      ],
    },
    {
      category: 'Social Media & Brand Channels',
      description: 'Unified publishing, asset scheduling, community surveillance, and cross-channel outreach.',
      icon: Share2,
      tools: [
        { name: 'Sprout Social', badge: 'Enterprise Scheduling' },
        { name: 'LinkedIn', badge: 'B2B Networking' },
        { name: 'Instagram & Facebook', badge: 'Visual Campaigns' },
        { name: 'X (Twitter)', badge: 'Real-time Engagement' },
        { name: 'YouTube & TikTok', badge: 'Video Strategy' },
      ],
    },
  ];

  return (
    <section id="platforms" className="py-24 md:py-32 px-8 md:px-16 border-t border-[#1A1A1A]/10 bg-[#F9F8F6]">
      <div className="max-w-[1600px] mx-auto space-y-16">
        <SectionHeader
          overline="Ecosystem Fluency"
          title={
            <>
              Platforms & <span className="italic text-[#D4AF37]">Software Mastery</span>
            </>
          }
          description="Immediate time-to-value: our specialists are natively fluent with the specialized software tools that drive modern promotional product businesses."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-8 md:p-10 border-t-2 border-[#1A1A1A]/30 hover:border-t-[#D4AF37] bg-transparent transition-[border-color] duration-500 space-y-8 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#6C6863]">
                      Sector 0{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-[#D4AF37] stroke-1" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">
                    <FoldText
                      text={cat.category}
                      splitBy="word"
                      hinge="top"
                      trigger="scroll"
                      duration={0.65}
                      stagger={0.035}
                      ease="power3.out"
                      perspective={700}
                      creaseShading={0.55}
                      fontSize="inherit"
                      fontWeight="inherit"
                      color="inherit"
                    />
                  </h3>
                  <div className="font-sans text-xs text-[#6C6863] leading-relaxed">
                    <FoldText
                      text={cat.description}
                      splitBy="word"
                      hinge="top"
                      trigger="scroll"
                      duration={0.55}
                      stagger={0.02}
                      ease="power3.out"
                      perspective={700}
                      creaseShading={0.4}
                      fontSize="inherit"
                      fontWeight="inherit"
                      color="#6C6863"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-[#1A1A1A]/10">
                  {cat.tools.map((tool, tIdx) => (
                    <div
                      key={tIdx}
                      className="group flex items-center justify-between py-2 border-b border-[#1A1A1A]/5 hover:border-[#D4AF37]/50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-300">
                          {tool.name}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#6C6863] bg-[#EBE5DE]/60 px-2 py-0.5">
                        {tool.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

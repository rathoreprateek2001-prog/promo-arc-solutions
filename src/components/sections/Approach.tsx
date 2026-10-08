import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    phase: 'Understand',
    label: 'Diagnosis & Requirements',
    desc: 'We unpack your specific PO requirements, supplier nuances, design specifications, and turnaround deadlines.',
    detail: 'Intake brief analysis, artwork inspection, and platform access validation.',
  },
  {
    step: '02',
    phase: 'Organize',
    label: 'Workflow Architecture',
    desc: 'We structure the pipeline, assign verified checklists, configure data schemas, and establish communication cadences.',
    detail: 'SOP alignment, ERP job creation, and milestone schedule confirmation.',
  },
  {
    step: '03',
    phase: 'Execute',
    label: 'Precision Operation',
    desc: 'Our team performs the operational or creative tasks—meticulously drafting POs, redrawing vectors, or resolving supplier tickets.',
    detail: 'Strict SLA adherence, dual-check data verification, and quality audit.',
  },
  {
    step: '04',
    phase: 'Deliver',
    label: 'Flawless Outcome',
    desc: 'We deliver client-ready presentations, production-approved files, or confirmed shipping tracking numbers with zero friction.',
    detail: 'Final delivery verification, post-order reporting, and continuous refinement.',
  },
];

export const Approach: React.FC = () => {
  return (
    <section id="approach" className="py-24 md:py-32 px-8 md:px-16 border-t border-[#1A1A1A]/10 bg-[#F9F8F6]">
      <div className="max-w-[1600px] mx-auto space-y-16 md:space-y-20">
        <SectionHeader
          overline="Methodical Rigor"
          title={
            <>
              The Promo Arc <span className="italic text-[#D4AF37]">Approach</span>
            </>
          }
          description="Understand → Organize → Execute → Deliver. Every project begins with understanding the requirement, organizing the workflow, executing the necessary tasks, and delivering accurate results."
        />

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="relative p-8 border-t-2 border-[#1A1A1A]/20 hover:border-t-[#D4AF37] bg-transparent transition-[border-color] duration-500 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Step Marker */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl text-[#1A1A1A]/30 font-light">
                    {item.step}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-[#1A1A1A]/20 stroke-1" />
                  )}
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                    {item.label}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">
                    {item.phase}
                  </h3>
                </div>

                <p className="font-sans text-xs text-[#6C6863] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-[#1A1A1A]/10">
                <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-1">
                  Protocol Scope
                </span>
                <p className="font-sans text-[11px] text-[#1A1A1A]/80 leading-snug">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, ArrowRight, Phone, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  highlight?: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is prop money legal to buy, possess, and use in the European Union?',
    category: 'Legal Compliance',
    highlight: '100% Legal Safe Harbor',
    answer: 'Yes, 100% legal. Our prop euro banknotes strictly adhere to European Central Bank Decision ECB/2013/10 (Article 2). They feature official legal scaling (+25% dimensional ratio), 120gsm non-cotton cellulose stock, and indelible "FOR MOTION PICTURE USE ONLY" markings so they can never be mistaken for genuine legal tender while reading 100% authentic on camera monitors.',
  },
  {
    id: 'faq-2',
    question: 'What is European Central Bank (ECB) Decision 2013/10 and why is it crucial for film sets?',
    category: 'Regulations',
    highlight: 'ECB/2013/10 Art. 2',
    answer: 'ECB Decision 2013/10 establishes the legal reproduction rules for euro banknotes across all 20 eurozone nations. Any reproduction not meeting its criteria (such as exact 1:1 scale on genuine cotton paper) is legally classified as counterfeit currency. Every order from our studio includes a stamped Certificate of Compliance for your production book, location scout permits, and police liaisons.',
  },
  {
    id: 'faq-3',
    question: 'How does camera-calibrated prop money eliminate glare on 8K cinema sensors and LED volume stages?',
    category: 'Cinematography',
    highlight: 'Zero Hotspot Glare',
    answer: 'Unlike cheap novelty party money coated with plastic sheen that produces blinding white specular hotspots under ARRI SkyPanels and tungsten fixtures, our banknotes use premium non-reflective matte cellulose stock. The color curves are calibrated for ARRI Log-C4, RED IPP2, and Sony S-Log3 color profiles, preventing color shifting during post-production grading.',
  },
  {
    id: 'faq-4',
    question: 'What is the difference between 2-Sided Full Print notes and 1-Sided Stunt Filler stacks?',
    category: 'Prop Types',
    highlight: 'Macro vs Stunt Fill',
    answer: '2-Sided Full Print notes feature high-definition photographic reproduction on both the front and back, engineered for close-up macro shots, table spills, actor hand-offs, and wallet reveals. 1-Sided Stunt Filler stacks feature full-color prints on the outer notes with blank filler in the center, designed for high-volume cash cannons, leaf-blower money storm stunts, and background vault set dressings at a fraction of the cost.',
  },
  {
    id: 'faq-5',
    question: 'How fast is dispatch, and can you deliver directly to active film sets and call sheets?',
    category: 'Logistics',
    highlight: 'Same-Day Dispatch',
    answer: 'We provide same-day courier pickup and express 24-hour delivery directly to soundstages, production offices, and location sets across Berlin, London, Paris, Rome, Madrid, and Brussels. We coordinate via WhatsApp and phone with your Art Department or Line Producer, providing pre-cleared customs documentation for air transit and ATA Carnet manifests.',
  },
];

interface FAQSectionProps {
  onOpenCompliance?: () => void;
  onOpenQuote?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenCompliance,
  onOpenQuote,
}) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-16 lg:py-20 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-bold mb-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Art Department Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Everything production coordinators, prop masters, and independent creators need to know about European prop currency legality, camera calibration, and rapid call-sheet delivery.
          </p>
        </div>

        {/* 5 FAQs Accordion List */}
        <div className="space-y-3.5 mb-10">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 font-mono text-xs font-bold shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
                          {faq.category}
                        </span>
                        {faq.highlight && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                            {faq.highlight}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-amber-400 text-slate-950 rotate-180'
                        : 'bg-white border border-slate-200 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-amber-200/40">
                    <div className="pl-9.5">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support & Compliance CTA Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Have a custom production question or specific safe harbor requirement?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Our on-set support desk provides instantaneous answers, invoices, and customs certificates.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {onOpenCompliance && (
              <button
                onClick={onOpenCompliance}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Legal Framework
              </button>
            )}
            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Request Studio Quote
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

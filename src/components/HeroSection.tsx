import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Video, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroSectionProps {
  onScrollToCatalog: () => void;
  onScrollToCalculator: () => void;
  onOpenCompliance: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCatalog,
  onScrollToCalculator,
  onOpenCompliance,
}) => {
  return (
    <section className="relative w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:py-20">
        {/* 2-Column Split: Hero Headline & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet 1-line text kicker without pill boxes */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">
              <span>European Film Prop Supply</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>ECB Decision 2013/10 Certified</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Next-Day Shoot Dispatch</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 max-w-2xl text-balance">
              Realistic Euro Prop Money for Film & AI Content Creators
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl mb-8">
              Calibrated specifically for 8K digital cinema cameras, DP viewfinders, LED volume stages, and generative AI production. Non-reflective ultra-matte paper with legally mandated markings that pass customs clearance while reading 100% authentic on lens.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onScrollToCatalog}
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all cursor-pointer whitespace-nowrap shadow-xl shadow-amber-400/20 active:scale-[0.98]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToCatalog}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Browse Prop Stacks</span>
              </button>
            </div>

            {/* Studio quote fast track */}
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="text-zinc-500">Need official studio invoicing or VAT exempt billing?</span>
              <button
                onClick={onOpenCompliance}
                className="text-amber-400 underline underline-offset-4 hover:text-amber-300 transition-colors cursor-pointer"
              >
                View Legal ECB Framework
              </button>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <img
                src={HERO_IMAGE}
                alt="Cinema film set with camera and banded Euro prop money stacks"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />
              
              {/* Studio Camera Overlay Spec HUD */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-zinc-950/80 backdrop-blur-md px-3 py-2 rounded border border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">REC ●</span>
                  <span>ARRI ALEXA 35</span>
                  <span className="text-zinc-500">·</span>
                  <span>LOG-C4</span>
                </div>
                <span className="text-emerald-400">NON-REFLECTIVE MATTE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Studio Spec Proof Row (Full-width row below hero split) */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">ECB 2013/10</span>
            </div>
            <p className="text-sm font-semibold text-white">Legal Safe Harbor</p>
            <p className="text-xs text-zinc-400 mt-0.5">Certificates for border customs & location scouts included.</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Video className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Camera Calibrated</span>
            </div>
            <p className="text-sm font-semibold text-white">Zero Glare Under 8K</p>
            <p className="text-xs text-zinc-400 mt-0.5">Matte cellulose stock eliminates hotspot reflections on lenses.</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Zap className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Fast Courier</span>
            </div>
            <p className="text-sm font-semibold text-white">Call Sheet Guarantee</p>
            <p className="text-xs text-zinc-400 mt-0.5">Same-day dispatch to stages in Berlin, London, Paris & Rome.</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Award className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">450+ Productions</span>
            </div>
            <p className="text-sm font-semibold text-white">Studio Trusted</p>
            <p className="text-xs text-zinc-400 mt-0.5">Supplying Netflix, BBC, Canal+, and indie festival features.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

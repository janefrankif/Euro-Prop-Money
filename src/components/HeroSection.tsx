import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Video, Award, Layers } from 'lucide-react';
import heroCoverLocal from '../assets/images/hero_cover.jpg';

// Google Drive stream CDN URL corresponding to 1KF3WYnQ9j_H7sIdIAwM6pSflQhBdvgSH/view?usp=sharing
const NEW_HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1KF3WYnQ9j_H7sIdIAwM6pSflQhBdvgSH';

// Next.js-compatible Image component implementation for Vite/React SPA environment
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
  quality?: number;
}

const Image: React.FC<ImageProps> = ({ 
  fill, 
  priority = false, 
  className = '', 
  src, 
  alt = '', 
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`${fill ? 'absolute inset-0 w-full h-full' : ''} ${className}`}
      onError={(e) => {
        // Fallback to locally cached copy if direct Drive URL is inaccessible
        if ((e.currentTarget as HTMLImageElement).src !== heroCoverLocal) {
          (e.currentTarget as HTMLImageElement).src = heroCoverLocal;
        }
      }}
      {...props}
    />
  );
};

interface HeroSectionProps {
  onScrollToCatalog: () => void;
  onOpenCompliance?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCatalog,
  onOpenCompliance,
}) => {
  return (
    <section className="relative w-full h-[620px] sm:h-[660px] lg:h-[720px] overflow-hidden flex items-center justify-center">
      {/* 1. Full-Cover Hero Background Image via Next.js-style <Image> with fill & priority */}
      <Image
        src={heroCoverLocal || NEW_HERO_IMAGE_URL}
        alt="Euro 500 prop money stack on cinematic marble surface - Full Cover Hero"
        fill
        priority={true}
        className="object-cover object-center"
      />

      {/* 2. Dark Overlay for optimal text readability across the entire cover */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]" aria-hidden="true" />

      {/* 3. Content Overlay (relative z-10) */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-between h-full">
        {/* Top Badges & Headline Area */}
        <div className="my-auto max-w-3xl">
          {/* Header Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-xs font-mono uppercase tracking-wider font-semibold mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>European Film Prop Supply</span>
            <span className="text-white/40">·</span>
            <span>ECB Decision 2013/10 Certified</span>
            <span className="text-white/40">·</span>
            <span className="text-white">Call-Sheet 24H</span>
          </div>

          {/* H1 Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 drop-shadow-md">
            Realistic Euro Prop Money for Film & AI Content Creators
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl mb-8 font-normal drop-shadow-sm">
            High-definition, camera-calibrated Euro prop currency bundles and cinematic stacks. Engineered for 8K digital cinema cameras, LED volume stages, and generative AI production with non-reflective matte finish and official safe harbor markings.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button
              onClick={onScrollToCatalog}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-all cursor-pointer whitespace-nowrap shadow-xl hover:shadow-amber-400/20 active:scale-[0.98] group"
            >
              <span>Order Prop Currency</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onScrollToCatalog}
              className="flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/25 rounded-xl hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer whitespace-nowrap shadow-lg"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Browse All Denominations</span>
            </button>
          </div>

          {/* Invoicing & Compliance Note */}
          {onOpenCompliance && (
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span>Need official studio invoicing or VAT-exempt billing?</span>
              <button
                onClick={onOpenCompliance}
                className="text-amber-400 underline underline-offset-4 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
              >
                View Legal ECB Framework
              </button>
            </div>
          )}
        </div>

        {/* 4. Bottom 4-Column Studio Spec Proof Bar */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 text-white shadow-2xl">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">ECB 2013/10</span>
            </div>
            <p className="text-sm font-semibold text-white">Legal Safe Harbor</p>
            <p className="text-xs text-slate-300 mt-0.5">Border customs clearance certificate included.</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Video className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Camera Calibrated</span>
            </div>
            <p className="text-sm font-semibold text-white">Zero Glare Under 8K</p>
            <p className="text-xs text-slate-300 mt-0.5">Matte cellulose stock eliminates hotspot flares.</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Zap className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Fast Courier</span>
            </div>
            <p className="text-sm font-semibold text-white">Call Sheet Guarantee</p>
            <p className="text-xs text-slate-300 mt-0.5">Next-day delivery across European studio stages.</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Award className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">450+ Productions</span>
            </div>
            <p className="text-sm font-semibold text-white">Studio Trusted</p>
            <p className="text-xs text-slate-300 mt-0.5">Supplying major broadcast and indie film sets.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

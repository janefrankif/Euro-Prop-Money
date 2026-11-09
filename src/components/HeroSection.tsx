'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Video, Award, Layers } from 'lucide-react';
import heroCoverLocal from '../assets/images/hero_cover.jpg';

// Google Drive stream CDN URL corresponding to 1KF3WYnQ9j_H7sIdIAwM6pSflQhBdvgSH/view?usp=sharing
const NEW_HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1KF3WYnQ9j_H7sIdIAwM6pSflQhBdvgSH';

const heroCoverLocalSrc =
  typeof heroCoverLocal === 'string'
    ? heroCoverLocal
    : (heroCoverLocal as unknown as { src?: string })?.src || '';

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
        if (heroCoverLocalSrc && (e.currentTarget as HTMLImageElement).src !== heroCoverLocalSrc) {
          (e.currentTarget as HTMLImageElement).src = heroCoverLocalSrc;
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
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* 1. Full-Cover Hero Background Image via Next.js-style <Image> with fill & priority */}
      <Image
        src={heroCoverLocalSrc || NEW_HERO_IMAGE_URL}
        alt="prop money euro"
        fill
        priority={true}
        className="object-cover object-center"
      />

      {/* 2. Dark Overlay for optimal text readability across the entire cover */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]" aria-hidden="true" />

      {/* 3. Content Overlay (relative z-10) centered inside the viewport */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center my-auto">
        {/* Header Kicker Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold mb-3 sm:mb-4 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>European Film Prop Supply</span>
          <span className="text-white/40">·</span>
          <span>ECB Decision 2013/10 Certified</span>
          <span className="text-white/40">·</span>
          <span className="text-white">Call-Sheet 24H</span>
        </div>

        {/* H1 Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3 sm:mb-4 drop-shadow-md max-w-3xl text-balance">
          Realistic Euro Prop Money for Film & AI Content Creators
        </h1>

        {/* Tagline */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl mb-4 sm:mb-6 font-normal drop-shadow-sm">
          High-definition, camera-calibrated Euro prop currency bundles and cinematic stacks. Engineered for 8K digital cinema cameras, LED volume stages, and generative AI production with non-reflective matte finish and official safe harbor markings.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <button
            onClick={onScrollToCatalog}
            className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-amber-400/20 active:scale-[0.98] group"
          >
            <span>Order Prop Currency</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onScrollToCatalog}
            className="flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/25 rounded-xl hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer whitespace-nowrap shadow-md"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Browse All Denominations</span>
          </button>
        </div>

        {/* Invoicing & Compliance Note */}
        {onOpenCompliance && (
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-300 mb-4 sm:mb-5">
            <span>Need official studio invoicing or VAT-exempt billing?</span>
            <button
              onClick={onOpenCompliance}
              className="text-amber-400 underline underline-offset-4 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              View Legal ECB Framework
            </button>
          </div>
        )}

        {/* 4. Streamlined 4-Column Studio Spec Proof Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl w-full bg-black/40 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-white/15 text-white shadow-xl text-left">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-400 mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">ECB 2013/10</span>
            </div>
            <p className="text-xs font-semibold text-white">Legal Safe Harbor</p>
            <p className="text-[10px] text-slate-300">Customs clearance included</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-400 mb-0.5">
              <Video className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Camera Calibrated</span>
            </div>
            <p className="text-xs font-semibold text-white">Zero Glare Under 8K</p>
            <p className="text-[10px] text-slate-300">Matte cellulose stock</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-400 mb-0.5">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Fast Courier</span>
            </div>
            <p className="text-xs font-semibold text-white">Call Sheet Guarantee</p>
            <p className="text-[10px] text-slate-300">24H European dispatch</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-400 mb-0.5">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">450+ Productions</span>
            </div>
            <p className="text-xs font-semibold text-white">Studio Trusted</p>
            <p className="text-[10px] text-slate-300">Film & TV verified</p>
          </div>
        </div>
      </div>
    </section>
  );
};

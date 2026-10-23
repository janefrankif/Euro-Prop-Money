import React from 'react';
import { Film, ShieldCheck, Truck, Award, Users, CheckCircle, ArrowRight, Video, FileText } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onOpenCompliance: () => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onOpenCompliance,
  onOpenQuote,
}) => {
  return (
    <div className="w-full bg-zinc-950 min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* WooCommerce Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-300 font-semibold">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b border-zinc-800 mb-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <Film className="w-4 h-4" />
              <span>European Studio Prop Manufacturing</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Established 2018</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Engineered For The Camera Sensor. Certified For The Law.
            </h1>
            <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">
              Euro Prop Money was founded in Berlin by veteran prop masters and cinematography technicians. Our mission: end the era of shiny, plastic-coated counterfeit toys that reflect ugly hot spots into anamorphic cinema glass and risk criminal investigations on location.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onNavigateShop}
                className="px-6 py-3 bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Shop Prop Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCompliance}
                className="px-5 py-3 bg-zinc-900 border border-zinc-700 text-white font-semibold text-xs rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Inspect ECB 2013/10 Rules
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <img
                src={HERO_IMAGE}
                alt="Cinema set camera testing Euro prop money"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md p-3 rounded-lg border border-zinc-800 text-[11px] font-mono text-zinc-300">
                <span className="text-amber-400 font-bold">SET TEST PROTOCOL:</span> 8K RAW Close-up · Flanders Scientific Color Mastered
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Studio Excellence */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              The Four Pillars of Euro Prop Money
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Every single stack of prop currency that leaves our Berlin, London, and Paris fulfillment vaults satisfies these rigorous benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase font-mono">
                <Video className="w-5 h-5" />
                <span>1. Camera-Calibrated Paper Science</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                We reject commercial consumer gloss paper. Instead, our proprietary 120gsm cellulose wood-pulp bond paper absorbs light from 1.2kW HMI and 800W tungsten bounce sources. When colorists grade in DaVinci Resolve on ARRI Log-C4 or RED IPP2 color spaces, our prop notes retain realistic texture and authentic ink gradation across 17+ stops of dynamic latitude.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase font-mono">
                <ShieldCheck className="w-5 h-5" />
                <span>2. Uncompromised European Legal Safe Harbor</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Operating under European Central Bank Decision ECB/2013/10 (Article 2), our double-sided notes feature mandatory scale variance exceeding 125% of authentic dimensions. Indelible markings such as &ldquo;FOR MOTION PICTURE USE ONLY&rdquo; and &ldquo;PROP SPECIMEN&rdquo; protect productions from anti-counterfeit raids and transit confiscations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase font-mono">
                <Truck className="w-5 h-5" />
                <span>3. 24-Hour Call Sheet Emergency Logistics</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Production shoot schedules cannot afford delays. When stunts tear up banknotes or a director adds an impromptu vault scene, our dedicated soundstage dispatch courier services in Berlin, London, Paris, and Rome deliver replacement cases directly to your set before morning call times.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase font-mono">
                <Users className="w-5 h-5" />
                <span>4. Production Accounting Ready</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                We support instant EU VAT reverse-charge billing (0% VAT for registered companies), formal purchase orders (PO), itemized gear requisitions, and digital clearance affidavits ready for your ATA Carnet folder.
              </p>
            </div>
          </div>
        </div>

        {/* Manufacturing & Craftsmanship Story */}
        <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4 mb-16">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
            From The Workshop To The Soundstage
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Every bundle of Euro Prop Money is printed with high-resolution lithographic plate calibration, precision guillotine trimmed, and banded with heavy kraft paper currency straps. For productions requiring realistic aged currency, our props undergo tumbling and hand-distressing to reflect the worn, crinkled look of circulated notes in criminal underworld dramas.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-800 text-center font-mono">
            <div>
              <div className="text-2xl font-bold text-amber-400">450+</div>
              <div className="text-[11px] text-zinc-500">Films & Series Supplied</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">100%</div>
              <div className="text-[11px] text-zinc-500">ECB 2013/10 Legal Clearance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">&lt;24H</div>
              <div className="text-[11px] text-zinc-500">Soundstage Dispatch Window</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">4.9/5</div>
              <div className="text-[11px] text-zinc-500">Trustpilot Studio Score</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8">
          <h3 className="text-xl font-bold text-white mb-2">Ready for Tomorrow&apos;s Call Sheet?</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
            Explore our single denomination stacks, tactical heist duffel bags, or the Director&apos;s Euro Prop Money Suitcase.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={onNavigateShop}
              className="px-6 py-3 bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-colors cursor-pointer shadow-lg"
            >
              Explore Shop Catalog
            </button>
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Generate Studio PO Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

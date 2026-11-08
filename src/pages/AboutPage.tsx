import React from 'react';
import { Film, ShieldCheck, Truck, Award, Users, CheckCircle, ArrowRight, Video, FileText, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { Link } from '../router';

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
    <div className="w-full bg-white min-h-screen py-10 lg:py-16 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* WooCommerce Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
          <Link
            to="/"
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b border-slate-200 mb-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
              <Film className="w-4 h-4 text-amber-600" />
              <span>European Studio Prop Manufacturing</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Established 2018</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Engineered For The Camera Sensor. Certified For The Law.
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Euro Prop Money was founded in Berlin by veteran prop masters and cinematography technicians. Our mission: end the era of shiny, plastic-coated counterfeit toys that reflect ugly hot spots into anamorphic cinema glass and risk criminal investigations on location.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onNavigateShop}
                className="px-6 py-3 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Shop Prop Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCompliance}
                className="px-5 py-3 bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Inspect ECB 2013/10 Rules
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
              <img
                src={HERO_IMAGE}
                alt="Cinema set camera testing Euro prop money"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://lh3.googleusercontent.com/d/1hivs0TD-lQnB3h7D5Qo67tWhr-j-qhZS';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-200">
                <span className="text-amber-400 font-bold">SET TEST PROTOCOL:</span> 8K RAW Close-up · Flanders Scientific Color Mastered
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Studio Excellence */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              The Four Pillars of Euro Prop Money
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every single stack of prop currency that leaves our Berlin, London, and Paris fulfillment vaults satisfies these rigorous benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm uppercase font-mono">
                <Video className="w-5 h-5 text-amber-600" />
                <span>1. Camera-Calibrated Paper Science</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We reject commercial consumer gloss paper. Instead, our proprietary 120gsm cellulose wood-pulp bond paper absorbs light from 1.2kW HMI and 800W tungsten bounce sources. When colorists grade in DaVinci Resolve on ARRI Log-C4 or RED IPP2 color spaces, our prop notes retain realistic texture and authentic ink gradation across 17+ stops of dynamic latitude.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase font-mono">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>2. Uncompromised European Legal Safe Harbor</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operating under European Central Bank Decision ECB/2013/10 (Article 2), our double-sided notes feature mandatory scale variance exceeding 125% of authentic dimensions. Indelible markings such as &ldquo;FOR MOTION PICTURE USE ONLY&rdquo; and &ldquo;PROP SPECIMEN&rdquo; protect productions from anti-counterfeit raids and transit confiscations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase font-mono">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>3. 24-Hour Call Sheet Emergency Logistics</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Production shoot schedules cannot afford delays. When stunts tear up banknotes or a director adds an impromptu vault scene, our dedicated soundstage dispatch courier services in Berlin, London, Paris, and Rome deliver replacement cases directly to your set before morning call times.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-sm uppercase font-mono">
                <Users className="w-5 h-5 text-purple-600" />
                <span>4. Production Accounting Ready</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We support instant EU VAT reverse-charge billing (0% VAT for registered companies), formal purchase orders (PO), itemized gear requisitions, and digital clearance affidavits ready for your ATA Carnet folder.
              </p>
            </div>
          </div>
        </div>

        {/* Manufacturing & Craftsmanship Story */}
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 mb-16 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider font-mono">
              From The Workshop To The Soundstage
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-semibold text-slate-900">Studio HQ:</span>
              <span className="text-slate-600">Stralauer Allee 7, 10245 Berlin-Bezirk Friedrichshain-Kreuzberg</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every bundle of Euro Prop Money is printed with high-resolution lithographic plate calibration, precision guillotine trimmed, and banded with heavy kraft paper currency straps. For productions requiring realistic aged currency, our props undergo tumbling and hand-distressing to reflect the worn, crinkled look of circulated notes in criminal underworld dramas.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 text-center font-mono">
            <div>
              <div className="text-2xl font-bold text-amber-700">450+</div>
              <div className="text-[11px] text-slate-500">Films & Series Supplied</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">100%</div>
              <div className="text-[11px] text-slate-500">ECB 2013/10 Legal Clearance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">&lt;24H</div>
              <div className="text-[11px] text-slate-500">Soundstage Dispatch Window</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">4.9/5</div>
              <div className="text-[11px] text-slate-500">Trustpilot Studio Score</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Ready for Tomorrow&apos;s Call Sheet?</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
            Explore our single denomination stacks, tactical heist duffel bags, or the Director&apos;s Euro Prop Money Suitcase.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={onNavigateShop}
              className="px-6 py-3 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-colors cursor-pointer shadow-xs"
            >
              Explore Shop Catalog
            </button>
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 bg-white border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
            >
              Generate Studio PO Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

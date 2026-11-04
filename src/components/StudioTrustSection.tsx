import React from 'react';
import { ShieldCheck, Video, Clock, Truck, FileCheck } from 'lucide-react';

interface StudioTrustSectionProps {
  onOpenCompliance: () => void;
  onOpenQuote: () => void;
}

export const StudioTrustSection: React.FC<StudioTrustSectionProps> = ({
  onOpenCompliance,
  onOpenQuote,
}) => {
  return (
    <section id="about" className="w-full py-16 lg:py-24 border-b border-slate-200 bg-slate-50/60 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-2">
            <span>Production Trust & Verification</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Studio Safe Harbor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built To Withstand 8K Lenses And Customs Audits
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From emergency reshoots at Pinewood to heist sequences on the streets of Marseille, our prop currency satisfies European legal regulations while delivering indistinguishable realism on monitor playbacks.
          </p>
        </div>

        {/* 3 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1 */}
          <div className="rounded-xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Video className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Camera-Grade Non-Reflective Finish
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cheap commercial props use glossy coated paper that flares brightly into digital cinema sensors. Our proprietary matte cellulose stock absorbs glare from 1.2kW HMI and 800W tungsten fixtures, rendering authentic paper grain under high magnification.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Calibrated for ARRI Log-C4 & RED IPP2
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                100% European Central Bank Compliance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manufactured strictly pursuant to ECB Decision 2013/10 Section 2. Includes mandatory dimensional variance and indelible non-negotiable markings that protect your production from anti-counterfeit criminal investigation.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-mono text-slate-500">Border Transit Safe</span>
              <button
                onClick={onOpenCompliance}
                className="text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
              >
                Read Framework
              </button>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Emergency 24H Call Sheet Logistics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shoots cannot wait for standard 5-day delivery windows. When an actor tears a stunt stack or the director adds an impromptu vault scene, our expedited couriers deliver directly to soundstages across Europe before morning call times.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Hubs in Berlin, London, Paris & Rome
            </div>
          </div>
        </div>

        {/* Attributable Production Testimonials */}
        <div className="border-t border-slate-200 pt-12">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-6">
            Production Crew Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                &quot;We had an intense macro close-up of a hostage ransom handoff in our Berlin heist feature. Standard props reflected ugly white glare into our Cooke anamorphic lenses. CINE EURO&apos;s €100 stacks looked completely natural on our Flanders scientific monitor, and the paperwork passed German federal police inspection without a hitch.&quot;
              </p>
              <footer className="text-xs">
                <span className="font-bold text-slate-900 block">Matthias Richter</span>
                <span className="text-slate-500 font-mono text-[11px]">Key Prop Master · Studio Babelsberg Productions</span>
              </footer>
            </blockquote>

            <blockquote className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                &quot;Ordering production bundles for our bank vault scene was seamless. We ordered 60 stacks with instant volume savings and had the full PO approved by our line producer in minutes. Delivered to our London soundstage 18 hours later before 06:30 call time.&quot;
              </p>
              <footer className="text-xs">
                <span className="font-bold text-slate-900 block">Sarah O&apos;Connor</span>
                <span className="text-slate-500 font-mono text-[11px]">Production Coordinator · Thames Screenworks UK</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

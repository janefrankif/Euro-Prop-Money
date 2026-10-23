import React from 'react';
import { ShieldCheck, Video, Award, CheckCircle, FileText, ArrowRight } from 'lucide-react';

interface SEORichSectionProps {
  onOpenCompliance: () => void;
  onOpenQuote: () => void;
}

export const SEORichSection: React.FC<SEORichSectionProps> = ({
  onOpenCompliance,
  onOpenQuote,
}) => {
  return (
    <section className="w-full py-16 lg:py-24 border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-8 space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <span>Cinema Production Knowledge Base</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>Camera Grade Standards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                Realistic Euro Prop Money for Film, Television & AI Studio Productions
              </h2>
              <p>
                When staging high-stakes casino confrontations, heist vault breaches, or dramatic ransom drops, authenticity on camera is paramount. In modern high-definition cinematography—utilizing 8K large-format sensors such as the ARRI ALEXA 35, RED V-Raptor, and Sony VENICE 2—inferior novelty currency ruins cinematic immersion with harsh specular glare, fake color casts, and poor tactile texture.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Camera-Grade Non-Reflective Matte Finish vs Cheap Glossy Props
              </h3>
              <p>
                Commercial novelty banknotes sold on consumer marketplaces are printed on synthetic glossy coated stock that glares uncontrollably under studio lighting rigs, blowing out high dynamic range highlight values. <strong>Euro Prop Money</strong> utilizes proprietary non-reflective 120gsm cellulose matte bond paper. Our notes absorb ambient fixture scatter from 1.2kW HMI lamps, tungsten Fresnel units, and LED softboxes, maintaining accurate color science across Log-C, ACES, and RED IPP2 color management workflows.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Strict Adherence to European Central Bank Decision ECB/2013/10
              </h3>
              <p>
                Operating with counterfeit currency carries grave criminal penalties across the European Union. To provide European film producers, line producers, and art directors with total legal indemnity, our full-print prop bills strictly satisfy Section 2 reproduction criteria:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                <li className="flex items-start gap-2 p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Dimensional Variance:</strong> Sized &gt;125% or &lt;75% of authentic ECB note dimensions.</span>
                </li>
                <li className="flex items-start gap-2 p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Indelible Marking:</strong> Crisp "FOR MOTION PICTURE USE ONLY" and "PROP SPECIMEN" text.</span>
                </li>
                <li className="flex items-start gap-2 p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Counterfeit Tech:</strong> No genuine foil holograms, watermarks, or magnetic stripes.</span>
                </li>
                <li className="flex items-start gap-2 p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Customs Affidavit:</strong> Stamped certificate of manufacture for border and police transit.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Optimized for Generative AI Video & LED Volume Stages
              </h3>
              <p>
                In virtual production environments and AI video capture workflows, specular highlights on props distort neural radiance field (NeRF) generation and optical motion capture tracking. Our prop currency bundles integrate effortlessly into virtual soundstages, providing actors with tactile weight and friction while preventing tracking marker occlusion.
              </p>
            </div>
          </div>

          {/* Quick Studio Action Sidebar */}
          <div className="lg:col-span-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 sm:p-7 space-y-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase">Studio Safe Harbor</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Need Set Clearance Documents?
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Download the official dual-language certificate of manufacture or inspect the legal clause text for municipal film office permits.
              </p>
              <button
                onClick={onOpenCompliance}
                className="w-full py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>View ECB Clearance Guide</span>
              </button>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <span className="text-xs font-mono font-bold uppercase text-zinc-400 block mb-1">
                Emergency Call Sheet Orders
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Shooting tomorrow morning? Our fulfillment hubs in Berlin, London, Paris, and Rome offer same-day courier drop-off directly to stage addresses.
              </p>
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-3 bg-amber-400 text-zinc-950 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Generate Studio PO Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-400 space-y-1">
              <div className="text-white font-bold">DISPATCH SPEEDS:</div>
              <div>• Next-Day Flight Courier (EU & UK)</div>
              <div>• 2-4 Hour Stage Messenger (Berlin / London)</div>
              <div>• Worldwide Express (DHL / FedEx Priority)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

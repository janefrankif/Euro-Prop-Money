import React from 'react';
import { X, Film, ShieldCheck, Truck, Award, Users, CheckCircle } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCompliance: () => void;
  onOpenQuote: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenCompliance,
  onOpenQuote,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              About Euro Prop Money
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close about modal"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-300 text-xs sm:text-sm leading-relaxed">
          {/* Hero Banner inside About */}
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Our Studio Heritage
            </span>
            <h2 className="text-xl font-extrabold text-white">
              Crafted by Filmmakers, Calibrated for Modern Lenses
            </h2>
            <p className="text-zinc-400 text-xs">
              Founded in 2018 in Berlin by veteran prop masters and cinematography technicians, Euro Prop Money was born out of frustration with shiny, reflective consumer novelty money that ruined camera takes under professional studio fixtures.
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
                <Award className="w-4 h-4" />
                <span>Camera-Tested Optics</span>
              </div>
              <p className="text-xs text-zinc-400">
                Every print batch is audited on calibrated 8K sensors under 3200K tungsten and 5600K daylight to guarantee zero specular flare and accurate logarithmic color science.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Legal Safe Harbor</span>
              </div>
              <p className="text-xs text-zinc-400">
                Manufactured strictly according to European Central Bank Decision ECB/2013/10 with mandatory dimensional scaling and indelible prop markings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase font-mono">
                <Truck className="w-4 h-4" />
                <span>Call Sheet Delivery</span>
              </div>
              <p className="text-xs text-zinc-400">
                We understand shoot deadlines. Central depots in Berlin, London, and Paris fulfill emergency orders with same-day stage courier service.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase font-mono">
                <Users className="w-4 h-4" />
                <span>Trusted by 450+ Productions</span>
              </div>
              <p className="text-xs text-zinc-400">
                From major streaming platform crime series to high-concept Cannes indie features and music videos, our props bring high realism to every frame.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Our Legal Commitment to the European Film Industry
            </h4>
            <p className="text-xs text-zinc-400">
              We never produce or sell counterfeits. Our products are explicitly designed, engineered, and labeled as motion picture and artistic props. We work closely with municipal film commissions and law enforcement liaisons to provide complete clearance documentation for every shoot.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={() => {
                onClose();
                onOpenCompliance();
              }}
              className="flex-1 py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer"
            >
              Read ECB Compliance Framework
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer shadow-md"
            >
              Generate Studio Purchase Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

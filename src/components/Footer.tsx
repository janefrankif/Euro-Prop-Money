import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenQuote,
  onScrollToTop,
}) => {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-12 pb-24 md:pb-12 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800/80">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer"
            >
              <span className="text-base font-extrabold text-white tracking-tight uppercase block hover:text-amber-400 transition-colors">
                Euro Prop Money <span className="text-zinc-500 font-normal text-xs normal-case block sm:inline">/ Studio Props</span>
              </span>
            </button>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Specialist European supplier of realistic, camera-calibrated Euro prop currency bundles, flight cases, and stunt money for television, motion pictures, music videos, and AI virtual studio sets.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-zinc-300 font-semibold block">
              WooCommerce Store Pages
            </span>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home (Featured Stacks)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-amber-400/90"
                >
                  Shop Full Catalog (All Props)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us (Studio Heritage)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact & Support Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Production Blog & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Resources */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-zinc-300 font-semibold block">
              Production Support
            </span>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('compliance')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-emerald-400 font-medium"
                >
                  ECB Decision 2013/10 Legal Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Purchase Order / Invoice Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('bulk-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Volume Tier Discount Calculator
                </button>
              </li>
              <li>
                <span className="text-emerald-400 font-mono text-[11px]">
                  24-Hour Stage Courier Available
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Safe Harbor Disclaimer */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal Safe Harbor</span>
            </span>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              <strong>For Motion Picture, TV, and Media Production Use Only.</strong> All currency props displayed are manufactured under Article 2 of European Central Bank Decision ECB/2013/10. Not legal tender. Circulating or attempting to spend prop currency constitutes a criminal counterfeit offense.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Euro Prop Money EU. All rights reserved. Registered European Art Department & Motion Picture Supplier.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('compliance')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              ECB Legal Compliance
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

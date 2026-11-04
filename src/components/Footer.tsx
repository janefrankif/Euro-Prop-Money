import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { SiteLogo } from './SiteLogo';

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
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-12 pb-24 md:pb-12 text-slate-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer"
            >
              <SiteLogo size="md" variant="full" />
            </button>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Specialist European supplier of realistic, camera-calibrated Euro prop currency bundles, flight cases, and stunt money for television, motion pictures, music videos, and AI virtual studio sets.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-900 font-semibold block">
              WooCommerce Store Pages
            </span>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Home (Featured Stacks)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-amber-700 transition-colors cursor-pointer text-left font-semibold text-amber-700"
                >
                  Shop Full Catalog (All Props)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  About Us (Studio Heritage)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Contact & Support Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Production Blog & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Resources */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-900 font-semibold block">
              Production Support
            </span>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('compliance')}
                  className="hover:text-emerald-800 transition-colors cursor-pointer text-left text-emerald-700 font-medium"
                >
                  ECB Decision 2013/10 Legal Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Purchase Order / Invoice Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Priority Soundstage Dispatch
                </button>
              </li>
              <li>
                <span className="text-emerald-700 font-mono text-[11px] font-semibold">
                  24-Hour Stage Courier Available
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Safe Harbor Disclaimer */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-amber-700 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Legal Safe Harbor</span>
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong>For Motion Picture, TV, and Media Production Use Only.</strong> All currency props displayed are manufactured under Article 2 of European Central Bank Decision ECB/2013/10. Not legal tender. Circulating or attempting to spend prop currency constitutes a criminal counterfeit offense.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Euro Prop Money EU. All rights reserved. Registered European Art Department & Motion Picture Supplier.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('compliance')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              ECB Legal Compliance
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
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

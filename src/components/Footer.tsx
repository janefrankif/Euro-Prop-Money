import React from 'react';
import { ShieldCheck, ArrowUp, Scale, FileText, Lock, RefreshCw, Truck, MapPin } from 'lucide-react';
import { SiteLogo } from './SiteLogo';
import { Link } from '../router';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
  onScrollToTop: () => void;
  onOpenLegal?: (tab: 'terms' | 'privacy' | 'refund' | 'shipping' | 'compliance') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenQuote,
  onScrollToTop,
  onOpenLegal,
}) => {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-12 pb-24 md:pb-12 text-slate-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <Link
              to="/"
              className="text-left cursor-pointer inline-block"
              aria-label="Euro Prop Money Home"
            >
              <SiteLogo size="md" variant="full" />
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed pt-1 max-w-sm">
              Specialist European supplier of realistic, camera-calibrated Euro prop currency bundles, flight cases, and stunt money for television, motion pictures, music videos, and AI virtual studio sets.
            </p>
            <div className="pt-1 flex items-start gap-2 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Studio Headquarters &amp; Central Vault:</span>
                <span className="text-slate-600 font-mono text-[11px]">Stralauer Allee 7, 10245 Berlin-Bezirk Friedrichshain-Kreuzberg, Germany</span>
              </div>
            </div>
            <div className="pt-1 flex items-center gap-3 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                ECB 2013/10 Section 2(3) Compliant
              </span>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-900 font-bold block tracking-wider">
              Pages
            </span>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <Link
                  to="/"
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-amber-700 transition-colors cursor-pointer text-left font-semibold text-amber-700 block"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left block"
                >
                  Production Blog
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Purchase Order / Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-900 font-bold block tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              <span>Legal Pages</span>
            </span>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal('terms') : onNavigate('compliance')}
                  className="hover:text-amber-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal('privacy') : onNavigate('compliance')}
                  className="hover:text-amber-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal('refund') : onNavigate('compliance')}
                  className="hover:text-amber-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-slate-400" />
                  <span>Refund &amp; Returns Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal('shipping') : onNavigate('compliance')}
                  className="hover:text-amber-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Truck className="w-3 h-3 text-slate-400" />
                  <span>Shipping &amp; Delivery</span>
                </button>
              </li>
              <li>
                <Link
                  to="/compliance"
                  className="hover:text-emerald-800 transition-colors cursor-pointer text-left flex items-center gap-1.5 text-emerald-700 font-medium"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>ECB Safe Harbor Compliance</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Safe Harbor Notice */}
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
            &copy; {new Date().getFullYear()} Euro Prop Money EU. Registered European Motion Picture Supplier · Stralauer Allee 7, 10245 Berlin-Bezirk Friedrichshain-Kreuzberg.
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onOpenLegal ? onOpenLegal('terms') : onNavigate('compliance')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenLegal ? onOpenLegal('privacy') : onNavigate('compliance')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenLegal ? onOpenLegal('refund') : onNavigate('compliance')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Refunds
            </button>
            <span aria-hidden="true">·</span>
            <Link
              to="/compliance"
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              ECB Legal Compliance
            </Link>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onScrollToTop}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer ml-1"
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

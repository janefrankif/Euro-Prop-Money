import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, Menu, X, Zap, Phone, ChevronDown, Layers, Briefcase, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { SiteLogo } from './SiteLogo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, category?: string) => void;
  onOpenCheckout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenCheckout,
}) => {
  const { getItemCount, setIsOpen } = useCartStore();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileShopSubmenuOpen, setMobileShopSubmenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (page: string, category?: string) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Logo & Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => handleNav('home')}
            className="text-left cursor-pointer flex items-center"
            aria-label="Euro Prop Money Home"
          >
            <SiteLogo size="md" variant="full" />
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links (All Caps Lock) with Shop Category Dropdown */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-bold tracking-wider text-slate-700 uppercase">
          {/* HOME */}
          <button
            onClick={() => handleNav('home')}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'home'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            HOME
          </button>

          {/* SHOP with Category Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => handleNav('shop')}
              onMouseEnter={() => setShopDropdownOpen(true)}
              className={`flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap py-1 ${
                currentPage === 'shop'
                  ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>SHOP</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-amber-600" />
            </button>

            {shopDropdownOpen && (
              <div
                onMouseLeave={() => setShopDropdownOpen(false)}
                className="absolute left-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 p-2 shadow-2xl z-50 text-xs normal-case space-y-1"
              >
                <button
                  onClick={() => handleNav('shop', 'all')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">All Products</div>
                    <div className="text-[10px] text-slate-500">Complete studio catalog</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNav('shop', 'single')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">Single Denominations</div>
                    <div className="text-[10px] text-slate-500">€5 to €500 individual stacks</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNav('shop', 'bundles')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">Stacks & Bundles</div>
                    <div className="text-[10px] text-slate-500">Turnkey bags, cases & packs</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNav('shop', 'special')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">Special Finishes</div>
                    <div className="text-[10px] text-slate-500">Aged crime & 1-sided stunts</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* ABOUT US */}
          <button
            onClick={() => handleNav('about')}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'about'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            ABOUT US
          </button>

          {/* CONTACT */}
          <button
            onClick={() => handleNav('contact')}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'contact'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            CONTACT
          </button>

          {/* BLOG */}
          <button
            onClick={() => handleNav('blog')}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'blog'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            BLOG
          </button>

          {/* ECB LEGAL COMPLIANCE */}
          <button
            onClick={() => handleNav('compliance')}
            className={`flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'compliance'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-emerald-700 hover:text-emerald-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ECB LEGAL COMPLIANCE</span>
          </button>
        </nav>

        {/* Zone 3: CTA & Cart Drawer Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* High-Converting Order Now Button */}
          <button
            onClick={() => handleNav('shop')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Order Now</span>
          </button>

          {/* Quick Cart Drawer Trigger with item counter */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label={`Open shopping cart with ${itemCount} items`}
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            <span className="hidden lg:inline">Cart</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-mono font-bold text-slate-950 bg-amber-400 rounded">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1 text-sm font-bold tracking-wider uppercase text-slate-700">
            <button
              onClick={() => handleNav('home')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'home' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              HOME
            </button>

            {/* Mobile Shop Menu with Category Sub-options */}
            <div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleNav('shop')}
                  className={`text-left py-2 px-3 rounded-lg flex-1 transition-colors ${
                    currentPage === 'shop' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  SHOP
                </button>
                <button
                  onClick={() => setMobileShopSubmenuOpen(!mobileShopSubmenuOpen)}
                  className="p-2 text-slate-400 hover:text-slate-800"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopSubmenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileShopSubmenuOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs normal-case border-l-2 border-slate-200 ml-3">
                  <button
                    onClick={() => handleNav('shop', 'all')}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • All Products
                  </button>
                  <button
                    onClick={() => handleNav('shop', 'single')}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • Single Denominations (€5 - €500)
                  </button>
                  <button
                    onClick={() => handleNav('shop', 'bundles')}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • Stacks & Bundles (Bags & Cases)
                  </button>
                  <button
                    onClick={() => handleNav('shop', 'special')}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • Special Finishes (Aged & 1-Sided)
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('about')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'about' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'contact' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              CONTACT
            </button>
            <button
              onClick={() => handleNav('blog')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'blog' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              BLOG
            </button>
            <button
              onClick={() => handleNav('compliance')}
              className={`flex items-center gap-2 text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'compliance' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-emerald-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ECB LEGAL COMPLIANCE</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNav('shop')}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Zap className="w-4 h-4" />
              <span>Order Now</span>
            </button>
            <a
              href="tel:+493084921000"
              className="w-full py-2 bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Call Sheet Hotline: +49 30 8492 1000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

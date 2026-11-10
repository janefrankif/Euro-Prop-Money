'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, Menu, X, Zap, Phone, ChevronDown, Layers, Briefcase, Sparkles, Search } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { SiteLogo } from './SiteLogo';
import { Link, useRouter } from '../router';

import { useIsMounted } from '../hooks/useIsMounted';

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
  const { navigateToCategory } = useRouter();
  const mounted = useIsMounted();
  const itemCount = mounted ? getItemCount() : 0;
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

  const closeMenus = () => {
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
            className="md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            to="/"
            onClick={closeMenus}
            className="text-left cursor-pointer flex items-center"
            aria-label="Euro Prop Money Home"
          >
            <SiteLogo size="md" variant="full" />
          </Link>
        </div>

        {/* Zone 2: Desktop Navigation Links (All Caps Lock) with Shop Category Dropdown */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-bold tracking-wider text-slate-700 uppercase">
          {/* HOME */}
          <Link
            to="/"
            onClick={closeMenus}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'home'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            HOME
          </Link>

          {/* SHOP with Category Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Link
              to="/shop"
              onClick={closeMenus}
              onMouseEnter={() => setShopDropdownOpen(true)}
              className={`flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap py-1 ${
                currentPage === 'shop'
                  ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>SHOP</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-amber-600" />
            </Link>

            {shopDropdownOpen && (
              <div
                onMouseLeave={() => setShopDropdownOpen(false)}
                className="absolute left-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 p-2 shadow-2xl z-50 text-xs normal-case space-y-1"
              >
                <Link
                  to="/shop"
                  onClick={closeMenus}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">All Products</div>
                    <div className="text-[10px] text-slate-500">Complete studio catalog</div>
                  </div>
                </Link>

                <Link
                  to="/shop?category=single"
                  onClick={closeMenus}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">Single Denominations</div>
                    <div className="text-[10px] text-slate-500">€5 to €500 individual stacks</div>
                  </div>
                </Link>

                <Link
                  to="/shop?category=bundles"
                  onClick={closeMenus}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">Stacks &amp; Bundles</div>
                    <div className="text-[10px] text-slate-500">Turnkey bags, cases &amp; packs</div>
                  </div>
                </Link>

                <Link
                  to="/shop?category=special"
                  onClick={closeMenus}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-slate-950"
                >
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide text-slate-900">Special Finishes</div>
                    <div className="text-[10px] text-slate-500">Aged crime &amp; 1-sided stunts</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* ABOUT US */}
          <Link
            to="/about"
            onClick={closeMenus}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'about'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            ABOUT US
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            onClick={closeMenus}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'contact'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            CONTACT
          </Link>

          {/* BLOG */}
          <Link
            to="/blog"
            onClick={closeMenus}
            className={`transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'blog'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            BLOG
          </Link>

          {/* ECB LEGAL COMPLIANCE */}
          <Link
            to="/compliance"
            onClick={closeMenus}
            className={`flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap py-1 ${
              currentPage === 'compliance'
                ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold'
                : 'text-emerald-700 hover:text-emerald-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ECB LEGAL COMPLIANCE</span>
          </Link>
        </nav>

        {/* Zone 3: CTA & Cart Drawer Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Live Search Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem('headerSearch') as HTMLInputElement)?.value;
              if (input && input.trim()) {
                onNavigate('shop');
                window.location.href = `/shop?q=${encodeURIComponent(input.trim())}`;
              }
            }}
            className="hidden lg:flex items-center relative max-w-xs"
          >
            <input
              type="text"
              name="headerSearch"
              placeholder="Search (e.g. euro prop money, kaufen)..."
              className="w-48 xl:w-56 bg-slate-100 border border-slate-300 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-sans"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          </form>

          {/* Order Now Link */}
          <Link
            to="/shop"
            onClick={closeMenus}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Order Now</span>
          </Link>

          {/* Quick Cart Drawer Trigger with item counter */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label={`Open shopping cart with ${itemCount} items`}
            className="relative flex items-center justify-center min-h-[44px] gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            <span className="hidden lg:inline">Cart</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-mono font-bold text-slate-950 bg-amber-400 rounded">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Real Paths */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 text-xs font-bold tracking-wider uppercase">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={closeMenus}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'home' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              HOME
            </Link>

            {/* Mobile Shop with Collapsible Submenu */}
            <div>
              <div className="flex items-center justify-between">
                <Link
                  to="/shop"
                  onClick={closeMenus}
                  className={`flex-1 text-left py-2 px-3 rounded-lg transition-colors ${
                    currentPage === 'shop' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  SHOP (FULL CATALOG)
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileShopSubmenuOpen(!mobileShopSubmenuOpen)}
                  className="p-2 text-slate-400 hover:text-slate-800"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopSubmenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {mobileShopSubmenuOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs normal-case border-l-2 border-slate-200 ml-3">
                  <Link
                    to="/shop"
                    onClick={closeMenus}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • All Products
                  </Link>
                  <Link
                    to="/shop?category=single"
                    onClick={closeMenus}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • Single Denominations (€5 - €500)
                  </Link>
                  <Link
                    to="/shop?category=bundles"
                    onClick={closeMenus}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • Stacks &amp; Bundles (Bags &amp; Cases)
                  </Link>
                  <Link
                    to="/shop?category=special"
                    onClick={closeMenus}
                    className="block w-full text-left py-1 text-slate-600 hover:text-slate-900"
                  >
                    • Special Finishes (Aged &amp; 1-Sided)
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={closeMenus}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'about' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              ABOUT US
            </Link>
            <Link
              to="/contact"
              onClick={closeMenus}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'contact' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              CONTACT
            </Link>
            <Link
              to="/blog"
              onClick={closeMenus}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'blog' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-slate-800'
              }`}
            >
              BLOG
            </Link>
            <Link
              to="/compliance"
              onClick={closeMenus}
              className={`flex items-center gap-2 text-left py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'compliance' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'hover:bg-slate-100 text-emerald-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ECB LEGAL COMPLIANCE</span>
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              to="/shop"
              onClick={closeMenus}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Zap className="w-4 h-4" />
              <span>Order Now</span>
            </Link>
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

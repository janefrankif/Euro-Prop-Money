import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Menu, X, ArrowRight, Zap, Phone, FileText } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
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

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'blog', label: 'BLOG' },
    { id: 'compliance', label: 'ECB LEGAL COMPLIANCE', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => handleNav('home')}
            className="text-left cursor-pointer"
          >
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white uppercase whitespace-nowrap hover:text-amber-400 transition-colors">
              Euro Prop Money <span className="text-zinc-500 font-normal text-xs normal-case">/ Studio Props</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links (All Caps Lock) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-bold tracking-wider text-zinc-300 uppercase">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap py-1 ${
                  isActive
                    ? 'text-amber-400 border-b-2 border-amber-400 font-extrabold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-emerald-400'}`} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: CTA & Cart Drawer Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* High-Converting Order Now Button */}
          <button
            onClick={() => handleNav('shop')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all cursor-pointer shadow-md active:scale-95 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Order Now</span>
          </button>

          {/* Quick Cart Drawer Trigger with item counter */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label={`Open shopping cart with ${itemCount} items`}
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Cart</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-mono font-bold text-zinc-950 bg-amber-400 rounded">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-bold tracking-wider uppercase text-zinc-300">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 text-left py-2 px-3 rounded-lg transition-colors ${
                    isActive ? 'bg-amber-400/10 text-amber-400 font-extrabold' : 'hover:bg-zinc-900 text-white'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => handleNav('shop')}
              className="w-full py-2.5 bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Order Now</span>
            </button>
            <a
              href="tel:+493084921000"
              className="w-full py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Sheet Hotline: +49 30 8492 1000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

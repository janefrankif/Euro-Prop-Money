import React from 'react';
import { Home, Layers, Info, ShoppingBag, Zap } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenCheckout: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenCheckout,
}) => {
  const { getItemCount, setIsOpen } = useCartStore();
  const itemCount = getItemCount();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-safe shadow-lg">
      <nav className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer active:scale-95 ${
            currentPage === 'home' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Home"
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">HOME</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer active:scale-95 ${
            currentPage === 'shop' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Shop"
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">SHOP</span>
        </button>

        {/* About */}
        <button
          onClick={() => onNavigate('about')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer active:scale-95 ${
            currentPage === 'about' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="About Us"
        >
          <Info className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">ABOUT</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex flex-col items-center justify-center flex-1 h-full text-slate-500 hover:text-slate-900 transition-colors cursor-pointer active:scale-95"
          aria-label={`Cart with ${itemCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 mb-0.5 text-amber-600" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-0.5 text-[9px] font-mono font-bold bg-amber-400 text-slate-950 rounded-full flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase">CART</span>
        </button>

        {/* Quick Checkout */}
        <button
          onClick={onOpenCheckout}
          className="flex flex-col items-center justify-center flex-1 h-full text-amber-600 hover:text-amber-700 transition-colors cursor-pointer active:scale-95"
          aria-label="Quick Checkout"
        >
          <Zap className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">CHECKOUT</span>
        </button>
      </nav>
    </div>
  );
};

import React from 'react';
import { Home, Layers, Info, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from '../router';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenCheckout: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
}) => {
  const { getItemCount, setIsOpen } = useCartStore();
  const itemCount = getItemCount();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-safe shadow-lg">
      <nav className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer active:scale-95 ${
            currentPage === 'home' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Home"
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">HOME</span>
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer active:scale-95 ${
            currentPage === 'shop' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Shop"
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">SHOP</span>
        </Link>

        {/* About */}
        <Link
          to="/about"
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer active:scale-95 ${
            currentPage === 'about' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="About Us"
        >
          <Info className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">ABOUT</span>
        </Link>

        {/* Cart Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center flex-1 h-full text-slate-500 hover:text-slate-900 transition-colors cursor-pointer relative active:scale-95"
          aria-label="Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[9px] font-mono font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase">CART</span>
        </button>
      </nav>
    </div>
  );
};

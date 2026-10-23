import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, FileText, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onOpenQuote: () => void;
  onOpenCompliance: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onOpenQuote,
  onOpenCompliance,
}) => {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDiscount,
    getTotal,
    getNextTier,
    getTotalUnits,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const nextTier = getNextTier();
  const totalUnits = getTotalUnits();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col shadow-2xl"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Production Order Cart
              </h2>
              <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                {totalUnits} units
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close cart drawer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Discount Progress Banner */}
          {nextTier ? (
            <div className="px-6 py-2.5 bg-amber-400/10 border-b border-amber-400/20 text-xs text-amber-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Add <strong className="font-mono">{nextTier.neededQuantity}</strong> more stack
                  {nextTier.neededQuantity > 1 ? 's' : ''} for <strong>{nextTier.nextTierPercent}% off</strong> ({nextTier.nextTierLabel})!
                </span>
              </div>
            </div>
          ) : (
            <div className="px-6 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Maximum 40% Blockbuster Studio Discount Active!</span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mb-3" />
                <p className="text-sm font-medium text-zinc-300">Your production cart is empty</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Select single prop stacks or explore our turnkey heist bags and flight cases.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Browse Prop Catalog
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedPrintType}-${item.selectedFinish}-${index}`}
                  className="flex gap-4 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg bg-zinc-950 border border-zinc-800 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedPrintType, item.selectedFinish)
                          }
                          aria-label="Remove item"
                          className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono mt-0.5">
                        <span>{item.selectedPrintType === '2-sided' ? '2-Sided' : '1-Sided'}</span>
                        <span>·</span>
                        <span>{item.selectedFinish === 'crisp-vault' ? 'Crisp' : 'Weathered'}</span>
                      </div>
                    </div>

                    {/* Stepper & Price Row */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-zinc-950 rounded border border-zinc-800">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedPrintType,
                              item.selectedFinish
                            )
                          }
                          className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedPrintType,
                              item.selectedFinish
                            )
                          }
                          className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-white tabular-nums">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/60 space-y-4">
              {/* Financial Calculation Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-zinc-200 tabular-nums">€{subtotal.toFixed(2)}</span>
                </div>

                {discount.percent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Volume Discount ({discount.percent}%):</span>
                    <span className="font-mono font-semibold tabular-nums">
                      -€{discount.amount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Studio Shipping (EU & UK):</span>
                  <span className="text-emerald-400 font-mono">Free Priority Call Sheet Dispatch</span>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">Net Total:</span>
                    <span className="text-[11px] text-zinc-500">ECB Compliance Certified</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCheckout();
                  }}
                  className="w-full py-3.5 px-4 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
                >
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full py-2.5 px-4 bg-zinc-900 text-zinc-300 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Production PO / Invoice Quote</span>
                </button>
              </div>

              {/* Trust disclaimer */}
              <div className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <button
                  onClick={onOpenCompliance}
                  className="hover:text-zinc-300 transition-colors underline cursor-pointer"
                >
                  European Central Bank Decision 2013/10 Guaranteed
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

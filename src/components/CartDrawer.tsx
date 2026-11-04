import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  ShoppingBag, 
  Tag, 
  Check, 
  Truck,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Product } from '../types';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onOpenQuote: () => void;
  onOpenCompliance: () => void;
  onOpenLegal?: (tab: 'terms' | 'privacy' | 'refund' | 'shipping' | 'compliance') => void;
  onSelectProduct?: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onOpenQuote,
  onOpenCompliance,
  onOpenLegal,
  onSelectProduct,
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

  const [couponInput, setCouponInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [shippingOption, setShippingOption] = useState<'free' | 'express'>('free');

  const subtotal = getSubtotal();
  const volumeDiscount = getDiscount();
  const nextTier = getNextTier();
  const totalUnits = getTotalUnits();

  // Coupon discount calculation
  const couponDiscountAmount = appliedCoupon 
    ? (subtotal * appliedCoupon.percent) / 100 
    : 0;

  const totalDiscount = Math.max(volumeDiscount.amount, couponDiscountAmount);
  const shippingFee = shippingOption === 'express' ? 15.0 : 0.0;
  const grandTotal = Math.max(0, subtotal - totalDiscount + shippingFee);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    const clean = couponInput.trim().toUpperCase();
    if (!clean) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (clean === 'CREW15' || clean === 'CRYPTO15') {
      setAppliedCoupon({ code: clean, percent: 15 });
      setCouponSuccess(`Coupon code "${clean}" applied successfully (15% off)!`);
      setCouponInput('');
    } else if (clean === 'STUDIO20') {
      setAppliedCoupon({ code: clean, percent: 20 });
      setCouponSuccess(`Coupon code "${clean}" applied successfully (20% off)!`);
      setCouponInput('');
    } else if (clean === 'CINEMA10') {
      setAppliedCoupon({ code: clean, percent: 10 });
      setCouponSuccess(`Coupon code "${clean}" applied successfully (10% off)!`);
      setCouponInput('');
    } else {
      setCouponError(`Coupon "${clean}" does not exist or has expired.`);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess(null);
    setCouponError(null);
  };

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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-screen max-w-lg bg-white border-l border-slate-200 flex flex-col shadow-2xl text-slate-900"
        >
          {/* Drawer Header (WooCommerce Style) */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold font-mono">
                €
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Shopping Cart
                </h2>
                <p className="text-[11px] text-slate-500 font-mono">
                  {totalUnits} {totalUnits === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close cart drawer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Incentive Banner */}
          {nextTier ? (
            <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  Add <strong className="font-mono">{nextTier.neededQuantity}</strong> more stack
                  {nextTier.neededQuantity > 1 ? 's' : ''} for <strong>{nextTier.nextTierPercent}% off</strong> ({nextTier.nextTierLabel})!
                </span>
              </div>
            </div>
          ) : (
            <div className="px-6 py-2 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Maximum 40% Tier-4 Blockbuster Studio Discount Active!</span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Your cart is currently empty.</h3>
                <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed">
                  Before proceeding to checkout you must add some Euro prop currency products to your shopping cart.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors cursor-pointer shadow-sm uppercase tracking-wider font-mono"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              <>
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedPrintType}-${item.selectedFinish}-${index}`}
                    className="flex gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(item.product);
                          setIsOpen(false);
                        }
                      }}
                      className={`w-16 h-16 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0 ${
                        onSelectProduct ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                      }`}
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => {
                              if (onSelectProduct) {
                                onSelectProduct(item.product);
                                setIsOpen(false);
                              }
                            }}
                            className={`text-xs font-bold text-slate-900 truncate ${
                              onSelectProduct ? 'cursor-pointer hover:text-amber-700 transition-colors' : ''
                            }`}
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.selectedPrintType, item.selectedFinish)
                            }
                            title="Remove this item"
                            aria-label="Remove item"
                            className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Attributes */}
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mt-0.5">
                          <span className="capitalize">{item.selectedPrintType}</span>
                          <span>·</span>
                          <span className="capitalize">{item.selectedFinish === 'crisp-vault' ? 'Crisp' : 'Weathered'}</span>
                          <span>·</span>
                          <span>€{item.product.price.toFixed(2)} each</span>
                        </div>
                      </div>

                      {/* Stepper & Line Total */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center bg-white rounded-lg border border-slate-300 shadow-2xs">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedPrintType,
                                item.selectedFinish
                              )
                            }
                            aria-label="Decrease quantity"
                            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-l-lg cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-bold text-slate-900 tabular-nums">
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
                            aria-label="Increase quantity"
                            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-r-lg cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* WooCommerce Coupon Code Box */}
                <div className="pt-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon code (e.g. CREW15)"
                          className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono uppercase placeholder:normal-case"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold font-mono cursor-pointer transition-colors shrink-0"
                      >
                        Apply coupon
                      </button>
                    </form>

                    {couponSuccess && (
                      <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex items-center justify-between">
                        <span className="flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          {couponSuccess}
                        </span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-rose-600 hover:underline cursor-pointer text-[10px] uppercase font-bold"
                        >
                          [Remove]
                        </button>
                      </div>
                    )}

                    {couponError && (
                      <div className="mt-2 text-[11px] text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2 font-mono">
                        {couponError}
                      </div>
                    )}
                  </div>
                </div>

                {/* Clear Cart Button */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer font-mono transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Cart</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer & WooCommerce Order Calculation */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              {/* Minimum Order Warning Banner if below €150 */}
              {subtotal < 150.00 && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-mono space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Minimum Order Requirement: €150.00</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Add €{(150.00 - subtotal).toFixed(2)} more to your cart to proceed to checkout.
                  </p>
                </div>
              )}

              {/* Financial Calculation Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono text-slate-900 tabular-nums font-semibold">
                    €{subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Discounts */}
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-mono">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>Discount {appliedCoupon ? `(${appliedCoupon.code} -${appliedCoupon.percent}%)` : `(${volumeDiscount.percent}%)`}:</span>
                    </span>
                    <span className="font-bold tabular-nums">
                      -€{totalDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Shipping Selector */}
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Truck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Shipping:</span>
                    </span>
                    <span className="font-mono text-slate-900 font-bold">
                      {shippingOption === 'free' ? 'Free Courier' : '€15.00 (Express)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShippingOption('free')}
                      className={`px-2.5 py-1.5 rounded-lg border text-[11px] text-left font-mono transition-colors cursor-pointer ${
                        shippingOption === 'free' 
                          ? 'border-amber-400 bg-amber-50/70 text-slate-900 font-bold' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="truncate">Standard (Free)</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">2-4 Days</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingOption('express')}
                      className={`px-2.5 py-1.5 rounded-lg border text-[11px] text-left font-mono transition-colors cursor-pointer ${
                        shippingOption === 'express' 
                          ? 'border-amber-400 bg-amber-50/70 text-slate-900 font-bold' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="truncate">Express Stage (€15)</div>
                      <div className="text-[10px] text-amber-800 font-semibold">24H Soundstage</div>
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-3 border-t-2 border-slate-300 flex justify-between items-baseline font-mono">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block font-sans">Total</span>
                    <span className="text-[10px] text-slate-500 font-mono">(Includes VAT where applicable)</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-amber-700 tabular-nums">
                    €{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    if (subtotal < 150.00) {
                      alert(`Minimum order requirement is €150.00. Please add €{(150.00 - subtotal).toFixed(2)} more in items before checking out.`);
                      return;
                    }
                    setIsOpen(false);
                    onOpenCheckout();
                  }}
                  className={`w-full py-3.5 px-4 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 font-mono shadow-md cursor-pointer ${
                    subtotal < 150.00
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200 shadow-none'
                      : 'bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-[0.99]'
                  }`}
                >
                  <span>Proceed to Checkout {subtotal < 150.00 ? '(Min €150)' : ''}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full py-2.5 px-4 bg-white text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-2xs font-mono"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Generate Production PO / Invoice Quote</span>
                </button>
              </div>

              {/* Legal Links Bar */}
              <div className="text-[11px] text-slate-500 text-center flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLegal ? onOpenLegal('terms') : onOpenCompliance();
                  }}
                  className="hover:text-slate-900 underline cursor-pointer"
                >
                  Terms
                </button>
                <span>·</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLegal ? onOpenLegal('refund') : onOpenCompliance();
                  }}
                  className="hover:text-slate-900 underline cursor-pointer"
                >
                  Returns Policy
                </button>
                <span>·</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCompliance();
                  }}
                  className="hover:text-slate-900 underline cursor-pointer text-emerald-700 font-semibold flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>ECB Decision 2013/10</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

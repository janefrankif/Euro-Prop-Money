import React, { useState } from 'react';
import { X, Check, ShieldCheck, Lock, CreditCard, Truck, Printer, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCompliance: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOpenCompliance }) => {
  const { items, getTotal, getSubtotal, getDiscount, clearCart } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState<'express' | 'card'>('express');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  // Form states
  const [formData, setFormData] = useState({
    productionTitle: 'Shadow Syndicate (Feature Film)',
    propMaster: 'Marcus Vogel (Prop Master)',
    email: 'production@cinepro-berlin.de',
    stageAddress: 'Studio Babelsberg, Sound Stage 4, August-Bebel-Str. 26-53, 14482 Potsdam, Germany',
    vatNumber: 'DE348920194',
    dispatchSpeed: 'next-day-callsheet',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '842',
  });

  const total = getTotal();
  const subtotal = getSubtotal();
  const discount = getDiscount();

  if (!isOpen) return null;

  const handleProcessOrder = (method: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `CE-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              {orderConfirmed ? 'Order Confirmed · Studio Dispatch' : 'Express Studio Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderConfirmed ? (
            /* Order Success State */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">
                  Payment Processed & Authorized
                </span>
                <h2 className="text-2xl font-bold text-white">
                  Order #{orderId} Booked
                </h2>
                <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                  Your cinema-grade Euro prop money order is being packed in our tamper-evident studio security vaults. Priority courier dispatch dispatched directly to your soundstage.
                </p>
              </div>

              {/* Clearance Voucher Card */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-left text-xs font-mono space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-amber-400 font-bold">ECB PRODUCTION TRANSIT CLEARANCE</span>
                  <span className="text-zinc-500">REF: {orderId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">PRODUCTION TITLE</span>
                    <span>{formData.productionTitle}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">AUTHORIZED PROP MASTER</span>
                    <span>{formData.propMaster}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-500 block text-[10px]">STAGE DELIVERY ADDRESS</span>
                    <span className="truncate block">{formData.stageAddress}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Certified ECB 2013/10 Art Clearance included inside shipping manifest.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print Call-Sheet Dispatch Voucher</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 text-xs cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          ) : (
            /* Active Checkout Form */
            <>
              {/* Express 1-Click Buttons */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Instant Express Checkout
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Apple Pay Button */}
                  <button
                    onClick={() => handleProcessOrder('Apple Pay')}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98] shadow"
                  >
                    <span className="text-xs font-bold tracking-tight">Pay</span>
                    <span className="text-xs">One-Tap Order</span>
                  </button>

                  {/* Google Pay Button */}
                  <button
                    onClick={() => handleProcessOrder('Google Pay')}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98]"
                  >
                    <span className="text-xs font-bold font-sans">GPay</span>
                    <span className="text-xs">Instant Checkout</span>
                  </button>
                </div>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-800"></div>
                <span className="flex-shrink mx-4 text-xs font-mono uppercase text-zinc-500">
                  Or Film Studio Account Billing
                </span>
                <div className="flex-grow border-t border-zinc-800"></div>
              </div>

              {/* Studio Production Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Production / Film Title
                    </label>
                    <input
                      type="text"
                      value={formData.productionTitle}
                      onChange={(e) => setFormData({ ...formData, productionTitle: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Prop Master / Art Director
                    </label>
                    <input
                      type="text"
                      value={formData.propMaster}
                      onChange={(e) => setFormData({ ...formData, propMaster: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Studio Accounting Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      EU VAT ID (Reverse Charge 0%)
                    </label>
                    <input
                      type="text"
                      value={formData.vatNumber}
                      onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Studio Stage / Delivery Location
                  </label>
                  <input
                    type="text"
                    value={formData.stageAddress}
                    onChange={(e) => setFormData({ ...formData, stageAddress: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Credit Card Container */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Corporate Card Payment
                  </label>
                  <div className="grid grid-cols-12 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5">
                    <div className="col-span-6 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-zinc-400 shrink-0" />
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-transparent text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full bg-transparent text-xs text-white font-mono text-center focus:outline-none border-l border-zinc-800"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        placeholder="CVC"
                        className="w-full bg-transparent text-xs text-white font-mono text-center focus:outline-none border-l border-zinc-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Net Summary */}
              <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Cart Items ({items.length}):</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                {discount.percent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Volume Discount ({discount.percent}%):</span>
                    <span>-€{discount.amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Priority Courier Delivery:</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Amount Due:</span>
                  <span className="text-amber-400 text-base">€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Purchase Button */}
              <button
                onClick={() => handleProcessOrder('Corporate Card')}
                disabled={isSubmitting || items.length === 0}
                className="w-full py-4 px-4 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authorizing Production Transaction...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Dispatch Order (€{total.toFixed(2)})</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

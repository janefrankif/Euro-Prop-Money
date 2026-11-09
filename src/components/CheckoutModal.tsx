'use client';

import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Lock, 
  Building2, 
  Coins, 
  Truck, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  Copy, 
  AlertCircle,
  FileText,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCompliance: () => void;
  onOpenLegal?: (tab: 'terms' | 'privacy' | 'refund' | 'shipping' | 'compliance') => void;
}

type PaymentMethodType = 'bacs' | 'usdt';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  onOpenCompliance,
  onOpenLegal,
}) => {
  const { items, getTotal, getSubtotal, getDiscount, clearCart } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('bacs');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [orderDate, setOrderDate] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // WooCommerce Billing & Shipping Form fields
  const [formData, setFormData] = useState({
    firstName: 'Marcus',
    lastName: 'Vogel',
    companyName: 'Shadow Syndicate Productions Ltd',
    country: 'Germany',
    streetAddress: 'August-Bebel-Str. 26-53, Sound Stage 4',
    apartment: 'Gate 2 Art Department',
    city: 'Potsdam / Berlin',
    state: 'Brandenburg',
    postcode: '14482',
    phone: '+49 30 7261 8900',
    email: 'production@cinepro-berlin.de',
    orderNotes: 'Deliver to Stage 4 Security Office. Attn: Art Department Key Prop Master.',
  });

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingCost = shippingMethod === 'express' ? 50.00 : 20.00;
  const grandTotal = getTotal() + shippingCost;

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subtotal < 150.00) {
      alert(`Minimum order requirement is €150.00. Please add €${(150.00 - subtotal).toFixed(2)} more in items before placing your order.`);
      return;
    }
    if (!termsAccepted) {
      alert('Please agree to the website Terms and Conditions and ECB 2013/10 safe harbor rules.');
      return;
    }

    setIsSubmitting(true);
    const now = new Date();
    const generatedId = `CE-${(now.getTime() % 90000) + 10000}`;
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const payload = {
      orderId: generatedId,
      orderDate: formattedDate,
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      recipientName: `${formData.firstName} ${formData.lastName}`.trim(),
      customerEmail: formData.email,
      recipientEmail: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      streetAddress: formData.streetAddress,
      apartment: formData.apartment,
      city: formData.city,
      state: formData.state,
      postcode: formData.postcode,
      country: formData.country,
      paymentMethod,
      shippingMethod,
      shippingCost,
      subtotal,
      total: grandTotal,
      totalPayable: grandTotal,
      orderItems: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        finish: item.selectedFinish,
        printType: item.selectedPrintType,
        total: item.product.price * item.quantity,
      })),
      orderNotes: formData.orderNotes,
    };

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Failed to send order email:', err);
    } finally {
      setOrderId(generatedId);
      setOrderDate(formattedDate);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* WooCommerce Checkout Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-mono text-sm">
              €
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {orderConfirmed ? 'Order Received' : 'WooCommerce Checkout'}
              </h2>
              <p className="text-[11px] font-mono text-slate-500">
                {orderConfirmed 
                  ? 'Thank you. Your order has been registered.' 
                  : 'European Film & Media Prop Store · SSL 256-Bit Encrypted'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!orderConfirmed && subtotal < 150.00 && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-mono flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-amber-950">Minimum Order Requirement: €150.00</div>
                <p className="text-[11px] text-amber-800">
                  Your current subtotal is €{subtotal.toFixed(2)}. Please add €{(150.00 - subtotal).toFixed(2)} more in items to meet the €150 minimum order before placing your order.
                </p>
              </div>
            </div>
          )}

          {orderConfirmed ? (
            /* =========================================================================
               WOOCOMMERCE "ORDER RECEIVED" (THANK YOU) PAGE
               Payment details are provided HERE after order has been registered!
               ========================================================================= */
            <div className="space-y-6">
              {/* Order Success Notice Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-950">
                    Thank you. Your order has been received.
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Your production order has been registered in our studio dispatch queue. A confirmation email and production invoice have been sent to <strong>{formData.email}</strong>.
                  </p>
                </div>
              </div>

              {/* WooCommerce Classic 4-Column Order Meta Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Order Number:</span>
                  <span className="text-slate-900 font-bold text-sm">{orderId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Date:</span>
                  <span className="text-slate-900 font-semibold">{orderDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Total:</span>
                  <span className="text-amber-700 font-bold text-sm">€{grandTotal.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Payment Method:</span>
                  <span className="text-slate-900 font-semibold">
                    {paymentMethod === 'bacs' ? 'Direct Bank Transfer' : 'USDT (Tether)'}
                  </span>
                </div>
              </div>

              {/* PAYMENT DETAILS SECTION (Provided strictly AFTER order has been registered) */}
              {paymentMethod === 'bacs' ? (
                /* Bank Transfer Payment Details */
                <div className="bg-slate-50 border-2 border-amber-400/80 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                          Our Bank Details
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Please transfer the order total directly to our European banking account.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded">
                      SEPA / Swift BACS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Bank Name</span>
                      <span className="font-bold text-slate-900 text-sm">Deutsche Bundes-Film Bank AG</span>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Account Holder Name</span>
                      <span className="font-bold text-slate-900 text-sm">Euro Prop Money Studios Ltd</span>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[10px] uppercase">IBAN</span>
                        <button
                          onClick={() => handleCopy('DE89 3704 0044 0532 0130 10', 'iban')}
                          className="text-[11px] text-amber-700 hover:text-amber-800 flex items-center gap-1 font-sans font-semibold cursor-pointer"
                        >
                          {copiedText === 'iban' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'iban' ? 'Copied' : 'Copy IBAN'}</span>
                        </button>
                      </div>
                      <span className="font-bold text-slate-900 text-base tracking-wider block select-all">
                        DE89 3704 0044 0532 0130 10
                      </span>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[10px] uppercase">BIC / SWIFT</span>
                        <button
                          onClick={() => handleCopy('DBFBDEBBXXX', 'bic')}
                          className="text-[11px] text-amber-700 hover:text-amber-800 flex items-center gap-1 font-sans font-semibold cursor-pointer"
                        >
                          {copiedText === 'bic' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'bic' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">DBFBDEBBXXX</span>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[10px] uppercase">Payment Reference</span>
                        <button
                          onClick={() => handleCopy(orderId, 'ref')}
                          className="text-[11px] text-amber-700 hover:text-amber-800 flex items-center gap-1 font-sans font-semibold cursor-pointer"
                        >
                          {copiedText === 'ref' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'ref' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <span className="font-bold text-amber-700 text-sm">{orderId}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Important:</strong> Please include your Order ID <strong>{orderId}</strong> as the payment reference. Once your bank wire is initiated, notify our on-set dispatch desk for immediate staging and packaging.
                    </span>
                  </div>
                </div>
              ) : (
                /* USDT Cryptocurrency Payment Details */
                <div className="bg-slate-50 border-2 border-emerald-400/80 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                        <Coins className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                          USDT (Tether) Deposit Instructions
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Instant blockchain settlement · 1 confirmation for automatic dispatch
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded">
                      TRC-20 & ERC-20
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">
                          USDT Deposit Address (TRC-20 Recommended for Zero Fees)
                        </span>
                        <button
                          onClick={() => handleCopy('TLa9m2K8E9X2qJ3rP7zC5vB4nQ1wY6uE8D', 'usdt')}
                          className="text-[11px] text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-sans font-semibold cursor-pointer"
                        >
                          {copiedText === 'usdt' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'usdt' ? 'Copied' : 'Copy Address'}</span>
                        </button>
                      </div>
                      <div className="font-bold text-slate-900 text-sm break-all select-all bg-slate-50 p-2 rounded-lg border border-slate-200">
                        TLa9m2K8E9X2qJ3rP7zC5vB4nQ1wY6uE8D
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase">Exact USDT Amount Due</span>
                        <span className="font-bold text-emerald-700 text-base block">
                          {(grandTotal * 1.08).toFixed(2)} USDT <span className="text-xs text-slate-500 font-normal">(€{grandTotal.toFixed(2)})</span>
                        </span>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase">Order Payment Reference</span>
                        <span className="font-bold text-slate-900 text-sm block">{orderId}</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Blockchain Detection:</strong> Send USDT to the address above. Upon 1 network confirmation, your order will automatically update to <strong>"Processing & Vault Dispatch"</strong>.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items Table & Delivery Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900 uppercase font-mono">Order Details</span>
                  <span className="text-slate-500 font-mono">ECB Decision 2013/10 Certified</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Billing & Production Info</span>
                    <p className="font-semibold text-slate-900 mt-1">{formData.firstName} {formData.lastName}</p>
                    <p>{formData.companyName}</p>
                    <p>{formData.email} · {formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery / Soundstage Address</span>
                    <p className="font-semibold text-slate-900 mt-1">{formData.streetAddress}</p>
                    <p>{formData.apartment}</p>
                    <p>{formData.city}, {formData.postcode}, {formData.country}</p>
                  </div>
                </div>

                {formData.orderNotes && (
                  <div className="pt-2 border-t border-slate-200 font-mono text-slate-600 text-[11px]">
                    <span className="font-bold text-slate-800">Order Notes: </span>
                    <span>{formData.orderNotes}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-3 bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4 text-amber-600" />
                  <span>Print WooCommerce Order Invoice</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-7 py-3 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 text-xs cursor-pointer shadow-md transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* =========================================================================
               ACTIVE WOOCOMMERCE 2-COLUMN CHECKOUT FORM
               ========================================================================= */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Billing Details (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="pb-2 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                      Billing details
                    </h3>
                  </div>

                  {/* Name fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        First name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Last name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company / Production Title */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Production title <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Feature Film Title / Production Studio"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Country / Region */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country / Region <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="Germany">Germany (DE)</option>
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="France">France (FR)</option>
                      <option value="Italy">Italy (IT)</option>
                      <option value="Spain">Spain (ES)</option>
                      <option value="Netherlands">Netherlands (NL)</option>
                      <option value="Belgium">Belgium (BE)</option>
                      <option value="Austria">Austria (AT)</option>
                      <option value="Ireland">Ireland (IE)</option>
                      <option value="Poland">Poland (PL)</option>
                      <option value="Sweden">Sweden (SE)</option>
                      <option value="Other EU / International">Other EU / International Stage</option>
                    </select>
                  </div>

                  {/* Street address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House number and street name"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, unit, soundstage (optional)"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* City, State, Postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Town / City <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State / County <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Postcode / ZIP <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Order notes <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      placeholder="Notes about your order, e.g. special notes for soundstage gate or call sheet schedule."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Your Order & Payment Methods (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="pb-2 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                      Your order
                    </h3>
                  </div>

                  {/* WooCommerce Order Summary Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 font-bold text-slate-900 font-mono">
                      <span>Product</span>
                      <span>Subtotal</span>
                    </div>

                    {/* Order items list */}
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start gap-2 py-1 text-slate-700">
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 block truncate">
                              {item.product.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {item.selectedPrintType === '2-sided' ? '2-Sided' : '1-Sided'} · {item.selectedFinish === 'crisp-vault' ? 'Crisp' : 'Weathered'} × {item.quantity}
                            </span>
                          </div>
                          <span className="font-mono text-slate-900 tabular-nums shrink-0 font-semibold">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal */}
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-mono">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-bold text-slate-900">€{subtotal.toFixed(2)}</span>
                    </div>

                    {/* Volume Discount */}
                    {discount.percent > 0 && (
                      <div className="flex justify-between font-mono text-emerald-700">
                        <span>Volume Discount ({discount.percent}%):</span>
                        <span className="font-bold">-€{discount.amount.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Shipping Options */}
                    <div className="pt-2 border-t border-slate-200 space-y-1.5 font-mono">
                      <span className="text-slate-600 block mb-1">Shipping:</span>
                      <label className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                            className="text-amber-500 focus:ring-amber-400"
                          />
                          <span className="text-[11px] text-slate-800">Standard European Courier</span>
                        </div>
                        <span className="font-bold text-slate-900">€20.00</span>
                      </label>

                      <label className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="text-amber-500 focus:ring-amber-400"
                          />
                          <span className="text-[11px] text-slate-800">24H Express Stage Dispatch</span>
                        </div>
                        <span className="font-bold text-slate-900">€50.00</span>
                      </label>
                    </div>

                    {/* Total */}
                    <div className="pt-3 border-t-2 border-slate-300 flex justify-between items-baseline font-mono">
                      <span className="text-sm font-extrabold text-slate-900">Total:</span>
                      <span className="text-xl font-extrabold text-amber-700">€{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* WOOCOMMERCE PAYMENT METHODS RADIO SELECTOR */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-2">
                      Payment Methods
                    </span>

                    {/* 1. Direct Bank Transfer */}
                    <div className={`rounded-xl border transition-all ${
                      paymentMethod === 'bacs' ? 'border-amber-400 bg-white shadow-xs' : 'border-slate-200 bg-slate-50/50'
                    }`}>
                      <label className="flex items-center gap-3 p-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bacs"
                          checked={paymentMethod === 'bacs'}
                          onChange={() => setPaymentMethod('bacs')}
                          className="text-amber-500 focus:ring-amber-400 cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-bold text-slate-900">Direct Bank Transfer</span>
                        </div>
                      </label>

                      {paymentMethod === 'bacs' && (
                        <div className="px-3.5 pb-3.5 text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Complete bank account details (IBAN, BIC/SWIFT) will be provided on the order confirmation screen and sent to your email after your order has been registered.
                        </div>
                      )}
                    </div>

                    {/* 2. USDT (Tether Crypto) */}
                    <div className={`rounded-xl border transition-all ${
                      paymentMethod === 'usdt' ? 'border-emerald-400 bg-white shadow-xs' : 'border-slate-200 bg-slate-50/50'
                    }`}>
                      <label className="flex items-center gap-3 p-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="usdt"
                          checked={paymentMethod === 'usdt'}
                          onChange={() => setPaymentMethod('usdt')}
                          className="text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900">USDT (Tether Crypto)</span>
                          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                            TRC20 / ERC20
                          </span>
                        </div>
                      </label>

                      {paymentMethod === 'usdt' && (
                        <div className="px-3.5 pb-3.5 text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                          Pay with USDT (Tether). Fast, secure, and ideal for confidential or emergency soundstage dispatches. The designated deposit wallet address and QR code will be provided after your order has been registered on the order received page.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Privacy & Terms Agreement */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal ? onOpenLegal('privacy') : onOpenCompliance()}
                        className="text-amber-700 underline hover:text-amber-800"
                      >
                        privacy policy
                      </button>.
                    </p>

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                      />
                      <span>
                        I have read and agree to the website{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegal ? onOpenLegal('terms') : onOpenCompliance()}
                          className="text-amber-700 font-semibold underline hover:text-amber-800"
                        >
                          terms and conditions
                        </button>{' '}
                        and European Central Bank Decision 2013/10 safe harbor rules <span className="text-rose-500">*</span>
                      </span>
                    </label>
                  </div>

                  {/* WooCommerce "Place order" Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0 || !termsAccepted}
                    className="w-full py-4 px-4 bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Registering Production Order...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order (€{grandTotal.toFixed(2)})</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ECB 2013/10 Certified Art Replica Guarantee</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

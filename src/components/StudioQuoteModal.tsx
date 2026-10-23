import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileText, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface StudioQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioQuoteModal: React.FC<StudioQuoteModalProps> = ({ isOpen, onClose }) => {
  const { items, getSubtotal, getDiscount, getTotal } = useCartStore();
  const [copied, setCopied] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    productionTitle: 'Apex Crimson (Motion Picture)',
    productionCompany: 'Studio Babelsberg Motion Pictures GmbH',
    requesterName: 'Elena Rostova (Lead Prop Master)',
    email: 'props@apex-crimson-film.eu',
    callSheetDate: '2026-11-15',
    poNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
  });

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  if (!isOpen) return null;

  const handleCopyQuote = () => {
    const quoteText = `
STUDIO PURCHASE ORDER REQUISITION - CINE EURO PROPS
PO Number: ${formData.poNumber}
Production: ${formData.productionTitle}
Company: ${formData.productionCompany}
Requester: ${formData.requesterName}
Call Sheet Date: ${formData.callSheetDate}

ITEMS:
${items.map((i) => `- ${i.quantity}x ${i.product.name} (${i.selectedPrintType}, ${i.selectedFinish}) @ €${i.product.price} = €${(i.quantity * i.product.price).toFixed(2)}`).join('\n')}

Subtotal: €${subtotal.toFixed(2)}
Volume Discount (${discount.percent}%): -€${discount.amount.toFixed(2)}
Total Amount: €${total.toFixed(2)}
Legal Status: European Central Bank ECB/2013/10 Section 2 Compliant
    `.trim();

    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Studio Purchase Order (PO) Requisition
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quote modal"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Header Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs">
            <div>
              <label className="block text-zinc-400 font-mono mb-1">Production Project Name</label>
              <input
                type="text"
                value={formData.productionTitle}
                onChange={(e) => setFormData({ ...formData, productionTitle: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white font-sans focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-mono mb-1">Production Company / Studio</label>
              <input
                type="text"
                value={formData.productionCompany}
                onChange={(e) => setFormData({ ...formData, productionCompany: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white font-sans focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-mono mb-1">Prop Master / Buyer Name</label>
              <input
                type="text"
                value={formData.requesterName}
                onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white font-sans focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-mono mb-1">Target Call Sheet Date</label>
              <input
                type="date"
                value={formData.callSheetDate}
                onChange={(e) => setFormData({ ...formData, callSheetDate: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white font-sans focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Printable Document Preview */}
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 text-xs font-mono space-y-4 shadow-inner">
            <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
              <div>
                <h4 className="text-lg font-bold text-white tracking-wider">CINE EURO PROPS EU</h4>
                <p className="text-zinc-500 text-[11px]">Official European Studio Prop Supply Depot</p>
                <p className="text-zinc-500 text-[11px]">VAT ID: EU8392019482 · Dispatch Hub: Berlin / London</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-bold block">{formData.poNumber}</span>
                <span className="text-zinc-500 text-[11px]">ISSUED FOR ACCOUNTING APPROVAL</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-[11px]">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Spec</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Net</th>
                    <th className="py-2 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {items.length > 0 ? (
                    items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 font-medium text-white">
                          {item.product.name}
                          <span className="block text-[10px] text-zinc-500">
                            {item.product.compliance.markings}
                          </span>
                        </td>
                        <td className="py-2.5 text-center text-[11px] text-zinc-400">
                          {item.selectedPrintType} · {item.selectedFinish}
                        </td>
                        <td className="py-2.5 text-center tabular-nums">{item.quantity}</td>
                        <td className="py-2.5 text-right tabular-nums">€{item.product.price.toFixed(2)}</td>
                        <td className="py-2.5 text-right font-bold text-white tabular-nums">
                          €{(item.quantity * item.product.price).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-zinc-500 italic">
                        No props currently in cart. Add items from the catalog or bulk calculator to populate quote.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-zinc-800 flex justify-end">
              <div className="w-64 space-y-1.5 text-right">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="text-white tabular-nums">€{subtotal.toFixed(2)}</span>
                </div>
                {discount.percent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Studio Volume ({discount.percent}%):</span>
                    <span className="tabular-nums">-€{discount.amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Priority Studio Courier:</span>
                  <span className="text-emerald-400">€0.00 (Included)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Requisition Total:</span>
                  <span className="text-amber-400 tabular-nums">€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Legal Certificate Footer */}
            <div className="p-3 bg-zinc-900 rounded border border-zinc-800 text-[10px] text-zinc-400 leading-normal flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>ECB COMPLIANCE STATEMENT:</strong> These prop items are legally manufactured under European Central Bank Decision ECB/2013/10 specifications as non-negotiable motion picture props. Not valid tender. Safe for transport on commercial carriers with this clearance document.
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
            <button
              onClick={handleCopyQuote}
              className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Requisition Text</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Studio PO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

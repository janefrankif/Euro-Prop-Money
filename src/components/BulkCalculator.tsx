import React, { useState, useId } from 'react';
import { Layers, Sparkles, Check, ShoppingBag, Plus, Minus, Calculator } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS, DISCOUNT_TIERS } from '../data/products';
import { PrintType, FinishType } from '../types';

export const BulkCalculator: React.FC = () => {
  const [stackCount, setStackCount] = useState<number>(50);
  const [selectedProductId, setSelectedProductId] = useState<string>('euro-100-stack');
  const [printType, setPrintType] = useState<PrintType>('2-sided');
  const [finish, setFinish] = useState<FinishType>('crisp-vault');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const sliderId = useId();

  const { addItem } = useCartStore();

  const activeProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Base unit price adjusted for 1-sided vs 2-sided
  const unitPrice = printType === '1-sided' ? Math.round(activeProduct.price * 0.72) : activeProduct.price;

  // Calculate volume discount tier
  let appliedTier = DISCOUNT_TIERS[0];
  for (const tier of DISCOUNT_TIERS) {
    if (stackCount >= tier.minQuantity) {
      appliedTier = tier;
    }
  }

  const grossTotal = stackCount * unitPrice;
  const discountAmount = (grossTotal * appliedTier.discountPercent) / 100;
  const netTotal = grossTotal - discountAmount;
  const billsTotal = stackCount * 100;

  // Prop face value calculation
  const numericDenom = typeof activeProduct.denomination === 'number' ? activeProduct.denomination : 100;
  const calculatedFaceValue = stackCount * 100 * numericDenom;

  const handleAddToCart = () => {
    // Custom bundle item based on product
    const customBundleProduct = {
      ...activeProduct,
      name: `${stackCount}x ${activeProduct.name} (Studio Bulk)`,
      price: unitPrice,
      printType,
      finish,
    };

    addItem(customBundleProduct, stackCount, printType, finish);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const setPreset = (count: number) => {
    setStackCount(count);
  };

  return (
    <section id="bulk-calculator" className="w-full py-16 lg:py-24 border-b border-zinc-800 bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <Calculator className="w-4 h-4" />
            <span>Studio Production Requisition</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Up to 40% Tiered Discount</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Studio Bulk Tier Calculator
          </h2>
          <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
            Need to fill an entire bank vault, armored vehicle, or casino table? Configure volume stacks with automatic tiered production discounts applied instantly at checkout.
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-zinc-900/90 rounded-2xl border border-zinc-800 p-6 sm:p-8">
            {/* Quick Presets */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Production Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { count: 5, label: 'Indie Short', notes: '5 Stacks' },
                  { count: 15, label: 'Crime Scene', notes: '15 Stacks' },
                  { count: 50, label: "Director's Vault", notes: '50 Stacks' },
                  { count: 100, label: 'Blockbuster', notes: '100 Stacks' },
                ].map((preset) => (
                  <button
                    key={preset.count}
                    onClick={() => setPreset(preset.count)}
                    className={`px-3 py-2.5 rounded-lg text-left transition-all border cursor-pointer ${
                      stackCount === preset.count
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                        : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <div className="text-xs font-semibold">{preset.label}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">{preset.notes}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Control */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={sliderId} className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Custom Stack Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStackCount((prev) => Math.max(1, prev - 5))}
                    aria-label="Decrease stacks by 5"
                    className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-lg font-bold text-amber-400 min-w-16 text-center tabular-nums">
                    {stackCount} <span className="text-xs font-normal text-zinc-400">stacks</span>
                  </span>
                  <button
                    onClick={() => setStackCount((prev) => Math.min(200, prev + 5))}
                    aria-label="Increase stacks by 5"
                    className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <input
                id={sliderId}
                type="range"
                min="1"
                max="150"
                step="1"
                value={stackCount}
                onChange={(e) => setStackCount(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2">
                <span>1 Stack</span>
                <span>25 (25% Off)</span>
                <span>50 (40% Off)</span>
                <span>150 Stacks</span>
              </div>
            </div>

            {/* Denomination Choice */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Banknote Denomination
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: 'euro-20-stack', label: '€20', denom: 20 },
                  { id: 'euro-50-stack', label: '€50', denom: 50 },
                  { id: 'euro-100-stack', label: '€100', denom: 100 },
                  { id: 'euro-200-stack', label: '€200', denom: 200 },
                  { id: 'euro-500-stack', label: '€500', denom: 500 },
                  { id: 'euro-1sided-stunt-pack', label: 'Mixed', denom: 'mixed' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProductId(item.id)}
                    className={`py-2 px-3 text-xs font-mono font-bold rounded-lg border text-center transition-all cursor-pointer ${
                      selectedProductId === item.id
                        ? 'bg-amber-400 text-zinc-950 border-amber-400'
                        : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Print Specification & Finish */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Print Specification
                </label>
                <div className="flex rounded-lg bg-zinc-800 p-1 border border-zinc-700">
                  <button
                    onClick={() => setPrintType('2-sided')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      printType === '2-sided'
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    2-Sided Full Print
                  </button>
                  <button
                    onClick={() => setPrintType('1-sided')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      printType === '1-sided'
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    1-Sided Stunt (Save 28%)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Prop Texture & Aging
                </label>
                <div className="flex rounded-lg bg-zinc-800 p-1 border border-zinc-700">
                  <button
                    onClick={() => setFinish('crisp-vault')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      finish === 'crisp-vault'
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Crisp Vault Fresh
                  </button>
                  <button
                    onClick={() => setFinish('weathered-stunt')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      finish === 'weathered-stunt'
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Weathered Action
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Order Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Calculated Production Package
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {appliedTier.badge}
                </span>
              </div>

              {/* Live Metric Counters */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Total Prop Stacks:</span>
                  <span className="font-mono font-semibold text-white tabular-nums">{stackCount} banded stacks</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Total Physical Notes:</span>
                  <span className="font-mono font-semibold text-white tabular-nums">{billsTotal.toLocaleString()} bills</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Camera Visual Face Value:</span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">
                    €{calculatedFaceValue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Base Unit Rate:</span>
                  <span className="font-mono text-zinc-300 tabular-nums">€{unitPrice.toFixed(2)} / stack</span>
                </div>

                {appliedTier.discountPercent > 0 && (
                  <div className="flex justify-between items-center text-sm text-emerald-400">
                    <span>Volume Discount ({appliedTier.discountPercent}%):</span>
                    <span className="font-mono font-semibold tabular-nums">-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-zinc-800 mb-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                      Production Net Total
                    </span>
                    <span className="text-xs text-zinc-500">Excl. VAT · EU VAT reverse charge available</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-mono font-bold text-white tabular-nums">
                      €{netTotal.toFixed(2)}
                    </span>
                    {appliedTier.discountPercent > 0 && (
                      <span className="block text-xs font-mono text-zinc-500 line-through tabular-nums">
                        €{grossTotal.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="bg-zinc-950/60 rounded-lg p-3 border border-zinc-800 text-xs text-zinc-300 space-y-1.5 mb-6">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Free Priority Studio Courier Dispatch</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Includes legal clearance affidavit for set transport and insured flight dispatch across European production hubs.
                </p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                addedSuccess
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-amber-400 text-zinc-950 hover:bg-amber-300 active:scale-[0.99]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {stackCount} Stacks to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {stackCount}-Stack Bundle to Cart (€{netTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

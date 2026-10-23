import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
  onInspect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onInspect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
    >
      {/* Product Image Slot (65%–70% visual weight) */}
      <div className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 p-4 text-center">
            <ShieldCheck className="w-8 h-8 text-amber-500/50 mb-2" />
            <span className="text-xs font-mono font-medium text-zinc-400">
              {product.name}
            </span>
            <span className="text-[11px] text-zinc-600">Matte Prop Currency Specimen</span>
          </div>
        )}

        {/* Ambient subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Studio Tag: Single subtle text tag, NOT a round pill */}
        {product.tag && (
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400 bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-800">
              {product.tag}
            </span>
          </div>
        )}

        {/* Face Value Visual Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-mono font-bold text-white bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded border border-zinc-800">
            {product.faceValue}
          </span>
        </div>

        {/* Quick Camera Inspection Overlay Button */}
        <button
          onClick={() => onInspect(product)}
          aria-label={`Inspect ${product.name} in 8K camera viewer`}
          className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors opacity-90 sm:opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="flex flex-col flex-1 p-5">
        {/* Unboxed Metadata with typographic separator */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-2">
          <span>{product.denomination === 'mixed' ? 'Mixed Denom' : `€${product.denomination} Specimen`}</span>
          <span aria-hidden="true">·</span>
          <span>{product.billsPerUnit.toLocaleString()} Notes</span>
          <span aria-hidden="true">·</span>
          <span>{product.printType === '2-sided' ? 'Full 2-Sided' : '1-Sided Stunt'}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Legal Specification Note */}
        <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5 pb-4 mb-4 border-b border-zinc-800/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{product.compliance.standard}</span>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <span className="text-xs text-zinc-500 uppercase font-mono block">Studio Net</span>
            <span className="text-lg font-mono font-bold text-white tabular-nums">
              €{product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              disabled={addedAnimation}
              aria-label={`Add ${product.name} to cart`}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                addedAnimation
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-800 text-white hover:bg-amber-400 hover:text-zinc-950 active:scale-95'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Stack</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

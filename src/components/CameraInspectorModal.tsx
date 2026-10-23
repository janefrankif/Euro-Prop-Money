import React, { useState } from 'react';
import { X, Sun, Lamp, ZoomIn, ZoomOut, ShieldCheck, Check, ShoppingBag, Eye, RefreshCw } from 'lucide-react';
import { Product, PrintType, FinishType } from '../types';
import { useCartStore } from '../store/useCartStore';

interface CameraInspectorModalProps {
  product: Product | null;
  onClose: () => void;
}

export const CameraInspectorModal: React.FC<CameraInspectorModalProps> = ({ product, onClose }) => {
  const [lighting, setLighting] = useState<'daylight' | 'tungsten'>('daylight');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [selectedPrintType, setSelectedPrintType] = useState<PrintType>('2-sided');
  const [selectedFinish, setSelectedFinish] = useState<FinishType>('crisp-vault');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const { addItem } = useCartStore();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedPrintType, selectedFinish);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 block">
                Camera Monitor Test Suite · 8K Macro Inspector
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                {product.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close inspector modal"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Virtual Camera Viewport */}
          <div className="lg:col-span-7 p-6 bg-zinc-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800">
            {/* Viewport Control Bar */}
            <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
              {/* Lighting Switcher */}
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setLighting('daylight')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    lighting === 'daylight'
                      ? 'bg-amber-400 text-zinc-950 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>5600K Day</span>
                </button>
                <button
                  onClick={() => setLighting('tungsten')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    lighting === 'tungsten'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Lamp className="w-3.5 h-3.5" />
                  <span>3200K Tungsten</span>
                </button>
              </div>

              {/* Front / Back Toggle & Zoom */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewSide(viewSide === 'front' ? 'back' : 'front')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-amber-400" />
                  <span>{viewSide === 'front' ? 'View Reverse' : 'View Obverse'}</span>
                </button>

                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  aria-label="Toggle camera zoom"
                  className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white cursor-pointer"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4 text-amber-400" /> : <ZoomIn className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Simulated Lens Surface */}
            <div
              className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center transition-all duration-300 ${
                lighting === 'tungsten'
                  ? 'bg-amber-950/20'
                  : 'bg-zinc-900'
              }`}
            >
              <img
                src={product.image}
                alt={`${product.name} camera test`}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                  isZoomed ? 'scale-150' : 'scale-100'
                } ${lighting === 'tungsten' ? 'sepia-[0.35] brightness-95' : 'brightness-100'}`}
              />

              {/* Viewport Crosshair & Reticle HUD */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] font-mono text-amber-400 bg-zinc-950/70 backdrop-blur-sm px-2.5 py-1 rounded w-fit border border-zinc-800">
                  <span>CAMERA: 8K RAW · FPS: 24.00 · ISO 800 · T2.8</span>
                </div>

                <div className="flex justify-between items-end text-[10px] font-mono text-zinc-300">
                  <span className="bg-zinc-950/70 px-2 py-0.5 rounded border border-zinc-800">
                    ANTI-GLARE COATING: OK
                  </span>
                  <span className="bg-zinc-950/70 px-2 py-0.5 rounded border border-zinc-800 text-emerald-400">
                    LEGAL NOTICE: LEGIBLE
                  </span>
                </div>
              </div>
            </div>

            {/* Macro Surface Notes */}
            <div className="mt-4 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 space-y-1">
              <div className="text-zinc-200 font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>On-Set Camera Assessment:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Paper texture reflects &lt;3% incident light. Under 800W tungsten bounce or softbox diffuse grids, zero specular hotspot flare appears across the European Central Bank architectural motif.
              </p>
            </div>
          </div>

          {/* Configuration & Order Panel */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-zinc-900">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-zinc-400">Production Specs</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">In Stock · Ready</span>
              </div>

              {/* Denomination & Face Value */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-5">
                <div className="text-xs text-zinc-400 font-mono mb-1">Visual Prop Face Value</div>
                <div className="text-xl font-mono font-bold text-amber-400 mb-2">{product.faceValue}</div>
                <div className="text-xs text-zinc-300 leading-relaxed">{product.description}</div>
              </div>

              {/* Technical Spec List */}
              <div className="space-y-2.5 text-xs mb-6">
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Dimensions:</span>
                  <span className="text-zinc-200 font-mono">{product.specifications.dimensions}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Paper Grade:</span>
                  <span className="text-zinc-200 font-mono">{product.compliance.paperGrade}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Compliance Standard:</span>
                  <span className="text-zinc-200 font-mono">{product.compliance.standard}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Required Marking:</span>
                  <span className="text-zinc-200 font-mono text-[11px]">{product.compliance.markings}</span>
                </div>
              </div>

              {/* Selection Options */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Print Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedPrintType('2-sided')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        selectedPrintType === '2-sided'
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      2-Sided Full Print
                    </button>
                    <button
                      onClick={() => setSelectedPrintType('1-sided')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        selectedPrintType === '1-sided'
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      1-Sided Stunt Back
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Aging & Texture
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedFinish('crisp-vault')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        selectedFinish === 'crisp-vault'
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Crisp Vault
                    </button>
                    <button
                      onClick={() => setSelectedFinish('weathered-stunt')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        selectedFinish === 'weathered-stunt'
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Weathered Action
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Qty:</span>
                  <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-800 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-zinc-500 font-mono block">Total Net</span>
                  <span className="text-2xl font-mono font-bold text-white tabular-nums">
                    €{(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className={`w-full py-3.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'bg-amber-400 text-zinc-950 hover:bg-amber-300 active:scale-[0.99]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Production Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Production Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

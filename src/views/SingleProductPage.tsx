'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShoppingBag, 
  ArrowLeft, 
  Check, 
  Zap, 
  Truck, 
  FileText, 
  Camera, 
  Eye, 
  Star, 
  Sparkles, 
  RotateCcw, 
  Maximize2, 
  Award,
  ChevronRight,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { ProductCard } from '../components/ProductCard';
import { Link } from '../router';

interface SingleProductPageProps {
  product: Product;
  onNavigateShop: (category?: string) => void;
  onNavigateHome: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCompliance: () => void;
  onOpenQuote: () => void;
  onOpenCheckout: () => void;
}

export const SingleProductPage: React.FC<SingleProductPageProps> = ({
  product,
  onNavigateShop,
  onNavigateHome,
  onSelectProduct,
  onOpenCompliance,
  onOpenQuote,
  onOpenCheckout,
}) => {
  const { addItem, setIsOpen } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'compliance' | 'reviews' | 'shipping'>('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [lensMode, setLensMode] = useState<'standard' | 'tungsten' | 'macro'>('standard');
  const [imageError, setImageError] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState(false);

  // Gallery simulation angles
  const galleryViews = [
    { label: 'Front Stack View', note: 'Studio Camera Lighting' },
    { label: 'Paper Strap & Edge', note: '100 Notes Stack Profile' },
    { label: 'Reverse Print / Core', note: product.printType === '2-sided' ? 'Full 2-Sided High Definition' : '1-Sided Stunt Core' },
    { label: 'Compliance Macro', note: 'Official Specimen Markings' },
  ];

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedAnimation(true);
    setIsOpen(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    onOpenCheckout();
  };

  // Find 4 related products in the same category track or other denominations
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id)
    .sort((a, b) => {
      if (a.coreCategory === product.coreCategory && b.coreCategory !== product.coreCategory) return -1;
      if (b.coreCategory === product.coreCategory && a.coreCategory !== product.coreCategory) return 1;
      return 0;
    })
    .slice(0, 4);

  const getCoreCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'single':
        return 'Single Denominations';
      case 'bundles':
        return 'Full Stacks & Production Bundles';
      case 'special':
        return 'Special Finishes & Camera-Grade Props';
      default:
        return 'Prop Money Stacks';
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen">
      {/* 1. WooCommerce Breadcrumbs Bar */}
      <div className="w-full border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-slate-500">
            <Link
              to="/"
              className="hover:text-amber-600 transition-colors uppercase font-semibold cursor-pointer"
            >
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              to="/shop"
              className="hover:text-amber-600 transition-colors uppercase font-semibold cursor-pointer"
            >
              SHOP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              to={`/shop?category=${product.coreCategory}`}
              className="hover:text-amber-600 transition-colors uppercase font-semibold cursor-pointer hidden sm:inline-block"
            >
              {getCoreCategoryLabel(product.coreCategory)}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline-block" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
          </nav>

          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Catalog</span>
          </Link>
        </div>
      </div>

      {/* Production Soundstage Notice */}
      <div className="w-full bg-amber-50 border-b border-amber-200 py-2 px-4 text-center">
        <p className="text-xs font-mono text-amber-900">
          <span className="font-bold">STUDIO REQUISITIONS:</span> High-definition camera matte finish · 100% ECB Legal Reproduction Standard · Dispatches in 24h
        </p>
      </div>

      {/* 2. Main WooCommerce Two-Column Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Gallery & Lens Inspector (7 Cols on LG) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Viewport */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-300 overflow-hidden shadow-xl aspect-[4/3] group">
              {/* Product Image */}
              {!imageError ? (
                <img
                  src={
                    activeImageIndex === 1 && product.gallery && product.gallery[0]
                      ? product.gallery[0]
                      : activeImageIndex === 2 && product.gallery && product.gallery[1]
                      ? product.gallery[1]
                      : activeImageIndex === 3 && product.gallery && product.gallery[0]
                      ? product.gallery[0]
                      : product.image
                  }
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover object-center transition-all duration-500 ${
                    lensMode === 'tungsten' ? 'sepia-[0.35] brightness-95 contrast-105' : ''
                  } ${
                    lensMode === 'macro' ? 'scale-125 origin-center' : 'scale-100'
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-center">
                  <ShieldCheck className="w-16 h-16 text-amber-400/70 mb-3" />
                  <span className="text-base font-bold text-white font-mono">{product.name}</span>
                  <span className="text-xs text-slate-400 mt-1">Cinema Prop Currency Specimen</span>
                </div>
              )}

              {/* Watermark / Legal Clearance Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30 shadow-md">
                  ECB COMPLIANT PROP SPECIMEN
                </span>
                {product.tag && (
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Face Value Tag */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <span className="text-xs font-mono font-bold text-white bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 shadow-lg">
                  {product.faceValue}
                </span>
              </div>

              {/* Camera Simulation Controls Pill */}
              <div className="absolute top-4 right-4 z-10 flex items-center bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-lg p-1 text-xs font-mono">
                <button
                  onClick={() => setLensMode('standard')}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    lensMode === 'standard' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Standard Daylight 5600K lighting"
                >
                  Daylight
                </button>
                <button
                  onClick={() => setLensMode('tungsten')}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    lensMode === 'tungsten' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tungsten 3200K cinema light test (Anti-glare verification)"
                >
                  Tungsten
                </button>
                <button
                  onClick={() => setLensMode('macro')}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    lensMode === 'macro' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Macro Optical Zoom (Inspect micro-text & paper grain)"
                >
                  Macro 8K
                </button>
              </div>

              {/* Lens info overlay at bottom-right */}
              <div className="absolute bottom-4 right-4 z-10">
                <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-slate-400 border border-slate-800">
                  <Camera className="w-3 h-3 text-amber-400" />
                  <span>Tested: ARRI Alexa 35 & RED Raw</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery Navigation */}
            <div className="grid grid-cols-4 gap-3">
              {galleryViews.map((view, idx) => {
                const thumbImg = 
                  idx === 1 && product.gallery && product.gallery[0]
                    ? product.gallery[0]
                    : idx === 2 && product.gallery && product.gallery[1]
                    ? product.gallery[1]
                    : idx === 3 && product.gallery && product.gallery[0]
                    ? product.gallery[0]
                    : product.image;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                      activeImageIndex === idx
                        ? 'bg-amber-50/70 border-amber-400 ring-1 ring-amber-400/50 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-full h-12 rounded-lg overflow-hidden mb-1.5 bg-slate-950">
                      <img src={thumbImg} alt={view.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-900 block truncate">{view.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Studio Prop Guarantee Card */}
            <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5 shadow-2xs">
              <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block mb-0.5">Soundstage Safe · Zero Camera Reflectivity</span>
                <p className="text-slate-600 leading-relaxed">
                  Printed on 120gsm cellulose matte bond paper with anti-reflective ink binders. Eliminates white specular flares under high-intensity tungsten, HMI, and LED production rigs.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WooCommerce Purchase & Meta Box (5 Cols on LG) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Header / Badges */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  {product.denomination === 'mixed' ? 'MIXED DENOMINATION' : `€${product.denomination} PROP REPLICA`}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-medium">{product.printType === '2-sided' ? 'Full 2-Sided' : '1-Sided Stunt'}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-semibold">{product.billsPerUnit} Banknotes</span>
              </div>

              {/* Product Title (H1 for SEO & WooCommerce) */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating & Social Proof */}
              <div className="flex items-center gap-2.5 mt-2.5 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-slate-900 font-mono">5.0</span>
                <span className="text-slate-300">·</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-slate-600 hover:text-amber-700 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  48 Verified Film Studio Reviews
                </button>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-3xl font-black text-slate-950 font-mono tabular-nums">
                    €{product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500 block font-mono mt-0.5">
                    Studio Net · Excl. VAT (Reclaimable Business Expense)
                  </span>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    In Stock
                  </span>
                  <span className="text-[11px] text-slate-500 block font-mono mt-1">
                    Ships in 24 Hours
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
                <span>Face Value Equivalent:</span>
                <span className="text-slate-900 font-bold">{product.faceValue}</span>
              </div>
            </div>

            {/* Short Narrative Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Key Specification Highlights (WooCommerce Quick Specs) */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex flex-col">
                <span className="text-slate-500 text-[11px]">PAPER WEIGHT</span>
                <span className="text-slate-800 font-semibold">{product.compliance.paperGrade}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[11px]">STACK DIMENSIONS</span>
                <span className="text-slate-800 font-semibold">{product.specifications.dimensions}</span>
              </div>
              <div className="flex flex-col mt-2 pt-2 border-t border-slate-200">
                <span className="text-slate-500 text-[11px]">PRINT FINISH</span>
                <span className="text-slate-800 font-semibold capitalize">{product.finish.replace('-', ' ')}</span>
              </div>
              <div className="flex flex-col mt-2 pt-2 border-t border-slate-200">
                <span className="text-slate-500 text-[11px]">DISPATCH HUB</span>
                <span className="text-slate-800 font-semibold">Frankfurt & London Hubs</span>
              </div>
            </div>

            {/* WooCommerce Quantity & Primary Purchase CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-300 bg-white rounded-lg overflow-hidden h-12 shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-lg font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 h-full bg-transparent text-center font-mono font-bold text-slate-900 text-base focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-10 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`flex-1 h-12 rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white font-black'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-[0.98]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>Added to Studio Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                      <span>Add to Cart · €{(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Express Checkout / Buy Now */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Express Checkout</span>
                </button>

                <button
                  onClick={onOpenQuote}
                  className="w-full h-11 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-mono text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Generate PO Requisition</span>
                </button>
              </div>
            </div>

            {/* Production Perks Bar */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono text-slate-600 shadow-2xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Express 24h courier delivery across EU and UK soundstages</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Article 2(1) ECB Decision 2013/10 Legal Compliance Clearance Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Order before 14:00 CET for guaranteed same-day dispatch</span>
              </div>
            </div>

            {/* WooCommerce Meta Details */}
            <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 space-y-1">
              <div>
                <span className="text-slate-500 font-semibold">SKU:</span> EPM-EUR-{product.slug}
              </div>
              <div>
                <span className="text-slate-500 font-semibold">CATEGORY:</span>{' '}
                <button
                  onClick={() => onNavigateShop(product.coreCategory)}
                  className="text-amber-700 hover:underline cursor-pointer uppercase font-medium"
                >
                  {getCoreCategoryLabel(product.coreCategory)}
                </button>
              </div>
              <div>
                <span className="text-zinc-400">TAGS:</span> Euro Prop Money, Movie Props, {product.denomination === 'mixed' ? 'Mixed Stacks' : `€${product.denomination} Notes`}, Cinema Quality
              </div>
            </div>

          </div>
        </div>

        {/* 3. WooCommerce Classic Product Tabs Section */}
        <div className="mt-16 sm:mt-20 border-t border-slate-200 pt-10">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-slate-200 pb-px font-mono text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-2 sm:px-4 border-b-2 transition-all cursor-pointer uppercase ${
                activeTab === 'description'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 px-2 sm:px-4 border-b-2 transition-all cursor-pointer uppercase ${
                activeTab === 'specifications'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`pb-4 px-2 sm:px-4 border-b-2 transition-all cursor-pointer uppercase ${
                activeTab === 'compliance'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              ECB Legal Compliance
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-2 sm:px-4 border-b-2 transition-all cursor-pointer uppercase ${
                activeTab === 'reviews'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Studio Reviews (48)
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 px-2 sm:px-4 border-b-2 transition-all cursor-pointer uppercase ${
                activeTab === 'shipping'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Shipping & Delivery
            </button>
          </div>

          {/* Tab Contents */}
          <div className="py-8 text-slate-700">
            
            {/* Tab 1: Description */}
            {activeTab === 'description' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Engineered Exclusively for Feature Films, Commercials & High-Speed Cameras
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    The {product.name} is engineered to resolve the exact optical challenges encountered by prop masters, gaffers, and cinematographers filming with high-resolution sensors like the ARRI Alexa 35, RED V-Raptor, and Sony Venice. Cheap novelty reproductions use glossy paper coatings that catch harsh white reflections under cinema lights, immediately shattering audience immersion.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <h4 className="text-sm font-bold font-mono uppercase text-amber-800 mb-2">
                      High-Definition Non-Gloss Matte Finish
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every stack is printed using a custom non-reflective matte dispersion formula on heavy 120gsm cotton-cellulose bond paper. This maintains 100% natural paper texture and absorbs glare even under direct 5kW tungsten spots and HMI fixtures.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <h4 className="text-sm font-bold font-mono uppercase text-amber-800 mb-2">
                      Tactile Weight & Realistic Bill Count
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Each bundle contains precisely {product.billsPerUnit} individual notes held securely by an authentic studio currency strap with printed denomination totals. When dropped onto tables or thrown during stunt sequences, the stacks fan and scatter with authentic aerodynamic weight.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">On-Set Handling & Care Instructions</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>Safe for use with air cannons, wind machines, and slow-motion high-frame-rate shoots up to 240fps.</li>
                    <li>Store in dry production flight cases between shooting days to prevent humidity absorption.</li>
                    <li>Always retain the included European Central Bank legal compliance clearance certificate inside your prop master binder.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Specifications Table */}
            {activeTab === 'specifications' && (
              <div className="max-w-4xl">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Technical Specifications</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs font-mono">
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold w-1/3">Denomination</th>
                        <td className="py-3.5 px-4 text-slate-900 font-bold">{product.denomination === 'mixed' ? 'Mixed Pack' : `€${product.denomination} Euro`}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Face Value Visual</th>
                        <td className="py-3.5 px-4 text-amber-800 font-bold">{product.faceValue}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Banknotes Per Unit</th>
                        <td className="py-3.5 px-4 text-slate-700">{product.billsPerUnit} Banknotes</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Print Type</th>
                        <td className="py-3.5 px-4 text-slate-700">{product.printType === '2-sided' ? '2-Sided Full Print (Macro Camera Safe)' : '1-Sided Stunt Fill'}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Finish Quality</th>
                        <td className="py-3.5 px-4 text-slate-700 capitalize">{product.finish.replace('-', ' ')}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Physical Dimensions</th>
                        <td className="py-3.5 px-4 text-slate-700">{product.specifications.dimensions}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Weight per Stack</th>
                        <td className="py-3.5 px-4 text-slate-700">{product.specifications.weight}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Paper Stock</th>
                        <td className="py-3.5 px-4 text-slate-700">{product.compliance.paperGrade}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Legal Markings</th>
                        <td className="py-3.5 px-4 text-emerald-700 font-bold">{product.compliance.markings}</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold">Camera Suitability</th>
                        <td className="py-3.5 px-4 text-slate-700">{product.specifications.cameraSuitability}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: ECB Legal Compliance */}
            {activeTab === 'compliance' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      Certified Legal Reproduction Under European Law
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our prop banknotes are manufactured in strict accordance with the criteria set forth in Article 2(1) of Decision ECB/2013/10 of the European Central Bank concerning the reproduction of Euro banknotes.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <span className="text-amber-800 font-bold block mb-1">CRITERION 1</span>
                    <span className="text-slate-900 font-bold block mb-1">Dimensional Variance</span>
                    <p className="text-slate-600 text-[11px]">
                      The physical dimensions vary by at least 125% from authentic Euro banknotes, preventing automated acceptor machine ingestion.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <span className="text-amber-800 font-bold block mb-1">CRITERION 2</span>
                    <span className="text-slate-900 font-bold block mb-1">Clear Word Markings</span>
                    <p className="text-slate-600 text-[11px]">
                      Features indelible &quot;SPECIMEN / FOR MOTION PICTURE USE ONLY&quot; markings across both front and reverse sides.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <span className="text-amber-800 font-bold block mb-1">CRITERION 3</span>
                    <span className="text-slate-900 font-bold block mb-1">Material Difference</span>
                    <p className="text-slate-600 text-[11px]">
                      Manufactured without watermarks, optical security threads, or genuine tactile intaglio relief printing.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-4 shadow-2xs">
                  <div className="text-xs text-center sm:text-left">
                    <span className="font-bold text-slate-900 block">Need formal documentation for border customs or city film office permits?</span>
                    <span className="text-slate-600">Download our full legal compliance whitepaper or inspect the official ECB rulebook.</span>
                  </div>
                  <button
                    onClick={onOpenCompliance}
                    className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    View ECB Legal Page
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Studio Reviews */}
            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-slate-900 font-mono">5.0 Out of 5</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Based on 48 verified key prop master & line producer orders</span>
                  </div>

                  <button
                    onClick={() => {
                      setReviewFeedback(true);
                      setTimeout(() => setReviewFeedback(false), 4000);
                    }}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-slate-300 shadow-2xs"
                  >
                    Write a Studio Review
                  </button>
                </div>

                {reviewFeedback && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified purchase reviews can be submitted with your studio PO reference code via our soundstage support line.</span>
                  </div>
                )}

                {/* Individual Verified Reviews */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">Stefan Vogel</span>
                        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">Verified Prop Master</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">Babelsberg Studios · 2 weeks ago</span>
                    </div>
                    <div className="flex text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      &quot;We used this exact stack for a tight anamorphic close-up on an open vault table. Zero flare, perfect color saturation on our Alexa 35 Log-C footage, and our German customs clearance was 100% painless thanks to the included certificate.&quot;
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">Clara Dubois</span>
                        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">Verified Production Designer</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">Paris Cinema Hub · 1 month ago</span>
                    </div>
                    <div className="flex text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      &quot;The tactile feel is what sets these apart. The actors loved handling them during an intense briefcase count scene. It gave the scene tremendous authenticity without risking legal issues.&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Shipping & Delivery */}
            {activeTab === 'shipping' && (
              <div className="max-w-4xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <h4 className="text-sm font-bold uppercase font-mono text-amber-800 mb-2">
                      European Dispatch Speed
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-2 font-mono">
                      <li className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span>Germany & Austria:</span>
                        <span className="text-slate-900 font-bold">Next-Day (24h)</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span>United Kingdom:</span>
                        <span className="text-slate-900 font-bold">24–48h DHL Express</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span>France, Italy, Spain:</span>
                        <span className="text-slate-900 font-bold">24–48h Priority</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Worldwide Soundstages:</span>
                        <span className="text-slate-900 font-bold">48–72h Courier</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <h4 className="text-sm font-bold uppercase font-mono text-amber-800 mb-2">
                      Discreet Studio Packaging
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      All shipments are packed in nondescript, tamper-evident double-walled corrugated boxes with zero external mentions of prop cash or money.
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every box includes a printed and stamped Certificate of Reproduction Compliance for immediate verification by customs officials and courier inspection agents.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 4. WooCommerce Related Products Section */}
        <div className="mt-16 sm:mt-24 border-t border-slate-200 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-1">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Frequently Paired For Productions</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Related Studio Props
              </h2>
            </div>

            <button
              onClick={() => onNavigateShop('all')}
              className="text-xs font-mono uppercase font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>View Full Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onInspect={() => onSelectProduct(relProduct)}
                onSelectProduct={() => {
                  onSelectProduct(relProduct);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* 5. Mobile Sticky Bottom Purchase Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.image}
            alt=""
            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
          />
          <div className="truncate">
            <span className="text-xs font-bold text-slate-900 block truncate">{product.name}</span>
            <span className="text-xs font-mono font-bold text-amber-700">€{product.price.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shrink-0 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

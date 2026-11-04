import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown, ShieldCheck, Sparkles, ShoppingBag, Layers, Briefcase, Zap } from 'lucide-react';
import { Product, CoreCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onInspectProduct: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  initialCategory?: string;
  onNavigateHome: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onInspectProduct,
  onSelectProduct,
  initialCategory = 'all',
  onNavigateHome,
}) => {
  const [selectedCoreCategory, setSelectedCoreCategory] = useState<string>(initialCategory);
  const [selectedQuickPill, setSelectedQuickPill] = useState<string>('all');
  const [selectedDenom, setSelectedDenom] = useState<string>('all');
  const [selectedPrint, setSelectedPrint] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'bills'>('default');

  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCoreCategory(initialCategory);
    }
  }, [initialCategory]);

  // Quick filter pills: All, €5, €10, €20, €50, €100, €200, Bundles, Double-Sided, Aged
  const quickPills = [
    { id: 'all', label: 'All Props' },
    { id: '5', label: '€5 Notes' },
    { id: '10', label: '€10 Notes' },
    { id: '20', label: '€20 Notes' },
    { id: '50', label: '€50 Stacks' },
    { id: '100', label: '€100 Stacks' },
    { id: '200', label: '€200 Stacks' },
    { id: 'bundles', label: 'Bundles & Cases' },
    { id: 'double-sided', label: 'Double-Sided' },
    { id: 'aged', label: 'Aged & Weathered' },
  ];

  const handleQuickPill = (pillId: string) => {
    setSelectedQuickPill(pillId);
    if (pillId === 'all') {
      setSelectedCoreCategory('all');
      setSelectedDenom('all');
      setSelectedPrint('all');
    } else if (pillId === 'bundles') {
      setSelectedCoreCategory('bundles');
      setSelectedDenom('all');
      setSelectedPrint('all');
    } else if (pillId === 'double-sided') {
      setSelectedPrint('2-sided');
      setSelectedDenom('all');
    } else if (pillId === 'aged') {
      setSelectedPrint('all');
      setSelectedDenom('all');
    } else if (['5', '10', '20', '50', '100', '200'].includes(pillId)) {
      setSelectedDenom(pillId);
    }
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      // Quick Pill Filter
      if (selectedQuickPill === 'aged') {
        if (!product.isAged && product.finish !== 'weathered-stunt') return false;
      } else if (selectedQuickPill === 'double-sided') {
        if (product.printType !== '2-sided') return false;
      } else if (['5', '10', '20', '50', '100', '200'].includes(selectedQuickPill)) {
        if (product.denomination.toString() !== selectedQuickPill) return false;
      } else if (selectedQuickPill === 'bundles') {
        if (product.coreCategory !== 'bundles') return false;
      }

      // Core Category filter (Single Denominations, Stacks & Bundles, Special Finishes)
      if (selectedCoreCategory !== 'all') {
        if (product.coreCategory !== selectedCoreCategory) return false;
      }

      // Denomination filter
      if (selectedDenom !== 'all') {
        if (selectedDenom === 'mixed' && product.denomination !== 'mixed') return false;
        if (selectedDenom !== 'mixed' && product.denomination.toString() !== selectedDenom) return false;
      }

      // Print Type filter
      if (selectedPrint !== 'all' && product.printType !== selectedPrint) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTag = product.tag?.toLowerCase().includes(q);
        const matchesFace = product.faceValue.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesFace) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'bills') {
      result.sort((a, b) => b.billsPerUnit - a.billsPerUnit);
    }

    return result;
  }, [selectedCoreCategory, selectedQuickPill, selectedDenom, selectedPrint, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCoreCategory('all');
    setSelectedQuickPill('all');
    setSelectedDenom('all');
    setSelectedPrint('all');
    setSearchQuery('');
    setSortBy('default');
  };

  const hasActiveFilters =
    selectedCoreCategory !== 'all' ||
    selectedQuickPill !== 'all' ||
    selectedDenom !== 'all' ||
    selectedPrint !== 'all' ||
    searchQuery !== '' ||
    sortBy !== 'default';

  return (
    <div className="w-full bg-white min-h-screen py-10 lg:py-16 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* WooCommerce Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Shop Catalog</span>
          {selectedCoreCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-amber-700 capitalize font-medium">
                {selectedCoreCategory === 'single'
                  ? 'Single Denominations'
                  : selectedCoreCategory === 'bundles'
                  ? 'Stacks & Bundles'
                  : 'Special Finishes'}
              </span>
            </>
          )}
        </nav>

        {/* Shop Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-2">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>Euro Prop Catalog</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>100% ECB Decision 2013/10 Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Shop Euro Prop Money
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Explore camera-calibrated Euro prop currency bundles across our three core production categories. High-definition 8K non-reflective matte finish with legal safe harbor markings.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search props, face values, cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-sans shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Scrolling Quick-Filter Pill System */}
        <div className="mb-6 pb-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-mono text-slate-500 uppercase shrink-0 mr-1 font-semibold">
              Quick Filters:
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill.id}
                onClick={() => handleQuickPill(pill.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedQuickPill === pill.id
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-200/70'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Category Tabs & Secondary Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          {/* Core Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'single', label: 'Single Denominations' },
              { id: 'bundles', label: 'Stacks & Bundles' },
              { id: 'special', label: 'Special Finishes' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCoreCategory(cat.id);
                  setSelectedQuickPill('all');
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCoreCategory === cat.id
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Denominations, Print Type, and Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Denomination Selector */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-mono text-[11px] uppercase">Denom:</span>
              <div className="flex items-center gap-1">
                {['all', '5', '10', '20', '50', '100', '200', '500'].map((denom) => (
                  <button
                    key={denom}
                    onClick={() => {
                      setSelectedDenom(denom);
                      setSelectedQuickPill('all');
                    }}
                    className={`px-2 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      selectedDenom === denom
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-2xs'
                    }`}
                  >
                    {denom === 'all' ? 'All' : `€${denom}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Print Type */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-mono text-[11px] uppercase">Print:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: '2-sided', label: '2-Sided' },
                  { id: '1-sided', label: '1-Sided' },
                ].map((print) => (
                  <button
                    key={print.id}
                    onClick={() => {
                      setSelectedPrint(print.id);
                      setSelectedQuickPill('all');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      selectedPrint === print.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-2xs'
                    }`}
                  >
                    {print.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-mono text-[11px] uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-300 text-xs text-slate-800 rounded px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer font-sans shadow-2xs"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bills">Highest Bill Count</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-4 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Status Count & Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-6">
          <div className="flex items-center gap-2">
            <span>Showing {filteredProducts.length} Euro prop production item{filteredProducts.length === 1 ? '' : 's'}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>All ECB 2013/10 Certified</span>
          </div>
          <span className="text-emerald-700 font-semibold">24H Stage Courier Available</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInspect={onInspectProduct}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 mb-1">No products match your current filters</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
              Try adjusting your denomination, category, or search term to discover our complete prop money catalog.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

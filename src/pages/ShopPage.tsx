import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onInspectProduct: (product: Product) => void;
  initialCategory?: string;
  onNavigateHome: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onInspectProduct,
  initialCategory = 'all',
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDenom, setSelectedDenom] = useState<string>('all');
  const [selectedPrint, setSelectedPrint] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'bills'>('default');

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'stack' && product.category !== 'stack') return false;
        if (selectedCategory === 'bag-case' && product.category !== 'bag' && product.category !== 'case') return false;
        if (selectedCategory === 'bundle' && product.category !== 'bundle') return false;
      }

      // Denomination
      if (selectedDenom !== 'all') {
        if (selectedDenom === 'mixed' && product.denomination !== 'mixed') return false;
        if (selectedDenom !== 'mixed' && product.denomination.toString() !== selectedDenom) return false;
      }

      // Print Type
      if (selectedPrint !== 'all' && product.printType !== selectedPrint) {
        return false;
      }

      // Search Query
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
  }, [selectedCategory, selectedDenom, selectedPrint, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedDenom('all');
    setSelectedPrint('all');
    setSearchQuery('');
    setSortBy('default');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedDenom !== 'all' ||
    selectedPrint !== 'all' ||
    searchQuery !== '' ||
    sortBy !== 'default';

  return (
    <div className="w-full bg-zinc-950 min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* WooCommerce Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-300 font-semibold">Shop</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-amber-400 capitalize">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Shop Page Title & Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Full Production Catalog</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>ECB Decision 2013/10 Compliant</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Shop Euro Prop Money Stacks & Cases
            </h1>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Browse our complete inventory of camera-calibrated Euro prop currency bundles. High-definition 8K non-reflective matte finish, legal scale adherence, and fast courier dispatch for European soundstages.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search props, face values, cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-9 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter & Sorting Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/90 rounded-lg border border-zinc-800">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'stack', label: 'Banknote Stacks' },
              { id: 'bag-case', label: 'Heist Bags & Vault Cases' },
              { id: 'bundle', label: 'Stunt Sets & Kits' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filters & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Denomination Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Denom:</span>
              <div className="flex items-center gap-1">
                {['all', '20', '50', '100', '200', '500'].map((denom) => (
                  <button
                    key={denom}
                    onClick={() => setSelectedDenom(denom)}
                    className={`px-2 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      selectedDenom === denom
                        ? 'bg-amber-400 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    {denom === 'all' ? 'All' : `€${denom}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Print Type */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Print:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: '2-sided', label: '2-Sided' },
                  { id: '1-sided', label: '1-Sided' },
                ].map((print) => (
                  <button
                    key={print.id}
                    onClick={() => setSelectedPrint(print.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      selectedPrint === print.id
                        ? 'bg-zinc-700 text-white'
                        : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    {print.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded px-2.5 py-1 focus:outline-none focus:border-amber-400 cursor-pointer font-sans"
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
                className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Status Count */}
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-6">
          <div className="flex items-center gap-2">
            <span>Showing all {filteredProducts.length} production items</span>
            <span aria-hidden="true">·</span>
            <span>All Certified ECB 2013/10</span>
          </div>
          <span>Next-Day Soundstage Delivery Available</span>
        </div>

        {/* Full Shop Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInspect={onInspectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <SlidersHorizontal className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white mb-1">No products match your current filters</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              Try adjusting your denomination or category to view available prop stacks.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Volume Discount Notice Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Ordering in Volume for a Feature Film or Series?</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Take advantage of automatic tiered discounts: 15% off for 5+ stacks, 25% off for 15+ stacks, and 40% off for 50+ stacks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#bulk-calculator"
              onClick={onNavigateHome}
              className="px-5 py-2.5 bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors cursor-pointer whitespace-nowrap shadow-md"
            >
              Open Bulk Calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

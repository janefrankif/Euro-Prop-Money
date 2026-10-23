import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Product, ProductCategory, PrintType, Denomination } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  onInspectProduct: (product: Product) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onInspectProduct,
  activeCategory = 'all',
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory);

  React.useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);
  const [selectedDenom, setSelectedDenom] = useState<string>('all');
  const [selectedPrint, setSelectedPrint] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'stack' && product.category !== 'stack') return false;
        if (selectedCategory === 'bag-case' && product.category !== 'bag' && product.category !== 'case') return false;
        if (selectedCategory === 'bundle' && product.category !== 'bundle') return false;
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

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.tag?.toLowerCase().includes(query);
        const matchesFace = product.faceValue.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesFace) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedDenom, selectedPrint, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedDenom('all');
    setSelectedPrint('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedDenom !== 'all' || selectedPrint !== 'all' || searchQuery !== '';

  return (
    <section id="shop" className="w-full py-16 lg:py-24 border-b border-zinc-800 bg-zinc-950 scroll-mt-16">
      <div id="catalog" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <span>Production Stage Assets</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Prop Banknotes & Ensembles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Euro Prop Money Catalog
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search denominations, bags, stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-9 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
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

        {/* Filter Controls Bar (Interactive Segmented Buttons) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/90 rounded-lg border border-zinc-800">
            {[
              { id: 'all', label: 'All Props' },
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

          {/* Secondary Filters: Denominations & Print Type */}
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

            {/* Print Type Toggle */}
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

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Unboxed Metadata Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-6">
          <div className="flex items-center gap-2">
            <span>Showing {filteredProducts.length} Film Prop Specimen{filteredProducts.length === 1 ? '' : 's'}</span>
            <span aria-hidden="true">·</span>
            <span>All ECB 2013/10 Certified</span>
          </div>
          <span>Camera Ready 8K Tested</span>
        </div>

        {/* 3-Column Desktop / 2-Column Tablet Grid */}
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
            <h3 className="text-base font-semibold text-white mb-1">No prop products match your filters</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              Try adjusting your denomination, category, or search term to discover our full range of film-grade euro currency.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

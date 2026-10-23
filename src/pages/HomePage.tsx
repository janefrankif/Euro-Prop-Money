import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { ProductCard } from '../components/ProductCard';
import { BulkCalculator } from '../components/BulkCalculator';
import { TrustpilotReviews } from '../components/TrustpilotReviews';
import { StudioTrustSection } from '../components/StudioTrustSection';
import { SEORichSection } from '../components/SEORichSection';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blog';

interface HomePageProps {
  onInspectProduct: (product: Product) => void;
  onNavigateShop: (category?: string) => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateBlog: () => void;
  onOpenCompliance: () => void;
  onOpenQuote: () => void;
  onReadPost: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onInspectProduct,
  onNavigateShop,
  onNavigateAbout,
  onNavigateContact,
  onNavigateBlog,
  onOpenCompliance,
  onOpenQuote,
  onReadPost,
}) => {
  // Exactly 4 Featured Products for the Homepage
  const featuredProducts = PRODUCTS.slice(0, 4);

  const scrollToCalculator = () => {
    const el = document.getElementById('bulk-calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        onScrollToCatalog={() => onNavigateShop('all')}
        onScrollToCalculator={scrollToCalculator}
        onOpenCompliance={onOpenCompliance}
      />

      {/* 2. Visual Category Showcase */}
      <CategoryShowcase onSelectCategory={(cat) => onNavigateShop(cat)} />

      {/* 3. Exactly 4 Featured Products Grid */}
      <section className="w-full py-16 lg:py-20 border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Featured Studio Stacks</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>Best Sellers for Shoots</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Featured Euro Prop Money
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                Top requested prop currency configurations used in European cinema, television, and commercial video sets.
              </p>
            </div>

            {/* Direct Link to Full Shop Catalog */}
            <button
              onClick={() => onNavigateShop('all')}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-white hover:text-amber-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-sm group"
            >
              <span>View All Products in Shop</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
            </button>
          </div>

          {/* 4 Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInspect={onInspectProduct}
              />
            ))}
          </div>

          {/* Bottom Catalog Discovery Banner */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-300 text-center sm:text-left">
              <span className="font-bold text-white block sm:inline mr-2">Need €20 or €200 stacks, 1-sided stunt cannons, or custom bundles?</span>
              <span className="text-zinc-500">Our full catalog contains complete denominations and custom pack configurations.</span>
            </div>
            <button
              onClick={() => onNavigateShop('all')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow"
            >
              Explore All Items
            </button>
          </div>
        </div>
      </section>

      {/* 4. Production Bulk Tier Calculator */}
      <BulkCalculator />

      {/* 5. Real-Time Trustpilot Reviews Slider (10 Verified Reviews) */}
      <TrustpilotReviews />

      {/* 6. Blog Teaser Preview (2 Articles with Link to Full Blog Page) */}
      <section className="w-full py-16 border-b border-zinc-800 bg-zinc-950/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Production Knowledge Base</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Latest From The Prop Master Blog
              </h2>
            </div>
            <button
              onClick={onNavigateBlog}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <article
                key={post.id}
                onClick={() => onReadPost(post)}
                className="group rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                    <span className="text-amber-400 font-semibold uppercase">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>
                <div className="text-xs font-bold text-zinc-400 group-hover:text-white flex items-center gap-1.5">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SEO Rich Text & Technical Section */}
      <SEORichSection
        onOpenCompliance={onOpenCompliance}
        onOpenQuote={onOpenQuote}
      />

      {/* 8. Studio Trust & Testimonials */}
      <StudioTrustSection
        onOpenCompliance={onOpenCompliance}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};

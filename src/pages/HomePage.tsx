import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { ProductCard } from '../components/ProductCard';
import { TrustpilotReviews } from '../components/TrustpilotReviews';
import { StudioTrustSection } from '../components/StudioTrustSection';
import { SEORichSection } from '../components/SEORichSection';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blog';

interface HomePageProps {
  onInspectProduct: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
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
  onSelectProduct,
  onNavigateShop,
  onNavigateAbout,
  onNavigateContact,
  onNavigateBlog,
  onOpenCompliance,
  onOpenQuote,
  onReadPost,
}) => {
  // 8 Featured Products for the Homepage
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        onScrollToCatalog={() => onNavigateShop('all')}
        onOpenCompliance={onOpenCompliance}
      />

      {/* 2. Visual Category Showcase (3 Core Tracks: Single Denominations, Stacks & Bundles, Special Finishes) */}
      <CategoryShowcase onSelectCategory={(cat) => onNavigateShop(cat)} />

      {/* 3. Featured Products Grid (8 Products) */}
      <section className="w-full py-16 lg:py-20 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Featured Studio Stacks</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Best Sellers for Shoots</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Euro Prop Money
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Top requested prop currency configurations used in European cinema, television, music videos, and AI virtual sets.
              </p>
            </div>

            {/* Direct Link to Full Shop Catalog */}
            <button
              onClick={() => onNavigateShop('all')}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 border border-slate-300 hover:border-amber-400 text-slate-800 hover:text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-xs group"
            >
              <span>View All Products in Shop</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-600" />
            </button>
          </div>

          {/* 8 Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInspect={onInspectProduct}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>

          {/* Bottom Catalog Discovery Banner */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="text-xs text-slate-700 text-center sm:text-left">
              <span className="font-bold text-slate-900 block sm:inline mr-2">Looking for custom stacks, 1-sided stunt cannons, or complete vault sets?</span>
              <span className="text-slate-500">Our complete catalog includes individual notes from €5 to €500 and turnkey movie prop sets.</span>
            </div>
            <button
              onClick={() => onNavigateShop('all')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Explore Full Shop
            </button>
          </div>
        </div>
      </section>

      {/* 4. Real-Time Trustpilot Reviews Slider (10 Verified Reviews) */}
      <TrustpilotReviews />

      {/* 5. Blog Teaser Preview (2 Articles with Link to Full Blog Page) */}
      <section className="w-full py-16 border-b border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-1">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Production Knowledge Base</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest From The Prop Master Blog
              </h2>
            </div>
            <button
              onClick={onNavigateBlog}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider transition-colors cursor-pointer"
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
                className="group rounded-xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 transition-all cursor-pointer hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                    <span className="text-amber-700 font-semibold uppercase">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-600 group-hover:text-slate-900 flex items-center gap-1.5">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SEO Rich Text & Technical Section */}
      <SEORichSection
        onOpenCompliance={onOpenCompliance}
        onOpenQuote={onOpenQuote}
      />

      {/* 7. Studio Trust & Testimonials */}
      <StudioTrustSection
        onOpenCompliance={onOpenCompliance}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};

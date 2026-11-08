'use client';

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { ProductCard } from '../components/ProductCard';
import { TrustpilotReviews } from '../components/TrustpilotReviews';
import { FAQSection } from '../components/FAQSection';
import { StudioTrustSection } from '../components/StudioTrustSection';
import { SEORichSection } from '../components/SEORichSection';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '../router';

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
  // 1. Exactly 4 Most Demanded Featured Products for European Film & AI Sets
  const mostDemandedIds = [
    'euro-50-stack',       // #1 Most filmed bill in European cinema
    'euro-100-stack',      // #2 Studio best seller for high-stakes transactions
    'euro-500-stack',      // #3 Discontinued syndicate banknote legend
    'euro-directors-case', // #4 Turnkey €1,000,000 hero flight case
  ];

  const featuredProducts = mostDemandedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  // 2. Exactly 4 Blog Posts Targeting High Search Volume Keywords
  const featuredBlogPosts = BLOG_POSTS.slice(0, 4);

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Section (100% Viewport Height Cover) */}
      <HeroSection
        onScrollToCatalog={() => onNavigateShop('all')}
        onOpenCompliance={onOpenCompliance}
      />

      {/* 2. Product Categories (3 Core Production Tracks) */}
      <CategoryShowcase onSelectCategory={(cat) => onNavigateShop(cat)} />

      {/* 3. 4 Featured Products - Most Demanded */}
      <section className="w-full py-16 lg:py-20 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Most Demanded Prop Money
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                The four most frequently requested Euro banknote packages ordered by European art directors, feature film prop masters, and music video creators.
              </p>
            </div>

            {/* Direct Link to Full Shop Catalog */}
            <Link
              to="/shop"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 border border-slate-300 hover:border-amber-400 text-slate-800 hover:text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-xs group"
            >
              <span>View All Products in Shop</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-600" />
            </Link>
          </div>

          {/* 4 Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="relative flex flex-col">
                {/* Demand Rank Ribbon */}
                <div className="absolute top-3 left-3 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/90 text-amber-400 shadow-md backdrop-blur-xs">
                    <span>Rank #0{idx + 1}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-white">Demanded</span>
                  </span>
                </div>

                <ProductCard
                  product={product}
                  onInspect={onInspectProduct}
                  onSelectProduct={onSelectProduct}
                />
              </div>
            ))}
          </div>

          {/* Bottom Catalog Discovery Banner */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="text-xs text-slate-700 text-center sm:text-left">
              <span className="font-bold text-slate-900 block sm:inline mr-2">Need individual denominations (€5, €10, €20, €200) or customized director packages?</span>
              <span className="text-slate-500">Explore our complete catalog with single banded stacks, distressed crime notes, and tactical bags.</span>
            </div>
            <Link
              to="/shop"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Explore Full Shop
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 10 Real Time Trustpilot Reviews in Review Slider */}
      <TrustpilotReviews />

      {/* 5. 4 Blog Posts - High Search Volume Keywords */}
      <section className="w-full py-16 lg:py-20 border-b border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Industry Production Guides</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Prop Master & Film Production Blog
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Authoritative compliance articles, camera sensor tests, and cross-border customs advice for filmmaking crews.
              </p>
            </div>
            <Link
              to="/blog"
              className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View All {BLOG_POSTS.length} Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Exactly 4 Blog Posts on Homepage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBlogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onReadPost(post)}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-amber-400 transition-all duration-200 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                {post.image && (
                  <div className="relative w-full h-36 overflow-hidden bg-slate-950">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-700 group-hover:text-amber-600 flex items-center justify-between transition-colors">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 5 FAQs - Most Searched Questions */}
      <FAQSection
        onOpenCompliance={onOpenCompliance}
        onOpenQuote={onOpenQuote}
      />

      {/* 7. SEO Rich Technical Specifications & Authority Section */}
      <SEORichSection
        onOpenCompliance={onOpenCompliance}
        onOpenQuote={onOpenQuote}
      />

      {/* 8. Studio Trust Credentials & Logistics Verification */}
      <StudioTrustSection
        onOpenCompliance={onOpenCompliance}
        onOpenQuote={onOpenQuote}
      />
    </div>
  );
};

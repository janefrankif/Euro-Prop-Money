import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { Link } from '../router';

interface BlogPageProps {
  onNavigateHome: () => void;
  onReadPost: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateHome, onReadPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Legal Compliance', 'Virtual Production', 'Cinematography', 'Production Logistics'];

  const filteredPosts = selectedCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full bg-white min-h-screen py-10 lg:py-16 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link
            to="/"
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Blog &amp; Guides</span>
        </nav>

        {/* Title */}
        <div className="max-w-3xl mb-10 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 font-bold mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Studio Production Knowledge Base</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Guides for Line Producers & Prop Masters</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industry Articles & Production Insights
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Expert analysis on European Central Bank legal compliance, 8K anamorphic lens camera optics, generative AI virtual production sets, and international customs transit.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? `All Articles (${BLOG_POSTS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadPost(post)}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 block"
            >
              <div>
                {post.image && (
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-950">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                    <span className="text-amber-600 font-bold uppercase">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                  <span>Read Full Industry Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-500" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Articles written by certified European film prop coordinators and legal liaisons. All content conforms to official European Central Bank publications and European copyright treaties.
          </span>
        </div>
      </div>
    </div>
  );
};

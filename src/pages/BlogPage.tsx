import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blog';

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
    <div className="w-full bg-zinc-950 min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-300 font-semibold">Blog & Guides</span>
        </nav>

        {/* Title */}
        <div className="max-w-3xl mb-10 pb-8 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Studio Production Knowledge Base</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Guides for Line Producers & Prop Masters</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry Articles & Production Insights
          </h1>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
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
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadPost(post)}
              className="group rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                  <span className="text-amber-400 font-semibold uppercase">
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

                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {post.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                <span>Read Full Industry Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
              </div>
            </article>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Articles written by certified European film prop coordinators and legal liaisons. All content conforms to official European Central Bank publications and European copyright treaties.
          </span>
        </div>
      </div>
    </div>
  );
};

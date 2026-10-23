import React from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blog';

interface BlogSectionProps {
  onReadPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadPost }) => {
  return (
    <section id="blog" className="w-full py-16 lg:py-24 border-b border-zinc-800 bg-zinc-950/70 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Production Intel & Knowledge Base</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Prop Masters Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Featured Industry Articles
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Essential reading on European filming permits, virtual AI production set integration, and cinema camera optics.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadPost(post)}
              className="group rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-md"
            >
              <div>
                {/* Category & Time */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-3">
                  <span className="text-amber-400 uppercase font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2.5 leading-snug">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                  {post.summary}
                </p>
              </div>

              {/* Read Link */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

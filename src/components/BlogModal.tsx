'use client';

import React from 'react';
import { X, Calendar, Clock, Tag, ShieldCheck } from 'lucide-react';
import { BlogPost } from '../data/blog';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold">
            <Tag className="w-3.5 h-3.5" />
            <span className="uppercase">{post.category}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close article"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {post.image && (
            <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-slate-950 mb-6 shadow-md">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
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

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {post.title}
            </h1>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed italic">
            &ldquo;{post.summary}&rdquo;
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-4">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500">TAGS:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Legal Safe Harbor Callout */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-emerald-200 text-xs text-slate-600 flex items-start gap-2.5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              All prop money products mentioned are manufactured strictly compliant with European Central Bank Decision ECB/2013/10. For motion picture and media use only.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

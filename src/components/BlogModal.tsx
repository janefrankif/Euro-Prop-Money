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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Tag className="w-3.5 h-3.5" />
            <span className="uppercase">{post.category}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close article"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mb-3">
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

            <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {post.title}
            </h1>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-amber-300/90 font-medium leading-relaxed italic">
            &ldquo;{post.summary}&rdquo;
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-4">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-500">TAGS:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Legal Safe Harbor Callout */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-emerald-500/20 text-xs text-zinc-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              All prop money products mentioned are manufactured strictly compliant with European Central Bank Decision ECB/2013/10. For motion picture and media use only.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

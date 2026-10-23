import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, ShieldCheck, Film } from 'lucide-react';
import { TRUSTPILOT_REVIEWS, Review } from '../data/reviews';

export const TrustpilotReviews: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance reviews
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % TRUSTPILOT_REVIEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? TRUSTPILOT_REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TRUSTPILOT_REVIEWS.length);
  };

  // Show up to 3 reviews on desktop, 2 on tablet, 1 on mobile
  const visibleReviews: Review[] = [];
  for (let i = 0; i < 3; i++) {
    const idx = (startIndex + i) % TRUSTPILOT_REVIEWS.length;
    visibleReviews.push(TRUSTPILOT_REVIEWS[idx]);
  }

  return (
    <section className="w-full py-16 lg:py-24 border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Trustpilot Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Studio Testimonials</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>450+ EU Productions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Trusted On European Sets
            </h2>
          </div>

          {/* Trustpilot Score Summary Box */}
          <div className="flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 px-5 self-start md:self-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm font-bold text-white">Trustpilot</span>
                <div className="flex gap-0.5 text-emerald-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                <strong className="text-white">4.9 / 5.0</strong> based on 320+ Studio Reviews
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-4">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="rounded-xl bg-zinc-900/50 border border-zinc-800/90 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 shadow-md"
            >
              <div>
                {/* Rating & Timestamp */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5 text-emerald-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {review.timeAgo}
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                {/* Comment */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {review.comment}
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{review.author}</span>
                  {review.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Studio Buyer</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-zinc-500 font-mono">
                  {review.role} · {review.studio}
                </div>

                <div className="mt-2 text-[10px] text-amber-400/90 font-mono flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  <span>Item: {review.orderType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time ticker indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
          <span>Review {startIndex + 1} of {TRUSTPILOT_REVIEWS.length}</span>
          <span>·</span>
          <span>Updated in Real-Time from Verified Production Purchase Orders</span>
        </div>
      </div>
    </section>
  );
};

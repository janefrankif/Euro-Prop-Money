import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, ShieldCheck, Film, Sparkles } from 'lucide-react';
import { TRUSTPILOT_REVIEWS, Review } from '../data/reviews';

export const TrustpilotReviews: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance reviews every 4.5 seconds
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
    <section className="w-full py-16 lg:py-24 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Trustpilot Badge & 10 Real-Time Reviews Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Studio Testimonials</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">10 Real-Time Reviews</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>450+ EU Productions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted On European Sets
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Live feedback from Key Prop Masters, Art Directors, and DP crews shooting across European soundstages.
            </p>
          </div>

          {/* Trustpilot Score Summary Box & Slider Navigation */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 px-5 self-start md:self-auto shadow-2xs">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm font-extrabold text-slate-900 tracking-tight">Trustpilot</span>
                <div className="flex gap-0.5 text-emerald-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                <strong className="text-slate-900 font-bold">4.9 / 5.0</strong> based on 320+ verified orders
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 10 Reviews Slider Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="rounded-2xl bg-slate-50/80 border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div>
                {/* Rating & Real-time Timestamp */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5 text-emerald-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    {review.timeAgo}
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {review.comment}
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-slate-200/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{review.author}</span>
                  {review.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified Studio Buyer</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  {review.role} · {review.studio}
                </div>

                <div className="mt-2 text-[10px] text-amber-700 font-mono font-semibold flex items-center gap-1 bg-amber-50 px-2 py-1 rounded w-fit border border-amber-200/60">
                  <Film className="w-3 h-3 text-amber-600" />
                  <span>Item: {review.orderType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 10 Review Dots Pagination & Live Slider Status */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-1.5">
            {TRUSTPILOT_REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                aria-label={`Jump to review ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  startIndex === i
                    ? 'w-6 bg-amber-500'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showing Review {startIndex + 1} of {TRUSTPILOT_REVIEWS.length}</span>
            <span>·</span>
            <span>Real-time Verified EU Production Orders</span>
          </div>
        </div>
      </div>
    </section>
  );
};

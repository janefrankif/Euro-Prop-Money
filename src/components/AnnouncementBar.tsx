import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Zap, Headphones, Coins, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  { text: 'Minimum Order: €20', icon: Tag, highlight: 'Low Threshold' },
  { text: 'Free Shipping over €100', icon: Truck, highlight: 'Priority Dispatch' },
  { text: '15% Discount with Crypto Payments', icon: Coins, highlight: 'Instant BTC/USDT' },
  { text: 'Support Phone & Email Available 24/7', icon: Headphones, highlight: 'Live On-Set Desk' },
  { text: '24-Hour Express Shipping Option', icon: Zap, highlight: 'Call Sheet Rush' },
  { text: '100% Trust & Legal Compliance Guaranteed', icon: ShieldCheck, highlight: 'ECB 2013/10 Safe Harbor' },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1));
  };

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const current = ANNOUNCEMENTS[currentIndex];
  const IconComponent = current.icon;

  return (
    <aside
      aria-label="Promotional announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-50 w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800/90 text-zinc-300 text-[11px] sm:text-xs font-medium py-1.5 px-3 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Arrow (Desktop) */}
        <button
          onClick={prevAnnouncement}
          aria-label="Previous announcement"
          className="hidden sm:flex p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Center Active Item with Transition */}
        <div className="flex-1 flex items-center justify-center gap-2.5 overflow-hidden">
          <div className="flex items-center gap-2 transition-all duration-300 ease-out transform">
            <span className="p-1 rounded bg-amber-400/10 text-amber-400">
              <IconComponent className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-white tracking-wide">
              {current.text}
            </span>
            <span className="hidden md:inline-block text-zinc-600">·</span>
            <span className="hidden md:inline-block text-zinc-400 font-mono text-[10px] uppercase">
              {current.highlight}
            </span>
          </div>
        </div>

        {/* Right Arrow & Indicators */}
        <div className="flex items-center gap-2">
          {/* Dot Indicators */}
          <div className="hidden sm:flex items-center gap-1">
            {ANNOUNCEMENTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to announcement ${idx + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'bg-amber-400 w-3' : 'bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextAnnouncement}
            aria-label="Next announcement"
            className="p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

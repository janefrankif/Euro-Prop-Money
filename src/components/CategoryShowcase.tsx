'use client';

import React from 'react';
import { Layers, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '../router';

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'single',
      title: 'Single Denominations',
      subtitle: '€5, €10, €20, €50, €100, €200, €500',
      description: 'Individual 100-note banded stacks wrapped in authentic kraft currency straps with legal prop notation. Perfect for single note replacements, targeted money counts, or custom stack builds.',
      icon: Layers,
      highlight: 'From €19.00',
      actionCategory: 'single',
      image: 'https://lh3.googleusercontent.com/d/1JADWgDXDuLhf3BcX0rx3TTo7YEq4OOqT=s0',
    },
    {
      id: 'bundles',
      title: 'Stacks & Bundles',
      subtitle: 'Production Bundles, Bags & Cases',
      description: 'Single-denomination bundles (€100k stacks), mixed Director’s packs, and pre-filled tactical duffels or flight cases up to €1,000,000 face value. Built for high-volume scene setups.',
      icon: Briefcase,
      highlight: 'Turnkey Heist Sets',
      actionCategory: 'bundles',
      image: 'https://lh3.googleusercontent.com/d/1p-5VyjZP2bC7DYQoUwtsPjvutWCI3NrE=s0',
    },
    {
      id: 'special',
      title: 'Special Finishes',
      subtitle: 'Camera-Grade, 1-Sided & Aged Props',
      description: 'Dual-sided prints for macro close-ups, cost-effective 1-sided blank-filler stacks for background table fills, and distressed weathered notes for action crime scenes.',
      icon: Sparkles,
      highlight: 'Close-Up Calibrated',
      actionCategory: 'special',
      image: 'https://lh3.googleusercontent.com/d/1X_YWDfnh0PzXeJqlYVdpgl9vC0JiftNN=s0',
    },
  ];

  return (
    <section className="w-full py-16 border-b border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold mb-2">
            <span>Production Catalog Tracks</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Art Department Ready</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Euro Prop Money Categories
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Organized strictly around Euro notes across three specialized production tracks engineered for camera visibility and legal safe harbor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const categoryUrl = `/shop?category=${cat.actionCategory}`;
            return (
              <Link
                key={cat.id}
                to={categoryUrl}
                onClick={() => onSelectCategory(cat.actionCategory)}
                className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-amber-400 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-xl block"
              >
                <div>
                  {/* Category Image Header */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950">
                    <img 
                      src={cat.image} 
                      alt={cat.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[11px] font-mono font-bold text-amber-300 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/30 shadow-md">
                        {cat.highlight}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                        ECB Safe Harbor
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">
                      {cat.title}
                    </h3>
                    <div className="text-xs font-mono text-slate-500 mb-3">
                      {cat.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 mt-auto flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                  <span className="flex items-center gap-1.5 text-amber-700 group-hover:text-amber-800">
                    <Icon className="w-4 h-4" />
                    <span>Browse {cat.title}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

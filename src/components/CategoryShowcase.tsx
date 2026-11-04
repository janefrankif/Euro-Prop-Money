import React from 'react';
import { Layers, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

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
    },
    {
      id: 'bundles',
      title: 'Stacks & Bundles',
      subtitle: 'Production Bundles, Bags & Cases',
      description: 'Single-denomination bundles (€100k stacks), mixed Director’s packs, and pre-filled tactical duffels or flight cases up to €1,000,000 face value. Built for high-volume scene setups.',
      icon: Briefcase,
      highlight: 'Turnkey Heist Sets',
      actionCategory: 'bundles',
    },
    {
      id: 'special',
      title: 'Special Finishes',
      subtitle: 'Camera-Grade, 1-Sided & Aged Props',
      description: 'Dual-sided prints for macro close-ups, cost-effective 1-sided blank-filler stacks for background table fills, and distressed weathered notes for action crime scenes.',
      icon: Sparkles,
      highlight: 'Close-Up Calibrated',
      actionCategory: 'special',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.actionCategory)}
                className="group relative rounded-2xl bg-white border border-slate-200 p-7 flex flex-col justify-between hover:border-amber-400 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-amber-50 text-slate-600 group-hover:text-amber-600 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      {cat.highlight}
                    </span>
                  </div>

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

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                  <span>Browse {cat.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

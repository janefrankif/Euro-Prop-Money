import React from 'react';
import { Layers, Briefcase, Sparkles, Flame, ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'stack',
      title: 'Single Denominations',
      subtitle: '€20, €50, €100, €200 & €500 Stacks',
      description: 'Individual 100-bill banded stacks wrapped in authentic kraft currency straps with legal prop notation.',
      icon: Layers,
      highlight: 'From €26.00',
      actionCategory: 'stack',
    },
    {
      id: 'bundle',
      title: 'Mixed Stacks & Sets',
      subtitle: 'Multi-Denomination Combos',
      description: 'Curated samplers providing a full variety of denominations for art department versatility on indie shoots.',
      icon: Sparkles,
      highlight: 'Best Value for Shorts',
      actionCategory: 'bundle',
    },
    {
      id: 'aged',
      title: 'Aged / Weathered Props',
      subtitle: 'Crime Drama & Action Patina',
      description: 'Pre-weathered, tumbled, and distressed notes for gritty crime scenes, drug cartels, and action stunts.',
      icon: Flame,
      highlight: 'Camera Patina',
      actionCategory: 'all',
    },
    {
      id: 'bag-case',
      title: 'Studio Bundles & Cases',
      subtitle: 'Turnkey Heist Duffels & Flight Cases',
      description: 'Heavy tactical canvas bags and laser-cut aluminum Pelican flight cases holding up to €1,000,000 visual face value.',
      icon: Briefcase,
      highlight: 'Hero Set Pieces',
      actionCategory: 'bag-case',
    },
  ];

  return (
    <section className="w-full py-16 border-b border-zinc-800 bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <span>Production Classifications</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Art Department Ready</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore Prop Currency Categories
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Engineered specifically for camera visibility, fast continuity resets, and European Central Bank legal compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.actionCategory)}
                className="group relative rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-md hover:shadow-amber-400/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 group-hover:bg-amber-400/10 text-zinc-400 group-hover:text-amber-400 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-amber-300 transition-colors">
                      {cat.highlight}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mb-2.5">
                    {cat.subtitle}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

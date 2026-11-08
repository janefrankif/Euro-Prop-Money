'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from '../router';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-white">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold mb-2">
        Error 404 · Soundstage Requisition Notice
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        Page or Product Not Found
      </h1>

      <p className="text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
        The requested prop configuration, product slug, or production page could not be located in our European studio inventory.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/shop"
          className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse All Prop Stacks</span>
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

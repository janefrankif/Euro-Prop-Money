'use client';

import React, { useSyncExternalStore } from 'react';
import App from '../App';

function subscribe() {
  return () => {};
}

export default function AppWrapper() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
            Loading CINE EURO Prop Vault...
          </span>
        </div>
      </div>
    );
  }

  return <App />;
}

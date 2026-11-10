'use client';

import React from 'react';
import App from '../App';

export default function AppWrapper({ initialPath = '/' }: { initialPath?: string }) {
  return <App initialPath={initialPath} />;
}

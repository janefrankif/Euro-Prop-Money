import React from 'react';

interface SiteLogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'compact';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const SiteIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 36, 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="logoSlate" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Rounded Outer Badge */}
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#logoSlate)" stroke="url(#logoGold)" strokeWidth="2.5" />

      {/* Film Spool / Reel Perforations at 4 Corners */}
      <rect x="7" y="7" width="4" height="6" rx="1" fill="#F59E0B" opacity="0.85" />
      <rect x="53" y="7" width="4" height="6" rx="1" fill="#F59E0B" opacity="0.85" />
      <rect x="7" y="51" width="4" height="6" rx="1" fill="#F59E0B" opacity="0.85" />
      <rect x="53" y="51" width="4" height="6" rx="1" fill="#F59E0B" opacity="0.85" />

      {/* Cinema Frame Registration Crosshairs */}
      <line x1="32" y1="5" x2="32" y2="10" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="32" y1="54" x2="32" y2="59" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* Euro Currency Curve */}
      <path 
        d="M 44 22 C 39 16 25 17 22 25 C 20 30 20 34 22 39 C 25 47 39 48 44 42" 
        stroke="url(#logoGold)" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
      />

      {/* Dual Euro Crossbars with Film Edge Styling */}
      <line x1="14" y1="29" x2="38" y2="29" stroke="url(#logoGold)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="14" y1="35" x2="38" y2="35" stroke="url(#logoGold)" strokeWidth="3.5" strokeLinecap="round" />

      {/* European Cinema Gold Star */}
      <polygon 
        points="46,14 47.3,17.2 50.8,17.5 48.2,19.8 48.9,23.2 46,21.4 43.1,23.2 43.8,19.8 41.2,17.5 44.7,17.2" 
        fill="#FDE047" 
      />
    </svg>
  );
};

export const SiteLogo: React.FC<SiteLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 30,
    md: 38,
    lg: 46,
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  if (variant === 'icon-only') {
    return <SiteIcon size={iconSizes[size]} className={className} />;
  }

  const isLight = theme === 'light';

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <SiteIcon size={iconSizes[size]} />
      
      <div className="flex flex-col leading-none">
        <div className={`font-extrabold tracking-tight uppercase flex items-center gap-1.5 ${titleSizes[size]} ${
          isLight ? 'text-slate-900 group-hover:text-amber-600' : 'text-white group-hover:text-amber-400'
        } transition-colors`}>
          <span>Euro Prop</span>
          <span className="text-amber-600 font-black">Money</span>
        </div>

        {variant === 'full' && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] font-mono uppercase tracking-wider text-amber-700 font-semibold">
              Studio Cinema Props
            </span>
            <span className="text-slate-300 text-[8px]" aria-hidden="true">·</span>
            <span className="text-[9px] font-mono text-slate-500 uppercase">
              ECB 2013/10
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

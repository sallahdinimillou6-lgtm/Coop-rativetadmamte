import React from 'react';

interface TadmamteLogoProps {
  className?: string;
  showArabic?: boolean;
  variant?: 'dark' | 'light'; // 'dark' for dark backgrounds (footer), 'light' for light backgrounds (navbar)
}

export function TadmamteLogo({ className = "", showArabic = true, variant = 'light' }: TadmamteLogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Brand Icon Emblem - Golden Argan Flower & Yaz Motif */}
      <div className="relative shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#173022] border border-brand-gold/40 shadow-sm group-hover:scale-105 transition-transform duration-300">
        <svg
          viewBox="0 0 100 100"
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Petal / Drop */}
          <path
            d="M50 15 C 60 28, 62 42, 50 50 C 38 42, 40 28, 50 15 Z"
            fill="#E5C158"
          />
          {/* Right Petal */}
          <path
            d="M50 50 C 65 42, 78 50, 82 65 C 72 75, 58 68, 50 50 Z"
            fill="#D4AF37"
          />
          {/* Left Petal */}
          <path
            d="M50 50 C 35 42, 22 50, 18 65 C 28 75, 42 68, 50 50 Z"
            fill="#E5C158"
          />
          {/* Central Stem Arc */}
          <path
            d="M 50 50 C 52 68, 48 80, 42 88"
            stroke="#F3E5AB"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Amazigh Yaz Symbol Accent ⵣ in Center */}
          <text
            x="50"
            y="94"
            fill="#E5C158"
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            ⵣ
          </text>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-serif font-medium text-[11px] sm:text-xs text-brand-gold tracking-wide uppercase">
            Coopérative
          </span>
        </div>
        <span className={`font-reem text-base sm:text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-brand-brown'}`}>
          Tadmamte
        </span>
        {showArabic && (
          <span className={`text-[10px] sm:text-[11px] font-bold font-reem ${isDark ? 'text-gray-300' : 'text-brand-earth/80'}`}>
            تعاونية تدمامت
          </span>
        )}
      </div>
    </div>
  );
}


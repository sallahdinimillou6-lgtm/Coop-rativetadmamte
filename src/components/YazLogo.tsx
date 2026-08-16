import React from 'react';

export function YazLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center vertical bar */}
      <line 
        x1="50" 
        y1="15" 
        x2="50" 
        y2="85" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round" 
      />
      {/* Left branch */}
      <path 
        d="M25,20 C38,30 45,40 45,50 C45,60 38,70 25,80" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Right branch */}
      <path 
        d="M75,20 C62,30 55,40 55,50 C55,60 62,70 75,80" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
  );
}

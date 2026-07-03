import React, { useEffect, useState } from 'react';

interface HealthScoreProps {
  score?: number;
  label?: string;
  trend?: string;
  isUp?: boolean;
}

export const HealthScore: React.FC<HealthScoreProps> = ({
  score = 93,
  label = 'Excellent',
  trend = '+2.4% vs last week',
  isUp = true,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // 251.327
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Animate the circle fill-in
    const targetOffset = circumference * (1 - score / 100);
    const timer = setTimeout(() => {
      setOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <div className="bg-surface-container-lowest border-2 border-primary-fixed-dim neon-border-glow p-8 rounded-none flex items-center gap-8 min-w-[320px]">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-surface-container-high"
            cx="48"
            cy="48"
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
          />
          <circle
            className="text-primary-fixed-dim transition-all duration-[1500ms] ease-out"
            cx="48"
            cy="48"
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeDasharray={circumference.toFixed(1)}
            strokeDashoffset={offset.toFixed(1)}
            strokeWidth="8"
            style={{ filter: 'drop-shadow(0 0 5px #00f2ff)' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-headline-md text-headline-md font-bold text-primary-fixed-dim">{score}</span>
        </div>
      </div>
      <div>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">
          Health Score
        </p>
        <h3 className="font-headline-md text-headline-md font-bold text-primary">{label}</h3>
        <div className="flex items-center gap-1 text-primary-fixed-dim mt-1">
          <span className="material-symbols-outlined text-sm">{isUp ? 'trending_up' : 'trending_down'}</span>
          <span className="font-label-sm text-label-sm font-bold">{trend}</span>
        </div>
      </div>
    </div>
  );
};

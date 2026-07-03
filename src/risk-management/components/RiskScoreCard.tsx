import React from 'react';

interface RiskScoreCardProps {
  score?: number;
  badgeText?: string;
  icon?: string;
}

export const RiskScoreCard: React.FC<RiskScoreCardProps> = ({
  score = 12,
  badgeText = 'LOW RISK',
  icon = 'shield_with_heart',
}) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg flex items-center justify-between relative overflow-hidden neon-border">
      <div className="relative z-10">
        <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1">
          Business Risk Score
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-display-lg text-display-lg text-primary glow-cyan">{score}</span>
          <span className="font-label-md text-label-md text-on-primary-container font-bold bg-primary px-2 py-0.5 rounded-full text-[10px] text-on-primary">
            {badgeText}
          </span>
        </div>
      </div>
      <div className="w-24 h-24 flex items-center justify-center">
        <span className="material-symbols-outlined text-[64px] text-primary/20">{icon}</span>
      </div>
    </div>
  );
};

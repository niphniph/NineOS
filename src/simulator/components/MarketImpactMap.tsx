import React from 'react';

interface MarketImpactMapProps {
  title?: string;
  vectorTitle?: string;
  vectorValue?: string;
}

export const MarketImpactMap: React.FC<MarketImpactMapProps> = ({
  title = 'Global Market Impact',
  vectorTitle = 'Top Expansion Vector',
  vectorValue = 'EMEA North (+12%)',
}) => {
  return (
    <div className="bg-surface-container-lowest neon-border rounded-xl luxury-shadow p-gutter">
      <h4 className="font-label-caps text-primary mb-stack-lg text-[12px] font-bold tracking-wider uppercase">
        {title}
      </h4>
      <div className="w-full aspect-square bg-surface-container-low border border-primary/10 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Grid Pattern */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, #00f2ff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>
        {/* Simulated Heatmap Dots */}
        <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-primary rounded-full chart-pulse shadow-[0_0_15px_rgba(0,242,255,0.8)]" />
        <div className="absolute top-[50%] left-[60%] w-4 h-4 bg-primary rounded-full chart-pulse shadow-[0_0_18px_rgba(0,242,255,0.8)]" />
        <div className="absolute top-[70%] left-[20%] w-2 h-2 bg-primary rounded-full chart-pulse shadow-[0_0_12px_rgba(0,242,255,0.8)]" />
        <div className="absolute bottom-4 left-4 p-3 glass-panel border border-primary/20 rounded-lg shadow-lg">
          <p className="font-label-sm font-bold text-primary text-[12px]">{vectorTitle}</p>
          <p className="font-label-sm text-on-surface text-[12px]">{vectorValue}</p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export interface RippleEffect {
  title: string;
  desc: string;
  type: 'primary' | 'secondary';
}

interface SimulationSummaryProps {
  scenarioNumber?: string | number;
  confidenceScore?: number;
  summaryQuote?: string;
  projectedRoi?: string;
  projectedRoiTrend?: string;
  opexImpact?: string;
  opexImpactTrend?: string;
  marketShare?: string;
  marketShareTrend?: string;
  rippleEffects?: RippleEffect[];
  onRippleClick?: (title: string) => void;
}

export const SimulationSummary: React.FC<SimulationSummaryProps> = ({
  scenarioNumber = 294,
  confidenceScore = 94.2,
  summaryQuote = 'The proposed 15% budget reduction in performance marketing will likely lead to a 4.2% dip in immediate lead velocity, but enterprise retention remains stable due to existing brand equity.',
  projectedRoi = '+18.5%',
  projectedRoiTrend = '+2.4 pts YoY',
  opexImpact = '-$1.2M',
  opexImpactTrend = 'High sensitivity',
  marketShare = '12.4%',
  marketShareTrend = 'Nominal change',
  rippleEffects = [
    {
      title: 'Talent Acquisition Efficiency',
      desc: 'Hiring velocity increases by 12% as simulator predicts higher application rates from top-tier talent seeking stability.',
      type: 'primary',
    },
    {
      title: 'Operational Redundancy',
      desc: 'Scenario identifies 3 points of failure in the supply chain under accelerated growth conditions.',
      type: 'secondary',
    },
  ],
  onRippleClick,
}) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // 125.66
  const offset = circumference * (1 - confidenceScore / 100);

  return (
    <div className="bg-surface-container-lowest neon-border rounded-xl luxury-shadow overflow-hidden">
      <div className="px-gutter py-stack-md border-b border-primary/10 bg-primary/5 flex justify-between items-center">
        <h3 className="font-headline-md text-primary text-[20px] font-bold">
          Executive Summary: Scenario #{scenarioNumber}
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-label-caps text-outline text-[10px] tracking-wider uppercase font-bold">
              Confidence Score
            </span>
            <span className="font-mono-data text-primary font-bold">{confidenceScore}%</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 flex items-center justify-center relative shrink-0">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                className="text-primary"
                cx="24"
                cy="24"
                fill="transparent"
                r={radius}
                stroke="currentColor"
                strokeDasharray={circumference.toFixed(1)}
                strokeDashoffset={offset.toFixed(1)}
                strokeWidth="4"
              />
            </svg>
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
        </div>
      </div>
      <div className="p-gutter space-y-stack-lg">
        <div className="border-l-4 border-primary pl-6 py-2 bg-primary/5">
          <p className="font-body-lg italic text-on-surface">"{summaryQuote}"</p>
        </div>

        <div className="grid grid-cols-3 gap-stack-lg">
          <div className="p-4 bg-surface-container-low border border-primary/10 rounded-lg">
            <span className="font-label-caps text-outline uppercase block mb-1 text-[10px] tracking-wider font-bold">
              Projected ROI
            </span>
            <span className="font-display-lg text-[28px] text-primary font-bold">{projectedRoi}</span>
            <div className="flex items-center gap-1 text-primary mt-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="font-label-sm text-[12px] font-semibold">{projectedRoiTrend}</span>
            </div>
          </div>
          <div className="p-4 bg-surface-container-low border border-primary/10 rounded-lg">
            <span className="font-label-caps text-outline uppercase block mb-1 text-[10px] tracking-wider font-bold">
              Opex Impact
            </span>
            <span className="font-display-lg text-[28px] text-error font-bold">{opexImpact}</span>
            <div className="flex items-center gap-1 text-error mt-1">
              <span className="material-symbols-outlined text-[16px]">trending_down</span>
              <span className="font-label-sm text-[12px] font-semibold">{opexImpactTrend}</span>
            </div>
          </div>
          <div className="p-4 bg-surface-container-low border border-primary/10 rounded-lg">
            <span className="font-label-caps text-outline uppercase block mb-1 text-[10px] tracking-wider font-bold">
              Market Share
            </span>
            <span className="font-display-lg text-[28px] text-on-surface font-bold">
              {marketShare}
            </span>
            <div className="flex items-center gap-1 text-secondary mt-1">
              <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
              <span className="font-label-sm text-[12px] font-semibold">{marketShareTrend}</span>
            </div>
          </div>
        </div>

        <div className="space-y-stack-md">
          <h4 className="font-label-caps text-primary border-b border-primary/10 pb-2 text-[12px] font-bold tracking-wider uppercase">
            Secondary Ripple Effects
          </h4>
          <ul className="space-y-stack-sm m-0 p-0 list-none">
            {rippleEffects.map((effect, idx) => {
              const dotClass =
                effect.type === 'primary' ? 'bg-primary' : 'bg-secondary';
              const shadowClass =
                effect.type === 'primary'
                  ? 'shadow-[0_0_8px_rgba(0,242,255,0.8)]'
                  : '';

              return (
                <li
                  key={idx}
                  onClick={() => onRippleClick?.(effect.title)}
                  className="flex gap-4 p-4 hover:bg-primary/5 transition-all duration-200 rounded-lg group border border-transparent hover:border-primary/20 cursor-pointer"
                >
                  <span
                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${dotClass} ${shadowClass}`}
                  />
                  <div>
                    <p className="font-body-md text-on-surface font-semibold m-0">
                      {effect.title}
                    </p>
                    <p className="font-label-md text-secondary m-0 mt-0.5 text-xs text-on-surface-variant">
                      {effect.desc}
                    </p>
                  </div>
                  <span className="ml-auto material-symbols-outlined text-outline group-hover:text-primary transition-colors self-center">
                    arrow_forward_ios
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

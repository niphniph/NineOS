import React from 'react';

export interface DepartmentMetric {
  id: string;
  name: string;
  score: number;
  trend: string;
  description: string;
  biggestRisk: string;
  icon: string;
}

interface DepartmentCardProps {
  metric: DepartmentMetric;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ metric }) => {
  const isWarning = metric.score < 80;
  const scoreColorClass = isWarning ? 'text-error' : 'text-primary-fixed-dim';
  const trendColorClass = isWarning ? 'text-error' : metric.trend.includes('STABLE') ? 'text-on-surface-variant' : 'text-primary-fixed';

  return (
    <div className="card-shadow rounded-none p-stack-lg hover-lift group border-2">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-surface-container-high border border-outline-variant rounded-none group-hover:bg-primary-container group-hover:text-on-primary transition-colors duration-200">
          <span className="material-symbols-outlined">{metric.icon}</span>
        </div>
        <div className="text-right">
          <span className={`font-display-lg text-3xl font-bold ${scoreColorClass} neon-glow`}>
            {metric.score}
          </span>
          <p className={`text-[10px] font-bold tracking-widest ${trendColorClass}`}>
            {metric.trend}
          </p>
        </div>
      </div>
      <h5 className="font-label-md text-label-md font-bold mb-1 uppercase text-primary">
        {metric.name}
      </h5>
      <p className="text-xs text-on-surface-variant mb-6">{metric.description}</p>
      <div className="pt-4 border-t border-outline-variant">
        <p className="text-[10px] text-primary-fixed-dim uppercase font-bold mb-1 tracking-tighter">
          Biggest Risk
        </p>
        <p className="text-xs text-on-surface">{metric.biggestRisk}</p>
      </div>
    </div>
  );
};

import React from 'react';

export interface InsightMetadata {
  icon: string;
  label: string;
}

export interface AIInsight {
  id: string;
  category: string;
  time: string;
  title: string;
  description: string;
  severity: 'primary' | 'secondary';
  metadata: InsightMetadata[];
}

interface InsightCardProps {
  insight: AIInsight;
  onClick?: (id: string) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onClick }) => {
  const isPrimary = insight.severity === 'primary';
  const borderClass = isPrimary ? 'border-l-primary' : 'border-l-secondary-fixed';
  const tagClass = isPrimary
    ? 'text-primary bg-primary/10'
    : 'text-secondary-fixed bg-secondary-fixed/10';

  return (
    <div
      onClick={() => onClick?.(insight.id)}
      className={`bg-surface-container-lowest/80 border border-outline-variant/30 border-l-4 ${borderClass} p-stack-md rounded-lg shadow-lg hover:shadow-primary/5 transition-all duration-300 group cursor-pointer hover:-translate-y-0.5`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider ${tagClass}`}>
          {insight.category}
        </span>
        <span className="text-label-sm text-on-surface-variant/60">{insight.time}</span>
      </div>
      <h4 className="text-lg font-bold mb-2 text-on-surface group-hover:text-primary transition-colors duration-200">
        {insight.title}
      </h4>
      <p className="text-body-md text-on-surface-variant line-clamp-2">
        {insight.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-primary/60">
        {insight.metadata.map((meta, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">{meta.icon}</span>
            <span className="text-label-sm">{meta.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

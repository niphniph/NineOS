import React from 'react';

export interface RiskItem {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

interface TodayRisksProps {
  risks?: RiskItem[];
}

export const TodayRisks: React.FC<TodayRisksProps> = ({
  risks = [
    {
      id: '1',
      severity: 'high',
      title: 'Cloud Compliance Gap',
      description: 'Region: US-East. Priority: High.',
    },
    {
      id: '2',
      severity: 'medium',
      title: 'Hiring Freeze Impact',
      description: 'Engineering velocity may dip -15%.',
    },
    {
      id: '3',
      severity: 'low',
      title: 'Contract Renewal',
      description: 'Vendor: AWS. 45 days remaining.',
    },
  ],
}) => {
  const getSeverityStyles = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return {
          borderClass: 'border-2 border-error/50',
          textClass: 'text-error',
          icon: 'priority_high',
        };
      case 'medium':
        return {
          borderClass: 'border-2 border-secondary/50',
          textClass: 'text-secondary',
          icon: 'warning',
        };
      case 'low':
        return {
          borderClass: 'border border-outline-variant',
          textClass: 'text-on-surface',
          icon: 'info',
        };
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-none p-stack-lg">
      <div className="flex items-center justify-between mb-stack-lg">
        <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest text-primary-fixed-dim">
          Today's Risks
        </h4>
        <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded-none uppercase">
          {risks.length} Action Items
        </span>
      </div>
      <div className="space-y-4">
        {risks.map((risk) => {
          const styles = getSeverityStyles(risk.severity);
          return (
            <div
              key={risk.id}
              className={`p-3 bg-surface-container-low rounded-none flex items-start gap-3 ${styles.borderClass}`}
            >
              <span className={`material-symbols-outlined text-xl ${styles.textClass}`}>
                {styles.icon}
              </span>
              <div>
                <p className={`font-label-md text-label-md font-bold uppercase ${styles.textClass}`}>
                  {risk.title}
                </p>
                <p className="text-xs text-on-surface-variant">{risk.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

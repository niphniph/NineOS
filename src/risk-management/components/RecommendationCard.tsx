import React from 'react';

export interface IntelligenceRecommendation {
  id: string;
  riskType: string;
  title: string;
  confidence: string | number;
  reasoning: string;
  expectedImpact: string;
  severity: 'primary' | 'error' | 'secondary';
}

interface RecommendationCardProps {
  rec: IntelligenceRecommendation;
  onApprove?: (id: string) => void;
  onIgnore?: (id: string) => void;
  onLearnMore?: (id: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  rec,
  onApprove,
  onIgnore,
  onLearnMore,
}) => {
  const getSeverityStyles = (severity: 'primary' | 'error' | 'secondary') => {
    switch (severity) {
      case 'primary':
        return {
          borderClass: 'border-l-primary',
          textClass: 'text-primary',
          glowClass: 'glow-cyan',
          approveBtnClass: 'bg-primary text-on-primary',
        };
      case 'error':
        return {
          borderClass: 'border-l-error',
          textClass: 'text-error',
          glowClass: '',
          approveBtnClass: 'bg-error text-on-error',
        };
      case 'secondary':
        return {
          borderClass: 'border-l-secondary',
          textClass: 'text-secondary',
          glowClass: '',
          approveBtnClass: 'bg-primary text-on-primary', // Fallback to primary color button
        };
    }
  };

  const styles = getSeverityStyles(rec.severity);

  return (
    <div
      className={`bg-surface-container-lowest border border-outline-variant border-l-4 ${styles.borderClass} rounded-xl overflow-hidden flex flex-col neon-border-hover transition-all duration-200`}
    >
      <div className="p-stack-lg">
        <div className="flex justify-between items-start mb-stack-md">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase mb-1 block font-bold tracking-wider">
              {rec.riskType}
            </span>
            <h5 className="font-headline-md text-headline-md text-on-surface font-bold">
              {rec.title}
            </h5>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase text-[10px]">
              Confidence
            </span>
            <span className={`font-headline-md text-headline-md font-bold ${styles.textClass} ${styles.glowClass}`}>
              {typeof rec.confidence === 'number' ? `${rec.confidence}%` : rec.confidence}
            </span>
          </div>
        </div>
        <div className="space-y-stack-md">
          <div>
            <p className={`font-label-sm text-label-sm font-bold ${styles.textClass} mb-1 uppercase tracking-tight`}>
              Reasoning
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {rec.reasoning}
            </p>
          </div>
          <div>
            <p className={`font-label-sm text-label-sm font-bold ${styles.textClass} mb-1 uppercase tracking-tight`}>
              Expected Impact
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {rec.expectedImpact}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto bg-surface-container-low border-t border-outline-variant p-stack-md flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => onApprove?.(rec.id)}
            className={`${styles.approveBtnClass} px-4 py-2 rounded-lg font-label-md text-label-md font-bold hover:opacity-90 cursor-pointer transition-all active:scale-95`}
          >
            Approve
          </button>
          <button
            onClick={() => onIgnore?.(rec.id)}
            className="bg-transparent border border-outline-variant text-on-surface-variant px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container-high cursor-pointer transition-all active:scale-95"
          >
            Ignore
          </button>
        </div>
        <button
          onClick={() => onLearnMore?.(rec.id)}
          className={`${styles.textClass} font-label-md text-label-md flex items-center gap-1 hover:underline font-bold cursor-pointer`}
        >
          Learn More <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

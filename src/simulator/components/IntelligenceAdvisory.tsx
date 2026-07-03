import React from 'react';

interface IntelligenceAdvisoryProps {
  advisoryText?: React.ReactNode;
  onApplyRecommendation?: () => void;
  onViewAnalysis?: () => void;
}

export const IntelligenceAdvisory: React.FC<IntelligenceAdvisoryProps> = ({
  advisoryText = (
    <>
      Based on current simulations, NineOS suggests pivoting your Q4 strategy toward{' '}
      <strong>Product-Led Growth</strong>. This mitigates the risk of marketing spend reduction
      by leveraging existing user engagement as a growth vector.
    </>
  ),
  onApplyRecommendation,
  onViewAnalysis,
}) => {
  return (
    <div className="bg-surface-container-lowest border border-primary/30 border-l-[6px] border-l-primary luxury-shadow p-gutter rounded-r-xl">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
        </div>
        <div>
          <h5 className="font-label-md font-bold text-primary mb-1 text-[14px]">
            Intelligence Advisory
          </h5>
          <p className="font-body-md text-secondary text-[14px] text-on-surface-variant leading-relaxed">
            {advisoryText}
          </p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={onApplyRecommendation}
              className="font-label-sm text-primary font-bold hover:underline decoration-primary/40 underline-offset-4 cursor-pointer bg-transparent border-none p-0"
            >
              Apply Recommendation
            </button>
            <button
              onClick={onViewAnalysis}
              className="font-label-sm text-secondary hover:text-on-surface transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              View Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

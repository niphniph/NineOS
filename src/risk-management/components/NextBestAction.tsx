import React from 'react';

interface NextBestActionProps {
  title?: string;
  description?: string;
  onApplyStrategy?: () => void;
  onReviewModel?: () => void;
}

export const NextBestAction: React.FC<NextBestActionProps> = ({
  title = 'Hedge Exposure on North American Logistics',
  description = 'NineOS Intelligence identifies a 14% delta in shipping overhead due to regional port congestion. Reallocating the 2024 Buffer to Freight Hedging will neutralize projected Q3 volatility.',
  onApplyStrategy,
  onReviewModel,
}) => {
  return (
    <section className="mb-stack-xl">
      <div className="bg-primary-container/40 border border-primary/30 text-on-surface rounded-xl p-stack-lg flex flex-col md:flex-row items-center gap-stack-lg relative overflow-hidden">
        <div className="flex-1 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">bolt</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Next Best Action
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md mb-2 text-on-surface font-bold">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            {description}
          </p>
        </div>
        <div className="flex gap-stack-sm z-10">
          <button
            onClick={onApplyStrategy}
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-colors shadow-[0_0_20px_rgba(0,242,255,0.2)] cursor-pointer"
          >
            Apply Strategy
          </button>
          <button
            onClick={onReviewModel}
            className="bg-transparent border border-outline-variant text-on-surface px-6 py-3 rounded-lg font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Review Model
          </button>
        </div>
      </div>
    </section>
  );
};

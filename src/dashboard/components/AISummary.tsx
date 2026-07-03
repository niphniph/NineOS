import React from 'react';

interface SummaryItem {
  id: string;
  type: 'success' | 'danger' | 'info';
  content: React.ReactNode;
}

interface AISummaryProps {
  items?: SummaryItem[];
  refreshedText?: string;
}

export const AISummary: React.FC<AISummaryProps> = ({
  items = [
    {
      id: '1',
      type: 'success',
      content: (
        <>
          <strong>Revenue performance</strong> exceeded targets by 14% this quarter, primarily driven by the expansion of the Enterprise tier in EMEA markets.
        </>
      ),
    },
    {
      id: '2',
      type: 'danger',
      content: (
        <>
          <strong>Marketing ROI</strong> is down 8% year-to-date. Attribution models suggest oversaturation in social channels; simulator recommends pivoting to direct executive outreach.
        </>
      ),
    },
    {
      id: '3',
      type: 'info',
      content: (
        <>
          <strong>Talent retention</strong> shows a slight risk in Engineering. Engagement scores are high, but market compensation is shifting; intervention recommended for L5+ roles.
        </>
      ),
    },
  ],
  refreshedText = 'Refreshed 4m ago',
}) => {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-none overflow-hidden accent-border">
      <div className="p-stack-md bg-surface-container-low border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed-dim">auto_awesome</span>
          <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest text-primary-fixed-dim">
            Executive Summary
          </h4>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant italic">{refreshedText}</span>
      </div>
      <div className="p-stack-lg space-y-6 bg-surface-container-lowest">
        {items.map((item) => {
          let dotColorClass = '';
          let dotGlowClass = '';

          switch (item.type) {
            case 'success':
              dotColorClass = 'bg-primary-fixed-dim';
              dotGlowClass = 'shadow-[0_0_8px_#00f2ff]';
              break;
            case 'danger':
              dotColorClass = 'bg-error';
              dotGlowClass = 'shadow-[0_0_8px_#ffb4ab]';
              break;
            case 'info':
              dotColorClass = 'bg-secondary-fixed';
              dotGlowClass = '';
              break;
          }

          return (
            <div key={item.id} className="flex gap-4">
              <div className={`w-2 h-2 ${dotColorClass} mt-2.5 shrink-0 ${dotGlowClass}`} />
              <p className="font-body-md text-body-md text-on-surface">{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

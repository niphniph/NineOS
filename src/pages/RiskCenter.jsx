import React from 'react';

export const RiskCenter = ({ 
  riskScore, 
  recommendations, 
  appliedStrategies, 
  applyStrategy, 
  approveRecommendation, 
  ignoreRecommendation,
  searchQuery 
}) => {
  // Check if logistics strategy is already applied
  const isLogisticsApplied = appliedStrategies.includes('logistics_hedge');

  // Filter recommendations based on search
  const filteredRecs = recommendations.filter(rec =>
    rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.reasoning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto p-margin-desktop space-y-stack-xl">
      {/* Hero Section: Risk Score */}
      <section className="grid grid-cols-12 gap-stack-lg items-center">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">Risk Center</h2>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
            Real-time analysis of enterprise volatility metrics. Intelligence indicates a stabilized operational environment with focused tactical risks.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-lowest luxury-shadow border border-outline-variant rounded-xl p-stack-lg flex items-center justify-between relative overflow-hidden transition-all hover:shadow-md">
            <div className="relative z-10">
              <p className="font-label-sm text-label-sm text-on-secondary-container uppercase tracking-widest mb-1">Business Risk Score</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-primary transition-all duration-500">{riskScore}</span>
                <span className={`font-label-md text-label-md font-semibold px-2 py-0.5 rounded-full ${
                  riskScore < 10 ? 'bg-tertiary-fixed text-on-tertiary-container' : 
                  riskScore <= 15 ? 'bg-secondary-container text-on-secondary-container' : 
                  'bg-error-container text-on-error-container'
                }`}>
                  {riskScore < 10 ? 'Very Low' : riskScore <= 15 ? 'Low' : 'Elevated'}
                </span>
              </div>
            </div>
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-surface-container-high">
              <span className="material-symbols-outlined text-3xl text-secondary">security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Categories Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl luxury-shadow flex flex-col gap-2 transition-all hover:shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
            <span className="font-label-md text-label-md">Financial</span>
          </div>
          <div className="mt-auto flex justify-between items-end pt-4">
            <span className="font-headline-md text-headline-md">08</span>
            <span className="text-on-tertiary-container text-[12px] flex items-center gap-1 font-label-sm">
              <span className="material-symbols-outlined text-[14px]">trending_down</span> -2%
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl luxury-shadow flex flex-col gap-2 transition-all hover:shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            <span className="font-label-md text-label-md">Operational</span>
          </div>
          <div className="mt-auto flex justify-between items-end pt-4">
            <span className="font-headline-md text-headline-md">
              {isLogisticsApplied ? '10' : '14'}
            </span>
            <span className={`${isLogisticsApplied ? 'text-on-tertiary-container' : 'text-error'} text-[12px] flex items-center gap-1 font-label-sm`}>
              <span className="material-symbols-outlined text-[14px]">
                {isLogisticsApplied ? 'trending_down' : 'trending_up'}
              </span> 
              {isLogisticsApplied ? '-4%' : '+5%'}
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl luxury-shadow flex flex-col gap-2 transition-all hover:shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[20px]">person_search</span>
            <span className="font-label-md text-label-md">Customer</span>
          </div>
          <div className="mt-auto flex justify-between items-end pt-4">
            <span className="font-headline-md text-headline-md">05</span>
            <span className="text-on-tertiary-container text-[12px] flex items-center gap-1 font-label-sm">
              <span className="material-symbols-outlined text-[14px]">remove</span> stable
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl luxury-shadow flex flex-col gap-2 transition-all hover:shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
            <span className="font-label-md text-label-md">Project</span>
          </div>
          <div className="mt-auto flex justify-between items-end pt-4">
            <span className="font-headline-md text-headline-md">21</span>
            <span className="text-error text-[12px] flex items-center gap-1 font-label-sm">
              <span className="material-symbols-outlined text-[14px]">warning</span> high
            </span>
          </div>
        </div>
      </section>

      {/* Next Best Action */}
      <section>
        <div className="bg-primary-container text-on-primary rounded-xl p-stack-lg flex flex-col md:flex-row items-center gap-stack-lg relative overflow-hidden">
          <div className="flex-1 z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-tertiary-fixed">bolt</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">Next Best Action</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2">Hedge Exposure on North American Logistics</h3>
            <p className="font-body-md text-body-md text-on-primary-container opacity-90 max-w-xl">
              NineOS Intelligence identifies a 14% delta in shipping overhead due to regional port congestion. Reallocating the 2024 Buffer to Freight Hedging will neutralize projected Q3 volatility.
            </p>
          </div>
          <div className="flex gap-stack-sm z-10 shrink-0">
            {isLogisticsApplied ? (
              <div className="flex items-center gap-2 bg-on-tertiary-container text-tertiary-fixed-dim px-6 py-3 rounded-lg font-medium">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Strategy Applied</span>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => applyStrategy('logistics_hedge')}
                  className="bg-on-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-surface-bright transition-colors cursor-pointer active:scale-[0.98]"
                >
                  Apply Strategy
                </button>
                <button className="bg-transparent border border-on-primary-container text-on-primary px-6 py-3 rounded-lg font-medium hover:bg-on-primary-container/20 transition-colors cursor-not-allowed opacity-50">
                  Review Model
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* AI Recommendation Cards */}
      <section className="space-y-stack-md">
        <h4 className="font-headline-md text-headline-md text-primary">Intelligence Recommendations</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
          {filteredRecs.map((rec) => {
            const isApproved = appliedStrategies.includes(rec.id);
            const borderClasses = 
              rec.severity === 'high' ? 'border-l-error' : 
              rec.severity === 'medium' ? 'border-l-secondary' : 
              'border-l-on-tertiary-container';
            const confidenceColor = 
              rec.severity === 'high' ? 'text-error' : 
              'text-on-tertiary-container';

            return (
              <div 
                key={rec.id} 
                className={`bg-surface-container-lowest luxury-shadow border-l-4 ${borderClasses} border border-outline-variant rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
                  isApproved ? 'opacity-60 scale-[0.99]' : 'hover:-translate-y-0.5 hover:shadow-md'
                }`}
              >
                <div className="p-stack-lg flex-grow">
                  <div className="flex justify-between items-start mb-stack-md">
                    <div>
                      <span className="font-label-sm text-label-sm text-secondary uppercase mb-1 block">{rec.type}</span>
                      <h5 className="font-headline-md text-headline-md text-primary">{rec.title}</h5>
                    </div>
                    <div className="text-right">
                      <span className="font-label-sm text-label-sm text-secondary block">Confidence</span>
                      <span className={`font-headline-md text-headline-md ${confidenceColor}`}>{rec.confidence}%</span>
                    </div>
                  </div>
                  <div className="space-y-stack-md">
                    <div>
                      <p className="font-label-sm text-label-sm font-bold text-primary mb-1 uppercase tracking-tight">Reasoning</p>
                      <p className="font-body-md text-body-md text-secondary">{rec.reasoning}</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm font-bold text-primary mb-1 uppercase tracking-tight">Expected Impact</p>
                      <p className="font-body-md text-body-md text-secondary">{rec.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto bg-surface-container-low border-t border-outline-variant p-stack-md flex justify-between items-center">
                  <div className="flex gap-2">
                    {isApproved ? (
                      <span className="text-on-tertiary-container font-label-md text-label-md flex items-center gap-1 py-2">
                        <span className="material-symbols-outlined text-sm">check</span> Approved
                      </span>
                    ) : (
                      <>
                        <button 
                          onClick={() => approveRecommendation(rec.id)}
                          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => ignoreRecommendation(rec.id)}
                          className="bg-transparent border border-outline text-secondary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-all cursor-pointer"
                        >
                          Ignore
                        </button>
                      </>
                    )}
                  </div>
                  <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline cursor-not-allowed opacity-50">
                    Learn More <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            );
          })}
          {filteredRecs.length === 0 && (
            <div className="col-span-full py-12 text-center text-on-surface-variant">
              No recommendations match your search query.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

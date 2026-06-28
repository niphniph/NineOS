import React, { useEffect, useState } from 'react';

export const Dashboard = ({ healthScore, departmentMetrics, searchQuery, todayRisks }) => {
  // SVG circular progress calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.3
  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    // Triggers progress circle animation
    const offset = circumference * (1 - healthScore / 100);
    const timer = setTimeout(() => {
      setDashOffset(offset);
    }, 150);
    return () => clearTimeout(timer);
  }, [healthScore, circumference]);

  // Filters departments based on search query
  const filteredDepartments = Object.keys(departmentMetrics).filter(key => 
    departmentMetrics[key].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    departmentMetrics[key].desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    departmentMetrics[key].risk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filters risks based on search query
  const filteredRisks = todayRisks.filter(risk =>
    risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    risk.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to resolve trend color
  const getTrendColorClass = (trend) => {
    if (trend.includes('+')) return 'text-on-tertiary-container';
    if (trend.includes('-')) return 'text-error';
    return 'text-on-surface-variant';
  };

  return (
    <div className="max-w-[1440px] mx-auto p-margin-desktop space-y-stack-xl">
      {/* Greeting & Hero Stats */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-stack-lg">
        <div>
          <h2 className="font-display-lg text-display-lg text-primary">Good Morning, Nino.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            NineOS has analyzed 1.4TB of telemetry since your last session. Your enterprise is operating at peak efficiency, with localized risk identified in Marketing ROI.
          </p>
        </div>

        {/* Premium Health Score Visualization */}
        <div className="bg-surface-container-lowest card-shadow p-8 rounded-xl flex items-center gap-8 min-w-[320px] transition-all duration-300 hover:shadow-md">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                className="text-surface-container" 
                cx="48" 
                cy="48" 
                fill="transparent" 
                r={radius} 
                stroke="currentColor" 
                strokeWidth="6"
              />
              <circle 
                className="text-primary transition-all duration-1000 ease-out" 
                cx="48" 
                cy="48" 
                fill="transparent" 
                r={radius} 
                stroke="currentColor" 
                strokeDasharray={circumference} 
                strokeDashoffset={dashOffset} 
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-headline-md text-headline-md font-bold">{healthScore}</span>
            </div>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Health Score</p>
            <h3 className="font-headline-md text-headline-md font-bold">
              {healthScore >= 90 ? 'Excellent' : healthScore >= 80 ? 'Good' : 'Needs Focus'}
            </h3>
            <div className="flex items-center gap-1 text-on-tertiary-container mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-label-sm text-label-sm">+2.4% vs last week</span>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary & Risks Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
        {/* AI Summary Card */}
        <div className="lg:col-span-2 bg-surface-container-lowest card-shadow rounded-xl overflow-hidden accent-border">
          <div className="p-stack-md bg-surface-container/30 border-b border-outline-variant flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h4 className="font-label-md text-label-md font-bold uppercase">Executive Summary</h4>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant italic">Refreshed 4m ago</span>
          </div>
          <div className="p-stack-lg space-y-6">
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container mt-2.5"></div>
              <p className="font-body-md text-body-md">
                <strong>Revenue performance</strong> exceeded targets by 14% this quarter, primarily driven by the expansion of the Enterprise tier in EMEA markets.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-error mt-2.5"></div>
              <p className="font-body-md text-body-md">
                <strong>Marketing ROI</strong> is currently operating at {departmentMetrics.marketing.score}%. Attribution models suggest oversaturation in social channels; simulator recommends pivoting to direct executive outreach.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-on-secondary-container mt-2.5"></div>
              <p className="font-body-md text-body-md">
                <strong>Talent retention</strong> shows a slight risk in Engineering. Engagement scores are high, but market compensation is shifting; intervention recommended for L5+ roles.
              </p>
            </div>
          </div>
        </div>

        {/* Today's Risks */}
        <div className="bg-surface-container-lowest card-shadow rounded-xl p-stack-lg">
          <div className="flex items-center justify-between mb-stack-lg">
            <h4 className="font-label-md text-label-md font-bold uppercase">Today's Risks</h4>
            <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded">
              {filteredRisks.length} {filteredRisks.length === 1 ? 'ACTION ITEM' : 'ACTION ITEMS'}
            </span>
          </div>
          <div className="space-y-4">
            {filteredRisks.map((risk, index) => {
              const borderClasses = 
                risk.severity === 'high' ? 'border-error bg-error-container/10' : 
                risk.severity === 'medium' ? 'border-secondary bg-surface-container' : 
                'border-outline bg-surface-container';
              const textClasses = 
                risk.severity === 'high' ? 'text-error' : 
                risk.severity === 'medium' ? 'text-secondary' : 
                'text-on-surface-variant';
              const iconName = 
                risk.severity === 'high' ? 'priority_high' : 
                risk.severity === 'medium' ? 'warning' : 
                'info';

              return (
                <div key={index} className={`p-3 border-l-2 rounded flex items-start gap-3 transition-all duration-200 ${borderClasses}`}>
                  <span className={`material-symbols-outlined text-xl ${textClasses}`}>{iconName}</span>
                  <div>
                    <p className={`font-label-md text-label-md font-bold ${textClasses}`}>{risk.title}</p>
                    <p className="text-xs text-on-surface-variant">Region: {risk.region}. Priority: {risk.priority}.</p>
                  </div>
                </div>
              );
            })}
            {filteredRisks.length === 0 && (
              <p className="text-sm text-on-surface-variant text-center py-4">No risk items match your search.</p>
            )}
          </div>
        </div>
      </section>

      {/* Department Cards Grid (Bento) */}
      <section>
        <div className="flex items-center justify-between mb-stack-lg">
          <h4 className="font-headline-md text-headline-md font-bold">Department Health</h4>
          <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline cursor-not-allowed opacity-60">
            View Detailed Ledger <span className="material-symbols-outlined">arrow_right_alt</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
          {filteredDepartments.map((key) => {
            const dep = departmentMetrics[key];
            return (
              <div 
                key={key} 
                className="bg-surface-container-lowest card-shadow rounded-xl p-stack-lg hover-lift group cursor-default transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-surface-container rounded-lg group-hover:bg-primary-container group-hover:text-on-primary transition-colors duration-200">
                    <span className="material-symbols-outlined">{dep.icon}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display-lg text-3xl font-bold">{dep.score}</span>
                    <p className={`text-[10px] font-bold ${getTrendColorClass(dep.trend)}`}>
                      {dep.trend}
                    </p>
                  </div>
                </div>
                <h5 className="font-label-md text-label-md font-bold mb-1">{dep.name}</h5>
                <p className="text-xs text-on-surface-variant mb-6">{dep.desc}</p>
                <div className="pt-4 border-t border-outline-variant">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Biggest Risk</p>
                  <p className="text-xs text-secondary-fixed-dim">{dep.risk}</p>
                </div>
              </div>
            );
          })}
          {filteredDepartments.length === 0 && (
            <div className="col-span-full py-12 text-center text-on-surface-variant">
              No departments match your search term.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

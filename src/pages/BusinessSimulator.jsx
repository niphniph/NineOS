import React, { useState, useEffect } from 'react';

export const BusinessSimulator = ({ 
  healthScore, 
  riskScore, 
  departmentMetrics, 
  applySimulation 
}) => {
  // Input states
  const [marketingSpend, setMarketingSpend] = useState(0); // -50% to +50%
  const [engCompensation, setEngCompensation] = useState(0); // 0% to +30%
  const [logisticsHedging, setLogisticsHedging] = useState(0); // 0 to 2,000,000

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResult, setSimulatedResult] = useState(null);
  const [simulationHistory, setSimulationHistory] = useState([
    {
      name: "Freight Logistics Buffer (Q2)",
      marketing: 0,
      engineering: 0,
      logistics: 1200000,
      outcomes: { health: "+0.5%", risk: "-3", impact: "-$1.2M Buffer" },
      applied: true,
      timestamp: "3h ago"
    }
  ]);

  // Handle dynamic projection calculation
  const calculateProjections = () => {
    // Current base scores
    const currentMarketing = departmentMetrics.marketing.score;
    const currentEngineering = departmentMetrics.engineering.score;

    // Projected scores
    // 1. Marketing ROI: marketing spend has a peak efficiency. Too much spend lowers ROI (over-saturation), minor cuts might optimize it.
    // Let's model a quadratic curve for ROI efficiency:
    // delta = marketingSpend * 0.3 - (marketingSpend^2 * 0.005)
    const marketingDelta = Math.round(marketingSpend * 0.3 - (Math.pow(marketingSpend, 2) * 0.005));
    const projMarketing = Math.min(100, Math.max(0, currentMarketing + marketingDelta));

    // 2. Engineering Retention: higher compensation package improves retention and health score
    const engineeringDelta = Math.round(engCompensation * 0.4);
    const projEngineering = Math.min(100, Math.max(0, currentEngineering + engineeringDelta));

    // 3. Risk Score: logistics hedging reduces risk (-1 for each 500k), higher eng comp reduces retention risk (-1 for each 10%)
    const riskDelta = -Math.floor(logisticsHedging / 500000) - Math.floor(engCompensation / 10);
    const projRisk = Math.min(100, Math.max(1, riskScore + riskDelta));

    // 4. Global Health: weighted average of department increases
    const healthDelta = Math.round((marketingDelta * 0.15) + (engineeringDelta * 0.25) + (logisticsHedging > 0 ? 1 : 0));
    const projHealth = Math.min(100, Math.max(0, healthScore + healthDelta));

    // Cash flow impact
    const costMarketing = marketingSpend * 25000; // Mock cost multiplier
    const costEngineering = engCompensation * 60000; 
    const costLogistics = logisticsHedging;
    const totalCost = costMarketing + costEngineering + costLogistics;

    return {
      projHealth,
      projRisk,
      projMarketing,
      projEngineering,
      totalCost,
      marketingDelta,
      engineeringDelta,
      riskDelta,
      healthDelta
    };
  };

  const currentProjections = calculateProjections();

  // Run Simulation handler
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedResult(null);

    // Simulate AI processing delay
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedResult(currentProjections);
    }, 1200);
  };

  // Apply Simulation outcomes globally
  const handleApplySimulation = () => {
    if (!simulatedResult) return;

    applySimulation({
      healthScore: simulatedResult.projHealth,
      riskScore: simulatedResult.projRisk,
      marketingScore: simulatedResult.projMarketing,
      engineeringScore: simulatedResult.projEngineering
    });

    // Add to history
    const newHistoryItem = {
      name: `Simulation Run #${simulationHistory.length + 1}`,
      marketing: marketingSpend,
      engineering: engCompensation,
      logistics: logisticsHedging,
      outcomes: {
        health: `${simulatedResult.healthDelta >= 0 ? '+' : ''}${simulatedResult.healthDelta}%`,
        risk: `${simulatedResult.riskDelta}`,
        impact: `-$${(simulatedResult.totalCost / 1000).toFixed(0)}k Cost`
      },
      applied: true,
      timestamp: "Just now"
    };

    setSimulationHistory([newHistoryItem, ...simulationHistory]);
    alert("Simulation results successfully applied to live enterprise metrics!");
  };

  return (
    <div className="max-w-[1440px] mx-auto p-margin-desktop space-y-stack-xl">
      {/* Header */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">Business Simulator</h2>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
          Model future outcomes of your enterprise. Tweak resources, run predictive algorithms, and evaluate projected financial and operational health.
        </p>
      </section>

      {/* Grid: Inputs and Output Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg luxury-shadow flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h4 className="font-label-md text-label-md font-bold uppercase">Simulation Inputs</h4>
          </div>

          {/* Marketing Spend Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-label-md text-label-md">
              <span className="text-secondary">Marketing Spend Adjustment</span>
              <span className={`font-bold ${marketingSpend >= 0 ? 'text-on-tertiary-container' : 'text-error'}`}>
                {marketingSpend >= 0 ? '+' : ''}{marketingSpend}%
              </span>
            </div>
            <input 
              type="range" 
              min="-50" 
              max="50" 
              value={marketingSpend} 
              onChange={(e) => setMarketingSpend(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-[10px] text-on-surface-variant uppercase">Adjusts spend relative to Q2 baseline budget.</p>
          </div>

          {/* Engineering Comp Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-label-md text-label-md">
              <span className="text-secondary">Engineering Compensation Raise</span>
              <span className="font-bold text-primary">+{engCompensation}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={engCompensation} 
              onChange={(e) => setEngCompensation(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-[10px] text-on-surface-variant uppercase">Mitigates talent retention risk and compensation mismatch.</p>
          </div>

          {/* Freight Hedging Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-label-md text-label-md">
              <span className="text-secondary">Logistics Hedging Buffer</span>
              <span className="font-bold text-primary">${(logisticsHedging / 1000).toFixed(0)}k</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="2000000" 
              step="100000"
              value={logisticsHedging} 
              onChange={(e) => setLogisticsHedging(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-[10px] text-on-surface-variant uppercase">Hedges supply chain risk on regional shipping channels.</p>
          </div>

          <button 
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full mt-4 py-3 bg-primary text-on-primary rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSimulating ? (
              <>
                <span className="animate-spin material-symbols-outlined text-[20px]">autorenew</span>
                <span>Calculating Scenario...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                <span>Run Scenario Simulation</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Projections Output */}
        <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg luxury-shadow flex flex-col relative min-h-[400px]">
          {isSimulating && (
            <div className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-4">
              <span className="animate-spin text-5xl text-primary material-symbols-outlined">autorenew</span>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest font-semibold">Running Monte Carlo Simulation...</p>
            </div>
          )}

          {!simulatedResult && !isSimulating && (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">analytics</span>
              <h5 className="font-headline-md text-headline-md text-secondary mb-1">No Active Simulation</h5>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Adjust the sliders on the left and run a simulation to see projected business impacts.
              </p>
            </div>
          )}

          {simulatedResult && !isSimulating && (
            <div className="flex-grow flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-tertiary-container">done_all</span>
                    <h4 className="font-label-md text-label-md font-bold uppercase text-on-tertiary-container">Scenario Projections Complete</h4>
                  </div>
                  <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold uppercase">Confidence: 89%</span>
                </div>

                {/* Score Projection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-surface-container rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase font-semibold">Projected Health Score</p>
                      <h4 className="font-display-lg text-3xl font-bold mt-1">{simulatedResult.projHealth}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-secondary">Current: {healthScore}</span>
                      <span className={`block font-bold text-xs ${simulatedResult.healthDelta >= 0 ? 'text-on-tertiary-container' : 'text-error'}`}>
                        {simulatedResult.healthDelta >= 0 ? '▲' : '▼'} {Math.abs(simulatedResult.healthDelta)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-surface-container rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase font-semibold">Projected Risk Score</p>
                      <h4 className="font-display-lg text-3xl font-bold mt-1">{simulatedResult.projRisk}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-secondary">Current: {riskScore}</span>
                      <span className={`block font-bold text-xs ${simulatedResult.riskDelta <= 0 ? 'text-on-tertiary-container' : 'text-error'}`}>
                        {simulatedResult.riskDelta <= 0 ? '▼' : '▲'} {Math.abs(simulatedResult.riskDelta)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-departments details */}
                <div className="border border-outline-variant rounded-xl divide-y divide-outline-variant">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h5 className="font-label-md text-label-md font-bold">Marketing ROI Score</h5>
                      <p className="text-xs text-on-surface-variant">Attribution efficiency projection</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold font-label-md text-label-md">{simulatedResult.projMarketing}%</span>
                      <span className={`block text-[10px] font-bold ${simulatedResult.marketingDelta >= 0 ? 'text-on-tertiary-container' : 'text-error'}`}>
                        {simulatedResult.marketingDelta >= 0 ? '+' : ''}{simulatedResult.marketingDelta}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h5 className="font-label-md text-label-md font-bold">Engineering Health Score</h5>
                      <p className="text-xs text-on-surface-variant">Retention and execution velocity projection</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold font-label-md text-label-md">{simulatedResult.projEngineering}%</span>
                      <span className={`block text-[10px] font-bold ${simulatedResult.engineeringDelta >= 0 ? 'text-on-tertiary-container' : 'text-error'}`}>
                        {simulatedResult.engineeringDelta >= 0 ? '+' : ''}{simulatedResult.engineeringDelta}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h5 className="font-label-md text-label-md font-bold text-error">Cash Flow Cost Projection</h5>
                      <p className="text-xs text-on-surface-variant">Capital expenditure cost of strategy</p>
                    </div>
                    <span className="font-bold font-label-md text-label-md text-error">
                      -${(simulatedResult.totalCost / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant flex gap-3">
                <button 
                  onClick={handleApplySimulation}
                  className="bg-primary text-on-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Apply Simulation Strategy
                </button>
                <button 
                  onClick={() => setSimulatedResult(null)}
                  className="bg-transparent border border-outline text-secondary px-6 py-3 rounded-lg font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Discard Run
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scenario History Ledger */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg luxury-shadow">
        <h4 className="font-label-md text-label-md font-bold uppercase mb-4">Simulation History</h4>
        <div className="divide-y divide-outline-variant">
          {simulationHistory.map((run, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <h5 className="font-label-md text-label-md font-bold text-primary">{run.name}</h5>
                <p className="text-xs text-on-surface-variant">
                  Adjustments: Marketing ({run.marketing > 0 ? '+' : ''}{run.marketing}%), Eng Comp (+{run.engineering}%), Hedging Buffer (${(run.logistics / 1000).toFixed(0)}k)
                </p>
              </div>
              <div className="text-right flex items-center gap-6">
                <div>
                  <span className="text-xs text-on-surface-variant block uppercase font-semibold">Outcomes</span>
                  <span className="text-xs text-primary font-bold">
                    Health: {run.outcomes.health} | Risk: {run.outcomes.risk} | {run.outcomes.impact}
                  </span>
                </div>
                <span className="text-[10px] text-on-surface-variant uppercase">{run.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { SimulationPrompt } from './components/SimulationPrompt';
import { SimulationSummary, RippleEffect } from './components/SimulationSummary';
import { IntelligenceAdvisory } from './components/IntelligenceAdvisory';
import { ProjectionChart } from './components/ProjectionChart';
import { MarketImpactMap } from './components/MarketImpactMap';
import { SimulationVariables, VariableItem } from './components/SimulationVariables';

export const SimulatorLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Simulated metrics
  const [scenarioNumber, setScenarioNumber] = useState<number>(294);
  const [confidenceScore, setConfidenceScore] = useState<number>(94.2);
  const [summaryQuote, setSummaryQuote] = useState<string>(
    'The proposed 15% budget reduction in performance marketing will likely lead to a 4.2% dip in immediate lead velocity, but enterprise retention remains stable due to existing brand equity.'
  );
  const [projectedRoi, setProjectedRoi] = useState<string>('+18.5%');
  const [projectedRoiTrend, setProjectedRoiTrend] = useState<string>('+2.4 pts YoY');
  const [opexImpact, setOpexImpact] = useState<string>('-$1.2M');
  const [opexImpactTrend, setOpexImpactTrend] = useState<string>('High sensitivity');
  const [marketShare, setMarketShare] = useState<string>('12.4%');
  const [marketShareTrend, setMarketShareTrend] = useState<string>('Nominal change');

  const [activeVariables, setActiveVariables] = useState<VariableItem[]>([
    { id: 'budget', icon: 'settings', label: 'Budget Adj: -15%' },
    { id: 'headcount', icon: 'person_add', label: 'Headcount: +5' },
    { id: 'geo', icon: 'public', label: 'Geo: Global' },
  ]);

  const [rippleEffects, setRippleEffects] = useState<RippleEffect[]>([
    {
      title: 'Talent Acquisition Efficiency',
      desc: 'Hiring velocity increases by 12% as simulator predicts higher application rates from top-tier talent seeking stability.',
      type: 'primary',
    },
    {
      title: 'Operational Redundancy',
      desc: 'Scenario identifies 3 points of failure in the supply chain under accelerated growth conditions.',
      type: 'secondary',
    },
  ]);

  const [quarters, setQuarters] = useState([
    { label: 'Q1', value: '$1.2M' },
    { label: 'Q2', value: '$2.8M' },
    { label: 'Q3', value: '$4.1M' },
    { label: 'Q4', value: '$6.4M', isBold: true },
  ]);

  const [vectorTitle, setVectorTitle] = useState<string>('Top Expansion Vector');
  const [vectorValue, setVectorValue] = useState<string>('EMEA North (+12%)');

  const handleRunScenario = (promptText: string) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);

      // Randomize values based on prompt
      const nextScenario = Math.floor(Math.random() * 900) + 100;
      const nextConf = parseFloat((Math.random() * 10 + 90).toFixed(1));
      setScenarioNumber(nextScenario);
      setConfidenceScore(nextConf);

      // Quote adjustments
      if (promptText.toLowerCase().includes('marketing') || promptText.toLowerCase().includes('sales')) {
        setSummaryQuote(
          `Hypothesis simulation indicates that targeting "${promptText}" results in a structural shift in lead generation cost, optimizing opex by 11.4%.`
        );
        setProjectedRoi('+22.1%');
        setProjectedRoiTrend('+3.8 pts YoY');
        setOpexImpact('-$850K');
        setOpexImpactTrend('Medium sensitivity');
        setQuarters([
          { label: 'Q1', value: '$1.4M' },
          { label: 'Q2', value: '$3.1M' },
          { label: 'Q3', value: '$4.9M' },
          { label: 'Q4', value: '$7.2M', isBold: true },
        ]);
        setActiveVariables([
          { id: 'budget', icon: 'settings', label: 'Budget Adj: -15%' },
          { id: 'headcount', icon: 'person_add', label: 'Sales Force: +5' },
          { id: 'geo', icon: 'public', label: 'Geo: US & EMEA' },
        ]);
      } else {
        setSummaryQuote(
          `Analysis of "${promptText}" predicts localized performance volatility in Q4, but overall enterprise cash flow indicators remain highly resilient.`
        );
        setProjectedRoi('+14.8%');
        setProjectedRoiTrend('+0.9 pts YoY');
        setOpexImpact('-$2.1M');
        setOpexImpactTrend('High sensitivity');
        setQuarters([
          { label: 'Q1', value: '$1.1M' },
          { label: 'Q2', value: '$2.5M' },
          { label: 'Q3', value: '$3.8M' },
          { label: 'Q4', value: '$5.9M', isBold: true },
        ]);
        setActiveVariables([
          { id: 'custom', icon: 'settings', label: 'Simulation Factor: Active' },
          { id: 'headcount', icon: 'person_add', label: 'Staffing: Nominal' },
          { id: 'geo', icon: 'public', label: 'Geo: Global' },
        ]);
      }
    }, 1500);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleApplyRecommendation = () => {
    alert('Strategic recommendation applied. Adjusting current quarter growth forecasts.');
  };

  const handleViewAnalysis = () => {
    alert('Opening detailed PLG sensitivity analysis matrix...');
  };

  const handleRippleClick = (title: string) => {
    alert(`Opening granular data logs for ripple effect: ${title}`);
  };

  return (
    <div className="max-w-[1440px] mx-auto p-gutter lg:p-margin-desktop space-y-stack-xl">
      {/* Simulation Header & Hero */}
      <section className="flex flex-col gap-2">
        <span className="font-label-caps text-primary bg-primary/10 neon-border px-3 py-1 rounded-full w-fit text-[12px] font-bold tracking-wider uppercase">
          Simulation Engine v4.2
        </span>
        <h2 className="font-display-lg text-on-surface text-[32px] font-bold">
          NineOS Strategic Simulator
        </h2>
        <p className="font-body-lg text-secondary text-on-surface-variant max-w-2xl">
          Project multi-variable business outcomes with our proprietary neural modeling. Define your
          hypothesis and witness the ripple effects across your enterprise.
        </p>
      </section>

      {/* AI Prompt Area */}
      <section>
        <SimulationPrompt onRunScenario={handleRunScenario} isLoading={isLoading} />
      </section>

      {/* Results Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Simulation Report Area */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <SimulationSummary
            scenarioNumber={scenarioNumber}
            confidenceScore={confidenceScore}
            summaryQuote={summaryQuote}
            projectedRoi={projectedRoi}
            projectedRoiTrend={projectedRoiTrend}
            opexImpact={opexImpact}
            opexImpactTrend={opexImpactTrend}
            marketShare={marketShare}
            marketShareTrend={marketShareTrend}
            rippleEffects={rippleEffects}
            onRippleClick={handleRippleClick}
          />

          <IntelligenceAdvisory
            onApplyRecommendation={handleApplyRecommendation}
            onViewAnalysis={handleViewAnalysis}
          />
        </div>

        {/* Visualizations Area */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <ProjectionChart quarters={quarters} />

          <MarketImpactMap vectorTitle={vectorTitle} vectorValue={vectorValue} />

          <SimulationVariables variables={activeVariables} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-surface-container-lowest border border-primary p-4 rounded-lg shadow-2xl z-[100] font-label-md text-primary animate-bounce">
          Scenario computations complete.
        </div>
      )}
    </div>
  );
};

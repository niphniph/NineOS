import React, { useState } from 'react';
import { RiskScoreCard } from './components/RiskScoreCard';
import { RiskCategories } from './components/RiskCategories';
import { NextBestAction } from './components/NextBestAction';
import { RecommendationCard, IntelligenceRecommendation } from './components/RecommendationCard';

interface RiskManagementLayoutProps {
  searchQuery?: string;
  riskScore?: number;
  onApplySimulation?: () => void;
}

export const RiskManagementLayout: React.FC<RiskManagementLayoutProps> = ({
  searchQuery = '',
  riskScore = 12,
  onApplySimulation,
}) => {
  const [recommendations, setRecommendations] = useState<IntelligenceRecommendation[]>([
    {
      id: 'liquidity',
      riskType: 'Financial Risk',
      title: 'Equity Liquidity Optimization',
      confidence: 94,
      reasoning: 'Historical patterns suggest a seasonal dip in available capital. AI suggests moving short-term reserves to higher yield liquid instruments.',
      expectedImpact: '+$1.2M Cash Flow optimization over 6 months.',
      severity: 'primary',
    },
    {
      id: 'supply_chain',
      riskType: 'Operational Risk',
      title: 'Supply Chain Fragility in SEA',
      confidence: 78,
      reasoning: "Geopolitical shifts and local labor strikes are predicted to disrupt the semiconductor delivery window for the 'Vanguard' Project.",
      expectedImpact: 'Project delay risk: High. Potential lost revenue: $4.5M.',
      severity: 'error',
    },
    {
      id: 'churn',
      riskType: 'Customer Risk',
      title: 'Churn Probability - Enterprise Tier',
      confidence: 82,
      reasoning: 'A drop in daily active seat usage across three major clients suggests a shift in their internal workflow.',
      expectedImpact: 'Retention stabilization for $12M ACV portfolio.',
      severity: 'secondary',
    },
    {
      id: 'tech_debt',
      riskType: 'Project Risk',
      title: 'Technical Debt Accumulation',
      confidence: 91,
      reasoning: 'Velocity metrics indicate that 35% of engineering hours are currently spent on legacy maintenance.',
      expectedImpact: 'Scale bottleneck if not addressed by Q4 infrastructure update.',
      severity: 'primary',
    },
  ]);

  const handleApprove = (id: string) => {
    alert(`Approved risk action: ${id.replace('_', ' ').toUpperCase()}`);
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleIgnore = (id: string) => {
    alert(`Ignored recommendation node: ${id}`);
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleLearnMore = (id: string) => {
    alert(`Showing detailed risk simulation matrix and sources for recommendation: ${id}`);
  };

  const handleApplyStrategy = () => {
    alert('Applied Logistics Buffer Allocation Hedge Strategy. Port delay metrics re-calculating...');
  };

  const handleReviewModel = () => {
    alert('Opening Freight Hedging Monte Carlo simulation parameters...');
  };

  // Filter recommendations based on search input
  const filteredRecs = recommendations.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.riskType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reasoning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.expectedImpact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto p-margin-desktop space-y-stack-xl">
      {/* Hero Section: Risk Score */}
      <section className="grid grid-cols-12 gap-stack-lg mb-stack-xl">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm glow-cyan">
            Risk Center
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Real-time analysis of enterprise volatility metrics. Intelligence indicates a stabilized
            operational environment with focused tactical risks.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <RiskScoreCard score={riskScore} badgeText="LOW RISK" icon="shield_with_heart" />
        </div>
      </section>

      {/* Risk Categories Bento */}
      <RiskCategories />

      {/* Next Best Action */}
      <NextBestAction onApplyStrategy={handleApplyStrategy} onReviewModel={handleReviewModel} />

      {/* AI Recommendation Cards */}
      <div>
        <h4 className="font-headline-md text-headline-md text-on-surface mb-stack-md flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">smart_toy</span> Intelligence
          Recommendations
        </h4>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
          {filteredRecs.length > 0 ? (
            filteredRecs.map((rec) => (
              <RecommendationCard
                key={rec.id}
                rec={rec}
                onApprove={handleApprove}
                onIgnore={handleIgnore}
                onLearnMore={handleLearnMore}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12 border border-dashed border-outline-variant text-on-surface-variant rounded-xl">
              No matching intelligence recommendations found.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

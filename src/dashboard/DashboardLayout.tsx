import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HealthScore } from './components/HealthScore';
import { AISummary } from './components/AISummary';
import { TodayRisks, RiskItem } from './components/TodayRisks';
import { DepartmentGrid } from './components/DepartmentGrid';
import { DepartmentMetric } from './components/DepartmentCard';
import { RiskManagementLayout } from '../risk-management/RiskManagementLayout';

export const DashboardLayout: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Local dashboard states
  const [healthScore, setHealthScore] = useState<number>(93);
  const [healthLabel, setHealthLabel] = useState<string>('Excellent');
  const [healthTrend, setHealthTrend] = useState<string>('+2.4% vs last week');
  const [isHealthTrendUp, setIsHealthTrendUp] = useState<boolean>(true);

  const [risks, setRisks] = useState<RiskItem[]>([
    {
      id: 'compliance',
      severity: 'high',
      title: 'Cloud Compliance Gap',
      description: 'Region: US-East. Priority: High.',
    },
    {
      id: 'hiring',
      severity: 'medium',
      title: 'Hiring Freeze Impact',
      description: 'Engineering velocity may dip -15%.',
    },
    {
      id: 'contract',
      severity: 'low',
      title: 'Contract Renewal',
      description: 'Vendor: AWS. 45 days remaining.',
    },
  ]);

  const [departmentMetrics, setDepartmentMetrics] = useState<DepartmentMetric[]>([
    {
      id: 'sales',
      name: 'Sales',
      score: 98,
      trend: '+5% TREND',
      description: 'Execution velocity is at an all-time high.',
      biggestRisk: 'Pipeline saturation in mid-market segments.',
      icon: 'payments',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      score: 76,
      trend: '-8% TREND',
      description: 'Inefficient spend on top-of-funnel ads.',
      biggestRisk: 'Customer acquisition cost (CAC) inflation.',
      icon: 'campaign',
    },
    {
      id: 'finance',
      name: 'Finance',
      score: 94,
      trend: 'STABLE',
      description: 'Capital reserves are optimized for growth.',
      biggestRisk: 'Currency volatility in APAC operations.',
      icon: 'account_balance',
    },
    {
      id: 'hr',
      name: 'HR',
      score: 89,
      trend: '+2% TREND',
      description: 'High employee NPS following latest offsite.',
      biggestRisk: 'Talent poach attempts from competitors.',
      icon: 'badge',
    },
    {
      id: 'engineering',
      name: 'Engineering',
      score: 91,
      trend: '+1% TREND',
      description: 'Platform uptime at 99.998% this month.',
      biggestRisk: 'Technical debt in legacy billing system.',
      icon: 'terminal',
    },
    {
      id: 'cs',
      name: 'Customer Success',
      score: 95,
      trend: 'STABLE',
      description: 'Churn rate hit historic low of 0.4%.',
      biggestRisk: 'Support ticket backlogs in French/German.',
      icon: 'support_agent',
    },
  ]);

  const handleExecuteDecision = () => {
    alert(
      `NineOS Executive Decision Executed.\nEnterprise Health stands at ${healthScore}%.\nActive Risk Items: ${risks.length}.`
    );
  };

  const handleNewSimulation = () => {
    // Generate simulated values
    const newScore = Math.floor(Math.random() * 20) + 80; // 80 - 99
    const oldScore = healthScore;
    const diff = newScore - oldScore;

    setHealthScore(newScore);
    setHealthLabel(newScore >= 90 ? 'Excellent' : newScore >= 80 ? 'Good' : 'Stable');
    setHealthTrend(`${diff >= 0 ? '+' : ''}${diff.toFixed(1)}% vs previous`);
    setIsHealthTrendUp(diff >= 0);

    // Randomize some department scores
    setDepartmentMetrics((prev) =>
      prev.map((d) => {
        const change = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const nextScore = Math.min(100, Math.max(50, d.score + change));
        const trend =
          change > 0
            ? `+${change}% TREND`
            : change < 0
            ? `${change}% TREND`
            : 'STABLE';
        return {
          ...d,
          score: nextScore,
          trend,
        };
      })
    );

    // Randomize risk items count
    if (Math.random() > 0.5) {
      // Add a random risk
      const newRiskId = `sim_risk_${Date.now()}`;
      setRisks((prev) => [
        {
          id: newRiskId,
          severity: Math.random() > 0.5 ? 'high' : 'medium',
          title: 'Simulated Risk Event',
          description: 'Telemetry anomaly detected in region US-West.',
        },
        ...prev.slice(0, 3), // limit to max 4 items
      ]);
    } else {
      // Resolve first risk
      setRisks((prev) => prev.slice(1));
    }
  };

  const handleNotificationsClick = () => {
    alert('System Notifications: All services nominal. Cloud security audit in progress.');
  };

  const handleProfileClick = () => {
    alert('Nino Rossi | Chief Executive Officer | NineOS Workspace Admin');
  };

  const handleViewLedger = () => {
    alert('Navigating to Detailed Enterprise ledger. Access: Authorized.');
  };

  // Filter department cards by search query
  const filteredMetrics = departmentMetrics.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.biggestRisk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-body-md text-body-md bg-background text-on-background overflow-x-hidden min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onNewSimulation={handleNewSimulation}
      />

      {/* Top Header Bar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onExecuteDecision={handleExecuteDecision}
        onNotificationsClick={handleNotificationsClick}
        onProfileClick={handleProfileClick}
      />

      {/* Main Content Area */}
      <main className="ml-[280px] pt-16 min-h-screen">
        {activePage === 'dashboard' ? (
          <div className="max-w-[1440px] mx-auto p-margin-desktop space-y-stack-xl">
            {/* Greeting & Hero Stats */}
            <section className="flex flex-col md:flex-row justify-between items-end gap-stack-lg">
              <div>
                <h2 className="font-display-lg text-display-lg text-primary-fixed-dim neon-glow">
                  Good Morning, Nino.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface mt-2 max-w-2xl opacity-90">
                  NineOS has analyzed 1.4TB of telemetry since your last session. Your enterprise is
                  operating at peak efficiency, with localized risk identified in Marketing ROI.
                </p>
              </div>

              {/* Health Score Component */}
              <HealthScore
                score={healthScore}
                label={healthLabel}
                trend={healthTrend}
                isUp={isHealthTrendUp}
              />
            </section>

            {/* Executive Summary & Risks Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
              {/* AI Summary Card */}
              <AISummary refreshedText="Refreshed 4m ago" />

              {/* Today's Risks */}
              <TodayRisks risks={risks} />
            </section>

            {/* Department Cards Grid */}
            <DepartmentGrid metrics={filteredMetrics} onViewLedger={handleViewLedger} />
          </div>
        ) : activePage === 'risk' ? (
          <RiskManagementLayout searchQuery={searchQuery} riskScore={12} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4">construction</span>
            <h3 className="font-headline-md text-headline-md font-bold text-primary">
              Module "{activePage.toUpperCase()}" Under Development
            </h3>
            <p className="font-body-md text-body-md text-secondary mt-1">
              This module is currently queued for deployment in future sprints.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

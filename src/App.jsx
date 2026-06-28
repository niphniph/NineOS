import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { RiskCenter } from './pages/RiskCenter';
import { BusinessSimulator } from './pages/BusinessSimulator';

function App() {
  // Global View Navigation
  const [activePage, setActivePage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Global Enterprise States
  const [healthScore, setHealthScore] = useState(93);
  const [riskScore, setRiskScore] = useState(12);
  const [appliedStrategies, setAppliedStrategies] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to NineOS Enterprise Intelligence Center." }
  ]);

  // Live Department Health metrics
  const [departmentMetrics, setDepartmentMetrics] = useState({
    sales: { 
      name: 'Sales', 
      score: 98, 
      trend: '+5% TREND', 
      desc: 'Execution velocity is at an all-time high.', 
      risk: 'Pipeline saturation in mid-market segments.', 
      icon: 'payments' 
    },
    marketing: { 
      name: 'Marketing', 
      score: 76, 
      trend: '-8% TREND', 
      desc: 'Inefficient spend on top-of-funnel ads.', 
      risk: 'Customer acquisition cost (CAC) inflation.', 
      icon: 'campaign' 
    },
    finance: { 
      name: 'Finance', 
      score: 94, 
      trend: 'STABLE', 
      desc: 'Capital reserves are optimized for growth.', 
      risk: 'Currency volatility in APAC operations.', 
      icon: 'account_balance' 
    },
    hr: { 
      name: 'HR', 
      score: 89, 
      trend: '+2% TREND', 
      desc: 'High employee NPS following latest offsite.', 
      risk: 'Talent poach attempts from competitors.', 
      icon: 'badge' 
    },
    engineering: { 
      name: 'Engineering', 
      score: 91, 
      trend: '+1% TREND', 
      desc: 'Platform uptime at 99.998% this month.', 
      risk: 'Technical debt in legacy billing system.', 
      icon: 'terminal' 
    },
    cs: { 
      name: 'Customer Success', 
      score: 95, 
      trend: 'STABLE', 
      desc: 'Churn rate hit historic low of 0.4%.', 
      risk: 'Support ticket backlogs in French/German.', 
      icon: 'support_agent' 
    }
  });

  // Active Risks List
  const [todayRisks, setTodayRisks] = useState([
    { id: 'cloud_compliance', title: 'Cloud Compliance Gap', region: 'US-East', priority: 'High', severity: 'high' },
    { id: 'hiring_freeze', title: 'Hiring Freeze Impact', region: 'Engineering', priority: 'Medium', severity: 'medium' },
    { id: 'contract_renewal', title: 'Contract Renewal', region: 'AWS (45 days)', priority: 'Low', severity: 'low' }
  ]);

  // Active recommendations
  const [recommendations, setRecommendations] = useState([
    { 
      id: 'liquidity_opt', 
      type: 'Financial Risk', 
      title: 'Equity Liquidity Optimization', 
      confidence: 94, 
      reasoning: 'Historical patterns suggest a seasonal dip in available capital. AI suggests moving short-term reserves to higher yield liquid instruments to offset upcoming quarterly interest rate hikes.', 
      impact: '+$1.2M Cash Flow optimization over 6 months.', 
      severity: 'low' 
    },
    { 
      id: 'sea_fragility', 
      type: 'Operational Risk', 
      title: 'Supply Chain Fragility in SEA', 
      confidence: 78, 
      reasoning: 'Geopolitical shifts and local labor strikes are predicted to disrupt the semiconductor delivery window for the \'Vanguard\' Project by 4 weeks.', 
      impact: 'Project delay risk: High. Potential lost revenue: $4.5M.', 
      severity: 'high' 
    },
    { 
      id: 'churn_prob', 
      type: 'Customer Risk', 
      title: 'Churn Probability - Enterprise Tier', 
      confidence: 82, 
      reasoning: 'A drop in daily active seat usage across three major clients suggests a shift in their internal workflow. Proactive outreach is recommended.', 
      impact: 'Retention stabilization for $12M ACV portfolio.', 
      severity: 'medium' 
    },
    { 
      id: 'tech_debt', 
      type: 'Project Risk', 
      title: 'Technical Debt Accumulation', 
      confidence: 91, 
      reasoning: 'Velocity metrics indicate that 35% of engineering hours are currently spent on legacy maintenance rather than \'Innovation\' milestones.', 
      impact: 'Scale bottleneck if not addressed by Q4 infrastructure update.', 
      severity: 'medium' 
    }
  ]);

  // Update callbacks
  const addNotification = (text) => {
    setNotifications(prev => [{ id: Date.now(), text }, ...prev]);
  };

  const applyStrategy = (strategyId) => {
    if (strategyId === 'logistics_hedge') {
      setAppliedStrategies(prev => [...prev, 'logistics_hedge']);
      setRiskScore(prev => Math.max(1, prev - 4));
      addNotification("Applied Strategy: Hedged Logistics volatility on regional port congestions.");
    }
  };

  const approveRecommendation = (id) => {
    setAppliedStrategies(prev => [...prev, id]);
    addNotification(`Approved recommendation: ${id.replace('_', ' ').toUpperCase()}`);

    // Dynamic metrics shifts based on approved items
    if (id === 'liquidity_opt') {
      setHealthScore(prev => Math.min(100, prev + 1));
      setDepartmentMetrics(prev => ({
        ...prev,
        finance: { ...prev.finance, score: Math.min(100, prev.finance.score + 2), trend: '+2% TREND' }
      }));
    } else if (id === 'sea_fragility') {
      setRiskScore(prev => Math.max(1, prev - 3));
      setTodayRisks(prev => prev.filter(r => r.id !== 'cloud_compliance'));
    } else if (id === 'churn_prob') {
      setDepartmentMetrics(prev => ({
        ...prev,
        cs: { ...prev.cs, score: Math.min(100, prev.cs.score + 3), trend: '+3% TREND' }
      }));
      setHealthScore(prev => Math.min(100, prev + 1));
    } else if (id === 'tech_debt') {
      setDepartmentMetrics(prev => ({
        ...prev,
        engineering: { ...prev.engineering, score: Math.min(100, prev.engineering.score + 5), trend: '+5% TREND' }
      }));
    }
  };

  const ignoreRecommendation = (id) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    addNotification(`Ignored recommendation node.`);
  };

  const handleApplySimulation = (outcomes) => {
    setHealthScore(outcomes.healthScore);
    setRiskScore(outcomes.riskScore);
    setDepartmentMetrics(prev => ({
      ...prev,
      marketing: { 
        ...prev.marketing, 
        score: outcomes.marketingScore, 
        trend: outcomes.marketingScore > prev.marketing.score ? '+4% TREND' : '-8% TREND' 
      },
      engineering: { 
        ...prev.engineering, 
        score: outcomes.engineeringScore, 
        trend: outcomes.engineeringScore > prev.engineering.score ? '+5% TREND' : '+1% TREND' 
      }
    }));
    addNotification("Scenario simulation outcomes successfully updated globally.");
  };

  const handleExecuteDecision = () => {
    const totalApplied = appliedStrategies.length;
    alert(`NineOS Operations: Executive Decision Executed.\nTotal strategies applied: ${totalApplied}.\nEnterprise Health stands at ${healthScore}%.`);
  };

  // Switch between views
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard 
            healthScore={healthScore}
            departmentMetrics={departmentMetrics}
            searchQuery={searchQuery}
            todayRisks={todayRisks}
          />
        );
      case 'risk':
        return (
          <RiskCenter 
            riskScore={riskScore}
            recommendations={recommendations}
            appliedStrategies={appliedStrategies}
            applyStrategy={applyStrategy}
            approveRecommendation={approveRecommendation}
            ignoreRecommendation={ignoreRecommendation}
            searchQuery={searchQuery}
          />
        );
      case 'simulator':
        return (
          <BusinessSimulator 
            healthScore={healthScore}
            riskScore={riskScore}
            departmentMetrics={departmentMetrics}
            applySimulation={handleApplySimulation}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4">construction</span>
            <h3 className="font-headline-md text-headline-md font-bold text-primary">Module Under Development</h3>
            <p className="font-body-md text-body-md text-secondary mt-1">This module is currently queued for deployment in future sprints.</p>
          </div>
        );
    }
  };

  return (
    <div className="font-body-md text-body-md bg-background text-on-background overflow-x-hidden min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Top Header Bar */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        executeDecision={handleExecuteDecision} 
        notificationsCount={notifications.length - 1}
      />

      {/* Main Content Area */}
      <main className="ml-[280px] pt-16 min-h-screen">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

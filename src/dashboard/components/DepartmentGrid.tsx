import React from 'react';
import { DepartmentCard, DepartmentMetric } from './DepartmentCard';
import { Button } from './Button';

interface DepartmentGridProps {
  metrics?: DepartmentMetric[];
  onViewLedger?: () => void;
}

export const DepartmentGrid: React.FC<DepartmentGridProps> = ({
  metrics = [
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
  ],
  onViewLedger,
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-stack-lg">
        <h4 className="font-headline-md text-headline-md font-bold text-primary-fixed-dim">
          Department Health
        </h4>
        <Button variant="text-link" onClick={onViewLedger}>
          View Detailed Ledger{' '}
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
        {metrics.map((metric) => (
          <DepartmentCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
};

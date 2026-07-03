import React from 'react';

export interface RiskCategory {
  id: string;
  name: string;
  icon: string;
  value: string | number;
  trendText: string;
  trendType: 'up' | 'down' | 'stable' | 'warning';
}

interface RiskCategoriesProps {
  categories?: RiskCategory[];
}

export const RiskCategories: React.FC<RiskCategoriesProps> = ({
  categories = [
    {
      id: 'financial',
      name: 'Financial',
      icon: 'account_balance',
      value: '08',
      trendText: '-2%',
      trendType: 'down',
    },
    {
      id: 'operational',
      name: 'Operational',
      icon: 'precision_manufacturing',
      value: '14',
      trendText: '+5%',
      trendType: 'up',
    },
    {
      id: 'customer',
      name: 'Customer',
      icon: 'person_search',
      value: '05',
      trendText: 'stable',
      trendType: 'stable',
    },
    {
      id: 'project',
      name: 'Project',
      icon: 'account_tree',
      value: '21',
      trendText: 'high',
      trendType: 'warning',
    },
  ],
}) => {
  const getTrendStyles = (type: 'up' | 'down' | 'stable' | 'warning') => {
    switch (type) {
      case 'down':
        return {
          colorClass: 'text-primary',
          icon: 'trending_down',
        };
      case 'up':
        return {
          colorClass: 'text-error',
          icon: 'trending_up',
        };
      case 'stable':
        return {
          colorClass: 'text-on-surface-variant',
          icon: 'remove',
        };
      case 'warning':
        return {
          colorClass: 'text-error',
          icon: 'warning',
        };
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md mb-stack-xl">
      {categories.map((cat) => {
        const trend = getTrendStyles(cat.trendType);
        return (
          <div
            key={cat.id}
            className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl neon-border neon-border-hover transition-all duration-200 flex flex-col gap-2 min-h-[110px]"
          >
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
              <span className="font-label-md text-label-md font-bold uppercase tracking-tight">
                {cat.name}
              </span>
            </div>
            <div className="mt-auto flex justify-between items-end">
              <span className="font-headline-md text-headline-md text-on-surface">{cat.value}</span>
              <span className={`${trend.colorClass} text-[12px] flex items-center gap-1 font-label-sm`}>
                <span className="material-symbols-outlined text-[14px]">{trend.icon}</span>{' '}
                {cat.trendText}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

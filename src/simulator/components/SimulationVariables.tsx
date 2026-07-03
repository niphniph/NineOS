import React from 'react';

export interface VariableItem {
  id: string;
  icon: string;
  label: string;
}

interface SimulationVariablesProps {
  variables?: VariableItem[];
}

export const SimulationVariables: React.FC<SimulationVariablesProps> = ({
  variables = [
    { id: 'budget', icon: 'settings', label: 'Budget Adj: -15%' },
    { id: 'headcount', icon: 'person_add', label: 'Headcount: +5' },
    { id: 'geo', icon: 'public', label: 'Geo: Global' },
  ],
}) => {
  return (
    <div className="flex-grow bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col gap-2">
      <span className="font-label-caps text-outline uppercase tracking-widest text-[10px] font-bold">
        Active Variables
      </span>
      <div className="flex flex-wrap gap-2">
        {variables.map((v) => (
          <div
            key={v.id}
            className="px-2 py-1 bg-surface-container-lowest border border-primary/20 rounded font-label-sm text-secondary flex items-center gap-1 text-[12px]"
          >
            <span className="material-symbols-outlined text-[14px]">{v.icon}</span>
            {v.label}
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';

interface QuarterData {
  label: string;
  value: string;
  isBold?: boolean;
}

interface ProjectionChartProps {
  title?: string;
  maxCaseText?: string;
  nominalCaseText?: string;
  quarters?: QuarterData[];
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({
  title = 'Revenue Projection',
  maxCaseText = '+24% Max Case',
  nominalCaseText = 'Nominal Case',
  quarters = [
    { label: 'Q1', value: '$1.2M' },
    { label: 'Q2', value: '$2.8M' },
    { label: 'Q3', value: '$4.1M' },
    { label: 'Q4', value: '$6.4M', isBold: true },
  ],
}) => {
  return (
    <div className="bg-surface-container-lowest neon-border rounded-xl luxury-shadow p-gutter">
      <div className="flex justify-between items-center mb-stack-lg">
        <h4 className="font-label-caps text-primary text-[12px] font-bold tracking-wider uppercase">
          {title}
        </h4>
        <span
          className="material-symbols-outlined text-outline cursor-pointer"
          onClick={() => alert('Simulation Projection model calculations based on neural inputs.')}
        >
          info
        </span>
      </div>
      <div className="relative h-48 w-full">
        <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
          {/* Background curve */}
          <path
            d="M0,130 C50,120 100,110 150,90 C200,70 250,75 300,50 C350,25 400,30 400,30"
            fill="none"
            stroke="#191f2f"
            strokeWidth="4"
          />
          {/* Nominal dotted curve */}
          <path
            d="M0,130 C50,120 100,110 150,95 C200,85 250,90 300,75 C350,60 400,65 400,65"
            fill="none"
            opacity="0.3"
            stroke="#dce2f8"
            strokeDasharray="4 2"
            strokeWidth="2"
          />
          {/* Max Case glowing curve */}
          <path
            d="M0,130 C50,115 100,90 150,70 C200,50 250,45 300,20 C350,5 400,0 400,0"
            fill="none"
            filter="drop-shadow(0 0 8px rgba(0,242,255,0.4))"
            stroke="#00f2ff"
            strokeWidth="4"
          />
          {/* Glowing pulse dot */}
          <circle className="chart-pulse" cx="300" cy="20" fill="#00f2ff" r="4" />
        </svg>
        <div className="absolute top-4 right-0 flex flex-col items-end pointer-events-none">
          <span className="font-label-sm text-primary font-bold text-[12px]">{maxCaseText}</span>
          <span className="font-label-sm text-secondary opacity-60 text-[12px]">{nominalCaseText}</span>
        </div>
      </div>
      <div className="mt-stack-md flex justify-between border-t border-primary/10 pt-4">
        {quarters.map((q, idx) => (
          <div key={idx} className="text-center">
            <p className="font-label-sm text-outline text-[12px] uppercase font-bold tracking-wider">
              {q.label}
            </p>
            <p className={`font-mono-data text-xs ${q.isBold ? 'text-primary font-bold' : 'text-on-surface'}`}>
              {q.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

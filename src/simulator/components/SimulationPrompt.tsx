import React, { useState } from 'react';

interface SimulationPromptProps {
  onRunScenario: (prompt: string) => void;
  isLoading: boolean;
}

export const SimulationPrompt: React.FC<SimulationPromptProps> = ({
  onRunScenario,
  isLoading,
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const suggestions = [
    'hire five salespeople in Q3',
    'marketing budget decreases by 15%',
    'competitor launches SaaS alternative',
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleRun = () => {
    if (prompt.trim() !== '') {
      onRunScenario(prompt);
    }
  };

  return (
    <div
      className={`bg-surface-container-lowest neon-border rounded-xl luxury-shadow p-stack-lg relative overflow-hidden group transition-all duration-300 ${
        isFocused ? 'ring-2 ring-primary/20' : ''
      }`}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_15px_rgba(0,242,255,0.6)]"></div>
      <label className="block font-label-caps text-primary/70 uppercase mb-stack-sm text-[12px] font-bold tracking-wider">
        Neural Input Prompt
      </label>
      <textarea
        className="w-full bg-transparent border-none focus:ring-0 font-display-lg text-display-lg resize-none placeholder:text-surface-variant min-h-[120px] text-on-surface outline-none"
        placeholder="What happens if..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isLoading}
      />
      <div className="flex flex-wrap items-center gap-4 mt-stack-md pt-stack-md border-t border-primary/10">
        <span className="font-label-caps text-outline text-[10px] tracking-wider font-bold">
          TRY SUGGESTED:
        </span>
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(s)}
            className="font-label-sm text-secondary hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 cursor-pointer bg-transparent border-none p-0 text-[12px]"
            disabled={isLoading}
          >
            "{s}"
          </button>
        ))}
        <div className="ml-auto">
          <button
            onClick={handleRun}
            disabled={isLoading || prompt.trim() === ''}
            className={`flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-lg font-label-md font-bold transition-all active:scale-95 shadow-lg shadow-primary/30 hover:brightness-110 cursor-pointer ${
              isLoading || prompt.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">sync</span>
                Computing...
              </>
            ) : (
              <>
                Run Scenario
                <span className="material-symbols-outlined">bolt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

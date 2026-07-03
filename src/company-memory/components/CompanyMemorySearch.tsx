import React, { useEffect, useRef } from 'react';

interface CompanyMemorySearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CompanyMemorySearch: React.FC<CompanyMemorySearchProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="mt-stack-lg">
      <div className="relative w-full glass-panel p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-primary/60 pointer-events-none">
          <span className="material-symbols-outlined text-3xl">search</span>
        </div>
        <input
          ref={inputRef}
          className="w-full h-16 pl-16 pr-32 bg-surface-container-high/30 border border-primary/20 rounded-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
          id="global-search"
          placeholder="Search institutional memory, past decisions, or market signals..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex gap-2 pointer-events-none">
          <kbd className="px-2 py-1 bg-surface-container-highest border border-outline-variant/30 rounded text-on-surface-variant font-mono text-[10px]">
            CMD
          </kbd>
          <kbd className="px-2 py-1 bg-surface-container-highest border border-outline-variant/30 rounded text-on-surface-variant font-mono text-[10px]">
            K
          </kbd>
        </div>
      </div>
    </section>
  );
};

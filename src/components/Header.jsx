import React from 'react';

export const Header = ({ searchQuery, setSearchQuery, executeDecision, notificationsCount }) => {
  return (
    <header className="fixed top-0 right-0 left-[280px] h-16 bg-background border-b border-outline-variant z-40 flex justify-between items-center px-gutter">
      <div className="flex items-center gap-stack-lg">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg font-label-md text-label-md w-80 focus:ring-1 focus:ring-primary outline-none" 
            placeholder="Search enterprise metrics..." 
            type="text"
          />
        </div>
        <nav className="hidden lg:flex gap-6">
          <button className="text-primary font-bold border-b-2 border-primary pb-1 font-label-sm text-label-sm cursor-pointer">Global View</button>
          <button className="text-secondary hover:text-primary transition-colors font-label-sm text-label-sm cursor-pointer">Market Trends</button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={executeDecision}
          className="px-4 py-2 border border-outline rounded-lg font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer active:scale-[0.98]"
        >
          Execute Decision
        </button>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-secondary hover:text-primary relative cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            )}
          </button>
          <button className="p-2 text-secondary hover:text-primary cursor-pointer">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

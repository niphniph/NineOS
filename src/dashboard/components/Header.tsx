import React from 'react';
import { Button } from './Button';

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onExecuteDecision?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  setSearchQuery,
  onExecuteDecision,
  onNotificationsClick,
  onProfileClick,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchQuery) {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-[280px] h-16 bg-surface-container border-b border-outline-variant z-40 flex justify-between items-center px-gutter">
      <div className="flex items-center gap-stack-lg">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary-fixed-dim">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant text-on-surface rounded-none font-label-md text-label-md w-80 focus:ring-1 focus:ring-primary-fixed-dim outline-none"
            placeholder="Search enterprise data..."
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <nav className="hidden lg:flex gap-6">
          <a
            className="text-primary-fixed-dim font-bold border-b-2 border-primary-fixed-dim pb-1 font-label-sm text-label-sm uppercase tracking-widest"
            href="#global-view"
          >
            Global View
          </a>
          <a
            className="text-on-surface-variant hover:text-primary-fixed-dim transition-colors font-label-sm text-label-sm uppercase tracking-widest"
            href="#market-trends"
          >
            Market Trends
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onExecuteDecision}>
          Execute Decision
        </Button>
        <div className="flex items-center gap-2">
          <button
            onClick={onNotificationsClick}
            className="p-2 text-on-surface-variant hover:text-primary-fixed-dim cursor-pointer bg-transparent border-none outline-none"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            onClick={onProfileClick}
            className="p-2 text-on-surface-variant hover:text-primary-fixed-dim cursor-pointer bg-transparent border-none outline-none"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

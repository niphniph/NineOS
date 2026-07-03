import React from 'react';
import { Button } from './Button';

interface SidebarProps {
  activePage?: string;
  setActivePage?: (page: string) => void;
  onNewSimulation?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage = 'dashboard',
  setActivePage,
  onNewSimulation,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'risk', label: 'Risk Center', icon: 'security' },
    { id: 'memory', label: 'Company Memory', icon: 'database' },
    { id: 'simulator', label: 'Simulator', icon: 'model_training' },
    { id: 'meetings', label: 'Meetings', icon: 'groups' },
    { id: 'integrations', label: 'Integrations', icon: 'settings_input_component' },
  ];

  const handlePageClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    if (setActivePage) {
      setActivePage(pageId);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-surface-container-lowest border-r border-outline-variant flex flex-col py-stack-md px-4 overflow-y-auto z-50">
      <div className="mb-stack-lg px-4">
        <h1 className="font-headline-md text-headline-md font-bold text-primary-fixed-dim tracking-tight">NineOS</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Enterprise Intelligence</p>
      </div>

      <nav className="flex flex-col gap-1 flex-grow">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'nav-active' : 'nav-inactive'}
              onClick={(e) => handlePageClick(e as any, item.id)}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
              >
                {item.icon}
              </span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 pt-stack-md border-t border-outline-variant">
        <Button variant="primary" className="mb-stack-md" onClick={onNewSimulation}>
          New Simulation
        </Button>

        <a
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none"
          href="#support"
          onClick={(e) => handlePageClick(e, 'support')}
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-md text-label-md">Support</span>
        </a>

        <a
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none"
          href="#settings"
          onClick={(e) => handlePageClick(e, 'settings')}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </a>

        <div className="mt-4 px-4 flex items-center gap-3 border-t border-outline-variant pt-4">
          <img
            alt="Nino Rossi"
            className="w-10 h-10 rounded-none bg-surface-dim border border-primary-fixed-dim"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACIA7rsBQI_80Encue8UPkDZ_Xiysvpy7UhiFTRcQ0one5UXYfvytnPoFdDlA1Msw988iHznOmNaBK5qTagps1pTSJdqi4MgoXfDaCRreCLSq5ByVPQTYUUTHta4NOiyo2TD6cAyoHq4HBRWYwLW1YwbOlO5ijpaY7hdgWWmDTH69arf4DcrWB9kmmEVHZWw2yvd6r_CbFRI_UEMA_vR-dCI2EukF7b5AySu190q-4C7hUMIVazm90LDSW1EEZ5I9QubMJiYZ6gKI"
          />
          <div>
            <p className="font-label-md text-label-md font-bold text-primary">Nino Rossi</p>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Chief Executive</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

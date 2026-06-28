import React from 'react';

export const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'risk', label: 'Risk Center', icon: 'security' },
    { id: 'memory', label: 'Company Memory', icon: 'database', disabled: true },
    { id: 'simulator', label: 'Simulator', icon: 'model_training' },
    { id: 'meetings', label: 'Meetings', icon: 'groups', disabled: true },
    { id: 'integrations', label: 'Integrations', icon: 'settings_input_component', disabled: true }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-surface-container-lowest border-r border-outline-variant flex flex-col py-stack-md px-4 overflow-y-auto z-50">
      <div className="mb-stack-lg px-4">
        <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">NineOS</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Enterprise Intelligence</p>
      </div>

      <nav className="flex flex-col gap-1 flex-grow">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-all duration-150 ease-in-out";
          const activeClasses = "bg-secondary-container text-on-secondary-container font-medium scale-[0.98]";
          const inactiveClasses = item.disabled 
            ? "text-secondary opacity-50 cursor-not-allowed" 
            : "text-secondary hover:bg-surface-container-high cursor-pointer";

          return (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => setActivePage(item.id)}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} text-left w-full`}
            >
              <span 
                className="material-symbols-outlined" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 pt-stack-md border-t border-outline-variant">
        <button 
          onClick={() => setActivePage('simulator')}
          className="w-full mb-stack-md py-3 px-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>New Simulation</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-high transition-colors rounded-lg text-left w-full cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-md text-label-md">Support</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-high transition-colors rounded-lg text-left w-full cursor-not-allowed opacity-50">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </button>

        <div className="mt-4 px-4 flex items-center gap-3">
          <img 
            className="w-10 h-10 rounded-full bg-surface-dim object-cover border border-outline-variant" 
            alt="Nino Rossi Portrait" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACIA7rsBQI_80Encue8UPkDZ_Xiysvpy7UhiFTRcQ0one5UXYfvytnPoFdDlA1Msw988iHznOmNaBK5qTagps1pTSJdqi4MgoXfDaCRreCLSq5ByVPQTYUUTHta4NOiyo2TD6cAyoHq4HBRWYwLW1YwbOlO5ijpaY7hdgWWmDTH69arf4DcrWB9kmmEVHZWw2yvd6r_CbFRI_UEMA_vR-dCI2EukF7b5AySu190q-4C7hUMIVazm90LDSW1EEZ5I9QubMJiYZ6gKI"
          />
          <div>
            <p className="font-label-md text-label-md font-bold">Nino Rossi</p>
            <p className="text-[10px] text-on-surface-variant uppercase">Chief Executive</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

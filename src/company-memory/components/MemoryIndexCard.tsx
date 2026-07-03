import React from 'react';

export interface MemoryIndexItem {
  id: string;
  title: string;
  icon: string;
  categoryTag: string;
  categoryTagId: string;
  description: string;
  metaText: string;
  date: string;
  authorAvatars?: string[];
}

interface MemoryIndexCardProps {
  item: MemoryIndexItem;
  onClick?: (id: string) => void;
}

export const MemoryIndexCard: React.FC<MemoryIndexCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(item.id)}
      className="bg-surface-container-lowest/40 border border-outline-variant/30 p-6 rounded-lg group hover:border-primary/50 hover:bg-surface-container-lowest transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded border border-outline-variant/20 group-hover:bg-primary/10 group-hover:border-primary/40 transition-colors duration-200 shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors duration-200">
            {item.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h5 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-200 truncate">
              {item.title}
            </h5>
            <span className="px-2 py-0.5 bg-surface-container-highest/50 border border-outline-variant/20 rounded text-[10px] uppercase font-bold text-on-surface-variant shrink-0">
              {item.categoryTag}
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mb-4">
            {item.description}
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            {item.authorAvatars && item.authorAvatars.length > 0 && (
              <div className="flex -space-x-2 shrink-0">
                {item.authorAvatars.map((url, idx) => (
                  <img
                    key={idx}
                    alt="Author"
                    className="w-6 h-6 rounded-full border-2 border-surface-container-lowest object-cover"
                    src={url}
                  />
                ))}
              </div>
            )}
            <span className="text-on-surface-variant/60 text-label-sm truncate">
              {item.metaText}
            </span>
            <span className="text-on-surface-variant/60 text-label-sm ml-auto flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-xs">calendar_today</span>
              {item.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

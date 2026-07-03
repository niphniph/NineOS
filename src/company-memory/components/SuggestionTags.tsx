import React from 'react';

export interface TagItem {
  id: string;
  name: string;
  icon: string;
}

interface SuggestionTagsProps {
  selectedTag: string;
  onTagClick: (tagId: string) => void;
  tags?: TagItem[];
}

export const SuggestionTags: React.FC<SuggestionTagsProps> = ({
  selectedTag,
  onTagClick,
  tags = [
    { id: 'decisions', name: 'Decisions', icon: 'gavel' },
    { id: 'financials', name: 'Financials', icon: 'monitoring' },
    { id: 'history', name: 'Project History', icon: 'history' },
    { id: 'sentiment', name: 'Customer Sentiment', icon: 'mood' },
  ],
}) => {
  return (
    <div className="flex gap-4 mt-6 flex-wrap">
      {tags.map((tag) => {
        const isSelected = selectedTag === tag.id;
        const activeClass = isSelected
          ? 'bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(0,242,255,0.05)]'
          : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary';

        return (
          <button
            key={tag.id}
            onClick={() => onTagClick(isSelected ? '' : tag.id)}
            className={`flex items-center gap-2 px-5 py-2 border rounded-full transition-all duration-200 cursor-pointer ${activeClass}`}
          >
            <span className="material-symbols-outlined text-lg">{tag.icon}</span>
            <span className="text-label-md font-medium">{tag.name}</span>
          </button>
        );
      })}
    </div>
  );
};

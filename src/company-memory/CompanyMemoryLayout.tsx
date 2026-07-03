import React, { useState } from 'react';
import { CompanyMemorySearch } from './components/CompanyMemorySearch';
import { SuggestionTags } from './components/SuggestionTags';
import { InsightCard, AIInsight } from './components/InsightCard';
import { MemoryIndexCard, MemoryIndexItem } from './components/MemoryIndexCard';

interface CompanyMemoryLayoutProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CompanyMemoryLayout: React.FC<CompanyMemoryLayoutProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('');

  const insights: AIInsight[] = [
    {
      id: 'insight1',
      category: 'Q3 STRATEGY DEBRIEF',
      time: '2 hours ago',
      title: 'Expansion Pivot: APAC Markets',
      description:
        'Executive summary of the decision to defer Tokyo headquarters in favor of a distributed regional hub model in Singapore. Key risks identified in sovereign debt fluctuations.',
      severity: 'primary',
      metadata: [
        { icon: 'attach_file', label: '4 Sources' },
        { icon: 'bolt', label: 'Actionable' },
      ],
    },
    {
      id: 'insight2',
      category: 'M&A ANALYSIS',
      time: 'Yesterday',
      title: 'Acquisition Sentiment: Project Aurora',
      description:
        "Aggregated internal sentiment suggests a 68% confidence rating in the technical integration of Aurora's architecture. Financial synergy projected at 12.4% over 18 months.",
      severity: 'secondary',
      metadata: [
        { icon: 'analytics', label: 'Data Visualized' },
        { icon: 'visibility', label: 'Restricted Access' },
      ],
    },
  ];

  const memoryItems: MemoryIndexItem[] = [
    {
      id: 'mem1',
      title: 'Infrastructure Scalability Post-Mortem (2023)',
      icon: 'description',
      categoryTag: 'Project History',
      categoryTagId: 'history',
      description:
        'A deep dive into the server failure of Q4 2023. Insights include the critical need for regional redundancy in the Northern European grid and the resulting 14% budget reallocation to CloudOps.',
      metaText: 'Primary Authors: Sarah L., James K.',
      date: 'Dec 14, 2023',
      authorAvatars: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQWj7swuPCfMjlSknjTr0ulM8k9q79OdOwU09D_EaheO_e7eT8JIefu_-L0YPLq7pRZ0hAVuZfheCzOEmYlS2c3I4l-nIYqsUsPKUfPSyjOzS89cq0D_7Zzaq2iOodRxvqOK5knyBAgefpYlzyXpPu5x-EN1Oluvd5C6An9JmMlwlmzli9DiADY5qTI1qfNNExHCFKvmqzSU35p6lmx3HiDyImbggxK0o4v3GmIMk4HjtdUVhKIN_tBzJgV6TIra0hgNW1LkbCzY',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBT0kmUu_Agl-2DwTSiHvUGD13Kome8s2lTdlX21A1rxycfcRYOR9HJQzLtsxCseT074mdW1Li-ciHPv7_aWv_EOvSY-tqjbH2hO1AHpcJTTHtqASOmEqn7z0iUW8tpnh3crXq9XLCyfIdCtC7kRyVgH-1jtY3hDBuYSOtc1P_3hxgQ8W7sfDnXV0wF5hQWfNxvSgqOIuKkdgYthx7Q31VKvDbdf2d0jX9M-exE5SIo2i0F6QWqV6xaQcjzmauUMk2j9AYNME6Giyo',
      ],
    },
    {
      id: 'mem2',
      title: 'Q2 Revenue Growth & Retention Attribution',
      icon: 'account_balance',
      categoryTag: 'Financials',
      categoryTagId: 'financials',
      description:
        'Analysis of the 22% YOY growth. Key drivers: Expansion of the Enterprise Tier and the launch of NineOS Memory Insights. Churn reduced by 3.2% in EMEA regions.',
      metaText: 'Finance Department Archive',
      date: 'Jul 02, 2024',
    },
    {
      id: 'mem3',
      title: 'Voice of Customer: Series A Client Feedback',
      icon: 'forum',
      categoryTag: 'Customer Sentiment',
      categoryTagId: 'sentiment',
      description:
        'Semantic clustering of 400+ support tickets reveals a high demand for predictive forecasting tools. Sentiment remains high (8.4/10) but complexity of UI is a cited friction point.',
      metaText: 'AI Agent Sentiment Tracker',
      date: 'Updated Daily',
    },
  ];

  const handleInsightClick = (id: string) => {
    alert(`Opening full briefing document for insight: ${id}`);
  };

  const handleMemoryItemClick = (id: string) => {
    alert(`Retrieving verified company memory nodes for ID: ${id}. Traceability links active.`);
  };

  // Filter memories by tag and search query
  const filteredMemoryItems = memoryItems.filter((item) => {
    const matchesTag = selectedTag === '' || item.categoryTagId === selectedTag;
    const matchesQuery =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="flex-1 overflow-y-auto p-gutter custom-scrollbar">
      <div className="max-w-[1200px] mx-auto space-y-stack-xl">
        {/* Global Search Interface */}
        <CompanyMemorySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Suggestion Tags / Categories */}
        <SuggestionTags selectedTag={selectedTag} onTagClick={setSelectedTag} />

        {/* Intelligence Briefing / Recent Reports */}
        <section className="space-y-stack-md">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-md font-bold flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              Recent Intelligence Reports
            </h3>
            <button
              onClick={() => alert('Opening full reports archive index...')}
              className="text-primary/70 text-label-md hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
            >
              View All Archive
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            {insights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onClick={handleInsightClick}
              />
            ))}
          </div>
        </section>

        {/* Knowledge Repository - Detailed Snippets */}
        <section className="space-y-stack-md">
          <h3 className="text-headline-md font-bold text-on-surface">Memory Index</h3>
          <div className="space-y-4">
            {filteredMemoryItems.length > 0 ? (
              filteredMemoryItems.map((item) => (
                <MemoryIndexCard
                  key={item.id}
                  item={item}
                  onClick={handleMemoryItemClick}
                />
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-outline-variant/30 text-on-surface-variant rounded-lg">
                No matching memory archives found.
              </div>
            )}
          </div>
        </section>
      </div>
      {/* Footer Spacing */}
      <div className="h-stack-xl" />
    </div>
  );
};

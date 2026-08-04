import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  DollarSign,
  PieChart,
  Cpu,
  FileCheck,
  Megaphone,
  ListTodo,
  AlertTriangle,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { getOrCreateBusinessIdea } from '../data/businessIdeas';
import { RoadmapHeader } from '../components/roadmap/RoadmapHeader';
import { TabOverview } from '../components/roadmap/TabOverview';
import { TabFinancials } from '../components/roadmap/TabFinancials';
import { TabMarket } from '../components/roadmap/TabMarket';
import { TabOperations } from '../components/roadmap/TabOperations';
import { TabCompliance } from '../components/roadmap/TabCompliance';
import { TabMarketing } from '../components/roadmap/TabMarketing';
import { TabTimelineChecklist } from '../components/roadmap/TabTimelineChecklist';
import { TabRiskGrowth } from '../components/roadmap/TabRiskGrowth';
import { ExportReportModal } from '../components/roadmap/ExportReportModal';

type ActiveTab =
  | 'overview'
  | 'financials'
  | 'market'
  | 'operations'
  | 'compliance'
  | 'marketing'
  | 'timeline'
  | 'risks';

const TABS: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: '1. Executive Overview', icon: <Sparkles className="h-4 w-4 text-amber-500" /> },
  { id: 'financials', label: '2. Investment & Calculator', icon: <DollarSign className="h-4 w-4 text-emerald-600" /> },
  { id: 'market', label: '3. Market & Competitors', icon: <PieChart className="h-4 w-4 text-indigo-500" /> },
  { id: 'operations', label: '4. Machinery & Suppliers', icon: <Cpu className="h-4 w-4 text-cyan-600" /> },
  { id: 'compliance', label: '5. Licenses & GST', icon: <FileCheck className="h-4 w-4 text-emerald-600" /> },
  { id: 'marketing', label: '6. Marketing & Branding', icon: <Megaphone className="h-4 w-4 text-rose-500" /> },
  { id: 'timeline', label: '7. Launch Checklist', icon: <ListTodo className="h-4 w-4 text-amber-600" /> },
  { id: 'risks', label: '8. Risks & Growth', icon: <AlertTriangle className="h-4 w-4 text-orange-500" /> },
];

export const RoadmapPage: React.FC = () => {
  const { ideaSlug } = useParams<{ ideaSlug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  const [dynamicIdea, setDynamicIdea] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (!ideaSlug) return;
    
    // Attempt synchronous resolution first
    const found = getOrCreateBusinessIdea(ideaSlug);
    if (found) {
      setDynamicIdea(found);
      return;
    }

    // Try generating dynamically if not found
    setIsGenerating(true);
    setErrorMsg(null);
    
    fetch('/api/generate-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ideaSlug.replace(/-/g, ' ') })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setErrorMsg(data.error);
      } else {
        const normalizedSlug = ideaSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        sessionStorage.setItem(`roadmap_${normalizedSlug}`, JSON.stringify(data));
        setDynamicIdea(data);
      }
    })
    .catch(err => {
      setErrorMsg('Failed to connect to the server.');
    })
    .finally(() => {
      setIsGenerating(false);
    });
  }, [ideaSlug]);

  if (!ideaSlug) {
    navigate('/explore');
    return null;
  }

  if (isGenerating) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Generating AI Roadmap...</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
          Analyzing market trends and structuring your business plan. This may take a few seconds.
        </p>
      </div>
    );
  }

  const idea = dynamicIdea;

  if (!idea) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center text-center space-y-4 px-4 py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 mb-2">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Roadmap Not Found
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md font-medium">
          {errorMsg || 'Invalid business idea.'}
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="mt-4 rounded-2xl bg-zinc-900 px-7 py-3 text-sm font-bold text-white shadow-xl transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 active:scale-95 cursor-pointer"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      
      {/* Roadmap Header Card */}
      <RoadmapHeader idea={idea} onOpenExportModal={() => setIsExportModalOpen(true)} />

      {/* Main Roadmap Container with Sidebar Step Tabs & Active Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sticky Sidebar Step Tabs Navigation */}
        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-20 z-10 space-y-1 rounded-2xl border border-zinc-200/80 bg-white p-2.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Roadmap Navigation Steps
          </div>

          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab Content Display */}
        <main className="w-full flex-1 min-w-0">
          {activeTab === 'overview' && <TabOverview idea={idea} />}
          {activeTab === 'financials' && <TabFinancials idea={idea} />}
          {activeTab === 'market' && <TabMarket idea={idea} />}
          {activeTab === 'operations' && <TabOperations idea={idea} />}
          {activeTab === 'compliance' && <TabCompliance idea={idea} />}
          {activeTab === 'marketing' && <TabMarketing idea={idea} />}
          {activeTab === 'timeline' && <TabTimelineChecklist idea={idea} />}
          {activeTab === 'risks' && <TabRiskGrowth idea={idea} />}

          {/* Bottom Step Advancement Control */}
          <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <button
              disabled={activeTab === TABS[0].id}
              onClick={() => {
                const currentIndex = TABS.findIndex((t) => t.id === activeTab);
                if (currentIndex > 0) setActiveTab(TABS[currentIndex - 1].id);
              }}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              Previous Step
            </button>

            <button
              disabled={activeTab === TABS[TABS.length - 1].id}
              onClick={() => {
                const currentIndex = TABS.findIndex((t) => t.id === activeTab);
                if (currentIndex < TABS.length - 1) setActiveTab(TABS[currentIndex + 1].id);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <span>Next Step</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </main>

      </div>

      {/* Export Report Printable Modal */}
      <ExportReportModal
        idea={idea}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

    </div>
  );
};

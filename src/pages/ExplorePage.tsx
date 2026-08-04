import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Plus, Sparkles } from 'lucide-react';
import { BuildoraLogo } from '../components/common/BuildoraLogo';
import { SAMPLE_BUSINESS_IDEAS } from '../data/businessIdeas';
import { IdeaCard } from '../components/common/IdeaCard';
import { BusinessCategory, ComplexityLevel } from '../types';
import { useNavigate } from 'react-router-dom';

const ALL_CATEGORIES: (BusinessCategory | 'All')[] = [
  'All',
  'Manufacturing',
  'FMCG & Consumer Products',
  'Green Tech & Clean Energy',
  'Agro-Tech & Organic',
  'Hardware & Electronics',
  'Artisanal & Crafts',
  'Services & Franchise',
];

export const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'All'>('All');
  const [selectedComplexity, setSelectedComplexity] = useState<ComplexityLevel | 'All'>('All');
  const [sortBy, setSortBy] = useState<'capex-asc' | 'capex-desc' | 'roi' | 'break-even'>('roi');

  const navigate = useNavigate();

  const filteredAndSortedIdeas = SAMPLE_BUSINESS_IDEAS.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    const matchesComplexity = selectedComplexity === 'All' || idea.complexity === selectedComplexity;

    return matchesSearch && matchesCategory && matchesComplexity;
  }).sort((a, b) => {
    if (sortBy === 'capex-asc') return a.initialCapitalUSD - b.initialCapitalUSD;
    if (sortBy === 'capex-desc') return b.initialCapitalUSD - a.initialCapitalUSD;
    if (sortBy === 'roi') return b.roiPercentage12M - a.roiPercentage12M;
    if (sortBy === 'break-even') return a.breakEvenMonth - b.breakEvenMonth;
    return 0;
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/roadmap/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <BuildoraLogo size={28} />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
              }}
            >
              Browse Business Idea Directory
            </span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Filter curated templates or search for any custom product to generate an instant roadmap.
          </p>
        </div>

        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search or enter custom product..."
            className="rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-700 dark:border-zinc-800 dark:bg-black dark:text-white dark:placeholder-zinc-400"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-95"
            style={{
              background: 'linear-gradient(90deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
            }}
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>Generate</span>
          </button>
        </form>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Complexity & Sort Selects */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value as any)}
              className="rounded-lg border border-zinc-200 bg-white py-1.5 px-2.5 font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              <option value="All">All Complexity</option>
              <option value="Low">Low Complexity</option>
              <option value="Medium">Medium Complexity</option>
              <option value="High">High Complexity</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-zinc-200 bg-white py-1.5 px-2.5 font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              <option value="roi">Sort by ROI % (Highest)</option>
              <option value="capex-asc">Sort by CapEx (Lowest)</option>
              <option value="capex-desc">Sort by CapEx (Highest)</option>
              <option value="break-even">Sort by Break-Even (Fastest)</option>
            </select>
          </div>
        </div>

      </div>

      {/* Ideas Grid */}
      {filteredAndSortedIdeas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        /* Empty / Custom Query Fallback Card */
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50/50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50 space-y-4 max-w-xl mx-auto">
          <Sparkles className="mx-auto h-8 w-8 text-amber-500" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            No pre-built templates for "{searchTerm}"
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            No problem! Buildora can generate a custom feasibility roadmap tailored specifically to <strong>"{searchTerm}"</strong> right now.
          </p>
          <button
            onClick={() => navigate(`/roadmap/${encodeURIComponent(searchTerm.trim())}`)}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:opacity-95 active:scale-95"
            style={{
              background: 'linear-gradient(90deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)',
            }}
          >
            <Plus className="h-4 w-4" />
            <span>Generate Roadmap for "{searchTerm}"</span>
          </button>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Compass, ArrowRight, ShieldCheck, Cpu, DollarSign, ListTodo, Layers, Zap } from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { IdeaCard } from '../components/common/IdeaCard';
import { SAMPLE_BUSINESS_IDEAS } from '../data/businessIdeas';
import { BusinessCategory } from '../types';

const CATEGORIES: { name: BusinessCategory | 'All'; icon: string }[] = [
  { name: 'All', icon: '✨' },
  { name: 'Manufacturing', icon: '🏭' },
  { name: 'FMCG & Consumer Products', icon: '🧃' },
  { name: 'Green Tech & Clean Energy', icon: '🌱' },
  { name: 'Agro-Tech & Organic', icon: '🚜' },
  { name: 'Hardware & Electronics', icon: '⚡' },
  { name: 'Artisanal & Crafts', icon: '🎨' },
];

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'All'>('All');
  const navigate = useNavigate();

  const filteredIdeas = SAMPLE_BUSINESS_IDEAS.filter((idea) => {
    if (selectedCategory === 'All') return true;
    return idea.category === selectedCategory;
  });

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-100/90 via-zinc-50 to-white px-6 py-16 text-center dark:from-black dark:via-black dark:to-black border border-zinc-200/60 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl space-y-6">

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100 leading-tight">
            Turn Any Product Idea Into a <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #AB51EF 0%, #E6489D 50%, #687CEF 100%)' }}>Complete Business Roadmap</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Get instant, realistic mock metrics for CapEx investment, machinery, raw material suppliers, government licenses, GST codes, and a 6-month launch timeline.
          </p>

          {/* Main Search Bar */}
          <div className="pt-2">
            <SearchBar size="large" />
          </div>

          {/* Category Filter Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Quick Stats Metrics Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
            <DollarSign className="h-5 w-5" />
            <span>CapEx & OpEx</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Detailed cost breakdowns and break-even calculations</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
            <Cpu className="h-5 w-5" />
            <span>Machinery & Suppliers</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Equipment specs, MOQ, and supplier directories</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-lg">
            <ShieldCheck className="h-5 w-5" />
            <span>Licenses & GST</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Statutory permits, GST rates, and trademark guidance</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-lg">
            <ListTodo className="h-5 w-5" />
            <span>Launch Checklist</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">6-month phased task lists with progress tracking</p>
        </div>
      </section>

      {/* Featured Business Ideas Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>Trending Business Feasibility Models</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Select any curated business idea to explore its complete step-by-step roadmap.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400 transition-colors"
          >
            <span>View All Ideas ({SAMPLE_BUSINESS_IDEAS.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.slice(0, 6).map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="rounded-3xl border border-zinc-200/80 bg-zinc-900 text-white p-8 sm:p-12 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            How Buildora Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">
            From Raw Concept to Execution Plan in Seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-emerald-400 font-bold text-lg border border-zinc-700">
              1
            </div>
            <h3 className="font-bold text-base">Search or Browse</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Type any custom product or select from trending categories in manufacturing, tech, or organic goods.
            </p>
          </div>

          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-amber-400 font-bold text-lg border border-zinc-700">
              2
            </div>
            <h3 className="font-bold text-base">Generate Feasibility Plan</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Access comprehensive data on machines, suppliers, licenses, profit projections, and marketing channels.
            </p>
          </div>

          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-indigo-400 font-bold text-lg border border-zinc-700">
              3
            </div>
            <h3 className="font-bold text-base">Simulate & Execute</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tweak sales volume sliders in the interactive ROI calculator and check off tasks in your launch checklist.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

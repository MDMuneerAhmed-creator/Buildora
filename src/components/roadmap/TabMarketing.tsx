import React from 'react';
import { Megaphone, Sparkles, Tag, Users, TrendingUp, BarChart2 } from 'lucide-react';
import { BusinessIdea } from '../../types';
import { useRoadmap } from '../../context/RoadmapContext';
import { formatCurrency } from '../../utils/formatters';

interface TabMarketingProps {
  idea: BusinessIdea;
}

export const TabMarketing: React.FC<TabMarketingProps> = ({ idea }) => {
  const { currency } = useRoadmap();

  return (
    <div className="space-y-8">
      
      {/* CAC vs LTV Economics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Est. Customer Acquisition Cost (CAC)
          </span>
          <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">
            {formatCurrency(idea.cacUSD, currency)}
          </div>
          <p className="text-xs text-zinc-500 mt-1">Blended digital ad & sales outreach spend per customer</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Est. Customer Lifetime Value (LTV)
          </span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(idea.ltvUSD, currency)}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            LTV:CAC Ratio = <strong className="text-emerald-600 font-bold">{(idea.ltvUSD / (idea.cacUSD || 1)).toFixed(1)}x</strong> (Healthy SaaS/D2C target)
          </p>
        </div>
      </div>

      {/* Suggested Brand Taglines */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span>Brand Identity & Suggested Taglines</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {idea.suggestedTaglines.map((tagline, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-zinc-50 p-3.5 border border-zinc-100 dark:bg-zinc-800/50 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 italic"
            >
              "{tagline}"
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Go-To-Market Channels */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
            <Megaphone className="h-5 w-5 text-indigo-600" />
            <span>Primary Customer Acquisition Channels</span>
          </h2>
          <ul className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
            {idea.primaryChannels.map((channel, idx) => (
              <li key={idx} className="flex items-start gap-2.5 rounded-lg bg-zinc-50 p-2.5 dark:bg-zinc-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {idx + 1}
                </span>
                <span>{channel}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Launch Tactics */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span>Growth & Launch Campaign Tactics</span>
          </h2>
          <ul className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
            {idea.launchTactics.map((tactic, idx) => (
              <li key={idx} className="flex items-start gap-2.5 rounded-lg bg-zinc-50 p-2.5 dark:bg-zinc-800/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  ✓
                </span>
                <span>{tactic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { Target, Sparkles, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';
import { BusinessIdea } from '../../types';

interface TabOverviewProps {
  idea: BusinessIdea;
}

export const TabOverview: React.FC<TabOverviewProps> = ({ idea }) => {
  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2>Executive Business Summary</h2>
        </div>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {idea.shortDescription}
        </p>

        {/* UVP Box */}
        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Unique Value Proposition (UVP)
          </span>
          <p className="mt-1 text-sm font-semibold text-emerald-950 dark:text-emerald-200">
            "{idea.uniqueValueProp}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Audience Persona */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <Target className="h-5 w-5 text-indigo-500" />
            <h2>Target Customer Personas</h2>
          </div>
          <ul className="mt-4 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
            {idea.targetAudience.map((audience, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Industry Trends */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h2>Industry Market Drivers</h2>
          </div>
          <ul className="mt-4 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
            {idea.industryTrends.map((trend, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {idx + 1}
                </span>
                <span>{trend}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

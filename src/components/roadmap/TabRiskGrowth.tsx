import React from 'react';
import { ShieldAlert, TrendingUp, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { BusinessIdea, RiskFactor } from '../../types';

interface TabRiskGrowthProps {
  idea: BusinessIdea;
}

export const TabRiskGrowth: React.FC<TabRiskGrowthProps> = ({ idea }) => {
  return (
    <div className="space-y-8">
      
      {/* Risk Analysis Matrix */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span>Operational & Financial Risk Assessment Matrix</span>
        </h2>

        <div className="space-y-4">
          {idea.risks.map((risk, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {risk.title}
                  </span>
                  <span className="rounded-md bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                    {risk.category}
                  </span>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    risk.severity === 'High'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : risk.severity === 'Medium'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {risk.severity} Risk
                </span>
              </div>

              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {risk.description}
              </p>

              <div className="mt-3 rounded-lg bg-emerald-50/80 border border-emerald-100/80 p-3 dark:bg-emerald-950/40 dark:border-emerald-900/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-0.5">
                  Actionable Mitigation Strategy
                </span>
                <p className="text-xs font-medium text-emerald-950 dark:text-emerald-200">
                  {risk.mitigationStrategy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Phase Expansion Strategy */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          <span>Long-Term Growth & Scale Roadmap</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {idea.growthMilestones.map((m, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  {m.phase}
                </span>
                <span className="text-xs text-zinc-400 font-semibold">{m.timeline}</span>
                <p className="mt-3 text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {m.objective}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

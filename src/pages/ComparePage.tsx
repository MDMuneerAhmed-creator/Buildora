import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Trash2, ArrowRight, Plus, Sparkles, Check } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { getOrCreateBusinessIdea, SAMPLE_BUSINESS_IDEAS } from '../data/businessIdeas';
import { formatCurrency } from '../utils/formatters';

export const ComparePage: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, currency } = useRoadmap();
  const navigate = useNavigate();

  const comparedIdeas = compareList.map((id) => getOrCreateBusinessIdea(id));

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Scale className="h-6 w-6 text-indigo-600" />
            <span>Business Idea Comparison Matrix</span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Compare investment capital, profit margins, machinery needs, and break-even timelines side-by-side.
          </p>
        </div>

        {comparedIdeas.length > 0 && (
          <button
            onClick={clearCompare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Matrix</span>
          </button>
        )}
      </div>

      {/* Add Idea Picker if less than 3 compared */}
      {comparedIdeas.length < 3 && (
        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-between gap-4 text-xs">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            Select ideas to add to comparison ({comparedIdeas.length}/3 selected):
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_BUSINESS_IDEAS.filter((i) => !compareList.includes(i.id))
              .slice(0, 4)
              .map((idea) => (
                <button
                  key={idea.id}
                  onClick={() => toggleCompare(idea.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  <Plus className="h-3 w-3 text-emerald-600" />
                  <span>{idea.title}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Comparison Matrix */}
      {comparedIdeas.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-100">
                <th className="p-4 font-bold min-w-[160px]">Metric</th>
                {comparedIdeas.map((idea) => (
                  <th key={idea.id} className="p-4 font-bold min-w-[220px]">
                    <div className="flex items-center justify-between">
                      <Link to={`/roadmap/${idea.slug}`} className="hover:text-emerald-600 line-clamp-1">
                        {idea.title}
                      </Link>
                      <button
                        onClick={() => toggleCompare(idea.id)}
                        className="text-zinc-400 hover:text-rose-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              
              <tr>
                <td className="p-4 font-bold text-zinc-500">Category</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">
                    {i.category}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">Initial CapEx</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                    {formatCurrency(i.initialCapitalUSD, currency)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">Monthly OpEx</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">
                    {formatCurrency(i.monthlyOpExUSD, currency)}/mo
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">12M ROI %</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    +{i.roiPercentage12M}%
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">Break-Even Month</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">
                    Month {i.breakEvenMonth}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">Complexity Level</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">
                    {i.complexity}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">Machinery Units</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 text-zinc-700 dark:text-zinc-300">
                    {i.machines.length} Equipment Units
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">Statutory Licenses</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4 text-zinc-700 dark:text-zinc-300">
                    {i.licenses.length} Permits
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-zinc-500">Action</td>
                {comparedIdeas.map((i) => (
                  <td key={i.id} className="p-4">
                    <Link
                      to={`/roadmap/${i.slug}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      <span>Open Roadmap</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50/50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50 space-y-4 max-w-md mx-auto">
          <Scale className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            No Ideas Selected for Comparison
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Click the compare scale icon on any business card to compare up to 3 business ideas side-by-side.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <span>Browse Ideas</span>
          </Link>
        </div>
      )}

    </div>
  );
};

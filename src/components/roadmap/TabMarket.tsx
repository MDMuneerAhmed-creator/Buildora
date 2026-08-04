import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Globe, Users, Award, Shield, DollarSign } from 'lucide-react';
import { BusinessIdea } from '../../types';

interface TabMarketProps {
  idea: BusinessIdea;
}

export const TabMarket: React.FC<TabMarketProps> = ({ idea }) => {
  return (
    <div className="space-y-8">
      {/* TAM / SAM / SOM Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <Globe className="h-4 w-4 text-indigo-500" />
            <span>TAM (Total Market)</span>
          </div>
          <div className="mt-2 text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
            {idea.tamSize}
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">Global market potential</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <Users className="h-4 w-4 text-emerald-500" />
            <span>SAM (Serviceable)</span>
          </div>
          <div className="mt-2 text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
            {idea.samSize}
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">Direct regional target segment</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <Award className="h-4 w-4 text-amber-500" />
            <span>SOM (Obtainable)</span>
          </div>
          <div className="mt-2 text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
            {idea.somSize}
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">Year 2 realistic target reach</p>
        </div>
      </div>

      {/* Demand Growth Index Chart */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              5-Year Consumer Demand Index Trend
            </h2>
            <p className="text-xs text-zinc-500">
              Annual growth velocity with projected CAGR of <strong className="text-emerald-600">{idea.cagrGrowthRate}</strong>.
            </p>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={idea.demandTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px' }}
              />
              <Line
                type="monotone"
                dataKey="index"
                name="Demand Index"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5, fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitors Overview Table */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs overflow-x-auto">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Competitor Landscape & Market Moat
        </h2>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50">
              <th className="p-3 font-semibold">Competitor</th>
              <th className="p-3 font-semibold">Market Share</th>
              <th className="p-3 font-semibold">Price Positioning</th>
              <th className="p-3 font-semibold">Key Strengths</th>
              <th className="p-3 font-semibold">Vulnerabilities (Our Moat)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {idea.competitors.map((comp, idx) => (
              <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">
                  {comp.name}
                </td>
                <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300">
                  {comp.marketShare}
                </td>
                <td className="p-3">
                  <span className="inline-flex rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    {comp.pricePoint}
                  </span>
                </td>
                <td className="p-3 text-zinc-600 dark:text-zinc-400 max-w-xs">
                  {comp.strengths}
                </td>
                <td className="p-3 text-rose-600 dark:text-rose-400 font-medium max-w-xs">
                  {comp.weaknesses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

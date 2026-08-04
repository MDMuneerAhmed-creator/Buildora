import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { DollarSign, Sliders, TrendingUp, Calculator, PieChart, Layers } from 'lucide-react';
import { BusinessIdea } from '../../types';
import { useRoadmap } from '../../context/RoadmapContext';
import { formatCurrency } from '../../utils/formatters';

interface TabFinancialsProps {
  idea: BusinessIdea;
}

export const TabFinancials: React.FC<TabFinancialsProps> = ({ idea }) => {
  const { currency } = useRoadmap();

  // Interactive Simulator state
  const baseUnits = 3000;
  const basePriceUSD = Math.round(idea.estimatedMonthlyRevenueUSD / baseUnits);
  
  const [units, setUnits] = useState<number>(baseUnits);
  const [priceUSD, setPriceUSD] = useState<number>(basePriceUSD > 0 ? basePriceUSD : 10);
  const [unitCostUSD, setUnitCostUSD] = useState<number>(Math.round((basePriceUSD || 10) * 0.4));

  // Calculated custom simulator metrics
  const simMonthlyRevenueUSD = units * priceUSD;
  const simMonthlyRawMatCostUSD = units * unitCostUSD;
  const simFixedOpExUSD = idea.monthlyOpExUSD * 0.6; // Fixed portion (rent, core staff)
  const simTotalOpExUSD = simFixedOpExUSD + simMonthlyRawMatCostUSD;
  const simMonthlyNetProfitUSD = simMonthlyRevenueUSD - simTotalOpExUSD;
  const simProfitMarginPercent = simMonthlyRevenueUSD > 0 ? Math.round((simMonthlyNetProfitUSD / simMonthlyRevenueUSD) * 100) : 0;
  const simMonthsToPayback = simMonthlyNetProfitUSD > 0 ? Math.ceil(idea.initialCapitalUSD / simMonthlyNetProfitUSD) : 99;

  // Chart data formatted with currency conversion
  const formattedChartData = idea.monthlyFinancialProjections.map((item) => ({
    month: item.month,
    Revenue: item.revenueUSD,
    Expenses: item.expensesUSD,
    NetProfit: item.netProfitUSD,
  }));

  return (
    <div className="space-y-8">
      
      {/* 12-Month Projection Chart */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              12-Month Financial Projection Model
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Projected monthly cash flow from initial launch to scale.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
              <span className="h-3 w-3 rounded-full bg-emerald-500" /> Revenue
            </span>
            <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
              <span className="h-3 w-3 rounded-full bg-zinc-400" /> Expenses
            </span>
            <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
              <span className="h-3 w-3 rounded-full bg-indigo-600" /> Net Profit
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis
                tickLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value, currency), '']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px' }}
              />
              <Bar dataKey="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#a1a1aa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Financial Simulator */}
      <div className="rounded-2xl border border-zinc-900/10 bg-zinc-900 text-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-base">
          <Calculator className="h-5 w-5" />
          <h2>Interactive Profitability Simulator</h2>
        </div>
        <p className="text-xs text-zinc-400 mb-6">
          Adjust monthly production volume and selling price to see real-time ROI and net monthly income.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Slider 1: Monthly Units */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Monthly Units Volume</span>
              <span className="text-emerald-400">{units.toLocaleString()} pcs</span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              step="250"
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Slider 2: Sale Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Selling Price / Unit</span>
              <span className="text-emerald-400">{formatCurrency(priceUSD, currency)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              step="1"
              value={priceUSD}
              onChange={(e) => setPriceUSD(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Slider 3: Unit Cost */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Unit Production Cost</span>
              <span className="text-amber-400">{formatCurrency(unitCostUSD, currency)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="100"
              step="0.5"
              value={unitCostUSD}
              onChange={(e) => setUnitCostUSD(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Results Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl bg-zinc-800/80 p-4 border border-zinc-700/60">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Projected Revenue
            </span>
            <div className="text-base font-bold text-white mt-1">
              {formatCurrency(simMonthlyRevenueUSD, currency)}/mo
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Total Expenses
            </span>
            <div className="text-base font-bold text-zinc-300 mt-1">
              {formatCurrency(simTotalOpExUSD, currency)}/mo
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Simulated Net Profit
            </span>
            <div className={`text-base font-bold mt-1 ${simMonthlyNetProfitUSD >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatCurrency(simMonthlyNetProfitUSD, currency)}/mo
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Estimated Payback
            </span>
            <div className="text-base font-bold text-amber-300 mt-1">
              {simMonthsToPayback > 60 ? 'N/A (Loss)' : `${simMonthsToPayback} months`}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Tables (CapEx & OpEx) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CapEx Breakdown Table */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between mb-4">
            <span>Capital Expenditure (CapEx) Breakdown</span>
            <span className="text-xs font-extrabold text-emerald-600">
              {formatCurrency(idea.initialCapitalUSD, currency)}
            </span>
          </h3>

          <div className="divide-y divide-zinc-100 text-xs dark:divide-zinc-800">
            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Machinery & Equipment</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(idea.machines.reduce((sum, m) => sum + m.estimatedCostUSD, 0), currency)}
              </span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Government Licenses & Permits</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(idea.licenses.reduce((sum, l) => sum + l.estimatedCostUSD, 0), currency)}
              </span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Facility Advance Lease Deposit</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.round(idea.initialCapitalUSD * 0.15), currency)}
              </span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Initial Raw Material & Packaging Stock</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.round(idea.initialCapitalUSD * 0.18), currency)}
              </span>
            </div>

            <div className="py-2 flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
              <span>Working Capital Buffer (3 Months)</span>
              <span>
                {formatCurrency(Math.round(idea.initialCapitalUSD * 0.22), currency)}
              </span>
            </div>
          </div>
        </div>

        {/* OpEx Monthly Breakdown */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between mb-4">
            <span>Estimated Monthly OpEx</span>
            <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(idea.monthlyOpExUSD, currency)}/mo
            </span>
          </h3>

          <div className="divide-y divide-zinc-100 text-xs dark:divide-zinc-800">
            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Facility Rent & Utilities (3-Phase Power)</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.round(idea.monthlyOpExUSD * 0.25), currency)}
              </span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Operational Staff & Skilled Labor Wages</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.round(idea.monthlyOpExUSD * 0.35), currency)}
              </span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Recurring Raw Material Supplies</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.round(idea.monthlyOpExUSD * 0.25), currency)}
              </span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Digital Marketing & Client Acquisition</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.round(idea.monthlyOpExUSD * 0.15), currency)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

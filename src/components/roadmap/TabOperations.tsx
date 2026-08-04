import React from 'react';
import { Cpu, Package, Truck, CheckCircle2, ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import { BusinessIdea } from '../../types';
import { useRoadmap } from '../../context/RoadmapContext';
import { formatCurrency } from '../../utils/formatters';

interface TabOperationsProps {
  idea: BusinessIdea;
}

export const TabOperations: React.FC<TabOperationsProps> = ({ idea }) => {
  const { currency } = useRoadmap();

  return (
    <div className="space-y-8">
      
      {/* Machinery Section */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-600" />
            <span>Required Machinery & Production Equipment</span>
          </h2>
          <span className="text-xs font-semibold text-zinc-500">
            {idea.machines.length} Equipment Units
          </span>
        </div>

        <div className="space-y-3">
          {idea.machines.map((machine) => (
            <div
              key={machine.id}
              className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {machine.name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      machine.essentialLevel === 'Mandatory'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200'
                    }`}
                  >
                    {machine.essentialLevel}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {machine.purpose}
                </p>
                <div className="text-[11px] text-zinc-500 font-mono">
                  Spec: {machine.specifications}
                </div>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <div className="text-xs text-zinc-400 uppercase font-semibold">Est. Cost</div>
                <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(machine.estimatedCostUSD, currency)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw Materials Section */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-emerald-600" />
          <span>Raw Materials & Components Required</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50">
                <th className="p-3 font-semibold">Material Name</th>
                <th className="p-3 font-semibold">Unit</th>
                <th className="p-3 font-semibold">Unit Cost</th>
                <th className="p-3 font-semibold">Monthly Demand</th>
                <th className="p-3 font-semibold">Estimated Monthly Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {idea.rawMaterials.map((mat) => {
                const monthlyCostUSD = mat.unitCostUSD * mat.monthlyQuantityNeeded;
                return (
                  <tr key={mat.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">
                      {mat.name}
                    </td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-400">{mat.unit}</td>
                    <td className="p-3 font-semibold text-zinc-800 dark:text-zinc-200">
                      {formatCurrency(mat.unitCostUSD, currency)}
                    </td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-400">
                      {mat.monthlyQuantityNeeded.toLocaleString()} {mat.unit}s
                    </td>
                    <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(monthlyCostUSD, currency)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vetted Suppliers Directory */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
          <Truck className="h-5 w-5 text-amber-500" />
          <span>Vetted Supplier Directory (Sample Mock Data)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {idea.suppliers.map((sup) => (
            <div
              key={sup.id}
              className="rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {sup.companyName}
                  </span>
                  {sup.certified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-950/60 dark:text-emerald-300">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-1">{sup.location}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-zinc-50 p-2.5 rounded-lg dark:bg-zinc-900">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-semibold block uppercase">MOQ</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{sup.moq}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Lead Time</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{sup.leadTimeDays} days</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="font-mono text-[11px]">{sup.contactEmailMock}</span>
                </span>
                <span className="font-bold text-amber-500">★ {sup.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Packaging & Logistics Box */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          Packaging Specs & Eco Rating
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl bg-zinc-50 p-3.5 dark:bg-zinc-800/50">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Material Type</span>
            <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">
              {idea.packagingDetails.materialType}
            </p>
          </div>
          <div className="rounded-xl bg-zinc-50 p-3.5 dark:bg-zinc-800/50">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Cost / Unit</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {formatCurrency(idea.packagingDetails.costPerUnitUSD, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-zinc-50 p-3.5 dark:bg-zinc-800/50">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Sustainability Grade</span>
            <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">
              Grade {idea.packagingDetails.sustainabilityGrade}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

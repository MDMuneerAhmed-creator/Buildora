import React from 'react';
import { ShieldCheck, FileCheck, Landmark, Receipt, Sparkles, Clock } from 'lucide-react';
import { BusinessIdea } from '../../types';
import { useRoadmap } from '../../context/RoadmapContext';
import { formatCurrency } from '../../utils/formatters';

interface TabComplianceProps {
  idea: BusinessIdea;
}

export const TabCompliance: React.FC<TabComplianceProps> = ({ idea }) => {
  const { currency } = useRoadmap();

  return (
    <div className="space-y-8">
      
      {/* Required Licenses & Statutory Registrations */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
          <FileCheck className="h-5 w-5 text-emerald-600" />
          <span>Statutory Licenses & Legal Permits Required</span>
        </h2>

        <div className="space-y-4">
          {idea.licenses.map((lic, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {lic.title}
                  </span>
                  {lic.mandatory ? (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      Mandatory
                    </span>
                  ) : (
                    <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                      Optional
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    {lic.timelineDays} days
                  </span>
                  <span className="text-emerald-600 font-extrabold dark:text-emerald-400">
                    {formatCurrency(lic.estimatedCostUSD, currency)}
                  </span>
                </div>
              </div>

              <div className="mt-1 text-xs text-zinc-500 font-medium">
                Issuing Authority: <strong className="text-zinc-700 dark:text-zinc-300">{lic.issuingAuthority}</strong>
              </div>

              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {lic.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GST & Taxation Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* GST / Sales Tax Box */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base mb-3">
            <Receipt className="h-5 w-5 text-indigo-600" />
            <h3>Tax Classification (GST / Sales Tax)</h3>
          </div>
          <div className="rounded-xl bg-indigo-50/60 border border-indigo-100 p-4 dark:bg-indigo-950/30 dark:border-indigo-900/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
              Tax Rate & HSN Code
            </span>
            <p className="mt-1 text-sm font-extrabold text-indigo-950 dark:text-indigo-200">
              {idea.gstTaxRate}
            </p>
          </div>
          <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
            All registered commercial manufacturing and trading entities must maintain quarterly GST return filing (GSTR-1 & GSTR-3B) with input tax credit (ITC) reconciliation.
          </p>
        </div>

        {/* Trademark Classification */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base mb-3">
            <ShieldCheck className="h-5 w-5 text-amber-500" />
            <h3>Brand Trademark Protection</h3>
          </div>
          <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-4 dark:bg-amber-950/30 dark:border-amber-900/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Recommended Trademark Class
            </span>
            <p className="mt-1 text-sm font-extrabold text-amber-950 dark:text-amber-200">
              {idea.trademarkClass}
            </p>
          </div>
          <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
            Apply for TM status prior to launching public digital marketing campaigns to prevent brand squatting and legal infringement.
          </p>
        </div>

      </div>

    </div>
  );
};

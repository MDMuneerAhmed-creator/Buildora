import React, { useRef } from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BusinessIdea } from '../../types';
import { useRoadmap } from '../../context/RoadmapContext';
import { formatCurrency } from '../../utils/formatters';

interface ExportReportModalProps {
  idea: BusinessIdea;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ idea, isOpen, onClose }) => {
  const { currency } = useRoadmap();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(idea, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${idea.slug}-roadmap.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Business Feasibility Report
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print PDF</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div ref={printRef} className="py-6 space-y-6 text-zinc-900 dark:text-zinc-100">
          
          <div className="border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Buildora • Feasibility Dossier
            </span>
            <h1 className="text-2xl font-black mt-1">{idea.title}</h1>
            <p className="text-xs text-zinc-500 mt-1">{idea.tagline}</p>
          </div>

          {/* Financials Summary */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Financial Highlights
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl dark:bg-zinc-800/50 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 font-semibold block uppercase">CapEx</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">{formatCurrency(idea.initialCapitalUSD, currency)}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-semibold block uppercase">OpEx/mo</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">{formatCurrency(idea.monthlyOpExUSD, currency)}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Breakeven</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">Month {idea.breakEvenMonth}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-semibold block uppercase">12M ROI</span>
                <span className="font-extrabold text-emerald-600">+{idea.roiPercentage12M}%</span>
              </div>
            </div>
          </div>

          {/* UVP & Summary */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Value Proposition
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40">
              "{idea.uniqueValueProp}"
            </p>
          </div>

          {/* Key Equipment */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Core Equipment Required
            </h3>
            <ul className="divide-y divide-zinc-100 text-xs dark:divide-zinc-800">
              {idea.machines.map((m) => (
                <li key={m.id} className="py-2 flex justify-between">
                  <div>
                    <span className="font-bold">{m.name}</span>
                    <span className="text-[10px] text-zinc-500 block">{m.purpose}</span>
                  </div>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(m.estimatedCostUSD, currency)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Licenses */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Statutory Licenses
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {idea.licenses.map((lic, idx) => (
                <span key={idx} className="bg-zinc-100 px-3 py-1 rounded-md dark:bg-zinc-800 font-medium">
                  {lic.title} ({lic.timelineDays} days)
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

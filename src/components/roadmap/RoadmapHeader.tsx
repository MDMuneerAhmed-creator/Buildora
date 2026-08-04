import React, { useState } from 'react';
import { Bookmark, Scale, Share2, Sparkles, ArrowLeft, Check, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BusinessIdea } from '../../types';
import { CategoryBadge, ComplexityBadge } from '../common/Badge';
import { useRoadmap } from '../../context/RoadmapContext';
import { formatCurrency } from '../../utils/formatters';
import { getIdeaHeroImage, handleImageError } from '../../utils/imageUtils';

interface RoadmapHeaderProps {
  idea: BusinessIdea;
  onOpenExportModal: () => void;
}

export const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({ idea, onOpenExportModal }) => {
  const { currency, isIdeaSaved, toggleSaveIdea, isIdeaInCompare, toggleCompare } = useRoadmap();
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const saved = isIdeaSaved(idea.id);
  const compared = isIdeaInCompare(idea.id);
  const heroImageUrl = getIdeaHeroImage(idea);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all">
      {/* Hero Header Image Banner */}
      <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {!imageLoaded && (
          <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-zinc-400 dark:text-zinc-600 animate-spin" />
          </div>
        )}
        <img
          src={heroImageUrl}
          alt={idea.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true);
            handleImageError(e, idea.title, idea.category);
          }}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Back Link Floating */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-all shadow-md hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #C084FC 40%, #E11D48 100%)',
            }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Browse Ideas</span>
          </Link>
        </div>

        {/* Floating Category & Complexity Badges */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-2">
          <div className="backdrop-blur-md bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 shadow-sm">
            <CategoryBadge category={idea.category} />
          </div>
          <div className="backdrop-blur-md bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 shadow-sm">
            <ComplexityBadge level={idea.complexity} />
          </div>
        </div>

        {/* Bottom Banner Title */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md bg-black/40 px-2 py-0.5 rounded border border-emerald-500/30">
            Execution Dossier & Feasibility
          </span>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white mt-1 line-clamp-1">
            {idea.title}
          </h1>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Tagline & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <p className="max-w-3xl text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {idea.tagline}
          </p>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => toggleCompare(idea.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                compared
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <Scale className="h-4 w-4" />
              <span>{compared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleSaveIdea(idea.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                saved
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>{saved ? 'Saved' : 'Save Roadmap'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Financial Overview Metrics Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800/80">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Initial CapEx
            </span>
            <div className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(idea.initialCapitalUSD, currency)}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Est. Monthly OpEx
            </span>
            <div className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(idea.monthlyOpExUSD, currency)}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Monthly Rev (Target)
            </span>
            <div className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(idea.estimatedMonthlyRevenueUSD, currency)}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              12M ROI %
            </span>
            <div className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
              +{idea.roiPercentage12M}% (Breakeven: M{idea.breakEvenMonth})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

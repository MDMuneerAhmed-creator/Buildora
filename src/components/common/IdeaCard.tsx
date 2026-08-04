import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Scale, TrendingUp, Sparkles } from 'lucide-react';
import { BusinessIdea } from '../../types';
import { CategoryBadge, ComplexityBadge } from './Badge';
import { useRoadmap } from '../../context/RoadmapContext';
import { formatCurrency } from '../../utils/formatters';
import { getIdeaHeroImage, handleImageError } from '../../utils/imageUtils';

interface IdeaCardProps {
  idea: BusinessIdea;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { currency, isIdeaSaved, toggleSaveIdea, isIdeaInCompare, toggleCompare } = useRoadmap();
  const [imageLoaded, setImageLoaded] = useState(false);
  const saved = isIdeaSaved(idea.id);
  const compared = isIdeaInCompare(idea.id);
  const heroImageUrl = getIdeaHeroImage(idea);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700 transition-all duration-300">
      <div>
        {/* Hero Image Container (16:9 aspect ratio with zoom & skeleton) */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {/* Skeleton Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-zinc-400 dark:text-zinc-600 animate-spin" />
            </div>
          )}

          {/* Hero Image */}
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
            className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none" />

          {/* Top Floating Glass Badges */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
            <div className="backdrop-blur-md bg-black/50 border border-white/20 rounded-lg px-2 py-1 shadow-sm">
              <CategoryBadge category={idea.category} />
            </div>
            <div className="backdrop-blur-md bg-black/50 border border-white/20 rounded-lg px-2 py-1 shadow-sm">
              <ComplexityBadge level={idea.complexity} />
            </div>
          </div>

          {/* Top Floating Quick Actions */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompare(idea.id);
              }}
              title={compared ? 'Remove from comparison' : 'Add to comparison'}
              className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md border transition-all shadow-sm ${
                compared
                  ? 'border-emerald-400/60 bg-emerald-600 text-white'
                  : 'border-white/20 bg-black/40 text-white hover:bg-black/60 hover:scale-105'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSaveIdea(idea.id);
              }}
              title={saved ? 'Remove from saved' : 'Save roadmap'}
              className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md border transition-all shadow-sm ${
                saved
                  ? 'border-emerald-400/60 bg-emerald-600 text-white'
                  : 'border-white/20 bg-black/40 text-white hover:bg-black/60 hover:scale-105'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Title & Tagline */}
          <div>
            <Link to={`/roadmap/${idea.slug}`} className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {idea.title}
              </h3>
            </Link>
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {idea.shortDescription}
            </p>
          </div>

          {/* Financial Highlights Grid */}
          <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800/50">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Est. CapEx
              </div>
              <div className="mt-0.5 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(idea.initialCapitalUSD, currency)}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                12M ROI
              </div>
              <div className="mt-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" />
                +{idea.roiPercentage12M}%
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Break-Even
              </div>
              <div className="mt-0.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Month {idea.breakEvenMonth}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          {idea.machines.length} Machines • {idea.licenses.length} Licenses
        </span>

        <Link
          to={`/roadmap/${idea.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400 transition-colors"
        >
          <span>View Roadmap</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};


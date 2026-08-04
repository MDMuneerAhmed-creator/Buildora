import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, ListTodo, Sparkles } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { getOrCreateBusinessIdea } from '../data/businessIdeas';
import { formatCurrency } from '../utils/formatters';
import { getIdeaHeroImage, handleImageError } from '../utils/imageUtils';

export const SavedPage: React.FC = () => {
  const { savedIdeas, toggleSaveIdea, isTaskCompleted, currency } = useRoadmap();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-emerald-600" />
          <span>Saved Project Roadmaps</span>
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Access your bookmarked business plans and track your launch task progress.
        </p>
      </div>

      {savedIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedIdeas.map((saved) => {
            const idea = getOrCreateBusinessIdea(saved.ideaId);
            const heroImageUrl = getIdeaHeroImage(idea);
            const isLoaded = loadedImages[idea.id];

            const totalTasks = idea.launchTasks.length;
            const completedCount = idea.launchTasks.filter((t) =>
              isTaskCompleted(idea.id, t.id, t.completed)
            ).length;
            const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

            return (
              <div
                key={idea.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs flex flex-col justify-between dark:border-zinc-800 dark:bg-zinc-900 hover:border-zinc-300 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Hero Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    {!isLoaded && (
                      <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-zinc-400 dark:text-zinc-600 animate-spin" />
                      </div>
                    )}
                    <img
                      src={heroImageUrl}
                      alt={idea.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onLoad={() => setLoadedImages((prev) => ({ ...prev, [idea.id]: true }))}
                      onError={(e) => {
                        setLoadedImages((prev) => ({ ...prev, [idea.id]: true }));
                        handleImageError(e, idea.title, idea.category);
                      }}
                      className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={() => toggleSaveIdea(idea.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md border border-white/20 bg-black/40 text-white hover:bg-rose-600 hover:border-rose-500 transition-colors shadow-sm"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md bg-black/50 border border-white/20 px-2 py-0.5 rounded">
                        Saved {new Date(saved.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {idea.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {idea.shortDescription}
                    </p>

                    <div className="mt-4 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60 flex items-center justify-between text-xs font-semibold">
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase">CapEx</span>
                        <span className="text-zinc-900 dark:text-zinc-100">{formatCurrency(idea.initialCapitalUSD, currency)}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 block uppercase">Launch Progress</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{progressPercent}% ({completedCount}/{totalTasks})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 border-t border-zinc-100 pt-3 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-500">
                    {idea.category}
                  </span>

                  <Link
                    to={`/roadmap/${idea.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400"
                  >
                    <span>Resume Roadmap</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50/50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50 space-y-4 max-w-md mx-auto">
          <Bookmark className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            No Bookmarked Projects Yet
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Browse our business directory or search for a product idea and click "Save Roadmap" to keep track of it here.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <span>Explore Ideas</span>
          </Link>
        </div>
      )}

    </div>
  );
};

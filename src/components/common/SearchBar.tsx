import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Rocket, Sparkles, TrendingUp, ArrowRight, Clock, Tag } from 'lucide-react';
import { SAMPLE_BUSINESS_IDEAS, getOrCreateBusinessIdea } from '../../data/businessIdeas';
import { useRoadmap } from '../../context/RoadmapContext';

interface SearchBarProps {
  placeholder?: string;
  size?: 'normal' | 'large';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search product idea (e.g., "Bamboo Toothbrush", "Cold Pressed Juice", "Solar Drone")...',
  size = 'large',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { recentSearches, addRecentSearch } = useRoadmap();

  const filteredIdeas = SAMPLE_BUSINESS_IDEAS.filter(
    (idea) =>
      idea.title.toLowerCase().includes(query.toLowerCase()) ||
      idea.category.toLowerCase().includes(query.toLowerCase()) ||
      idea.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (slug: string, title: string) => {
    addRecentSearch(title);
    setQuery('');
    setIsOpen(false);
    navigate(`/roadmap/${slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    
    setErrorMsg(null);
    const normalizedSlug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Check if it's already a predefined idea or saved in session
    const found = getOrCreateBusinessIdea(trimmed);

    if (found) {
      handleSelect(found.slug, found.title);
      return;
    }

    addRecentSearch(trimmed);
    setIsOpen(false);
    navigate(`/roadmap/${normalizedSlug}`);
    setQuery('');
  };

  const isDisabled = isLoading || !query.trim();

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="pointer-events-none absolute left-4 z-10 text-zinc-400">
          {isLoading ? (
             <div className="animate-spin h-4 w-4 rounded-full border-b-2 border-zinc-400" />
          ) : (
             <Search className={size === 'large' ? 'h-5 w-5' : 'h-4 w-4'} />
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setErrorMsg(null);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={isLoading}
          className={`w-full rounded-2xl border ${errorMsg ? 'border-red-500' : 'border-zinc-800'} bg-black font-medium text-white placeholder-zinc-400 shadow-lg shadow-black/20 transition-all focus:outline-none focus:ring-2 ${errorMsg ? 'focus:border-red-500 focus:ring-red-100/20' : 'focus:border-zinc-600 focus:ring-zinc-800'} dark:border-zinc-800 dark:bg-black dark:text-white dark:placeholder-zinc-400 ${
            size === 'large' ? 'py-4 pl-12 pr-[215px] sm:pr-[230px] text-sm sm:text-base' : 'py-2.5 pl-10 pr-[175px] sm:pr-[190px] text-xs sm:text-sm'
          }`}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 rounded-xl font-medium text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed ${
            size === 'large' ? 'px-4 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'
          }`}
          style={{
            background: 'linear-gradient(135deg, #A855F7 0%, #C084FC 40%, #E11D48 100%)',
          }}
        >
          <Rocket className="h-4 w-4 shrink-0 text-white stroke-[2.2]" />
          <span className="whitespace-nowrap font-medium text-white">
            {isLoading ? 'Generating...' : 'Generate AI Roadmap'}
          </span>
        </button>
      </form>

      {errorMsg && (
        <div className="absolute top-full mt-2 w-full text-center text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/20 py-2 rounded-xl border border-red-200 dark:border-red-900/50">
          {errorMsg}
        </div>
      )}

      {/* Popover Dropdown */}
      {isOpen && !errorMsg && !isLoading && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
          {query.trim() !== '' ? (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center justify-between">
                <span>Matching Business Templates</span>
                <span>{filteredIdeas.length} found</span>
              </div>

              {filteredIdeas.length > 0 ? (
                <div className="space-y-1">
                  {filteredIdeas.slice(0, 4).map((idea) => (
                    <button
                      key={idea.id}
                      onClick={() => handleSelect(idea.slug, idea.title)}
                      className="w-full text-left flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                          <Tag className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {idea.title}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                            {idea.shortDescription}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              ) : null}

              {/* Custom search trigger option */}
              <button
                onClick={handleSubmit}
                className="mt-2 w-full flex items-center justify-between rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-2.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <span className="flex items-center gap-2">
                  <Rocket className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Generate custom roadmap for <strong>"{query}"</strong></span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                    {recentSearches.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(s.toLowerCase().replace(/[^a-z0-9]+/g, '-'), s)}
                        className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Ideas shortcut */}
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Popular Trending Ideas</span>
                </div>
                <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1 px-1">
                  {SAMPLE_BUSINESS_IDEAS.slice(0, 4).map((idea) => (
                    <button
                      key={idea.id}
                      onClick={() => handleSelect(idea.slug, idea.title)}
                      className="text-left flex items-center gap-2 rounded-xl p-2 text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                    >
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="font-medium text-zinc-800 dark:text-zinc-200 line-clamp-1">
                        {idea.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

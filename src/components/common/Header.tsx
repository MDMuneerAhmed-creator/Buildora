import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BuildoraLogo } from './BuildoraLogo';
import {
  Compass,
  Search,
  Bookmark,
  Scale,
  User,
  LogOut,
  ChevronDown,
  Settings,
  LogIn,
  UserPlus,
  ShieldCheck,
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { CURRENCY_CONFIG } from '../../utils/formatters';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    savedIdeas,
    compareList,
    currentUser,
    userProfile,
    currency,
    logout,
    isAuthenticated,
    isGuest,
  } = useRoadmap();

  const [quickSearch, setQuickSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/roadmap/${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/welcome');
  };

  const currentCurrencyConfig = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-black/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="transition-transform group-hover:scale-105">
              <BuildoraLogo size={34} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                Buildora <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">AI</span>
              </span>
            </div>
          </Link>

          {/* Quick Header Search Bar */}
          <form onSubmit={handleQuickSearchSubmit} className="hidden md:flex items-center relative w-56 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="Search or type product idea..."
              className="w-full rounded-full bg-black border border-zinc-800 py-1.5 pl-9 pr-4 text-xs text-white placeholder-zinc-400 focus:bg-black focus:outline-none focus:ring-2 focus:ring-zinc-700 dark:bg-black dark:text-white dark:placeholder-zinc-400 dark:focus:ring-zinc-700 transition-all"
            />
          </form>
        </div>

        {/* Navigation Links & User Menu */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/explore"
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isActive('/explore')
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Browse Ideas</span>
          </Link>

          <Link
            to="/compare"
            className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isActive('/compare')
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Scale className="h-4 w-4" />
            <span>Compare</span>
            {compareList.length > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {compareList.length}
              </span>
            )}
          </Link>

          <Link
            to="/saved"
            className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isActive('/saved')
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Saved</span>
            {savedIdeas.length > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                {savedIdeas.length}
              </span>
            )}
          </Link>

          <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

          {/* Active Currency Badge */}
          <div className="hidden sm:flex items-center gap-1 rounded-md border border-emerald-200/80 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span>{currentCurrencyConfig.symbol} {currency}</span>
          </div>

          <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {/* User Account / Profile Dropdown */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-1 pr-2 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 rounded-lg object-cover ring-1 ring-emerald-500/30"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 text-xs font-bold text-white shadow-xs">
                    {(userProfile.name || 'F')
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}

                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                    {userProfile.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-zinc-400 leading-tight truncate max-w-[90px]">
                    {isGuest ? 'Guest' : userProfile.email}
                  </span>
                </div>

                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200/80 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      {userProfile.avatarUrl ? (
                        <img
                          src={userProfile.avatarUrl}
                          alt={userProfile.name}
                          referrerPolicy="no-referrer"
                          className="h-9 w-9 rounded-xl object-cover ring-1 ring-emerald-500/30"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-xs font-bold text-white">
                          {(userProfile.name || 'F')
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {userProfile.name}
                        </span>
                        <span className="text-[11px] text-zinc-400 truncate">
                          {userProfile.email}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        {isGuest ? 'Guest Session' : 'Verified Founder'}
                      </span>
                      <span className="text-zinc-400">{savedIdeas.length} Saved</span>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-zinc-400" />
                      <span>Profile & Settings</span>
                    </Link>

                    <Link
                      to="/saved"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Bookmark className="h-4 w-4 text-zinc-400" />
                      <span>Saved Roadmaps ({savedIdeas.length})</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Log In</span>
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-1 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-xs"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

        </nav>
      </div>
    </header>
  );
};

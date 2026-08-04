import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { BuildoraLogo } from './BuildoraLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Col 1: Brand & Platform info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <BuildoraLogo size={32} />
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Buildora
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-md dark:text-zinc-400">
              An AI-powered intelligence platform designed to bridge the gap between business ideas and practical execution roadmaps. Built with comprehensive data models for financial feasibility, capital estimation, machinery sourcing, and statutory compliance.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                <ShieldCheck className="h-3 w-3" /> Actionable Business Intelligence
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <Sparkles className="h-3 w-3 text-amber-500" /> Enterprise Feasibility Engine
              </span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Browse All Ideas
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Compare Idea Metrics
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Saved Project Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Student Founder Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Featured Roadmaps */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Featured Roadmaps
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/roadmap/eco-bamboo-toothbrush" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors flex items-center justify-between">
                  <span>Bamboo Toothbrushes</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">₹ 15.0 Lakhs CapEx</span>
                </Link>
              </li>
              <li>
                <Link to="/roadmap/cold-pressed-juice-unit" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors flex items-center justify-between">
                  <span>Cold-Pressed Juice</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">₹ 37.5 Lakhs CapEx</span>
                </Link>
              </li>
              <li>
                <Link to="/roadmap/solar-panel-cleaning-drone" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors flex items-center justify-between">
                  <span>Solar Drone Cleaning</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">₹ 51.7 Lakhs CapEx</span>
                </Link>
              </li>
              <li>
                <Link to="/roadmap/specialty-coffee-roastery" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors flex items-center justify-between">
                  <span>Coffee Micro-Roastery</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">₹ 26.7 Lakhs CapEx</span>
                </Link>
              </li>
            </ul>
          </div>


        </div>

        <div className="mt-10 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-400 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p>
            © {new Date().getFullYear()} Buildora. All rights reserved. Empowering entrepreneurs with actionable execution intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
};

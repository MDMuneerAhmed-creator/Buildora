import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center py-12 px-4 space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-bold text-xl">
        404
      </div>
      <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
        Page Not Found
      </h1>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
        The business roadmap or page you are looking for doesn't exist or has moved.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
        >
          <Compass className="h-4 w-4" />
          <span>Browse Ideas</span>
        </Link>
      </div>
    </div>
  );
};

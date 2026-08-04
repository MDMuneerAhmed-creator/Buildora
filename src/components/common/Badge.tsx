import React from 'react';
import { ComplexityLevel, BusinessCategory } from '../../types';

interface ComplexityBadgeProps {
  level: ComplexityLevel;
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ level }) => {
  const styles = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    High: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${styles[level]}`}
    >
      {level} Complexity
    </span>
  );
};

interface CategoryBadgeProps {
  category: BusinessCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      {category}
    </span>
  );
};

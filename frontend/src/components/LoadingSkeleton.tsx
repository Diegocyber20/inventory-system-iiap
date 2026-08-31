import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="h-28 rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/30"
          />
        ))}
      </div>

      {/* Filters bar skeleton */}
      <div className="h-20 rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/30" />

      {/* Table skeleton */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800/80 p-6 space-y-4">
        <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-md" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="h-12 w-full bg-slate-100 dark:bg-slate-700/50 rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

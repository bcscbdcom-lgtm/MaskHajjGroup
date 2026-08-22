import React from 'react';

interface PackageCardSkeletonProps {
  count?: number;
}

export const PackageCardSkeleton: React.FC<PackageCardSkeletonProps> = ({ count = 4 }) => {
  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between soft-shadow animate-pulse"
        >
          <div>
            {/* Badge Skeleton */}
            <div className="w-24 h-5 bg-slate-200 dark:bg-slate-700 rounded-full mb-4"></div>

            {/* Title Skeleton */}
            <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2"></div>
            <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>

            {/* Price Skeleton */}
            <div className="w-2/3 h-8 bg-blue-100 dark:bg-slate-700/80 rounded-lg mb-6"></div>

            {/* Highlights list Skeletons */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-700/60 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0"></div>
                <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0"></div>
                <div className="w-5/6 h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0"></div>
                <div className="w-4/5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
            <div className="flex-1 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          </div>
        </div>
      ))}
    </>
  );
};

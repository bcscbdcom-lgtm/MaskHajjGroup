import React from 'react';

interface TestimonialCardSkeletonProps {
  count?: number;
}

export const TestimonialCardSkeleton: React.FC<TestimonialCardSkeletonProps> = ({ count = 4 }) => {
  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-800/90 p-7 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 soft-shadow flex flex-col justify-between animate-pulse"
        >
          <div>
            {/* Top Stars & Year Skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-amber-100 dark:bg-slate-700 rounded-sm"></div>
                ))}
              </div>
              <div className="w-24 h-5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </div>

            {/* Quote placeholder */}
            <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>

            {/* Testimonial body text lines */}
            <div className="space-y-2 mb-6">
              <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="w-11/12 h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="w-4/5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>

          {/* User info skeleton */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-4">
            <div>
              <div className="w-28 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-1.5"></div>
              <div className="w-20 h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="w-20 h-6 bg-blue-100 dark:bg-slate-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </>
  );
};

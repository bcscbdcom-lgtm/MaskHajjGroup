import React, { useState, useEffect } from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { testimonialsData } from '../data/blogArticles';
import { TestimonialCardSkeleton } from './skeletons/TestimonialCardSkeleton';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {lang === 'en' ? 'Verified Reviews' : 'হাজীদের মতামত ও রিভিউ'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            {lang === 'en' ? 'What our pilgrims say' : 'আমাদের সম্মানিত হাজীদের অভিজ্ঞতা'}
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-amber-400 text-sm mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-slate-600 dark:text-slate-400 text-xs font-semibold ml-1.5">
              {lang === 'en' ? '4.9 ★ based on 250+ Google Reviews' : '৪.৯ ★ ২৫০টিরও বেশি গুগল রিভিউ ভিত্তিক'}
            </span>
          </div>
        </div>

        {/* Testimonials Cards Grid or Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <TestimonialCardSkeleton count={4} />
          ) : (
            testimonialsData.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800/90 p-7 rounded-3xl border border-slate-200/80 dark:border-slate-700 soft-shadow flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {lang === 'en' ? item.packageTypeEn : item.packageTypeBn} • {item.year}
                    </span>
                  </div>

                  <Quote className="w-7 h-7 text-blue-500/30 dark:text-blue-400/30 mb-3" />

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                    "{lang === 'en' ? item.textEn : item.textBn}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400">
                      {lang === 'en' ? item.locationEn : item.locationBn}
                    </div>
                  </div>

                  <div className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/60 dark:border-blue-800 px-2.5 py-1 rounded-lg">
                    {lang === 'en' ? 'Verified Haji' : 'যাচাইকৃত হাজী'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};


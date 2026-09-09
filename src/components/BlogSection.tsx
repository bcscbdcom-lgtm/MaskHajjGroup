import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Language, BlogArticle } from '../types';
import { blogArticlesData } from '../data/blogArticles';
import { BlogDetailModal } from './BlogDetailModal';

interface BlogSectionProps {
  lang: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ lang }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section id="blog" className="py-20 bg-sky-50/50 dark:bg-slate-900/60 border-t border-sky-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {lang === 'en' ? 'From the Blog' : 'ব্লগ ও দিকনির্দেশনা'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mt-3 tracking-tight">
              {lang === 'en' ? 'Authentic Guidance & Articles' : 'পবিত্র সফরের সহীহ গাইডলাইন'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              {lang === 'en'
                ? 'Up-to-date Saudi ministry regulations, Sunnah duas, and essential spiritual advice.'
                : 'সৌদি হজ মন্ত্রণালয়ের সর্বশেষ নিয়মকানুন, মাসনুন দোয়া ও আত্মিক প্রস্তুতিমূলক নির্দেশিকা।'}
            </p>
          </div>
          <button
            onClick={() => setSelectedArticle(blogArticlesData[0])}
            className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>{lang === 'en' ? 'Read Latest Guide' : 'সর্বশেষ গাইড পড়ুন'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogArticlesData.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-sky-100/90 dark:border-slate-700 shadow-xs hover:-translate-y-1.5 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Visual Header Box */}
                <div className="h-44 bg-gradient-to-tr from-sky-950 via-emerald-950 to-sky-900 relative flex items-center justify-center text-white overflow-hidden">
                  <div className="text-5xl opacity-40 group-hover:scale-110 transition-transform">
                    {article.id.includes('zamzam') ? '💧' : article.id.includes('arafat') ? '⛰️' : '🕋'}
                  </div>
                  <span className={`absolute top-4 left-4 ${article.categoryColor} text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs`}>
                    {lang === 'en' ? article.categoryEn : article.categoryBn}
                  </span>
                  <span className="absolute bottom-3 right-4 text-[10px] text-slate-300 font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                    {lang === 'en' ? article.readTimeEn : article.readTimeBn}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 font-semibold mb-2 flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                    <span>{lang === 'en' ? article.dateEn : article.dateBn}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                    {lang === 'en' ? article.titleEn : article.titleBn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {lang === 'en' ? article.summaryEn : article.summaryBn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 flex items-center gap-1">
                  <span>{lang === 'en' ? 'Read full article' : 'বিস্তারিত পড়ুন'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      <BlogDetailModal
        lang={lang}
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};

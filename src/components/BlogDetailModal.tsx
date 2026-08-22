import React from 'react';
import { X, Calendar, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import { Language, BlogArticle } from '../types';

interface BlogDetailModalProps {
  lang: Language;
  article: BlogArticle | null;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ lang, article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-backdrop-fade">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800 animate-modal-slide-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`${article.categoryColor} text-white text-[11px] font-bold px-3 py-1 rounded-full`}>
            {lang === 'en' ? article.categoryEn : article.categoryBn}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {lang === 'en' ? article.dateEn : article.dateBn}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {lang === 'en' ? article.readTimeEn : article.readTimeBn}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug mb-4">
          {lang === 'en' ? article.titleEn : article.titleBn}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          {(lang === 'en' ? article.tagsEn : article.tagsBn).map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
              <Tag className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              {tag}
            </span>
          ))}
        </div>

        {/* Content Body */}
        <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-xs sm:text-sm">
          {(lang === 'en' ? article.contentEn : article.contentBn)
            .split('\n\n')
            .map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {paragraph}
              </p>
            ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>MASK Hajj Group Research Desk</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
          >
            {lang === 'en' ? 'Close Guide' : 'বন্ধ করুন'}
          </button>
        </div>

      </div>
    </div>
  );
};

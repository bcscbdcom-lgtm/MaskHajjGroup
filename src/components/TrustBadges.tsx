import React from 'react';
import { Award, CheckCircle2, Plane, Compass, Building, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface TrustBadgesProps {
  lang: Language;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ lang }) => {
  const badges = [
    {
      icon: Award,
      textEn: 'HAAB Member',
      textBn: 'হাব (HAAB) সদস্য',
    },
    {
      icon: CheckCircle2,
      textEn: 'Ministry of Religious Affairs (GoB)',
      textBn: 'ধর্ম বিষয়ক মন্ত্রণালয় অনুমোদিত',
    },
    {
      icon: Plane,
      textEn: 'ATAB Member',
      textBn: 'আটাব (ATAB) সদস্য',
    },
    {
      icon: ShieldCheck,
      textEn: 'Rawaf Mina Approved',
      textBn: 'রাওয়াফ মিনা অনুমোদিত',
    },
    {
      icon: Building,
      textEn: 'Ministry of Hajj & Umrah (KSA)',
      textBn: 'সৌদি হজ ও ওমরাহ মন্ত্রণালয়',
    },
    {
      icon: Compass,
      textEn: 'Al Bait Guests (ضيوف البيت)',
      textBn: 'আল বাইত গেস্টস পার্টনার',
    },
  ];

  return (
    <section className="py-7 border-b border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-4">
          {lang === 'en' ? 'TRUSTED & CERTIFIED BY AUTHORITIES' : 'অনুমোদিত ও স্বীকৃত পার্টনারসমূহ'}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors shadow-2xs text-slate-700 dark:text-slate-200"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>{lang === 'en' ? b.textEn : b.textBn}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

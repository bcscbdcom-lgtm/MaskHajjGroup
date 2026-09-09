import React from 'react';
import { HeartHandshake, BookOpen, Headset, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const features = [
    {
      icon: HeartHandshake,
      titleEn: 'End-to-end Care',
      titleBn: 'পূর্ণাঙ্গ দায়িত্বশীল সেবা',
      descEn: 'Visa, flights, 5★/4★ hotels, luxury transport, and catering — all managed seamlessly with zero hidden charges.',
      descBn: 'ভিসা, বিমান টিকিট, হোটেল, মানসম্মত খাবার ও পরিবহন—সব দায়িত্ব আমাদের। কোনো লুকানো চার্জ নেই।',
    },
    {
      icon: BookOpen,
      titleEn: 'Pre-departure Training',
      titleBn: 'হজপূর্ব নিবিড় প্রশিক্ষণ',
      descEn: 'In-depth workshops covering every single step, ritual, and spiritual mindset required for an accepted Hajj.',
      descBn: 'হজের প্রতিটি রোকন, দোয়া ও নিয়মকানুনের ওপর ঢাকা অফিসে দিনব্যাপী কর্মশালা ও সহীহ হজ গাইড বই প্রদান।',
    },
    {
      icon: Headset,
      titleEn: 'On-ground 24/7 Support',
      titleBn: 'সৌদিতে সার্বক্ষণিক সাপোর্ট',
      descEn: 'Dedicated operations team in Makkah and Madinah on standby 24/7 for medical, luggage, and guidance needs.',
      descBn: 'মক্কা ও মদিনায় নিজস্ব অভিজ্ঞ টিম ও হেল্পলাইন সর্বদা প্রস্তুত থাকে যেকোনো প্রয়োজনে সহায়তার জন্য।',
    },
    {
      icon: Users,
      titleEn: 'Family-like Community',
      titleBn: 'পারিবারিক আন্তরিক বন্ধন',
      descEn: 'Travel together as one united, caring family where senior citizens receive special wheelchair attention.',
      descBn: 'একটি পরিবারের মতো আন্তরিক পরিবেশে পবিত্র সফর সম্পন্ন করুন, যেখানে প্রবীণদের দেওয়া হয় বিশেষ অগ্রাধিকার।',
    },
  ];

  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {lang === 'en' ? 'Why Choose Us' : 'আমাদের শ্রেষ্ঠত্ব'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mt-3 tracking-tight">
          {lang === 'en' ? 'Why families choose MASK Hajj Group' : 'কেন হাজীগণ মাস্ক হজ গ্রুপকেই বেছে নেন?'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
          {lang === 'en'
            ? 'We consider serving Allah\'s guests (Duyufur Rahman) a sacred religious honor and trust.'
            : 'আল্লাহর মেহমানদের সেবা করাকে আমরা পার্থিব ব্যবসার চেয়ে আত্মিক আমানত ও সম্মান হিসেবে বিবেচনা করি।'}
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-800/90 p-6 sm:p-7 rounded-3xl border border-sky-100/90 dark:border-slate-700 shadow-xs hover:-translate-y-1 hover:border-sky-400 dark:hover:border-sky-400 hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/60 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-5 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base mb-2">
                  {lang === 'en' ? f.titleEn : f.titleBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {lang === 'en' ? f.descEn : f.descBn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? '100% Guaranteed Care' : 'শতভাগ বিশ্বস্ত সেবা'}</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

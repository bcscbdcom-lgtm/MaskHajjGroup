import React from 'react';
import { 
  CheckCircle2, 
  HeartHandshake, 
  Shield, 
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  lang: Language;
  onOpenPreReg: (packageName?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, onOpenPreReg }) => {
  return (
    <section id="about" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Decorative & Info Card */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-emerald-100 relative z-10">
            <div className="bg-[#FAF9F5] text-slate-900 rounded-2xl p-8 sm:p-10 text-center shadow-xs border border-emerald-200/80">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs flex items-center justify-center text-[#065F46] text-3xl">
                <HeartHandshake className="w-9 h-9 text-[#065F46]" />
              </div>
              <h4 className="text-xl font-bold text-[#065F46]">
                {lang === 'en' ? 'MASK Hajj Group' : 'মাস্ক হজ গ্রুপ'}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Dedicated to your spiritual peace, safety, and comfortable holy journey since 2005.'
                  : 'পবিত্র মক্কা ও মদিনায় হাজীদের আত্মিক প্রশান্তি ও নিখুঁত আরামদায়ক সেবায় নিবেদিত।'}
              </p>
              <div className="mt-6 pt-6 border-t border-emerald-200/80 flex items-center justify-center gap-6 text-left">
                <div>
                  <div className="text-lg font-extrabold text-amber-600 font-mono">15630</div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {lang === 'en' ? 'Govt Licence' : 'সরকারি লাইসেন্স'}
                  </div>
                </div>
                <div className="h-8 w-px bg-emerald-200"></div>
                <div>
                  <div className="text-lg font-extrabold text-[#065F46] font-mono">100%</div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {lang === 'en' ? 'Sunnah Guided' : 'সুন্নাহ সম্মত'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Experience Badge */}
          <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white rounded-2xl p-4 shadow-lg border border-emerald-100 flex items-center gap-3 z-20">
            <div className="w-11 h-11 rounded-xl bg-[#065F46] text-white font-extrabold text-lg flex items-center justify-center shadow-xs font-mono">
              11+
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900">
                {lang === 'en' ? 'Years of Excellence' : 'বছরের নির্ভরযোগ্য সেবা'}
              </div>
              <div className="text-[10px] text-slate-500">
                {lang === 'en' ? 'Since 2005 in Dhaka' : '২০০৫ সাল থেকে ঢাকায়'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Descriptive Content */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#065F46] border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5 text-[#065F46]" />
            {lang === 'en' ? 'About MASK Hajj Group' : 'মাস্ক হজ গ্রুপ পরিচিতি'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {lang === 'en'
              ? 'Guiding thousands of families to the Two Holy Mosques with honour and care.'
              : '১১+ বছর ধরে পবিত্র দুই মসজিদে পরিবারসমূহের বিশ্বস্ত ও নির্ভরযোগ্য পথপ্রদর্শক।'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm mb-8">
            {lang === 'en'
              ? 'From the first consultation in our Dhaka office to your safe return home, we provide transparent and compassionate support for every single step of your Hajj or Umrah journey. Our caravans combine ministry-approved logistical excellence, authentic Islamic scholars, and meticulous on-ground care for senior citizens and families.'
              : 'প্রথম পরামর্শ সভা ও পাসপোর্ট জমাদান থেকে শুরু করে পবিত্র সফর সম্পন্ন করে দেশে নিরাপদে ফেরা পর্যন্ত প্রতিটি ধাপে আমরা নিশ্চিত করি নিখুঁত ও নির্ভরযোগ্য সেবা। অভিজ্ঞ আলেম ও নিবেদিত মুয়াল্লিমদের সার্বক্ষণিক দিকনির্দেশনায় পরিবার ও প্রথমবার সফরকারী হাজীদের জন্য আমাদের কাফেলা অত্যন্ত প্রশান্তিদায়ক।'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-semibold text-slate-700 mb-8">
            <div className="flex items-center gap-2.5 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-[#065F46] flex-shrink-0" />
              <span>{lang === 'en' ? 'Ministry Verified Visa & Direct Flights' : 'মন্ত্রণালয় অনুমোদিত ভিসা ও সরাসরি বিমান টিকিট'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-[#065F46] flex-shrink-0" />
              <span>{lang === 'en' ? 'Premium Close-to-Haram Hotels' : 'হারামের কাছে উন্নতমানের হোটেল আবাসন'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-[#065F46] flex-shrink-0" />
              <span>{lang === 'en' ? 'In-depth Pre-departure Training' : 'হজপূর্ব বিশেষ প্রশিক্ষণ কর্মশালা ও সহীহ বই'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-sky-50/50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-sky-100 dark:border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{lang === 'en' ? '24/7 Dedicated Mu\'allim & Doctor Team' : 'সার্বক্ষণিক অভিজ্ঞ মুয়াল্লিম ও চিকিৎসা সহায়তা'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPreReg('General Inquiry')}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition cursor-pointer"
            >
              {lang === 'en' ? 'Speak with our Advisor' : 'আমাদের উপদেষ্টার সাথে কথা বলুন'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

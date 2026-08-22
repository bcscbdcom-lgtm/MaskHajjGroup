import React, { useState } from 'react';
import { GraduationCap, Languages, Users, Award, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Language, GuideMember } from '../types';
import { guidesData } from '../data/guides';

interface GuideSectionProps {
  lang: Language;
  onOpenPreReg: () => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({ lang, onOpenPreReg }) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideMember>(guidesData[0]);

  return (
    <section id="guides" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-blue-400 font-bold uppercase tracking-wider text-xs bg-slate-800/80 border border-slate-700 px-3.5 py-1 rounded-full inline-block">
            {lang === 'en' ? 'SPIRITUAL MENTORS & GUIDES' : 'আমাদের সম্মানিত আলেম মেন্টরবৃন্দ'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {lang === 'en'
              ? 'Spiritual guidance from trusted scholars and mentors.'
              : 'বিজ্ঞ ও প্রখ্যাত আলেমদের সরাসরি তত্ত্বাবধানে পবিত্র সফর।'}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mt-3">
            {lang === 'en'
              ? 'Each MASK Hajj Group is accompanied by certified Islamic scholars with deep knowledge of Hajj rites, Arabic, and holy places. They walk every step with you — from the first Niyyah to your safe return home.'
              : 'মাস্ক হজ গ্রুপের প্রতিটি কাফেলা অভিজ্ঞ আলেম ও মুফতিদের নেতৃত্বে পরিচালিত হয়। ইহরাম বাঁধা থেকে শুরু করে প্রতিটি রোকন সহীহভাবে পালনে আপনি পাবেন সার্বক্ষণিক দিকনির্দেশনা।'}
          </p>
        </div>

        {/* Feature Grid with Selected Scholar Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          
          {/* Left Guide Image & Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-blue-500/50 p-2.5 bg-slate-950/80 shadow-2xl overflow-hidden">
              <div className="rounded-2xl overflow-hidden bg-slate-800 text-center relative group">
                <img
                  src={selectedGuide.image}
                  alt={selectedGuide.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-top hover:scale-105 transition duration-500"
                />
                <div className="p-5 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent border-t border-slate-700/80 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {lang === 'en' ? selectedGuide.nameEn : selectedGuide.nameBn}
                    </h3>
                    <span className="bg-blue-500/20 text-blue-300 border border-blue-400/40 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-blue-400 font-semibold mt-1">
                    {lang === 'en' ? selectedGuide.roleEn : selectedGuide.roleBn}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {lang === 'en' ? selectedGuide.experienceEn : selectedGuide.experienceBn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Scholar Bio & Capabilities */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'en' ? 'SCHOLAR SPOTLIGHT' : 'নির্বাচিত আলেম মেন্টর'}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {lang === 'en' ? selectedGuide.nameEn : selectedGuide.nameBn}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mt-3">
                {lang === 'en' ? selectedGuide.bioEn : selectedGuide.bioBn}
              </p>
            </div>

            {/* Specialties Badges */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {lang === 'en' ? 'Core Areas of Guidance' : 'যে সকল বিষয়ে সেবা প্রদান করেন'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(lang === 'en' ? selectedGuide.specialtiesEn : selectedGuide.specialtiesBn).map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 p-2.5 rounded-xl text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guide Selectors Tabs */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 mb-3">
                {lang === 'en' ? 'View all Mentors & Scholars:' : 'সকল আলেম মেন্টরদের প্রোফাইল দেখুন:'}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {guidesData.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGuide(g)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      selectedGuide.id === g.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? g.nameEn.split(' ')[0] + ' ' + (g.nameEn.split(' ')[1] || '') : g.nameBn}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPreReg}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-sm flex items-center gap-2"
              >
                <span>{lang === 'en' ? 'Consult with Scholar' : 'আলেমদের সাথে সরাসরি কথা বলুন'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* 3 Core Strengths of Guide Team */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-slate-800/80">
          <div className="bg-slate-800/70 border border-slate-700/80 p-5 rounded-2xl">
            <GraduationCap className="w-6 h-6 text-blue-400 mb-3" />
            <div className="text-sm font-bold text-white">
              {lang === 'en' ? 'Certified Scholars' : 'সনদপ্রাপ্ত বিজ্ঞ আলেম'}
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {lang === 'en'
                ? 'Scholars versed in Hanafi, Shafi\'i and all authentic schools of Fiqh.'
                : 'কুরআন ও সহীহ সুন্নাহর আলোকে সকল মাসআলায় সার্বক্ষণিক নির্ভরযোগ্য ফতোয়া সমাধান।'}
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/80 p-5 rounded-2xl">
            <Languages className="w-6 h-6 text-blue-400 mb-3" />
            <div className="text-sm font-bold text-white">
              {lang === 'en' ? 'Multilingual Support' : 'বহুভাষিক সাবলীল যোগাযোগ'}
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {lang === 'en'
                ? 'Fluent in Bangla, Arabic, Urdu and English for seamless on-ground communication.'
                : 'বাংলা, আরবি, উর্দু ও ইংরেজিতে সাবলীলভাবে সৌদি কর্তৃপক্ষ ও মাঠের সাথে সমন্বয়।'}
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/80 p-5 rounded-2xl">
            <Users className="w-6 h-6 text-blue-400 mb-3" />
            <div className="text-sm font-bold text-white">
              {lang === 'en' ? 'Small Group Ratio' : 'ছোট গ্রুপ ও নিবিড় যত্ন'}
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {lang === 'en'
                ? 'Max 25–30 pilgrims per dedicated mentor ensures personal care during rituals.'
                : 'প্রতি ২৫–৩০ জন হাজীর জন্য একজন নিবেদিত আলেম থাকায় তাওয়াফ ও সাঈতে কোনো বিশৃঙ্খলা হয় না।'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

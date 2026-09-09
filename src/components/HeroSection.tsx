import React from 'react';
import { ArrowRight, ShieldCheck, Star, Users, Calendar, Sparkles, CheckCircle2, BookOpen, Printer } from 'lucide-react';
import { Language } from '../types';
import { HajjCountdown } from './HajjCountdown';
import { HolyCitiesWeatherWidget } from './HolyCitiesWeatherWidget';
import { MakkahClockWidget } from './MakkahClockWidget';

interface HeroSectionProps {
  lang: Language;
  onOpenPreReg: (pkg?: string) => void;
  onOpenWalkthrough?: () => void;
  onOpenPrintModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenPreReg,
  onOpenWalkthrough,
  onOpenPrintModal,
}) => {
  return (
    <section id="home" className="bg-gradient-to-b from-[#F8FAF9] via-[#FAFCFB] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white py-14 sm:py-18 lg:py-22 relative overflow-hidden transition-colors">
      {/* Subtle Islamic Geometric Radial Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#064e3b_0.75px,transparent_0.75px)] dark:bg-[radial-gradient(#34d399_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none"></div>
      
      {/* Ambient Luxury Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Content & Authority */}
          <div className="lg:col-span-7">
            
            {/* Top Streamlined Trust Badge & Makkah Time */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 bg-emerald-50/90 dark:bg-emerald-950/70 border border-emerald-200/90 dark:border-emerald-800/80 px-4 py-2 rounded-full text-xs font-bold text-[#064E3B] dark:text-emerald-300 shadow-xs backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] dark:text-amber-400" />
                  <span>
                    {lang === 'en'
                      ? '✦ Since 2005 • Ministry Licensed #15630 • Naya Paltan, Dhaka'
                      : '✦ ২০০৫ থেকে সেবায় নিয়োজিত • লাইসেন্স নং ১৫৬৩০'}
                  </span>
                </div>

                {onOpenWalkthrough && (
                  <button
                    onClick={onOpenWalkthrough}
                    className="inline-flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{lang === 'en' ? 'Hajj Walkthrough' : 'হজ গাইড'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900 dark:text-white">
              {lang === 'en' ? (
                <>
                  Your sacred journey, <br />
                  <span className="text-[#064E3B] dark:text-emerald-400 font-black bg-gradient-to-r from-[#064E3B] via-[#0F5132] to-[#C5A059] bg-clip-text text-transparent">
                    planned with care and clarity.
                  </span>
                </>
              ) : (
                <>
                  আপনার পবিত্র সফর, <br />
                  <span className="text-[#064E3B] dark:text-emerald-400 font-black bg-gradient-to-r from-[#064E3B] via-[#0F5132] to-[#C5A059] bg-clip-text text-transparent">
                    আস্থা ও নিখুঁত যত্নে সুপরিকল্পিত।
                  </span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed mb-6 font-medium">
              {lang === 'en'
                ? 'Licensed Hajj & Umrah support from Bangladesh to the Holy Cities — with visa, direct flights, luxury hotels near Haram, scholar training, and 24/7 on-ground care.'
                : 'পবিত্র কুরআন ও সুন্নাহর আলোকে বাংলাদেশ থেকে মক্কা-মদিনায় নির্ভরযোগ্য হজ ও ওমরাহ সেবা — ভিসা, বিমান টিকিট, আরামদায়ক আবাসন ও আলেমদের সার্বক্ষণিক তত্ত্বাবধান।'}
            </p>

            {/* Slim Sophisticated Gold-Bordered Hajj Countdown */}
            <div className="mb-6">
              <HajjCountdown
                lang={lang}
                onOpenPreReg={() => onOpenPreReg('Hajj 2027 Pre-Registration')}
              />
            </div>

            {/* Uncluttered Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={() => onOpenPreReg()}
                className="bg-[#064E3B] hover:bg-[#04392b] text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-emerald-950/15 border border-[#C5A059]/40 transition transform hover:scale-[1.02] flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer"
              >
                <span>{lang === 'en' ? 'Book Free Consultation' : 'ফ্রি পরামর্শ বুকিং করুন'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <a
                href="#packages"
                className="bg-white dark:bg-slate-800/90 hover:bg-emerald-50/80 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-[#064E3B] dark:text-emerald-300 font-bold px-6 py-3.5 rounded-2xl transition text-xs sm:text-sm shadow-xs flex items-center gap-2"
              >
                {lang === 'en' ? 'View Hajj Packages' : 'হজ প্যাকেজসমূহ দেখুন'}
              </a>

              {onOpenPrintModal && (
                <button
                  onClick={onOpenPrintModal}
                  className="bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-4 py-3.5 rounded-2xl transition text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                  title={lang === 'en' ? 'Printable Summary View' : 'প্রিন্ট সামারি'}
                >
                  <Printer className="w-4 h-4 text-[#064E3B] dark:text-emerald-400" />
                  <span>{lang === 'en' ? 'Print Summary' : 'প্রিন্ট সামারি'}</span>
                </button>
              )}
            </div>

            {/* Social Proof Strip with Subtle Dividers */}
            <div className="flex items-center gap-4 sm:gap-8 pt-5 border-t border-slate-200/80 dark:border-slate-800 max-w-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono leading-none">
                    1200+
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {lang === 'en' ? 'Happy Pilgrims' : 'সন্তুষ্ট হাজীবৃন্দ'}
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/80 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono leading-none">
                    11+ Yrs
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {lang === 'en' ? 'Years of Trust' : 'বছরের অভিজ্ঞতা'}
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono leading-none">
                    4.9★
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {lang === 'en' ? 'Avg. Rating' : 'গড় রেটিং'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: The Holy Cities Hub (Single Luxury Glassmorphism Card) */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-emerald-100/90 dark:border-slate-800 shadow-2xl shadow-emerald-950/10 rounded-3xl p-6 sm:p-7 relative overflow-hidden space-y-5 transition-all">
              
              {/* Subtle top decorative border accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#064E3B] via-[#C5A059] to-[#0F5132]"></div>

              {/* Makkah Live Clock & Dashboard Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <MakkahClockWidget lang={lang} />
              </div>

              {/* Quran Verse & Calligraphy */}
              <div className="bg-emerald-50/50 dark:bg-slate-950/60 rounded-2xl p-4 text-center border border-emerald-100/80 dark:border-slate-800 space-y-1.5">
                <p className="font-arabic text-[#C5A059] dark:text-amber-400 font-extrabold text-2xl sm:text-3xl leading-relaxed">
                  "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ"
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic font-medium">
                  {lang === 'en'
                    ? '"And complete the Hajj and Umrah for Allah" (Surah Al-Baqarah: 196)'
                    : '"এবং আল্লাহর সন্তুষ্টির উদ্দেশ্যে হজ ও ওমরাহ পূর্ণ করো (সূরা আল-বাক্বারা: ১৯৬)"'}
                </p>
              </div>

              {/* Live Weather Flight-Status Style Widget */}
              <div className="pt-1">
                <HolyCitiesWeatherWidget lang={lang} />
              </div>

              {/* Ministry License & Approvals Verification Box */}
              <div className="bg-gradient-to-br from-sky-900 via-emerald-950 to-sky-950 text-white rounded-2xl p-4 border border-sky-700/50 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>
                      {lang === 'en'
                        ? 'Ministry License #15630 — Verified'
                        : 'লাইসেন্স নং ১৫৬৩০ — সরকার অনুমোদিত'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800 font-bold">
                    Govt. Active
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Officially registered with Ministry of Religious Affairs (Bangladesh) and Ministry of Hajj & Umrah (Saudi Arabia).'
                    : '২০০৫ সাল থেকে বাংলাদেশ ও সৌদি আরবের ধর্ম মন্ত্রণালয়ের নিয়মাবলি মেনে পরিচালিত নির্ভরযোগ্য প্রতিষ্ঠান।'}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> HAAB
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> ATAB
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Rawaf Mina
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

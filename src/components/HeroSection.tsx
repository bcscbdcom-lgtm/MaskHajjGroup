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
    <header id="home" className="hero-gradient text-white py-10 sm:py-14 lg:py-16 relative overflow-hidden">
      {/* Background patterned overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-300 backdrop-blur-sm shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>
                    {lang === 'en'
                      ? '✦ Since 2005 • Naya Paltan, Dhaka'
                      : '✦ ২০০৫ থেকে সেবায় নিয়োজিত • নয়া পল্টন'}
                  </span>
                </div>

                {onOpenWalkthrough && (
                  <button
                    onClick={onOpenWalkthrough}
                    className="inline-flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'en' ? 'Hajj Walkthrough' : 'হজ গাইড'}</span>
                  </button>
                )}
              </div>

              {/* Real-time Makkah Clock Widget */}
              <MakkahClockWidget lang={lang} />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] mb-5">
              {lang === 'en' ? (
                <>
                  Your sacred journey, <br />
                  <span className="text-blue-300 font-bold">planned with care and clarity.</span>
                </>
              ) : (
                <>
                  আপনার পবিত্র সফর, <br />
                  <span className="text-blue-300 font-bold">আস্থা ও নিখুঁত যত্নে সুপরিকল্পিত।</span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
              {lang === 'en'
                ? 'Licensed Hajj & Umrah support from Bangladesh to the Holy Cities — with visa, direct flights, hotels, scholar training and dependable on-ground care.'
                : 'পবিত্র কুরআন ও সুন্নাহর আলোকে বাংলাদেশ থেকে মক্কা-মদিনায় নির্ভরযোগ্য হজ ও ওমরাহ সেবা — ভিসা, বিমান টিকিট, আবাসন ও আলেমদের সার্বক্ষণিক তত্ত্বাবধান।'}
            </p>

            {/* Prominent Live Hajj Countdown */}
            <div className="mb-6">
              <HajjCountdown
                lang={lang}
                onOpenPreReg={() => onOpenPreReg('Hajj 2027 Pre-Registration')}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={() => onOpenPreReg()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2 text-xs sm:text-sm hover:scale-[1.02] cursor-pointer"
              >
                <span>{lang === 'en' ? 'Book Free Consultation' : 'ফ্রি পরামর্শ বুকিং করুন'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="#packages"
                className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl transition text-xs sm:text-sm shadow-sm"
              >
                {lang === 'en' ? 'View Hajj Packages' : 'হজ প্যাকেজসমূহ দেখুন'}
              </a>

              {onOpenPrintModal && (
                <button
                  onClick={onOpenPrintModal}
                  className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-4 py-3.5 rounded-xl transition text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                  title={lang === 'en' ? 'Printable Summary View' : 'প্রিন্ট সামারি'}
                >
                  <Printer className="w-4 h-4 text-blue-400" />
                  <span>{lang === 'en' ? 'Print Summary' : 'প্রিন্ট সামারি'}</span>
                </button>
              )}
            </div>

            {/* Stats Counter Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-slate-800 max-w-lg">
              <div>
                <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  <Users className="w-5 h-5 text-blue-400 hidden sm:inline" />
                  1200+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en' ? 'Happy Pilgrims' : 'সন্তুষ্ট হাজীবৃন্দ'}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  <Calendar className="w-5 h-5 text-blue-400 hidden sm:inline" />
                  11+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en' ? 'Years of Trust' : 'বছরের নির্ভরযোগ্যতা'}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400 hidden sm:inline" />
                  4.9★
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en' ? 'Avg. Rating' : 'গড় রেটিং'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spiritual Verse & Holy Cities Weather Widget */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Weather Widget for Makkah & Madinah */}
            <HolyCitiesWeatherWidget lang={lang} />

            {/* Spiritual & Licence Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-slate-700/60">
              <div className="relative rounded-2xl overflow-hidden bg-[#0f172a] p-5 sm:p-6 text-white text-center border border-slate-800">
                
                {/* Quran Verse */}
                <p className="font-arabic text-amber-300 font-normal text-xl sm:text-2xl mb-1 leading-relaxed">
                  "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ"
                </p>
                <p className="text-xs text-slate-300 italic mb-4">
                  {lang === 'en'
                    ? '"And complete the Hajj and Umrah for Allah"'
                    : '"এবং আল্লাহর সন্তুষ্টির উদ্দেশ্যে হজ ও ওমরাহ পূর্ণ করো (সূরা আল-বাক্বারা: ১৯৬)"'}
                </p>

                {/* License and Approval Box */}
                <div className="bg-slate-950/80 rounded-xl p-3.5 text-left border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>
                      {lang === 'en'
                        ? 'Licence No. 15630 — Ministry Verified'
                        : 'লাইসেন্স নং ১৫৬৩০ — মন্ত্রণালয় অনুমোদিত'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'en'
                      ? 'Officially registered with Ministry of Religious Affairs (Bangladesh) and Ministry of Hajj & Umrah (Saudi Arabia).'
                      : '২০০৫ সাল থেকে বাংলাদেশ ও সৌদি আরবের ধর্ম মন্ত্রণালয়ের নিয়মাবলি মেনে পরিচালিত বিশ্বস্ত প্রতিষ্ঠান।'}
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-blue-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" /> HAAB
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" /> ATAB
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" /> Rawaf Mina
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};


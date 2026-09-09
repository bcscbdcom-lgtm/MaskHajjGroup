import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

interface HajjCountdownProps {
  lang: Language;
  onOpenPreReg?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const HajjCountdown: React.FC<HajjCountdownProps> = ({ lang, onOpenPreReg }) => {
  // Target date: Expected Hajj 2027 season start (~May 16, 2027 00:00:00 UTC)
  const targetDate = new Date('2027-05-16T00:00:00Z');

  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number): string => {
    const padded = num < 10 ? `0${num}` : `${num}`;
    return lang === 'bn' ? toBengaliNumber(padded) : padded;
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-50/90 via-white to-emerald-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-amber-300/80 dark:border-amber-500/30 shadow-md relative overflow-hidden transition-all">
      {/* Background soft ambient glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Title & Status */}
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#064E3B] dark:text-amber-400 uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>
              {lang === 'en'
                ? 'Countdown to Hajj 2027 (1448 AH)'
                : 'পবিত্র হজ ২০২৭ (১৪৪৮ হিজরি) ক্ষণগণনা'}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            {lang === 'en'
              ? 'Govt. Pre-Registration is Open • Secure your early quota'
              : 'সরকারি প্রাক-নিবন্ধন চলছে • আপনার কোটা নিশ্চিত করুন'}
          </p>
        </div>

        {/* Live Ticking Grid */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {/* Days */}
            <div className="bg-white dark:bg-slate-950 border border-amber-200/90 dark:border-slate-800 rounded-xl p-1.5 sm:p-2 text-center min-w-[50px] sm:min-w-[58px] shadow-xs">
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono tracking-tight leading-none">
                {formatDigit(timeLeft.days)}
              </div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">
                {lang === 'en' ? 'Days' : 'দিন'}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white dark:bg-slate-950 border border-amber-200/90 dark:border-slate-800 rounded-xl p-1.5 sm:p-2 text-center min-w-[50px] sm:min-w-[58px] shadow-xs">
              <div className="text-base sm:text-lg font-black text-[#064E3B] dark:text-emerald-400 font-mono tracking-tight leading-none">
                {formatDigit(timeLeft.hours)}
              </div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">
                {lang === 'en' ? 'Hours' : 'ঘণ্টা'}
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-white dark:bg-slate-950 border border-amber-200/90 dark:border-slate-800 rounded-xl p-1.5 sm:p-2 text-center min-w-[50px] sm:min-w-[58px] shadow-xs">
              <div className="text-base sm:text-lg font-black text-[#064E3B] dark:text-emerald-400 font-mono tracking-tight leading-none">
                {formatDigit(timeLeft.minutes)}
              </div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">
                {lang === 'en' ? 'Mins' : 'মিনিট'}
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl p-1.5 sm:p-2 text-center min-w-[50px] sm:min-w-[58px] shadow-xs">
              <div className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 font-mono tracking-tight leading-none">
                {formatDigit(timeLeft.seconds)}
              </div>
              <div className="text-[9px] text-amber-800 dark:text-amber-300 font-bold uppercase mt-0.5">
                {lang === 'en' ? 'Secs' : 'সেকেন্ড'}
              </div>
            </div>
          </div>

          {/* Quick Action button */}
          {onOpenPreReg && (
            <button
              onClick={onOpenPreReg}
              className="hidden sm:flex bg-[#064E3B] hover:bg-[#04392b] text-white font-bold px-3 py-2.5 rounded-xl text-xs items-center gap-1 transition hover:scale-[1.02] shadow-sm flex-shrink-0 cursor-pointer border border-[#C5A059]/40"
            >
              <span>{lang === 'en' ? 'Pre-Register' : 'প্রাক-নিবন্ধন'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

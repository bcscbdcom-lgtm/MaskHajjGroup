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
    <div className="w-full bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-blue-500/30 dark:border-blue-500/20 shadow-xl relative overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Title & Status */}
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>
              {lang === 'en'
                ? 'Countdown to Hajj 2027 (1448 AH)'
                : 'পবিত্র হজ ২০২৭ (১৪৪৮ হিজরি) ক্ষণগণনা'}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {lang === 'en'
              ? 'Govt. Pre-Registration is Open • Secure your early quota'
              : 'সরকারি প্রাক-নিবন্ধন চলছে • আপনার কোটা নিশ্চিত করুন'}
          </p>
        </div>

        {/* Live Ticking Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {/* Days */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-2 sm:p-2.5 text-center min-w-[54px] sm:min-w-[62px] shadow-inner">
            <div className="text-lg sm:text-xl font-black text-white font-mono tracking-tight leading-none">
              {formatDigit(timeLeft.days)}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-1">
              {lang === 'en' ? 'Days' : 'দিন'}
            </div>
          </div>

          {/* Hours */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-2 sm:p-2.5 text-center min-w-[54px] sm:min-w-[62px] shadow-inner">
            <div className="text-lg sm:text-xl font-black text-blue-300 font-mono tracking-tight leading-none">
              {formatDigit(timeLeft.hours)}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-1">
              {lang === 'en' ? 'Hours' : 'ঘণ্টা'}
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-2 sm:p-2.5 text-center min-w-[54px] sm:min-w-[62px] shadow-inner">
            <div className="text-lg sm:text-xl font-black text-blue-300 font-mono tracking-tight leading-none">
              {formatDigit(timeLeft.minutes)}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-1">
              {lang === 'en' ? 'Mins' : 'মিনিট'}
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-2 sm:p-2.5 text-center min-w-[54px] sm:min-w-[62px] shadow-inner">
            <div className="text-lg sm:text-xl font-black text-amber-400 font-mono tracking-tight leading-none">
              {formatDigit(timeLeft.seconds)}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-1">
              {lang === 'en' ? 'Secs' : 'সেকেন্ড'}
            </div>
          </div>
        </div>

        {/* Quick Action button */}
        {onOpenPreReg && (
          <button
            onClick={onOpenPreReg}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition hover:scale-105 shadow-md flex-shrink-0 cursor-pointer"
          >
            <span>{lang === 'en' ? 'Pre-Register Now' : 'প্রাক-নিবন্ধন করুন'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

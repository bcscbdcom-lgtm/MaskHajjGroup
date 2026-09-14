import React, { useState, useEffect } from 'react';
import { Award, Phone, Clock, Lock, Sun, Moon, Globe } from 'lucide-react';
import { Language } from '../types';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenPortal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  lang,
  onToggleLang,
  onOpenPortal,
  darkMode,
  onToggleDarkMode,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeZone: string) => {
    try {
      return new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(currentTime);
    } catch {
      return '';
    }
  };

  const dhakaTime = formatTime('Asia/Dhaka');
  const makkahTime = formatTime('Asia/Riyadh');

  return (
    <div className="bg-[#064E3B] text-white text-xs py-1.5 px-4 border-b border-emerald-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        
        {/* Left Side: License Badge & Minimalist Live Clock */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-100 text-[11px] sm:text-xs font-medium">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            {lang === 'en'
              ? 'Licence No. 15630 • Ministry Verified'
              : 'লাইসেন্স নং ১৫৬৩০ • মন্ত্রণালয় অনুমোদিত'}
          </span>

          <span className="text-emerald-700/60 hidden sm:inline">•</span>

          {/* Minimalist Live Dual Clock (Dhaka & Makkah) */}
          <div className="inline-flex items-center gap-2 text-[11px] bg-[#043E2E] px-2.5 py-0.5 rounded-md border border-emerald-700/60 font-mono text-emerald-100 shadow-2xs">
            <Clock className="w-3 h-3 text-emerald-400 animate-pulse flex-shrink-0" />
            <span className="flex items-center gap-1">
              <span className="text-emerald-300/80">{lang === 'en' ? 'Dhaka:' : 'ঢাকা:'}</span>
              <span className="font-semibold text-emerald-200">{dhakaTime}</span>
            </span>
            <span className="text-emerald-700">|</span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-300/80">{lang === 'en' ? 'Makkah:' : 'মক্কা:'}</span>
              <span className="font-semibold text-amber-300">{makkahTime}</span>
            </span>
          </div>
        </div>

        {/* Right Side: Phone & Portal */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-emerald-100 text-[11px] sm:text-xs flex-wrap justify-center">
          <a
            href="tel:+8801711258708"
            className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
          >
            <Phone className="w-3 h-3 text-amber-300" />
            <span>+88 01711-258708</span>
          </a>

          <span className="text-emerald-700/60 hidden sm:inline">•</span>

          <button
            onClick={onOpenPortal}
            className="text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1 font-semibold transition cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>{lang === 'en' ? 'Staff Portal' : 'অফিস ড্যাশবোর্ড'}</span>
          </button>

          <span className="text-emerald-700/60 hidden sm:inline">•</span>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            id="topBarLangToggleBtn"
            aria-label={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded text-white bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/80 text-[11px] font-bold transition cursor-pointer group"
            title={lang === 'en' ? 'Switch language to বাংলা' : 'Switch language to English'}
          >
            <Globe className="w-3 h-3 text-amber-300 group-hover:rotate-45 transition-transform" />
            <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

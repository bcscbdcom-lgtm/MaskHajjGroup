import React from 'react';
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
  return (
    <div className="bg-[#0f172a] dark:bg-[#070b14] text-slate-300 text-xs py-2 px-4 border-b border-slate-800 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-slate-300 text-[11px] sm:text-xs">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            {lang === 'en'
              ? 'Licence No. 15630 • Verified by Ministry of Religious Affairs'
              : 'লাইসেন্স নং ১৫৬৩০ • ধর্ম বিষয়ক মন্ত্রণালয় অনুমোদিত'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300 text-[11px] sm:text-xs flex-wrap justify-center">
          <a
            href="tel:+8801711258708"
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium"
          >
            <Phone className="w-3 h-3 text-blue-400" />
            +88 01711-258708
          </a>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3 h-3 text-blue-400" />
            {lang === 'en' ? 'Open 10 AM – 7 PM' : 'খোলা: সকাল ১০টা – সন্ধ্যা ৭টা'}
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <button
            onClick={onOpenPortal}
            className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 font-semibold transition cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            {lang === 'en' ? 'Staff Portal' : 'অফিস ড্যাশবোর্ড'}
          </button>

          <span className="text-slate-600 hidden sm:inline">•</span>

          {/* TopBar Language Toggle Button */}
          <button
            onClick={onToggleLang}
            id="topBarLangToggleBtn"
            aria-label={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-200 hover:text-white bg-slate-800/90 dark:bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/80 text-[11px] font-bold transition cursor-pointer shadow-2xs group"
            title={lang === 'en' ? 'Switch language to বাংলা' : 'Switch language to English'}
          >
            <Globe className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-45 transition-transform" />
            <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            id="themeToggleBtn"
            aria-label={darkMode ? 'Switch to Light Mode (Press d)' : 'Switch to Dark Mode (Press d)'}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-200 hover:text-white bg-slate-800/90 dark:bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/80 text-[11px] font-semibold transition cursor-pointer shadow-2xs"
            title={
              darkMode
                ? lang === 'en'
                  ? 'Switch to Light Mode (Press d)'
                  : 'লাইট মোডে পরিবর্তন করুন (d চাপুন)'
                : lang === 'en'
                ? 'Switch to Dark Mode (Press d)'
                : 'ডার্ক মোডে পরিবর্তন করুন (d চাপুন)'
            }
          >
            {darkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span>{lang === 'en' ? 'Light' : 'লাইট'}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'en' ? 'Dark' : 'ডার্ক'}</span>
              </>
            )}
            <kbd className="hidden lg:inline-block text-[9px] font-mono text-slate-400 bg-slate-900/80 dark:bg-slate-950 px-1 py-0.2 rounded border border-slate-700">
              d
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
};




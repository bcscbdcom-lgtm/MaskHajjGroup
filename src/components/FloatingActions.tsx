import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { Language } from '../types';

interface FloatingActionsProps {
  lang: Language;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ lang }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-slate-900/90 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 border border-transparent dark:border-slate-700 cursor-pointer"
          title={lang === 'en' ? 'Back to top' : 'উপরে যান'}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Direct Call */}
      <a
        href="tel:+8801711258708"
        className="w-11 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105"
        title="Call +88 01711-258708"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* WhatsApp Inquiry Action Button with Notification Pulse */}
      <a
        href="https://wa.me/8801711258708?text=Assalamu%20Alaikum%20MASK%20Hajj%20Group%2C%20I%20want%20to%20inquire%20about%20Hajj%20%26%20Umrah%20packages."
        target="_blank"
        rel="noreferrer"
        className="relative group bg-emerald-600 hover:bg-emerald-700 text-white rounded-full sm:rounded-2xl p-3 sm:py-3 sm:px-4 flex items-center gap-2.5 shadow-xl hover:scale-[1.03] transition duration-300 border border-emerald-500/30"
        title={lang === 'en' ? 'WhatsApp Inquiry: +88 01711-258708' : 'হোয়াটসঅ্যাপ ইনকোয়ারি: +৮৮ ০১৭১১-২৫৮৭০৮'}
        aria-label="WhatsApp Inquiry"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-600 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-600 rounded-full"></span>
          <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
        </div>

        {/* Text visible on tablet/desktop */}
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wide leading-tight text-white">
            {lang === 'en' ? 'WhatsApp Inquiry' : 'হোয়াটসঅ্যাপ ইনকোয়ারি'}
          </span>
          <span className="text-[10px] text-emerald-100 font-mono font-medium">
            +88 01711-258708
          </span>
        </div>

        {/* Mobile-only Hover / Tap Tooltip */}
        <span className="sm:hidden absolute right-14 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-transparent dark:border-slate-700">
          {lang === 'en' ? 'WhatsApp: +88 01711-258708' : 'হোয়াটসঅ্যাপ ইনকোয়ারি'}
        </span>
      </a>
    </div>
  );
};

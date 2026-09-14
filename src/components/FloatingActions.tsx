import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { Language } from '../types';

export interface ActivePackageInfo {
  titleEn: string;
  titleBn: string;
  category?: 'hajj' | 'umrah' | 'vip' | 'custom' | string;
  priceEn?: string;
  priceBn?: string;
}

interface FloatingActionsProps {
  lang: Language;
  activePackage?: ActivePackageInfo | null;
  onOpenWalkthrough?: () => void;
  onOpenPrintModal?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  lang,
  activePackage,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppMessage = () => {
    if (activePackage) {
      const pkgTitle = lang === 'en' ? activePackage.titleEn : activePackage.titleBn;
      return lang === 'en'
        ? `Assalamu Alaikum MASK Hajj Group, I am interested in the "${activePackage.titleEn}" package. Please share details and pre-registration procedure.`
        : `আসসালামু আলাইকুম মাস্ক হজ গ্রুপ, আমি "${activePackage.titleBn}" প্যাকেজটি সম্পর্কে বিস্তারিত তথ্য ও প্রাক-নিবন্ধন তথ্য জানতে চাই।`;
    }

    return lang === 'en'
      ? 'Assalamu Alaikum MASK Hajj Group, I want to inquire about Hajj and Umrah package details.'
      : 'আসসালামু আলাইকুম মাস্ক হজ গ্রুপ, আমি আপনাদের হজ ও ওমরাহ সেবা সংক্রান্ত তথ্য জানতে চাই।';
  };

  const whatsappUrl = `https://wa.me/8801711258708?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-slate-900/90 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 border border-slate-700/50 cursor-pointer"
          title={lang === 'en' ? 'Back to top' : 'উপরে যান'}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Single Sleek Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-full sm:rounded-2xl py-3 px-3.5 sm:px-4 flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/50 cursor-pointer"
        title={lang === 'en' ? 'Chat on WhatsApp with MASK Hajj Group' : 'মাস্ক হজ গ্রুপের সাথে হোয়াটসঅ্যাপে কথা বলুন'}
        aria-label="Chat on WhatsApp"
      >
        <div className="relative flex items-center justify-center flex-shrink-0">
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 border-2 border-emerald-600 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 border-2 border-emerald-600 rounded-full"></span>
          <MessageCircle className="w-5 h-5 text-white fill-white/10" />
        </div>

        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[12px] font-black tracking-wide leading-tight text-white">
            {lang === 'en' ? 'WhatsApp Chat' : 'হোয়াটসঅ্যাপে পরামর্শ'}
          </span>
          <span className="text-[10px] text-emerald-100 font-medium opacity-90 leading-tight">
            +88 01711-258708
          </span>
        </div>
      </a>
    </div>
  );
};



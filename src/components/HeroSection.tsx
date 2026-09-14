import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  lang?: Language;
  onOpenPreReg?: (pkg?: string) => void;
  onOpenWalkthrough?: () => void;
  onOpenPrintModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang = 'bn',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 'makkah',
      nameEn: 'Makkah Al-Mukarramah • Holy Kaaba',
      nameBn: 'পবিত্র মক্কা মুকাররমা • বাইতুল্লাহ শরিফ',
      labelBn: '📍 পবিত্র মক্কা মুকাররমা • বাইতুল্লাহ শরিফ',
      labelEn: '📍 Makkah Al-Mukarramah • Holy Kaaba',
      url: 'https://raw.githubusercontent.com/bcscbdcom-lgtm/MaskHajjGroup/main/public/images/scholars/makkah.jpg',
      fallback: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 'madinah',
      nameEn: 'Madinah Al-Munawwarah • Masjid an-Nabawi',
      nameBn: 'পবিত্র মদিনা মোনাওয়ারা • মসজিদে নববী',
      labelBn: '📍 পবিত্র মদিনা মুনাওয়ারা • মসজিদে নববী',
      labelEn: '📍 Madinah Al-Munawwarah • Masjid an-Nabawi',
      url: 'https://raw.githubusercontent.com/bcscbdcom-lgtm/MaskHajjGroup/main/public/images/scholars/madinah.jpg',
      fallback: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 'arafat',
      nameEn: 'Plains of Arafat • Jabal al-Rahmah',
      nameBn: 'আরাফাতের ময়দান • জাবালে রহমত',
      labelBn: '📍 জাবালে রহমত • আরাফাতের ময়দান',
      labelEn: '📍 Jabal al-Rahmah • Plains of Arafat',
      url: 'https://raw.githubusercontent.com/bcscbdcom-lgtm/MaskHajjGroup/main/public/images/scholars/arafat.jpg',
      fallback: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80',
    },
  ];

  // Auto cross-fade background every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <section id="home" className="relative overflow-hidden bg-white text-slate-900 py-16 lg:py-24 border-b border-emerald-100 min-h-[580px] flex items-center">
        
        {/* Full-Bleed Background Image Carousel Container */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } transition-transform duration-7000`}
            >
              <img
                src={slide.url}
                alt={lang === 'en' ? slide.nameEn : slide.nameBn}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== slide.fallback) {
                    target.src = slide.fallback;
                  }
                }}
              />
            </div>
          ))}

          {/* Seamless Soft Linear Horizontal Gradient Mask: Left side remains high-contrast & clean while blending into right photo */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/40 pointer-events-none z-10"></div>
          
          {/* Subtle geometric overlay pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#059669_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-6">
            
            {/* Soft Emerald Badge & Dynamic Location Indicator */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 bg-emerald-50/95 text-[#065F46] border border-emerald-200/90 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-[#065F46] animate-pulse"></span>
                <span>
                  {lang === 'en'
                    ? 'Since 2005 • Ministry Licensed #15630'
                    : '২০০৫ থেকে সেবায় নিয়োজিত • ধর্ম মন্ত্রণালয় লাইসেন্স নং ১৫৬৩০'}
                </span>
              </div>

              {/* Active Location Tag - Dynamically matched to active slide */}
              <div className="inline-flex items-center gap-1.5 bg-amber-50/95 text-amber-950 border border-amber-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs backdrop-blur-xs">
                <Compass className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '12s' }} />
                <span>{lang === 'en' ? heroSlides[currentSlide].labelEn : heroSlides[currentSlide].labelBn}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-[#0F172A] leading-[1.2] tracking-tight">
              {lang === 'en' ? (
                <>
                  Your sacred journey, <br />
                  <span className="text-[#065F46] font-serif">planned with trust & clarity</span>
                </>
              ) : (
                <>
                  আপনার পবিত্র সফর, <br />
                  <span className="text-[#065F46] font-serif">আস্থা ও নিখুঁত যত্নে</span> সুপরিকল্পিত।
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium max-w-xl">
              {lang === 'en'
                ? 'Licensed Hajj & Umrah support from Bangladesh to Makkah & Madinah under Islamic guidance — visa, flights, hotel near Haram, and dedicated scholar mentors.'
                : 'পবিত্র কুরআন ও সুন্নাহর আলোকে বাংলাদেশ থেকে মক্কা-মদিনায় নির্ভরযোগ্য হজ ও ওমরাহ সেবা — ভিসা, বিমান টিকিট, আরামদায়ক হোটেল এবং আলেমদের সার্বক্ষণিক তত্ত্বাবধান।'}
            </p>

            {/* Action Button: Single Prominent Primary Button */}
            <div className="pt-2">
              <a
                href="#packages"
                className="inline-flex items-center gap-2.5 bg-[#065F46] hover:bg-[#044E39] text-white text-base font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-700/30 transition-all group"
              >
                <span>{lang === 'en' ? 'View Hajj Packages' : 'হজ প্যাকেজসমূহ দেখুন'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Stats Row: Generous Spacing and Padding */}
            <div className="pt-8 mt-2 border-t border-slate-300/80 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-mono tracking-tight">
                  {lang === 'en' ? '1200+' : '১২০০+'}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                  {lang === 'en' ? 'Happy Pilgrims' : 'সফল ও সন্তুষ্ট হাজী'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#065F46] font-mono tracking-tight">
                  {lang === 'en' ? '21+ Yrs' : '২১+ বছর'}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                  {lang === 'en' ? 'Years Service' : 'সততা ও সেবার সুনাম'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono tracking-tight">
                  {lang === 'en' ? '★ 4.9' : '★ ৪.৯'}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                  {lang === 'en' ? 'Pilgrim Rating' : 'হাজী সন্তুষ্টি রেটিং'}
                </p>
              </div>
            </div>

            {/* 3 Subtle Slider Dot Indicators */}
            <div className="flex items-center gap-2 pt-3">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide ? 'w-8 bg-[#065F46]' : 'w-2.5 bg-slate-400 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Slim Subtle Spiritual Quranic Verse Banner Immediately Below Hero Section */}
      <div className="bg-amber-50/70 border-y border-amber-200/60 py-3 text-center relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-800">
          <span className="font-serif text-lg sm:text-xl font-bold text-[#065F46] tracking-wide">
            وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ
          </span>
          <span className="hidden sm:inline text-amber-400/80">•</span>
          <span className="text-xs sm:text-sm font-medium italic text-slate-700">
            {lang === 'en'
              ? '"And complete the Hajj and Umrah for Allah — Surah Al-Baqarah: 196"'
              : '"এবং আল্লাহর সন্তুষ্টির উদ্দেশ্যে হজ ও ওমরাহ পূর্ণ করো — সূরা আল-বাকারা: ১৯৬"'}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeroSection;



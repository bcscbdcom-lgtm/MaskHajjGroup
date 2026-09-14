import React from 'react';
import { ShieldCheck, BookOpen, MessageCircle, CheckCircle2, GraduationCap, Users, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import { Language } from '../types';

interface ScholarsSectionProps {
  lang?: Language;
  onOpenAskScholar?: () => void;
  onOpenPreReg?: (packageName?: string) => void;
}

export const ScholarsSection: React.FC<ScholarsSectionProps> = ({
  lang = 'bn',
  onOpenAskScholar,
  onOpenPreReg,
}) => {
  const whatsappMsg = encodeURIComponent(
    'মাওলানা খলিলুর রহমান সাহেবের সাথে পরামর্শ করতে চাই'
  );

  const featureTags = [
    { bn: 'সহীহ হজ প্রশিক্ষণ', en: 'Sahih Hajj Training' },
    { bn: 'তাওয়াফ-সাঈ পরিচালনা', en: 'Tawaf & Sa’i Guidance' },
    { bn: 'শরিয়াহ পরামর্শ', en: 'Shariah Consultation' },
    { bn: 'মক্কা-মদিনা জিয়ারত', en: 'Makkah-Madinah Ziyarah' },
  ];

  const valueCards = [
    {
      icon: GraduationCap,
      titleBn: 'সনদপ্রাপ্ত বিজ্ঞ আলেম',
      titleEn: 'Certified Scholar Mentors',
      descBn: 'ধর্ম বিষয়ক মন্ত্রণালয় ও শীর্ষ ইসলামী বিশ্ববিদ্যালয় থেকে সনদপ্রাপ্ত বিজ্ঞ ফকীহ ও অভিজ্ঞ মুফতীগণ।',
      descEn: 'MORA-certified jurists and experienced scholars from renowned Islamic universities.',
    },
    {
      icon: Sparkles,
      titleBn: 'বহুভাষিক সাবলীল যোগাযোগ',
      titleEn: 'Multilingual Communication',
      descBn: 'বাংলা, আরবি ও ইংরেজি ভাষায় পারদর্শী আলেমগণ মক্কা-মদিনার স্থানীয় কর্তৃপক্ষের সাথে যোগাযোগে সহায়ক।',
      descEn: 'Fluent in Bengali, Arabic, and English to liaise smoothly with Saudi authorities and guides.',
    },
    {
      icon: Users,
      titleBn: 'ছোট গ্রুপ ও নিবিড় যত্ন',
      titleEn: 'Small Groups & Dedicated Care',
      descBn: 'প্রতিটি ছোট দলের জন্য আলাদা আলেম গাইড নিয়োজিত থাকে যাতে বয়োজ্যেষ্ঠ ও নারী হাজীরা সমান যত্ন পান।',
      descEn: 'Dedicated scholar assigned to every small group to ensure elderly and female pilgrims receive personal guidance.',
    },
  ];

  return (
    <section
      id="scholars"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#063327] via-[#04261D] to-[#021812] text-white relative overflow-hidden border-y border-emerald-800/40 shadow-2xl"
    >
      {/* Background Subtle Pattern & Emerald-to-Slate Vignette Overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,51,39,0.3)_0%,rgba(2,24,18,0.85)_100%)] pointer-events-none z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-inner mb-4">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'en' ? 'Our Respected Scholar Mentors' : 'আমাদের সম্মানিত আলেম মেন্টরবৃন্দ'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
            {lang === 'en'
              ? 'Sacred Journey Under the Direct Guidance of Renowned Scholars'
              : 'বিজ্ঞ ও প্রখ্যাত আলেমদের সরাসরি তত্ত্বাবধানে পবিত্র সফর'}
          </h2>

          <p className="text-emerald-100/80 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            {lang === 'en'
              ? 'To ensure every step of your Hajj & Umrah is executed perfectly according to Quran and Sahih Sunnah, our caravans are led by renowned Shariah scholars and experienced Muftis.'
              : 'পবিত্র কুরআন ও সহীহ সুন্নাহ মোতাবেক হজের প্রতিটি আমল নিখুঁতভাবে আদায় নিশ্চিত করতে আমাদের কাফেলায় যুক্ত থাকেন স্বনামধন্য শরিয়াহ গবেষক ও মুফতি সাহেবগণ।'}
          </p>
        </div>

        {/* Main Featured Scholar Card */}
        <div className="bg-[#062c22]/90 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Photo & Name Badge Container (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl bg-[#031d16]">
                <img
                  src="/images/scholars/kholilur_rahman.jpg"
                  alt={lang === 'en' ? 'Alhaj Hazrat Maulana Khalilur Rahman' : 'আলহাজ্জ হযরত মাওলানা খলিলুর রহমান'}
                  className="w-full h-80 sm:h-96 object-cover object-top"
                  onError={(e) => {
                    // Try alternative local filename if needed
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('kholilur_rahman.jpg')) {
                      target.src = '/images/scholars/khalilur-rahman.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>

              {/* Clean White Badge Underneath / Overlaying */}
              <div className="w-full max-w-md -mt-6 relative z-10 bg-white text-slate-900 rounded-2xl p-4 shadow-xl border border-emerald-100 text-center">
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                  {lang === 'en'
                    ? 'Alhaj Hazrat Maulana Khalilur Rahman'
                    : 'আলহাজ্জ হযরত মাওলানা খলিলুর রহমান'}
                </p>
                <p className="text-[11px] font-semibold text-[#065F46] mt-1">
                  {lang === 'en'
                    ? 'CEO & Chief Caravan Mentor'
                    : 'সিইও ও কাফেলা প্রধান'}
                </p>
              </div>
            </div>

            {/* Right Bio & Service Features (7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'en' ? 'CEO & Chief Caravan Mentor' : 'সিইও ও কাফেলা প্রধান'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
                {lang === 'en'
                  ? 'Alhaj Hazrat Maulana Khalilur Rahman'
                  : 'আলহাজ্জ হযরত মাওলানা খলিলুর রহমান'}
              </h3>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                {lang === 'en'
                  ? 'Dedicated to Quran and Sahih Sunnah research & pilgrim mentorship for over 21+ years. Directly guides Bangladeshi pilgrims through Tawaf, Sa’i, Mina, Arafat, and Muzdalifah while providing instant Shariah solutions for all pilgrimage questions.'
                  : 'কুরআন ও সহীহ সুন্নাহর গবেষণায় সুদীর্ঘ ২১+ বছর নিয়োজিত। মক্কা মুকাররমা, মিনা, আরাফাত ও মুজদালিফায় বাংলাদেশী হাজী সাহেবানদের তাওয়াফ, সাঈ ও যাবতীয় আমল সরাসরি পরিচালনার পাশাপাশি সকল প্রকার শরিয়াহ মাসায়েলের তাৎক্ষণিক সমাধান প্রদান করেন।'}
              </p>

              {/* 4 Green Service Feature Tags - Refined Pill Shape with Light Emerald Border */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
                {featureTags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-emerald-950/70 text-emerald-100 border border-emerald-400/40 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:border-emerald-300/60 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    <span>{lang === 'en' ? tag.en : tag.bn}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/8801711258708?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm sm:text-base font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-slate-950" />
                  <span>
                    {lang === 'en' ? 'Speak Directly with Scholar →' : 'আলেমের সাথে সরাসরি কথা বলুন →'}
                  </span>
                </a>

                {onOpenAskScholar && (
                  <button
                    onClick={onOpenAskScholar}
                    className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 text-sm sm:text-base font-semibold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'en' ? 'Submit Question' : 'প্রশ্ন জমা দিন'}</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Grid: 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 sm:mt-16">
          {valueCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#04221a]/90 border border-emerald-800/50 hover:border-emerald-500/50 p-6 sm:p-7 rounded-2xl shadow-lg transition-all duration-300 text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 flex items-center justify-center text-xl mb-4 shadow-xs group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg mb-2 group-hover:text-emerald-300 transition-colors">
                  {lang === 'en' ? card.titleEn : card.titleBn}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                  {lang === 'en' ? card.descEn : card.descBn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ScholarsSection;

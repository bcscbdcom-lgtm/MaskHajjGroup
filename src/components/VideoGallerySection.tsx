import React, { useState } from 'react';
import { Play, Youtube, CheckCircle2, X, ExternalLink, Sparkles, Film, User, Calendar, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface VideoGallerySectionProps {
  lang?: Language;
  onOpenPreReg?: (pkg?: string) => void;
}

interface VideoItem {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  titleEn: string;
  titleBn: string;
  category: 'testimonial' | 'hajj_guide' | 'ziyarat' | 'facilities';
  categoryEn: string;
  categoryBn: string;
  duration: string;
  speakerEn: string;
  speakerBn: string;
  speakerRoleEn: string;
  speakerRoleBn: string;
  thumbnailUrl: string;
  summaryEn: string;
  summaryBn: string;
  year: string;
}

export const VideoGallerySection: React.FC<VideoGallerySectionProps> = ({
  lang = 'bn',
  onOpenPreReg,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);

  const videos: VideoItem[] = [
    {
      id: 'v1',
      youtubeId: '9No-FiEInLA',
      youtubeUrl: 'https://www.youtube.com/watch?v=9No-FiEInLA',
      titleEn: 'Pilgrim Experience — Hajj 2025 Caravan',
      titleBn: 'হাজী সাহেবের অনুভূতি — হজ ২০২৫ কাফেলা',
      category: 'testimonial',
      categoryEn: 'Testimonial',
      categoryBn: 'হাজীদের রিভিউ',
      duration: '3:45',
      speakerEn: 'Alhaj Md. Rafiqul Islam',
      speakerBn: 'আলহাজ্ব মোঃ রফিকুল ইসলাম',
      speakerRoleEn: 'Hajj 2025 Pilgrim • Dhaka',
      speakerRoleBn: 'হাজী ২০২৫ • ধানমন্ডি, ঢাকা',
      thumbnailUrl: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Extremely satisfied with 5-star hotel placement 2 mins from Haram and round-the-clock guidance from Islamic scholars.',
      summaryBn: 'হারাম শরিফের অত্যন্ত কাছে ৫-স্টার হোটেল, চমৎকার বাংলাদেশি খাবার এবং অভিজ্ঞ আলেমদের নিবিড় যত্নে আমাদের হজ সফর ছিল নিখুঁত ও প্রশান্তিদায়ক।',
      year: '2025',
    },
    {
      id: 'v2',
      youtubeId: '3U8dYm8qjC4',
      youtubeUrl: 'https://www.youtube.com/watch?v=3U8dYm8qjC4',
      titleEn: 'Umrah Family Tour Review & Hotel Experience',
      titleBn: 'ওমরাহ কাফেলার বিশেষ অভিজ্ঞতা ও ফাইভ স্টার হোটেল রিভিউ',
      category: 'testimonial',
      categoryEn: 'Testimonial',
      categoryBn: 'হাজীদের রিভিউ',
      duration: '4:12',
      speakerEn: 'Dr. Ashraf Hossain & Family',
      speakerBn: 'ড. আশরাফ হোসেন ও পরিবার',
      speakerRoleEn: 'Umrah Pilgrim • Uttara, Dhaka',
      speakerRoleBn: 'ওমরাহ হাজী • উত্তরা, ঢাকা',
      thumbnailUrl: 'https://images.unsplash.com/photo-1565552070094-bf0578056dbe?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Smooth direct flight from Dhaka to Madinah, seamless visa process, and luxury family room accommodation.',
      summaryBn: 'ঢাকা থেকে সরাসরি মদিনা ফ্লাইট, দ্রুততম ভিসা প্রক্রিয়াকরণ এবং মক্কা-মদিনায় পবিত্র হারামের কাছেই আরামদায়ক পারিবারিক আবাসন ব্যবস্থা।',
      year: '2025',
    },
    {
      id: 'v3',
      youtubeId: 'L8u_A5Y1yFA',
      youtubeUrl: 'https://www.youtube.com/watch?v=L8u_A5Y1yFA',
      titleEn: 'Hajj 2026–2027 Pre-Registration Rules & Guidelines',
      titleBn: 'হজের সঠিক নিয়ম ও সরকারি প্রাক-নিবন্ধন নির্দেশিকা ২০২৬-২০২৭',
      category: 'hajj_guide',
      categoryEn: 'Hajj Guide',
      categoryBn: 'হজ সহায়িকা',
      duration: '8:30',
      speakerEn: 'Mufti Mahfuzur Rahman',
      speakerBn: 'মাওলানা মুফতি মাহফুজুর রহমান',
      speakerRoleEn: 'Head Religious Mentor • MASK Hajj Group',
      speakerRoleBn: 'প্রধান আলেম গাইড • মাস্ক হজ গ্রুপ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Step-by-step tutorial explaining government quota registration, medical checks, and essential Hajj rituals preparation.',
      summaryBn: 'বাংলাদেশ ধর্ম মন্ত্রণালয়ের প্রাক-নিবন্ধন নিয়মাবলি, মেডিকেল টেস্ট এবং হজের প্রস্তুতি সম্পর্কে আলেম সাহেবের সরাসরি দিকনির্দেশনা।',
      year: '2026',
    },
    {
      id: 'v4',
      youtubeId: '5qap5aO4i9A',
      youtubeUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
      titleEn: 'Mina AC Tents & Arafat Camp Facilities Tour',
      titleBn: 'মাকতাব মিনা এসি তাম্বু ও আরাফাতে মাস্ক হজ গ্রুপের সেবা',
      category: 'facilities',
      categoryEn: 'Facilities',
      categoryBn: 'তাঁবু ও খিদমত',
      duration: '5:15',
      speakerEn: 'Engr. Tanvir Ahmed',
      speakerBn: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
      speakerRoleEn: 'Hajj 2024 Pilgrim • Cumilla',
      speakerRoleBn: 'হাজী ২০২৪ • কুমিল্লা',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'On-ground video inside Mina VIP air-conditioned tents showing hygienic meals, clean washrooms, and dedicated support staff.',
      summaryBn: 'মিনায় সুশীতল এয়ার-কন্ডিশন তাঁবু, তাজা হালাল খাবার এবং আরাফাতের মাঠে সার্বক্ষণিক পানির ব্যবস্থা ও ছায়াদার সেবা সরাসরি দেখুন।',
      year: '2024',
    },
    {
      id: 'v5',
      youtubeId: 'V-_O7nl0IiU',
      youtubeUrl: 'https://www.youtube.com/watch?v=V-_O7nl0IiU',
      titleEn: 'Dedicated Support & Safety for Female Pilgrims',
      titleBn: 'মহিলা হাজীদের বিশেষ নিরাপত্তা ও মহিলা গাইড সেবা',
      category: 'testimonial',
      categoryEn: 'Testimonial',
      categoryBn: 'হাজীদের রিভিউ',
      duration: '3:10',
      speakerEn: 'Begum Khadija Akter & Daughters',
      speakerBn: 'বেগম খাদিজা আক্তার ও পরিবার',
      speakerRoleEn: 'Hajj 2025 Pilgrim • Sylhet',
      speakerRoleBn: 'হাজী ২০২৫ • সিলেট',
      thumbnailUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Heartfelt account of female pilgrim security, dedicated female guides for Tawaf/Saee, and family care.',
      summaryBn: 'মহিলা হাজীদের জন্য পৃথক নিরাপদ আবাসন, মহিলা আলেমা গাইড এবং তাওয়াফ-সাইয়ের সময় বিশেষ সহযোগিতা পাওয়ার অনুভূতি।',
      year: '2025',
    },
    {
      id: 'v6',
      youtubeId: 'kJQP7kiw5Fk',
      youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      titleEn: 'Historical Ziyarat Tour in Makkah & Madinah',
      titleBn: 'পবিত্র মক্কা ও মদিনের ঐতিহাসিক স্থানসমূহ জিয়ারত',
      category: 'ziyarat',
      categoryEn: 'Ziyarat Tour',
      categoryBn: 'জিয়ারত সফর',
      duration: '6:00',
      speakerEn: 'MASK Hajj Media Team',
      speakerBn: 'মাস্ক হজ গ্রুপ মিডিয়া টিম',
      speakerRoleEn: 'Official Guided Ziyarat Caravan',
      speakerRoleBn: 'অফিসিয়াল জিয়ারত কাফেলা',
      thumbnailUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Guided tour of Jabal al-Nour, Cave of Hira, Jabal Thawr, Masjid Quba, and Mount Uhud with expert scholars.',
      summaryBn: 'জাবালে নূর, হেরা গুহা, জাবালে ছাওর, মসজিদে কুবা এবং ঐতিহাসিক ওহুদ প্রাঙ্গণে আলেমদের তাৎপর্য ব্যাখ্যাসহ স্মরণীয় সফর।',
      year: '2025',
    },
  ];

  const categories = [
    { id: 'all', labelEn: 'All Videos', labelBn: 'সকল ভিডিও' },
    { id: 'testimonial', labelEn: 'Pilgrim Testimonials', labelBn: 'হাজীদের রিভিউ' },
    { id: 'hajj_guide', labelEn: 'Hajj Guidance', labelBn: 'হজ সহায়িকা' },
    { id: 'facilities', labelEn: 'Tent & Facilities', labelBn: 'তাঁবু ও খিদমত' },
    { id: 'ziyarat', labelEn: 'Ziyarat Highlights', labelBn: 'জিয়ারত সফর' },
  ];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  return (
    <section id="videos" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-[#FAF9F5] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-b border-slate-100 dark:border-slate-800">
      
      {/* Background Decorative Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(#064e3b_0.75px,transparent_0.75px)] dark:bg-[radial-gradient(#34d399_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/90 dark:border-emerald-800/80 px-4 py-1.5 rounded-full text-xs font-semibold text-[#064E3B] dark:text-emerald-300 shadow-2xs">
            <Film className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {lang === 'en' ? 'Video Library • Real Pilgrim Experiences' : 'ভিডিও গ্যালারি • বাস্তব অভিজ্ঞতা ও ভিডিও চিত্র'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {lang === 'en' ? (
              <>
                Watch Our <span className="text-[#064E3B] dark:text-emerald-400 font-serif">Pilgrim Testimonials</span> & Guides
              </>
            ) : (
              <>
                হাজী সাহেবদের <span className="text-[#064E3B] dark:text-emerald-400 font-serif">অনভূতির ভিডিও ও নির্দেশনা</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {lang === 'en'
              ? 'Watch authentic video reviews from our honored pilgrims, hotel walkthroughs near Haram, Mina tent services, and Islamic guidance.'
              : 'মাস্ক হজ গ্রুপের কাফেলার সরাসরি ভিডিও চিত্র, সম্মানিত হাজী সাহেবদের অভিব্যক্তি এবং আলেমদের প্রয়োজনীয় প্রাক-নিবন্ধন দিকনির্দেশনা দেখুন।'}
          </p>

          {/* Official YouTube Channel Pill Button */}
          <div className="pt-2">
            <a
              href="https://www.youtube.com/@MASKHajjGroup"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4.5 py-2 rounded-full shadow-xs hover:shadow transition cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>{lang === 'en' ? 'Visit Official YouTube Channel' : 'অফিসিয়াল ইউটিউব চ্যানেল সাবস্ক্রাইব করুন'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#064E3B] dark:hover:border-emerald-500'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelBn}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
                onClick={() => setActiveVideoModal(video)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={lang === 'en' ? video.titleEn : video.titleBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-slate-950/90 text-amber-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-xs flex items-center gap-1">
                  <span>▶</span>
                  <span>{video.duration}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3 bg-[#064E3B]/90 text-emerald-100 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-600/40 backdrop-blur-xs">
                  {lang === 'en' ? video.categoryEn : video.categoryBn}
                </div>

                {/* Year Pill */}
                <div className="absolute top-3 right-3 bg-slate-900/80 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                  {video.year}
                </div>

                {/* Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-700/90 text-white flex items-center justify-center shadow-lg group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300 border-2 border-white/80">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => setActiveVideoModal(video)}
                    className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-[#064E3B] dark:hover:text-emerald-400 transition cursor-pointer leading-snug"
                  >
                    {lang === 'en' ? video.titleEn : video.titleBn}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {lang === 'en' ? video.summaryEn : video.summaryBn}
                  </p>
                </div>

                {/* Speaker Info */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-[#064E3B] dark:text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {lang === 'en' ? video.speakerEn : video.speakerBn}
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono flex-shrink-0">
                    {lang === 'en' ? video.speakerRoleEn : video.speakerRoleBn}
                  </span>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setActiveVideoModal(video)}
                    className="bg-[#064E3B] hover:bg-[#04392b] text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-2xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>{lang === 'en' ? 'Watch Video' : 'ভিডিও দেখুন'}</span>
                  </button>

                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-600" />
                    <span>{lang === 'en' ? 'YouTube' : 'ইউটিউব'}</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 bg-gradient-to-r from-emerald-950 via-[#064E3B] to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-amber-300">
              {lang === 'en' ? 'Have questions about our Hajj & Umrah Caravans?' : 'আমাদের সেবা ও প্রাক-নিবন্ধন সম্পর্কে সরাসরি কথা বলুন'}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100">
              {lang === 'en'
                ? 'Speak directly with our senior mentors or visit our Paltan office for full itinerary details.'
                : 'আমাদের প্রবীণ আলেম গাইডদের সাথে মোবাইল ফোন বা সরাসরি অফিসে এসে পরামর্শ নিন।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            {onOpenPreReg && (
              <button
                onClick={() => onOpenPreReg()}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl shadow transition cursor-pointer"
              >
                {lang === 'en' ? 'Book Free Consultation' : 'ফ্রি পরামর্শ বুকিং করুন'}
              </button>
            )}

            <a
              href="tel:+8801711258708"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold px-4.5 py-3 rounded-xl transition flex items-center gap-2"
            >
              <span>📞 +88 01711-258708</span>
            </a>
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 truncate pr-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-sm font-bold truncate">
                  {lang === 'en' ? activeVideoModal.titleEn : activeVideoModal.titleBn}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                title={lang === 'en' ? activeVideoModal.titleEn : activeVideoModal.titleBn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Content Info */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {lang === 'en' ? activeVideoModal.speakerEn : activeVideoModal.speakerBn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'en' ? activeVideoModal.speakerRoleEn : activeVideoModal.speakerRoleBn}
                  </p>
                </div>

                <a
                  href={activeVideoModal.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5"
                >
                  <Youtube className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Open in YouTube' : 'ইউটিউবে বড় পর্দায় দেখুন'}</span>
                </a>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {lang === 'en' ? activeVideoModal.summaryEn : activeVideoModal.summaryBn}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 bg-emerald-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-emerald-100 dark:border-slate-700">
                <span className="text-xs text-[#064E3B] dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'en' ? 'Official Verified Pilgrim Video' : 'মাস্ক হজ গ্রুপ ভেরিফাইড হাজী অভিজ্ঞতা'}</span>
                </span>

                {onOpenPreReg && (
                  <button
                    onClick={() => {
                      setActiveVideoModal(null);
                      onOpenPreReg('Video Gallery Inquiry');
                    }}
                    className="bg-[#064E3B] hover:bg-[#04392b] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-2xs transition cursor-pointer"
                  >
                    {lang === 'en' ? 'Inquire Now' : 'পরামর্শের আবেদন'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default VideoGallerySection;

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

  // সব ভিডিও MASK Hajj Group-এর অফিসিয়াল ইউটিউব চ্যানেল (@MASKHAJJGROUP) থেকে নেওয়া — আসল হাজী সাহেবদের মতামত।
  // থাম্বনেইল ইউটিউব থেকেই আসে, আলাদা ছবি লাগে না। নতুন ভিডিও যোগ করতে শুধু youtubeId বসান।
  const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;
  const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  const videos: VideoItem[] = [
    {
      id: 'v1',
      youtubeId: 'AFBKfUiFS_s',
      youtubeUrl: yt('AFBKfUiFS_s'),
      titleEn: '"We got exactly what was promised" — Pilgrim Review',
      titleBn: 'যেমন কথা তেমন কাজ পেয়েছি — মাস্ক হজ গ্রুপকে ধন্যবাদ',
      category: 'testimonial',
      categoryEn: 'Pilgrim Review',
      categoryBn: 'হাজীদের মতামত',
      duration: '0:40',
      speakerEn: 'MASK Hajj Group Pilgrim',
      speakerBn: 'মাস্ক হজ গ্রুপের হাজী সাহেব',
      speakerRoleEn: 'Verified Pilgrim • 2026',
      speakerRoleBn: 'হাজী সাহেব • ২০২৬',
      thumbnailUrl: thumb('AFBKfUiFS_s'),
      summaryEn: 'A returning pilgrim shares that every service promised before departure was delivered on the ground.',
      summaryBn: 'সফর শেষে ফিরে আসা হাজী সাহেব জানাচ্ছেন — যাত্রার আগে যা বলা হয়েছিল, মাঠে ঠিক তাই পেয়েছেন।',
      year: '2026',
    },
    {
      id: 'v2',
      youtubeId: '6a8g2wqnKR0',
      youtubeUrl: yt('6a8g2wqnKR0'),
      titleEn: '22 October Direct-Flight Pilgrim — Service Feedback',
      titleBn: '২২ অক্টোবর ডিরেক্ট ফ্লাইটের হাজী সাহেবের সার্ভিস সম্পর্কে মতামত',
      category: 'testimonial',
      categoryEn: 'Pilgrim Review',
      categoryBn: 'হাজীদের মতামত',
      duration: '0:56',
      speakerEn: 'Umrah Pilgrim (22 Oct departure)',
      speakerBn: 'ওমরাহ যাত্রী (২২ অক্টোবর কাফেলা)',
      speakerRoleEn: 'Direct Flight • 2026',
      speakerRoleBn: 'ডিরেক্ট ফ্লাইট • ২০২৬',
      thumbnailUrl: thumb('6a8g2wqnKR0'),
      summaryEn: 'Feedback from a pilgrim who travelled on the 22 October direct-flight Umrah group.',
      summaryBn: '২২ অক্টোবরের ডিরেক্ট ফ্লাইট ওমরাহ কাফেলায় যাওয়া হাজী সাহেবের আলহামদুলিল্লাহ-মতামত।',
      year: '2026',
    },
    {
      id: 'v3',
      youtubeId: 'j8HMDNcM25s',
      youtubeUrl: yt('j8HMDNcM25s'),
      titleEn: '"I am satisfied with my Umrah through MASK Hajj Group"',
      titleBn: 'মাস্ক হজ গ্রুপের মাধ্যমে ওমরাহ এসে আমি সন্তুষ্ট',
      category: 'testimonial',
      categoryEn: 'Pilgrim Review',
      categoryBn: 'হাজীদের মতামত',
      duration: '1:20',
      speakerEn: 'Umrah Pilgrim',
      speakerBn: 'ওমরাহ যাত্রী',
      speakerRoleEn: 'Umrah • 2026',
      speakerRoleBn: 'ওমরাহ • ২০২৬',
      thumbnailUrl: thumb('j8HMDNcM25s'),
      summaryEn: 'An Umrah pilgrim describes hotel, transport and guidance received during the journey.',
      summaryBn: 'ওমরাহ যাত্রী সফরের হোটেল, যাতায়াত ও মুয়াল্লিমের সহযোগিতা নিয়ে নিজের সন্তুষ্টির কথা বলছেন।',
      year: '2026',
    },
    {
      id: 'v4',
      youtubeId: 'Jk6h_fp-yVM',
      youtubeUrl: yt('Jk6h_fp-yVM'),
      titleEn: '16 August Direct-Flight Pilgrim — Service Feedback',
      titleBn: '১৬ আগস্ট ডিরেক্ট ফ্লাইটের হাজী সাহেবের মতামত',
      category: 'testimonial',
      categoryEn: 'Pilgrim Review',
      categoryBn: 'হাজীদের মতামত',
      duration: '0:49',
      speakerEn: 'Umrah Pilgrim (16 Aug departure)',
      speakerBn: 'ওমরাহ যাত্রী (১৬ আগস্ট কাফেলা)',
      speakerRoleEn: 'Direct Flight • 2026',
      speakerRoleBn: 'ডিরেক্ট ফ্লাইট • ২০২৬',
      thumbnailUrl: thumb('Jk6h_fp-yVM'),
      summaryEn: 'Feedback from the 16 August direct-flight Umrah group.',
      summaryBn: '১৬ আগস্টের ডিরেক্ট ফ্লাইট ওমরাহ কাফেলার হাজী সাহেবের মতামত।',
      year: '2026',
    },
    {
      id: 'v5',
      youtubeId: 'wk8jl8PE9P8',
      youtubeUrl: yt('wk8jl8PE9P8'),
      titleEn: 'Pilgrim Moinul Islam (Govt. Employee) on MASK Hajj Group',
      titleBn: 'সম্মানিত হাজি জনাব মঈনুল ইসলাম (সরকারি চাকরিজীবী) এর মন্তব্য',
      category: 'testimonial',
      categoryEn: 'Pilgrim Review',
      categoryBn: 'হাজীদের মতামত',
      duration: 'Short',
      speakerEn: 'Moinul Islam',
      speakerBn: 'জনাব মঈনুল ইসলাম',
      speakerRoleEn: 'Government Employee • Pilgrim',
      speakerRoleBn: 'সরকারি চাকরিজীবী • হাজী',
      thumbnailUrl: thumb('wk8jl8PE9P8'),
      summaryEn: 'A government employee shares his experience of performing the pilgrimage with MASK Hajj Group.',
      summaryBn: 'সরকারি চাকরিজীবী হাজী জনাব মঈনুল ইসলাম মাস্ক হজ গ্রুপের সাথে তাঁর সফরের অভিজ্ঞতা জানাচ্ছেন।',
      year: '2025',
    },
    {
      id: 'v6',
      youtubeId: 'gjB5nR5b9M8',
      youtubeUrl: yt('gjB5nR5b9M8'),
      titleEn: 'Umrah Pilgrim Review — Sayem Mojumder',
      titleBn: 'ওমরাহ যাত্রীর রিভিউ — সায়েম মজুমদার',
      category: 'testimonial',
      categoryEn: 'Pilgrim Review',
      categoryBn: 'হাজীদের মতামত',
      duration: 'Short',
      speakerEn: 'Sayem Mojumder',
      speakerBn: 'সায়েম মজুমদার',
      speakerRoleEn: 'Umrah Pilgrim',
      speakerRoleBn: 'ওমরাহ যাত্রী',
      thumbnailUrl: thumb('gjB5nR5b9M8'),
      summaryEn: 'Umrah experience shared by pilgrim Sayem Mojumder.',
      summaryBn: 'ওমরাহ যাত্রী সায়েম মজুমদারের অভিজ্ঞতা ও মতামত।',
      year: '2024',
    },
    {
      id: 'v7',
      youtubeId: 'TKRb-xJ7kMc',
      youtubeUrl: yt('TKRb-xJ7kMc'),
      titleEn: 'Our Pilgrims Speak About Our Service — Affordable Umrah',
      titleBn: 'সার্ভিস সম্পর্কে আমাদের হাজী সাহেবদের মতামত — সাশ্রয়ী প্যাকেজে ওমরাহ',
      category: 'testimonial',
      categoryEn: 'Pilgrim Review',
      categoryBn: 'হাজীদের মতামত',
      duration: '1:08',
      speakerEn: 'MASK Hajj Group Pilgrims',
      speakerBn: 'মাস্ক হজ গ্রুপের হাজী সাহেবগণ',
      speakerRoleEn: 'Umrah Group • 2026',
      speakerRoleBn: 'ওমরাহ কাফেলা • ২০২৬',
      thumbnailUrl: thumb('TKRb-xJ7kMc'),
      summaryEn: 'Several pilgrims share their opinion about the service after completing Umrah.',
      summaryBn: 'ওমরাহ শেষে একাধিক হাজী সাহেব সার্ভিস নিয়ে তাঁদের মতামত জানাচ্ছেন।',
      year: '2026',
    },
    {
      id: 'v8',
      youtubeId: '2L7JlM9zNX0',
      youtubeUrl: yt('2L7JlM9zNX0'),
      titleEn: 'Hajj 2027 Pre-Registration Is Open — MASK Hajj Group',
      titleBn: '২০২৭ সালের হজের প্রাক-নিবন্ধন চলছে — মাস্ক হজ গ্রুপ',
      category: 'hajj_guide',
      categoryEn: 'Hajj Announcement',
      categoryBn: 'হজ ঘোষণা',
      duration: '1:22',
      speakerEn: 'MASK Hajj Group',
      speakerBn: 'মাস্ক হজ গ্রুপ',
      speakerRoleEn: 'Official Announcement',
      speakerRoleBn: 'অফিসিয়াল ঘোষণা',
      thumbnailUrl: thumb('2L7JlM9zNX0'),
      summaryEn: 'Announcement video about Hajj pre-registration through MASK Hajj Group. Call 01713-009567.',
      summaryBn: 'মাস্ক হজ গ্রুপের মাধ্যমে হজের প্রাক-নিবন্ধন সংক্রান্ত ঘোষণা। যোগাযোগ: ০১৭১৩-০০৯৫৬৭।',
      year: '2026',
    },
    {
      id: 'v9',
      youtubeId: 'rg69oi6y-qo',
      youtubeUrl: yt('rg69oi6y-qo'),
      titleEn: 'A Message from Chairman Maulana Khalilur Rahman',
      titleBn: 'অপপ্রচারে বিভ্রান্ত না হওয়ার অনুরোধ — চেয়ারম্যান মাওলানা খলিলুর রহমান',
      category: 'hajj_guide',
      categoryEn: 'Chairman Message',
      categoryBn: 'চেয়ারম্যানের বার্তা',
      duration: '4:07',
      speakerEn: 'Maulana Khalilur Rahman',
      speakerBn: 'মাওলানা খলিলুর রহমান',
      speakerRoleEn: 'Chairman • MASK Hajj Group',
      speakerRoleBn: 'চেয়ারম্যান • মাস্ক হজ গ্রুপ',
      thumbnailUrl: thumb('rg69oi6y-qo'),
      summaryEn: 'The Chairman addresses pilgrims directly and requests everyone not to be misled by misinformation.',
      summaryBn: 'চেয়ারম্যান মাওলানা খলিলুর রহমান সরাসরি হাজী সাহেবদের উদ্দেশ্যে কথা বলছেন এবং অপপ্রচারে বিভ্রান্ত না হওয়ার অনুরোধ জানাচ্ছেন।',
      year: '2026',
    },
    {
      id: 'v10',
      youtubeId: '_JEN4fEgn1I',
      youtubeUrl: yt('_JEN4fEgn1I'),
      titleEn: "Chairman's Call to Hajj & Umrah Pilgrims",
      titleBn: 'হজ ও ওমরাহ যাত্রীদের প্রতি চেয়ারম্যান মাওলানা খলিলুর রহমানের আহ্বান',
      category: 'hajj_guide',
      categoryEn: 'Chairman Message',
      categoryBn: 'চেয়ারম্যানের বার্তা',
      duration: 'Short',
      speakerEn: 'Maulana Khalilur Rahman',
      speakerBn: 'মাওলানা খলিলুর রহমান',
      speakerRoleEn: 'Chairman • MASK Hajj Group',
      speakerRoleBn: 'চেয়ারম্যান • মাস্ক হজ গ্রুপ',
      thumbnailUrl: thumb('_JEN4fEgn1I'),
      summaryEn: 'A short invitation from the Chairman to intending Hajj and Umrah pilgrims.',
      summaryBn: 'হজ ও ওমরাহ করতে ইচ্ছুকদের প্রতি চেয়ারম্যানের সংক্ষিপ্ত আহ্বান।',
      year: '2025',
    },
    {
      id: 'v11',
      youtubeId: 'hOQSu9WzSJc',
      youtubeUrl: yt('hOQSu9WzSJc'),
      titleEn: 'Mu\'allim & Pilgrims Set Out for Ziyarah',
      titleBn: 'জিয়ারাহর উদ্দেশ্যে বের হয়েছেন মাস্ক হজ গ্রুপের মুয়াল্লিম ও যাত্রীগণ',
      category: 'ziyarat',
      categoryEn: 'Caravan & Ziyarat',
      categoryBn: 'কাফেলা ও জিয়ারত',
      duration: '1:33',
      speakerEn: 'MASK Hajj Caravan',
      speakerBn: 'মাস্ক হজ কাফেলা',
      speakerRoleEn: 'On-ground Footage',
      speakerRoleBn: 'সরাসরি ধারণকৃত',
      thumbnailUrl: thumb('hOQSu9WzSJc'),
      summaryEn: 'Real footage of the MASK Hajj Group caravan leaving for Ziyarah with their Mu\'allim.',
      summaryBn: 'মুয়াল্লিমের নেতৃত্বে মাস্ক হজ গ্রুপের যাত্রীদের জিয়ারতে যাওয়ার সরাসরি ভিডিও।',
      year: '2024',
    },
    {
      id: 'v12',
      youtubeId: '8EbXDO-7fg0',
      youtubeUrl: yt('8EbXDO-7fg0'),
      titleEn: 'MASK Hajj Caravan',
      titleBn: 'মাস্ক হজ কাফেলা',
      category: 'ziyarat',
      categoryEn: 'Caravan & Ziyarat',
      categoryBn: 'কাফেলা ও জিয়ারত',
      duration: '1:46',
      speakerEn: 'MASK Hajj Caravan',
      speakerBn: 'মাস্ক হজ কাফেলা',
      speakerRoleEn: 'On-ground Footage',
      speakerRoleBn: 'সরাসরি ধারণকৃত',
      thumbnailUrl: thumb('8EbXDO-7fg0'),
      summaryEn: 'Glimpses of the MASK Hajj Group caravan in the Holy Land.',
      summaryBn: 'পবিত্র ভূমিতে মাস্ক হজ গ্রুপের কাফেলার কিছু মুহূর্ত।',
      year: '2024',
    },
    {
      id: 'v13',
      youtubeId: 'XwhhfB3YdOM',
      youtubeUrl: yt('XwhhfB3YdOM'),
      titleEn: 'Visit Our Office — China Town East Tower, Naya Paltan',
      titleBn: 'সরাসরি অফিসে এসে আলাপ করুন — চায়না টাউন, পূর্ব টাওয়ার, লিফটের ২০, অফিস ২১/২',
      category: 'facilities',
      categoryEn: 'Office & Services',
      categoryBn: 'অফিস ও সেবা',
      duration: 'Short',
      speakerEn: 'MASK Hajj Group',
      speakerBn: 'মাস্ক হজ গ্রুপ',
      speakerRoleEn: 'Dhaka Office',
      speakerRoleBn: 'ঢাকা অফিস',
      thumbnailUrl: thumb('XwhhfB3YdOM'),
      summaryEn: 'How to find our Dhaka office in person for consultation.',
      summaryBn: 'পরামর্শের জন্য আমাদের ঢাকা অফিসে কীভাবে আসবেন।',
      year: '2025',
    },
  ];

  const categories = [
    { id: 'all', labelEn: 'All Videos', labelBn: 'সকল ভিডিও' },
    { id: 'testimonial', labelEn: 'Pilgrim Reviews', labelBn: 'হাজীদের মতামত' },
    { id: 'hajj_guide', labelEn: 'Announcements & Messages', labelBn: 'ঘোষণা ও বার্তা' },
    { id: 'ziyarat', labelEn: 'Caravan & Ziyarat', labelBn: 'কাফেলা ও জিয়ারত' },
    { id: 'facilities', labelEn: 'Office & Services', labelBn: 'অফিস ও সেবা' },
  ];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  return (
    <section id="videos" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-[#FAF9F5] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-b border-slate-100 dark:border-slate-800">
      
      {/* Background Decorative Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B6B4A_0.75px,transparent_0.75px)] dark:bg-[radial-gradient(#34d399_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/90 dark:border-emerald-800/80 px-4 py-1.5 rounded-full text-xs font-semibold text-[#1B6B4A] dark:text-emerald-300 shadow-2xs">
            <Film className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {lang === 'en' ? 'Video Library • From Our Official YouTube Channel' : 'ভিডিও গ্যালারি • আমাদের অফিসিয়াল ইউটিউব চ্যানেল থেকে'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {lang === 'en' ? (
              <>
                Watch Our <span className="text-[#1B6B4A] dark:text-emerald-400 font-serif">Pilgrim Testimonials</span> & Guides
              </>
            ) : (
              <>
                হাজী সাহেবদের <span className="text-[#1B6B4A] dark:text-emerald-400 font-serif">অনভূতির ভিডিও ও নির্দেশনা</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {lang === 'en'
              ? 'Real feedback from our pilgrims, messages from our Chairman, and on-ground caravan footage — all from the official MASK Hajj Group YouTube channel.'
              : 'মাস্ক হজ গ্রুপের কাফেলার সরাসরি ভিডিও চিত্র, সম্মানিত হাজী সাহেবদের অভিব্যক্তি এবং আলেমদের প্রয়োজনীয় প্রাক-নিবন্ধন দিকনির্দেশনা দেখুন।'}
          </p>

          {/* Official YouTube Channel Pill Button */}
          <div className="pt-2">
            <a
              href="https://www.youtube.com/@MASKHAJJGROUP"
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
                  ? 'bg-[#1B6B4A] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#1B6B4A] dark:hover:border-emerald-500'
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
                <div className="absolute top-3 left-3 bg-[#1B6B4A]/90 text-emerald-100 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-600/40 backdrop-blur-xs">
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
                    className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-[#1B6B4A] dark:hover:text-emerald-400 transition cursor-pointer leading-snug"
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
                    <User className="w-3.5 h-3.5 text-[#1B6B4A] dark:text-emerald-400 flex-shrink-0" />
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
                    className="bg-[#1B6B4A] hover:bg-[#14533A] text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-2xs transition flex items-center justify-center gap-1.5 cursor-pointer"
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
        <div className="mt-14 bg-gradient-to-r from-emerald-950 via-[#1B6B4A] to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
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
              href="tel:+8801713009567"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold px-4.5 py-3 rounded-xl transition flex items-center gap-2"
            >
              <span>📞 +88 01713-009567</span>
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
                <span className="text-xs text-[#1B6B4A] dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'en' ? 'From our official YouTube channel' : 'মাস্ক হজ গ্রুপের অফিসিয়াল ইউটিউব চ্যানেল থেকে'}</span>
                </span>

                {onOpenPreReg && (
                  <button
                    onClick={() => {
                      setActiveVideoModal(null);
                      onOpenPreReg('Video Gallery Inquiry');
                    }}
                    className="bg-[#1B6B4A] hover:bg-[#14533A] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-2xs transition cursor-pointer"
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

import React from 'react';
import {
  Compass,
  Plane,
  FileCheck2,
  Ticket,
  Hotel,
  GraduationCap,
  Headset,
  MapPin,
} from 'lucide-react';
import { Language } from '../types';

interface ServicesGridProps {
  lang: Language;
  onSelectService: (serviceName: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ lang, onSelectService }) => {
  const services = [
    {
      id: 'hajj',
      icon: Compass,
      nameEn: 'Hajj Packages',
      nameBn: 'হজ প্যাকেজসমূহ',
      descEn: 'Multiple tiers from Budget to VIP Luxury, Saudi Ministry approved with complete Mina camp care.',
      descBn: 'সাশ্রয়ী থেকে শুরু করে প্রিমিয়াম ও ভিআইপি ক্যাটাগরির অনুমোদিত হজ প্যাকেজ ও মিনা ক্যাম্প সেবা।',
    },
    {
      id: 'umrah',
      icon: Plane,
      nameEn: 'Umrah Packages',
      nameBn: 'ওমরাহ প্যাকেজসমূহ',
      descEn: 'Year-round departures, family-friendly itineraries, winter specials, and blessed Ramadan caravans.',
      descBn: 'সারা বছর প্রতি সপ্তাহে গ্রুপ ও ফ্যামিলি ওমরাহ, শীতকালীন সফর এবং বিশেষ রমজান কাফেলা।',
    },
    {
      id: 'visa',
      icon: FileCheck2,
      nameEn: 'Visa Processing',
      nameBn: 'ভিসা প্রসেসিং',
      descEn: 'Nusuk electronic visas, tourist e-visas, biometric appointment coordination, and fast approvals.',
      descBn: 'নুসুক ই-ভিসা, ওমরাহ ও পারিবারিক ভিসার ঝামেলাহীন দ্রুততম সমাধান ও বায়োমেট্রিক সহায়তা।',
    },
    {
      id: 'flights',
      icon: Ticket,
      nameEn: 'Flight Bookings',
      nameBn: 'ফ্লাইট বুকিং',
      descEn: 'Biman Bangladesh, Saudia Airlines, Fly Nas — best direct group fares departing from Dhaka.',
      descBn: 'সৌদি এয়ারলাইন্স, বাংলাদেশ বিমান ও ফ্লাইনাসে সেরা গ্রুপ রেটের সরাসরি ঢাকা রিটার্ন টিকিট।',
    },
    {
      id: 'hotels',
      icon: Hotel,
      nameEn: 'Hotel Accommodation',
      nameBn: 'হোটেল আবাসন',
      descEn: '3★ to 5★ luxury front-row hotels near Haram courtyard in Makkah and central Markaziyah in Madinah.',
      descBn: 'মক্কা ও মদিনা হারাম শরীফের কাছে ৩★ থেকে ৫★ লাক্সারি মানের হোটেল রুম বুকিং।',
    },
    {
      id: 'training',
      icon: GraduationCap,
      nameEn: 'Pre-departure Training',
      nameBn: 'হজ প্রশিক্ষণ কর্মশালা',
      descEn: 'Day-long Hajj seminars, authentic Manasik books, video step-by-step guides, and 1-on-1 Q&A.',
      descBn: 'দিনব্যাপী ওরিয়েন্টেশন, সহীহ হজ গাইড বই, ভিডিও টিউটোরিয়াল ও আলেমদের প্রশ্নোত্তরের সুযোগ।',
    },
    {
      id: 'guide',
      icon: Headset,
      nameEn: 'On-ground Mu\'allim',
      nameBn: 'মুয়াল্লিম ও গাইড সাপোর্ট',
      descEn: 'Certified Islamic scholars and dedicated coordinators accompany every group in Makkah and Madinah.',
      descBn: 'মক্কা ও মদিনায় কাফেলার সাথে সার্বক্ষণিক অভিজ্ঞ মুয়াল্লিম ও আলেম গাইডদের উপস্থিতি।',
    },
    {
      id: 'ziyarah',
      icon: MapPin,
      nameEn: 'Ziyarah Historical Tours',
      nameBn: 'ঐতিহাসিক জিয়ারাহ সফর',
      descEn: 'Guided excursions to Cave Hira, Mount Thawr, Uhud, Masjid Quba, and optional Taif / Badr tours.',
      descBn: 'মক্কা, মদিনা, কুবা মসজিদ, ওহুদ পাহাড় এবং তায়েফ ও ঐতিহাসিক স্থানসমূহের সুশৃঙ্খল সফর।',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF9F5] border-y border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-emerald-50 text-[#065F46] border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {lang === 'en' ? 'Our Services' : 'আমাদের সেবাসমূহ'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3">
            {lang === 'en'
              ? 'Everything you need, from Bangladesh to the Holy Cities.'
              : 'বাংলাদেশ থেকে পবিত্র মক্কা-মদিনা সফরের সব আয়োজন এক ছাদের নিচে।'}
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            {lang === 'en'
              ? 'From visa and direct flights to hotels, gourmet dining and scholar training, we handle every detail of your sacred journey with care.'
              : 'ভিসা, ফ্লাইট, হোটেল বুকিং থেকে শুরু করে প্রশিক্ষণ ও মাঠে সার্বক্ষণিক উপস্থিতি পর্যন্ত প্রতিটি পদক্ষেপে আমাদের দায়িত্বশীল সেবা।'}
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => onSelectService(lang === 'en' ? s.nameEn : s.nameBn)}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:-translate-y-1 hover:border-[#065F46] hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-[#065F46] flex items-center justify-center text-xl mb-5 shadow-xs group-hover:scale-105 group-hover:bg-[#065F46] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-[#065F46] transition-colors">
                    {lang === 'en' ? s.nameEn : s.nameBn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'en' ? s.descEn : s.descBn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#065F46] flex items-center gap-1">
                  <span>{lang === 'en' ? 'Enquire Now' : 'বিস্তারিত জানুন'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

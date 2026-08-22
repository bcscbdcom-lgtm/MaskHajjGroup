import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, Clock, Printer, Compass, Sparkles, AlertCircle, ArrowRight, Plane, Building2, Sun, Moon } from 'lucide-react';
import { Language } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

interface DaySchedule {
  dayNumber: number;
  hijriDayEn: string;
  hijriDayBn: string;
  locationEn: string;
  locationBn: string;
  titleEn: string;
  titleBn: string;
  phase: 'arrival' | 'makkah' | 'hajj_core' | 'madinah' | 'departure';
  activitiesEn: string[];
  activitiesBn: string[];
  spiritualTipEn: string;
  spiritualTipBn: string;
  isCrucialDay?: boolean;
}

interface DayByDayPlannerProps {
  lang: Language;
  onOpenPrintModal: (plannerData?: any) => void;
  onOpenPreReg: (customDetails?: string) => void;
}

export const DayByDayPlanner: React.FC<DayByDayPlannerProps> = ({
  lang,
  onOpenPrintModal,
  onOpenPreReg,
}) => {
  const [packageType, setPackageType] = useState<'standard_38' | 'short_18' | 'umrah_14'>('standard_38');
  const [routeType, setRouteType] = useState<'med_first' | 'jed_first'>('med_first');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<'all' | 'hajj_core' | 'makkah' | 'madinah'>('all');

  // Daily Schedule Database
  const fullHajjSchedule: DaySchedule[] = [
    {
      dayNumber: 1,
      hijriDayEn: '25th–28th Dhul Qadah',
      hijriDayBn: '২৫–২৮শে জিলকদ',
      locationEn: 'Dhaka to Madinah Airport (MED)',
      locationBn: 'ঢাকা থেকে মদিনা বিমানবন্দর',
      titleEn: 'Departure from Dhaka & Arrival in the City of the Prophet ﷺ',
      titleBn: 'ঢাকা ত্যাগ ও মদিনা মুনাওয়ারায় পবিত্র আগমন',
      phase: 'arrival',
      activitiesEn: [
        'Board direct Biman / Saudia flight from Hazrat Shahjalal International Airport (DAC)',
        'Arrive at Prince Mohammad Bin Abdulaziz Airport (MED) and complete biometric clearance',
        'VIP air-conditioned bus transfer to 4-Star / 5-Star hotel near Masjid an-Nabawi',
        'Hotel check-in, rest, and initial introduction meeting with MASK guides',
      ],
      activitiesBn: [
        'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে সরাসরি বিমানে রওয়ানা',
        'মদিনা বিমানবন্দরে ইমিগ্রেশন ও লাগেজ সংগ্রহ',
        'মাস্ক কাফেলার শীতাতপ নিয়ন্ত্রিত বাসে মসজিদে নববীর নিকটস্থ হোটেলে আগমন',
        'রুম বরাদ্দ, বিশ্রাম এবং গাইডদের সাথে পরিচিতি সভা',
      ],
      spiritualTipEn: 'Send abundant blessings (Salawat) upon the Prophet Muhammad ﷺ as you enter the blessed sanctuary of Madinah.',
      spiritualTipBn: 'মদিনার পবিত্র সীমানায় প্রবেশের সময় বেশি বেশি দরূদ শরিফ ও ইস্তিগফার পাঠ করুন।',
    },
    {
      dayNumber: 2,
      hijriDayEn: 'Madinah Stay • Days 2–6',
      hijriDayBn: 'মদিনায় অবস্থান • ২–৬ দিন',
      locationEn: 'Madinah al-Munawwarah',
      locationBn: 'পবিত্র মদিনা মুনাওয়ারা',
      titleEn: '40 Waqt Salah in Masjid an-Nabawi & Ziyarah to Rawdah ash-Sharifah',
      titleBn: 'মসজিদে নববীতে নামাজ ও রওজা শরিফ জিয়ারত',
      phase: 'madinah',
      activitiesEn: [
        'Perform 40 consecutive prayers in Masjid an-Nabawi with senior Islamic scholars',
        'Pre-scheduled Nusuk app permit visit to Rawdah ash-Sharifah (Riyad ul-Jannah)',
        'Guided Ziyarah tour: Masjid Quba (2 Rakat = 1 Umrah reward), Mount Uhud & Shuhada Cemetery, Masjid al-Qiblatayn, and Seven Mosques',
        'Evening Islamic seminars explaining the step-by-step Fiqh of Hajj',
      ],
      activitiesBn: [
        'মসজিদে নববীতে নিয়মিত জামাতে নামাজ আদায়',
        'নুসুক পারমিট অনুযায়ী রওজা শরিফ (রিয়াজুল জান্নাহ) জিয়ারত ও সালাম পেশ',
        'ঐতিহাসিক স্থান জিয়ারত: মসজিদে কুবা, ওহুদের ময়দান ও শহীদানদের কবর, মসজিদে কিবলাতাইন',
        'সন্ধ্যায় হজের সহীহ নিয়ম ও আহকামের উপর বিশেষ তা’লিম',
      ],
      spiritualTipEn: 'Masjid Quba is the first mosque built by the Prophet ﷺ; pray 2 Rakat Nafl to earn the reward of a complete Umrah.',
      spiritualTipBn: 'মসজিদে কুবায় অজু সহকারে ২ রাকাত নফল নামাজ আদায় করলে পূর্ণ একটি ওমরাহর সওয়াব মেলে।',
    },
    {
      dayNumber: 7,
      hijriDayEn: '1st–4th Dhul Hijjah',
      hijriDayBn: '১–৪ঠা জিলহজ',
      locationEn: 'Meeqat Dhul Hulaifah to Makkah',
      locationBn: 'মিকাত জুল হুলাইফা থেকে মক্কা মুকাররমা',
      titleEn: 'Wearing Ihram at Meeqat, Haramain High-Speed Train & Umrah in Makkah',
      titleBn: 'মিকাত থেকে ইহরাম পরিধান, বুলেট ট্রেনে মক্কায় গমণ ও ওমরাহ আদায়',
      phase: 'makkah',
      activitiesEn: [
        'Perform Ghusl, wear 2 white Ihram sheets, and declare Talbiyah at Dhul Hulaifah (Bir Ali)',
        'Board Haramain High-Speed Train reaching Makkah in just 2 hours (300 km/h)',
        'Check-in at Makkah hotel, perform First Umrah (Tawaf al-Qudum, 2 Rakat behind Maqam Ibrahim, drink Zamzam, Sa’i of Safa-Marwah, and Halq/Taqsir)',
        'Relax and prepare physically & spiritually for the 5 sacred days of Hajj',
      ],
      activitiesBn: [
        'মিকাত মসজিদে ইহরামের নিয়ত ও উচ্চস্বরে তালবিয়া পাঠ',
        'হারামাইন হাই-স্পিড বুলেট ট্রেনে মাত্র ২ ঘন্টায় মক্কায় আরামদায়ক গমণ',
        'মক্কার হোটেলে আগমন ও আলেম গাইডের সাথে ওমরাহ সম্পাদন (তাওয়াফ, সাঈ ও চুল কর্তন)',
        'পবিত্র হজের মূল ৫ দিনের জন্য মানসিক ও শারীরিক প্রস্তুতি গ্রহণ',
      ],
      spiritualTipEn: 'Keep chanting "Labbayk Allahumma Labbayk" until you begin your Tawaf at the Holy Ka’bah.',
      spiritualTipBn: 'তাওয়াফ শুরুর আগ পর্যন্ত নিয়মিত ও ভক্তিভরে তালবিয়া পড়তে থাকুন।',
    },
    {
      dayNumber: 8,
      hijriDayEn: '8th Dhul Hijjah (Yawm at-Tarwiyah)',
      hijriDayBn: '৮ই জিলহজ (ইয়াওমুত তারবিয়াহ)',
      locationEn: 'Mina Camp (Rawaf Mina)',
      locationBn: 'মিনার তাঁবু (রাওয়াফ মিনা)',
      titleEn: 'Day 1 of Hajj: Entering Mina Tents & 5 Daily Prayers',
      titleBn: 'হজের ১ম দিন: মিনায় গমণ ও তাঁবুতে ৫ ওয়াক্ত নামাজ',
      phase: 'hajj_core',
      isCrucialDay: true,
      activitiesEn: [
        'Put on Hajj Ihram from your hotel in Makkah with explicit Niyyah for Hajj',
        'Transfer by organized MASK bus caravan to Mina European/VIP air-conditioned tents',
        'Offer Dhuhr, Asr, Maghrib, Isha, and 9th Dhul Hijjah Fajr in Mina (Qasr prayers without combining)',
        'Spend the blessed night in Dhikr, Quran recitation, and supplication',
      ],
      activitiesBn: [
        'হোটেল থেকে হজের ইহরাম পরিধান ও তালবিয়া পাঠ',
        'মাস্ক কাফেলার বাসে মিনার উন্নত শীতাতপ নিয়ন্ত্রিত তাঁবুতে গমণ',
        'মিনায় যোহর, আসর, মাগরিব, এশা ও ফজরের নামাজ নির্দিষ্ট সময়ে কসর করে আদায়',
        'রাত্রে জিকির, তওবা ও ইবাদতে নিমগ্ন থাকা',
      ],
      spiritualTipEn: 'This day is called Tarwiyah (quenching thirst); hydrate well and focus entirely on seeking Allah’s forgiveness.',
      spiritualTipBn: 'এটি হজের সূচনা দিন; দুনিয়াবী চিন্তা পরিহার করে আল্লাহর সন্তুষ্টিতে নিয়োজিত হোন।',
    },
    {
      dayNumber: 9,
      hijriDayEn: '9th Dhul Hijjah (Yawm Arafah & Muzdalifah)',
      hijriDayBn: '৯ই জিলহজ (আরাফাতের দিন ও মুজদালিফা)',
      locationEn: 'Plain of Arafat & Muzdalifah',
      locationBn: 'আরাফাতের ময়দান ও মুজদালিফা',
      titleEn: 'Day 2 of Hajj: The Pinnacle of Hajj (Wuquf Arafah) & Night under the Open Sky',
      titleBn: 'হজের ২য় দিন: হজের প্রধান রুকন (উকুফে আরাফাত) ও মুজদালিফায় খোলা আকাশের নিচে রাত্রিযাপন',
      phase: 'hajj_core',
      isCrucialDay: true,
      activitiesEn: [
        'After Fajr, move to the Plain of Arafat; enter MASK Arafat German-style tents',
        'Listen to the Hajj Khutbah of Masjid Nimrah; pray Dhuhr and Asr combined and shortened',
        'Stand for Wuquf (The Core Pillar of Hajj) from Zawal until Sunset with hands raised in tears and Dua',
        'Immediately after Sunset (without praying Maghrib), move to Muzdalifah',
        'Combine Maghrib and Isha prayers upon reaching Muzdalifah, sleep under the open sky, and collect 49–70 small pebbles for Jamarat',
      ],
      activitiesBn: [
        'ফজরের পর মিনা থেকে আরাফাতের ময়দানে গমণ',
        'মসজিদে নামিরার খুতবা শ্রবণ এবং যোহর ও আসর নামাজ একসাথে জমা ও কসর করে আদায়',
        'সূর্য ঢলার পর থেকে সূর্যাস্ত পর্যন্ত দুহাত তুলে জীবনের সেরা মোনাজাত ও কান্নাভরা তওবা',
        'সূর্যাস্তের পর মাগরিব না পড়ে মুজদালিফায় গমণ ও সেখানে মাগরিব-এশা একসাথে আদায়',
        'খোলা আকাশের নিচে রাত কাটানো এবং জামারাতের জন্য নুড়ি পাথর সংগ্রহ',
      ],
      spiritualTipEn: 'The Prophet ﷺ said: "Hajj is Arafah." Every single sincere dua made on this blessed afternoon is answered.',
      spiritualTipBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "হজ হলো আরাফাত।" এই বিকেলে করা কোনো নেক দোয়া ফিরিয়ে দেওয়া হয় না।',
    },
    {
      dayNumber: 10,
      hijriDayEn: '10th Dhul Hijjah (Yawm an-Nahr / Eid al-Adha)',
      hijriDayBn: '১০ই জিলহজ (কুরবানীর দিন / ঈদুল আজহা)',
      locationEn: 'Muzdalifah → Jamarat → Makkah Haram',
      locationBn: 'মুজদালিফা → জামারাত → কাবা শরিফ',
      titleEn: 'Day 3 of Hajj: Rami of Big Jamarat, Qurbani, Shaving Head & Tawaf al-Ifadah',
      titleBn: 'হজের ৩য় দিন: বড় জামারাতে পাথর নিক্ষেপ, কুরবানী, মাথা মুণ্ডন ও তাওয়াফে ইফাদাহ',
      phase: 'hajj_core',
      isCrucialDay: true,
      activitiesEn: [
        'Offer Fajr prayer in Muzdalifah and make supplication at Mash’ar al-Haram until sunrise',
        'Move to Mina and pelt 7 pebbles at Jamarat al-Aqaba (The Big Pillar) while saying "Allahu Akbar"',
        'Execute Qurbani (Animal sacrifice) verified by MASK guides coupon system',
        'Perform Halq (shaving head for men) or Taqsir (trimming) -> Enter First Tahallul (Ihram restrictions lifted except marital relations)',
        'Proceed to Makkah Haram for Tawaf al-Ifadah (Farz Tawaf) & Sa’i -> Complete Second Tahallul',
        'Return to Mina tents for the night',
      ],
      activitiesBn: [
        'মুজদালিফায় ফজরের নামাজ ও মাশআরুল হারামে দোয়া',
        'মিনায় বড় জামারাতে (আকাবা) ৭টি পাথর নিক্ষেপ এবং তালবিয়া সমাপ্তি',
        'কুরবানী সম্পাদন ও নিশ্চিতকরণ',
        'মাথা মুণ্ডন (হলক) বা ছোট করা -> প্রথম হালাল হওয়া ও সাধারণ কাপড় পরিধান',
        'কাবা শরিফে গিয়ে ফরজ তাওয়াফে ইফাদাহ ও সাঈ আদায় -> পূর্ণ হালাল হওয়া',
        'রাত্রে পুনরায় মিনার তাঁবুতে প্রত্যাবর্তন',
      ],
      spiritualTipEn: 'Completing Tawaf al-Ifadah removes all remaining Ihram restrictions.',
      spiritualTipBn: 'ফরজ তাওয়াফ ও সাঈ সম্পন্ন করার মাধ্যমে হজের মূল দায়িত্বসমূহ পূর্ণতা পায়।',
    },
    {
      dayNumber: 11,
      hijriDayEn: '11th & 12th Dhul Hijjah (Ayyam at-Tashreeq)',
      hijriDayBn: '১১ ও ১২ই জিলহজ (আইয়ামে তাশরিক)',
      locationEn: 'Mina Jamarat Bridge',
      locationBn: 'মিনা জামারাত ব্রিজ',
      titleEn: 'Days 4 & 5 of Hajj: Pelting All Three Jamarats (21 Pebbles Daily)',
      titleBn: 'হজের ৪র্থ ও ৫ম দিন: তিন জামারাতে ২১টি করে পাথর নিক্ষেপ',
      phase: 'hajj_core',
      isCrucialDay: true,
      activitiesEn: [
        'Stay in Mina tents during these days; engage in constant Takbeerat of Tashreeq',
        'After Zawal (midday), walk via multi-tier pedestrian bridges to the Jamarat complex',
        'Pelt 7 pebbles at Jamarat as-Sughra (Small), make long dua; 7 at Jamarat al-Wusta (Middle), make long dua; 7 at Jamarat al-Aqaba (Big)',
        'On 12th Dhul Hijjah, option to depart Mina before Maghrib and return to Makkah hotel',
      ],
      activitiesBn: [
        'মিনায় অবস্থান ও প্রতিটি নামাজের পর তাশরিকের তাকবির পাঠ',
        'যোহরের পর তিন জামারাতে ক্রমান্বয়ে ৭টি করে মোট ২১টি পাথর নিক্ষেপ',
        'ছোট ও মেজো জামারাত শেষে কিবলামুখী হয়ে বিশেষ মোনাজাত',
        '১২ই জিলহজ সূর্যাস্তের পূর্বে মিনা ত্যাগ করে মক্কার হোটেলে প্রত্যাবর্তন',
      ],
      spiritualTipEn: 'Follow your MASK group leader during assigned cooler hours to avoid congestion and heat.',
      spiritualTipBn: 'রোদের তীব্রতা এড়াতে মাস্ক কাফেলার অভিজ্ঞ আলেম গাইডের নির্ধারিত সময়ে রওয়ানা হন।',
    },
    {
      dayNumber: 13,
      hijriDayEn: '14th–35th Dhul Hijjah',
      hijriDayBn: '১৪–৩৫শে জিলহজ',
      locationEn: 'Makkah al-Mukarramah',
      locationBn: 'মক্কা মুকাররমা',
      titleEn: 'Post-Hajj Ibadah in Masjid al-Haram, Historical Tours & Tawaf al-Wada',
      titleBn: 'হজ-পরবর্তী নফল তাওয়াফ, ঐতিহাসিক স্থান জিয়ারত ও বিদায়ী তাওয়াফ',
      phase: 'makkah',
      activitiesEn: [
        'Daily prayers in Masjid al-Haram (1 prayer = 100,000 rewards)',
        'Additional voluntary Umrah trips to Tan’eem / Masjid Aisha for family members',
        'Historical Makkah Ziyarah: Cave Hira (Jabal an-Noor), Cave Thawr, Jannat al-Mu’alla cemetery',
        'Perform Tawaf al-Wada (The Farewell Tawaf) immediately before leaving for Jeddah Airport',
      ],
      activitiesBn: [
        'মসজিদুল হারামে নিয়মিত জামাতে নামাজ (১ রাকাত = ১ লক্ষ রাকাতের সওয়াব)',
        'আয়েশা মসজিদ (তানঈম) থেকে পিতা-মাতা বা আত্মীয়দের পক্ষ থেকে নফল ওমরাহ আদায়',
        'মক্কার ঐতিহাসিক স্থান জিয়ারত: জাবালে নূর (হেরা গুহা), জাবালে সওর ও জান্নাতুল মুয়াল্লা',
        'বাংলাদেশ প্রত্যাবর্তনের পূর্বে বিদায়ী তাওয়াফ (তাওয়াফে বিদা) সম্পাদন',
      ],
      spiritualTipEn: 'Tawaf al-Wada is Wajib for all non-Makkah pilgrims before final departure.',
      spiritualTipBn: 'মক্কা ছেড়ে যাওয়ার পূর্বে বিদায়ী তাওয়াফ করা প্রত্যেক বহিরাগত হাজীর জন্য ওয়াজিব।',
    },
    {
      dayNumber: 38,
      hijriDayEn: 'Final Day',
      hijriDayBn: 'বিদায় দিন',
      locationEn: 'Jeddah King Abdulaziz Airport (JED) → Dhaka',
      locationBn: 'জেদ্দা বিমানবন্দর → ঢাকা',
      titleEn: 'Safe Return to Bangladesh with 5 Litres Zamzam Water',
      titleBn: 'জমজমের পানিসহ সসম্মানে স্বদেশে প্রত্যাবর্তন',
      phase: 'departure',
      activitiesEn: [
        'Dedicated AC luggage transport and direct boarding assistance at Jeddah Terminal',
        'Receive official 5-litre pure Zamzam water container per pilgrim',
        'Land safely at Hazrat Shahjalal International Airport, Dhaka with a Hajj Mabrur',
      ],
      activitiesBn: [
        'জেদ্দা বিমানবন্দরে মাস্ক টিমের উপস্থিতিতে সহজ ইমিগ্রেশন ও বোডিং',
        'সরকারিভাবে সিলগালাকৃত ৫ লিটার পবিত্র জমজমের পানি গ্রহণ',
        'হজে মাবরুরের অমূল্য স্মৃতি নিয়ে ঢাকায় নিরাপদে পরিবারের কাছে প্রত্যাবর্তন',
      ],
      spiritualTipEn: 'A Hajj Mabrur (accepted Hajj) wipes away all past sins, making the pilgrim as pure as a newborn.',
      spiritualTipBn: 'মাবরুর হজের একমাত্র প্রতিদান জান্নাত; জীবনের বাকি অংশ তাকওয়ার সাথে কাটানোর নিয়ত করুন।',
    },
  ];

  const filteredSchedule = fullHajjSchedule.filter((item) => {
    if (selectedPhaseFilter === 'all') return true;
    if (selectedPhaseFilter === 'hajj_core') return item.phase === 'hajj_core';
    if (selectedPhaseFilter === 'makkah') return item.phase === 'makkah' || item.phase === 'arrival';
    if (selectedPhaseFilter === 'madinah') return item.phase === 'madinah';
    return true;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Smart Itinerary Generator' : 'স্মার্ট সফরসূচি প্ল্যানার'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? 'Day-by-Day Hajj & Umrah Rituals Planner' : 'দৈনিক হজ ও ওমরাহ পালন সফরসূচি'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'An interactive timeline detailing every essential ritual, camp transfer, prayer routine, and scholar tip from departure to return.'
              : 'ঢাকা ত্যাগ থেকে মক্কা-মদিনা ও হজের প্রধান ৫ দিনের সমস্ত আমল, তাঁবুর নিয়মাবলী এবং আলেমদের টিপস সহ পূর্ণাঙ্গ গাইড।'}
          </p>
        </div>

        {/* Print / Save Itinerary Button */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => onOpenPrintModal({ type: 'planner', packageType })}
            className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-blue-400 dark:text-white" />
            <span>{lang === 'en' ? 'Printable Summary View' : 'প্রিন্ট সামারি দেখুন'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', labelEn: 'All Days', labelBn: 'সম্পূর্ণ সফর' },
            { id: 'hajj_core', labelEn: '🔥 5 Core Days of Hajj (8–13 Dhul Hijjah)', labelBn: '🔥 হজের মূল ৫ দিন (৮–১৩ জিলহজ)' },
            { id: 'madinah', labelEn: 'Madinah Stay', labelBn: 'মদিনা শরিফ' },
            { id: 'makkah', labelEn: 'Makkah & Umrah', labelBn: 'মক্কা ও ওমরাহ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPhaseFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedPhaseFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'en' ? tab.labelEn : tab.labelBn}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold px-2">
          {lang === 'en' ? 'Ministry Approved Timings' : 'ধর্ম বিষয়ক মন্ত্রণালয় অনুমোদিত'}
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filteredSchedule.map((item, idx) => (
          <div key={idx} className="relative pl-10 sm:pl-16">
            
            {/* Timeline Dot Icon */}
            <div
              className={`absolute left-1.5 sm:left-3.5 top-2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                item.isCrucialDay
                  ? 'bg-amber-500 border-white text-white shadow-md ring-4 ring-amber-500/20'
                  : 'bg-blue-600 border-white dark:border-slate-900 text-white shadow-xs'
              }`}
            >
              <span className="text-[10px] font-bold">{item.dayNumber}</span>
            </div>

            {/* Day Card */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                item.isCrucialDay
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/70 shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              {/* Day Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 dark:bg-slate-700 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg">
                    {lang === 'en' ? `Day ${item.dayNumber}` : `দিন ${toBengaliNumber(item.dayNumber)}`}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {lang === 'en' ? item.hijriDayEn : item.hijriDayBn}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? item.locationEn : item.locationBn}</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 mb-3">
                {lang === 'en' ? item.titleEn : item.titleBn}
              </h4>

              {/* Activities Checklist */}
              <div className="space-y-2 mb-4 bg-white/70 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  {lang === 'en' ? 'Key Activities & Logistics:' : 'মূল আমল ও লজিস্টিক কার্যক্রম:'}
                </div>
                {(lang === 'en' ? item.activitiesEn : item.activitiesBn).map((act, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

              {/* Spiritual Tip / Sunnah Highlight */}
              <div className="flex items-start gap-2.5 bg-blue-50/70 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200/60 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200">
                <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[11px] uppercase tracking-wider mr-1 text-blue-800 dark:text-blue-300">
                    {lang === 'en' ? 'Scholar Advice:' : 'বিজ্ঞ আলেমের পরামর্শ:'}
                  </span>
                  <span>{lang === 'en' ? item.spiritualTipEn : item.spiritualTipBn}</span>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Bottom Action Strip */}
      <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {lang === 'en'
            ? 'Need a personalized custom schedule for elder family members or wheelchair support? Speak to our Hajj advisor.'
            : 'বয়স্ক যাত্রী বা হুইলচেয়ার সেবাসহ কাস্টম সফরসূচি সাজাতে আমাদের হজ উপদেষ্টার সাথে কথা বলুন।'}
        </p>
        <button
          onClick={() => onOpenPreReg('Custom Day-by-Day Itinerary Consultation')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
        >
          <span>{lang === 'en' ? 'Get Personalized Package Plan' : 'কাস্টম প্ল্যান বুকিং করুন'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

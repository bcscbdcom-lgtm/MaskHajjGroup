import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, BookOpen, Compass, Sparkles, CheckCircle2, AlertTriangle, Volume2, VolumeX, Pause, Play, Square, ShieldCheck, Heart, Video, FileText } from 'lucide-react';
import { Language } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';
import { useSpeechGuide } from '../hooks/useSpeechGuide';
import { PilgrimageMediaGallery } from './PilgrimageMediaGallery';
import { EssentialDocumentsWalkthrough } from './EssentialDocumentsWalkthrough';

interface WalkthroughStep {
  stepNumber: number;
  titleEn: string;
  titleBn: string;
  shortDescEn: string;
  shortDescBn: string;
  arabicDua?: string;
  transliterationEn?: string;
  transliterationBn?: string;
  meaningEn?: string;
  meaningBn?: string;
  rulingsEn: string[];
  rulingsBn: string[];
  mistakesToAvoidEn: string;
  mistakesToAvoidBn: string;
}

interface PilgrimageWalkthroughModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onOpenPreReg: (topic?: string) => void;
}

export const PilgrimageWalkthroughModal: React.FC<PilgrimageWalkthroughModalProps> = ({
  lang,
  isOpen,
  onClose,
  onOpenPreReg,
}) => {
  const [journeyType, setJourneyType] = useState<'hajj' | 'umrah'>('hajj');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'guide' | 'media' | 'documents'>('guide');

  // Speech Guide Web Speech API Hook
  const { isSpeaking, isPaused, isSupported, speak, pause, resume, stop } = useSpeechGuide();

  // Cancel speech on unmount, close or step change
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  useEffect(() => {
    stop();
  }, [currentStepIndex, journeyType, viewMode, stop]);

  if (!isOpen) return null;

  const hajjSteps: WalkthroughStep[] = [
    {
      stepNumber: 1,
      titleEn: 'Step 1: Ihram & The Sacred Intention (Niyyah)',
      titleBn: '১ম ধাপ: ইহরাম পরিধান ও হজের নিয়ত',
      shortDescEn: 'Entering the sacred state of spiritual purity before crossing the designated Meeqat boundary.',
      shortDescBn: 'নির্দিষ্ট মিকাত সীমানা অতিক্রমের পূর্বে গোসল করে সেলাইবিহীন সাদা কাপড় পরিধান ও নিয়ত।',
      arabicDua: 'لَبَّيْكَ اللَّهُمَّ حَجًّا • لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ',
      transliterationEn: 'Labbayk Allahumma Hajjan. Labbayka Allahumma Labbayk, Labbayka Laa Shareeka Laka Labbayk...',
      transliterationBn: 'লাব্বাইকা আল্লাহুম্মা হাজ্জান। লাব্বাইক আল্লাহুম্মা লাব্বাইক, লাব্বাইকা লা শারীকা লাকা লাব্বাইক...',
      meaningEn: 'Here I am, O Allah, for Hajj. Here I am at Your service, You have no partner, here I am...',
      meaningBn: 'হে আল্লাহ! আমি হজের জন্য হাজির। আমি আপনার দরবারে হাজির, আপনার কোনো শরিক নেই...',
      rulingsEn: [
        'Perform Ghusl (ritual bath), clip nails, and trim excess hair before wearing Ihram.',
        'Men wear 2 unstitched white cotton sheets; women wear modest ordinary clothing with face uncovered.',
        'Recite the Talbiyah frequently with devotion until commencing the Tawaf.',
        'Strictly avoid: Perfume, cutting hair/nails, hunting, and marital intimacy while in Ihram.',
      ],
      rulingsBn: [
        'ইহরামের পূর্বে নখ কাটা, অবাঞ্ছিত লোম পরিষ্কার ও উত্তমরূপে গোসল করা সুন্নত।',
        'পুরুষরা দুটি সেলাইবিহীন সাদা চাদর পরবেন; নারীরা স্বাভাবিক শালীন পোশাকে চেহারা উন্মুক্ত রাখবেন।',
        'তাওয়াফ শুরু করা পর্যন্ত বেশি বেশি ভক্তিভরে উচ্চস্বরে তালবিয়া পাঠ করবেন।',
        'ইহরাম অবস্থায় সুগন্ধি ব্যবহার, চুল/নখ কাটা এবং ঝগড়া-বিবাদ সম্পূর্ণরূপে নিষিদ্ধ।',
      ],
      mistakesToAvoidEn: 'Passing the Meeqat boundary without entering Ihram or delaying the Talbiyah intention.',
      mistakesToAvoidBn: 'মিকাত সীমানা অতিক্রম করার পর নিয়ত করা অথবা সেলাইযুক্ত অন্তর্বাস পরিধান করা।',
    },
    {
      stepNumber: 2,
      titleEn: 'Step 2: Tawaf al-Qudum & Sa’i (Arrival Umrah)',
      titleBn: '২য় ধাপ: তাওয়াফে কুদুম ও সাঈ (আগমনী ওমরাহ)',
      shortDescEn: 'Circling the Holy Ka’bah 7 times anti-clockwise starting from the Black Stone (Hajar al-Aswad).',
      shortDescBn: 'হাজরে আসওয়াদ থেকে শুরু করে কাবা শরিফকে বামে রেখে ৭ চক্কর তাওয়াফ এবং সাফা-মারওয়ায় ৭ বার সাঈ।',
      arabicDua: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      transliterationEn: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina adhaban-nar.',
      transliterationBn: 'রব্বানা আতিনা ফিদ-দুনিয়া হাসানাহ, ওয়া ফিল আখিরাতি হাসানাহ, ওয়া কিনা আজাবান নার।',
      meaningEn: 'Our Lord! Grant us good in this world and good in the Hereafter, and save us from the punishment of the Fire.',
      meaningBn: 'হে আমাদের পালনকর্তা! আমাদের দুনিয়াতে কল্যাণ দিন এবং আখেরাতেও কল্যাণ দিন এবং জাহান্নামের আগুন থেকে রক্ষা করুন।',
      rulingsEn: [
        'Perform Idtiba (baring right shoulder for men) during Tawaf al-Qudum.',
        'Walk briskly with short steps (Raml) during the first 3 rounds for men.',
        'Pray 2 Rakat behind Maqam Ibrahim, drink plentiful Zamzam water with Dua.',
        'Walk 7 laps between Mount Safa and Mount Marwah; speed up between the two Green Light markers for men.',
      ],
      rulingsBn: [
        'তাওয়াফের সময় পুরুষরা ডান কাঁধ খোলা রাখবেন (ইজতিবা)।',
        'প্রথম ৩ চক্করে পুরুষরা একটু বীরদর্পে দ্রুত পদক্ষেপে হাঁটবেন (রমল)।',
        'তাওয়াফ শেষে মাকামে ইবরাহিমের পেছনে ২ রাকাত নামাজ পড়ে তৃপ্তিসহকারে জমজমের পানি পান করুন।',
        'সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড়ে মোট ৭ চক্কর সাঈ সম্পন্ন করুন।',
      ],
      mistakesToAvoidEn: 'Pushing aggressively to kiss the Black Stone, causing harm to fellow elderly pilgrims.',
      mistakesToAvoidBn: 'হাজরে আসওয়াদে চুমু খেতে গিয়ে অন্যান্য দুর্বল বা বয়স্ক হাজীদের ধাক্কাধাক্কি করা। দূর থেকে ইশারা করাই যথেষ্ট।',
    },
    {
      stepNumber: 3,
      titleEn: 'Step 3: 8th Dhul Hijjah — Journey to Mina (Tarwiyah)',
      titleBn: '৩য় ধাপ: ৮ই জিলহজ — মিনার তাঁবুতে গমণ (তারবিয়াহ)',
      shortDescEn: 'Commencement of the 5 days of Hajj by moving to the historic tent city of Mina.',
      shortDescBn: 'হজের মূল ৫ দিনের আনুষ্ঠানিক সূচনা; মক্কার বাসস্থান থেকে মিনার তাঁবুতে আগমন।',
      arabicDua: 'اللَّهُمَّ إِلَيْكَ تَوَجَّهْتُ، وَبِكَ اعْتَصَمْتُ، فَتَقَبَّلْ مِنِّي',
      transliterationEn: 'Allahumma ilayka tawajjahtu, wa bika i\'tasamtu, fataqabbal minni.',
      transliterationBn: 'আল্লাহুম্মা ইলাইকা তাওয়াজ্জাহতু, ওয়া বিকা ই\'তাসামতু, ফাতাক্বাব্বাল মিন্নী।',
      meaningEn: 'O Allah! To You I have turned, and in You I have sought refuge, so accept my pilgrimage.',
      meaningBn: 'হে আল্লাহ! আমি আপনার দিকেই মুখ ফেরালাম, আপনারই আশ্রয় নিলাম, আমার এই ইবাদত কবুল করুন।',
      rulingsEn: [
        'Wear Ihram for Hajj from your Makkah accommodation in the morning of 8th Dhul Hijjah.',
        'Pray Dhuhr, Asr, Maghrib, Isha and 9th Fajr in Mina tents (shortened to 2 Rakat for 4-Rakat prayers, but not combined).',
        'Spend the entire night in Mina resting and preparing for the monumental Day of Arafah.',
      ],
      rulingsBn: [
        '৮ই জিলহজ সকালে মক্কার হোটেল থেকে হজের নিয়তে ইহরাম পরে মিনায় যাত্রা করুন।',
        'মিনায় যোহর, আসর, মাগরিব, এশা ও পরের দিনের ফজর নির্দিষ্ট সময়ে কসর করে আদায় করুন।',
        'তাঁবুতে জিকির ও কুরআন তিলাওয়াতে রাত কাটান এবং আরাফাতের মহিমান্বিত দিনের প্রস্তুতি নিন।',
      ],
      mistakesToAvoidEn: 'Skipping the night stay in Mina without a valid medical or logistics excuse.',
      mistakesToAvoidBn: 'বিনা ওজরে ৮ই জিলহজের মিনার সুন্নত রাত্রিযাপন পরিহার করা।',
    },
    {
      stepNumber: 4,
      titleEn: 'Step 4: 9th Dhul Hijjah — The Day of Arafah & Muzdalifah (The Core of Hajj)',
      titleBn: '৪র্থ ধাপ: ৯ই জিলহজ — আরাফাতের ময়দানে অবস্থান ও মুজদালিফা',
      shortDescEn: 'The supreme pillar of Hajj: Standing before Allah from midday to sunset in Arafat, followed by a night under the open sky in Muzdalifah.',
      shortDescBn: 'হজের সর্বশ্রেষ্ঠ রুকন: আরাফাতের ময়দানে কান্নাকাটি ও দোয়া, অতঃপর মুজদালিফায় খোলা আকাশের নিচে রাত।',
      arabicDua: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      transliterationEn: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer.',
      transliterationBn: 'লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, লাহুল মুলকু ওয়া লাহুল হামদু ওয়া হুয়া আলা কুল্লি শাইয়িন ক্বাদীর।',
      meaningEn: 'There is no deity except Allah alone without partner. To Him belongs all sovereignty and praise, and He is over all things competent.',
      meaningBn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরিক নেই; সমস্ত রাজত্ব ও প্রশংসা তাঁরই এবং তিনি সবকিছুর ওপর ক্ষমতাবান।',
      rulingsEn: [
        'Arrive at Arafat plain before Zawal (midday); listen to the Hajj sermon.',
        'Combine and shorten Dhuhr and Asr prayers at Dhuhr time.',
        'Wuquf (standing in prayer and deep repentance) until the sun fully sets.',
        'Depart for Muzdalifah immediately after sunset without offering Maghrib in Arafat.',
        'Offer Maghrib and Isha combined in Muzdalifah, sleep on the ground, and collect 49–70 small pebbles.',
      ],
      rulingsBn: [
        'যোহরের পূর্বে আরাফাতের ময়দানে পৌঁছে খুতবা শ্রবণ করুন।',
        'যোহর ও আসরের নামাজ একসাথে জমা ও কসর করে আদায় করুন।',
        'সূর্যাস্ত পর্যন্ত দাঁড়িয়ে বা বসে দুহাত তুলে অশ্রুসজল তওবা ও জীবনের সমস্ত গুনাহ মাফের প্রার্থনা করুন।',
        'সূর্যাস্তের পর মাগরিব না পড়ে মুজদালিফায় গমণ করুন এবং সেখানে মাগরিব-এশা একসাথে আদায় করুন।',
        'মুজদালিফার উন্মুক্ত ময়দানে রাত্রিযাপন ও কঙ্কর সংগ্রহ করুন।',
      ],
      mistakesToAvoidEn: 'Leaving Arafat before sunset (which invalidates the complete Sunnah Wuquf).',
      mistakesToAvoidBn: 'সূর্যাস্তের পূর্বে আরাফাতের সীমানা ত্যাগ করা বা অহেতুক ছবি তোলায় সময় নষ্ট করা।',
    },
    {
      stepNumber: 5,
      titleEn: 'Step 5: 10th Dhul Hijjah — Rami, Qurbani, Halq & Tawaf al-Ifadah (Yawm an-Nahr)',
      titleBn: '৫ম ধাপ: ১০ই জিলহজ — বড় জামারাতে পাথর, কুরবানী, হলক ও ফরজ তাওয়াফ',
      shortDescEn: 'The busiest and most rewarding day: Stoning Jamarat al-Aqaba, animal sacrifice, shaving the head, and performing the Farz Hajj Tawaf.',
      shortDescBn: 'হজের সবচেয়ে গুরুত্বপূর্ণ কর্মব্যস্ত দিন: বড় শয়তানকে পাথর নিক্ষেপ, কুরবানী, মাথা মুণ্ডন ও কাবা শরিফে ফরজ তাওয়াফ।',
      arabicDua: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمَنِ',
      transliterationEn: 'Bismillahi Allahu Akbar, raghman lish-shaytani wa ridan lir-Rahman.',
      transliterationBn: 'বিসমিল্লাহি আল্লাহু আকবার, রগমান লিশ-শায়তানি ওয়া রিদান লির-রহমান।',
      meaningEn: 'In the name of Allah, Allah is the Greatest; in defiance of Satan and pleasing the Most Merciful.',
      meaningBn: 'আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ; শয়তানের অপমানের জন্য এবং পরম করুণাময় আল্লাহর সন্তুষ্টির জন্য।',
      rulingsEn: [
        'Pelt 7 pebbles at Jamarat al-Aqaba (The Big Pillar) after sunrise.',
        'Perform Qurbani (Animal sacrifice) via official MASK/Saudi Adahi system.',
        'Shave head completely (Halq) for men (most rewarded) or cut 1 inch (Taqsir) -> Enter 1st Tahallul.',
        'Proceed to Masjid al-Haram for Tawaf al-Ifadah & Sa’i -> Enter 2nd Tahallul (Full release from all Ihram restrictions).',
      ],
      rulingsBn: [
        'মুজদালিফা থেকে মিনায় ফিরে শুধু বড় জামারাতে ৭টি কঙ্কর নিক্ষেপ করুন।',
        'কুরবানী সম্পাদন করুন।',
        'পুরুষরা মাথা মুণ্ডন (হলক) বা ছোট করুন -> প্রথম হালাল সম্পন্ন।',
        'কাবা শরিফে গিয়ে ফরজ তাওয়াফে ইফাদাহ ও সাঈ সম্পন্ন করুন -> পূর্ণ হালাল সম্পন্ন।',
      ],
      mistakesToAvoidEn: 'Throwing slippers or heavy stones at Jamarat instead of pea-sized pebbles.',
      mistakesToAvoidBn: 'পাথরের পরিবর্তে জুতা বা বোতল নিক্ষেপ করা; নির্দেশিত নিয়ম অনুযায়ী ছোট নুড়ি পাথর ফেলাই নিয়ম।',
    },
    {
      stepNumber: 6,
      titleEn: 'Step 6: 11th & 12th Dhul Hijjah — Days of Tashreeq (Pelting All 3 Jamarats)',
      titleBn: '৬ষ্ঠ ধাপ: ১১ ও ১২ই জিলহজ — আইয়ামে তাশরিক (তিন জামারাতে পাথর)',
      shortDescEn: 'Staying in Mina and stoning the Small, Middle, and Big Jamarat pillars after Zawal each day.',
      shortDescBn: 'মিনায় অবস্থান এবং প্রতিদিন যোহরের পর ছোট, মেজো ও বড় জামারাতে ৭টি করে মোট ২১টি পাথর নিক্ষেপ।',
      arabicDua: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
      transliterationEn: 'Allahu Akbar, Allahu Akbar, La ilaha illallahu, Wallahu Akbar, Allahu Akbar, Wa lillahil-hamd.',
      transliterationBn: 'আল্লাহু আকবার, আল্লাহু আকবার, লা ইলাহা ইল্লাল্লাহু, ওয়াল্লাহু আকবার, আল্লাহু আকবার, ওয়া লিল্লাহিল হামদ।',
      meaningEn: 'Allah is the Greatest, Allah is the Greatest, there is no god but Allah; Allah is the Greatest, Allah is the Greatest, and all praise belongs to Allah.',
      meaningBn: 'আল্লাহ সর্বশ্রেষ্ঠ, আল্লাহ ছাড়া কোনো উপাস্য নেই; আল্লাহ সর্বশ্রেষ্ঠ এবং সমস্ত প্রশংসা আল্লাহর জন্য।',
      rulingsEn: [
        'Pelt Jamarat as-Sughra (7 pebbles) -> face Qiblah and make lengthy Dua.',
        'Pelt Jamarat al-Wusta (7 pebbles) -> face Qiblah and make lengthy Dua.',
        'Pelt Jamarat al-Aqaba (7 pebbles) -> move on without stopping.',
        'Pilgrims may depart Mina for Makkah on 12th Dhul Hijjah before sunset.',
      ],
      rulingsBn: [
        'ছোট জামারাতে ৭টি কঙ্কর মেরে সরে গিয়ে হাত তুলে দীর্ঘ দোয়া করুন।',
        'মেজো জামারাতে ৭টি কঙ্কর মেরে সরে গিয়ে হাত তুলে দীর্ঘ দোয়া করুন।',
        'বড় জামারাতে ৭টি কঙ্কর মেরে দোয়া ছাড়া তাঁবুতে ফিরে আসুন।',
        '১২ই জিলহজ সূর্যাস্তের পূর্বে মিনা ত্যাগ করে মক্কায় ফিরতে পারেন।',
      ],
      mistakesToAvoidEn: 'Pelting Jamarat before Zawal (midday) on the 11th or 12th Dhul Hijjah.',
      mistakesToAvoidBn: 'যোহরের (সূর্য ঢলার) পূর্বে পাথর নিক্ষেপ করা।',
    },
    {
      stepNumber: 7,
      titleEn: 'Step 7: Tawaf al-Wada (The Farewell Tawaf)',
      titleBn: '৭ম ধাপ: তাওয়াফে বিদা (বিদায়ী তাওয়াফ)',
      shortDescEn: 'The final rite before departing Makkah al-Mukarramah to return to Bangladesh.',
      shortDescBn: 'স্বদেশে প্রত্যাবর্তনের ঠিক পূর্বে পবিত্র কাবা শরিফকে শেষ বিদায়ের তাওয়াফ।',
      arabicDua: 'اللَّهُمَّ لا تَجْعَلْ هَذَا آخِرَ الْعَهْدِ بِبَيْتِكَ الْحَرَامِ',
      transliterationEn: 'Allahumma la taj\'al hadha akhiral-\'ahdi bibaytikal-haram.',
      transliterationBn: 'আল্লাহুম্মা লা তাঝ\'আল হাজা আখিরাল আহদি বিবাইতিকাল হারাম।',
      meaningEn: 'O Allah, do not make this the last visit to Your Sacred House.',
      meaningBn: 'হে আল্লাহ! আপনার পবিত্র কাবা ঘরের প্রতি এই জিয়ারতকে আমার জীবনের শেষ জিয়ারত বানাবেন না।',
      rulingsEn: [
        'Perform standard 7-circuit Tawaf around the Ka’bah without Sa’i or head shaving.',
        'Pray 2 Rakat Nafl and leave directly for Jeddah Airport.',
        'Women experiencing post-natal or menstruation are excused by Shariah from Tawaf al-Wada.',
      ],
      rulingsBn: [
        'সাধারণ পোশাক পরে কাবা শরিফের ৭ চক্কর তাওয়াফ করুন (এতে কোনো সাঈ নেই)।',
        '২ রাকাত নামাজ পড়ে সরাসরি বিমানবন্দরের উদ্দেশ্যে রওয়ানা হন।',
        'শারীরিক বিশেষ সমস্যায় থাকা নারীদের জন্য বিদায়ী তাওয়াফ মাপ রয়েছে।',
      ],
      mistakesToAvoidEn: 'Walking backwards while leaving the Haram (this is a baseless superstition).',
      mistakesToAvoidBn: 'হারাম শরিফ থেকে বের হওয়ার সময় উল্টো পায়ে হাঁটা (এটি ভিত্তিহীন কুসংস্কার)। স্বাভাবিকভাবে বের হবেন।',
    },
  ];

  const umrahSteps: WalkthroughStep[] = [
    {
      stepNumber: 1,
      titleEn: 'Step 1: Ihram & Niyyah from Meeqat',
      titleBn: '১ম ধাপ: মিকাত থেকে ইহরাম পরিধান ও নিয়ত',
      shortDescEn: 'Take bath, wear Ihram garments, and make intention for Umrah before reaching Makkah.',
      shortDescBn: 'গোসল করে সেলাইবিহীন কাপড় পরিধান এবং মিকাত থেকে ওমরাহর নিয়তে তালবিয়া পাঠ।',
      arabicDua: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
      transliterationEn: 'Labbayk Allahumma Umratan.',
      transliterationBn: 'লাব্বাইকা আল্লাহুম্মা ওমরাতান।',
      meaningEn: 'Here I am, O Allah, answering Your call for Umrah.',
      meaningBn: 'হে আল্লাহ! আমি ওমরাহ পালনের জন্য আপনার দরবারে হাজির।',
      rulingsEn: [
        'Trim nails and groom hair before taking Ghusl.',
        'Pray 2 Rakat Sunnat al-Ihram and declare Niyyah.',
        'Recite Talbiyah continuously until reaching Masjid al-Haram.',
      ],
      rulingsBn: [
        'গোসল করে পুরুষরা দুই চাদর ও নারীরা সাধারণ শালীন পোশাক পরবেন।',
        '২ রাকাত নামাজ পড়ে ওমরাহর সুনির্দিষ্ট নিয়ত করবেন।',
        'কাবা শরিফ পৌঁছানো পর্যন্ত তালবিয়া পড়তে থাকবেন।',
      ],
      mistakesToAvoidEn: 'Applying scented oils or perfumes after making the Ihram intention.',
      mistakesToAvoidBn: 'ইহরামের নিয়ত করার পর আতর বা সুগন্ধি তেল ব্যবহার করা।',
    },
    {
      stepNumber: 2,
      titleEn: 'Step 2: Tawaf al-Umrah (7 Circuits Around the Ka’bah)',
      titleBn: '২য় ধাপ: ওমরাহর তাওয়াফ (কাবা শরিফে ৭ চক্কর)',
      shortDescEn: 'Start at the Black Stone (Hajar al-Aswad) line and complete 7 counter-clockwise rounds.',
      shortDescBn: 'হাজরে আসওয়াদের সোজাসুজি সবুজ বাতির লাইন থেকে শুরু করে কাবার চারদিকে ৭ চক্কর তাওয়াফ।',
      arabicDua: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',
      transliterationEn: 'Bismillahi Wallahu Akbar.',
      transliterationBn: 'বিসমিল্লাহি ওয়াল্লাহু আকবার।',
      meaningEn: 'In the name of Allah, and Allah is the Greatest.',
      meaningBn: 'আল্লাহর নামে এবং আল্লাহ সর্বশ্রেষ্ঠ।',
      rulingsEn: [
        'Men expose right shoulder (Idtiba) for all 7 rounds.',
        'Raml (brisk walk) during the first 3 rounds for men.',
        'Touch or point to the Yemeni Corner (Rukn al-Yamani) without kissing.',
        'Offer 2 Rakat behind Maqam Ibrahim and drink Zamzam.',
      ],
      rulingsBn: [
        'পুরুষরা পুরো তাওয়াফে ডান কাঁধ উন্মুক্ত রাখবেন (ইজতিবা)।',
        'প্রথম ৩ চক্করে পুরুষরা দ্রুত পদক্ষেপে হাঁটবেন (রমল)।',
        'তাওয়াফ শেষে মাকামে ইবরাহিমের পেছনে ২ রাকাত নামাজ পড়ে জমজমের পানি পান করুন।',
      ],
      mistakesToAvoidEn: 'Entering inside Hateem (the semi-circle) during Tawaf (which voids the circuit).',
      mistakesToAvoidBn: 'হাতিমের (অর্ধচন্দ্রাকৃতি অংশ) ভেতর দিয়ে হাঁটা; হাতিমের বাহির দিয়ে তাওয়াফ করতে হয়।',
    },
    {
      stepNumber: 3,
      titleEn: 'Step 3: Sa’i of Safa and Marwah (7 Laps)',
      titleBn: '৩য় ধাপ: সাফা ও মারওয়ায় সাঈ (৭ বার চক্কর)',
      shortDescEn: 'Walk between Mount Safa and Mount Marwah starting at Safa and ending at Marwah.',
      shortDescBn: 'সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড়ে মোট ৭ চক্কর সাঈ সম্পন্ন করা।',
      arabicDua: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ',
      transliterationEn: 'Innas-Safa wal-Marwata min sha\'a\'irillah.',
      transliterationBn: 'ইন্নাস সাফা ওয়াল মারওয়াতা মিন শাআইরিল্লাহ।',
      meaningEn: 'Indeed, Safa and Marwah are among the symbols of Allah.',
      meaningBn: 'নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত।',
      rulingsEn: [
        'Safa to Marwah is Lap 1; Marwah to Safa is Lap 2; Marwah is Lap 7.',
        'Men jog lightly between the Green Light poles.',
        'Continuous supplications, Quran recitation, and personal Duas.',
      ],
      rulingsBn: [
        'সাফা থেকে মারওয়া = ১ম চক্কর; মারওয়া থেকে সাফা = ২য় চক্কর; এভাবে মারওয়াতে ৭ম চক্কর শেষ হবে।',
        'পুরুষরা সবুজ বাতির অংশে একটু দ্রুত দৌড়ানোর মতো হাঁটবেন।',
        'পুরো সাঈতে নিজের ভাষায় মনখুলে দোয়া করুন।',
      ],
      mistakesToAvoidEn: 'Counting round-trips as 1 lap instead of each one-way traversal as 1 lap.',
      mistakesToAvoidBn: 'যাওয়া-আসাকে এক চক্কর মনে করা; প্রকৃতপক্ষে একদিক থেকে অন্যদিকে যাওয়াই এক চক্কর।',
    },
    {
      stepNumber: 4,
      titleEn: 'Step 4: Halq (Shaving) or Taqsir (Trimming Hair)',
      titleBn: '৪র্থ ধাপ: মাথা মুণ্ডন (হলক) বা চুল ছোট করা (কসর)',
      shortDescEn: 'Men shave head completely or cut hair evenly; women trim one fingertip length.',
      shortDescBn: 'পুরুষরা মাথা মুণ্ডন করবেন বা চুল ছোট করবেন; নারীরা আঙুলের এক কর পরিমাণ চুল কাটবেন।',
      arabicDua: 'اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ وَالْمُقَصِّرِينَ',
      transliterationEn: 'Allahummaghfir lil-muhalliqeen wal-muqassireen.',
      transliterationBn: 'আল্লাহুম্মাগফির লিল-মুহাল্লিক্বীন ওয়াল মুক্বাস্সিরীন।',
      meaningEn: 'O Allah! Forgive those who shave their heads and those who cut their hair.',
      meaningBn: 'হে আল্লাহ! যারা মাথা মুণ্ডন করে ও চুল ছোট করে তাদের ক্ষমা করে দিন।',
      rulingsEn: [
        'Shaving head completely (Halq) brings 3 times more divine forgiveness for men.',
        'Women trim approximately 1 inch (fingertip length) from their ponytail.',
        'Upon completing Halq/Taqsir, all Ihram restrictions end and Umrah is complete!',
      ],
      rulingsBn: [
        'পুরুষদের জন্য মাথা সম্পূর্ণ ন্যাড়া করা ৩ গুণ বেশি সওয়াবের।',
        'নারীরা চুলের পেছনের অংশের এক কর পরিমাণ চুল কাটবেন।',
        'চুল কাটার সাথে সাথেই ওমরাহ পূর্ণ হয় এবং ইহরামের সমস্ত নিষেধাজ্ঞা শেষ হয়ে যায়।',
      ],
      mistakesToAvoidEn: 'Trimming just a few random hairs instead of trimming evenly from all around the head.',
      mistakesToAvoidBn: 'পুরো মাথার বদলে সামান্য দু-একটি চুল কাটা; সমস্ত মাথার চুল সমানভাবে ছোট করতে হবে।',
    },
  ];

  const activeSteps = journeyType === 'hajj' ? hajjSteps : umrahSteps;
  const currentStep = activeSteps[currentStepIndex] || activeSteps[0];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-backdrop-fade">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white animate-modal-slide-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Switcher & View Modes */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {lang === 'en' ? 'Interactive Pilgrimage Walkthrough' : 'হজ ও ওমরাহর ভিজ্যুয়াল প্রশিক্ষণ গাইড'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Step-by-step masterclass with audio voice narration, authentic duas, documents and looping video guides.' : 'ভয়েস অডিও গাইড, সহীহ দোয়া, প্রয়োজনীয় নথিপত্র ও ৫ সেকেন্ডের ভিডিও মোশন গাইড।'}
              </p>
            </div>
          </div>

          {/* Action Tabs & Journey Selector */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* View Mode: Text Guide vs Media Gallery vs Essential Documents */}
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('guide')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'guide'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Guide' : 'ধাপসমূহ'}</span>
              </button>
              <button
                onClick={() => setViewMode('documents')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'documents'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                <span>{lang === 'en' ? 'Visa Docs' : 'প্রয়োজনীয় নথি'}</span>
              </button>
              <button
                onClick={() => setViewMode('media')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'media'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-blue-500" />
                <span>{lang === 'en' ? 'Videos' : 'ভিডিও'}</span>
              </button>
            </div>

            {/* Mode Switcher (Hajj / Umrah) */}
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => {
                  setJourneyType('hajj');
                  setCurrentStepIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  journeyType === 'hajj'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang === 'en' ? 'Hajj (7 Steps)' : 'হজ (৭ ধাপ)'}
              </button>
              <button
                onClick={() => {
                  setJourneyType('umrah');
                  setCurrentStepIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  journeyType === 'umrah'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang === 'en' ? 'Umrah (4 Steps)' : 'ওমরাহ (৪ ধাপ)'}
              </button>
            </div>

          </div>
        </div>

        {/* Listen to Guide Voice Narration Bar (Web Speech API) - Active in Guide Mode */}
        {viewMode === 'guide' && (
          <div className="mb-6 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (isSpeaking) {
                    if (isPaused) resume();
                    else pause();
                  } else {
                    const title = lang === 'en' ? currentStep.titleEn : currentStep.titleBn;
                    const desc = lang === 'en' ? currentStep.shortDescEn : currentStep.shortDescBn;
                    const translit = lang === 'en' ? (currentStep.transliterationEn || '') : (currentStep.transliterationBn || '');
                    const meaning = lang === 'en' ? (currentStep.meaningEn || '') : (currentStep.meaningBn || '');
                    const rulings = (lang === 'en' ? currentStep.rulingsEn : currentStep.rulingsBn).join('. ');
                    const caution = lang === 'en' ? currentStep.mistakesToAvoidEn : currentStep.mistakesToAvoidBn;

                    const speechText = `${title}. ${desc}. ${translit ? 'Supplication: ' + translit + '. ' : ''} ${meaning ? 'Meaning: ' + meaning + '. ' : ''} Rulings: ${rulings}. Common Mistake to avoid: ${caution}.`;
                    speak(speechText, lang === 'bn' ? 'bn' : 'en');
                  }
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer"
              >
                {isSpeaking && !isPaused ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Pause Voice Guide' : 'ভয়েস গাইড থামান'}</span>
                  </>
                ) : isSpeaking && isPaused ? (
                  <>
                    <Play className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Resume Voice Guide' : 'পুনরায় চালু করুন'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Listen to Guide (Voice)' : 'অডিও গাইড শুনুন (ভয়েস)'}</span>
                  </>
                )}
              </button>

              {isSpeaking && (
                <button
                  onClick={stop}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  title="Stop Audio"
                >
                  <Square className="w-3.5 h-3.5 text-red-400" />
                </button>
              )}

              {/* Speaking visualizer waveform */}
              {isSpeaking && !isPaused && (
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-4 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                  <span className="text-[11px] font-mono text-blue-300 font-bold ml-1">
                    {lang === 'en' ? 'Reading Step Audio...' : 'অডিও পাঠ চলছে...'}
                  </span>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                {lang === 'en'
                  ? 'Web Speech API • Multi-lingual Narration'
                  : 'ওয়েব স্পিচ অডিও • বাংলা ও ইংরেজি উচ্চারণ'}
              </span>
            </div>
          </div>
        )}

        {/* Conditional View: Essential Documents vs Media Gallery vs Step Content */}
        {viewMode === 'documents' ? (
          <EssentialDocumentsWalkthrough lang={lang} onOpenPreReg={onOpenPreReg} />
        ) : viewMode === 'media' ? (
          <PilgrimageMediaGallery
            lang={lang}
            activeCategory={
              currentStepIndex === 1
                ? 'tawaf'
                : currentStepIndex === 3
                ? 'arafat'
                : currentStepIndex >= 4
                ? 'jamarat'
                : 'tawaf'
            }
          />
        ) : (
          <>
            {/* Step Indicator Stepper */}
            <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2">
              {activeSteps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`flex-1 min-w-[42px] py-2 px-1 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                    currentStepIndex === idx
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : idx < currentStepIndex
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono">
                    {lang === 'en' ? 'Step' : 'ধাপ'} {lang === 'bn' ? toBengaliNumber(s.stepNumber) : s.stepNumber}
                  </div>
                </button>
              ))}
            </div>

        {/* Current Step Content Box */}
        <div className="space-y-5">
          
          {/* Step Title & Description */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
              <span>
                {lang === 'en' ? `Step ${currentStep.stepNumber} of ${activeSteps.length}` : `ধাপ ${toBengaliNumber(currentStep.stepNumber)} / ${toBengaliNumber(activeSteps.length)}`}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {lang === 'en' ? currentStep.titleEn : currentStep.titleBn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {lang === 'en' ? currentStep.shortDescEn : currentStep.shortDescBn}
            </p>
          </div>

          {/* Authentic Arabic Dua Card */}
          {currentStep.arabicDua && (
            <div className="bg-emerald-950/20 dark:bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 text-slate-900 dark:text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
                  {lang === 'en' ? 'Essential Sunnah Supplication' : 'প্রয়োজনীয় মাসনূন দোয়া'}
                </span>
                <span className="text-xs text-slate-400 font-mono">Sahih Hadith</span>
              </div>

              {/* Arabic Text */}
              <div className="text-right text-lg sm:text-xl font-serif font-bold text-emerald-900 dark:text-emerald-200 my-2 leading-loose tracking-wide dir-rtl" style={{ direction: 'rtl' }}>
                {currentStep.arabicDua}
              </div>

              {/* Transliteration & Meaning */}
              <div className="space-y-1.5 pt-2 border-t border-emerald-500/20 text-xs">
                <div className="font-semibold text-emerald-800 dark:text-emerald-300 italic">
                  {lang === 'en' ? currentStep.transliterationEn : currentStep.transliterationBn}
                </div>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>{lang === 'en' ? 'Meaning: ' : 'অর্থ: '}</strong>
                  {lang === 'en' ? currentStep.meaningEn : currentStep.meaningBn}
                </div>
              </div>
            </div>
          )}

          {/* Essential Rulings & Checkpoints */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'en' ? 'Key Actions & Shariah Rulings:' : 'জরুরি করণীয় ও শরয়ী হুকুম:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(lang === 'en' ? currentStep.rulingsEn : currentStep.rulingsBn).map((r, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 leading-snug">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mistakes to Avoid */}
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-3.5 rounded-2xl text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider mr-1 text-amber-800 dark:text-amber-300">
                {lang === 'en' ? '⚠️ Common Mistake to Avoid:' : '⚠️ সাধারণ ভুল যা এড়িয়ে চলবেন:'}
              </span>
              <span>{lang === 'en' ? currentStep.mistakesToAvoidEn : currentStep.mistakesToAvoidBn}</span>
            </div>
          </div>

        </div>

        {/* Footer Navigation Controls */}
        <div className="flex items-center justify-between gap-3 mt-8 pt-5 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Previous Step' : 'পূর্ববর্তী ধাপ'}</span>
          </button>

          <div className="text-xs font-mono font-bold text-slate-400">
            {lang === 'bn' ? toBengaliNumber(currentStepIndex + 1) : currentStepIndex + 1} / {lang === 'bn' ? toBengaliNumber(activeSteps.length) : activeSteps.length}
          </div>

          {currentStepIndex < activeSteps.length - 1 ? (
            <button
              onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <span>{lang === 'en' ? 'Next Step' : 'পরবর্তী ধাপ'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenPreReg(`${journeyType.toUpperCase()} Package Consultation`);
              }}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <span>{lang === 'en' ? 'Complete & Book Journey' : 'সম্পন্ন ও বুকিং আবেদন'}</span>
            </button>
          )}
        </div>
      </>
    )}

      </div>
    </div>
  );
};

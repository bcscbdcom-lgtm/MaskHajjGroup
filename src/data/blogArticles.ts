import { BlogArticle, Testimonial } from '../types';

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Muhammad Aadil Bin Shaahid',
    locationEn: 'Dhanmondi, Dhaka',
    locationBn: 'ধানমন্ডি, ঢাকা',
    rating: 5,
    packageTypeEn: 'Standard Hajj Package',
    packageTypeBn: 'স্ট্যান্ডার্ড হজ প্যাকেজ',
    year: '2025',
    textEn: 'Alhamdulillah! It has been a pleasure to do Hajj with the MASK Hajj Group team. From spiritual motivation, pre-hajj training to tackling airport and Mina crowd problems while keeping Hajis united — they deserve high appreciation.',
    textBn: 'আলহামদুলিল্লাহ! মাস্ক হজ গ্রুপের সাথে আমাদের হজ সফর ছিল অত্যন্ত প্রশান্তিদায়ক। শুরু থেকে শেষ পর্যন্ত প্রতিটি পদক্ষেপে বিজ্ঞ আলেমদের সঠিক সহায়তা পেয়েছি। মিনা-আরাফাতে তাদের খাবারের মান ও আন্তরিকতা ছিল অসাধারণ।'
  },
  {
    id: 'test-2',
    name: 'Engr. Ananto Alam & Parents',
    locationEn: 'Uttara, Dhaka',
    locationBn: 'উত্তরা, ঢাকা',
    rating: 5,
    packageTypeEn: 'VIP Umrah Comfort',
    packageTypeBn: 'ভিআইপি ওমরাহ কমফোর্ট',
    year: '2025',
    textEn: 'I had the honor of going to Umrah with my elderly parents. So well-organized and spiritually uplifting that my father who had performed Hajj twice before became a true admirer of MASK Hajj Group\'s dedication.',
    textBn: 'বাবা-মাকে নিয়ে ওমরাহ পালন করেছিলাম। হোটেল আবাসন এবং খাবারের ব্যবস্থা ছিল চমৎকার। প্রবীণদের যেভাবে তারা যত্ন নিয়েছেন এবং হুইলচেয়ার সাপোর্ট দিয়েছেন তা সত্যিই প্রশংসনীয়। জাযাকাল্লাহু খাইরান!'
  },
  {
    id: 'test-3',
    name: 'Dr. Farhana Yasmin & Family',
    locationEn: 'Gulshan, Dhaka',
    locationBn: 'গুলশান, ঢাকা',
    rating: 5,
    packageTypeEn: 'VIP Luxury Hajj (Clock Tower)',
    packageTypeBn: 'ভিআইপি লাক্সারি হজ (ক্লক টাওয়ার)',
    year: '2024',
    textEn: 'The Clock Tower hotel overlooking the Kaaba was an unforgettable spiritual highlight. The Haramain bullet train journey was seamless. Maulana Khalilur Rahman guided every step with great wisdom.',
    textBn: 'ক্লক টাওয়ারের কাবা ভিউ রুম থেকে নামাজ আদায়ের অনুভূতি ভাষায় প্রকাশ করার মতো নয়। বুলেট ট্রেনে আরামদায়ক যাতায়াত এবং সার্বক্ষণিক মুয়াল্লিম সাপোর্ট আমাদের পুরো পরিবারকে নিশ্চিন্ত রেখেছিল।'
  },
  {
    id: 'test-4',
    name: 'Al-Haj Shamsuddin Ahmed',
    locationEn: 'Chittagong',
    locationBn: 'চট্টগ্রাম',
    rating: 5,
    packageTypeEn: 'Economy Hajj Caravan',
    packageTypeBn: 'ইকোনমি হজ কাফেলা',
    year: '2025',
    textEn: 'Honest agency with no hidden costs. Everything promised in the agreement was delivered 100%. Delicious Bengali food every day and punctual transportation. Highly recommended.',
    textBn: 'কোনো লুকানো খরচ ছাড়া সম্পূর্ণ সততার সাথে তারা সেবা দিয়েছেন। চুক্তিতে যা ছিল তার চেয়ে বেশি যত্ন পেয়েছি। প্রতিদিন মানসম্মত দেশীয় খাবার ও সুশৃঙ্খল পরিবহন ব্যবস্থা পেয়েছি।'
  }
];

export const blogArticlesData: BlogArticle[] = [
  {
    id: 'umrah-rules-2026',
    categoryEn: 'Umrah Guide',
    categoryBn: 'ওমরাহ গাইড',
    categoryColor: 'bg-emerald-600',
    dateEn: 'May 12, 2026',
    dateBn: '১২ মে, ২০২৬',
    readTimeEn: '5 min read',
    readTimeBn: '৫ মিনিট পাঠ',
    titleEn: '10 New Umrah Rules You Must Follow in 2026 — Updated Saudi Guidelines',
    titleBn: '২০২৬ সালের ওমরাহ পালনে নতুন ১০টি নিয়ম ও সৌদি সরকারের হালনাগাদ গাইডলাইন',
    summaryEn: 'Comprehensive overview of recent Nusuk app updates, biometric scanning, baggage rules, Rawdah Sharif appointment timings, and visa validity changes.',
    summaryBn: 'নুসুক অ্যাপের সাম্প্রতিক আপডেট, বায়োমেট্রিক স্ক্যানিং, রওজা শরিফের পারমিট বুকিং ও ভিসা সংক্রান্ত হালনাগাদ তথ্যের পূর্ণ বিবরণ।',
    icon: 'fa-kaaba',
    tagsEn: ['Nusuk App', 'Rawdah Permit', 'Visa Rules 2026', 'Luggage Guidelines'],
    tagsBn: ['নুসুক অ্যাপ', 'রওজা পারমিট', 'ভিসা নিয়ম ২০২৬', 'লাগেজ নির্দেশিকা'],
    contentEn: `The Ministry of Hajj & Umrah (KSA) has implemented modern automated procedures to make the holy pilgrimage streamlined and comfortable. Here are the 10 crucial guidelines every Bangladeshi pilgrim must remember:

1. **Nusuk App Mandatory Booking**: Permits for entering the sacred Rawdah Sharif at Masjid an-Nabawi in Madinah must be scheduled via the official Nusuk application. Slots open every Friday.
2. **Biometric Verification (Saudi Visa Bio App)**: Ensure facial and ten-fingerprint capture is completed prior to visa issuance.
3. **Ihram Regulations at Miqat**: Direct flights from Dhaka to Jeddah enter the Miqat zone 30-40 minutes before landing. Pilgrims must wear their Ihram and make Niyyah prior to boarding or in-flight before the announcement.
4. **Zamzam Water Policy**: Each pilgrim is permitted one officially sealed 5-liter bottle of Zamzam purchased at King Abdulaziz International Airport (JED) or Prince Mohammad Bin Abdulaziz Airport (MED). Unsealed bottles inside checked luggage are strictly prohibited.
5. **Luggage Dimensions & Weight**: Strict adherence to the 2x23kg checked baggage allowance plus 7kg cabin baggage. Avoid tying loose ropes around suitcases; use approved zip straps.
6. **Health & Vaccination Requirements**: Mandatory Meningococcal ACWY and updated COVID-19/Influenza vaccinations documented in the health card.
7. **Cash & Foreign Currency Declarations**: Carry Saudi Riyals (SAR) or international debit/credit cards. Amounts exceeding SAR 60,000 equivalent must be formally declared at Saudi customs.
8. **Transportation with MASK Hajj Group**: Dedicated air-conditioned coasters and Haramain high-speed rail tickets ensure fast, fatigue-free movement.
9. **Respecting Haram Security**: Photography during active Tawaf or blocking walkways for selfies is prohibited. Keep awareness focused on devotion and remembrance of Allah.
10. **Emergency Medical Cards**: Keep your MASK Hajj Group lanyard, hotel location card, and Saudi emergency contact numbers on you at all times.`,
    contentBn: `পবিত্র সৌদি সরকারের হজ ও ওমরাহ মন্ত্রণালয় হাজীদের সফরকে আরও সহজ ও শৃঙ্খলিত করতে বেশ কিছু নতুন দিকনির্দেশনা কার্যকর করেছে:

১. **নুসুক (Nusuk) অ্যাপে রওজা পারমিট**: মসজিদে নববীতে রওজা শরিফ জিয়ারতের জন্য নুসুক অ্যাপে নির্ধারিত স্লট বুকিং বাধ্যতামূলক।
২. **সৌদি ভিসা বায়ো (Saudi Visa Bio)**: ভিসা ইস্যুর পূর্বে মোবাইল অ্যাপের মাধ্যমে আঙুলের ছাপ ও ফেস স্ক্যান সম্পন্ন করতে হবে।
৩. **মিকাত ও ইহরাম পরিধান**: ঢাকা থেকে সরাসরি জেদ্দার ফ্লাইটে ওঠার আগেই অথবা বিমানের ঘোষণার পূর্বেই ইহরাম পরিধান ও নিয়ত সম্পন্ন করতে হবে।
৪. **জমজম পানির নিয়মাবলী**: এয়ারপোর্ট কাউন্টার থেকে কেনা নির্ধারিত ৫ লিটারের সিল করা জমজম পানির বক্স বহন করা যাবে। লাগেজের ভেতরে খোলা বোতলে পানি নেওয়া নিষিদ্ধ।
৫. **লাগেজ ও ব্যাগেজ নিয়ম**: বিমানে সাধারণত ২x২৩ কেজি চেক-ইন লাগেজ ও ৭ কেজি হ্যান্ড ক্যারির অনুমতি থাকে।
৬. **স্বাস্থ্য ও টিকা সনদ**: মেনিনজাইটিস ও প্রয়োজনীয় স্বাস্থ্যটিকার সার্টিফিকেট সঙ্গে রাখা আবশ্যক।
৭. **মুদ্রা ও লেনদেন**: নগদ সৌদি রিয়াল অথবা ডুয়েল কারেন্সি কার্ড সাথে রাখা সুবিধাজনক।
৮. **হারামের শৃঙ্খলা ও ছবি তোলা**: তাওয়াফের মধ্যে পথ রোধ করে সেলফি বা ভিডিও তোলা থেকে বিরত থাকুন।
৯. **হারামাইন এক্সপ্রেস ট্রেন**: দ্রুত ও আরামদায়ক সফরের জন্য বুলেট ট্রেনের ব্যবহার দিন দিন জনপ্রিয় হচ্ছে।
১০. **আইডি কার্ড সার্বক্ষণিক পরিধান**: মাস্ক হজ গ্রুপের পরিচয়পত্র ও হোটেলের কার্ড সবসময় সঙ্গে রাখুন।`
  },
  {
    id: 'zamzam-drinking-etiquette',
    categoryEn: 'Spirituality',
    categoryBn: 'আধ্যাত্মিকতা',
    categoryColor: 'bg-teal-600',
    dateEn: 'Apr 30, 2026',
    dateBn: '৩০ এপ্রিল, ২০২৬',
    readTimeEn: '4 min read',
    readTimeBn: '৪ মিনিট পাঠ',
    titleEn: 'Zamzam Water Drinking Rules and Etiquette: A Complete Sunnah Guide',
    titleBn: 'জমজমের পানি পানের সুন্নতি নিয়ম, বিশেষ দোয়া ও আত্মিক তাৎপর্য',
    summaryEn: 'Sunnah manners, verified authentic Duas, spiritual intentions, and physical health blessings associated with the blessed well of Zamzam.',
    summaryBn: 'জমজম পানি পানের সুন্নতি আদব, সহীহ হাদিস বর্ণিত ফজিলত, বিশেষ দোয়া ও নিয়তের সঠিক পদ্ধতি।',
    icon: 'fa-faucet-water',
    tagsEn: ['Zamzam Etiquette', 'Sunnah Dua', 'Makkah History'],
    tagsBn: ['জমজম আদব', 'সুন্নাহ দোয়া', 'মক্কার ইতিহাস'],
    contentEn: `The blessed water of Zamzam is a miraculous gift from Allah (SWT) granted to Lady Hajar and Prophet Ismail (AS). The Prophet Muhammad (peace be upon him) said: "The water of Zamzam is for whatever purpose it is drunk for." (Sunan Ibn Majah).

### Sunnah Manners of Drinking Zamzam:
1. **Facing the Qiblah**: Stand or sit facing towards the Holy Kaaba with deep reverence.
2. **Reciting Bismillah**: Begin by mentioning the name of Allah: *Bismillahir Rahmanir Rahim*.
3. **Drinking in Three Breaths**: Sip the water in three pauses, removing the vessel from your mouth each time to breathe.
4. **Drinking to Fullness (Taballu')**: It is Sunnah to drink amply until one feels completely satisfied.
5. **Making Sincere Dua**: This is a prime time of accepted supplications. Ask for forgiveness, pious family, relief from illnesses, and ease in the Day of Judgment.
6. **Traditional Dua**:
   *“Allahumma inni as'aluka 'ilman nafi'a, wa rizqan wasi'a, wa shifa'an min kulli da'.”*
   (O Allah, I ask You for beneficial knowledge, abundant sustenance, and cure from every sickness).
7. **Wiping over the Face and Chest**: It is customary and blessed to gently wipe remaining drops over your face and head.`,
    contentBn: `পবিত্র জমজমের পানি মহান আল্লাহ তায়ালার এক অপার কুদরত ও নিয়ামত। রাসুলুল্লাহ (সা.) ইরশাদ করেছেন: "জমজমের পানি যে নিয়তে পান করা হয়, আল্লাহ তায়ালা তা কবুল করেন।" (সুনানে ইবনে মাজাহ)।

### জমজম পানি পানের সুন্নতি আদব:
১. **কিবলামুখী হওয়া**: পবিত্র কাবার দিকে মুখ করে দাঁড়িয়ে বা বসে পান করা।
২. **বিসমিল্লাহ পড়া**: মহান আল্লাহর নাম নিয়ে শুরু করা।
৩. **তিন শ্বাসে পান করা**: এক নিঃশ্বাসে পুরো পানি না খেয়ে তিন বারে পান করা।
৪. **তৃপ্তি সহকারে পান করা (তাদাল্লু)**: পেট ভরে প্রাণভরে পান করা মুস্তাহাব।
৫. **দোয়া কবুলের বিশেষ মুহূর্ত**: এই সময়ে মনের নেক মাকসুদ ও রোগমুক্তির জন্য কায়মনোবাক্যে দোয়া করা।
৬. **প্রসিদ্ধ মাসনুন দোয়া**:
   *“আল্লাহুম্মা ইন্নি আসআলুকা ইলমান নাফিআ, ওয়া রিযকান ওয়াসিআ, ওয়া শিফা-আম মিন কুল্লি দা-ইন।”*
   (অর্থ: হে আল্লাহ! আমি আপনার কাছে উপকারী ইলম, প্রশস্ত রিজিক এবং সকল রোগ থেকে মুক্তি প্রার্থনা করছি)।
৭. **চেহারায় পানি স্পর্শ করা**: অবশিষ্ট পানি চেহারা ও মাথায় আলতো করে বুলিয়ে নেওয়া বরকতময়।`
  },
  {
    id: 'day-of-arafat-guide',
    categoryEn: 'Hajj Guide',
    categoryBn: 'হজ গাইড',
    categoryColor: 'bg-amber-600',
    dateEn: 'Mar 18, 2026',
    dateBn: '১৮ মার্চ, ২০২৬',
    readTimeEn: '6 min read',
    readTimeBn: '৬ মিনিট পাঠ',
    titleEn: 'Day of Arafat: Importance, Meaning, Fasting and Profound Spiritual Benefits',
    titleBn: 'আরাফার দিনের গুরুত্ব, ফজিলত, করণীয় আমল ও আত্মিক তাৎপর্য',
    summaryEn: 'The pinnacle of Hajj: Why Prophet Muhammad (PBUH) declared "Al-Hajju Arafah" and how pilgrims spend this unforgettable day in tears and forgiveness.',
    summaryBn: 'হজের সর্বশ্রেষ্ঠ রোকন — আরাফার ময়দানে অবস্থান, তাওবা-ইস্তিগফার এবং নন-হাজীদের জন্য আরাফার রোজা ও তাকবীরে তাশরিকের বিধান।',
    icon: 'fa-mountain',
    tagsEn: ['Arafat', 'Hajj Rites', 'Forgiveness', 'Wuquf'],
    tagsBn: ['আরাফাত', 'হজের রোকন', 'মাগফিরাত', 'উকুফ'],
    contentEn: `The 9th of Dhul Hijjah is the greatest day of the Islamic year. The Messenger of Allah (PBUH) said: "Hajj is Arafah." (Sunan an-Nasa'i).

### Key Pillars of Wuquf at Arafat:
- **Arrival at Arafat**: Pilgrims move from Mina to Arafat after sunrise on the 9th of Dhul Hijjah in air-conditioned coaches arranged by MASK Hajj Group.
- **Combined Prayer at Dhuhr Time**: Combining and shortening Dhuhr and Asr prayers (2 rakats each) with one Adhan and two Iqamahs.
- **Continuous Supplication until Sunset**: From afternoon until sunset, pilgrims stand with raised hands outside their tents, crying to Allah for mercy, cleansing of past sins, and salvation for their loved ones and the Muslim Ummah.
- **Departure to Muzdalifah**: As soon as the sun sets, pilgrims depart directly to Muzdalifah without praying Maghrib at Arafat, praying Maghrib and Isha combined in Muzdalifah.`,
    contentBn: `৯ই জিলহজ আরাফার দিন সমগ্র মুসলিম উম্মাহর জন্য অত্যন্ত তাৎপর্যপূর্ণ ও মর্যাদাপূর্ণ। রাসুলুল্লাহ (সা.) স্পষ্ট ভাষায় ঘোষণা করেছেন: "হজ হলো আরাফাতে অবস্থান।" (সুনানে তিরমিযী)।

### আরাফার ময়দানে পালনীয় আমল:
- **আরাফাতে গমন**: ৯ই জিলহজ সূর্যোদয়ের পর মিনা থেকে আরাফাতের ময়দানে শীতাতপ নিয়ন্ত্রিত কোচে রওনা হওয়া।
- **যোহর ও আসরের জামাত**: যোহরের ওয়াক্তে যোহর ও আসরের নামাজ কসর ও জমা হিসেবে আদায় করা।
- **সূর্যাস্ত পর্যন্ত কায়মনোবাক্যে দোয়া**: দুপুর থেকে সূর্যাস্ত পর্যন্ত জীবনের সকল পাপের জন্য তাওবা করা ও কান্নাভরা হৃদয়ে আল্লাহর দরবারে হাত তোলা।
- **মুজদালিফার উদ্দেশ্যে যাত্রা**: সূর্যাস্তের পরপরই মাগরিব না পড়ে মুজদালিফায় রওনা হওয়া এবং সেখানে গিয়ে মাগরিব ও এশার নামাজ একসাথে আদায় করা।`
  }
];

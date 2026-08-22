import { PackageItem, UmrahSchedule } from '../types';

export const umrahPackages: PackageItem[] = [
  {
    id: 'umrah-august',
    type: 'umrah',
    category: 'budget',
    badgeEn: '★ Starting BDT 160,000',
    badgeBn: '★ শুরু মাত্র ১৬০,০০০ ৳',
    categoryTagsEn: ['Budget', 'Popular', '15-Day', 'Direct Flight'],
    categoryTagsBn: ['বাজেট', 'জনপ্রিয়', '১৫ দিন', 'সরাসরি ফ্লাইট'],
    isPopular: true,
    nameEn: 'August & September Umrah',
    nameBn: 'আগস্ট ও সেপ্টেম্বর ওমরাহ প্যাকেজ',
    durationEn: '15 Days • 2026-2027',
    durationBn: '১৫ দিন • ২০২৬-২০২৭',
    priceEn: '৳ 160,000',
    priceBn: '৳ ১৬০,০০০',
    priceNumeric: 160000,
    hotelMakkahEn: 'Quality 3★ Hotel (400m–600m to Haram)',
    hotelMakkahBn: 'মানসম্মত ৩★ হোটেল (হারাম থেকে ৪০০–৬০০ মি.)',
    hotelMadinahEn: 'Central Hotel in Markaziyah (300m)',
    hotelMadinahBn: 'মদিনায় মারকাজিয়ায় হোটেল (৩০০ মি.)',
    distanceMakkahEn: '400–600 meters',
    distanceMakkahBn: '৪০০–৬০০ মিটার',
    airlinesEn: 'Saudia Airlines / Biman Bangladesh Direct Flight',
    airlinesBn: 'সৌদি এয়ারলাইন্স / বাংলাদেশ বিমান সরাসরি ফ্লাইট',
    availability: 'fast_filling',
    seatsRemaining: 14,
    totalSeats: 45,
    availabilityBadgeEn: 'Fast Filling (14 Left)',
    availabilityBadgeBn: 'দ্রুত পূরণ হচ্ছে (১৪টি বাকি)',
    itinerarySummaryEn: 'The perfect economical 15-day spiritual retreat with direct scheduled flights, close hotels, and guided ziyarah.',
    itinerarySummaryBn: '১৫ দিনের সাশ্রয়ী ও আরামদায়ক ওমরাহ কাফেলা — সরাসরি ফ্লাইট, নিকটে হোটেল ও অভিজ্ঞ আলেম দ্বারা পরিচালিত।',
    highlightsEn: [
      'Saudia Airlines direct flight from Dhaka',
      'Makkah hotel 400-600 m to Haram courtyard',
      'Madinah quality hotel in central Markaziyah',
      'Full visa processing & 1-year multiple entry option',
      'Complete historical Ziyarah in Makkah & Madinah'
    ],
    highlightsBn: [
      'সৌদিয়া এয়ারলাইন্সে ঢাকা থেকে সরাসরি ফ্লাইট',
      'মক্কায় ৪০০-৬০০ মিটারের মধ্যে হাঁটা দূরত্বের হোটেল',
      'মদিনায় মারকাজিয়ায় পরিচ্ছন্ন আধুনিক হোটেল',
      'সম্পূর্ণ ওমরাহ ভিসা ও নুসুক অ্যাপ স্লট বুকিং সাপোর্ট',
      'মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহের তথ্যবহুল জিয়ারাহ'
    ],
    inclusionsEn: [
      'Umrah Electronic Tourist / Umrah Visa + Insurance',
      'Return Airfare (Dhaka - Jeddah / Madinah - Dhaka)',
      '7 Nights Makkah + 7 Nights Madinah hotel accommodation',
      'AC Group Transport (Airport - Makkah - Madinah - Airport)',
      'Bengali speaking guide for all Tawaf & Umrah rituals',
      'Ziyarah to Jabal al-Nour, Thawr, Mina, Arafat, Quba, Qiblatain & Uhud'
    ],
    inclusionsBn: [
      'ওমরাহ ই-ভিসা ও মেডিকেল ইন্স্যুরেন্স ফি',
      'সরাসরি রিটার্ন এয়ার টিকিট',
      'মক্কায় ৭ রাত ও মদিনায় ৭ রাত আরামদায়ক আবাসন',
      'এসি বাসে সকল ইন্টারসিটি ও এয়ারপোর্ট ট্রান্সফার',
      'অভিজ্ঞ আলেম দ্বারা তাওয়াফ ও ওমরাহর রোকন পালনে নির্দেশনা',
      'জাবালে নূর, সাওর, মিনা, আরাফাত, কুবা মসজিদ ও ওহুদ পাহাড় জিয়ারাহ'
    ],
    exclusionsEn: [
      'Lunch & Dinner meals (can be added on request)',
      'Personal shopping and baggage excess fees'
    ],
    exclusionsBn: [
      'দুপুর ও রাতের খাবার (অনুরোধ সাপেক্ষে প্যাকেজে যুক্ত করা যাবে)',
      'ব্যক্তিগত খরচ ও অতিরিক্ত ব্যাগেজ চার্জ'
    ]
  },
  {
    id: 'umrah-express',
    type: 'umrah',
    category: 'economy',
    badgeEn: 'Short & Focused',
    badgeBn: 'শর্ট ট্রিপ',
    categoryTagsEn: ['Economy', 'Short Stay', '10-Day', 'Fast Track'],
    categoryTagsBn: ['ইকোনমি', 'শর্ট ট্রিপ', '১০ দিন', 'ফাস্ট ট্র্যাক'],
    nameEn: 'Umrah Express',
    nameBn: 'ওমরাহ এক্সপ্রেস',
    durationEn: '10 Nights • 11 Days',
    durationBn: '১০ রাত • ১১ দিন',
    priceEn: '৳ 165,000',
    priceBn: '৳ ১৬৫,০০০',
    priceNumeric: 165000,
    hotelMakkahEn: '3★ Hotel on Ibrahim Khalil Road (350m–500m)',
    hotelMakkahBn: 'ইব্রাহিম খলিল রোডে ৩★ হোটেল (৩৫০-৫০০ মি.)',
    hotelMadinahEn: '3★ Hotel in Markaziyah West (250m)',
    hotelMadinahBn: 'মদিনায় মারকাজিয়া পশ্চিমে ৩★ হোটেল (২৫০ মি.)',
    distanceMakkahEn: '350–500 meters',
    distanceMakkahBn: '৩৫০–৫০০ মিটার',
    airlinesEn: 'Saudia / Fly Nas Direct Group Booking',
    airlinesBn: 'সৌদিয়া / ফ্লাই নাস ডিরেক্ট গ্রুপ বুকিং',
    availability: 'open',
    seatsRemaining: 26,
    totalSeats: 40,
    availabilityBadgeEn: 'Open for Booking',
    availabilityBadgeBn: 'বুকিং উন্মুক্ত',
    itinerarySummaryEn: 'A high-efficiency 10-night program tailored for busy executives, business owners, and quick family pilgrimages.',
    itinerarySummaryBn: 'কর্মজীবী ও ব্যবসায়ীদের জন্য ১০ রাতের দ্রুত ও নিখুঁত ওমরাহ প্যাকেজ — কম সময়ে সর্বোচ্চ ইবাদতের সুযোগ।',
    highlightsEn: [
      '5 nights in Makkah + 5 nights in Madinah',
      'Hotels located within 5-7 mins walk to Haram',
      'Full visa, insurance, and airport reception',
      'Small group size ensuring personal attention',
      'Daily guidance for Tahajjud & Taraweeh'
    ],
    highlightsBn: [
      'মক্কায় ৫ রাত + মদিনায় ৫ রাত অবস্থানের চমৎকার সুযোগ',
      'হারাম শরীফ থেকে মাত্র ৫-৭ মিনিটের সহজ হাঁটা পথ',
      'ভিসা, ইনস্যুরেন্স ও জেদ্দা এয়ারপোর্টে আন্তরিক অভ্যর্থনা',
      'ছোট গ্রুপ সাইজ থাকায় প্রতিটি সদস্যকে নিবিড় যত্ন',
      'তাহাজ্জুদ ও জামাতে নামাজের সুবিধাজনক অবস্থান'
    ],
    inclusionsEn: [
      'Saudi Umrah e-Visa',
      'Direct Flights',
      '3★ Twin/Triple/Quad room options',
      'All inter-hotel and airport transfers in AC coach',
      'Guided historical tours with scholar'
    ],
    inclusionsBn: [
      'সৌদি ওমরাহ ই-ভিসা',
      'সরাসরি বিমান টিকিট',
      '৩★ টুইন / ট্রিপল / কোয়াড রুম চয়েস',
      'সকল এয়ারপোর্ট ও হোটেল ট্রান্সফার এসি কোচে',
      'বিজ্ঞ আলেম পরিচালনায় গুরুত্বপূর্ণ স্থান জিয়ারাহ'
    ],
    exclusionsEn: [
      'Meals unless customized',
      'Laundry'
    ],
    exclusionsBn: [
      'কাস্টমাইজ না করলে নিয়মিত খাবার',
      'লন্ড্রি খরচ'
    ]
  },
  {
    id: 'umrah-comfort',
    type: 'umrah',
    category: 'standard',
    badgeEn: '★ Family Comfort',
    badgeBn: '★ ফ্যামিলি স্পেশাল',
    categoryTagsEn: ['Family', '4-Star', 'Taif Tour', 'Buffet Meals'],
    categoryTagsBn: ['ফ্যামিলি', '৪-তারকা', 'তায়েফ ভ্রমণ', 'বুফে খাবার'],
    isPopular: true,
    nameEn: 'Umrah Comfort (Family Special)',
    nameBn: 'ওমরাহ কমফোর্ট (ফ্যামিলি স্পেশাল)',
    durationEn: '14 Nights • 15 Days',
    durationBn: '১৪ রাত • ১৫ দিন',
    priceEn: '৳ 215,000',
    priceBn: '৳ ২১৫,০০০',
    priceNumeric: 215000,
    hotelMakkahEn: '4★ Hotel within 200m–300m of Haram Piazza',
    hotelMakkahBn: 'হারামের ২০০–৩০০ মিটারের মধ্যে ৪★ হোটেল',
    hotelMadinahEn: '4★ Hotel in Markaziyah Central (150m)',
    hotelMadinahBn: 'মদিনায় মারকাজিয়া সেন্ট্রালে ৪★ হোটেল (১৫০ মি.)',
    distanceMakkahEn: '200–300 meters (Very close to prayer courtyards)',
    distanceMakkahBn: '২০০–৩০০ মিটার (হারামের মার্বেল চত্বরের ঠিক পাশেই)',
    airlinesEn: 'Saudia Airlines / Biman Scheduled Flight',
    airlinesBn: 'সৌদি এয়ারলাইন্স / বাংলাদেশ বিমান শিডিউল ফ্লাইট',
    availability: 'limited',
    seatsRemaining: 8,
    totalSeats: 35,
    availabilityBadgeEn: 'Limited Seats (8 Left)',
    availabilityBadgeBn: 'সীমিত আসন (৮টি বাকি)',
    itinerarySummaryEn: 'Premium family-oriented pilgrimage with 4-star hotels steps away from the Haram, daily breakfast & dinner, plus a scenic Taif excursion.',
    itinerarySummaryBn: 'পরিবার ও পিতা-মাতার জন্য প্রিমিয়াম ৪★ হোটেল, সুস্বাদু সকাল ও রাতের খাবার এবং ঐতিহাসিক তায়েফ সফরসহ বিশেষ আয়োজন।',
    highlightsEn: [
      '4★ walking-distance luxury hotels in both holy cities',
      'Daily breakfast & dinner buffet included',
      'Special Day Tour to mountainous Taif (Masjid Abdullah Ibn Abbas & cable car)',
      'Wheelchair and elderly support assistance',
      '24/7 dedicated local tour coordinator'
    ],
    highlightsBn: [
      'উভয় পবিত্র শহরে ৪★ ওয়াকিং ডিসটেন্স হোটেল',
      'প্রতিদিন সুস্বাদু ও পুষ্টিকর সকালের নাস্তা ও রাতের ডিনার',
      'ঐতিহাসিক তায়েফ সফর (মসজিদে আব্দুল্লাহ ইবনে আব্বাস ও কেবল কার)',
      'বয়োজ্যেষ্ঠদের জন্য হুইলচেয়ার ও বিশেষ সহায়তা ব্যবস্থা',
      'সৌদিতে সার্বক্ষণিক স্থানীয় কো-অর্ডিনেটরের সেবা'
    ],
    inclusionsEn: [
      'Full VIP Umrah Visa & Ground approvals',
      'Direct scheduled flight with 2x23kg baggage allowance',
      '7 Nights in Makkah (4★) + 7 Nights in Madinah (4★)',
      'Daily Breakfast & Dinner',
      'Private/VIP AC Bus for all transfers',
      'Complete Ziyarah in Makkah, Madinah and Full Day Taif tour'
    ],
    inclusionsBn: [
      'পূর্ণাঙ্গ ভিআইপি ওমরাহ ভিসা ও মোফা প্রসেসিং',
      'সরাসরি ফ্লাইট ও ২x২৩ কেজি ব্যাগেজ সুবিধা',
      'মক্কায় ৭ রাত (৪★) ও মদিনায় ৭ রাত (৪★) আবাসন',
      'প্রতিদিন পুষ্টিকর সকালের নাস্তা ও রাতের বুফে খাবার',
      'উন্নত এসি কোচে ইন্টারসিটি ও তায়েফ ভ্রমণ',
      'মক্কা, মদিনা ও তায়েফের সকল ঐতিহাসিক স্থান জিয়ারাহ'
    ],
    exclusionsEn: [
      'Lunch meals',
      'Taif cable car ticket (optional personal entry)'
    ],
    exclusionsBn: [
      'দুপুরের খাবার',
      'তায়েফ কেবল কার রাইডের ঐচ্ছিক এন্ট্রি টিকিট'
    ]
  },
  {
    id: 'umrah-royal',
    type: 'umrah',
    category: 'vip',
    badgeEn: 'VIP Luxury 5★',
    badgeBn: 'ভিআইপি লাক্সারি ৫★',
    categoryTagsEn: ['Luxury', 'VIP', '5-Star', 'Clock Tower', 'Private GMC'],
    categoryTagsBn: ['লাক্সারি', 'ভিআইপি', '৫-তারকা', 'ক্লক টাওয়ার', 'প্রাইভেট কার'],
    nameEn: 'Umrah Royal Luxury',
    nameBn: 'ওমরাহ রয়েল লাক্সারি',
    durationEn: '15 Nights • 16 Days',
    durationBn: '১৫ রাত • ১৬ দিন',
    priceEn: '৳ 325,000',
    priceBn: '৳ ৩২৫,০০০',
    priceNumeric: 325000,
    hotelMakkahEn: '5★ Clock Tower / Fairmont / Swissotel (Haram View)',
    hotelMakkahBn: '৫★ ক্লক টাওয়ার / ফেয়ারমন্ট / সুইসোটেল (হারাম ভিউ)',
    hotelMadinahEn: '5★ The Oberoi / Dar Al Taqwa / Pullman Zamzam Madinah',
    hotelMadinahBn: '৫★ দ্য ওবেরয় / দার আল তাকওয়া / পুলম্যান জমজম মদিনা',
    distanceMakkahEn: '0 meters (Direct elevator to Haram courtyard)',
    distanceMakkahBn: '০ মিটার (লিফটে নেমে সরাসরি হারামের চত্বর)',
    airlinesEn: 'Saudia Airlines (Business / Premium Economy)',
    airlinesBn: 'সৌদি এয়ারলাইন্স (বিজনেস / প্রিমিয়াম ইকোনমি)',
    availability: 'limited',
    seatsRemaining: 5,
    totalSeats: 20,
    availabilityBadgeEn: 'Strictly Limited (5 Left)',
    availabilityBadgeBn: 'অতি সীমিত (৫টি বাকি)',
    itinerarySummaryEn: 'A lavish 5-star experience with Haram-view rooms, private GMC transfers, Haramain High-Speed train, and personalized attention.',
    itinerarySummaryBn: 'হারাম ভিউ লাক্সারি রুম, প্রাইভেট জিএমসি গাড়ি, হারামাইন বুলেট ট্রেন ও ব্যক্তিগত মুয়াল্লিম সমৃদ্ধ রাজকীয় ওমরাহ সফর।',
    highlightsEn: [
      '5★ Luxury front-row Haram view hotels in Makkah & Madinah',
      'Haramain High-Speed Bullet Train between Makkah & Madinah',
      'Private GMC Yukon / Mercedes transfer for family',
      'Full Board international breakfast & fine dining',
      'Private scholar for exclusive family rituals & Rawdah entrance'
    ],
    highlightsBn: [
      'মক্কা ও মদিনায় সরাসরি হারাম ভিউ ৫★ বিশ্বমানের হোটেল',
      'মক্কা-মদিনায় দ্রুতগতির বিলাসবহুল হারামাইন এক্সপ্রেস বুলেট ট্রেন',
      'পরিবারের জন্য সার্বক্ষণিক নিজস্ব প্রাইভেট জিএমসি / মার্সিডিজ কার',
      'প্রতিদিন আন্তর্জাতিক মানের স্বাস্থ্যসম্মত বুফে খাবার',
      'রওজা শরিফ জিয়ারত ও তাওয়াফে ব্যক্তিগত আলেমের আন্তরিক তত্ত্বাবধান'
    ],
    inclusionsEn: [
      'VIP Umrah Visa & priority fast-track clearance',
      'Premium direct flight tickets',
      'Luxury 5★ accommodations overlooking Kaaba & Prophet\'s Mosque',
      'High-Speed Train First Class tickets',
      'Private VIP GMC / Luxury Van for all city transport',
      'VIP Ziyarah to Makkah, Madinah, Taif and Historic Badr battleground',
      '5-liter sealed Zamzam water box & executive Umrah gifts'
    ],
    inclusionsBn: [
      'ভিআইপি ওমরাহ ভিসা ও এয়ারপোর্টে ফার্স্ট-ট্র্যাক সেবা',
      'প্রিমিয়াম এয়ারলাইন্সের সরাসরি টিকিট',
      'কাবা ও মসজিদে নববীর সরাসরি ভিউসহ ৫★ লাক্সারি স্যুট/রুম',
      'বুলেট ট্রেনের বিজনেস ক্লাস টিকিট',
      'সকল যাতায়াতে ব্যক্তিগত বিলাসবহুল গাড়ি',
      'মক্কা, মদিনা, তায়েফ ও ঐতিহাসিক বদর প্রান্তর বিশেষ জিয়ারাহ',
      'সৌদি সিল করা ৫ লিটার জমজম পানির জার ও বিশেষ উপহার'
    ],
    exclusionsEn: [
      'Personal laundry and telephone charges'
    ],
    exclusionsBn: [
      'ব্যক্তিগত লন্ড্রি ও রুম টেলিফোন বিল'
    ]
  }
];

export const upcomingUmrahSchedules: UmrahSchedule[] = [
  {
    monthEn: 'SEPTEMBER 2026',
    monthBn: 'সেপ্টেম্বর ২০২৬',
    datesEn: '26/09/2026 TO 10/10/2026',
    datesBn: '২৬/০৯/২০২৬ থেকে ১০/১০/২০২৬',
    statusEn: 'Seats Available',
    statusBn: 'বুকিং চলছে',
    badgeColor: 'bg-emerald-500 text-white'
  },
  {
    monthEn: 'OCTOBER 2026',
    monthBn: 'অক্টোবর ২০২৬',
    datesEn: '10/10/2026 TO 24/10/2026',
    datesBn: '১০/১০/২০২৬ থেকে ২৪/১০/২০২৬',
    statusEn: 'Filling Fast',
    statusBn: 'সীমিত আসন',
    badgeColor: 'bg-amber-500 text-white'
  },
  {
    monthEn: 'NOVEMBER 2026',
    monthBn: 'নভেম্বর ২০২৬',
    datesEn: '21/11/2026 TO 05/12/2026',
    datesBn: '২১/১১/২০২৬ থেকে ০৫/১২/২০২৬',
    statusEn: 'Booking Open',
    statusBn: 'বুকিং উন্মুক্ত',
    badgeColor: 'bg-emerald-500 text-white'
  },
  {
    monthEn: 'DECEMBER 2026',
    monthBn: 'ডিসেম্বর ২০২৬ (শীতকালীন ছুটি)',
    datesEn: '12/12/2026 TO 26/12/2026',
    datesBn: '১২/১২/২০২৬ থেকে ২৬/১২/২০২৬',
    statusEn: 'Winter Holiday Special',
    statusBn: 'শীতকালীন স্পেশাল',
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    monthEn: 'JANUARY 2027',
    monthBn: 'জানুয়ারি ২০২৭',
    datesEn: '16/01/2027 TO 30/01/2027',
    datesBn: '১৬/০১/২০২৭ থেকে ৩০/০১/২০২৭',
    statusEn: 'Booking Open',
    statusBn: 'বুকিং উন্মুক্ত',
    badgeColor: 'bg-emerald-500 text-white'
  },
  {
    monthEn: 'RAMADAN 2027',
    monthBn: 'পবিত্র রমজান ১৪৪৮ হিজরী',
    datesEn: 'First 15 Days & Last 10 Days (Laylatul Qadr)',
    datesBn: 'প্রথম ১৫ দিন ও শেষ দশকের বিশেষ কাফেলা',
    statusEn: 'Pre-Booking Active',
    statusBn: 'প্রাক-বুকিং চলছে',
    badgeColor: 'bg-purple-600 text-white'
  }
];

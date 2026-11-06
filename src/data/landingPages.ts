/**
 * আলাদা ঠিকানার (URL) ল্যান্ডিং পেজগুলোর কনটেন্ট।
 * প্রতিটি পেজ হোমপেজের উপরে একটি নিজস্ব হেডার + ভূমিকা দেখায়;
 * নিচে হোমপেজের সব সেকশন (প্যাকেজ, ফর্ম, FAQ) যেমন আছে তেমনই থাকে।
 */
export interface LandingPage {
  path: string;
  /** কোন হিরো ছবি দেখাবে */
  image: 'makkah' | 'madinah' | 'arafat' | 'mina';
  titleBn: string;
  titleEn: string;
  /** ব্রাউজার ট্যাব ও Google-এর জন্য */
  metaTitleBn: string;
  metaTitleEn: string;
  metaDescBn: string;
  metaDescEn: string;
  introBn: string;
  introEn: string;
  bulletsBn: string[];
  bulletsEn: string[];
  /** প্রধান বাটন কোন সেকশনে নিয়ে যাবে */
  ctaAnchor: string;
  ctaBn: string;
  ctaEn: string;
  /** প্রি-রেজিস্ট্রেশন ফর্মে আগে থেকে কী লেখা থাকবে */
  preRegLabel: string;
  /** এই পেজে ডিফল্ট ভাষা (প্রবাসী পেজ ইংরেজি) */
  defaultLang?: 'bn' | 'en';
}

export const divisions = [
  { slug: 'dhaka', bn: 'ঢাকা', en: 'Dhaka' },
  { slug: 'chattogram', bn: 'চট্টগ্রাম', en: 'Chattogram' },
  { slug: 'sylhet', bn: 'সিলেট', en: 'Sylhet' },
  { slug: 'rajshahi', bn: 'রাজশাহী', en: 'Rajshahi' },
  { slug: 'khulna', bn: 'খুলনা', en: 'Khulna' },
  { slug: 'barishal', bn: 'বরিশাল', en: 'Barishal' },
  { slug: 'rangpur', bn: 'রংপুর', en: 'Rangpur' },
  { slug: 'mymensingh', bn: 'ময়মনসিংহ', en: 'Mymensingh' },
];

const umrahPage: LandingPage = {
  path: '/umrah',
  image: 'madinah',
  titleBn: 'ঢাকা থেকে ওমরাহ প্যাকেজ — সম্পূর্ণ প্যাকেজ, এক জায়গায়',
  titleEn: 'Umrah Packages from Dhaka — Everything Included',
  metaTitleBn: 'ওমরাহ প্যাকেজ ঢাকা ২০২৭ | রমজান ওমরাহ | MASK Hajj Group (লাইসেন্স ১৫৬৩০)',
  metaTitleEn: 'Umrah Package from Bangladesh 2027 | Ramadan Umrah | MASK Hajj Group',
  metaDescBn:
    'ঢাকা থেকে ওমরাহ প্যাকেজ — ভিসা, টিকিট, হারামের কাছে হোটেল, খাবার, যাতায়াত ও আলেম মুয়াল্লিম সব একসাথে। রমজান ২০২৭ ওমরাহ বুকিং চলছে। সরকার অনুমোদিত এজেন্সি, লাইসেন্স নং ১৫৬৩০।',
  metaDescEn:
    'Umrah packages from Dhaka, Bangladesh with visa, flights, hotels near the Haram, meals, transport and scholar guidance included. Ramadan 2027 Umrah bookings open. Ministry-approved agency, Licence No. 15630.',
  introBn:
    'আমরা শুধু ভিসা বিক্রি করি না — ওমরাহর পুরো প্যাকেজ একসাথে দিই, যাতে আপনাকে আলাদা করে কিছু খুঁজতে না হয়। ঢাকা থেকে যাত্রা, মক্কা-মদিনায় হোটেল, আর পুরো সফরে আলেম মুয়াল্লিমের তত্ত্বাবধান।',
  introEn:
    'We do not sell visas alone — we provide the complete Umrah package, so you never have to arrange anything separately. Departure from Dhaka, hotels in Makkah and Madinah, and a scholar-guide with you throughout.',
  bulletsBn: [
    'ওমরাহ ভিসা ও প্রসেসিং',
    'ঢাকা–জেদ্দা/মদিনা বিমান টিকিট',
    'হারাম শরিফের কাছাকাছি হোটেল (দূরত্ব প্যাকেজে লেখা থাকে)',
    'মক্কা–মদিনা যাতায়াত ও জিয়ারত',
    'অভিজ্ঞ আলেম মুয়াল্লিমের সার্বক্ষণিক সহায়তা',
    'যাত্রার আগে বিনামূল্যে ওমরাহ প্রশিক্ষণ',
  ],
  bulletsEn: [
    'Umrah visa and processing',
    'Dhaka–Jeddah/Madinah air tickets',
    'Hotels close to the Haram (distance stated in each package)',
    'Makkah–Madinah transport and ziyarah',
    'Round-the-clock support from an experienced scholar-guide',
    'Free pre-departure Umrah training',
  ],
  ctaAnchor: '#umrah',
  ctaBn: 'ওমরাহ প্যাকেজ ও দাম দেখুন',
  ctaEn: 'See Umrah packages & prices',
  preRegLabel: 'Umrah Package',
};

const hajjFromBangladeshPage: LandingPage = {
  path: '/hajj-from-bangladesh',
  image: 'arafat',
  titleBn: 'সারা বাংলাদেশ থেকে হজ ও ওমরাহ — আপনার জেলা যেখানেই হোক',
  titleEn: 'Hajj & Umrah from Anywhere in Bangladesh',
  metaTitleBn: 'হজ প্যাকেজ ২০২৮ — সারা বাংলাদেশ থেকে | MASK Hajj Group (লাইসেন্স ১৫৬৩০)',
  metaTitleEn: 'Hajj Package 2028 from Bangladesh — All Districts | MASK Hajj Group',
  metaDescBn:
    'বাংলাদেশের যেকোনো জেলা থেকে হজ ২০২৮ প্রাক-নিবন্ধন ও ওমরাহ বুকিং। ফোন বা WhatsApp-এ পরামর্শ, নয়াপল্টন ঢাকা অফিস। সরকার অনুমোদিত হজ এজেন্সি, লাইসেন্স নং ১৫৬৩০, HAAB সদস্য।',
  metaDescEn:
    'Hajj 2028 pre-registration and Umrah booking from any district of Bangladesh. Consult by phone or WhatsApp; office in Naya Paltan, Dhaka. Ministry-approved Hajj agency, Licence No. 15630, HAAB member.',
  introBn:
    'আমাদের অফিস ঢাকার নয়াপল্টনে, কিন্তু আমাদের হাজিরা আসেন দেশের সব প্রান্ত থেকে। প্রথম পরামর্শ, প্যাকেজ বাছাই ও প্রাক-নিবন্ধনের প্রাথমিক ধাপ ফোন বা WhatsApp-এই সেরে নেওয়া যায় — আপনাকে বারবার ঢাকায় আসতে হয় না।',
  introEn:
    'Our office is in Naya Paltan, Dhaka, but our pilgrims come from every corner of the country. The first consultation, package selection and initial pre-registration steps can all be done by phone or WhatsApp — you do not need to travel to Dhaka repeatedly.',
  bulletsBn: [
    'ফোন / WhatsApp-এ বিনামূল্যে পরামর্শ — যেকোনো জেলা থেকে',
    'কাগজপত্র জমা ও পরবর্তী ধাপ অফিস থেকে ধাপে ধাপে জানিয়ে দেওয়া হয়',
    'সরকারি নিয়মে হজ ফ্লাইট ঢাকা, চট্টগ্রাম ও সিলেট থেকে ছাড়ে',
    'একই পরিবারের/এলাকার হাজিদের একই গ্রুপে রাখার চেষ্টা করা হয়',
    'যাত্রার আগে হজ প্রশিক্ষণ — অফিসে বা অনলাইনে',
  ],
  bulletsEn: [
    'Free consultation by phone / WhatsApp — from any district',
    'Document submission and next steps are explained step by step by our office',
    'Under government arrangements, Hajj flights depart from Dhaka, Chattogram and Sylhet',
    'We try to keep pilgrims from the same family/area in the same group',
    'Pre-departure Hajj training — at the office or online',
  ],
  ctaAnchor: '#packages',
  ctaBn: 'হজ প্যাকেজ দেখুন',
  ctaEn: 'See Hajj packages',
  preRegLabel: 'Hajj 2028 Pre-Registration',
};

function divisionPage(d: { slug: string; bn: string; en: string }): LandingPage {
  return {
    ...hajjFromBangladeshPage,
    path: `/hajj/${d.slug}`,
    titleBn: `${d.bn} থেকে হজ ও ওমরাহ প্যাকেজ`,
    titleEn: `Hajj & Umrah Packages from ${d.en}`,
    metaTitleBn: `${d.bn} থেকে হজ প্যাকেজ ২০২৮ ও ওমরাহ | MASK Hajj Group (লাইসেন্স ১৫৬৩০)`,
    metaTitleEn: `Hajj & Umrah Package from ${d.en}, Bangladesh | MASK Hajj Group`,
    metaDescBn: `${d.bn} বিভাগের হাজিদের জন্য হজ ২০২৮ প্রাক-নিবন্ধন ও ওমরাহ বুকিং। ফোন/WhatsApp-এ পরামর্শ, ঢাকার নয়াপল্টন অফিস থেকে সম্পূর্ণ সেবা। সরকার অনুমোদিত এজেন্সি, লাইসেন্স নং ১৫৬৩০।`,
    metaDescEn: `Hajj 2028 pre-registration and Umrah booking for pilgrims from ${d.en} division. Consult by phone/WhatsApp; full service from our Naya Paltan, Dhaka office. Licence No. 15630.`,
    introBn: `${d.bn} বিভাগ থেকে যাঁরা হজ বা ওমরাহে যেতে চান, তাঁদের জন্য প্রথম পরামর্শ ও প্যাকেজ বাছাই ফোন বা WhatsApp-এই করা যায়। প্রয়োজনে ঢাকার নয়াপল্টন অফিসে এসে বাকি কাজ একদিনেই সেরে নেওয়া যায়।`,
    introEn: `If you are travelling from ${d.en} division for Hajj or Umrah, your first consultation and package selection can be done by phone or WhatsApp. When needed, the remaining steps can be completed in a single visit to our Naya Paltan, Dhaka office.`,
    preRegLabel: `Hajj/Umrah from ${d.en}`,
  };
}

const nriPage: LandingPage = {
  path: '/nri',
  image: 'makkah',
  defaultLang: 'en',
  titleEn: 'For Bangladeshis Abroad — Send Your Parents for Hajj or Umrah',
  titleBn: 'প্রবাসী বাংলাদেশিদের জন্য — মা-বাবাকে হজ বা ওমরাহে পাঠান',
  metaTitleEn: 'Hajj & Umrah for Bangladeshis Abroad | Book for Parents from UK, USA, Gulf | MASK Hajj Group',
  metaTitleBn: 'প্রবাসী বাংলাদেশিদের জন্য হজ ও ওমরাহ | MASK Hajj Group',
  metaDescEn:
    'Living abroad? Book Hajj or Umrah for your parents or family in Bangladesh, or travel with them. Ministry-approved agency (Licence 15630) in Dhaka. Consult on WhatsApp from any time zone; pay in Bangladesh through family or from abroad.',
  metaDescBn:
    'বিদেশে থাকেন? বাংলাদেশে থাকা মা-বাবা বা পরিবারের জন্য হজ/ওমরাহ বুক করুন, বা তাঁদের সাথে যান। WhatsApp-এ যেকোনো সময় পরামর্শ; টাকা দেশে পরিবারের মাধ্যমে বা বিদেশ থেকে।',
  introEn:
    'Thousands of Bangladeshis in the UK, USA, Gulf and elsewhere want to send their parents for Hajj or Umrah but worry about who will look after them. We arrange everything from Dhaka — and a scholar-guide stays with the group in Makkah and Madinah. You can also join the same group and travel together.',
  introBn:
    'যুক্তরাজ্য, যুক্তরাষ্ট্র, মধ্যপ্রাচ্যসহ বিদেশে থাকা হাজার হাজার বাংলাদেশি মা-বাবাকে হজ বা ওমরাহে পাঠাতে চান, কিন্তু চিন্তা করেন কে দেখাশোনা করবে। আমরা ঢাকা থেকে সব ব্যবস্থা করি — আর মক্কা-মদিনায় আলেম মুয়াল্লিম গ্রুপের সাথেই থাকেন। চাইলে আপনিও একই গ্রুপে যোগ দিতে পারেন।',
  bulletsEn: [
    'Consult on WhatsApp at a time that suits your time zone',
    'Your family in Bangladesh can complete paperwork at our Dhaka office',
    'Payment can be made in Bangladesh through family, or from abroad — our office will guide you',
    'Regular updates to you while your parents are travelling',
    'Elderly-friendly care: scholar-guide, group travel, hotels near the Haram',
  ],
  bulletsBn: [
    'আপনার সময় অনুযায়ী WhatsApp-এ পরামর্শ',
    'দেশে থাকা পরিবার ঢাকার অফিসে কাগজপত্রের কাজ সেরে নিতে পারেন',
    'টাকা দেশে পরিবারের মাধ্যমে বা বিদেশ থেকে দেওয়া যায় — অফিস পদ্ধতি জানিয়ে দেবে',
    'মা-বাবা সফরে থাকাকালে আপনাকে নিয়মিত আপডেট',
    'বয়স্কদের উপযোগী যত্ন: আলেম মুয়াল্লিম, গ্রুপ ভ্রমণ, হারামের কাছে হোটেল',
  ],
  ctaAnchor: '#contact',
  ctaEn: 'Talk to us on WhatsApp',
  ctaBn: 'WhatsApp-এ কথা বলুন',
  preRegLabel: 'Booking from abroad (NRB)',
};

export const landingPages: LandingPage[] = [
  umrahPage,
  hajjFromBangladeshPage,
  ...divisions.map(divisionPage),
  nriPage,
];

export function findLandingPage(path: string): LandingPage | undefined {
  return landingPages.find((p) => p.path === path);
}

import React, { useState, useEffect } from 'react';
import {
  Luggage,
  Sun,
  CloudSnow,
  Moon,
  CheckCircle2,
  Plus,
  Trash2,
  RotateCcw,
  Download,
  Printer,
  Sparkles,
  Filter,
  CheckSquare,
  Square,
  AlertCircle,
  Shirt,
  HeartPulse,
  BatteryCharging,
  Tent,
  Smile,
  Footprints,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

export type JourneySeason = 'summer' | 'winter' | 'ramadan';
export type JourneyType = 'hajj' | 'umrah';
export type PackingCategory =
  | 'ihram'
  | 'footwear'
  | 'mina_camp'
  | 'toiletries'
  | 'medicine'
  | 'electronics'
  | 'luggage';

export interface PackingItem {
  id: string;
  category: PackingCategory;
  nameEn: string;
  nameBn: string;
  descriptionEn?: string;
  descriptionBn?: string;
  requiredFor: JourneyType[];
  recommendedSeason?: JourneySeason[];
  isCustom?: boolean;
}

interface SmartPackingListProps {
  lang: Language;
  onOpenPreReg?: (topic?: string) => void;
}

const INITIAL_PACKING_ITEMS: PackingItem[] = [
  // 1. Ihram & Sacred Garments
  {
    id: 'ihram_cloth',
    category: 'ihram',
    nameEn: '2 Sets of White Cotton Ihram (Men)',
    nameBn: '২ সেট সুতি সাদা ইহরামের কাপড় (পুরুষদের জন্য)',
    descriptionEn: 'Thick, absorbent, unstitched 100% cotton towels.',
    descriptionBn: 'উন্নত মানের সুতি ও ঘাম শোষণকারী সেলাইবিহীন তোয়ালে কাপড়।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'ihram_belt',
    category: 'ihram',
    nameEn: 'Ihram Belt with Hidden Zipper Pockets',
    nameBn: 'হিডেন চেইনযুক্ত মজবুত ইহরাম বেল্ট',
    descriptionEn: 'Secure belt for keeping passport, money and mobile safe.',
    descriptionBn: 'টাকা ও পাসপোর্ট নিরাপদে রাখার জন্য পকেটযুক্ত বেল্ট।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'women_abaya',
    category: 'ihram',
    nameEn: '3-4 Breathable Abayas & Hijabs (Women)',
    nameBn: '৩-৪টি আরামদায়ক বোরকা ও হিজাব (নারীদের জন্য)',
    descriptionEn: 'Loose, non-transparent cotton or linen abayas.',
    descriptionBn: 'ঢিলেঢালা সুতি বা লিনেনের পর্দাশীল বোরকা ও স্কার্ফ।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'undergarments',
    category: 'ihram',
    nameEn: '5-6 Pairs of Pure Cotton Undergarments',
    nameBn: '৫-৬ জোড়া আরামদায়ক সুতি অন্তর্বাস',
    descriptionEn: 'For non-Ihram days in hotel stay.',
    descriptionBn: 'হোটেল ও সাধারণ দিনে ব্যবহারের জন্য।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'pocket_prayer_mat',
    category: 'ihram',
    nameEn: 'Waterproof Pocket Travel Prayer Mat & Tasbih',
    nameBn: 'ওয়াটারপ্রুফ পকেট জায়নামাজ ও ডিজিটাল তসবিহ',
    descriptionEn: 'Lightweight for praying in Haram courtyards & transit.',
    descriptionBn: 'মসজিদে হারাম ও নববীর চত্বরে নামাজের জন্য উপযোগী।',
    requiredFor: ['hajj', 'umrah'],
  },

  // 2. Footwear & Mobility
  {
    id: 'footwear_slippers',
    category: 'footwear',
    nameEn: 'Cushioned Walking Sandals (Ankle-free for Ihram)',
    nameBn: 'কুশনযুক্ত আরামদায়ক স্যান্ডেল (গোড়ালি উন্মুক্ত)',
    descriptionEn: 'Anti-slip soft sole sandals tested for long walking rituals.',
    descriptionBn: 'তাওয়াফ ও সাঈর দীর্ঘ হাঁটার উপযোগী নরম ও গ্রিপযুক্ত স্যান্ডেল।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'tawaf_socks',
    category: 'footwear',
    nameEn: 'Anti-Slip Silicone Grip Socks (2 Pairs)',
    nameBn: 'অ্যান্টি-স্লিপ সিলিকন গ্রিপ মোজা (২ জোড়া)',
    descriptionEn: 'Prevents slipping on marble floors and protects feet.',
    descriptionBn: 'মসৃণ মার্বেল পাথরে পা পিছলে যাওয়া রোধে সহায়ক।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'shoe_bag',
    category: 'footwear',
    nameEn: 'Drawstring Shoe Bag for Haram Entry',
    nameBn: 'মসজিদে জুতা বহনের ড্র-স্ট্রিং ব্যাগ',
    descriptionEn: 'To keep your shoes with you inside the Grand Mosque.',
    descriptionBn: 'হারাম শরিফের ভেতর নিজের স্যান্ডেল সাথে রাখার জন্য।',
    requiredFor: ['hajj', 'umrah'],
  },

  // 3. Mina & Muzdalifah Camp Gear (Hajj Specific)
  {
    id: 'camp_mat',
    category: 'mina_camp',
    nameEn: 'Foldable Compact Sleeping Mat & Inflatable Pillow',
    nameBn: 'ভাঁজযোগ্য স্লিপিং ম্যাট ও বাতাসযুক্ত বালিশ',
    descriptionEn: 'Essential for Muzdalifah open sky sleep under the stars.',
    descriptionBn: 'মুজদালিফায় খোলা আকাশের নিচে আরামদায়ক বিশ্রামের জন্য।',
    requiredFor: ['hajj'],
  },
  {
    id: 'pebble_bag',
    category: 'mina_camp',
    nameEn: 'Drawstring Pebble Pouch for Jamarat Rami Stones',
    nameBn: 'জামারায় পাথর নিক্ষেপের জন্য ছোট থলি',
    descriptionEn: 'For collecting 70 clean pebbles from Muzdalifah.',
    descriptionBn: 'মুজদালিফা থেকে ৭০টি ছোট কঙ্কর সংগ্রহ ও বহনের থলি।',
    requiredFor: ['hajj'],
  },
  {
    id: 'portable_neck_fan',
    category: 'mina_camp',
    nameEn: 'Portable USB Rechargeable Neck Fan / Hand Mist Fan',
    nameBn: 'রিচার্জেবল পোর্টেবল নেক ফ্যান / হ্যান্ড মিস্ট ফ্যান',
    descriptionEn: 'Provides life-saving cooling relief during Arafat day.',
    descriptionBn: 'আরাফাত ও মিনার তীব্র গরমে শরীর ঠান্ডা রাখতে অত্যন্ত কার্যকর।',
    requiredFor: ['hajj'],
    recommendedSeason: ['summer'],
  },
  {
    id: 'mina_backpack',
    category: 'mina_camp',
    nameEn: 'Lightweight 5-Day Mina Survival String Backpack',
    nameBn: 'মিনার ৫ দিনের জন্য হালকা ব্যাকপ্যাক',
    descriptionEn: 'To carry essential change of clothes and toiletries to tents.',
    descriptionBn: 'মিনায় তাঁবুতে প্রয়োজনীয় কাপড় ও ওষুধ বহনের জন্য।',
    requiredFor: ['hajj'],
  },

  // 4. Toiletries & Sun Protection (Unscented)
  {
    id: 'unscented_soap',
    category: 'toiletries',
    nameEn: 'Halal Unscented Soap Bar & Shampoo (Ihram Safe)',
    nameBn: 'হালাল সুবাসহীন সাবান ও শ্যাম্পু (ইহরামের জন্য বৈধ)',
    descriptionEn: 'Fragrance-free certified for use in state of Ihram.',
    descriptionBn: 'ইহরাম অবস্থায় সুগন্ধি ব্যবহার নিষিদ্ধ বিধায় সুবাসহীন সামগ্রী।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'anti_chafing',
    category: 'toiletries',
    nameEn: 'Anti-Chafing Cream / Vaseline (Friction Defense)',
    nameBn: 'অ্যান্টি-চ্যাফিং ক্রিম / ভ্যাসলিন (ঘর্ষণ সুরক্ষা)',
    descriptionEn: 'Crucial for preventing inner thigh friction rash while walking in Ihram.',
    descriptionBn: 'ইহরামে দীর্ঘ হাঁটার ফলে উরুতে জ্বালাপোড়া ও ছাল ওঠা রোধে জরুরি।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'uv_umbrella',
    category: 'toiletries',
    nameEn: 'UV-Blocking Foldable Sun Umbrella',
    nameBn: 'ইউভি প্রোটেকশন ফোল্ডিং রোদ ছাতা',
    descriptionEn: 'Protects from direct 45°C Saudi sunstroke during noon.',
    descriptionBn: 'দুপুরের তীব্র রোদে হিটস্ট্রোক ও মাথা ঘোরা প্রতিরোধে সহায়ক।',
    requiredFor: ['hajj', 'umrah'],
    recommendedSeason: ['summer'],
  },
  {
    id: 'wet_wipes',
    category: 'toiletries',
    nameEn: 'Alcohol-Free & Fragrance-Free Wet Wipes (2 Packs)',
    nameBn: 'অ্যালকোহল ও সুবাসমুক্ত ওয়েট ওয়াইপস (২ প্যাকেট)',
    descriptionEn: 'Quick hygiene cleansing in transit and Mina camps.',
    descriptionBn: 'সফর ও তাঁবুতে ঝটপট পরিষ্কার-পরিচ্ছন্নতার জন্য।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'winter_shawl',
    category: 'toiletries',
    nameEn: 'Lightweight Sweater / Warm Woolen Shawl',
    nameBn: 'হালকা সোয়েটার বা গরম শাল (মদিনা ও মুজদালিফার জন্য)',
    descriptionEn: 'For chilly Madinah pre-dawn Tahajjud and Muzdalifah nights.',
    descriptionBn: 'শীতকালে মদিনার তাহাজ্জুদ ও মুজদালিফার রাতের ঠান্ডার জন্য।',
    requiredFor: ['hajj', 'umrah'],
    recommendedSeason: ['winter'],
  },

  // 5. Prescription Medicines & First Aid
  {
    id: 'prescribed_meds',
    category: 'medicine',
    nameEn: '40-Day Daily Prescription Medicines + Doctor Slip',
    nameBn: '৪০ দিনের প্রেসক্রিপশন ওষুধ ও ডাক্তারের ব্যবস্থাপত্র',
    descriptionEn: 'BP, Diabetes, Thyroid, Heart, etc. in original packaging.',
    descriptionBn: 'ডায়াবেটিস, প্রেশার ও দীর্ঘমেয়াদি রোগের পর্যাপ্ত ওষুধ মূল বক্সে।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'ors_electrolytes',
    category: 'medicine',
    nameEn: 'Oral Rehydration Salts (ORS) & Electrolytes (20 Sachets)',
    nameBn: 'খাবার স্যালাইন (ORS) ও ইলেকট্রোলাইট (২০ প্যাকেট)',
    descriptionEn: 'Prevents dehydration and muscle cramps from intense sweat.',
    descriptionBn: 'প্রচুর ঘামে পানিশূন্যতা ও মাংসপেশির টান প্রতিরোধে অপরিহার্য।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'pain_fever_tablets',
    category: 'medicine',
    nameEn: 'Paracetamol, Pain Relief Spray & Muscle Gel',
    nameBn: 'প্যারাসিটামল, ব্যথানাশক স্প্রে ও মুভ জেল',
    descriptionEn: 'Relieves calf, knee, and foot fatigue after Tawaf and Sa’i.',
    descriptionBn: 'হাঁটার পর পা ও কোমরের পেশির ব্যথা উপশমের জন্য।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'throat_lozenges',
    category: 'medicine',
    nameEn: 'Throat Lozenges / Strepsils & Antacids',
    nameBn: 'গলার স্বস্তি ড্রপ / স্ট্রেপসিল ও এন্টাসিড',
    descriptionEn: 'For AC-induced dry cough and spicy meal indigestion.',
    descriptionBn: 'হোটেলের এসির ঠান্ডা কাশি ও গ্যাস্ট্রিকের সমস্যার জন্য।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'ramadan_dates_box',
    category: 'medicine',
    nameEn: 'Energy Snack Container & Dates / Glucose Pack',
    nameBn: 'খেজুর ও গ্লুকোজ রাখার ছোট এয়ারটাইট বক্স',
    descriptionEn: 'For energy boost during fast and waiting for Iftar in Haram.',
    descriptionBn: 'রমজানে রোজা রাখা অবস্থায় হারামে শক্তি ধরে রাখার জন্য।',
    requiredFor: ['hajj', 'umrah'],
    recommendedSeason: ['ramadan'],
  },

  // 6. Electronics & Power
  {
    id: 'powerbank',
    category: 'electronics',
    nameEn: '20,000 mAh Powerbank (Flight Approved < 74Wh)',
    nameBn: '২০,০০০ mAh অনুমোদিত পাওয়ার ব্যাংক',
    descriptionEn: 'Must be kept in cabin bag. Essential during full day in Mina/Arafat.',
    descriptionBn: 'কেবিন ব্যাগে রাখতে হবে। আরাফাত ও মিনার দিনে চার্জের জন্য জরুরি।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'saudi_adapter',
    category: 'electronics',
    nameEn: 'Universal Saudi/UK 3-Pin Adapter + 2m Long Cable',
    nameBn: 'সৌদি ও ইউকে ৩-পিন অ্যাডাপ্টার ও ২ মিটার চার্জিং তার',
    descriptionEn: 'For charging multiple devices in hotel rooms and camp sockets.',
    descriptionBn: 'হোটেল রুম ও তাঁবুর দূরবর্তী সকেটে সহজে মোবাইল চার্জ দিতে।',
    requiredFor: ['hajj', 'umrah'],
  },

  // 7. Luggage, Cash & Organization
  {
    id: 'main_luggage',
    category: 'luggage',
    nameEn: 'Durable 28" Main Luggage with TSA Lock & Agency Tag',
    nameBn: '২৮ ইঞ্চি মজবুত লাগেজ ও মাস্ক এজেন্সির নেইম ট্যাগ',
    descriptionEn: 'With bright colored belt to easily identify on airport carousel.',
    descriptionBn: 'বিমানবন্দরের বেল্টে সহজে চেনার জন্য কালারফুল ট্যাগযুক্ত লাগেজ।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'cabin_bag',
    category: 'luggage',
    nameEn: '7kg Lightweight Cabin Trolley or Backpack',
    nameBn: '৭ কেজির হ্যান্ড ট্রলি বা আরামদায়ক ব্যাকপ্যাক',
    descriptionEn: 'Contains 1 change of Ihram, prescription meds and valuables.',
    descriptionBn: 'ইহরামের জরুরি অতিরিক্ত সেট ও মূল্যবান জিনিস বহনের জন্য।',
    requiredFor: ['hajj', 'umrah'],
  },
  {
    id: 'cash_riyals',
    category: 'luggage',
    nameEn: 'Saudi Riyal (SAR) Cash + Multi-Currency Forex Card',
    nameBn: 'সৌদি রিয়াল (SAR) ক্যাশ ও ইন্টারন্যাশনাল কার্ড',
    descriptionEn: 'For personal food, Zamzam cans, laundry, and daily Sadaqah.',
    descriptionBn: 'দৈনন্দিন খাবার, জমজম ক্যান, লন্ড্রি ও দান-সদকার জন্য।',
    requiredFor: ['hajj', 'umrah'],
  },
];

const CATEGORY_NAMES: Record<PackingCategory, { en: string; bn: string; icon: React.ElementType }> = {
  ihram: { en: 'Ihram & Sacred Garments', bn: 'ইহরাম ও ধর্মীয় পোশাক', icon: Shirt },
  footwear: { en: 'Footwear & Mobility', bn: 'স্যান্ডেল ও জুতো', icon: Footprints },
  mina_camp: { en: 'Mina & Muzdalifah Camp Gear', bn: 'মিনা ও মুজদালিফা গিয়ার', icon: Tent },
  toiletries: { en: 'Toiletries & Sun Defense', bn: 'সুগন্ধিমুক্ত প্রসাধন ও ছাতা', icon: ShieldCheck },
  medicine: { en: 'Prescription Medicines & Health', bn: 'ওষুধ ও ফার্স্ট এইড', icon: HeartPulse },
  electronics: { en: 'Electronics & Powerbanks', bn: 'ইলেকট্রনিক্স ও গ্যাজেট', icon: BatteryCharging },
  luggage: { en: 'Luggage, Cash & Currency', bn: 'লাগেজ, নগদ রিয়াল ও কার্ড', icon: Luggage },
};

export const SmartPackingList: React.FC<SmartPackingListProps> = ({
  lang,
  onOpenPreReg,
}) => {
  const [journeyType, setJourneyType] = useState<JourneyType>('hajj');
  const [season, setSeason] = useState<JourneySeason>('summer');
  const [items, setItems] = useState<PackingItem[]>(INITIAL_PACKING_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<PackingCategory | 'all'>('all');
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PackingCategory>('ihram');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'unpacked' | 'packed'>('all');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedChecked = localStorage.getItem('mask_smart_packing_checked');
      if (savedChecked) {
        setCheckedState(JSON.parse(savedChecked));
      }
      const savedCustomItems = localStorage.getItem('mask_smart_packing_custom_items');
      if (savedCustomItems) {
        const customArr = JSON.parse(savedCustomItems);
        setItems((prev) => [...prev, ...customArr]);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save checked state
  const handleToggle = (id: string) => {
    const updated = { ...checkedState, [id]: !checkedState[id] };
    setCheckedState(updated);
    try {
      localStorage.setItem('mask_smart_packing_checked', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Filter items matching journeyType and season
  const activeItems = items.filter((item) => {
    // Check journey type
    if (!item.requiredFor.includes(journeyType)) return false;

    // Check season recommendation if specified
    if (item.recommendedSeason && item.recommendedSeason.length > 0) {
      if (!item.recommendedSeason.includes(season)) return false;
    }

    // Check category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    // Check filter mode
    const isPacked = !!checkedState[item.id];
    if (filterMode === 'packed' && !isPacked) return false;
    if (filterMode === 'unpacked' && isPacked) return false;

    return true;
  });

  // Calculate statistics across all applicable items (regardless of category filter)
  const allApplicableItems = items.filter((item) => {
    if (!item.requiredFor.includes(journeyType)) return false;
    if (item.recommendedSeason && item.recommendedSeason.length > 0) {
      if (!item.recommendedSeason.includes(season)) return false;
    }
    return true;
  });

  const totalCount = allApplicableItems.length;
  const packedCount = allApplicableItems.filter((i) => checkedState[i.id]).length;
  const progressPercentage = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: 'custom_' + Date.now(),
      category: newItemCategory,
      nameEn: newItemName.trim(),
      nameBn: newItemName.trim(),
      requiredFor: ['hajj', 'umrah'],
      isCustom: true,
    };

    const updated = [...items, newItem];
    setItems(updated);
    setNewItemName('');
    setShowAddForm(false);

    try {
      const customItems = updated.filter((i) => i.isCustom);
      localStorage.setItem('mask_smart_packing_custom_items', JSON.stringify(customItems));
    } catch {
      // ignore
    }
  };

  const handleRemoveCustomItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    const updatedChecked = { ...checkedState };
    delete updatedChecked[id];
    setCheckedState(updatedChecked);

    try {
      const customItems = updated.filter((i) => i.isCustom);
      localStorage.setItem('mask_smart_packing_custom_items', JSON.stringify(customItems));
      localStorage.setItem('mask_smart_packing_checked', JSON.stringify(updatedChecked));
    } catch {
      // ignore
    }
  };

  const handleResetChecklist = () => {
    if (window.confirm(lang === 'en' ? 'Reset all packing checklist checks?' : 'সব চেকলিস্ট রিসেট করতে চান?')) {
      setCheckedState({});
      try {
        localStorage.removeItem('mask_smart_packing_checked');
      } catch {
        // ignore
      }
    }
  };

  const handleDownloadPackingList = () => {
    const journeyLabel = journeyType === 'hajj' ? 'Hajj (40 Days)' : 'Umrah (14-21 Days)';
    const seasonLabel =
      season === 'summer'
        ? 'Summer Season (38°C - 48°C)'
        : season === 'winter'
        ? 'Winter Season (16°C - 28°C)'
        : 'Holy Ramadan Season';

    const lines: string[] = [
      '========================================================================',
      '         MASK HAJJ GROUP (GOVT APPROVED LICENSE NO: 0422)',
      '               SMART PILGRIMAGE PACKING CHECKLIST',
      '========================================================================',
      `Pilgrimage Target: ${journeyLabel}`,
      `Climate / Season: ${seasonLabel}`,
      `Readiness: ${packedCount} of ${totalCount} items packed (${progressPercentage}%)`,
      `Date Generated: ${new Date().toLocaleDateString('en-GB')}`,
      '------------------------------------------------------------------------',
      'ITEMS CHECKLIST BY CATEGORY:',
      '------------------------------------------------------------------------',
    ];

    const categories: PackingCategory[] = [
      'ihram',
      'footwear',
      'mina_camp',
      'toiletries',
      'medicine',
      'electronics',
      'luggage',
    ];

    categories.forEach((cat) => {
      const catItems = allApplicableItems.filter((i) => i.category === cat);
      if (catItems.length === 0) return;

      const catTitle = lang === 'en' ? CATEGORY_NAMES[cat].en : CATEGORY_NAMES[cat].bn;
      lines.push(`\n[ ${catTitle.toUpperCase()} ]`);

      catItems.forEach((item, idx) => {
        const isDone = !!checkedState[item.id];
        const status = isDone ? '[✓ PACKED]' : '[  PENDING]';
        const name = lang === 'en' ? item.nameEn : item.nameBn;
        const desc = (lang === 'en' ? item.descriptionEn : item.descriptionBn) || '';
        lines.push(`  ${status} ${idx + 1}. ${name}`);
        if (desc) lines.push(`       Note: ${desc}`);
      });
    });

    lines.push('\n------------------------------------------------------------------------');
    lines.push('IMPORTANT LUGGAGE & AIRLINE TIPS:');
    lines.push('1. Keep Powerbanks and daily medications in your 7kg Cabin bag, NOT in checked luggage.');
    lines.push('2. Scissor, nail clippers and liquids >100ml must be in 28" Checked luggage.');
    lines.push('3. Affix MASK Hajj Group luggage identification tags with mobile number on all bags.');
    lines.push('------------------------------------------------------------------------');
    lines.push('MASK HAJJ GROUP - Suite 402, Naya Paltan, Dhaka-1000 | Hotline: +880 1711-258708');
    lines.push('========================================================================');

    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MASK_Pilgrim_Smart_Packing_List_${journeyType}_${season}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-6 sm:p-8 soft-shadow space-y-6">
      
      {/* Top Controls Bar: Journey & Climate Season Switcher */}
      <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-blue-900/10 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-800/80 rounded-2xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <Luggage className="w-4 h-4" />
              <span>{lang === 'en' ? 'Smart Packing AI Assistant' : 'স্মার্ট প্যাকিং এআই অ্যাসিস্ট্যান্ট'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {lang === 'en' ? 'Season & Journey-Adaptive Packing List' : 'মৌসুম ও সফর অনুযায়ী স্মার্ট প্যাকিং তালিকা'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {lang === 'en'
                ? 'Tailors your packing items based on Hajj vs. Umrah duration and Saudi weather conditions.'
                : 'হজ বা ওমরাহর ধরন এবং সৌদি আরবের আবহাওয়া অনুযায়ী আপনার প্রয়োজনীয় মালামালের পরামর্শ পান।'}
            </p>
          </div>

          {/* Quick Actions (Download, Print, Add Item, Reset) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Add Item' : 'নতুন আইটেম যোগ'}</span>
            </button>
            <button
              onClick={handleDownloadPackingList}
              className="flex items-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
              title={lang === 'en' ? 'Download text packing list' : 'চেকলিস্ট ডাউনলোড'}
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Download' : 'ডাউনলোড'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title={lang === 'en' ? 'Print Packing List' : 'প্রিন্ট'}
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetChecklist}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-red-500 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title={lang === 'en' ? 'Reset Checklist' : 'রিসেট'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dual Selectors: Journey Type & Season */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-blue-200/60 dark:border-blue-800/60">
          
          {/* Journey Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              {lang === 'en' ? '1. Select Pilgrimage Journey:' : '১. সফরের ধরন নির্বাচন করুন:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setJourneyType('hajj')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-2 ${
                  journeyType === 'hajj'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>🕋 {lang === 'en' ? 'Hajj (40 Days)' : 'হজ (৪০ দিন)'}</span>
              </button>
              <button
                type="button"
                onClick={() => setJourneyType('umrah')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-2 ${
                  journeyType === 'umrah'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>🕌 {lang === 'en' ? 'Umrah (14-21 Days)' : 'ওমরাহ (১৪-২১ দিন)'}</span>
              </button>
            </div>
          </div>

          {/* Season / Weather Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              {lang === 'en' ? '2. Select Saudi Season & Weather:' : '২. আবহাওয়া ও মৌসুম নির্বাচন করুন:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSeason('summer')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  season === 'summer'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Summer (Hot)' : 'গ্রীষ্মকাল (গরম)'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSeason('winter')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  season === 'winter'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <CloudSnow className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Winter / Mild' : 'শীতকাল / মৃদু'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSeason('ramadan')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  season === 'ramadan'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Ramadan' : 'মাহে রমজান'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Add Custom Item Modal / Dropdown Box */}
      {showAddForm && (
        <form
          onSubmit={handleAddCustomItem}
          className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center gap-3 animate-in fade-in"
        >
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={lang === 'en' ? 'Enter item name (e.g. Extra spectacles, Quran)' : 'নতুন সামগ্রীর নাম লিখুন (যেমন: চশমা, ওষুধ)...'}
            className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-blue-500"
            autoFocus
          />
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as PackingCategory)}
            className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-blue-500"
          >
            <option value="ihram">{lang === 'en' ? 'Ihram & Garments' : 'ইহরাম ও পোশাক'}</option>
            <option value="footwear">{lang === 'en' ? 'Footwear' : 'স্যান্ডেল ও জুতো'}</option>
            <option value="mina_camp">{lang === 'en' ? 'Mina Camp Gear' : 'মিনা ক্যাম্প গিয়ার'}</option>
            <option value="toiletries">{lang === 'en' ? 'Toiletries & Sun Defense' : 'প্রসাধন ও ছাতা'}</option>
            <option value="medicine">{lang === 'en' ? 'Medicines' : 'ওষুধ'}</option>
            <option value="electronics">{lang === 'en' ? 'Electronics' : 'ইলেকট্রনিক্স'}</option>
            <option value="luggage">{lang === 'en' ? 'Luggage & Cash' : 'লাগেজ ও ক্যাশ'}</option>
          </select>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              {lang === 'en' ? 'Add' : 'যুক্ত করুন'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs px-3 py-2 rounded-xl transition cursor-pointer"
            >
              {lang === 'en' ? 'Cancel' : 'বাতিল'}
            </button>
          </div>
        </form>
      )}

      {/* Progress Readiness Tracker */}
      <div className="bg-slate-50 dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
              {lang === 'en' ? 'Overall Packing Readiness' : 'প্যাকিং প্রস্তুতির সার্বিক অগ্রগতি'}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
              {lang === 'bn' ? toBengaliNumber(packedCount) : packedCount} / {lang === 'bn' ? toBengaliNumber(totalCount) : totalCount} {lang === 'en' ? 'Packed' : 'প্যাকড'}
            </span>
            <span className="text-xs font-black text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-3 py-1 rounded-full font-mono">
              {lang === 'bn' ? toBengaliNumber(progressPercentage) : progressPercentage}% {lang === 'en' ? 'Ready' : 'সম্পন্ন'}
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressPercentage === 100
                ? 'bg-emerald-500'
                : progressPercentage >= 50
                ? 'bg-blue-600'
                : 'bg-amber-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs: Category Chips & Packing State */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'All Items' : 'সকল সামগ্রী'} ({allApplicableItems.length})
          </button>

          {(Object.keys(CATEGORY_NAMES) as PackingCategory[]).map((catKey) => {
            const count = allApplicableItems.filter((i) => i.category === catKey).length;
            if (count === 0) return null;
            const IconC = CATEGORY_NAMES[catKey].icon;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === catKey
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <IconC className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? CATEGORY_NAMES[catKey].en : CATEGORY_NAMES[catKey].bn}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Packed / Unpacked Status Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex-shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterMode === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'All' : 'সব'}
          </button>
          <button
            onClick={() => setFilterMode('unpacked')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterMode === 'unpacked'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Pending' : 'বাকি'}
          </button>
          <button
            onClick={() => setFilterMode('packed')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterMode === 'packed'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Packed' : 'প্যাকড'}
          </button>
        </div>

      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeItems.map((item) => {
          const isDone = !!checkedState[item.id];
          const IconComp = CATEGORY_NAMES[item.category]?.icon || Luggage;

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isDone
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-slate-900 dark:text-slate-100'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-slate-100'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(item.id);
                  }}
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition flex-shrink-0 ${
                    isDone
                      ? 'bg-blue-600 text-white'
                      : 'border-2 border-slate-300 dark:border-slate-600 text-transparent'
                  }`}
                >
                  ✓
                </button>

                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <IconComp className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h5
                      className={`text-xs sm:text-sm font-bold leading-tight ${
                        isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {lang === 'en' ? item.nameEn : item.nameBn}
                    </h5>
                    {item.isCustom && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                        Custom
                      </span>
                    )}
                  </div>

                  {(item.descriptionEn || item.descriptionBn) && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {lang === 'en' ? item.descriptionEn : item.descriptionBn}
                    </p>
                  )}
                </div>
              </div>

              {item.isCustom && (
                <button
                  type="button"
                  onClick={(e) => handleRemoveCustomItem(item.id, e)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded-lg transition"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}

        {activeItems.length === 0 && (
          <div className="col-span-full text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            <p className="text-xs">
              {lang === 'en'
                ? 'No items found matching current filter.'
                : 'বর্তমান ফিল্টারের সাথে মিল রেখে কোনো আইটেম পাওয়া যায়নি।'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setFilterMode('all');
              }}
              className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 underline"
            >
              {lang === 'en' ? 'Show All Items' : 'সব আইটেম দেখুন'}
            </button>
          </div>
        )}
      </div>

      {/* Footer Support Banner */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          {lang === 'en'
            ? 'Need complimentary Ihram kits, luggage tags, and medical supplies provided by MASK Hajj Group?'
            : 'মাস্ক হজ গ্রুপ কর্তৃক ফ্রি ইহরাম কিট, নেইম ট্যাগ ও স্বাস্থ্য সুরক্ষা সামগ্রী সংগ্রহ করতে চান?'}
        </p>
        {onOpenPreReg && (
          <button
            onClick={() => onOpenPreReg('Pilgrim Kit & Packing Consultation')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition whitespace-nowrap cursor-pointer"
          >
            {lang === 'en' ? 'Request Hajj Kit' : 'হজ কিটের আবেদন করুন'}
          </button>
        )}
      </div>

    </div>
  );
};

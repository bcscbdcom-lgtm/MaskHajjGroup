import React, { useState } from 'react';
import { Calculator, CheckSquare, Sparkles, CheckCircle2, ChevronRight, Luggage, ArrowRight, Calendar, BookOpen, Printer } from 'lucide-react';
import { Language } from '../types';
import { DayByDayPlanner } from './DayByDayPlanner';
import { SmartPackingList } from './SmartPackingList';

interface PilgrimToolsProps {
  lang: Language;
  onOpenPreReg: (customDetails?: string) => void;
  onOpenPrintModal?: (data?: any) => void;
  onOpenWalkthrough?: () => void;
}

export const PilgrimTools: React.FC<PilgrimToolsProps> = ({
  lang,
  onOpenPreReg,
  onOpenPrintModal,
  onOpenWalkthrough,
}) => {
  const [activeTab, setActiveTab] = useState<'planner' | 'calculator' | 'checklist'>('planner');

  // Calculator State
  const [tripType, setTripType] = useState<'hajj' | 'umrah'>('hajj');
  const [packageTier, setPackageTier] = useState<string>('standard');
  const [pilgrimCount, setPilgrimCount] = useState<number>(2);
  const [roomType, setRoomType] = useState<'quad' | 'triple' | 'double'>('quad');
  const [includeQurbani, setIncludeQurbani] = useState<boolean>(true);
  const [includeTrain, setIncludeTrain] = useState<boolean>(true);
  const [includeTaif, setIncludeTaif] = useState<boolean>(false);

  // Base Prices calculation
  const calculateTotal = () => {
    let base = 0;
    if (tripType === 'hajj') {
      if (packageTier === 'budget') base = 513648;
      else if (packageTier === 'economy') base = 540000;
      else if (packageTier === 'standard') base = 640000;
      else base = 995000; // VIP
    } else {
      if (packageTier === 'budget') base = 160000;
      else if (packageTier === 'economy') base = 165000;
      else if (packageTier === 'standard') base = 215000;
      else base = 325000; // VIP
    }

    // Room supplement per person
    let roomFactor = 0;
    if (roomType === 'triple') roomFactor = tripType === 'hajj' ? 35000 : 15000;
    if (roomType === 'double') roomFactor = tripType === 'hajj' ? 70000 : 30000;

    let extras = 0;
    if (tripType === 'hajj' && packageTier === 'budget' && includeQurbani) extras += 24000;
    if (includeTrain && packageTier !== 'vip') extras += 12000;
    if (includeTaif) extras += 5000;

    const perPerson = base + roomFactor + extras;
    const total = perPerson * pilgrimCount;
    return { perPerson, total };
  };

  const { perPerson, total } = calculateTotal();

  return (
    <section id="tools" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {lang === 'en' ? 'Smart Pilgrim Utilities' : 'হাজীদের সুবিধার্থে স্মার্ট টুলস'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
          {lang === 'en' ? 'Plan, Prepare & Estimate Your Sacred Journey' : 'সফরের প্ল্যানার, বাজেট হিসাব ও প্রস্তুতি চেকলিস্ট'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          {lang === 'en'
            ? 'Interactive tools to plan your day-by-day rituals, calculate caravan expenses, and track your essential packing.'
            : 'আপনার কাফেলার সম্ভাব্য খরচের হিসাব, দিনভিত্তিক আমলের তালিকা এবং প্রয়োজনীয় কাগজপত্রের প্রস্তুতি সহজেই মিলিয়ে নিন।'}
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'planner'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Day-by-Day Itinerary' : 'দৈনিক সফরসূচি'}</span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Cost Calculator' : 'খরচ ক্যালকুলেটর'}</span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Luggage className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Smart Packing List' : 'স্মার্ট প্যাকিং তালিকা'}</span>
            </button>
          </div>

          {onOpenWalkthrough && (
            <button
              onClick={onOpenWalkthrough}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition cursor-pointer shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{lang === 'en' ? 'Step-by-Step Walkthrough' : 'হজ-ওমরাহ ভিজ্যুয়াল গাইড'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. Day-by-Day Planner Tab View */}
      {activeTab === 'planner' && (
        <DayByDayPlanner
          lang={lang}
          onOpenPrintModal={(plannerData) => {
            if (onOpenPrintModal) onOpenPrintModal(plannerData);
          }}
          onOpenPreReg={onOpenPreReg}
        />
      )}

      {/* 2. Calculator Tab View */}
      {activeTab === 'calculator' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-6 sm:p-10 soft-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Journey Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {lang === 'en' ? '1. Select Journey Type' : '১. সফরের ধরণ নির্বাচন করুন'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTripType('hajj')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                    tripType === 'hajj'
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 ring-2 ring-blue-600/10'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {lang === 'en' ? 'Hajj 2026–2027 (35-40 Days)' : 'পবিত্র হজ ২০২৬–২৭ (৩৫-৪০ দিন)'}
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('umrah')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                    tripType === 'umrah'
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 ring-2 ring-blue-600/10'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {lang === 'en' ? 'Umrah Caravan (10-15 Days)' : 'ওমরাহ সফর (১০-১৫ দিন)'}
                </button>
              </div>
            </div>

            {/* Package Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {lang === 'en' ? '2. Package Tier' : '২. প্যাকেজ ক্যাটাগরি'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'budget', nameEn: 'Budget Saver', nameBn: 'বাজেট' },
                  { id: 'economy', nameEn: 'Economy', nameBn: 'ইকোনমি' },
                  { id: 'standard', nameEn: 'Standard ★', nameBn: 'স্ট্যান্ডার্ড ★' },
                  { id: 'vip', nameEn: 'VIP Luxury', nameBn: 'ভিআইপি' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setPackageTier(tier.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition cursor-pointer ${
                      packageTier === tier.id
                        ? 'border-blue-600 bg-slate-900 dark:bg-blue-600 text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lang === 'en' ? tier.nameEn : tier.nameBn}
                  </button>
                ))}
              </div>
            </div>

            {/* Pilgrim Count & Room Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  {lang === 'en' ? '3. Number of Pilgrims' : '৩. যাত্রীর সংখ্যা'}
                </label>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setPilgrimCount(Math.max(1, pilgrimCount - 1))}
                    className="px-4 py-2.5 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-extrabold text-slate-900 dark:text-white text-sm font-mono">
                    {pilgrimCount} {lang === 'en' ? 'Person(s)' : 'জন'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPilgrimCount(pilgrimCount + 1)}
                    className="px-4 py-2.5 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  {lang === 'en' ? '4. Room Sharing' : '৪. রুমের ধরণ'}
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value as any)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option value="quad">{lang === 'en' ? 'Quad (4-5 Sharing - Standard)' : 'কোয়াড (৪-৫ জন শেয়ারিং - স্ট্যান্ডার্ড)'}</option>
                  <option value="triple">{lang === 'en' ? 'Triple (3 Bedded Room)' : 'ট্রিপল (৩ বেড রুম)'}</option>
                  <option value="double">{lang === 'en' ? 'Double (2 Bed / Couple Room)' : 'ডাবল (২ বেড / কাপল রুম)'}</option>
                </select>
              </div>
            </div>

            {/* Optional Addons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {lang === 'en' ? '5. Optional Upgrades & Add-ons' : '৫. ঐচ্ছিক সুবিধাসমূহ'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                  <input
                    type="checkbox"
                    checked={includeQurbani}
                    onChange={(e) => setIncludeQurbani(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {lang === 'en' ? 'Qurbani Coupon' : 'কুরবানী কুপন'}
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                  <input
                    type="checkbox"
                    checked={includeTrain}
                    onChange={(e) => setIncludeTrain(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {lang === 'en' ? 'Bullet Train' : 'বুলেট ট্রেন রাইড'}
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                  <input
                    type="checkbox"
                    checked={includeTaif}
                    onChange={(e) => setIncludeTaif(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {lang === 'en' ? 'Taif Day Tour' : 'তায়েফ ডে ট্যুর'}
                  </span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between border border-slate-700/50">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-4">
                <div className="text-xs font-bold text-blue-400 uppercase">
                  {lang === 'en' ? 'Cost Breakdown' : 'হিসাবের বিবরণ'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {pilgrimCount} {lang === 'en' ? 'Pilgrim(s)' : 'জন যাত্রী'}
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Selected Package' : 'প্যাকেজ'}:</span>
                  <span className="font-semibold text-white capitalize">{tripType} • {packageTier}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Room Category' : 'রুমের ধরণ'}:</span>
                  <span className="font-semibold text-white capitalize">{roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Estimated Per Person' : 'জনপ্রতি আনুমানিক'}:</span>
                  <span className="font-bold text-blue-400 font-mono">৳ {perPerson.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-700/80">
                <div className="text-xs text-slate-400 font-semibold mb-1">
                  {lang === 'en' ? 'TOTAL ESTIMATED AMOUNT' : 'সর্বমোট আনুমানিক পরিমাণ'}
                </div>
                <div className="text-3xl font-black text-blue-400 tracking-tight font-mono">
                  ৳ {total.toLocaleString('en-IN')}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {lang === 'en'
                    ? 'Includes visa, return flights, hotels, food, transport & scholar support.'
                    : 'ভিসা, বিমান টিকিট, হোটেল, খাবার, পরিবহন ও গাইড সেবা অন্তর্ভুক্ত।'}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() =>
                  onOpenPreReg(
                    `${tripType.toUpperCase()} - ${packageTier.toUpperCase()} (${pilgrimCount} pax, ${roomType} room, Est. ৳ ${total.toLocaleString('en-IN')})`
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Proceed with this Estimate' : 'এই বাজেটে বুকিং আবেদন করুন'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 3. Smart Packing List Tab View */}
      {activeTab === 'checklist' && (
        <SmartPackingList
          lang={lang}
          onOpenPreReg={onOpenPreReg}
        />
      )}

    </section>
  );
};

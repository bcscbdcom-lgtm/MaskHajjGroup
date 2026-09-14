import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, Sparkles, Moon, Sun, RefreshCw, Volume2, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface PrayerTimesSectionProps {
  lang: Language;
  onOpenPreReg?: (source?: string) => void;
}

interface TimingsData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface CityPrayerState {
  cityEn: string;
  cityBn: string;
  countryEn: string;
  countryBn: string;
  hijriDateEn: string;
  hijriDateBn: string;
  readableDate: string;
  timings: TimingsData;
  isLoading: boolean;
  error: boolean;
}

export const PrayerTimesSection: React.FC<PrayerTimesSectionProps> = ({ lang }) => {
  const [activeCity, setActiveCity] = useState<'dhaka' | 'makkah'>('dhaka');

  // Initial fallback prayer timings
  const defaultDhakaTimings: TimingsData = {
    Fajr: '04:32',
    Sunrise: '05:46',
    Dhuhr: '12:02',
    Asr: '15:28',
    Maghrib: '18:18',
    Isha: '19:32',
  };

  const defaultMakkahTimings: TimingsData = {
    Fajr: '04:52',
    Sunrise: '06:08',
    Dhuhr: '12:22',
    Asr: '15:46',
    Maghrib: '18:35',
    Isha: '20:05',
  };

  const [dhakaState, setDhakaState] = useState<CityPrayerState>({
    cityEn: 'Dhaka',
    cityBn: 'ঢাকা (বাংলাদেশ)',
    countryEn: 'Bangladesh',
    countryBn: 'বাংলাদেশ',
    hijriDateEn: '1448 AH',
    hijriDateBn: '১৪৪৮ হিজরী',
    readableDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    timings: defaultDhakaTimings,
    isLoading: true,
    error: false,
  });

  const [makkahState, setMakkahState] = useState<CityPrayerState>({
    cityEn: 'Makkah',
    cityBn: 'মক্কা মুকাররমা (সৌদি আরব)',
    countryEn: 'Saudi Arabia',
    countryBn: 'সৌদি আরব',
    hijriDateEn: '1448 AH',
    hijriDateBn: '১৪৪৮ হিজরী',
    readableDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    timings: defaultMakkahTimings,
    isLoading: true,
    error: false,
  });

  // Fetch Prayer Times from Aladhan API
  useEffect(() => {
    let isMounted = true;

    const fetchCityTimings = async (
      city: string,
      country: string,
      method: number,
      setState: React.Dispatch<React.SetStateAction<CityPrayerState>>
    ) => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`
        );
        if (!res.ok) throw new Error('API request failed');
        const json = await res.json();
        
        if (json?.data && isMounted) {
          const t = json.data.timings;
          const h = json.data.date?.hijri;
          const hijriStrEn = h ? `${h.day} ${h.month.en} ${h.year} AH` : '1448 AH';
          const hijriStrBn = h ? `${h.day} ${h.month.en} ${h.year} হিজরী` : '১৪৪৮ হিজরী';

          setState((prev) => ({
            ...prev,
            timings: {
              Fajr: t.Fajr?.split(' ')[0] || prev.timings.Fajr,
              Sunrise: t.Sunrise?.split(' ')[0] || prev.timings.Sunrise,
              Dhuhr: t.Dhuhr?.split(' ')[0] || prev.timings.Dhuhr,
              Asr: t.Asr?.split(' ')[0] || prev.timings.Asr,
              Maghrib: t.Maghrib?.split(' ')[0] || prev.timings.Maghrib,
              Isha: t.Isha?.split(' ')[0] || prev.timings.Isha,
            },
            hijriDateEn: hijriStrEn,
            hijriDateBn: hijriStrBn,
            readableDate: json.data.date?.readable || prev.readableDate,
            isLoading: false,
            error: false,
          }));
        }
      } catch {
        if (isMounted) {
          setState((prev) => ({ ...prev, isLoading: false, error: true }));
        }
      }
    };

    fetchCityTimings('Dhaka', 'Bangladesh', 1, setDhakaState);
    fetchCityTimings('Makkah', 'Saudi Arabia', 4, setMakkahState);

    return () => {
      isMounted = false;
    };
  }, []);

  // Format 24h time to 12h time string
  const format12h = (time24: string) => {
    if (!time24) return '';
    const [hStr, mStr] = time24.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const hFormatted = h < 10 ? `0${h}` : `${h}`;
    return `${hFormatted}:${m} ${ampm}`;
  };

  const convertToBnNums = (str: string) => {
    if (lang !== 'bn') return str;
    const numMap: { [key: string]: string } = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    };
    return str.replace(/[0-9]/g, (w) => numMap[w] || w);
  };

  const currentState = activeCity === 'dhaka' ? dhakaState : makkahState;

  const prayerList = [
    { key: 'Fajr', nameEn: 'Fajr', nameBn: 'ফজর', icon: Moon, descEn: 'Dawn Prayer', descBn: 'ভোরের সালাত' },
    { key: 'Sunrise', nameEn: 'Sunrise', nameBn: 'সূর্যোদয়', icon: Sun, descEn: 'Ishraq Time', descBn: 'ইশরাকের সময়' },
    { key: 'Dhuhr', nameEn: 'Dhuhr', nameBn: 'জোহর', icon: Sun, descEn: 'Noon Prayer', descBn: 'দুপুরের সালাত' },
    { key: 'Asr', nameEn: 'Asr', nameBn: 'আসর', icon: Sun, descEn: 'Afternoon Prayer', descBn: 'বিকেলের সালাত' },
    { key: 'Maghrib', nameEn: 'Maghrib', nameBn: 'মাগরিব', icon: Moon, descEn: 'Sunset Prayer', descBn: 'সন্ধ্যার সালাত' },
    { key: 'Isha', nameEn: 'Isha', nameBn: 'এশা', icon: Moon, descEn: 'Night Prayer', descBn: 'রাতের সালাত' },
  ];

  return (
    <section id="prayer-times" className="py-14 bg-white text-slate-900 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-[#065F46] text-xs font-extrabold px-4 py-1.5 rounded-full mb-3 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#065F46] animate-pulse" />
            <span>{lang === 'en' ? 'Daily Salah Timings' : 'দৈনিক নামাজের সময়সূচি'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'en' ? (
              <>
                Prayer Schedules for <span className="text-[#065F46] font-serif">Dhaka & Makkah</span>
              </>
            ) : (
              <>
                পবিত্র সালাতের নির্ধারিত সময়সূচি — <span className="text-[#065F46] font-serif">ঢাকা ও মক্কা মুকাররমা</span>
              </>
            )}
          </h2>

          <p className="text-sm text-slate-600 mt-2">
            {lang === 'en'
              ? 'Accurate daily Islamic prayer timings verified via Islamic calculations for pilgrims and believers.'
              : 'হাজী সাহেবান ও মুমিনদের ইবাদত সহযোগিতায় নির্ভুল সময়সূচি ও হিজরী তারিখ।'}
          </p>

          {/* City Toggle Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6 p-1.5 bg-slate-100 rounded-2xl max-w-sm mx-auto border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveCity('dhaka')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeCity === 'dhaka'
                  ? 'bg-[#065F46] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'en' ? 'Dhaka, BD' : 'ঢাকা (বাংলাদেশ)'}</span>
            </button>

            <button
              onClick={() => setActiveCity('makkah')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeCity === 'makkah'
                  ? 'bg-[#065F46] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'en' ? 'Makkah, KSA' : 'মক্কা মুকাররমা'}</span>
            </button>
          </div>
        </div>

        {/* Location & Hijri Date Strip */}
        <div className="bg-gradient-to-r from-[#064E3B] via-[#093D2E] to-[#064E3B] text-white rounded-3xl p-5 mb-8 shadow-xl border border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">
                {lang === 'en' ? currentState.cityEn : currentState.cityBn}
              </div>
              <div className="text-base font-extrabold text-amber-200">
                {lang === 'en' ? currentState.hijriDateEn : currentState.hijriDateBn}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-950/70 border border-emerald-500/40 px-4 py-2 rounded-2xl text-emerald-200">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'en' ? `Date: ${currentState.readableDate}` : `ইংরেজি তারিখ: ${convertToBnNums(currentState.readableDate)}`}
            </span>
          </div>
        </div>

        {/* 6 Prayer Times Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {prayerList.map((item) => {
            const rawTime = currentState.timings[item.key] || '00:00';
            const formatted12h = format12h(rawTime);
            const displayTime = convertToBnNums(formatted12h);
            const isSunrise = item.key === 'Sunrise';

            return (
              <div
                key={item.key}
                className={`rounded-2xl p-4 border transition-all duration-300 text-center flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 ${
                  isSunrise
                    ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60'
                    : 'bg-white dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700/90 hover:border-emerald-500/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSunrise
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
                          : 'bg-emerald-50 text-[#064E3B] dark:bg-emerald-950/80 dark:text-emerald-300'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {lang === 'en' ? item.nameEn : item.nameBn}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {lang === 'en' ? item.descEn : item.descBn}
                  </p>
                </div>

                <div
                  className={`mt-4 pt-3 border-t text-sm font-black font-mono tracking-tight ${
                    isSunrise
                      ? 'border-amber-200/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-300'
                      : 'border-slate-100 dark:border-slate-700/80 text-[#064E3B] dark:text-emerald-400'
                  }`}
                >
                  {displayTime}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>
            {lang === 'en'
              ? 'Timings are updated live daily via Aladhan Islamic Services API.'
              : 'আলআধান ইসলামিক সার্ভিস সিস্টেম হতে প্রতিদিন সয়ংক্রিয়ভাবে ইসলামিক নিয়ম অনুযায়ী সময়সূচি আপডেট করা হয়।'}
          </span>
        </div>

      </div>
    </section>
  );
};

export default PrayerTimesSection;

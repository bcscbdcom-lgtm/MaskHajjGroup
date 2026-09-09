import React, { useState, useEffect } from 'react';
import { CloudSun, Sun, Droplets, Thermometer, Wind, RefreshCw, Compass, MapPin } from 'lucide-react';
import { Language } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

interface HolyCityWeather {
  cityEn: string;
  cityBn: string;
  temp: number;
  conditionEn: string;
  conditionBn: string;
  humidity: number;
  windSpeed: number;
  adviceEn: string;
  adviceBn: string;
  isHot: boolean;
}

interface WeatherWidgetProps {
  lang: Language;
}

export const HolyCitiesWeatherWidget: React.FC<WeatherWidgetProps> = ({ lang }) => {
  const [activeCity, setActiveCity] = useState<'makkah' | 'madinah'>('makkah');
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Default fallback data (accurate typical seasonal weather for Western Saudi Arabia)
  const [weatherData, setWeatherData] = useState<{
    makkah: HolyCityWeather;
    madinah: HolyCityWeather;
  }>({
    makkah: {
      cityEn: 'Makkah al-Mukarramah',
      cityBn: 'পবিত্র মক্কা মুকাররমা',
      temp: 36,
      conditionEn: 'Sunny & Clear',
      conditionBn: 'পরিষ্কার ও রৌদ্রোজ্জ্বল',
      humidity: 32,
      windSpeed: 14,
      adviceEn: 'Light cotton Ihram, umbrella & hydration recommended during daytime.',
      adviceBn: 'দিনের বেলা সুতি পাতলা ইহরাম, ছাতা ও প্রচুর পানি/স্যালাইন পান করুন।',
      isHot: true,
    },
    madinah: {
      cityEn: 'Madinah al-Munawwarah',
      cityBn: 'পবিত্র মদিনা মুনাওয়ারা',
      temp: 33,
      conditionEn: 'Clear Skies',
      conditionBn: 'নির্মল শান্ত আকাশ',
      humidity: 26,
      windSpeed: 11,
      adviceEn: 'Pleasant mornings; light shawl suggested for Tahajjud & Rawdah.',
      adviceBn: 'তাহাজ্জুদ ও রওজা জিয়ারতের সময় মৃদু বাতাসের জন্য পাতলা চাদর উপযোগী।',
      isHot: false,
    },
  });

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Makkah: lat=21.4225, lon=39.8262 | Madinah: lat=24.4672, lon=39.6111
      const [makkahRes, madinahRes] = await Promise.all([
        fetch('https://api.open-meteo.com/v1/forecast?latitude=21.4225&longitude=39.8262&current_weather=true&hourly=relativehumidity_2m'),
        fetch('https://api.open-meteo.com/v1/forecast?latitude=24.4672&longitude=39.6111&current_weather=true&hourly=relativehumidity_2m'),
      ]);

      if (makkahRes.ok && madinahRes.ok) {
        const makkahJson = await makkahRes.json();
        const madinahJson = await madinahRes.json();

        const getCondition = (code: number) => {
          if (code === 0) return { en: 'Clear Skies', bn: 'নির্মল আকাশ' };
          if (code <= 3) return { en: 'Partly Cloudy', bn: 'আংশিক মেঘলা' };
          if (code <= 48) return { en: 'Hazy / Dusty', bn: 'ধূলিময় আবহাওয়া' };
          return { en: 'Light Breeze / Fair', bn: 'মৃদু বাতাস' };
        };

        const makkahCond = getCondition(makkahJson.current_weather?.weathercode ?? 0);
        const madinahCond = getCondition(madinahJson.current_weather?.weathercode ?? 0);

        const makkahTemp = Math.round(makkahJson.current_weather?.temperature ?? 36);
        const madinahTemp = Math.round(madinahJson.current_weather?.temperature ?? 33);

        setWeatherData({
          makkah: {
            cityEn: 'Makkah al-Mukarramah',
            cityBn: 'পবিত্র মক্কা মুকাররমা',
            temp: makkahTemp,
            conditionEn: makkahCond.en,
            conditionBn: makkahCond.bn,
            humidity: makkahJson.hourly?.relativehumidity_2m?.[0] ?? 32,
            windSpeed: Math.round(makkahJson.current_weather?.windspeed ?? 14),
            adviceEn: makkahTemp > 35 
              ? 'Hot daytime: Light cotton Ihram, umbrella & hydration recommended.'
              : 'Moderate weather: Ideal for daytime Tawaf and Ibadah.',
            adviceBn: makkahTemp > 35
              ? 'দিনের বেলা সুতি পাতলা ইহরাম, ছাতা ও পর্যাপ্ত পানি পান করুন।'
              : 'অনুকূল আবহাওয়া: তাওয়াফ ও ইবাদতের জন্য বেশ আরামদায়ক।',
            isHot: makkahTemp > 35,
          },
          madinah: {
            cityEn: 'Madinah al-Munawwarah',
            cityBn: 'পবিত্র মদিনা মুনাওয়ারা',
            temp: madinahTemp,
            conditionEn: madinahCond.en,
            conditionBn: madinahCond.bn,
            humidity: madinahJson.hourly?.relativehumidity_2m?.[0] ?? 26,
            windSpeed: Math.round(madinahJson.current_weather?.windspeed ?? 11),
            adviceEn: 'Pleasant evenings: Light shawl suggested for Tahajjud prayer.',
            adviceBn: 'তাহাজ্জুদ ও রওজা জিয়ারতের সময় মৃদু ঠান্ডার জন্য পাতলা চাদর সাথে রাখুন।',
            isHot: madinahTemp > 35,
          },
        });
        setLastUpdated(new Date());
      }
    } catch {
      // Gracefully maintain cached/fallback state without crashing
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const current = weatherData[activeCity];

  return (
    <div className="bg-emerald-50/70 dark:bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 sm:p-4.5 border border-emerald-100 dark:border-slate-800 shadow-sm text-slate-900 dark:text-white transition-all">
      {/* Header with City Toggle Tabs */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-emerald-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-black text-[#064E3B] dark:text-emerald-400 uppercase tracking-wide">
          <CloudSun className="w-4 h-4 text-amber-500" />
          <span>{lang === 'en' ? 'Holy Cities Weather' : 'মক্কা-মদিনা আবহাওয়া'}</span>
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-emerald-200/80 dark:border-slate-700 shadow-xs">
          <button
            onClick={() => setActiveCity('makkah')}
            className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
              activeCity === 'makkah'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Makkah' : 'মক্কা'}
          </button>
          <button
            onClick={() => setActiveCity('madinah')}
            className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
              activeCity === 'madinah'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Madinah' : 'মদিনা'}
          </button>
        </div>
      </div>

      {/* Weather Content Block */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* City Name & Big Temp */}
        <div className="sm:col-span-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-slate-700 flex items-center justify-center text-amber-500 shadow-xs flex-shrink-0">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
              <MapPin className="w-3 h-3 text-[#064E3B] dark:text-emerald-400" />
              <span>{lang === 'en' ? current.cityEn : current.cityBn}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white leading-none">
                {lang === 'bn' ? toBengaliNumber(current.temp) : current.temp}°C
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">
                {lang === 'en' ? current.conditionEn : current.conditionBn}
              </span>
            </div>
          </div>
        </div>

        {/* Flight-Status Style Humidity & Wind Details */}
        <div className="sm:col-span-7 flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-800 text-[11px]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span>{lang === 'en' ? 'Hum:' : 'আর্দ্রতা:'}</span>
              <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                {lang === 'bn' ? toBengaliNumber(current.humidity) : current.humidity}%
              </span>
            </div>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
              <Wind className="w-3.5 h-3.5 text-blue-500" />
              <span>{lang === 'en' ? 'Wind:' : 'বাতাস:'}</span>
              <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                {lang === 'bn' ? toBengaliNumber(current.windSpeed) : current.windSpeed} km/h
              </span>
            </div>
          </div>

          {/* Refresh trigger */}
          <button
            onClick={fetchWeather}
            disabled={loading}
            title={lang === 'en' ? 'Refresh weather' : 'আবহাওয়া আপডেট করুন'}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg transition cursor-pointer flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>

      </div>

      {/* Packing Advice Strip */}
      <div className="mt-2.5 pt-2 border-t border-emerald-100/80 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
        <span className="font-bold text-[#064E3B] dark:text-emerald-400 flex-shrink-0">
          🎒 {lang === 'en' ? 'Pilgrim Advice:' : 'প্রস্তুতি পরামর্শ:'}
        </span>
        <span className="truncate">
          {lang === 'en' ? current.adviceEn : current.adviceBn}
        </span>
      </div>
    </div>
  );
};

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
    <div className="bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-lg text-white">
      {/* Header with City Toggle Tabs */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-700/80">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wide">
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>{lang === 'en' ? 'Holy Cities Live Weather' : 'মক্কা-মদিনা লাইভ আবহাওয়া'}</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveCity('makkah')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              activeCity === 'makkah'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Makkah' : 'মক্কা'}
          </button>
          <button
            onClick={() => setActiveCity('madinah')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              activeCity === 'madinah'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Madinah' : 'মদিনা'}
          </button>
        </div>
      </div>

      {/* Weather Content Block */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: City Name & Big Temp */}
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
            <Sun className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-slate-300 font-semibold justify-center sm:justify-start">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span>{lang === 'en' ? current.cityEn : current.cityBn}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5 justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                {lang === 'bn' ? toBengaliNumber(current.temp) : current.temp}°C
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {lang === 'en' ? current.conditionEn : current.conditionBn}
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Stats (Humidity & Wind) */}
        <div className="flex items-center gap-3 bg-slate-950/70 px-3 py-2 rounded-xl border border-slate-800 text-[11px]">
          <div className="flex items-center gap-1 text-slate-300">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'en' ? 'Humidity:' : 'আর্দ্রতা:'}</span>
            <span className="font-bold text-white font-mono">
              {lang === 'bn' ? toBengaliNumber(current.humidity) : current.humidity}%
            </span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <Wind className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'en' ? 'Wind:' : 'বাতাস:'}</span>
            <span className="font-bold text-white font-mono">
              {lang === 'bn' ? toBengaliNumber(current.windSpeed) : current.windSpeed} km/h
            </span>
          </div>
        </div>

        {/* Right: Packing & Preparation Tip */}
        <div className="text-xs text-slate-300 bg-blue-950/40 border border-blue-900/60 p-2.5 rounded-xl max-w-xs text-left">
          <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-0.5">
            {lang === 'en' ? '🎒 Packing & Safety Advice:' : '🎒 প্রস্তুতি ও পোশাক পরামর্শ:'}
          </div>
          <p className="text-[11px] leading-snug text-slate-200">
            {lang === 'en' ? current.adviceEn : current.adviceBn}
          </p>
        </div>

        {/* Refresh trigger */}
        <button
          onClick={fetchWeather}
          disabled={loading}
          title={lang === 'en' ? 'Refresh weather' : 'আবহাওয়া আপডেট করুন'}
          className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
        </button>

      </div>
    </div>
  );
};

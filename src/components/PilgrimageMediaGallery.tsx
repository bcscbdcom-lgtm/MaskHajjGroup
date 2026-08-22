import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Video, Eye, Info, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Language } from '../types';

export interface RitualMediaItem {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'tawaf' | 'sai' | 'ihram' | 'arafat' | 'jamarat' | 'halq';
  durationSec: number;
  descriptionEn: string;
  descriptionBn: string;
  keyPointersEn: string[];
  keyPointersBn: string[];
}

export const RITUAL_MEDIA_LIST: RitualMediaItem[] = [
  {
    id: 'media-tawaf',
    titleEn: 'Tawaf Ritual: 7 Circuits Around the Ka’bah',
    titleBn: 'তাওয়াফ পদ্ধতি: কাবা শরীফের চারদিকে ৭ চক্কর',
    category: 'tawaf',
    durationSec: 5,
    descriptionEn: 'Start at the Green Light aligning with Hajar al-Aswad. Keep Ka’bah to your left and circle anti-clockwise with devotion.',
    descriptionBn: 'হাজরে আসওয়াদ বরাবর গ্রিন লাইট থেকে শুরু করে কাবাকে বামে রেখে ঘড়ির কাঁটার বিপরীত দিকে ৭ চক্কর তাওয়াফ করুন।',
    keyPointersEn: [
      'Men uncover right shoulder (Idtiba)',
      'First 3 rounds fast paced (Raml)',
      'Pray 2 Rakat at Maqam Ibrahim',
      'Drink refreshing Zamzam water',
    ],
    keyPointersBn: [
      'পুরুষরা ডান কাঁধ খোলা রাখবেন (ইজতিবা)',
      'প্রথম ৩ চক্কর দ্রুত বীরদর্পে পদচারণা (রমল)',
      'মাকামে ইবরাহীমের পেছনে ২ রাকাত নামাজ',
      'তৃপ্তিসহকারে জমজমের পানি পান',
    ],
  },
  {
    id: 'media-sai',
    titleEn: 'Sa’i Ritual: Walking Between Safa & Marwah',
    titleBn: 'সাঈ পদ্ধতি: সাফা ও মারওয়া পাহাড়ে ৭ চক্কর',
    category: 'sai',
    durationSec: 5,
    descriptionEn: 'Commence at Mount Safa and finish at Mount Marwah (total 7 laps). Men jog moderately between the two Green fluorescent markers.',
    descriptionBn: 'সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড়ে মোট ৭ চক্কর শেষ হবে। সবুজ বাতির সীমানায় পুরুষরা মাঝারি গতিতে দৌড়াবেন।',
    keyPointersEn: [
      'Start at Safa (Lap 1) to Marwah',
      'Marwah to Safa is Lap 2',
      'Men brisk jog at Green Lights',
      'Finish 7th lap at Marwah',
    ],
    keyPointersBn: [
      'সাফা থেকে শুরু করে মারওয়ায় ১ম চক্কর',
      'মারওয়া থেকে সাফা ২য় চক্কর',
      'সবুজ লাইটের মাঝখানে পুরুষদের দ্রুত হাঁটা',
      '৭ম চক্কর মারওয়া পাহাড়ে শেষ হবে',
    ],
  },
  {
    id: 'media-arafat',
    titleEn: 'Wuquf Arafat: The Peak Spiritual Standing',
    titleBn: 'উকুফে আরাফাত: হজের মূল রুকন ও পরম প্রার্থনা',
    category: 'arafat',
    durationSec: 5,
    descriptionEn: 'Standing before Allah in deep repentance from Zawal (noon) till sunset at the blessed plain of Arafat.',
    descriptionBn: '৯ই জিলহজ দুপুর থেকে সূর্যাস্ত পর্যন্ত আরাফাতের ময়দানে কান্নাকাটি, ক্ষমা প্রার্থনা ও রোনাজারি।',
    keyPointersEn: [
      'Combine Dhuhr & Asr prayers',
      'Wuquf until complete sunset',
      'Intense personal repentance',
      'Depart directly to Muzdalifah',
    ],
    keyPointersBn: [
      'যোহর ও আসরের নামাজ একত্রীকরণ',
      'সূর্যাস্ত পর্যন্ত দোয়ায় রত থাকা',
      'অশ্রুসজল মোনাজাত ও তওবা',
      'সূর্যাস্তের পর মুজদালিফায় গমণ',
    ],
  },
  {
    id: 'media-jamarat',
    titleEn: 'Rami al-Jamarat: Stoning the Pillars in Mina',
    titleBn: 'রামি আল-জামারাত: মিনায় শয়তানকে পাথর নিক্ষেপ',
    category: 'jamarat',
    durationSec: 5,
    descriptionEn: 'Throwing 7 pea-sized pebbles at each pillar reciting Allahu Akbar with calmness and avoiding reckless shoving.',
    descriptionBn: 'আল্লাহু আকবার বলে জামারাতে ৭টি কঙ্কর নিক্ষেপ। কোনো জুতো বা বড় পাথর নয়, ছোট কঙ্কর ব্যবহার করবেন।',
    keyPointersEn: [
      '10th Dhul Hijjah: Big Jamarat only (7 pebbles)',
      '11th & 12th: All 3 Jamarats (21 pebbles daily)',
      'Maintain calm orderly queue',
      'Recite Allahu Akbar on each throw',
    ],
    keyPointersBn: [
      '১০ই জিলহজ: শুধু বড় জামারাতে ৭টি কঙ্কর',
      '১১ ও ১২ই জিলহজ: ছোট, মেঝ ও বড় তিনটিতেই ৭টি করে',
      'ধাক্কাধাক্কি এড়িয়ে শান্তভাবে নিক্ষেপ',
      'প্রতি নিক্ষেপে "আল্লাহু আকবার" পাঠ',
    ],
  },
];

interface PilgrimageMediaGalleryProps {
  lang: Language;
  activeCategory?: string;
  onSelectStepCategory?: (category: string) => void;
}

export const PilgrimageMediaGallery: React.FC<PilgrimageMediaGalleryProps> = ({
  lang,
  activeCategory,
  onSelectStepCategory,
}) => {
  const [selectedMediaId, setSelectedMediaId] = useState<string>(
    activeCategory ? `media-${activeCategory}` : RITUAL_MEDIA_LIST[0].id
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Sync if parent passes new category
  useEffect(() => {
    if (activeCategory) {
      const match = RITUAL_MEDIA_LIST.find((m) => m.category === activeCategory);
      if (match) {
        setSelectedMediaId(match.id);
        setProgress(0);
      }
    }
  }, [activeCategory]);

  const activeMedia = RITUAL_MEDIA_LIST.find((m) => m.id === selectedMediaId) || RITUAL_MEDIA_LIST[0];

  // 5-second video simulation loop timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // seamless 5-second loop
          }
          return prev + 2 * playbackSpeed;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  return (
    <div className="bg-slate-950 rounded-3xl border border-slate-800 p-4 sm:p-6 text-white shadow-2xl overflow-hidden">
      
      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {lang === 'en' ? 'Pilgrimage Educational Media Gallery' : 'পবিত্র হজ-ওমরাহ শিক্ষামূলক ভিজ্যুয়াল মিডিয়া'}
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                Veo AI Looping Engine
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {lang === 'en' ? '5-Second high-fidelity motion guides for core rites' : 'হজের প্রধান আমলসমূহের ৫ সেকেন্ডের লুপ মোশন গাইড'}
            </span>
          </div>
        </div>

        {/* Media Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {RITUAL_MEDIA_LIST.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMediaId(m.id);
                setProgress(0);
                setIsPlaying(true);
                if (onSelectStepCategory) onSelectStepCategory(m.category);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                m.id === selectedMediaId
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {m.category === 'tawaf' && '🕋 Tawaf'}
              {m.category === 'sai' && '⛰️ Sa’i'}
              {m.category === 'arafat' && '🤲 Arafat'}
              {m.category === 'jamarat' && '🎯 Jamarat'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Animation / Video Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Visual Animation Player Frame */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden aspect-video flex flex-col justify-between p-4 shadow-inner">
          
          {/* Animated Background Visual Simulation based on category */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            
            {/* 1. Tawaf Animation */}
            {activeMedia.category === 'tawaf' && (
              <div className="relative w-56 h-56 flex items-center justify-center">
                {/* Kaaba Center */}
                <div className="w-16 h-16 bg-slate-950 border-2 border-amber-400 rounded-md shadow-2xl relative flex items-center justify-center z-10">
                  <div className="w-full h-2.5 bg-amber-400 absolute top-2"></div>
                  <span className="text-[10px] font-bold text-amber-300 font-mono">KA'BAH</span>
                </div>

                {/* Circular orbits with moving pilgrim dots */}
                <div
                  className="absolute w-44 h-44 rounded-full border border-dashed border-blue-500/50 flex items-center justify-center"
                  style={{
                    transform: `rotate(-${(progress / 100) * 360}deg)`,
                    transition: isPlaying ? 'none' : 'transform 0.2s',
                  }}
                >
                  <div className="w-3.5 h-3.5 bg-amber-400 rounded-full shadow-lg absolute -top-1.5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg absolute -bottom-1"></div>
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg absolute -left-1"></div>
                </div>

                {/* Outer Orbit */}
                <div
                  className="absolute w-56 h-56 rounded-full border border-slate-700/60"
                  style={{
                    transform: `rotate(-${(progress / 100) * 240}deg)`,
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full shadow absolute top-2 right-6"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full shadow absolute bottom-2 left-6"></div>
                </div>

                {/* Hajar al Aswad Green Line indicator */}
                <div className="absolute top-1/2 left-0 w-20 h-0.5 bg-emerald-500/80 shadow-[0_0_10px_#10b981]"></div>
                <span className="absolute bottom-1 right-2 text-[9px] text-emerald-400 font-mono font-bold bg-slate-950/80 px-1.5 py-0.5 rounded">
                  🟢 Green Light Align
                </span>
              </div>
            )}

            {/* 2. Sa'i Animation */}
            {activeMedia.category === 'sai' && (
              <div className="w-full px-8 relative flex flex-col justify-center gap-4">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <div className="bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-lg text-amber-300 text-[10px]">
                    ⛰️ Mount Safa (Start)
                  </div>
                  <div className="bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-lg text-emerald-300 text-[10px]">
                    ⛰️ Mount Marwah (Finish)
                  </div>
                </div>

                {/* Sa'i Pathway track */}
                <div className="w-full h-8 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center px-4 overflow-hidden">
                  {/* Green light section */}
                  <div className="absolute left-[35%] right-[35%] inset-y-0 bg-emerald-500/20 border-x border-emerald-400 flex items-center justify-center">
                    <span className="text-[8px] text-emerald-300 font-mono uppercase font-bold">⚡ Jogging Zone</span>
                  </div>

                  {/* Pilgrim moving dot */}
                  <div
                    className="w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-lg absolute flex items-center justify-center transition-all"
                    style={{
                      left: `${Math.min(92, Math.max(3, (progress <= 50 ? progress * 1.8 : (100 - progress) * 1.8)))}%`,
                    }}
                  >
                    <span className="text-[9px]">🚶</span>
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-400 font-mono">
                  {progress <= 50 ? 'Laps 1, 3, 5, 7: Safa ➔ Marwah' : 'Laps 2, 4, 6: Marwah ➔ Safa'}
                </div>
              </div>
            )}

            {/* 3. Arafat Animation */}
            {activeMedia.category === 'arafat' && (
              <div className="relative flex flex-col items-center justify-center gap-3">
                <div className="relative w-32 h-20 bg-gradient-to-t from-amber-900/40 to-amber-600/20 rounded-t-full border-t border-x border-amber-500/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-300">Jabal al-Rahmah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">🤲</span>
                  <div className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-500/40">
                    Dua & Divine Forgiveness
                  </div>
                </div>
                <div className="w-48 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-blue-500 rounded-full"></div>
              </div>
            )}

            {/* 4. Jamarat Animation */}
            {activeMedia.category === 'jamarat' && (
              <div className="relative flex items-center justify-center gap-8">
                <div className="relative flex flex-col items-center">
                  <div className="w-6 h-24 bg-slate-800 border border-slate-600 rounded-t-lg shadow-lg flex items-center justify-center">
                    <span className="text-[8px] -rotate-90 font-mono text-slate-300">PILLAR</span>
                  </div>
                  <div className="w-16 h-3 bg-amber-500/20 rounded-full border border-amber-500/40 mt-1"></div>
                </div>

                {/* Animated Pebbles flying */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-amber-300">
                    <span className="text-xs">🪨</span>
                    <span>7 Small Pebbles</span>
                  </div>
                  <div className="text-[9px] text-slate-400">
                    Recite: <strong>"Bismillahi Allahu Akbar"</strong>
                  </div>
                  <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all"
                      style={{ width: `${(progress % 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Top Frame Meta */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-amber-300 border border-white/10">
              {activeMedia.category.toUpperCase()} • 00:0{Math.floor((progress / 100) * 5)} / 00:05
            </span>
            <span className="bg-red-600/80 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest animate-pulse">
              LIVE LOOP
            </span>
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="relative z-10 bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>

              <button
                onClick={() => setProgress(0)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Scrubber */}
            <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden relative cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Speed Toggle */}
            <button
              onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
              className="text-[10px] font-mono font-bold bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition cursor-pointer"
            >
              {playbackSpeed}x
            </button>
          </div>

        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              {lang === 'en' ? 'Ritual Summary' : 'আমলের সারসংক্ষেপ'}
            </div>
            <h4 className="text-base font-extrabold text-white leading-snug">
              {lang === 'en' ? activeMedia.titleEn : activeMedia.titleBn}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'en' ? activeMedia.descriptionEn : activeMedia.descriptionBn}
            </p>
          </div>

          {/* Key Pointers */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              {lang === 'en' ? 'Essential Execution Checkpoints:' : 'জরুরি পালনীয় পয়েন্টসমূহ:'}
            </div>
            <div className="space-y-1.5">
              {(lang === 'en' ? activeMedia.keyPointersEn : activeMedia.keyPointersBn).map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  ShieldCheck,
  Send,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Building2,
  Clock,
  Sparkles,
  FileText,
  UserCheck,
  ChevronRight,
  HelpCircle,
  Calendar
} from 'lucide-react';
import { Language } from '../types';
import { agencyLeadershipData } from '../data/leadership';
import { toBengaliNumber } from '../utils/dateFormatter';

interface AskScholarModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTemplateIndex?: number;
}

export const AskScholarModal: React.FC<AskScholarModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTemplateIndex
}) => {
  const scholars = agencyLeadershipData.filter(
    (m) => m.id === 'khalilur-rahman' || m.id === 'mufti-mahmud' || m.id === 'farhana-yasmin'
  );

  const templates = [
    {
      id: 'ihram-meeqat',
      titleEn: 'Ihram & Meeqat from Flight',
      titleBn: 'ফ্লাইটে ইহরাম ও নিয়তের বিধান',
      icon: '✈️',
      templateEn:
        'Assalamu Alaikum. I would like to clarify the exact rulings and procedure for entering Ihram when flying transit via Jeddah/Madinah, and what to do if we cross Meeqat before changing clothes.',
      templateBn:
        'আসসালামু আলাইকুম। ঢাকা থেকে ট্রানজিট ফ্লাইটে জেদ্দা বা মদিনা যাওয়ার সময় বিমানে ঠিক কখন কীভাবে ইহরাম বাঁধতে ও নিয়ত করতে হবে এবং ভুলবশত মীকাত অতিক্রমের শরিয়াহ বিধান জানতে চাচ্ছি।'
    },
    {
      id: 'dam-penalty',
      titleEn: 'Dam / Penalty & Missed Wajib',
      titleBn: 'দম / কাফফারা ও ওয়াজিবের বিধান',
      icon: '⚖️',
      templateEn:
        'Assalamu Alaikum Respected Mufti. If a pilgrim inadvertently misses a Wajib step (such as Rami at Jamarat, delaying Tawaf al-Ifadah, or improper Halq/Qasr), what is the exact Dam / Fidya ruling?',
      templateBn:
        'আসসালামু আলাইকুম সম্মানিত মুফতি সাহেব। হজের কোনো ওয়াজিব রোকন (যেমন: জামারাতে কঙ্কর নিক্ষেপ, তাওয়াফে ইফাদাহ বিলম্ব বা চুল ছাঁটার নিয়ম) ব্যাহত হলে দমের বিধান ও কাফফারা আদায়ের সঠিক নিয়ম জানতে চাই।'
    },
    {
      id: 'elderly-wheelchair',
      titleEn: 'Elderly Wheelchair & Proxy',
      titleBn: 'প্রবীণদের হুইলচেয়ার ও বদলি বিধান',
      icon: '🦽',
      templateEn:
        'Assalamu Alaikum. My elderly parent has severe knee pain and mobility limitations. Can someone perform Rami (stoning) or Sa’i on their behalf, and what are the specific conditions for proxy?',
      templateBn:
        'আসসালামু আলাইকুম। আমার বয়োবৃদ্ধ পিতা/মাতা বার্ধক্যজনিত অসুস্থতার কারণে পায়ে হেঁটে তাওয়াফ, সাঈ বা কঙ্কর নিক্ষেপে অপারগ হলে হুইলচেয়ার ব্যবহার বা বদলি করানোর শর্তসমূহ জানতে আগ্রহী।'
    },
    {
      id: 'women-rulings',
      titleEn: 'Women-Specific Rulings',
      titleBn: 'মহিলা হাজীদের বিশেষ মাসায়েল',
      icon: '🧕',
      templateEn:
        'Assalamu Alaikum Scholar. I seek guidance on female specific rulings during Hajj: travelling with Mahram, and the correct Fiqh procedure if personal cycle coincides with Tawaf al-Ziyarah.',
      templateBn:
        'আসসালামু আলাইকুম। নারী হাজীদের জন্য মাহরাম সংক্রান্ত নীতিমালা এবং সফরকালে বিশেষ স্বাস্থ্যগত দিনগুলোতে তাওয়াফে জিয়ারতের ক্ষেত্রে শরিয়াহসম্মত ফতোয়া ও দিকনির্দেশনা জানতে চাই।'
    },
    {
      id: 'qurbani-timing',
      titleEn: 'Qurbani & Halq Timings',
      titleBn: 'কুরবানী নিশ্চিতকরণ ও হালাল হওয়া',
      icon: '🐑',
      templateEn:
        'Assalamu Alaikum. How is the official IDB Qurbani confirmed before taking off Ihram (Halq/Taqseer) on the 10th of Dhul Hijjah to avoid breaking sequence?',
      templateBn:
        'আসসালামু আলাইকুম। ১০ই জিলহজ সৌদি ব্যাংক বা আইডিবি ব্যাংকের মাধ্যমে কুরবানী সম্পন্ন হওয়ার সঠিক সময় নিশ্চিত হয়ে মাথা মুণ্ডন (হলক) বা হালাল হওয়ার ধারাবাহিকতা কীভাবে নিশ্চিত করা হবে?'
    },
    {
      id: 'custom',
      titleEn: 'Custom Religious Inquiry',
      titleBn: 'ব্যক্তিগত নিজস্ব মাসআলা',
      icon: '✍️',
      templateEn: '',
      templateBn: ''
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [selectedScholarId, setSelectedScholarId] = useState<string>('khalilur-rahman');
  const [questionText, setQuestionText] = useState<string>(templates[0].templateEn);
  const [pilgrimName, setPilgrimName] = useState('');
  const [pilgrimPhone, setPilgrimPhone] = useState('');
  const [pilgrimEmail, setPilgrimEmail] = useState('');
  const [consultationMode, setConsultationMode] = useState<'phone' | 'whatsapp' | 'office'>('phone');
  const [preferredTime, setPreferredTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Handle template switch
  const handleSelectTemplate = (index: number) => {
    setSelectedTemplate(index);
    const tmpl = templates[index];
    if (tmpl.id === 'women-rulings') {
      setSelectedScholarId('farhana-yasmin');
    } else if (tmpl.id === 'dam-penalty') {
      setSelectedScholarId('mufti-mahmud');
    }
    setQuestionText(lang === 'en' ? tmpl.templateEn : tmpl.templateBn);
  };

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      const initialIdx = typeof initialTemplateIndex === 'number' ? initialTemplateIndex : 0;
      setSelectedTemplate(initialIdx);
      const tmpl = templates[initialIdx] || templates[0];
      setQuestionText(lang === 'en' ? tmpl.templateEn : tmpl.templateBn);
    }
  }, [isOpen, lang, initialTemplateIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !pilgrimName.trim() || !pilgrimPhone.trim()) return;

    setIsSubmitting(true);
    const randomRef = `SCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(randomRef);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const selectedScholar = scholars.find((s) => s.id === selectedScholarId) || scholars[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto"
        >
          {/* Header Gradient */}
          <div className="relative bg-gradient-to-r from-blue-700 via-indigo-750 to-blue-900 text-white p-6 sm:p-7">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Direct Shariah Council' : 'শরিয়াহ বোর্ড পরামর্শ'}
              </span>
              <span className="text-blue-200 text-xs flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'en' ? 'Verified Fatwa Desk' : 'অনুমোদিত ফতোয়া সেবা'}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold mt-2 tracking-tight">
              {lang === 'en' ? 'Ask a Resident Islamic Scholar' : 'বিজ্ঞ আলেমদের নিকট ধর্মীয় প্রশ্ন ও পরামর্শ'}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-lg">
              {lang === 'en'
                ? 'Select a question template or write your custom inquiry for authentic Quran & Sunnah guidance.'
                : 'নিচের টেমপ্লেট থেকে বেছে নিন অথবা আপনার নির্দিষ্ট মাসআলা লিখে সরাসরি আমাদের বরিষ্ঠ আলেমদের পাঠান।'}
            </p>
          </div>

          <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
            {isSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-700 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Ref: {referenceId}
                  </span>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-3">
                    {lang === 'en' ? 'Question Forwarded to Shariah Team!' : 'আপনার প্রশ্নটি আলেম বোর্ডের নিকট পাঠানো হয়েছে!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                    {lang === 'en'
                      ? `Jazakallahu Khairan, ${pilgrimName}. ${selectedScholar.nameEn} and the advisory desk will contact you at ${pilgrimPhone} via ${consultationMode.toUpperCase()} within 2 to 4 hours.`
                      : `জাযাকাল্লাহু খাইরান, ${pilgrimName}। ${selectedScholar.nameBn} ও আমাদের আলেম টিম আপনার প্রশ্নের শরিয়াহ ফতোয়া প্রস্তুত করে ${pilgrimPhone} নম্বরে দ্রুত যোগাযোগ করবেন।`}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{lang === 'en' ? 'Assigned Scholar:' : 'দায়িত্বপ্রাপ্ত আলেম:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{lang === 'en' ? selectedScholar.nameEn : selectedScholar.nameBn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{lang === 'en' ? 'Consultation Mode:' : 'পরামর্শের মাধ্যম:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{consultationMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{lang === 'en' ? 'Preferred Slot:' : 'সুবিধাজনক সময়:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{preferredTime}</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/8801711258708?text=${encodeURIComponent(
                      `Assalamu Alaikum. I submitted an inquiry (Ref: ${referenceId}) for ${selectedScholar.nameEn}: "${questionText.substring(0, 100)}..."`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Send via WhatsApp Now' : 'সরাসরি হোয়াটসঅ্যাপে বার্তা পাঠান'}</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
                  >
                    {lang === 'en' ? 'Done & Close' : 'সম্পন্ন ও বন্ধ করুন'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Step 1: Pre-Populated Question Templates */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{lang === 'en' ? '1. Choose a Question Template (or start blank):' : '১. প্রশ্নের টেমপ্লেট নির্বাচন করুন (বা নতুন লিখুন):'}</span>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {templates.map((tmpl, idx) => {
                      const isSelected = selectedTemplate === idx;
                      return (
                        <button
                          key={tmpl.id}
                          type="button"
                          onClick={() => handleSelectTemplate(idx)}
                          className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-600 ring-2 ring-blue-600/20 text-blue-700 dark:text-blue-300'
                              : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="text-base">{tmpl.icon}</span>
                          <span className="text-xs font-bold truncate">
                            {lang === 'en' ? tmpl.titleEn : tmpl.titleBn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Question Editor */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    {lang === 'en' ? '2. Question / Masail Details (Editable): *' : '২. প্রশ্নের বিস্তারিত বিবরণ (সম্পাদনাযোগ্য): *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'Write your detailed Hajj/Umrah question here...'
                        : 'আপনার হজ বা ওমরাহর বিস্তারিত প্রশ্নটি এখানে লিখুন...'
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 focus:outline-none transition leading-relaxed"
                  />
                </div>

                {/* Step 3: Scholar Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {lang === 'en' ? '3. Select Designated Resident Scholar:' : '৩. পরামর্শক আলেম নির্বাচন করুন:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {scholars.map((scholar) => {
                      const isSelected = selectedScholarId === scholar.id;
                      return (
                        <div
                          key={scholar.id}
                          onClick={() => setSelectedScholarId(scholar.id)}
                          className={`p-3 rounded-2xl border transition flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/90 dark:bg-blue-950/70 border-blue-600 ring-2 ring-blue-600/20'
                              : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={scholar.image}
                            alt={scholar.nameEn}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                              {lang === 'en' ? scholar.nameEn : scholar.nameBn}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {lang === 'en' ? scholar.roleEn : scholar.roleBn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Contact details and Preferred Consultation Mode */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'en' ? 'Your Full Name *' : 'আপনার পূর্ণ নাম *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={pilgrimName}
                        onChange={(e) => setPilgrimName(e.target.value)}
                        placeholder={lang === 'en' ? 'e.g. Al-Haj Mohammad Tariq' : 'যেমন: মো. তারিক হাসান'}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'en' ? 'Phone / WhatsApp Number *' : 'ফোন / হোয়াটসঅ্যাপ নম্বর *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={pilgrimPhone}
                        onChange={(e) => setPilgrimPhone(e.target.value)}
                        placeholder="017XX-XXXXXX"
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Preferred Response Mode */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'en' ? 'Preferred Response Mode:' : 'পরামর্শ গ্রহণের মাধ্যম:'}
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: 'phone', labelEn: 'Call', labelBn: 'কল', icon: PhoneCall },
                          { id: 'whatsapp', labelEn: 'WhatsApp', labelBn: 'হোয়াটসঅ্যাপ', icon: MessageCircle },
                          { id: 'office', labelEn: 'Office', labelBn: 'অফিস', icon: Building2 },
                        ].map((mode) => {
                          const IconComp = mode.icon;
                          const isSelected = consultationMode === mode.id;
                          return (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setConsultationMode(mode.id as any)}
                              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <IconComp className="w-3 h-3" />
                              <span>{lang === 'en' ? mode.labelEn : mode.labelBn}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred Time Slot */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'en' ? 'Preferred Calling Slot:' : 'পছন্দনীয় সময়:'}
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: 'morning', labelEn: '10am-1pm', labelBn: 'সকাল ১০-১' },
                          { id: 'afternoon', labelEn: '2pm-5pm', labelBn: 'দুপুর ২-৫' },
                          { id: 'evening', labelEn: '6pm-9pm', labelBn: 'সন্ধ্যা ৬-৯' },
                        ].map((slot) => {
                          const isSelected = preferredTime === slot.id;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => setPreferredTime(slot.id as any)}
                              className={`flex-1 py-1.5 px-1.5 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <span>{lang === 'en' ? slot.labelEn : slot.labelBn}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{lang === 'en' ? 'Submitting to Scholar Desk...' : 'আলেম বোর্ডে পাঠানো হচ্ছে...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          {lang === 'en'
                            ? `Submit Question to ${selectedScholar.nameEn}`
                            : `${selectedScholar.nameBn}-এর নিকট প্রশ্ন পাঠান`}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                    {lang === 'en'
                      ? '100% Confidential & Direct Shariah Consultation without agency intermediary charges.'
                      : 'সম্পূর্ণ গোপনীয়তা বজায় রেখে সহীহ হাদিস ও ফিকাহ মোতাবেক কোনো মধ্যস্বত্বভোগী ছাড়া সমাধান।'}
                  </p>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

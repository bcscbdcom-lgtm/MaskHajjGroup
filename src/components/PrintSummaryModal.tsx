import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  CheckCircle2,
  FileText,
  Download,
  Sparkles,
  Building2,
  Phone,
  ShieldCheck,
  MapPin,
  Plane,
  Hotel,
  Clock,
  Calendar,
  DollarSign,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { Language, PackageItem, FAQItem } from '../types';
import { hajjPackages } from '../data/hajjPackages';
import { umrahPackages } from '../data/umrahPackages';
import { faqsData } from '../data/faqs';
import { toBengaliNumber } from '../utils/dateFormatter';

interface PrintSummaryModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: PackageItem | null;
  plannerData?: any;
  initialTab?: PrintTab;
  customFaqs?: FAQItem[];
}

type PrintTab = 'selectedPkg' | 'full' | 'packages' | 'planner' | 'checklist' | 'faqs';

export const PrintSummaryModal: React.FC<PrintSummaryModalProps> = ({
  lang,
  isOpen,
  onClose,
  selectedPackage,
  plannerData,
  initialTab,
  customFaqs,
}) => {
  const [printSection, setPrintSection] = useState<PrintTab>(
    initialTab || (selectedPackage ? 'selectedPkg' : 'full')
  );
  const [includeLicence, setIncludeLicence] = useState(true);
  const [includeHotline, setIncludeHotline] = useState(true);
  const [includeDuaTips, setIncludeDuaTips] = useState(true);

  // If initialTab or selected package changes, update tab
  useEffect(() => {
    if (initialTab) {
      setPrintSection(initialTab);
    } else if (selectedPackage) {
      setPrintSection('selectedPkg');
    }
  }, [initialTab, selectedPackage, isOpen]);

  if (!isOpen) return null;

  const handlePrintNow = () => {
    window.print();
  };

  const displayedFaqs = customFaqs && customFaqs.length > 0 ? customFaqs : faqsData;

  const tabs: { id: PrintTab; labelEn: string; labelBn: string; show: boolean }[] = [
    {
      id: 'selectedPkg',
      labelEn: selectedPackage ? `Package: ${selectedPackage.nameEn}` : 'Selected Package',
      labelBn: selectedPackage ? `প্যাকেজ: ${selectedPackage.nameBn}` : 'নির্বাচিত প্যাকেজ',
      show: !!selectedPackage,
    },
    { id: 'faqs', labelEn: 'FAQ & Shariah Guide', labelBn: 'প্রশ্নোত্তর ও শরিয়াহ নির্দেশিকা', show: true },
    { id: 'full', labelEn: 'Complete Brochure', labelBn: 'সম্পূর্ণ ব্রোশিউর', show: true },
    { id: 'packages', labelEn: 'Package Pricing Matrix', labelBn: 'প্যাকেজ মূল্যতালিকা', show: true },
    { id: 'planner', labelEn: '5-Day Hajj Itinerary', labelBn: 'দৈনিক সফরসূচি', show: true },
    { id: 'checklist', labelEn: 'Packing Checklist', labelBn: 'প্রস্তুতি চেকলিস্ট', show: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-backdrop-fade">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white animate-modal-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center flex-shrink-0">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? 'Printable Pilgrim Summary & PDF Document View' : 'প্রিন্ট সামারি ও অফিসিয়াল PDF ডকুমেন্ট ভিউ'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'en'
                ? 'Review and customize your high-resolution printable guide before opening the system print dialog or saving to PDF.'
                : 'প্রিন্ট করার পূর্বে আপনার প্রয়োজনীয় অংশ বেছে নিন এবং সুন্দর A4 ফরম্যাটে প্রিন্ট বা PDF হিসেবে সংরক্ষণ করুন।'}
            </p>
          </div>
        </div>

        {/* Section Selector Pills */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {lang === 'en' ? '1. Select Document Template to Print / Export:' : '১. কি প্রিন্ট বা PDF করতে চান নির্বাচন করুন:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {tabs
              .filter((t) => t.show)
              .map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPrintSection(tab.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                    printSection === tab.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-200 ring-2 ring-blue-600/10'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {lang === 'en' ? tab.labelEn : tab.labelBn}
                </button>
              ))}
          </div>
        </div>

        {/* Print Customization Toggles */}
        <div className="mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            {lang === 'en' ? '2. Custom Header & Footer Options:' : '২. প্রিন্ট পেজ কাস্টমাইজেশন:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLicence}
                onChange={(e) => setIncludeLicence(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span>{lang === 'en' ? 'Ministry Licence 15630' : 'সরকারি লাইসেন্স ১৫৬৩০'}</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHotline}
                onChange={(e) => setIncludeHotline(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span>{lang === 'en' ? 'Emergency 24/7 Hotlines' : 'জরুরি হটলাইন নম্বর'}</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDuaTips}
                onChange={(e) => setIncludeDuaTips(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span>{lang === 'en' ? 'Scholar Advice & Duas' : 'আলেমদের নির্দেশিকা'}</span>
            </label>
          </div>
        </div>

        {/* Live A4 Sheet Preview Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'en' ? '3. A4 Document Live Preview:' : '৩. ডকুমেন্টের লাইভ প্রিভিউ:'}
            </span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              {lang === 'en' ? 'Formatted for A4 Standard Print' : 'A4 পেজের সাথে সুসংগত'}
            </span>
          </div>

          <div className="bg-white text-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-5 sm:p-7 shadow-inner max-h-80 overflow-y-auto text-xs space-y-4 font-sans">
            {/* Header of Printable Sheet */}
            <div className="flex items-start justify-between border-b pb-3 border-slate-200">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  MASK HAJJ GROUP • মাস্ক হজ গ্রুপ
                </h3>
                {includeLicence && (
                  <p className="text-[11px] text-slate-600 font-medium">
                    Ministry of Religious Affairs Approved Licence No: 15630 • HAAB & ATAB Member
                  </p>
                )}
                {includeHotline && (
                  <p className="text-[10px] text-slate-500">
                    67/1 Naya Paltan, Dhaka-1000 • Hotline: +88 01711-258708 • Web: maskhajjbd.com
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Selected Package Dedicated View */}
            {printSection === 'selectedPkg' && selectedPackage && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-sm font-black text-blue-900">
                      {lang === 'en' ? selectedPackage.nameEn : selectedPackage.nameBn}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      {lang === 'en' ? selectedPackage.durationEn : selectedPackage.durationBn} •{' '}
                      {lang === 'en' ? selectedPackage.badgeEn : selectedPackage.badgeBn}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-blue-800">
                      {lang === 'en' ? selectedPackage.priceEn : selectedPackage.priceBn}
                    </span>
                    <span className="block text-[9px] text-slate-400">per person (জনপ্রতি)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div>
                    <strong>Makkah Hotel:</strong>{' '}
                    {lang === 'en' ? selectedPackage.hotelMakkahEn : selectedPackage.hotelMakkahBn} (
                    {lang === 'en' ? selectedPackage.distanceMakkahEn : selectedPackage.distanceMakkahBn})
                  </div>
                  <div>
                    <strong>Madinah Hotel:</strong>{' '}
                    {lang === 'en' ? selectedPackage.hotelMadinahEn : selectedPackage.hotelMadinahBn}
                  </div>
                  <div>
                    <strong>Airlines:</strong>{' '}
                    {lang === 'en' ? selectedPackage.airlinesEn : selectedPackage.airlinesBn}
                  </div>
                  <div>
                    <strong>Availability:</strong>{' '}
                    {lang === 'en'
                      ? selectedPackage.availabilityBadgeEn || 'Open'
                      : selectedPackage.availabilityBadgeBn || 'উন্মুক্ত'}
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-[11px] text-slate-800 uppercase mb-1">
                    {lang === 'en' ? 'Package Inclusions:' : 'প্যাকেজে যা যা অন্তর্ভুক্ত:'}
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-slate-700">
                    {(lang === 'en' ? selectedPackage.inclusionsEn : selectedPackage.inclusionsBn).map(
                      (inc, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span>{inc}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="text-[10px] bg-amber-50 p-2 rounded border border-amber-200 text-amber-900">
                  <strong>{lang === 'en' ? 'Booking Instructions:' : 'বুকিং নির্দেশনা:'}</strong>{' '}
                  {lang === 'en'
                    ? 'To confirm your seat, please visit our Dhaka office with your original passport (6 months validity) or register online at maskhajjbd.com.'
                    : 'আসন নিশ্চিত করতে মূল পাসপোর্ট সহ আমাদের ঢাকা অফিসে যোগাযোগ করুন অথবা অনলাইনে নিবন্ধন সম্পন্ন করুন।'}
                </div>
              </div>
            )}

            {/* FAQs & Shariah Guide Dedicated View */}
            {printSection === 'faqs' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="text-sm font-black text-blue-900">
                      {lang === 'en' ? 'Official Hajj & Umrah FAQs, Rules & Policies' : 'পবিত্র হজ ও ওমরাহ প্রশ্নোত্তর, বিধিবিধান ও নীতিমালা'}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      {lang === 'en'
                        ? `Verified by Shariah Board • ${displayedFaqs.length} Selected Topics`
                        : `শরিয়াহ বোর্ড ও ধর্ম মন্ত্রণালয় সত্যায়িত নির্দেশিকা • ${toBengaliNumber(displayedFaqs.length)}টি নির্বাচিত বিষয়`}
                    </p>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                    {lang === 'en' ? 'Official Reference' : 'অফিসিয়াল রেফারেন্স'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {displayedFaqs.map((faq, idx) => (
                    <div key={faq.id || idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-slate-900 flex items-start gap-1">
                          <span className="text-blue-600 font-black">[{idx + 1}]</span>
                          <span>{lang === 'en' ? faq.questionEn : faq.questionBn}</span>
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded capitalize flex-shrink-0">
                          {faq.category}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-3 border-l-2 border-blue-400">
                        {lang === 'en' ? faq.answerEn : faq.answerBn}
                      </p>
                      {faq.tags && faq.tags.length > 0 && (
                        <div className="text-[9px] text-slate-400 pl-3">
                          Tags: {faq.tags.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-[10px] bg-emerald-50 p-2 rounded border border-emerald-200 text-emerald-900">
                  <strong>{lang === 'en' ? 'Shariah Advisory Desk:' : 'শরিয়াহ বোর্ডের পরামর্শ:'}</strong>{' '}
                  {lang === 'en'
                    ? 'For individual complex health/Dam rulings or women-specific pilgrimage questions, consult our scholars directly at +88 01711-258708.'
                    : 'জটিল স্বাস্থ্যগত কারণ, দম বা কাফফারা ও মহিলাদের বিশেষ মাসআলার ক্ষেত্রে সরাসরি বিজ্ঞ আলেমদের সাথে যোগাযোগ করুন (+৮৮ ০১৭১১-২৫৮৭০৮)।'}
                </div>
              </div>
            )}

            {/* Full Brochure View */}
            {printSection === 'full' && (
              <div className="space-y-3">
                <div className="font-bold text-sm text-blue-900">
                  {lang === 'en' ? 'Official Hajj & Umrah 2026–2027 Summary' : 'পবিত্র হজ ও ওমরাহ ২০২৬–২৭ প্যাকেজ ও নির্দেশিকা'}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {lang === 'en'
                    ? 'MASK Hajj Group provides end-to-end guidance with licensed Makkah & Madinah accommodations, 5-Star Rawaf Mina tents, direct Biman/Saudia flights, and scholar guidance.'
                    : 'ধর্ম বিষয়ক মন্ত্রণালয় অনুমোদিত লাইসেন্স ১৫৬৩০ এর অধীনে সাশ্রয়ী ও ভিআইপি হজ-ওমরাহ প্যাকেজ, সরাসরি ফ্লাইট ও বিজ্ঞ আলেমদের তত্ত্বাবধান।'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div><strong>Hajj Budget Saver:</strong> ৳ 5,13,648</div>
                  <div><strong>Hajj Economy:</strong> ৳ 5,40,000</div>
                  <div><strong>Hajj Standard ★:</strong> ৳ 6,40,000</div>
                  <div><strong>Hajj VIP Luxury:</strong> ৳ 9,95,000</div>
                </div>
              </div>
            )}

            {/* Packages Pricing Matrix */}
            {printSection === 'packages' && (
              <div className="space-y-2">
                <div className="font-bold text-sm text-blue-900">
                  {lang === 'en' ? 'Hajj 2026–2027 Package Pricing Matrix' : 'হজ ২০২৬–২৭ প্যাকেজ মূল্যতালিকা'}
                </div>
                <table className="w-full text-[11px] border border-slate-200 text-left">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="p-1.5 border-b">Package Name</th>
                      <th className="p-1.5 border-b">Duration</th>
                      <th className="p-1.5 border-b">Makkah Hotel</th>
                      <th className="p-1.5 border-b">Price (BDT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hajjPackages.map((p) => (
                      <tr key={p.id} className="border-b">
                        <td className="p-1.5 font-semibold">{p.nameEn}</td>
                        <td className="p-1.5">{p.durationEn}</td>
                        <td className="p-1.5">{p.hotelMakkahEn}</td>
                        <td className="p-1.5 font-bold text-blue-800">{p.priceEn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 5-Day Planner */}
            {printSection === 'planner' && (
              <div className="space-y-2">
                <div className="font-bold text-sm text-blue-900">
                  {lang === 'en' ? '5 Core Days of Hajj Itinerary Plan' : 'হজের প্রধান ৫ দিনের গুরুত্বপূর্ণ সফরসূচি'}
                </div>
                <ul className="space-y-1.5 text-[11px] list-disc list-inside text-slate-700">
                  <li><strong>8th Dhul Hijjah (Tarwiyah):</strong> Move to Mina in Ihram; pray 5 daily prayers in tents.</li>
                  <li><strong>9th Dhul Hijjah (Arafah & Muzdalifah):</strong> Wuquf at Arafat plain, Dhuhr+Asr combined, sunset departure to Muzdalifah for open sky night & collect 49+ pebbles.</li>
                  <li><strong>10th Dhul Hijjah (Nahr / Eid):</strong> Rami Jamarat al-Aqaba (7 pebbles), Qurbani sacrifice, Halq/Taqsir (First Tahallul), Tawaf al-Ifadah & Sa'i at Ka'bah.</li>
                  <li><strong>11th & 12th Dhul Hijjah (Tashreeq):</strong> Stay in Mina tents, throw 21 pebbles daily after Zawal at Sughra, Wusta & Aqaba.</li>
                  <li><strong>Tawaf al-Wada:</strong> Farewell Tawaf before final departure to Bangladesh.</li>
                </ul>
              </div>
            )}

            {/* Packing Checklist */}
            {printSection === 'checklist' && (
              <div className="space-y-2">
                <div className="font-bold text-sm text-blue-900">
                  {lang === 'en' ? 'Mandatory Pilgrim Packing & Travel Checklist' : 'হজ ও ওমরাহ যাত্রীর অপরিহার্য প্যাকিং চেকলিস্ট'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>✓ Original Passport (min. 6 mo. validity)</div>
                  <div>✓ NID & Govt. Pre-Reg Copy</div>
                  <div>✓ Meningitis & Polio Vaccine Card</div>
                  <div>✓ 2 sets Ihram & Waist Belt</div>
                  <div>✓ Tawaf socks & comfortable sandals</div>
                  <div>✓ 40 days prescribed medicine & doctor slip</div>
                  <div>✓ Unscented soap & vaseline</div>
                  <div>✓ Multi-plug adapter & power bank</div>
                </div>
              </div>
            )}

            {/* Footer Notes */}
            {includeDuaTips && (
              <div className="text-[10px] text-slate-500 border-t pt-2 italic">
                * Note: Prices and hotel allotments subject to Ministry of Religious Affairs (GoB) and Saudi Nusuk platform guidelines.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            {lang === 'en' ? 'Cancel' : 'বাতিল'}
          </button>
          <button
            onClick={handlePrintNow}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'en' ? 'Open Print Dialog / Save as PDF' : 'প্রিন্ট করুন / PDF সংরক্ষণ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

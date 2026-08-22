import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Printer,
  FileDown,
  X,
  Info,
  CheckCircle2,
  BookOpen,
  Award,
  ShieldCheck,
  PhoneCall,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { Language, FAQItem } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

interface FaqPrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  faqs: FAQItem[];
  categoryFilter?: string;
  segmentFilter?: string;
}

export const FaqPrintPreviewModal: React.FC<FaqPrintPreviewModalProps> = ({
  isOpen,
  onClose,
  lang,
  faqs,
  categoryFilter = 'all',
  segmentFilter = 'all'
}) => {
  const [showInstructionsTooltip, setShowInstructionsTooltip] = useState(false);

  if (!isOpen) return null;

  const isEn = lang === 'en';
  const currentDate = new Date().toLocaleDateString(isEn ? 'en-US' : 'bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-backdrop-fade">
      <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden animate-modal-slide-up">
        
        {/* Top Controls Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  {isEn ? 'A4 Print & PDF Document Preview' : 'A4 প্রিন্ট ও PDF ডকুমেন্ট প্রিভিউ'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  A4 (210 × 297 mm)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isEn
                  ? `Formatted for standard A4 paper size • ${faqs.length} Selected FAQ Topics`
                  : `স্ট্যান্ডার্ড A4 কাগজের মাপে বিন্যাসিত • ${toBengaliNumber(faqs.length)}টি নির্বাচিত বিষয়`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Instructions Tooltip Toggle */}
            <div className="relative">
              <button
                type="button"
                id="faq-preview-instructions-btn"
                onClick={() => setShowInstructionsTooltip(!showInstructionsTooltip)}
                onMouseEnter={() => setShowInstructionsTooltip(true)}
                onMouseLeave={() => setShowInstructionsTooltip(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Print Instructions"
              >
                <Info className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">{isEn ? 'Print Instructions' : 'প্রিন্ট নির্দেশিকা'}</span>
              </button>

              {/* Tooltip Popover */}
              <AnimatePresence>
                {showInstructionsTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 bg-slate-800 text-slate-200 text-xs rounded-2xl shadow-xl border border-blue-500/30 z-30 pointer-events-none"
                  >
                    <div className="flex items-start gap-2 font-bold text-blue-300 mb-1">
                      <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" />
                      <span>{isEn ? 'How to Save as PDF:' : 'যেভাবে PDF হিসেবে সেভ করবেন:'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      {isEn
                        ? "In the system print dialog that opens, select 'Save as PDF' from the Destination / Printer dropdown to keep a permanent offline copy on your device."
                        : "সিস্টেম প্রিন্ট উইন্ডো ওপেন হলে Destination / Printer অপশনে গিয়ে 'Save as PDF' সিলেক্ট করুন এবং সেভ বাটনে চাপুন।"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Print / Download Button */}
            <button
              type="button"
              id="faq-preview-print-action-btn"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{isEn ? 'Download PDF / Print' : 'PDF সেভ / প্রিন্ট করুন'}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informative Guidance Banner */}
        <div className="bg-blue-950/40 border-b border-blue-900/50 px-5 py-2.5 flex items-center justify-between text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>
              {isEn
                ? 'Tip: You can choose "Save as PDF" in your browser print prompt to generate a digital file.'
                : 'পরামর্শ: ব্রাউজারের প্রিন্ট ডায়ালগে "Save as PDF" অপশন বেছে নিয়ে ডিজিটাল ফাইল হিসেবে সেভ করুন।'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-blue-300 hidden md:inline">
            A4: 210mm × 297mm
          </span>
        </div>

        {/* Document Viewer Body (Styled specifically as an A4 Paper Document) */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-950/60 flex justify-center items-start">
          
          {/* A4 Realistic Paper Sheet */}
          <div className="faq-a4-preview-sheet w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-2xl border border-slate-300 text-left relative selection:bg-blue-100">
            
            {/* Document Header with Agency Brand & Government License */}
            <div className="border-b-2 border-slate-900 pb-4 mb-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    MASK HAJJ GROUP BANGLADESH
                  </h1>
                  <p className="text-xs font-bold text-slate-700">
                    {isEn
                      ? 'Govt. Approved Hajj & Umrah Agency • Licence No. 15630'
                      : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত হজ ও ওমরাহ এজেন্সি • লাইসেন্স নং ১৫৬৩০'}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    China Town (Level-13), 67/1 Naya Paltan, VIP Road, Dhaka-1000 | Hotline: +88 01711-258708
                  </p>
                </div>

                <div className="text-right sm:text-right border-l-2 sm:border-l-0 pl-3 sm:pl-0 border-blue-600 flex-shrink-0">
                  <span className="inline-block bg-blue-100 text-blue-900 border border-blue-300 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {isEn ? 'Official Shariah Guide' : 'অফিসিয়াল শরিয়াহ নির্দেশিকা'}
                  </span>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">
                    {isEn ? `Generated: ${currentDate}` : `তৈরির তারিখ: ${currentDate}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Document Title & Filter Summary */}
            <div className="bg-slate-100 p-3 rounded-xl mb-5 flex flex-wrap items-center justify-between gap-2 text-xs border border-slate-200">
              <div>
                <strong className="text-slate-900">
                  {isEn ? 'Document Topic:' : 'ডকুমেন্ট বিষয়:'}
                </strong>{' '}
                <span className="text-blue-800 font-bold">
                  {isEn ? 'Frequently Asked Questions & Verified Policies' : 'সাধারণ জিজ্ঞাসা ও নির্ভরযোগ্য দিকনির্দেশনা'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                <span>
                  {isEn ? 'Filter:' : 'ফিল্টার:'} <strong className="capitalize text-slate-800">{categoryFilter}</strong>
                </span>
                <span>•</span>
                <span>
                  {isEn ? 'Scope:' : 'ধরণ:'} <strong className="capitalize text-slate-800">{segmentFilter}</strong>
                </span>
                <span>•</span>
                <span className="text-blue-700 font-bold">
                  {isEn ? `${faqs.length} Topics` : `${toBengaliNumber(faqs.length)}টি বিষয়`}
                </span>
              </div>
            </div>

            {/* FAQ Questions & Answers List */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.id || idx}
                  className="faq-print-item p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 text-xs text-slate-800 page-break-inside-avoid"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="font-bold text-slate-950 flex items-start gap-1.5 text-xs sm:text-sm">
                      <span className="text-blue-700 font-black flex-shrink-0">
                        [{idx + 1}]
                      </span>
                      <span>{isEn ? faq.questionEn : faq.questionBn}</span>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full capitalize flex-shrink-0">
                      {faq.category}
                    </span>
                  </div>

                  <p className="text-slate-700 text-[11px] sm:text-xs leading-relaxed pl-3 border-l-2 border-blue-500 my-1">
                    {isEn ? faq.answerEn : faq.answerBn}
                  </p>

                  {faq.tags && faq.tags.length > 0 && (
                    <div className="text-[9px] text-slate-400 pl-3 pt-0.5">
                      {isEn ? 'Keywords:' : 'কীওয়ার্ড:'} {faq.tags.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Shariah Advisory Seal & Legal Disclaimer */}
            <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-emerald-800 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {isEn
                      ? 'Verified by MASK Shariah Advisory Council & Ministry of Religious Affairs Guidelines'
                      : 'মাস্ক শরিয়াহ কাউন্সিল ও ধর্ম মন্ত্রণালয়ের নীতিমালা অনুযায়ী পরীক্ষিত ও সত্যায়িত'}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-slate-400">Page 1 of 1</span>
              </div>
              <p className="leading-normal">
                {isEn
                  ? 'Disclaimer: Pilgrimage rules are subject to real-time Saudi Ministry of Hajj & Umrah (Nusuk platform) regulatory updates. For emergency queries, call 24/7 hotline +88 01711-258708.'
                  : 'সতর্কতা: সৌদি হজ ও ওমরাহ মন্ত্রণালয় (নুসুক প্ল্যাটফর্ম) এবং বাংলাদেশ সরকারের সর্বশেষ সার্কুলার অনুযায়ী নিয়মাবলী প্রযোজ্য। জরুরি তথ্যের জন্য কল করুনঃ +৮৮ ০১৭১১-২৫৮৭০৮।'}
              </p>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {isEn
              ? 'Ready for high-quality print or PDF export'
              : 'উচ্চমানের প্রিন্ট বা PDF এক্সপোর্টের জন্য প্রস্তুত'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
            >
              {isEn ? 'Close' : 'বন্ধ করুন'}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isEn ? 'Print / Save as PDF' : 'প্রিন্ট / PDF সংরক্ষণ'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

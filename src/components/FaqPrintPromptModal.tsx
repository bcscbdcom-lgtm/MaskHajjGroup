import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Printer,
  BookOpen,
  Eye,
  FileDown,
  Download,
  X,
  CheckCircle2,
  Info,
  ShieldCheck,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

interface FaqPrintPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenSummary: () => void;
  onDirectPrint: () => void;
  totalTopics: number;
  categoryFilter?: string;
  segmentFilter?: string;
}

export const FaqPrintPromptModal: React.FC<FaqPrintPromptModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenSummary,
  onDirectPrint,
  totalTopics,
  categoryFilter = 'all',
  segmentFilter = 'all'
}) => {
  if (!isOpen) return null;

  const isEn = lang === 'en';

  const handleSelectSummary = () => {
    onClose();
    onOpenSummary();
  };

  const handleSelectDirectPrint = () => {
    onClose();
    onDirectPrint();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-backdrop-fade">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
          aria-label="Close Prompt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center flex-shrink-0 shadow-xs">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {isEn ? 'Print FAQ & Guidelines' : 'প্রশ্নোত্তর প্রিন্ট ও প্রিভিউ নির্বাচন'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isEn
                ? 'Choose how you would like to proceed with the document'
                : 'ডকুমেন্টটি কিভাবে দেখতে বা প্রিন্ট করতে চান তা নির্বাচন করুন'}
            </p>
          </div>
        </div>

        {/* Summary Info Pill */}
        <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isEn
                ? `${totalTopics} Verified Questions Selected`
                : `${toBengaliNumber(totalTopics)}টি সত্যায়িত প্রশ্ন নির্বাচিত`}
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 rounded-md">
            Govt. Lic. 15630
          </span>
        </div>

        {/* Action Choices Options */}
        <div className="space-y-3">
          
          {/* Option 1: Open Printable Summary (A4 View) */}
          <button
            type="button"
            id="faq-prompt-summary-choice-btn"
            onClick={handleSelectSummary}
            className="w-full text-left p-4 rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:border-emerald-600 transition shadow-xs hover:shadow-md cursor-pointer group flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {isEn ? 'Open Printable Summary View' : 'প্রিন্টেবল সামারি প্রিভিউ ওপেন করুন'}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
                    {isEn ? 'Recommended' : 'পরামর্শ'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {isEn
                    ? 'Inspect formatted A4 document layout with government license seals, letterhead, and Shariah guidance before printing.'
                    : 'লেটারহেড, লাইসেন্স সিল ও শরিয়াহ রেফারেন্সসহ ফরম্যাটেড A4 পেপার ভিউ দেখে নিয়ে প্রিন্ট করুন।'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition flex-shrink-0 mt-2" />
          </button>

          {/* Option 2: Direct Browser Print Dialog */}
          <button
            type="button"
            id="faq-prompt-direct-print-btn"
            onClick={handleSelectDirectPrint}
            className="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 hover:border-blue-400 dark:hover:border-blue-600 transition shadow-xs hover:shadow-md cursor-pointer group flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {isEn ? 'Proceed Directly to Print / PDF' : 'সরাসরি ব্রাউজারে প্রিন্ট / PDF করুন'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {isEn ? 'Fast' : 'সরাসরি'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {isEn
                    ? 'Immediately open the browser system print dialog where you can print or choose "Save as PDF".'
                    : 'সরাসরি সিস্টেম প্রিন্ট ডায়ালগ ওপেন হবে যেখানে আপনি প্রিন্ট অথবা "Save as PDF" অপশন বেছে নিতে পারবেন।'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition flex-shrink-0 mt-2" />
          </button>

        </div>

        {/* Tip / Guidance Note */}
        <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-800 dark:text-blue-200 text-xs flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            <strong>{isEn ? 'Offline PDF Tip:' : 'অফলাইন PDF টিপ:'}</strong>{' '}
            {isEn
              ? 'To keep a digital copy on your phone or laptop, change the print Destination to "Save as PDF".'
              : 'মোবাইল বা ল্যাপটপে অফলাইন কপি রাখতে প্রিন্টারের Destination মেনু থেকে "Save as PDF" সিলেক্ট করুন।'}
          </p>
        </div>

        {/* Cancel Button */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            {isEn ? 'Cancel' : 'বাতিল'}
          </button>
        </div>

      </motion.div>
    </div>
  );
};

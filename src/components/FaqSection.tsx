import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  MessageSquare,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronsDown,
  ChevronsUp,
  Flame,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  RefreshCw,
  PhoneCall,
  Clock,
  Compass,
  FileQuestion,
  Printer,
  Mail,
  Download,
  Copy,
  Check,
  Eye,
  Info,
  Award,
  UserCheck,
  Star
} from 'lucide-react';
import { Language, FAQItem } from '../types';
import { faqsData } from '../data/faqs';
import { toBengaliNumber } from '../utils/dateFormatter';
import { AskScholarModal } from './AskScholarModal';
import { FaqPrintPreviewModal } from './FaqPrintPreviewModal';
import { FaqPrintPromptModal } from './FaqPrintPromptModal';

interface FaqSectionProps {
  lang: Language;
  onOpenPreReg: (topic?: string) => void;
  onOpenPrintModal?: (tab?: string, faqs?: FAQItem[]) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang, onOpenPreReg, onOpenPrintModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState<'all' | 'hajj' | 'umrah' | 'general'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Track open FAQ IDs (supports multiple/all open items)
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(['faq-prereg']));
  
  // Highlighting specific FAQ when clicked from 'Most Popular' or search auto-suggest
  const [highlightedFaqId, setHighlightedFaqId] = useState<string | null>(null);

  // 'Ask a Scholar' modal state and chosen template
  const [isAskScholarModalOpen, setIsAskScholarModalOpen] = useState(false);
  const [modalInitialTemplateIndex, setModalInitialTemplateIndex] = useState<number>(0);

  // 'Email to Me' modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  // 'Print Preview' A4 Document Modal state
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);

  // 'Print Confirmation Prompt' visual choice modal state
  const [isPrintPromptOpen, setIsPrintPromptOpen] = useState(false);

  // 'Print Instructions' Tooltip state for Print FAQ button
  const [showPrintTooltip, setShowPrintTooltip] = useState(false);

  // 'Download FAQ as PDF' generating loading state
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // 'Was this helpful?' Toast notification state
  const [feedbackToast, setFeedbackToast] = useState<{
    show: boolean;
    messageEn: string;
    messageBn: string;
    type: 'yes' | 'no';
  } | null>(null);

  // Copied FAQ Link ID state
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);

  const handleShareFaq = (e: React.MouseEvent, item: FAQItem, platform: 'copy' | 'whatsapp' | 'email') => {
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const faqUrl = `${origin}${pathname}#faq-item-${item.id}`;
    const title = lang === 'en' ? item.questionEn : item.questionBn;
    const answer = lang === 'en' ? item.answerEn : item.answerBn;

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${title}\n\n${answer}\n\nLink: ${faqUrl}`);
      setCopiedFaqId(item.id);
      setTimeout(() => setCopiedFaqId(null), 2500);
    } else if (platform === 'whatsapp') {
      const text = encodeURIComponent(`*${title}*\n\n${answer}\n\n${faqUrl}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    } else if (platform === 'email') {
      const subject = encodeURIComponent(`FAQ: ${title}`);
      const body = encodeURIComponent(`${title}\n\n${answer}\n\nDirect link: ${faqUrl}`);
      window.open(`mailto:?subject=${subject}&body=${body}`);
    }
  };

  // Search input ref & container ref for outside click handling
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Click / Views tracker per FAQ item with localStorage persistence
  const [clickCounts, setClickCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mask_faq_clicks');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const initial: Record<string, number> = {};
    faqsData.forEach((item) => {
      initial[item.id] = item.initialClicks || 150;
    });
    return initial;
  });

  // 'Was this helpful?' feedback map with localStorage persistence
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'yes' | 'no'>>(() => {
    try {
      const saved = localStorage.getItem('mask_faq_feedback');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Click outside search container to close auto-suggest popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Segments (Tab Switcher: All, Hajj, Umrah, General)
  const segments = useMemo(
    () => [
      { id: 'all', nameEn: 'All Questions', nameBn: 'সকল প্রশ্ন', icon: Compass },
      { id: 'hajj', nameEn: 'Hajj Specific', nameBn: 'পবিত্র হজ', icon: Sparkles },
      { id: 'umrah', nameEn: 'Umrah Specific', nameBn: 'পবিত্র ওমরাহ', icon: BookOpen },
      { id: 'general', nameEn: 'General & Policies', nameBn: 'সাধারণ ও নীতিমালা', icon: ShieldCheck },
    ],
    []
  );

  // Categories config
  const categories = useMemo(
    () => [
      { id: 'all', nameEn: 'All Categories', nameBn: 'সকল ক্যাটাগরি' },
      { id: 'booking', nameEn: 'Booking & Registration', nameBn: 'বুকিং ও প্রাক-নিবন্ধন' },
      { id: 'visa', nameEn: 'Visa & Passports', nameBn: 'ভিসা ও পাসপোর্ট' },
      { id: 'requirements', nameEn: 'Travel & Health', nameBn: 'ভ্রমণ ও স্বাস্থ্যবিধি' },
      { id: 'cost', nameEn: 'Cost & Installments', nameBn: 'খরচ ও সহজ কিস্তি' },
      { id: 'elderly', nameEn: 'Elderly Care & Guidance', nameBn: 'প্রবীণ ও মহিলা সেবা' },
    ],
    []
  );

  // Compute segment count badges
  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqsData.length, hajj: 0, umrah: 0, general: 0 };
    faqsData.forEach((faq) => {
      const seg = faq.segment || 'general';
      if (counts[seg] !== undefined) {
        counts[seg] += 1;
      }
    });
    return counts;
  }, []);

  // Compute category count badges based on active segment
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    faqsData.forEach((faq) => {
      const seg = faq.segment || 'general';
      const matchesSegment = activeSegment === 'all' || seg === activeSegment || seg === 'all';
      if (matchesSegment) {
        counts.all = (counts.all || 0) + 1;
        counts[faq.category] = (counts[faq.category] || 0) + 1;
      }
    });
    return counts;
  }, [activeSegment]);

  // Filtered FAQ items based on Segment, Category, and Query
  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      // 1. Segment filter
      const seg = item.segment || 'general';
      if (activeSegment !== 'all' && seg !== activeSegment && seg !== 'all') {
        return false;
      }

      // 2. Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const qText = `${item.questionEn} ${item.questionBn} ${item.answerEn} ${item.answerBn} ${item.tags?.join(' ') || ''}`.toLowerCase();
        if (!qText.includes(searchQuery.toLowerCase().trim())) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeSegment, activeCategory]);

  // Auto-suggest matches for popup as user types (prioritized by helpfulScore / click count)
  const autoSuggestResults = useMemo(() => {
    if (!searchQuery.trim()) {
      // When focused without query, return top 4 highest rated/clicked items
      return [...faqsData]
        .sort((a, b) => (b.helpfulScore || 95) - (a.helpfulScore || 95))
        .slice(0, 4);
    }
    const q = searchQuery.toLowerCase().trim();
    return faqsData
      .filter((item) => {
        const fullText = `${item.questionEn} ${item.questionBn} ${item.tags?.join(' ') || ''} ${item.category}`.toLowerCase();
        return fullText.includes(q);
      })
      .sort((a, b) => {
        // Prioritize helpful score first, then views
        const scoreA = (a.helpfulScore || 90) * 10 + (clickCounts[a.id] || 0);
        const scoreB = (b.helpfulScore || 90) * 10 + (clickCounts[b.id] || 0);
        return scoreB - scoreA;
      })
      .slice(0, 5);
  }, [searchQuery, clickCounts]);

  // Most popular 3 questions based on click counts
  const popularFaqs = useMemo(() => {
    return [...faqsData]
      .sort((a, b) => (clickCounts[b.id] || 0) - (clickCounts[a.id] || 0))
      .slice(0, 3);
  }, [clickCounts]);

  // Track click count increment
  const handleFaqClick = (id: string) => {
    const updated = {
      ...clickCounts,
      [id]: (clickCounts[id] || 0) + 1,
    };
    setClickCounts(updated);
    try {
      localStorage.setItem('mask_faq_clicks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Toggle single FAQ accordion item
  const toggleAccordion = (id: string) => {
    handleFaqClick(id);
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle Expand All / Collapse All
  const isAllExpanded = useMemo(() => {
    if (filteredFaqs.length === 0) return false;
    return filteredFaqs.every((item) => openIds.has(item.id));
  }, [filteredFaqs, openIds]);

  const handleToggleExpandAll = () => {
    if (isAllExpanded) {
      setOpenIds((prev) => {
        const next = new Set(prev);
        filteredFaqs.forEach((item) => next.delete(item.id));
        return next;
      });
    } else {
      setOpenIds((prev) => {
        const next = new Set(prev);
        filteredFaqs.forEach((item) => next.add(item.id));
        return next;
      });
    }
  };

  // Handle selecting an item from Popular section or Auto-Suggest popup
  const handleSelectFaqItem = (faq: FAQItem) => {
    handleFaqClick(faq.id);
    setOpenIds((prev) => new Set([...prev, faq.id]));
    setHighlightedFaqId(faq.id);
    setIsSearchFocused(false);

    // Sync segment and category if needed
    if (faq.segment && activeSegment !== 'all' && faq.segment !== activeSegment) {
      setActiveSegment('all');
    }
    if (activeCategory !== 'all' && faq.category !== activeCategory) {
      setActiveCategory('all');
    }

    setTimeout(() => {
      const el = document.getElementById(`faq-item-${faq.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    setTimeout(() => {
      setHighlightedFaqId(null);
    }, 2500);
  };

  // Handle feedback rating
  const handleFeedback = (faqId: string, value: 'yes' | 'no') => {
    const updated = { ...feedbackMap, [faqId]: value };
    setFeedbackMap(updated);
    try {
      localStorage.setItem('mask_faq_feedback', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (value === 'yes') {
      setFeedbackToast({
        show: true,
        type: 'yes',
        messageEn: 'Thank you! Your feedback helps us improve our pilgrimage guidance.',
        messageBn: 'ধন্যবাদ! আপনার ইতিবাচক মতামত আমাদের হজ নির্দেশিকা আরও সমৃদ্ধ করতে সহায়তা করবে।'
      });
    } else {
      setFeedbackToast({
        show: true,
        type: 'no',
        messageEn: 'Thank you for your feedback. You can consult our resident scholars for customized clarification.',
        messageBn: 'আপনার মতামতের জন্য ধন্যবাদ। যেকোনো অস্পষ্টতায় আমাদের বিজ্ঞ আলেম বোর্ডের সাথে সরাসরি যোগাযোগ করতে পারেন।'
      });
    }

    setTimeout(() => {
      setFeedbackToast((prev) => (prev ? { ...prev, show: false } : null));
    }, 3800);
  };

  // Open Ask a Scholar Modal with preselected template
  const handleOpenAskScholarModal = (templateIndex = 0) => {
    setModalInitialTemplateIndex(templateIndex);
    setIsAskScholarModalOpen(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveSegment('all');
  };

  // Generate Formatted Text Body for Email / Clipboard
  const generateFaqContent = (items: FAQItem[]) => {
    const isEn = lang === 'en';
    const header = `════════════════════════════════════════════════════════════
MASK HAJJ GROUP (Govt. Approved Licence No. 15630)
China Town (Level-13), 67/1 Naya Paltan, VIP Road, Dhaka-1000
24/7 Hotline: +88 01711-258708 | Web: https://maskhajjbd.com
════════════════════════════════════════════════════════════

${isEn ? 'OFFICIAL HAJJ & UMRAH FAQ & GUIDELINES SUMMARY' : 'পবিত্র হজ ও ওমরাহ প্রশ্নোত্তর ও শরিয়াহ নির্দেশিকা সামারি'}
${isEn ? `Generated for Pilgrim Reference • Date: ${new Date().toLocaleDateString()}` : `হজযাত্রীর রেফারেন্সের জন্য সংগৃহীত • তারিখ: ${new Date().toLocaleDateString()}`}
${isEn ? `Total Questions Included: ${items.length}` : `মোট সংকলিত প্রশ্ন: ${toBengaliNumber(items.length)}টি`}

════════════════════════════════════════════════════════════
${isEn ? 'FREQUENTLY ASKED QUESTIONS & VERIFIED ANSWERS:' : 'সাধারণ প্রশ্নোত্তর ও নির্ভরযোগ্য উত্তর:'}
════════════════════════════════════════════════════════════

${items.map((item, idx) => `[${idx + 1}] ${isEn ? item.questionEn : item.questionBn}
Category: ${item.category.toUpperCase()} | Segment: ${item.segment.toUpperCase()}
Answer:
${isEn ? item.answerEn : item.answerBn}
${item.tags ? `Keywords: ${item.tags.join(', ')}` : ''}
`).join('\n------------------------------------------------------------\n')}

════════════════════════════════════════════════════════════
${isEn ? 'DIRECT SHARIAH CONSULTATION & EMERGENCY HOTLINE:' : 'বিজ্ঞ আলেমদের পরামর্শ ও জরুরি যোগাযোগ:'}
- Hotline: +88 01711-258708 / +88 01713-000000
- Email: maskhajjbd@gmail.com
- Office: Suite 1302, China Town Building, Naya Paltan, Dhaka
════════════════════════════════════════════════════════════`;
    return header;
  };

  const handlePrintFaq = () => {
    setIsPrintPromptOpen(true);
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    // Prepare document formatting and trigger print-to-PDF dialog
    setTimeout(() => {
      setIsGeneratingPdf(false);
      window.print();
    }, 600);
  };

  const handleExportPdf = () => {
    setIsPrintPromptOpen(true);
  };

  const handleOpenEmailDialog = () => {
    setIsEmailModalOpen(true);
    setIsEmailCopied(false);
  };

  const handleTriggerMailto = () => {
    const isEn = lang === 'en';
    const subject = isEn
      ? `MASK Hajj Group - Hajj & Umrah FAQs & Guidelines (${filteredFaqs.length} Topics)`
      : `মাস্ক হজ গ্রুপ - হজ ও ওমরাহ প্রশ্নোত্তর ও নির্দেশিকা (${toBengaliNumber(filteredFaqs.length)}টি বিষয়)`;
    const body = generateFaqContent(filteredFaqs);
    const mailtoUrl = `mailto:${encodeURIComponent(emailRecipient.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyEmailBody = async () => {
    try {
      const body = generateFaqContent(filteredFaqs);
      await navigator.clipboard.writeText(body);
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section id="faqs" className="py-20 bg-sky-50/40 dark:bg-slate-900/60 border-t border-sky-100 dark:border-slate-800 scroll-mt-16 relative">
      
      {/* 1. Modal Component for 'Ask a Scholar' with Pre-populated Templates */}
      <AskScholarModal
        isOpen={isAskScholarModalOpen}
        onClose={() => setIsAskScholarModalOpen(false)}
        lang={lang}
        initialTemplateIndex={modalInitialTemplateIndex}
      />

      {/* 2. Modal Component for 'A4 Print Preview & PDF Document Viewer' */}
      <FaqPrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        lang={lang}
        faqs={filteredFaqs}
        categoryFilter={activeCategory}
        segmentFilter={activeSegment}
      />

      {/* 3. Visual Confirmation Prompt Modal for Print / Summary Choice */}
      <FaqPrintPromptModal
        isOpen={isPrintPromptOpen}
        onClose={() => setIsPrintPromptOpen(false)}
        lang={lang}
        onOpenSummary={() => setIsPrintPreviewOpen(true)}
        onDirectPrint={() => window.print()}
        totalTopics={filteredFaqs.length}
        categoryFilter={activeCategory}
        segmentFilter={activeSegment}
      />

      {/* 4. Modal Component for 'Email to Me' FAQ Package */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-backdrop-fade">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {lang === 'en' ? 'Email FAQs to Yourself' : 'নির্বাচিত প্রশ্নোত্তর ইমেইলে পাঠান'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'en'
                      ? `Pre-formatted summary of ${filteredFaqs.length} selected questions & verified answers`
                      : `${toBengaliNumber(filteredFaqs.length)}টি নির্বাচিত প্রশ্নের সত্যায়িত উত্তরের প্রাক-বিন্যাসিত সামারি`}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label htmlFor="faq-recipient-email-input" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'en' ? 'Your Email Address (Optional):' : 'আপনার ইমেইল ঠিকানা (ঐচ্ছিক):'}
                  </label>
                  <input
                    id="faq-recipient-email-input"
                    type="email"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. pilgrim@example.com' : 'যেমনঃ pilgrim@example.com'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {lang === 'en' ? 'Message Content Preview:' : 'ইমেইল বার্তার প্রিভিউ:'}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {lang === 'en' ? `${filteredFaqs.length} Topics` : `${toBengaliNumber(filteredFaqs.length)}টি বিষয়`}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {generateFaqContent(filteredFaqs).slice(0, 500)}...
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleTriggerMailto}
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Open in Email Client' : 'ইমেইল অ্যাপে ওপেন করুন'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEmailBody}
                    className={`w-full sm:w-auto py-2.5 px-4 rounded-xl border font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                      isEmailCopied
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isEmailCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{lang === 'en' ? 'Copied!' : 'কপি হয়েছে!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Copy Text' : 'টেক্সট কপি করুন'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Toast Notification Component for 'Was this helpful?' feedback */}
      <AnimatePresence>
        {feedbackToast && feedbackToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 flex items-start gap-3"
            role="status"
            aria-live="polite"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                feedbackToast.type === 'yes'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}
            >
              {feedbackToast.type === 'yes' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-slate-100">
                {lang === 'en' ? 'Feedback Recorded' : 'মতামত সংরক্ষিত হয়েছে'}
              </p>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                {lang === 'en' ? feedbackToast.messageEn : feedbackToast.messageBn}
              </p>
            </div>
            <button
              onClick={() => setFeedbackToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Knowledge Base & FAQs' : 'সাধারণ জিজ্ঞাসা ও নির্ভরযোগ্য প্রশ্নোত্তর'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
            {lang === 'en' ? 'Got Questions? We Have Transparent Answers.' : 'হজ ও ওমরাহ সংক্রান্ত স্পষ্ট প্রশ্নোত্তর'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            {lang === 'en'
              ? 'Find verified answers on government licensing, package inclusions, Nusuk visa timelines, health protocols, and elder assistance.'
              : 'সরকারি লাইসেন্স, খরচ ও কিস্তি, নুসুক ভিসা প্রক্রিয়া, স্বাস্থ্যবিধি ও প্রবীণদের যত্ন সংক্রান্ত যাবতীয় সঠিক তথ্য।'}
          </p>

          {/* Header Actions Bar: Print FAQ with Instructions Tooltip, Print Preview, Download as PDF, Email to Me */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            
            {/* 1. Print FAQ Button with 'Print Instructions' Tooltip */}
            <div className="relative inline-flex items-center">
              <button
                id="faq-print-header-btn"
                type="button"
                onClick={handlePrintFaq}
                onMouseEnter={() => setShowPrintTooltip(true)}
                onMouseLeave={() => setShowPrintTooltip(false)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition cursor-pointer group"
                title={lang === 'en' ? 'Print FAQ Summary (Select Save as PDF in destination)' : 'প্রশ্নোত্তর প্রিন্ট বা PDF সেভ করুন'}
              >
                <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span>{lang === 'en' ? 'Print FAQ' : 'প্রশ্নোত্তর প্রিন্ট'}</span>
                
                {/* Information hint badge for Print Instructions */}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPrintTooltip(!showPrintTooltip);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      setShowPrintTooltip(!showPrintTooltip);
                    }
                  }}
                  className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[10px] font-bold hover:bg-blue-200 dark:hover:bg-blue-800 transition ml-0.5"
                  title="Print Instructions"
                >
                  i
                </span>
              </button>

              {/* Print Instructions Tooltip Popover */}
              <AnimatePresence>
                {showPrintTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-3 bg-slate-900 text-white text-xs rounded-2xl shadow-xl border border-blue-500/40 z-30 pointer-events-none text-left"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-blue-300 text-xs mb-1">
                      <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{lang === 'en' ? 'Print Instructions' : 'প্রিন্ট নির্দেশিকা'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      {lang === 'en'
                        ? 'Select "Save as PDF" in the browser print dialog destination to keep an offline digital copy of the FAQs.'
                        : 'প্রিন্ট উইন্ডোর Destination অপশন থেকে "Save as PDF" সিলেক্ট করে অফলাইন ডিজিটাল ফাইল হিসেবে সংরক্ষণ করতে পারেন।'}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. 'Toggle Print Preview' Switch Component */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">
              <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === 'en' ? 'Print Preview' : 'প্রিন্ট প্রিভিউ'}</span>
              </span>
              <button
                id="faq-toggle-print-preview-switch"
                type="button"
                role="switch"
                aria-checked={isPrintPreviewOpen}
                onClick={() => setIsPrintPreviewOpen(!isPrintPreviewOpen)}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isPrintPreviewOpen ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                title={lang === 'en' ? 'Toggle A4 page print preview overlay' : 'A4 পেজ প্রিন্ট প্রিভিউ চালু/বন্ধ করুন'}
              >
                <span className="sr-only">Toggle Print Preview</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isPrintPreviewOpen ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 3. Dedicated 'Download FAQ as PDF' Button with simulated print-to-PDF flow */}
            <button
              id="faq-download-pdf-header-btn"
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition cursor-pointer group disabled:opacity-75 disabled:cursor-not-allowed"
              title={lang === 'en' ? 'Download FAQ list as PDF document' : 'প্রশ্নোত্তর তালিকা PDF হিসেবে ডাউনলোড করুন'}
            >
              {isGeneratingPdf ? (
                <RefreshCw className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              )}
              <span>
                {isGeneratingPdf
                  ? (lang === 'en' ? 'Generating PDF...' : 'PDF প্রস্তুত হচ্ছে...')
                  : (lang === 'en' ? 'Download FAQ as PDF' : 'FAQ PDF ডাউনলোড')}
              </span>
            </button>

            {/* 4. Email to Me Button */}
            <button
              id="faq-email-header-btn"
              type="button"
              onClick={handleOpenEmailDialog}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition cursor-pointer group"
              title={lang === 'en' ? 'Email this FAQ summary to yourself for later review' : 'পরে পড়ার জন্য প্রশ্নোত্তরগুলো নিজের ইমেইলে পাঠান'}
            >
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>{lang === 'en' ? 'Email to Me' : 'ইমেইলে পাঠান'}</span>
            </button>
          </div>
        </div>

        {/* 4. STATISTICS COUNTER BAR (Total Questions Answered & Community Trust Score) */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          
          {/* Stat 1: Total Questions Answered */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 flex items-center gap-3.5 soft-shadow">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {lang === 'en' ? '1,450+' : `${toBengaliNumber('1450')}+`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'en' ? 'Questions Answered' : 'প্রশ্ন সমাধান সম্পন্ন'}
              </p>
            </div>
          </div>

          {/* Stat 2: Community Trust Score */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 flex items-center gap-3.5 soft-shadow">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-100 dark:border-emerald-900">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {lang === 'en' ? '99.2%' : `${toBengaliNumber('99.2')}%`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'en' ? 'Community Trust Score' : 'গ্রাহক সন্তুষ্টি স্কোর'}
              </p>
            </div>
          </div>

          {/* Stat 3: Resident Islamic Scholars */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 flex items-center gap-3.5 soft-shadow">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-100 dark:border-amber-900">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {lang === 'en' ? '3 Scholars' : `${toBengaliNumber('3')} জন আলেম`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'en' ? 'Resident Shariah Board' : 'সার্বক্ষণিক শরিয়াহ বোর্ড'}
              </p>
            </div>
          </div>

          {/* Stat 4: Average Inquiry Response */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 flex items-center gap-3.5 soft-shadow">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-indigo-900">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {lang === 'en' ? '< 2 Hours' : `< ${toBengaliNumber('2')} ঘণ্টা`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'en' ? 'Avg. Response Time' : 'গড় উত্তর প্রদানের সময়'}
              </p>
            </div>
          </div>

        </div>

        {/* 1. PROMINENT 'ASK A SCHOLAR' CALL-TO-ACTION CARD WITH PRE-POPULATED QUESTION TEMPLATES */}
        <div className="mb-10 relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-xl">
          
          {/* Subtle Background Elements */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-8 top-8 opacity-10 pointer-events-none hidden lg:block">
            <BookOpen className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'Direct Shariah Council Consultation' : 'বিজ্ঞ আলেমদের সরাসরি পরামর্শ'}
                </span>
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'en' ? 'Free Personalized Fatwa Guidance' : 'সম্পূর্ণ ফ্রি শরিয়াহ ফতোয়া সেবা'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {lang === 'en'
                  ? 'Have a Specific Religious Ruling or Fiqh Question?'
                  : 'হজের খুঁটিনাটি মাসআলা বা ফতোয়া নিয়ে নিশ্চিত হতে চান?'}
              </h3>
              
              <p className="text-xs sm:text-sm text-blue-100/90 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Consult our resident Islamic scholars directly. Choose from our pre-populated question templates (Ihram rules in flight, Dam penalty rulings, wheelchair proxy for seniors, women-specific guidelines, or Qurbani confirmation) or submit your custom query.'
                  : 'বিমানে ইহরামের নিয়ম, দম ও কাফফারা, প্রবীণদের বদলি বিধান, মহিলা হাজীদের মাসায়েল বা কুরবানী নিশ্চিতকরণ সংক্রান্ত যেকোনো বিষয়ে আমাদের বিজ্ঞ আলেম বোর্ডের সরাসরি দিকনির্দেশনা গ্রহণ করুন।'}
              </p>

              {/* Scholar Avatars & Pre-populated Template Quick Chips */}
              <div className="mt-4 pt-3 border-t border-blue-800/60 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-blue-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'en' ? 'Select Quick Template:' : 'দ্রুত টেমপ্লেট বেছে নিন:'}
                </span>

                {[
                  { en: '✈️ Ihram in Flight', bn: '✈️ বিমানে ইহরাম', index: 0 },
                  { en: '⚖️ Dam & Penalties', bn: '⚖️ দম ও কাফফারা', index: 1 },
                  { en: '🦽 Wheelchair Proxy', bn: '🦽 হুইলচেয়ার বদলি', index: 2 },
                  { en: '🧕 Women Rulings', bn: '🧕 মহিলাদের মাসায়েল', index: 3 },
                  { en: '🐑 Qurbani Timing', bn: '🐑 কুরবানী সময়', index: 4 },
                ].map((tmpl) => (
                  <button
                    key={tmpl.index}
                    onClick={() => handleOpenAskScholarModal(tmpl.index)}
                    className="text-[11px] font-bold px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95"
                  >
                    <span>{lang === 'en' ? tmpl.en : tmpl.bn}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Right Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <button
                onClick={() => handleOpenAskScholarModal(0)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'en' ? 'Ask a Scholar Now' : 'আলেমের নিকট প্রশ্ন পাঠান'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-2xl bg-blue-800/80 hover:bg-blue-750 text-white font-semibold text-xs border border-blue-700 transition cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>{lang === 'en' ? 'Meet Scholar Council' : 'আলেম পরিষদের পরিচিতি'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* 2. TAB SWITCHER: Toggle between 'All', 'Hajj', 'Umrah', and 'General' */}
        <div className="mb-6 bg-slate-200/70 dark:bg-slate-800/80 p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {segments.map((seg) => {
            const isActive = activeSegment === seg.id;
            const count = segmentCounts[seg.id] || 0;
            const IconComp = seg.icon;
            return (
              <button
                key={seg.id}
                onClick={() => {
                  setActiveSegment(seg.id as any);
                  setActiveCategory('all'); // reset category for clean view
                }}
                className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm scale-[1.01]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{lang === 'en' ? seg.nameEn : seg.nameBn}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-extrabold ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      : 'bg-slate-300/60 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lang === 'en' ? count : toBengaliNumber(count)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Top 3 Most Clicked Questions Highlight */}
        <div className="mb-8 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 p-5 sm:p-6 soft-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Flame className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{lang === 'en' ? 'Most Popular Questions' : 'সর্বাধিক জিজ্ঞাসিত শীর্ষ প্রশ্নসমূহ'}</span>
                  <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-700">
                    {lang === 'en' ? 'Top 3' : 'শীর্ষ ৩'}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === 'en' ? 'Frequently accessed by fellow Bangladeshi pilgrims' : 'অন্যান্য হজযাত্রীদের সবচেয়ে বেশি পঠিত বিষয়'}
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'en' ? 'Click to jump to answer' : 'উত্তর দেখতে ক্লিক করুন'}</span>
            </div>
          </div>

          {/* Popular Items 3-Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {popularFaqs.map((faq, index) => {
              const views = clickCounts[faq.id] || faq.initialClicks || 100;
              return (
                <button
                  key={faq.id}
                  onClick={() => handleSelectFaqItem(faq)}
                  className="text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 capitalize">
                        #{index + 1} • {faq.category}
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-slate-300 font-mono font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-500" />
                        {lang === 'en' ? `${views} views` : `${toBengaliNumber(views)} বার পড়া হয়েছে`}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors">
                      {lang === 'en' ? faq.questionEn : faq.questionBn}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/40 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{faq.helpfulScore || 98}% Helpful</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ENHANCED SEARCH BAR WITH AUTO-SUGGEST POPUP */}
        <div className="mb-8 space-y-4">
          
          {/* Search Input Container with Auto-Suggest Popup */}
          <div ref={searchContainerRef} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="faq-search-input"
              data-faq-search="true"
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              placeholder={
                lang === 'en'
                  ? 'Search questions by keyword (e.g. visa, cost, refund, wheelchair, passport, license, tents)... [Press "F" to focus]'
                  : 'কীওয়ার্ড দিয়ে প্রশ্ন খুঁজুন (যেমন: ভিসা, খরচ, কিস্তি, রিফান্ড, হুইলচেয়ার, লাইসেন্স, তাবু)... [ "F" চাপুন ]'
              }
              className="w-full pl-11 pr-10 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* AUTO-SUGGEST POPUP DROPDOWN (Prioritizing high feedback & relevance) */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-30 left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
                >
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        {searchQuery.trim()
                          ? lang === 'en'
                            ? `Suggested Questions for "${searchQuery}"`
                            : `"${searchQuery}" সংক্রান্ত পরামর্শিত প্রশ্নোত্তর`
                          : lang === 'en'
                          ? 'Suggested High-Trust Questions'
                          : 'জনপ্রিয় ও শীর্ষ রেটেড প্রশ্নোত্তর'}
                      </span>
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300">
                      {lang === 'en' ? 'Prioritized by helpful score' : 'রেটিং অনুযায়ী সাজানো'}
                    </span>
                  </div>

                  {/* Suggestion list */}
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {autoSuggestResults.length > 0 ? (
                      autoSuggestResults.map((faq) => (
                        <button
                          key={faq.id}
                          onMouseDown={() => handleSelectFaqItem(faq)}
                          className="w-full text-left p-3.5 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 transition-colors flex items-start justify-between gap-3 cursor-pointer group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 capitalize">
                                {faq.category}
                              </span>
                              {faq.segment && (
                                <span className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                                  {faq.segment}
                                </span>
                              )}
                              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {faq.helpfulScore || 98}%
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                              {lang === 'en' ? faq.questionEn : faq.questionBn}
                            </p>
                          </div>
                          <ChevronDown className="w-4 h-4 text-slate-400 -rotate-90 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-500">
                        {lang === 'en' ? 'No direct matches found in FAQ database.' : 'কোনো সরাসরি মিল পাওয়া যায়নি।'}
                      </div>
                    )}
                  </div>

                  {/* Quick Tag Pills in Footer */}
                  <div className="p-3 bg-slate-50/80 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Quick Topics:' : 'জনপ্রিয় বিষয়:'}</span>
                    {[
                      { en: 'Pre-registration', bn: 'প্রাক-নিবন্ধন' },
                      { en: 'Nusuk Visa', bn: 'নুসুক ভিসা' },
                      { en: 'Installments', bn: 'কিস্তি' },
                      { en: 'Wheelchair Care', bn: 'হুইলচেয়ার' },
                      { en: 'Qurbani Rules', bn: 'কুরবানী' },
                    ].map((topic, i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseDown={() => {
                          setSearchQuery(lang === 'en' ? topic.en : topic.bn);
                          setIsSearchFocused(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 font-medium transition cursor-pointer"
                      >
                        #{lang === 'en' ? topic.en : topic.bn}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category Filter Pills with Item Count Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' ? (categoryCounts.all || 0) : (categoryCounts[cat.id] || 0);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{lang === 'en' ? cat.nameEn : cat.nameBn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {lang === 'en' ? count : toBengaliNumber(count)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Summary and Expand/Collapse All Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 px-1 pt-1 border-t border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span>
                {lang === 'en'
                  ? `Showing ${filteredFaqs.length} of ${faqsData.length} questions`
                  : `${toBengaliNumber(faqsData.length)}টি বিষয়ের মধ্যে ${toBengaliNumber(filteredFaqs.length)}টি প্রদর্শিত`}
              </span>
              {(searchQuery || activeCategory !== 'all' || activeSegment !== 'all') && (
                <button
                  onClick={handleClearSearch}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer ml-1"
                >
                  {lang === 'en' ? '(Reset All Filters)' : '(ফিল্টার রিসেট)'}
                </button>
              )}
            </div>

            {/* Action Buttons Toolbar: Expand All, Print, Email, PDF */}
            <div className="flex flex-wrap items-center gap-2">
              {filteredFaqs.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={handleToggleExpandAll}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs transition cursor-pointer shadow-xs"
                  >
                    {isAllExpanded ? (
                      <>
                        <ChevronsUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{lang === 'en' ? 'Collapse All' : 'সব বন্ধ করুন'}</span>
                      </>
                    ) : (
                      <>
                        <ChevronsDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{lang === 'en' ? 'Expand All' : 'সব বিস্তারিত দেখুন'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPrintPreviewOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 font-semibold text-xs transition cursor-pointer shadow-xs"
                    title={lang === 'en' ? 'Open A4 Print Preview' : 'A4 প্রিন্ট প্রিভিউ দেখুন'}
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="hidden sm:inline">{lang === 'en' ? 'Preview' : 'প্রিভিউ'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white font-semibold text-xs transition cursor-pointer shadow-xs"
                    title={lang === 'en' ? 'Download filtered list to PDF' : 'ফিল্টারকৃত তালিকা PDF হিসেবে ডাউনলোড করুন'}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{lang === 'en' ? 'PDF' : 'PDF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintFaq}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 font-semibold text-xs transition cursor-pointer shadow-xs"
                    title={lang === 'en' ? 'Print this filtered FAQ view' : 'ফিল্টারকৃত প্রশ্নোত্তর প্রিন্ট করুন'}
                  >
                    <Printer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="hidden sm:inline">{lang === 'en' ? 'Print' : 'প্রিন্ট'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenEmailDialog}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 font-semibold text-xs transition cursor-pointer shadow-xs"
                    title={lang === 'en' ? 'Email this FAQ summary' : 'ইমেইলে পাঠান'}
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="hidden sm:inline">{lang === 'en' ? 'Email' : 'ইমেইল'}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Full-width High-Density Compact Badge-Driven FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-2.5">
          {filteredFaqs.map((item) => {
            const isOpen = openIds.has(item.id);
            const isHighlighted = highlightedFaqId === item.id;
            const feedback = feedbackMap[item.id];

            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`bg-white dark:bg-slate-800/90 rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isHighlighted
                    ? 'border-sky-500 ring-4 ring-sky-500/20 shadow-md'
                    : isOpen
                    ? 'border-sky-300 dark:border-sky-800/80 shadow-xs'
                    : 'border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Compact Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full py-3 px-4 sm:px-5 text-left flex items-center justify-between gap-3 font-semibold text-xs sm:text-sm text-slate-800 dark:text-white hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Category Badge */}
                    <span className="bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 text-[11px] px-2.5 py-0.5 rounded-full font-bold shrink-0 capitalize">
                      {item.category}
                    </span>
                    <span className="truncate leading-snug">
                      {lang === 'en' ? item.questionEn : item.questionBn}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
                    }`}
                  />
                </button>

                {/* Expanded Answer Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 sm:px-5 pb-4 pt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-sky-100/60 dark:border-slate-700/80 bg-sky-50/30 dark:bg-slate-850/60">
                        <p>{lang === 'en' ? item.answerEn : item.answerBn}</p>

                        {/* Minimalist Action Bar */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                              {lang === 'en' ? 'Helpful?' : 'সহায়ক?'}
                            </span>
                            {feedback ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {lang === 'en' ? 'Recorded!' : 'সংরক্ষিত!'}
                              </span>
                            ) : (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleFeedback(item.id, 'yes')}
                                  className="p-1 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                                >
                                  <ThumbsUp className="w-3 h-3 text-emerald-600" />
                                  <span>{lang === 'en' ? 'Yes' : 'হ্যাঁ'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleFeedback(item.id, 'no')}
                                  className="p-1 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                                >
                                  <ThumbsDown className="w-3 h-3 text-rose-500" />
                                  <span>{lang === 'en' ? 'No' : 'না'}</span>
                                </button>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleShareFaq(e, item, 'copy')}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-600 text-[11px] font-medium transition cursor-pointer"
                          >
                            {copiedFaqId === item.id ? (
                              <span className="text-emerald-600 font-bold">{lang === 'en' ? 'Copied' : 'কপি হয়েছে'}</span>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{lang === 'en' ? 'Copy Link' : 'কপি লিংক'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-800/80 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                {lang === 'en' ? 'No matching questions found' : 'আপনার অনুসন্ধানের সাথে কোনো প্রশ্ন মেলেনি'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                {lang === 'en'
                  ? 'Try clearing your search query or switching categories.'
                  : 'অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা ফিল্টার পরিবর্তন করুন।'}
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleClearSearch}
                  className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition cursor-pointer"
                >
                  {lang === 'en' ? 'Clear All Filters' : 'ফিল্টার মুছুন'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Consultation Assistance Banner */}
        <div className="mt-12 p-6 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/90 dark:border-slate-700 text-center flex flex-col sm:flex-row items-center justify-between gap-4 soft-shadow">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {lang === 'en' ? 'Prefer to speak with our Hajj advisors in person?' : 'সরাসরি আমাদের হজ উপদেষ্টাদের সাথে কথা বলতে চান?'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'en'
                ? 'Visit our Dhaka Paltan office or book a direct callback from 10:00 AM to 7:00 PM.'
                : 'আমাদের পল্টন অফিসে আসুন অথবা প্রতিদিন সকাল ১০টা থেকে সন্ধ্যা ৭টার মধ্যে ফ্রি কলব্যাক বুক করুন।'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+8801711258708"
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>+88 01711-258708</span>
            </a>
            <button
              onClick={() => onOpenPreReg('Direct Office Consultation')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs whitespace-nowrap transition cursor-pointer"
            >
              {lang === 'en' ? 'Book Office Visit' : 'পরামর্শ বুক করুন'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { X, FileText, ShieldCheck, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { legalDocs, LegalTab } from '../data/legal';

interface LegalModalProps {
  isOpen: boolean;
  initialTab: LegalTab;
  onClose: () => void;
  lang: Language;
}

const icons: Record<LegalTab, React.ReactNode> = {
  terms: <FileText className="w-4 h-4" />,
  refund: <RotateCcw className="w-4 h-4" />,
  privacy: <ShieldCheck className="w-4 h-4" />,
};

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab, onClose, lang }) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const doc = legalDocs.find((d) => d.id === tab) || legalDocs[0];
  const en = lang === 'en';

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/60 dark:bg-slate-800/60">
          <div className="flex flex-wrap gap-2">
            {legalDocs.map((d) => (
              <button
                key={d.id}
                onClick={() => setTab(d.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                  tab === d.id
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                {icons[d.id]}
                <span>{en ? d.titleEn : d.titleBn}</span>
              </button>
            ))}
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6 text-slate-700 dark:text-slate-300">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{en ? doc.titleEn : doc.titleBn}</h2>
            <p className="text-[11px] text-slate-500 mt-1">
              {en ? 'Last updated: ' : 'সর্বশেষ হালনাগাদ: '}
              {doc.updated}
            </p>
            <p className="text-sm leading-relaxed mt-3">{en ? doc.introEn : doc.introBn}</p>
          </div>
          {doc.sections.map((s, i) => (
            <section key={i}>
              <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-400 mb-2">{en ? s.headingEn : s.headingBn}</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
                {(en ? s.pointsEn : s.pointsBn).map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </section>
          ))}
          <p className="text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
            {en
              ? 'MASK Hajj Group • Ministry of Religious Affairs Hajj Agency Licence No. 15630 • China Town (East Tower), 20th floor, Suite 21/2, 67/1 Naya Paltan, Dhaka-1000 • +88 01713-009567'
              : 'মাস্ক হজ গ্রুপ • ধর্ম বিষয়ক মন্ত্রণালয় হজ এজেন্সি লাইসেন্স নং ১৫৬৩০ • চায়না টাউন (ইস্ট টাওয়ার), ২০ তলা, স্যুট ২১/২, ৬৭/১ নয়াপল্টন, ঢাকা-১০০০ • +88 01713-009567'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;

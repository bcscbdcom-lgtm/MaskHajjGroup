import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Download, 
  Printer, 
  AlertCircle, 
  Globe, 
  ShieldCheck, 
  Camera, 
  Syringe, 
  Smartphone, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Square,
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

export type NationalityType = 'bangladeshi_resident' | 'bangladeshi_nrb' | 'foreign_national';

interface DocumentItem {
  id: string;
  category: 'id' | 'medical' | 'biometric' | 'relationship' | 'expat';
  titleEn: string;
  titleBn: string;
  detailEn: string;
  detailBn: string;
  mandatory: boolean;
  applicableTo: NationalityType[];
  icon: React.ElementType;
}

interface EssentialDocumentsWalkthroughProps {
  lang: Language;
  onOpenPreReg?: (topic?: string) => void;
}

const DOCUMENT_ITEMS: DocumentItem[] = [
  {
    id: 'doc_passport',
    category: 'id',
    titleEn: 'Original Passport (Min. 6 Months Validity)',
    titleBn: 'মূল পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদসহ)',
    detailEn: 'Machine Readable Passport (MRP) or e-Passport with at least 3-4 consecutive blank visa pages and valid until after the Hajj season.',
    detailBn: 'মেশিন রিডেবল পাসপোর্ট (MRP) বা ই-পাসপোর্টের মেয়াদ হজের সম্ভাব্য সফর তারিখ থেকে কমপক্ষে ৬ মাস থাকতে হবে এবং ৩-৪টি খালি পাতা থাকতে হবে।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb', 'foreign_national'],
    icon: FileText,
  },
  {
    id: 'doc_nid',
    category: 'id',
    titleEn: 'Smart NID or Digital Birth Certificate',
    titleBn: 'স্মার্ট জাতীয় পরিচয়পত্র (NID) বা অনলাইন জন্মনিবন্ধন',
    detailEn: 'Photocopy and clear digital scan of Smart NID Card (or 17-digit English/Bangla verified Birth Registration for minors).',
    detailBn: 'স্মার্ট এনআইডি কার্ডের স্পষ্ট কপি (বা অপ্রাপ্তবয়স্কদের ক্ষেত্রে ১৭ ডিজিটের ডিজিটাল অনলাইন জন্মনিবন্ধন সনদ)।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb'],
    icon: ShieldCheck,
  },
  {
    id: 'doc_photos',
    category: 'id',
    titleEn: 'Biometric Passport-Sized Photographs (4 Copies)',
    titleBn: 'সাদা ব্যাকগ্রাউন্ডের পাসপোর্ট সাইজ ছবি (৪ কপি)',
    detailEn: 'Size: 4cm x 6cm or 2"x2" with white background, matte finish, 70-80% face focus. Women must show full face with hair covered.',
    detailBn: 'আকার: ৪x৬ সেমি বা ২x২ ইঞ্চি, পরিষ্কার সাদা ব্যাকগ্রাউন্ড, ম্যাট পেপার এবং ৭০-৮০% মুখমণ্ডল দৃশ্যমান। নারীদের চেহারা উন্মুক্ত ও চুল আবৃত থাকবে।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb', 'foreign_national'],
    icon: Camera,
  },
  {
    id: 'doc_meningitis',
    category: 'medical',
    titleEn: 'Meningococcal ACWY & Seasonal Flu Vaccine Card',
    titleBn: 'মেনিনজাইটিস ACWY টিকা ও ফ্লু ভ্যাকসিন কার্ড',
    detailEn: 'Mandatory Quadrivalent Meningitis vaccination certificate issued within 3 years and at least 10 days prior to departure, with verifiable QR code.',
    detailBn: 'সৌদি সরকার কর্তৃক বাধ্যতামূলক মেনিনজাইটিস ACWY টিকা গ্রহণের কিউআর কোডযুক্ত অফিসিয়াল স্বাস্থ্য সনদ (সফরের অন্তত ১০ দিন পূর্বে গৃহীত)।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb', 'foreign_national'],
    icon: Syringe,
  },
  {
    id: 'doc_fitness',
    category: 'medical',
    titleEn: 'Medical Fitness Certificate & Prescription Slip',
    titleBn: 'মেডিকেল ফিটনেস সার্টিফিকেট ও প্রেসক্রিপশন কপি',
    detailEn: 'Registered MBBS Doctor fitness clearance stating ability to perform pilgrimage walking rituals, plus list of chronic medications.',
    detailBn: 'রেজিস্টার্ড চিকিৎসকের ফিটনেস প্রত্যায়নপত্র এবং দীর্ঘমেয়াদি রোগের ক্ষেত্রে চিকিৎসকের প্রেসক্রিপশন ও ওষুধের তালিকা।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb', 'foreign_national'],
    icon: ShieldCheck,
  },
  {
    id: 'doc_biometric_app',
    category: 'biometric',
    titleEn: 'Saudi Visa Bio App Biometric Enrollment',
    titleBn: 'সৌদি ভিসা বায়ো (Saudi Visa Bio) অ্যাপে বায়োমেট্রিক নিবন্ধন',
    detailEn: 'Smartphone facial and 10-finger biometric scan submitted via the official Ministry of Foreign Affairs (KSA) mobile app.',
    detailBn: 'সৌদি পররাষ্ট্র মন্ত্রণালয়ের অফিশিয়াল ‘Saudi Visa Bio’ অ্যাপের মাধ্যমে নিজ স্মার্টফোনে ফেস ও ১০ আঙুলের বায়োমেট্রিক নিবন্ধন সম্পন্ন।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb', 'foreign_national'],
    icon: Smartphone,
  },
  {
    id: 'doc_nusuk_ehaj',
    category: 'biometric',
    titleEn: 'Nusuk / e-Haj Ministry Portal Registration QR',
    titleBn: 'নুসুক (Nusuk) / ই-হজ প্ল্যাটফর্ম রেজিস্ট্রেশন কিউআর',
    detailEn: 'Official digital pilgrim profile generation linked with MASK Hajj Group agency license (Govt Lic: 0422).',
    detailBn: 'মাস্ক হজ গ্রুপের লাইসেন্স (নং ০৪২২) এর অধীনে ধর্ম মন্ত্রণালয়ের ই-হজ পোর্টাল ও সৌদি নুসুক প্ল্যাটফর্মে ডিজিটাল আইডি ও কিউআর।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb', 'foreign_national'],
    icon: Globe,
  },
  {
    id: 'doc_expat_iqama',
    category: 'expat',
    titleEn: 'Valid Foreign Residence Permit / Iqama & Visa Copy',
    titleBn: 'বিদেশের বৈধ রেসিডেন্স পারমিট / আকামা ও ভিসার কপি',
    detailEn: 'For expatriate Bangladeshis living in Gulf/UK/USA/EU/Asia: Copy of valid residency visa with at least 3 months remaining validity.',
    detailBn: 'প্রবাসী বাংলাদেশীদের জন্য: সংশ্লিষ্ট দেশের বৈধ ভিসা / আকামা / রেসিডেন্স কার্ডের কপি যার মেয়াদ কমপক্ষে ৩ মাস অবশিষ্ট রয়েছে।',
    mandatory: true,
    applicableTo: ['bangladeshi_nrb'],
    icon: Briefcase,
  },
  {
    id: 'doc_expat_noc',
    category: 'expat',
    titleEn: 'Employer Leave Approval / Travel NOC Letter',
    titleBn: 'কর্মস্থলের ছুটির ছাড়পত্র / ট্রাভেল এনওসি (NOC) কপি',
    detailEn: 'Official employer leave approval letter confirming pilgrim is permitted to travel for 30-45 days of Hajj season.',
    detailBn: 'চাকরিজীবী প্রবাসীদের ক্ষেত্রে কোম্পানি বা নিয়োগকর্তার সিলমোহরযুক্ত ছুটির অনুমোদন বা নো-অবজেকশন লেটার (প্রযোজ্য ক্ষেত্রে)।',
    mandatory: false,
    applicableTo: ['bangladeshi_nrb'],
    icon: FileText,
  },
  {
    id: 'doc_foreign_nusuk',
    category: 'expat',
    titleEn: 'Direct Nusuk Hajj Western Platform Profile & Payment Proof',
    titleBn: 'নুসুক হজ ডিরেক্ট অ্যাকাউন্ট ও পেমেন্ট স্লিপ',
    detailEn: 'For Western & Foreign passport holders: Direct Nusuk Hajj platform e-wallet registration confirmation and package allocation slip.',
    detailBn: 'বিদেশি পাসপোর্টধারীদের জন্য: সৌদি নুসুক হজ প্ল্যাটফর্মে ভেরিফাইড প্রোফাইল ও অনুমোদিত প্যাকেজ পেমেন্ট স্লিপ।',
    mandatory: true,
    applicableTo: ['foreign_national'],
    icon: Globe,
  },
  {
    id: 'doc_relationship',
    category: 'relationship',
    titleEn: 'Proof of Relationship (Nikahnama / Marriage Cert / Birth Cert)',
    titleBn: 'পারিবারিক সম্পর্কের প্রমাণপত্র (নিকাহনামা / কাবিননামা / জন্মসনদ)',
    detailEn: 'Attested marriage certificate (Nikahnama) for spouses or birth certificate for children travelling in family groups.',
    detailBn: 'স্বামী-স্ত্রী বা পরিবারসহ সফরের ক্ষেত্রে বিবাহ সনদ (নিকাহনামা) অথবা সন্তানদের ডিজিটাল জন্মসনদ কপি।',
    mandatory: false,
    applicableTo: ['bangladeshi_resident', 'bangladeshi_nrb', 'foreign_national'],
    icon: Users,
  },
  {
    id: 'doc_bank_statement',
    category: 'id',
    titleEn: 'Bank Solvency & Registration Payment Voucher Copy',
    titleBn: 'ব্যাংক সলভেন্সি ও সরকারি প্রাক-নিবন্ধন ফি জমার রশিদ',
    detailEn: 'Official bank voucher of initial government pre-registration deposit (৳ 30,752) through scheduled bank in Bangladesh.',
    detailBn: 'ধর্ম বিষয়ক মন্ত্রণালয়ের নির্ধারিত ব্যাংকে প্রাক-নিবন্ধন ফি (৳ ৩০,৭৫২) জমার মূল ব্যাংক রশিদ ও ট্র্যাকিং নম্বর স্লিপ।',
    mandatory: true,
    applicableTo: ['bangladeshi_resident'],
    icon: FileText,
  },
];

export const EssentialDocumentsWalkthrough: React.FC<EssentialDocumentsWalkthroughProps> = ({
  lang,
  onOpenPreReg,
}) => {
  const [selectedNationality, setSelectedNationality] = useState<NationalityType>('bangladeshi_resident');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'doc_passport': true,
    'doc_nid': true,
    'doc_photos': true,
  });
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Filter items for current nationality
  const filteredDocs = DOCUMENT_ITEMS.filter((item) =>
    item.applicableTo.includes(selectedNationality)
  );

  const toggleDocCheck = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = filteredDocs.filter((d) => checkedDocs[d.id]).length;
  const totalCount = filteredDocs.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const handleDownloadChecklist = () => {
    const nationalityLabelEn =
      selectedNationality === 'bangladeshi_resident'
        ? 'Bangladeshi Citizen (Resident in Bangladesh)'
        : selectedNationality === 'bangladeshi_nrb'
        ? 'Bangladeshi Expatriate / NRB (Gulf, UK, USA, Europe)'
        : 'Foreign National / Western Passport (Nusuk Platform)';

    const nationalityLabelBn =
      selectedNationality === 'bangladeshi_resident'
        ? 'বাংলাদেশে অবস্থানরত বাংলাদেশী নাগরিক'
        : selectedNationality === 'bangladeshi_nrb'
        ? 'প্রবাসী বাংলাদেশী (NRB - মধ্যপ্রাচ্য, ইউরোপ, আমেরিকা)'
        : 'বিদেশী পাসপোর্টধারী / প্রবাসী (Nusuk Platform)';

    const lines: string[] = [
      '========================================================================',
      '         MASK HAJJ GROUP (GOVT APPROVED LICENSE NO: 0422)',
      '           OFFICIAL HAJJ VISA & TRAVEL DOCUMENT CHECKLIST',
      '========================================================================',
      `Pilgrim Nationality Category: ${lang === 'en' ? nationalityLabelEn : nationalityLabelBn}`,
      `Generated Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      `Readiness Status: ${completedCount} of ${totalCount} items prepared (${percentage}%)`,
      '------------------------------------------------------------------------',
      'REQUIRED DOCUMENTS & STATUS:',
      '------------------------------------------------------------------------',
    ];

    filteredDocs.forEach((doc, idx) => {
      const isChecked = !!checkedDocs[doc.id];
      const checkMark = isChecked ? '[✓ READY]' : '[  PENDING]';
      const title = lang === 'en' ? doc.titleEn : doc.titleBn;
      const detail = lang === 'en' ? doc.detailEn : doc.detailBn;
      const req = doc.mandatory ? '(Mandatory / আবশ্যক)' : '(Optional / প্রযোজ্য ক্ষেত্রে)';

      lines.push(`${checkMark} ${idx + 1}. ${title} ${req}`);
      lines.push(`     Detail: ${detail}`);
      lines.push('');
    });

    lines.push('------------------------------------------------------------------------');
    lines.push('IMPORTANT PILGRIM GUIDANCE & NOTES:');
    lines.push('1. Original passport must be valid for at least 6 months with 3-4 blank pages.');
    lines.push('2. Keep 2 sets of attested photocopies and digital scans in cloud storage.');
    lines.push('3. Meningitis vaccination must be taken at least 10 days before departure.');
    lines.push('4. Do not staple, fold or laminate passport visa pages.');
    lines.push('5. Complete biometric scan on Saudi Visa Bio app before final visa issuance.');
    lines.push('------------------------------------------------------------------------');
    lines.push('MASK HAJJ GROUP - Trusted Hajj & Umrah Service Provider Since 2008');
    lines.push('Head Office: Suite 402, Naya Paltan, Dhaka-1000, Bangladesh');
    lines.push('Hotline: +880 1711-258708, +880 1819-223344 | Email: info@maskhajj.com');
    lines.push('Website: https://maskhajj.com.bd');
    lines.push('========================================================================');

    const fileContent = lines.join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MASK_Hajj_Visa_Document_Checklist_${selectedNationality}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-blue-900/10 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-800/80 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'en' ? 'Ministry & Saudi Embassy Standards' : 'ধর্ম মন্ত্রণালয় ও সৌদি দূতাবাস স্ট্যান্ডার্ড'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {lang === 'en' ? 'Essential Visa & Travel Documents' : 'হজ ভিসা ও ভ্রমণের আবশ্যকীয় কাগজপত্র'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {lang === 'en'
                ? 'Select your nationality below to inspect the exact requirements and download your personalized readiness checklist.'
                : 'আপনার নাগরিকত্ব বা বসবাসের ধরন নির্বাচন করুন এবং প্রয়োজনীয় দলিলের ব্যক্তিগত চেকলিস্ট ডাউনলোড করুন।'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadChecklist}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition cursor-pointer flex-shrink-0"
              title={lang === 'en' ? 'Download text checklist' : 'চেকলিস্ট ডাউনলোড করুন'}
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? (lang === 'en' ? 'Downloaded!' : 'ডাউনলোড হয়েছে!') : (lang === 'en' ? 'Download Checklist' : 'চেকলিস্ট ডাউনলোড')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
              title={lang === 'en' ? 'Print this list' : 'প্রিন্ট করুন'}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Nationality Selector Pills */}
        <div className="mt-5 pt-4 border-t border-blue-200/60 dark:border-blue-800/60">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
            {lang === 'en' ? 'Select Pilgrim Nationality / Residence Category:' : 'যাত্রীর নাগরিকত্ব / বসবাসের ধরন নির্বাচন করুন:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            
            <button
              onClick={() => setSelectedNationality('bangladeshi_resident')}
              className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                selectedNationality === 'bangladeshi_resident'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              <div>
                <div className="text-xs font-bold">
                  {lang === 'en' ? '🇧🇩 Bangladeshi Resident' : '🇧🇩 বাংলাদেশী নাগরিক'}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedNationality === 'bangladeshi_resident' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {lang === 'en' ? 'Living in Bangladesh' : 'বাংলাদেশে বসবাসকারী'}
                </div>
              </div>
              {selectedNationality === 'bangladeshi_resident' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            </button>

            <button
              onClick={() => setSelectedNationality('bangladeshi_nrb')}
              className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                selectedNationality === 'bangladeshi_nrb'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              <div>
                <div className="text-xs font-bold">
                  {lang === 'en' ? '✈️ Expatriate / NRB' : '✈️ প্রবাসী বাংলাদেশী (NRB)'}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedNationality === 'bangladeshi_nrb' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {lang === 'en' ? 'Gulf, UK, USA, EU, Asia' : 'উপসাগরীয় দেশ, ইউকে, ইউএসএ'}
                </div>
              </div>
              {selectedNationality === 'bangladeshi_nrb' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            </button>

            <button
              onClick={() => setSelectedNationality('foreign_national')}
              className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                selectedNationality === 'foreign_national'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              <div>
                <div className="text-xs font-bold">
                  {lang === 'en' ? '🌍 Foreign Passport' : '🌍 বিদেশী পাসপোর্ট / নুসুক'}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedNationality === 'foreign_national' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {lang === 'en' ? 'Western & Direct Nusuk' : 'আন্তর্জাতিক ও পশ্চিমা পাসপোর্ট'}
                </div>
              </div>
              {selectedNationality === 'foreign_national' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            </button>

          </div>
        </div>
      </div>

      {/* Progress Readiness Tracker */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{lang === 'en' ? 'Document Readiness Checklist' : 'কাগজপত্র প্রস্তুতির অবস্থা'}</span>
          </span>
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            {lang === 'bn' ? toBengaliNumber(completedCount) : completedCount} / {lang === 'bn' ? toBengaliNumber(totalCount) : totalCount} ({lang === 'bn' ? toBengaliNumber(percentage) : percentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Document Items List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => {
          const isDone = !!checkedDocs[doc.id];
          const IconComp = doc.icon;

          return (
            <div
              key={doc.id}
              onClick={() => toggleDocCheck(doc.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                isDone
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-slate-900 dark:text-slate-100'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-900 dark:text-slate-100'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDocCheck(doc.id);
                  }}
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition flex-shrink-0 ${
                    isDone
                      ? 'bg-blue-600 text-white'
                      : 'border-2 border-slate-300 dark:border-slate-600 text-transparent'
                  }`}
                >
                  ✓
                </button>

                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <IconComp className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'text-blue-950 dark:text-blue-200' : 'text-slate-900 dark:text-white'}`}>
                      {lang === 'en' ? doc.titleEn : doc.titleBn}
                    </h4>
                    {doc.mandatory ? (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 uppercase">
                        {lang === 'en' ? 'Mandatory' : 'আবশ্যক'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {lang === 'en' ? 'If Applicable' : 'প্রযোজ্য ক্ষেত্রে'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {lang === 'en' ? doc.detailEn : doc.detailBn}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Government Warning Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            {lang === 'en' ? 'Important Ministry Visa Instructions:' : 'মন্ত্রণালয়ের জরুরি নির্দেশনা:'}
          </span>
          <p className="leading-relaxed">
            {lang === 'en'
              ? 'Please submit all original passports and health vaccine certificates at least 45 days before flight date. For dual nationality passport holders, you must declare both passports during government e-Haj portal submission.'
              : 'ফ্লাইটের অন্তত ৪৫ দিন পূর্বে মূল পাসপোর্ট ও টিকা সনদ অফিসে জমা প্রদান আবশ্যক। দ্বৈত নাগরিকত্ব থাকলে প্রাক-নিবন্ধনের সময় উভয় পাসপোর্টের তথ্য উল্লেখ করতে হবে।'}
          </p>
        </div>
      </div>

      {/* Help / Verification Action */}
      {onOpenPreReg && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
          <p className="text-xs text-slate-600 dark:text-slate-300 text-center sm:text-left">
            {lang === 'en'
              ? 'Need our team to review your documents or assist with Saudi Visa Bio biometrics?'
              : 'আপনার পাসপোর্ট বা ডকুমেন্টস আমাদের অভিজ্ঞ টিম দ্বারা যাচাই করিয়ে নিতে চান?'}
          </p>
          <button
            onClick={() => onOpenPreReg('Document Verification & Visa Assistance')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition whitespace-nowrap cursor-pointer"
          >
            {lang === 'en' ? 'Free Document Review' : 'ফ্রি ডকুমেন্ট রিভিউ চান'}
          </button>
        </div>
      )}

    </div>
  );
};

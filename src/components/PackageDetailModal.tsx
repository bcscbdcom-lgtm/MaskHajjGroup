import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  MapPin,
  Plane,
  Hotel,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  ArrowRight,
  DollarSign,
  Repeat,
  Printer,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Smartphone,
  Download,
  FileText,
  Flame,
  Users,
  AlertCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Language, PackageItem } from '../types';
import { toBengaliNumber } from '../utils/dateFormatter';

interface PackageDetailModalProps {
  lang: Language;
  pkg: PackageItem | null;
  onClose: () => void;
  onBookNow: (pkgName: string) => void;
  onOpenPrintModal?: (pkg: PackageItem) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  lang,
  pkg,
  onClose,
  onBookNow,
  onOpenPrintModal,
}) => {
  if (!pkg) return null;

  // Currency Converter state: default rate 1 SAR = 32.50 BDT
  const [currency, setCurrency] = useState<'BDT' | 'SAR'>('BDT');
  const [exchangeRate, setExchangeRate] = useState<number>(32.5);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Extract raw numeric price from price string (e.g. "৳ 5,13,648 / person" -> 513648)
  const extractNumericPrice = (str: string): number => {
    const digitsOnly = str.replace(/[^\d]/g, '');
    const val = parseInt(digitsOnly, 10);
    return isNaN(val) ? 0 : val;
  };

  const bdtAmount = extractNumericPrice(pkg.priceEn);
  const sarAmount = Math.round(bdtAmount / exchangeRate);

  const formattedBdt = `৳ ${bdtAmount.toLocaleString('en-IN')}`;
  const formattedSar = `SAR ${sarAmount.toLocaleString('en-US')} (ر.س)`;

  // Generate direct booking URL with package ID prefilled
  const bookingUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?pkg=${encodeURIComponent(pkg.id)}#preregistration`
      : `https://maskhajj.com/?pkg=${encodeURIComponent(pkg.id)}#preregistration`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bookingUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadPdf = () => {
    if (onOpenPrintModal) {
      onOpenPrintModal(pkg);
    } else {
      window.print();
    }
  };

  const renderAvailabilityBadge = () => {
    const availability = pkg.availability || 'open';
    const badgeText = lang === 'en' ? pkg.availabilityBadgeEn : pkg.availabilityBadgeBn;

    if (availability === 'limited') {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          <Flame className="w-3 h-3 text-amber-600 dark:text-amber-400 fill-amber-500 animate-pulse" />
          <span>{badgeText || (lang === 'en' ? 'Limited Seats' : 'সীমিত আসন')}</span>
        </span>
      );
    }

    if (availability === 'fast_filling') {
      return (
        <span className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
          <span>{badgeText || (lang === 'en' ? 'Filling Fast' : 'দ্রুত পূরণ হচ্ছে')}</span>
        </span>
      );
    }

    if (availability === 'sold_out') {
      return (
        <span className="inline-flex items-center gap-1 bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          <span>{badgeText || (lang === 'en' ? 'Sold Out' : 'আসন পূর্ণ')}</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
        <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        <span>{badgeText || (lang === 'en' ? 'Open for Booking' : 'বুকিং উন্মুক্ত')}</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-backdrop-fade">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white animate-modal-slide-up">
        {/* Top Action Bar: PDF Print, QR Code & Close */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          {/* PDF Download Button */}
          <button
            onClick={handleDownloadPdf}
            title={lang === 'en' ? 'Download PDF Brochure' : 'PDF ব্রোশিউর ডাউনলোড করুন'}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition cursor-pointer border border-slate-200/80 dark:border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">{lang === 'en' ? 'PDF Brochure' : 'PDF ব্রোশিউর'}</span>
          </button>

          <button
            onClick={() => setShowQrCode(!showQrCode)}
            title={lang === 'en' ? 'Package Booking QR Code' : 'বুকিং কিউআর কোড'}
            className={`p-2 rounded-full transition cursor-pointer ${
              showQrCode
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700'
            }`}
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Header */}
        <div className="mb-6 pr-32">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {lang === 'en' ? pkg.badgeEn : pkg.badgeBn}
            </span>
            {renderAvailabilityBadge()}
            <span className="text-xs text-slate-400 dark:text-slate-400 font-semibold flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-slate-400" />
              {lang === 'en' ? pkg.durationEn : pkg.durationBn}
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {lang === 'en' ? pkg.nameEn : pkg.nameBn}
          </h2>

          {/* Pricing & Interactive Currency Converter */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'en' ? 'Package Price (Per Person)' : 'প্যাকেজ মূল্য (জনপ্রতি)'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {currency === 'BDT' ? (
                    lang === 'bn' ? (
                      `৳ ${toBengaliNumber(bdtAmount.toLocaleString('en-IN'))}`
                    ) : (
                      formattedBdt
                    )
                  ) : (
                    lang === 'bn' ? (
                      `SAR ${toBengaliNumber(sarAmount.toLocaleString('en-US'))} (ر.স)`
                    ) : (
                      formattedSar
                    )
                  )}
                </div>
              </div>

              {/* Currency Converter Toggle Switch */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setCurrency('BDT')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    currency === 'BDT'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>৳ BDT</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('SAR')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    currency === 'SAR'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>SAR (ر.স)</span>
                </button>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Repeat className="w-3 h-3 text-blue-500" />
                <span>
                  {lang === 'en'
                    ? `Live Est. Exchange Rate: 1 SAR ≈ ${exchangeRate} BDT`
                    : `বর্তমান আনুমানিক হার: ১ সৌদি রিয়াল ≈ ${toBengaliNumber(exchangeRate)} টাকা`}
                </span>
              </span>
              <span className="font-medium text-slate-400">
                {lang === 'en' ? 'Includes flights & visa' : 'বিমান ও ভিসা সহ'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {lang === 'en' ? pkg.itinerarySummaryEn : pkg.itinerarySummaryBn}
          </p>
        </div>

        {/* QR Code Booking Drawer */}
        {showQrCode && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-blue-900/10 border-2 border-blue-500/40 animate-in slide-in-from-top-2">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex-shrink-0">
                <QRCodeSVG
                  value={bookingUrl}
                  size={120}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                  <Smartphone className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Instant Mobile Booking QR' : 'মোবাইল বুকিং কিউআর কোড'}</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {lang === 'en' ? 'Scan to Pre-Fill Booking Form' : 'স্ক্যান করে সরাসরি বুকিং ফর্ম পূরণ করুন'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'en'
                    ? 'Scan with your mobile camera or copy the direct link below to share this package with family.'
                    : 'স্মার্টফোনের ক্যামেরা দিয়ে স্ক্যান করুন অথবা পরিবারের সাথে শেয়ার করতে নিচের লিংকটি কপি করুন।'}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={bookingUrl}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-300 select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex-shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>
                      {copiedLink
                        ? lang === 'en'
                          ? 'Copied!'
                          : 'কপি হয়েছে!'
                        : lang === 'en'
                        ? 'Copy Link'
                        : 'লিংক কপি'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accommodations and Logistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          <div className="bg-slate-50 dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1">
              <Hotel className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Makkah Accommodation' : 'মক্কা আবাসন'}</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
              {lang === 'en' ? pkg.hotelMakkahEn : pkg.hotelMakkahBn}
            </p>
            <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-1 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              {lang === 'en' ? pkg.distanceMakkahEn : pkg.distanceMakkahBn}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1">
              <Hotel className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Madinah Accommodation' : 'মদিনা আবাসন'}</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
              {lang === 'en' ? pkg.hotelMadinahEn : pkg.hotelMadinahBn}
            </p>
            <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-1 font-semibold flex items-center gap-1">
              <Plane className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              {lang === 'en' ? pkg.airlinesEn : pkg.airlinesBn}
            </p>
          </div>
        </div>

        {/* Inclusions */}
        <div className="mb-6">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-3">
            {lang === 'en' ? '✓ What is Included in this Package' : '✓ প্যাকেজে যা যা অন্তর্ভুক্ত'}
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            {(lang === 'en' ? pkg.inclusionsEn : pkg.inclusionsBn).map((inc, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div className="mb-6">
          <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs sm:text-sm uppercase tracking-wider mb-3">
            {lang === 'en' ? '✕ Exclusions & Optional Costs' : '✕ প্যাকেজে যা অন্তর্ভুক্ত নয়'}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            {(lang === 'en' ? pkg.exclusionsEn : pkg.exclusionsBn).map((exc, i) => (
              <li key={i} className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{exc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA Strip */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onBookNow(lang === 'en' ? pkg.nameEn : pkg.nameBn);
            }}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{lang === 'en' ? 'Book / Pre-Register for this Package' : 'এই প্যাকেজে বুকিং আবেদন করুন'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 text-xs font-bold px-4 py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
            title={lang === 'en' ? 'Print or Save as PDF' : 'প্রিন্ট বা PDF হিসেবে সংরক্ষণ করুন'}
          >
            <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{lang === 'en' ? 'Print PDF' : 'PDF প্রিন্ট'}</span>
          </button>

          <a
            href={`https://wa.me/8801711258708?text=${encodeURIComponent(
              `Assalamu Alaikum, I would like more details and itinerary for "${lang === 'en' ? pkg.nameEn : pkg.nameBn}" (${lang === 'en' ? pkg.priceEn : pkg.priceBn}).`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 text-xs font-bold px-4 py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

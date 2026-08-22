import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Send, ExternalLink, QrCode } from 'lucide-react';
import { Language, PackageItem } from '../types';
import { localizeDuration } from '../utils/dateFormatter';

interface PackageShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: PackageItem | null;
  lang: Language;
}

export const PackageShareModal: React.FC<PackageShareModalProps> = ({
  isOpen,
  onClose,
  pkg,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen || !pkg) return null;

  const pkgName = lang === 'en' ? pkg.nameEn : pkg.nameBn;
  const pkgPrice = lang === 'en' ? pkg.priceEn : pkg.priceBn;
  const pkgDuration = localizeDuration(lang === 'en' ? pkg.durationEn : pkg.durationBn, lang);
  const pkgHotel = lang === 'en' ? pkg.hotelMakkahEn : pkg.hotelMakkahBn;

  // Generate shareable URL with package anchor/query
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://maskhajj.com.bd';
  const shareUrl = `${origin}/#${pkg.type === 'hajj' ? 'packages' : 'umrah'}?package=${pkg.id}`;

  const shareTitle = `MASK Hajj Group — ${pkgName} (${pkgPrice})`;
  const shareText =
    lang === 'en'
      ? `Assalamu Alaikum! Check out the "${pkgName}" (${pkgPrice}, ${pkgDuration}) at MASK Hajj Group.\nHotel: ${pkgHotel}\nDetails: ${shareUrl}`
      : `আসসালামু আলাইকুম! মাস্ক হজ গ্রুপের "${pkgName}" (${pkgPrice}, ${pkgDuration}) প্যাকেজটি দেখুন।\nহোটেল: ${pkgHotel}\nবিস্তারিত: ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}&bgcolor=ffffff&color=0f172a&margin=1`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-backdrop-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-modal-slide-up text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200/70 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {lang === 'en' ? 'Share Package Details' : 'প্যাকেজ শেয়ার করুন'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Share with family, friends or on social media' : 'পরিবার ও বন্ধুদের সাথে সহজে শেয়ার করুন'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Package Card Preview */}
        <div className="p-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                {lang === 'en' ? pkg.badgeEn : pkg.badgeBn}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {pkgDuration}
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2">
              {pkgName}
            </h4>
            <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
              {pkgPrice}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              📍 {pkgHotel}
            </p>
          </div>

          {/* Direct Share Options Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition text-xs font-bold shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition text-xs font-bold shadow-2xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Facebook</span>
            </a>

            {/* Telegram */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition text-xs font-bold shadow-2xs"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>

            {/* Twitter / X */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-xs font-bold shadow-2xs"
            >
              <span className="font-mono font-bold">𝕏</span>
              <span>X (Twitter)</span>
            </a>
          </div>

          {/* Copy Link Bar */}
          <div className="pt-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">
              {lang === 'en' ? 'Package Direct Link' : 'প্যাকেজের সরাসরি লিংক'}
            </label>
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2 border border-slate-200 dark:border-slate-700">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent flex-1 text-xs text-slate-700 dark:text-slate-300 px-2 outline-none font-mono select-all truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer flex-shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Copied!' : 'কপি হয়েছে!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Copy Link' : 'লিংক কপি'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Optional QR Code & Native Share Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setShowQr(!showQr)}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{showQr ? (lang === 'en' ? 'Hide QR' : 'কিউআর লুকান') : (lang === 'en' ? 'Show QR Code' : 'কিউআর কোড')}</span>
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'More Apps...' : 'অন্যান্য অ্যাপ...'}</span>
              </button>
            )}
          </div>

          {/* QR Code Section */}
          {showQr && (
            <div className="p-4 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 text-center animate-fade-in flex flex-col items-center">
              <img
                src={qrImageUrl}
                alt="Package QR Code"
                className="w-36 h-36 rounded-xl border border-slate-200 dark:border-slate-700 bg-white p-1"
                referrerPolicy="no-referrer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                {lang === 'en' ? 'Scan to view package on phone' : 'ফোনে দেখতে কিউআর স্ক্যান করুন'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

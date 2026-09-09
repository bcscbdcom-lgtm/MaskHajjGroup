import React, { useState, useEffect } from 'react';
import { Megaphone, X, Bell, BellRing, Check } from 'lucide-react';
import { Language, NoticeItem } from '../types';

interface NoticeBannerProps {
  lang: Language;
  notice: NoticeItem | null;
  onDismiss: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ lang, notice, onDismiss }) => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [hasNotified, setHasNotified] = useState(false);
  const [justEnabled, setJustEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Web Notification trigger when tab becomes hidden or when urgent notice appears
  useEffect(() => {
    if (!notice || !notice.active || hasNotified) return;

    const sendWebNotification = () => {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        const title =
          lang === 'en'
            ? '🕋 MASK Hajj Alert: Urgent Update & Slot Notice'
            : '🕋 জরুরি হজ বিজ্ঞপ্তি - মাস্ক হজ গ্রুপ';
        const bodyText = lang === 'en' ? notice.textEn : notice.textBn;

        try {
          const notif = new Notification(title, {
            body: bodyText,
            icon: '/icon.png',
            badge: '/icon.png',
            tag: 'mask-hajj-urgent-notice',
          });

          notif.onclick = () => {
            window.focus();
            notif.close();
          };

          setHasNotified(true);
        } catch {
          // Notification might be blocked in some sandbox iframes
        }
      }
    };

    // Trigger notification if tab is inactive/hidden or when notice updates
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendWebNotification();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // If permission is already granted, send notice once
    if (notificationPermission === 'granted' && !hasNotified) {
      sendWebNotification();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [notice, lang, notificationPermission, hasNotified]);

  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert(
        lang === 'en'
          ? 'Web Notifications are not supported in your browser.'
          : 'আপনার ব্রাউজারে নোটিফিকেশন সমর্থন করে না।'
      );
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        setJustEnabled(true);
        setTimeout(() => setJustEnabled(false), 3000);

        if (notice) {
          const title =
            lang === 'en'
              ? '🕋 MASK Hajj Notifications Enabled!'
              : '🕋 হজ আপডেট নোটিফিকেশন চালু হয়েছে!';
          const bodyText =
            lang === 'en'
              ? `You will now receive urgent Hajj slot alerts: ${notice.textEn}`
              : `আপনি এখন জরুরি নোটিশ ও স্লট আপডেট পাবেন: ${notice.textBn}`;

          try {
            const notif = new Notification(title, {
              body: bodyText,
              icon: '/icon.png',
            });
            notif.onclick = () => {
              window.focus();
              notif.close();
            };
          } catch {
            // ignore
          }
        }
      }
    } catch {
      // Permission request error handling
    }
  };

  if (!notice || !notice.active) return null;

  return (
    <div className="bg-gradient-to-r from-[#064E3B] via-[#0F5132] to-[#064E3B] text-white py-2 px-3 sm:px-4 text-xs font-semibold relative shadow-xs z-50 border-b border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Notice icon and announcement text */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="flex-shrink-0 bg-amber-400/20 text-amber-300 p-1 rounded-md border border-amber-400/30">
            <Megaphone className="w-3.5 h-3.5 animate-pulse" />
          </span>
          <p className="truncate text-[11px] sm:text-xs tracking-wide">
            {lang === 'en' ? notice.textEn : notice.textBn}
          </p>
        </div>

        {/* Web Notification Action & Dismiss */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {typeof window !== 'undefined' && 'Notification' in window && (
            <button
              onClick={requestNotificationPermission}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                notificationPermission === 'granted'
                  ? 'bg-emerald-500/30 text-emerald-100 border border-emerald-400/40 hover:bg-emerald-500/40'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:border-white/50'
              }`}
              title={
                lang === 'en'
                  ? 'Get desktop alerts for urgent Hajj updates & slot releases'
                  : 'জরুরি নোটিশ ও কোটা স্লটের নোটিফিকেশন পান'
              }
            >
              {justEnabled || notificationPermission === 'granted' ? (
                <>
                  <BellRing className="w-3 h-3 text-emerald-300 animate-bounce" />
                  <span className="hidden sm:inline">
                    {lang === 'en' ? 'Alerts Active' : 'নোটিফিকেশন চালু'}
                  </span>
                </>
              ) : (
                <>
                  <Bell className="w-3 h-3 text-white animate-pulse" />
                  <span>
                    {lang === 'en' ? 'Notify Me' : 'নোটিফিকেশন চাই'}
                  </span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onDismiss}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};


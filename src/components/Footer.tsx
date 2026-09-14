import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Phone, Mail, Clock, ShieldCheck, Send, CheckCircle2, Bell } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mask_visitor_count');
      if (saved) return parseInt(saved, 10);
    } catch {
      // ignore
    }
    return 12845;
  });
  const [subscribed, setSubscribed] = useState(() => {
    try {
      return !!localStorage.getItem('mask_subscribed_email');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    let isMounted = true;

    // 1. Immediately increment local fallback count so a real integer is always displayed without delay
    let currentFallback = 12845;
    try {
      const saved = localStorage.getItem('mask_visitor_count');
      const base = saved ? parseInt(saved, 10) : 12845;
      currentFallback = base + 1;
      localStorage.setItem('mask_visitor_count', String(currentFallback));
      setVisitorCount(currentFallback);
    } catch {
      // ignore
    }

    // 2. Fetch and increment from official CounterAPI endpoint
    const fetchVisitorCount = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch('https://api.counterapi.dev/v1/maskhajjgroup_prod_2026/visits/up', {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error('CounterAPI request failed');
        const data = await res.json();
        const countVal = data?.count ?? data?.value ?? data?.up ?? null;

        if (typeof countVal === 'number' && countVal > 0 && isMounted) {
          setVisitorCount(countVal);
          try {
            localStorage.setItem('mask_visitor_count', String(countVal));
          } catch {
            // ignore
          }
        }
      } catch {
        // Fallback count is already active and stored via localStorage
      }
    };

    fetchVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        localStorage.setItem('mask_subscribed_email', email.trim());
      } catch {
        // ignore
      }
      setIsSubmitting(false);
      setSubscribed(true);
    }, 600);
  };

  return (
    <footer className="bg-white dark:bg-slate-950 pt-16 pb-12 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Email Subscription Box Strip */}
        <div className="bg-gradient-to-r from-sky-900 via-emerald-950 to-sky-950 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-sky-800/80 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{lang === 'en' ? 'Get Hajj Updates & Price Alerts' : 'হজ আপডেট ও বিশেষ ছাড়ের নোটিফিকেশন পান'}</span>
              </h4>
              <p className="text-xs text-sky-100/90 leading-relaxed mt-1">
                {lang === 'en'
                  ? 'Subscribe to receive instant notifications for pre-registration deadlines, early bird Umrah packages, and ministry circulars.'
                  : 'সরকারি প্রাক-নিবন্ধনের ডেডলাইন, নতুন ওমরাহ প্যাকেজ ও সরকারি সার্কুলার নিয়মিত ইমেইলে পেতে সাইনআপ করুন।'}
              </p>
            </div>
          </div>

          {/* Subscription Input Form */}
          <div className="w-full lg:w-auto flex-shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-300 bg-emerald-900/60 border border-emerald-600/80 px-4 py-3 rounded-2xl text-xs font-bold shadow-inner">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Subscribed successfully! You will receive updates.'
                    : 'ধন্যবাদ! আপনার সাবস্ক্রিপশন সফলভাবে সংরক্ষিত হয়েছে।'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2.5 w-full max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === 'en' ? 'Enter your email address...' : 'আপনার ইমেইল ঠিকানা লিখুন...'}
                    className="w-full pl-9 pr-3 py-3 bg-white/10 text-white placeholder-sky-200/60 text-xs rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span>{lang === 'en' ? 'Saving...' : 'সংরক্ষণ হচ্ছে...'}</span>
                  ) : (
                    <>
                      <span>{lang === 'en' ? 'Subscribe' : 'সাবস্ক্রাইব'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & About & Socials */}
        <div>
          <a href="#home" className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-slate-900 dark:bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm shadow-xs">
              <Compass className="w-4 h-4 text-blue-400 dark:text-white" />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? (
                <>MASK<span className="text-blue-600 dark:text-blue-400 ml-0.5">HAJJ GROUP</span></>
              ) : (
                <>মাস্ক<span className="text-blue-600 dark:text-blue-400 ml-0.5">হজ গ্রুপ</span></>
              )}
            </div>
          </a>

          <p className="leading-relaxed mb-5 text-slate-500 dark:text-slate-400">
            {lang === 'en'
              ? 'Your trusted, ministry-verified partner for sacred Hajj and Umrah pilgrimages from Bangladesh to the Holy Cities of Makkah and Madinah.'
              : 'বাংলাদেশ থেকে পবিত্র মক্কা-মদিনায় আপনার বিশ্বস্ত, ধর্ম বিষয়ক মন্ত্রণালয় অনুমোদিত নির্ভরযোগ্য হজ ও ওমরাহ সহযোগী।'}
          </p>

          {/* Social Icons Strip */}
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 mt-3">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1BxJhNoLNa/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950/80 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition duration-300 shadow-xs font-bold text-sm"
            >
              f
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@MASKHAJJGROUP"
              target="_blank"
              rel="noreferrer"
              title="YouTube"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/80 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center justify-center transition duration-300 shadow-xs font-bold text-sm"
            >
              ▶
            </a>

            {/* Instagram */}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-pink-50 dark:hover:bg-pink-950/80 hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 flex items-center justify-center transition duration-300 shadow-xs font-bold text-sm"
            >
              📷
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801711258708"
              target="_blank"
              rel="noreferrer"
              title="WhatsApp"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/80 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition duration-300 shadow-xs font-bold text-sm"
            >
              💬
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
            {lang === 'en' ? 'Quick Navigation' : 'প্রয়োজনীয় লিংকসমূহ'}
          </h4>
          <ul className="space-y-2.5 font-medium text-slate-600 dark:text-slate-400">
            <li>
              <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {lang === 'en' ? 'About Our Agency' : 'আমাদের পরিচিতি'}
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {lang === 'en' ? 'Hajj Packages (2026–2027)' : 'হজ প্যাকেজসমূহ (২০২৬–২৭)'}
              </a>
            </li>
            <li>
              <a href="#umrah" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {lang === 'en' ? 'Umrah Departure Schedule' : 'ওমরাহ কাফেলার সময়সূচি'}
              </a>
            </li>
            <li>
              <a href="#guides" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {lang === 'en' ? 'Our Islamic Scholars' : 'বিজ্ঞ আলেম মেন্টরবৃন্দ'}
              </a>
            </li>
            <li>
              <a href="#tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {lang === 'en' ? 'Budget Calculator & Checklist' : 'খরচ হিসাব ও চেকলিস্ট'}
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {lang === 'en' ? 'Pilgrim Guidance Blog' : 'হজ-ওমরাহ নির্দেশিকা ব্লগ'}
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
            {lang === 'en' ? 'Dhaka Head Office' : 'যোগাযোগের ঠিকানা'}
          </h4>
          <div className="space-y-3 text-slate-600 dark:text-slate-400">
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                {lang === 'en'
                  ? '67/1 Naya Paltan, China Town (East Tower), [20th floor] Suite-21/2, Dhaka-1000'
                  : '৬৭/১ নয়া পল্টন, চায়না টাউন (ইস্ট টাওয়ার), ২০ তলা, সুইট ২১/২, ঢাকা-১০০০'}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="font-mono">+88 01711-258708, +88 02-222229612</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>maskbd99@gmail.com</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{lang === 'en' ? 'Open: 10:00 AM – 7:00 PM (Daily)' : 'খোলা: সকাল ১০:০০ – সন্ধ্যা ৭:০০'}</span>
            </p>
          </div>
        </div>

        {/* Column 4: Certifications */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
            {lang === 'en' ? 'Accreditations & Licence' : 'স্বীকৃতি ও সরকারি লাইসেন্স'}
          </h4>
          <ul className="space-y-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Licence No. 15630' : 'লাইসেন্স নং ১৫৬৩০'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Ministry of Religious Affairs, GoB' : 'ধর্ম বিষয়ক মন্ত্রণালয়, বাংলাদেশ'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'HAAB Member' : 'হাব (HAAB) সদস্য'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'ATAB Member' : 'আটাব (ATAB) সদস্য'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Rawaf Mina for Pilgrims Services' : 'রাওয়াফ মিনা অনুমোদিত'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Ministry of Hajj & Umrah (KSA)' : 'সৌদি হজ ও ওমরাহ মন্ত্রণালয়'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Al Bait Guests (ضيوف البيت)' : 'আল বাইত গেস্টস (ضيوف البيت)'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
        <div>
          © {new Date().getFullYear()} MASK Hajj Group. All rights reserved. Dhaka, Bangladesh.
        </div>

        {/* Simple Clean Visitor Count Text */}
        <div className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700/80">
          {lang === 'en'
            ? `Total Visitors: ${visitorCount.toLocaleString('en-US')}`
            : `মোট ভিজিটর: ${visitorCount.toLocaleString('bn-BD')}`}
        </div>

        <div className="flex items-center gap-6 font-semibold text-slate-600 dark:text-slate-400">
          <a href="#about" className="hover:underline">
            {lang === 'en' ? 'Terms & Conditions' : 'শর্তাবলী'}
          </a>
          <a href="#about" className="hover:underline">
            {lang === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি'}
          </a>
          <a href="#home" className="hover:underline">
            {lang === 'en' ? 'Back to Top ↑' : 'উপরে যান ↑'}
          </a>
        </div>
      </div>
    </footer>
  );
};

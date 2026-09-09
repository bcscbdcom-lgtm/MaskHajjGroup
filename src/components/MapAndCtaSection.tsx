import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink, ShieldCheck, Navigation, X, Building2 } from 'lucide-react';
import { Language } from '../types';

interface MapAndCtaSectionProps {
  lang: Language;
}

export const MapAndCtaSection: React.FC<MapAndCtaSectionProps> = ({ lang }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Callout Box */}
        <div className="lg:col-span-6 bg-gradient-to-br from-sky-900 via-emerald-950 to-sky-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col justify-between shadow-xl border border-sky-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'en' ? 'Direct Senior Advisor Access' : 'সরাসরি উপদেষ্টা সেবা'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-tight text-white">
              {lang === 'en'
                ? 'Ready to begin your sacred journey?'
                : 'আপনার পবিত্র সফর শুরু করতে প্রস্তুত?'}
            </h2>
            <p className="text-sky-100/90 text-sm leading-relaxed max-w-md">
              {lang === 'en'
                ? 'Speak with a MASK Hajj group advisor today for honest guidance on Hajj pre-registration and upcoming Umrah slots.'
                : 'আজই মাস্ক হজ গ্রুপের অভিজ্ঞ পরিচালকদের সাথে কথা বলে জেনে নিন আপনার জন্য সবচেয়ে উপযোগী হজ বা ওমরাহ প্যাকেজ।'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 relative z-10">
            <a
              href="tel:+8801711258708"
              className="bg-white hover:bg-sky-50 text-sky-900 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-xs transition flex items-center gap-2 font-mono"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call +88 01711-258708</span>
            </a>

            <a
              href="https://wa.me/8801711258708?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20know%20more%20about%20MASK%20Hajj%20Group%20packages."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>{lang === 'en' ? 'Chat on WhatsApp' : 'হোয়াটসঅ্যাপে বার্তা দিন'}</span>
            </a>
          </div>
        </div>

        {/* Right Google Map Box */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 soft-shadow flex flex-col justify-between">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{lang === 'en' ? 'Find Us in Dhaka (China Town East Tower)' : 'মানচিত্রে আমাদের কার্যালয়ের অবস্থান'}</span>
              </h3>
              <a
                href="https://maps.google.com/maps?q=MASK%20Hajj%20Group%2C%20China%20Town%20East%20Tower%2C%2067%2F1%20Naya%20Paltan%2C%20Dhaka"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline flex items-center gap-1"
              >
                <span>{lang === 'en' ? 'Open in Maps' : 'ম্যাপে দেখুন'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'en'
                ? '67/1 Naya Paltan, China Town (East Tower), [20th floor] Suite-21/2, Dhaka-1000'
                : '৬৭/১ নয়া পল্টন, চায়না টাউন (ইস্ট টাওয়ার), ২০ তলা, সুইট ২১/২, ঢাকা-১০০০'}
            </p>
          </div>

          {/* Interactive Google Map Embed with Clickable Interactive Marker & Tooltip */}
          <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner relative group">
            <iframe
              src="https://maps.google.com/maps?q=MASK%20Hajj%20Group%2C%20China%20Town%20East%20Tower%2C%2067%2F1%20Naya%20Paltan%2C%20Dhaka&t=&z=17&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0 pointer-events-auto"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MASK Hajj Group Dhaka Office Location"
            ></iframe>

            {/* Interactive Map Pin Button Overlay */}
            <div className="absolute top-4 left-4 z-20">
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-lg border-2 border-white dark:border-slate-800 flex items-center gap-2 text-xs font-bold transition transform hover:scale-105 cursor-pointer"
                title={lang === 'en' ? 'Click to view office details' : 'অফিস ঠিকানা দেখতে ক্লিক করুন'}
              >
                <MapPin className="w-4 h-4 animate-bounce text-amber-300" />
                <span className="hidden sm:inline">
                  {lang === 'en' ? 'MASK HQ Marker' : 'হেড অফিস মার্কার'}
                </span>
              </button>

              {/* Tooltip Card Overlay */}
              {showTooltip && (
                <div className="mt-2 w-72 sm:w-80 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 text-xs animate-in fade-in-50 duration-200 relative z-30">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                    <div className="flex items-center gap-1.5 font-extrabold text-blue-400">
                      <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>MASK Hajj Group Head Office</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowTooltip(false)}
                      className="text-slate-400 hover:text-white p-0.5 rounded transition"
                      title="Close tooltip"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
                    {lang === 'en'
                      ? 'China Town (East Tower), Level-20, Suite-21/2, 67/1 Naya Paltan, VIP Road, Dhaka-1000'
                      : 'চায়না টাউন (ইস্ট টাওয়ার), ২০ তলা, সুইট ২১/২, ৬৭/১ নয়া পল্টন, ভিআইপি রোড, ঢাকা-১০০০'}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-mono">☎ +88 01711-258708</span>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=MASK+Hajj+Group+67/1+Naya+Paltan+China+Town+East+Tower+Dhaka"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm transition"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>{lang === 'en' ? 'Get Directions' : 'দিকনির্দেশনা পান'}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface MapAndCtaSectionProps {
  lang: Language;
}

export const MapAndCtaSection: React.FC<MapAndCtaSectionProps> = ({ lang }) => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Callout Box */}
        <div className="lg:col-span-6 bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col justify-between shadow-xl border border-slate-800 dark:border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-slate-800 dark:bg-slate-900 border border-slate-700 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Direct Senior Advisor Access' : 'সরাসরি উপদেষ্টা সেবা'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-tight text-white">
              {lang === 'en'
                ? 'Ready to begin your sacred journey?'
                : 'আপনার পবিত্র সফর শুরু করতে প্রস্তুত?'}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              {lang === 'en'
                ? 'Speak with a MASK Hajj group advisor today for honest guidance on Hajj pre-registration and upcoming Umrah slots.'
                : 'আজই মাস্ক হজ গ্রুপের অভিজ্ঞ পরিচালকদের সাথে কথা বলে জেনে নিন আপনার জন্য সবচেয়ে উপযোগী হজ বা ওমরাহ প্যাকেজ।'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 relative z-10">
            <a
              href="tel:+8801711258708"
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-sm transition flex items-center gap-2 font-mono"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call +88 01711-258708</span>
            </a>

            <a
              href="https://wa.me/8801711258708?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20know%20more%20about%20MASK%20Hajj%20Group%20packages."
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
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

          {/* Interactive Google Map Embed */}
          <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner relative">
            <iframe
              src="https://maps.google.com/maps?q=MASK%20Hajj%20Group%2C%20China%20Town%20East%20Tower%2C%2067%2F1%20Naya%20Paltan%2C%20Dhaka&t=&z=17&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MASK Hajj Group Dhaka Office Location"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

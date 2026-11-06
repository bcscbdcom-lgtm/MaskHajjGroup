import React from 'react';
import { ArrowRight, CheckCircle2, Phone, MessageCircle, Home } from 'lucide-react';
import { Language } from '../types';
import { LandingPage, divisions } from '../data/landingPages';
import { WHATSAPP_NUMBER, HOTLINE_DISPLAY } from '../config/site';
import { navigate } from '../utils/router';

interface LandingHeaderProps {
  page: LandingPage;
  lang: Language;
  onOpenPreReg: (pkg?: string) => void;
}

/**
 * ল্যান্ডিং পেজের উপরের অংশ — হোমপেজের হিরোর জায়গায় বসে।
 * নিচে হোমপেজের বাকি সব সেকশন স্বাভাবিকভাবে থাকে।
 */
export const LandingHeader: React.FC<LandingHeaderProps> = ({ page, lang, onOpenPreReg }) => {
  const bn = lang === 'bn';
  const img = `/images/${page.image}.jpg`;
  const imgMd = `/images/${page.image}-md.jpg`;
  const isDivision = page.path.startsWith('/hajj/') || page.path === '/hajj-from-bangladesh';
  const waText = encodeURIComponent(
    bn
      ? `আসসালামু আলাইকুম। আমি ${page.preRegLabel} বিষয়ে জানতে চাই।`
      : `Assalamu Alaikum. I would like to know about: ${page.preRegLabel}.`
  );

  return (
    <section className="relative overflow-hidden bg-slate-100">
      {/* Background photo */}
      <img
        src={img}
        srcSet={`${imgMd} 1024w, ${img} 1920w`}
        sizes="100vw"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs font-semibold text-slate-600 flex items-center gap-2">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-1 hover:text-emerald-700 cursor-pointer">
            <Home size={14} /> {bn ? 'হোম' : 'Home'}
          </button>
          <span>/</span>
          <span className="text-emerald-800">{bn ? page.titleBn : page.titleEn}</span>
        </nav>

        <div className="max-w-3xl">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide">
            {bn ? 'সরকার অনুমোদিত • লাইসেন্স নং ১৫৬৩০ • HAAB সদস্য' : 'Ministry Approved • Licence No. 15630 • HAAB Member'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            {bn ? page.titleBn : page.titleEn}
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate-700 leading-relaxed">
            {bn ? page.introBn : page.introEn}
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {(bn ? page.bulletsBn : page.bulletsEn).map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-slate-800">
                <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={page.ctaAnchor}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg"
            >
              {bn ? page.ctaBn : page.ctaEn} <ArrowRight size={18} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold"
            >
              <Phone size={18} /> {HOTLINE_DISPLAY}
            </a>
            <button
              onClick={() => onOpenPreReg(page.preRegLabel)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold cursor-pointer"
            >
              {bn ? 'প্রি-রেজিস্ট্রেশন করুন' : 'Pre-register'}
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-600">
            {bn
              ? 'অফিস: ৬৭/১ নয়াপল্টন, চায়না টাউন (ইস্ট টাওয়ার), ২১/২, ঢাকা-১০০০'
              : 'Office: 67/1 Naya Paltan, China Town (East Tower), Suite 21/2, Dhaka-1000'}
          </p>
        </div>

        {/* Division links (only on district/Bangladesh pages) */}
        {isDivision && (
          <div className="mt-10">
            <p className="text-xs font-bold text-slate-600 mb-2">
              {bn ? 'আপনার বিভাগ বেছে নিন:' : 'Choose your division:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {divisions.map((d) => {
                const active = page.path === `/hajj/${d.slug}`;
                return (
                  <button
                    key={d.slug}
                    onClick={() => navigate(`/hajj/${d.slug}`)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white/90 text-slate-700 border-slate-300 hover:border-emerald-600 hover:text-emerald-700'
                    }`}
                  >
                    {bn ? d.bn : d.en}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

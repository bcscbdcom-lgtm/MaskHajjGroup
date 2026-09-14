import React, { useState } from 'react';
import { Menu, X, Compass, PhoneCall, Globe } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang?: Language;
  onToggleLang?: () => void;
  onOpenPreReg?: (pkg?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang = 'bn', onToggleLang, onOpenPreReg }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', labelEn: 'Home', labelBn: 'হোম' },
    { href: '#about', labelEn: 'About', labelBn: 'পরিচিতি' },
    { href: '#packages', labelEn: 'Hajj Packages', labelBn: 'হজ প্যাকেজ' },
    { href: '#umrah', labelEn: 'Umrah Packages', labelBn: 'ওমরাহ প্যাকেজ' },
    { href: '#scholars', labelEn: 'Mentors', labelBn: 'আলেম গাইড' },
    { href: '#contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white backdrop-blur-md border-b border-slate-100 shadow-2xs">
      {/* Subtle Top Announcement Strip */}
      <div className="bg-[#064E3B] text-emerald-100 text-xs py-1.5 px-4 text-center font-medium border-b border-emerald-900/40">
        <span>
          🌙 {lang === 'en'
            ? 'Govt. Pre-Registration for Hajj 2026–2027 is Active • Limited Quota Allocation'
            : 'পবিত্র হজ ২০২৬–২০২৭ এর সরকারি প্রাক-নিবন্ধন চলছে • সীমিত কোটা বরাদ্দ'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & License */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-[#064E3B] text-white rounded-xl flex items-center justify-center font-extrabold text-xl shadow-xs group-hover:bg-[#0D5C46] transition-colors">
              <Compass className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight block leading-tight">
                {lang === 'en' ? (
                  <>MASK <span className="text-[#064E3B]">HAJJ GROUP</span></>
                ) : (
                  <>মাস্ক <span className="text-[#064E3B]">হজ গ্রুপ</span></>
                )}
              </span>
              <span className="text-[11px] text-[#064E3B] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200">
                {lang === 'en' ? 'Ministry Licence #15630' : 'মন্ত্রণালয় লাইসেন্স নং ১৫৬৩০'}
              </span>
            </div>
          </a>

          {/* Essential Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#064E3B] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#064E3B] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {lang === 'en' ? link.labelEn : link.labelBn}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            {/* Direct Hotline */}
            <a
              href="tel:+8801711258708"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#064E3B] transition"
            >
              <span className="text-sm">📞</span>
              <span className="font-mono text-sm">+88 01711-258708</span>
            </a>

            {/* Language Switcher */}
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                id="langToggleBtn"
                className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-[#064E3B] border border-slate-200 px-2.5 py-2 rounded-lg transition cursor-pointer"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#064E3B]" />
                <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
              </button>
            )}

            {/* Primary CTA */}
            {onOpenPreReg ? (
              <button
                onClick={() => onOpenPreReg()}
                className="bg-[#064E3B] hover:bg-[#04392b] text-white text-xs sm:text-sm font-semibold px-4.5 py-2.5 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'en' ? 'Book Consultation' : 'পরামর্শের আবেদন'}</span>
              </button>
            ) : (
              <a
                href="#consultation"
                className="bg-[#064E3B] hover:bg-[#04392b] text-white text-xs sm:text-sm font-semibold px-4.5 py-2.5 rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'en' ? 'Book Consultation' : 'পরামর্শের আবেদন'}</span>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-[#064E3B] hover:bg-slate-100 rounded-lg transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2.5 text-sm shadow-md animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-slate-700 font-medium hover:bg-emerald-50 hover:text-[#064E3B] transition"
            >
              {lang === 'en' ? link.labelEn : link.labelBn}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:+8801711258708"
              className="text-xs font-semibold text-slate-600 flex items-center gap-2 py-1 px-3"
            >
              <span>📞</span> +88 01711-258708
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreReg?.();
              }}
              className="w-full bg-[#064E3B] text-white py-2.5 rounded-lg font-semibold text-xs text-center shadow-xs flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'en' ? 'Book Consultation' : 'পরামর্শের আবেদন'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

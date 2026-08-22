import React, { useState } from 'react';
import { Globe, Menu, X, Compass, PhoneCall } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenPreReg: (pkg?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenPreReg }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', labelEn: 'Home', labelBn: 'হোম' },
    { href: '#about', labelEn: 'About', labelBn: 'পরিচিতি' },
    { href: '#packages', labelEn: 'Hajj Packages', labelBn: 'হজ প্যাকেজ' },
    { href: '#umrah', labelEn: 'Umrah Packages', labelBn: 'ওমরাহ প্যাকেজ' },
    { href: '#guides', labelEn: 'Mentors', labelBn: 'আলেম গাইড' },
    { href: '#tools', labelEn: 'Pilgrim Tools', labelBn: 'হাজী টুলস' },
    { href: '#faqs', labelEn: 'FAQs', labelBn: 'প্রশ্নোত্তর' },
    { href: '#blog', labelEn: 'Blog', labelBn: 'ব্লগ' },
    { href: '#contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  return (
    <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-900 dark:bg-slate-800 rounded-xl flex items-center justify-center text-white text-lg shadow-sm group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors border border-transparent dark:border-slate-700">
              <Compass className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                {lang === 'en' ? (
                  <>MASK<span className="text-blue-600 dark:text-blue-400 ml-1">HAJJ GROUP</span></>
                ) : (
                  <>মাস্ক<span className="text-blue-600 dark:text-blue-400 ml-1">হজ গ্রুপ</span></>
                )}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 tracking-wider uppercase mt-0.5">
                {lang === 'en' ? 'Ministry Licence 15630' : 'লাইসেন্স নং ১৫৬৩০'}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center space-x-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {lang === 'en' ? link.labelEn : link.labelBn}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              id="langToggleBtn"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Book Consultation CTA */}
            <button
              onClick={() => onOpenPreReg()}
              className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Book Consultation' : 'পরামর্শের আবেদন'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400 transition"
            >
              {lang === 'en' ? link.labelEn : link.labelBn}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreReg();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-sm text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{lang === 'en' ? 'Book Consultation / Pre-Register' : 'পরামর্শ বুকিং / প্রাক-নিবন্ধন'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

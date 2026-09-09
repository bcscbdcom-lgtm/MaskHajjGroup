import React, { useState, useEffect } from 'react';
import { Language, PackageItem, NoticeItem } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { NoticeBanner } from './components/NoticeBanner';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { AboutSection } from './components/AboutSection';
import { ServicesGrid } from './components/ServicesGrid';
import { HajjPackagesSection } from './components/HajjPackagesSection';
import { UmrahPackagesSection } from './components/UmrahPackagesSection';
import { PilgrimTools } from './components/PilgrimTools';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ConsultationSection } from './components/ConsultationSection';
import { BlogSection } from './components/BlogSection';
import { MapAndCtaSection } from './components/MapAndCtaSection';
import { Footer } from './components/Footer';
import { PreRegModal } from './components/PreRegModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { StaffPortalModal } from './components/StaffPortalModal';
import { PrintSummaryModal } from './components/PrintSummaryModal';
import { PilgrimageWalkthroughModal } from './components/PilgrimageWalkthroughModal';
import { PackageShareModal } from './components/PackageShareModal';
import { PackageCompareModal } from './components/PackageCompareModal';
import { PackageCompareBar } from './components/PackageCompareBar';
import { FloatingActions } from './components/FloatingActions';
import { ReadingProgressBar } from './components/ReadingProgressBar';

function AppContent() {
  const { lang, toggleLanguage } = useLanguage();
  const [isPreRegOpen, setIsPreRegOpen] = useState(false);
  const [preRegPackage, setPreRegPackage] = useState<string | undefined>(undefined);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<PackageItem | null>(null);
  const [isStaffPortalOpen, setIsStaffPortalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedPackageForPrint, setSelectedPackageForPrint] = useState<PackageItem | null>(null);
  const [printModalTab, setPrintModalTab] = useState<'selectedPkg' | 'full' | 'packages' | 'planner' | 'checklist' | 'faqs'>('full');
  const [customFaqsForPrint, setCustomFaqsForPrint] = useState<any[] | undefined>(undefined);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  // Package Sharing State
  const [sharePackage, setSharePackage] = useState<PackageItem | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Package Comparison State
  const [comparedPackages, setComparedPackages] = useState<PackageItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleCompare = (pkg: PackageItem) => {
    setComparedPackages((prev) => {
      const exists = prev.some((p) => p.id === pkg.id);
      if (exists) {
        return prev.filter((p) => p.id !== pkg.id);
      }
      if (prev.length >= 4) {
        // Replace oldest or keep max 4
        return [...prev.slice(1), pkg];
      }
      return [...prev, pkg];
    });
  };

  const handleRemoveCompare = (pkgId: string) => {
    setComparedPackages((prev) => prev.filter((p) => p.id !== pkgId));
  };

  const handleClearCompare = () => {
    setComparedPackages([]);
    setIsCompareModalOpen(false);
  };

  const handleOpenShare = (pkg: PackageItem) => {
    setSharePackage(pkg);
    setIsShareModalOpen(true);
  };

  // Dark mode state with LocalStorage persistence and system preference fallback
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('mask_dark_mode');
      if (savedTheme === 'true') return true;
      if (savedTheme === 'false') return false;
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Sync dark class on document element whenever darkMode state changes
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('mask_dark_mode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('mask_dark_mode', 'false');
      }
    } catch {
      // ignore
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Global Keyboard Navigation:
  // '/' -> Open / focus package search
  // 'd' or 'D' -> Toggle dark mode
  // 'Escape' -> Close any open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        (activeElement as HTMLElement)?.isContentEditable;

      // Escape key to close any modal
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (isPreRegOpen || selectedPackageForModal || isStaffPortalOpen || isPrintModalOpen || isWalkthroughOpen) {
          e.preventDefault();
          setIsPreRegOpen(false);
          setSelectedPackageForModal(null);
          setIsStaffPortalOpen(false);
          setIsPrintModalOpen(false);
          setIsWalkthroughOpen(false);
        }
        return;
      }

      // If user is typing in an input field, do not hijack shortcuts
      if (isInput) return;

      // 'f' or 'F' to focus FAQ search bar
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        const faqSearchInput = document.querySelector<HTMLInputElement>(
          '#faq-search-input, #faqs input[type="text"], input[data-faq-search="true"]'
        );
        if (faqSearchInput) {
          faqSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            faqSearchInput.focus();
            faqSearchInput.select();
          }, 200);
        } else {
          const faqSection = document.getElementById('faqs') || document.getElementById('faq');
          if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      // '/' to focus package search
      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          '#packages input[type="text"], #umrah input[type="text"], input[type="text"][placeholder*="Search" i], input[type="text"][placeholder*="খুঁজুন"]'
        );
        if (searchInput) {
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            searchInput.focus();
            searchInput.select();
          }, 200);
        }
      }

      // 'd' or 'D' to toggle dark mode
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        toggleDarkMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreRegOpen, selectedPackageForModal, isStaffPortalOpen, isPrintModalOpen, isWalkthroughOpen]);

  // Notice Banner state (with LocalStorage persistence)
  const defaultNotice: NoticeItem = {
    id: 'default-notice',
    textEn: '📢 Hajj 2026–2027 Pre-Registration is Active! Priority allocation available at our Naya Paltan office.',
    textBn: '📢 হজ ২০২৬–২০২৭ এর সরকারি প্রাক-নিবন্ধন চলছে! অগ্রাধিকার ভিত্তিতে বুকিং করতে যোগাযোগ করুন।',
    active: true,
    type: 'urgent',
    date: new Date().toISOString(),
  };

  const [notice, setNotice] = useState<NoticeItem | null>(() => {
    try {
      const saved = localStorage.getItem('mask_live_notice');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultNotice;
  });

  const handleOpenPreReg = (packageName?: string) => {
    setPreRegPackage(packageName);
    setIsPreRegOpen(true);
  };

  const handleOpenPrintDialog = (
    pkg?: PackageItem,
    tab?: 'selectedPkg' | 'full' | 'packages' | 'planner' | 'checklist' | 'faqs',
    faqs?: any[]
  ) => {
    if (pkg) {
      setSelectedPackageForPrint(pkg);
      setPrintModalTab('selectedPkg');
    } else if (tab) {
      setSelectedPackageForPrint(null);
      setPrintModalTab(tab);
    } else {
      setSelectedPackageForPrint(null);
      setPrintModalTab('full');
    }
    setCustomFaqsForPrint(faqs);
    setIsPrintModalOpen(true);
  };

  const handleSaveNotice = (newNotice: NoticeItem | null) => {
    setNotice(newNotice);
    try {
      if (newNotice) {
        localStorage.setItem('mask_live_notice', JSON.stringify(newNotice));
      } else {
        localStorage.removeItem('mask_live_notice');
      }
    } catch {
      // ignore
    }
  };

  const handleDismissNotice = () => {
    if (notice) {
      setNotice({ ...notice, active: false });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200 ${lang === 'bn' ? 'font-bn' : ''}`}>
      {/* Dynamic Scroll Reading Progress Bar */}
      <ReadingProgressBar />

      {/* 1. Live Urgent Notice Banner */}
      <NoticeBanner
        lang={lang}
        notice={notice}
        onDismiss={handleDismissNotice}
      />

      {/* 2. Top Bar */}
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenPortal={() => setIsStaffPortalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* 3. Main Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenPreReg={handleOpenPreReg}
      />

      {/* Print-Only Official Agency Letterhead */}
      <div className="print-only-header text-slate-900">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">MASK HAJJ GROUP</h1>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              Govt. Approved Ministry Licence No. 15630 • IATA Accredited Agent
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              67/1 Naya Paltan, China Town (East Tower), Suite-21/2, Dhaka-1000 • Hotline: +88 01711-258708
            </p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <div className="font-bold">Official Package Brochure</div>
            <div>Season 2026–2027</div>
            <div className="text-[10px] text-slate-400 mt-1">Printed from maskhajj.com.bd</div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 4. Hero Section */}
        <HeroSection
          lang={lang}
          onOpenPreReg={handleOpenPreReg}
          onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
          onOpenPrintModal={() => handleOpenPrintDialog()}
        />

        {/* 5. Trust & Accreditations Strip */}
        <TrustBadges lang={lang} />

        {/* 6. About Section */}
        <AboutSection
          lang={lang}
          onOpenPreReg={() => handleOpenPreReg('General Inquiry')}
        />

        {/* 7. Core Services Grid */}
        <ServicesGrid
          lang={lang}
          onSelectService={(svc) => handleOpenPreReg(svc)}
        />

        {/* 8. Hajj Packages */}
        <HajjPackagesSection
          lang={lang}
          onOpenPreReg={handleOpenPreReg}
          onViewPackageDetails={(pkg) => setSelectedPackageForModal(pkg)}
          onSharePackage={handleOpenShare}
          comparedPackageIds={comparedPackages.map((p) => p.id)}
          onToggleCompare={handleToggleCompare}
        />

        {/* 9. Umrah Packages & Departure Calendar */}
        <UmrahPackagesSection
          lang={lang}
          onOpenPreReg={handleOpenPreReg}
          onViewPackageDetails={(pkg) => setSelectedPackageForModal(pkg)}
          onSharePackage={handleOpenShare}
          comparedPackageIds={comparedPackages.map((p) => p.id)}
          onToggleCompare={handleToggleCompare}
        />

        {/* 10. Interactive Cost Estimator & Packing Checklist */}
        <PilgrimTools
          lang={lang}
          onOpenPreReg={handleOpenPreReg}
          onOpenPrintModal={handleOpenPrintDialog}
          onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        />

        {/* 12. Why Choose Us (Value Pillars) */}
        <WhyChooseUs lang={lang} />

        {/* 13. Testimonials & Google Reviews */}
        <TestimonialsSection lang={lang} />

        {/* 14. FAQs Accordion */}
        <FaqSection
          lang={lang}
          onOpenPreReg={() => handleOpenPreReg('FAQ Question Inquiry')}
          onOpenPrintModal={(tab, faqs) => handleOpenPrintDialog(undefined, tab as any, faqs)}
        />

        {/* 15. Direct Consultation Form */}
        <ConsultationSection lang={lang} />

        {/* 16. Authentic Guidance Blog */}
        <BlogSection lang={lang} />

        {/* 17. Interactive Map & Pre-Footer Callout */}
        <MapAndCtaSection lang={lang} />
      </main>

      {/* 18. Footer */}
      <Footer lang={lang} />

      {/* Floating Package Comparison Toolbar */}
      <PackageCompareBar
        selectedPackages={comparedPackages}
        lang={lang}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onRemovePackage={handleRemoveCompare}
        onClearAll={handleClearCompare}
      />

      {/* Modals and Floating Action Widgets */}
      <PreRegModal
        isOpen={isPreRegOpen}
        onClose={() => setIsPreRegOpen(false)}
        lang={lang}
        initialPackage={preRegPackage}
      />

      <PackageDetailModal
        lang={lang}
        pkg={selectedPackageForModal}
        onClose={() => setSelectedPackageForModal(null)}
        onBookNow={(pkgName) => {
          setSelectedPackageForModal(null);
          handleOpenPreReg(pkgName);
        }}
        onOpenPrintModal={(pkg) => {
          setSelectedPackageForModal(null);
          handleOpenPrintDialog(pkg);
        }}
      />

      <PackageShareModal
        lang={lang}
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSharePackage(null);
        }}
        pkg={sharePackage}
      />

      <PackageCompareModal
        lang={lang}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        packages={comparedPackages}
        onRemovePackage={handleRemoveCompare}
        onClearAll={handleClearCompare}
        onBookPackage={(pkgName) => {
          setIsCompareModalOpen(false);
          handleOpenPreReg(pkgName);
        }}
      />

      <PrintSummaryModal
        lang={lang}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        selectedPackage={selectedPackageForPrint}
        initialTab={printModalTab}
        customFaqs={customFaqsForPrint}
      />

      <PilgrimageWalkthroughModal
        lang={lang}
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onOpenPreReg={handleOpenPreReg}
      />

      <StaffPortalModal
        isOpen={isStaffPortalOpen}
        onClose={() => setIsStaffPortalOpen(false)}
        lang={lang}
        currentNotice={notice}
        onSaveNotice={handleSaveNotice}
      />

      <FloatingActions
        lang={lang}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        onOpenPrintModal={() => handleOpenPrintDialog()}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}


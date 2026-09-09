import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Star,
  Sparkles,
  Eye,
  MessageCircle,
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Share2,
  CheckSquare,
  Square,
  Tag,
  History,
  Trash2,
  Users,
  Flame,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Language, PackageItem } from '../types';
import { hajjPackages } from '../data/hajjPackages';
import { localizeDuration, localizeSeason, localizeNumber, toBengaliNumber } from '../utils/dateFormatter';
import { PackageCardSkeleton } from './skeletons/PackageCardSkeleton';
import {
  getSearchHistory,
  addSearchHistory,
  clearSearchHistory,
  removeSearchHistoryItem,
} from '../utils/searchHistory';

interface HajjPackagesSectionProps {
  lang: Language;
  onOpenPreReg: (pkgName: string) => void;
  onViewPackageDetails: (pkg: PackageItem) => void;
  onSharePackage?: (pkg: PackageItem) => void;
  comparedPackageIds?: string[];
  onToggleCompare?: (pkg: PackageItem) => void;
}

type PriceRange = 'all' | 'under600k' | '600kTo1m' | 'above1m';
type SortOption = 'recommended' | 'priceLowHigh' | 'priceHighLow' | 'duration' | 'durationDesc';

export const HajjPackagesSection: React.FC<HajjPackagesSectionProps> = ({
  lang,
  onOpenPreReg,
  onViewPackageDetails,
  onSharePackage,
  comparedPackageIds = [],
  onToggleCompare,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'budget' | 'economy' | 'standard' | 'vip'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isLoading, setIsLoading] = useState(true);

  // Search History State
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  // Initial skeleton simulation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Close search history dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (query: string) => {
    if (query.trim().length >= 2) {
      const updated = addSearchHistory(query.trim());
      setSearchHistory(updated);
    }
  };

  const handleSelectHistoryKeyword = (keyword: string) => {
    setSearchQuery(keyword);
    handleSearchSubmit(keyword);
    setIsSearchFocused(false);
  };

  const handleRemoveHistoryItem = (e: React.MouseEvent, keyword: string) => {
    e.stopPropagation();
    const updated = removeSearchHistoryItem(keyword);
    setSearchHistory(updated);
  };

  const handleClearAllHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearSearchHistory();
    setSearchHistory([]);
  };

  const handleFilterChange = (filter: 'all' | 'budget' | 'economy' | 'standard' | 'vip') => {
    setActiveFilter(filter);
    setSelectedTag(null);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setActiveFilter('all');
    }
  };

  const clearFilters = () => {
    setActiveFilter('all');
    setSelectedTag(null);
    setSearchQuery('');
    setPriceRange('all');
    setSortBy('recommended');
  };

  const filteredPackages = hajjPackages
    .filter((pkg) => {
      // Category filter
      if (activeFilter === 'vip') {
        if (pkg.category !== 'vip' && pkg.category !== 'vvip') return false;
      } else if (activeFilter !== 'all' && pkg.category !== activeFilter) {
        return false;
      }

      // Tag filter
      if (selectedTag) {
        const hasTagEn = pkg.categoryTagsEn?.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
        const hasTagBn = pkg.categoryTagsBn?.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
        if (!hasTagEn && !hasTagBn) return false;
      }

      // Price range filter
      if (priceRange === 'under600k' && pkg.priceNumeric > 600000) return false;
      if (priceRange === '600kTo1m' && (pkg.priceNumeric < 600000 || pkg.priceNumeric > 1000000)) return false;
      if (priceRange === 'above1m' && pkg.priceNumeric < 1000000) return false;

      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = pkg.nameEn.toLowerCase().includes(query) || pkg.nameBn.toLowerCase().includes(query);
        const matchBadge = pkg.badgeEn.toLowerCase().includes(query) || pkg.badgeBn.toLowerCase().includes(query);
        const matchHotel =
          pkg.hotelMakkahEn.toLowerCase().includes(query) ||
          pkg.hotelMakkahBn.toLowerCase().includes(query) ||
          pkg.hotelMadinahEn.toLowerCase().includes(query) ||
          pkg.hotelMadinahBn.toLowerCase().includes(query);
        const matchSummary =
          pkg.itinerarySummaryEn.toLowerCase().includes(query) || pkg.itinerarySummaryBn.toLowerCase().includes(query);
        const matchHighlights =
          pkg.highlightsEn.some((h) => h.toLowerCase().includes(query)) ||
          pkg.highlightsBn.some((h) => h.toLowerCase().includes(query));
        const matchTags =
          pkg.categoryTagsEn?.some((t) => t.toLowerCase().includes(query)) ||
          pkg.categoryTagsBn?.some((t) => t.toLowerCase().includes(query));

        if (!matchName && !matchBadge && !matchHotel && !matchSummary && !matchHighlights && !matchTags) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priceLowHigh') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'priceHighLow') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'duration') {
        const getDurDays = (dur: string) => parseInt(dur.match(/\d+/)?.[0] || '0', 10);
        return getDurDays(a.durationEn) - getDurDays(b.durationEn);
      }
      if (sortBy === 'durationDesc') {
        const getDurDays = (dur: string) => parseInt(dur.match(/\d+/)?.[0] || '0', 10);
        return getDurDays(b.durationEn) - getDurDays(a.durationEn);
      }
      return 0; // Default recommended order
    });

  // Helper to render availability badge
  const renderAvailabilityBadge = (pkg: PackageItem) => {
    const availability = pkg.availability || 'open';
    const badgeText = lang === 'en' ? pkg.availabilityBadgeEn : pkg.availabilityBadgeBn;

    if (availability === 'limited') {
      return (
        <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          <Flame className="w-3 h-3 text-amber-600 dark:text-amber-400 fill-amber-500 animate-pulse" />
          <span>{badgeText || (lang === 'en' ? 'Limited Seats' : 'সীমিত আসন')}</span>
        </div>
      );
    }

    if (availability === 'fast_filling') {
      return (
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
          <span>{badgeText || (lang === 'en' ? 'Filling Fast' : 'দ্রুত পূরণ হচ্ছে')}</span>
        </div>
      );
    }

    if (availability === 'sold_out') {
      return (
        <div className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          <span>{badgeText || (lang === 'en' ? 'Sold Out' : 'আসন পূর্ণ')}</span>
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
        <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        <span>{badgeText || (lang === 'en' ? 'Open for Registration' : 'নিবন্ধন উন্মুক্ত')}</span>
      </div>
    );
  };

  return (
    <section id="packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {lang === 'en'
            ? `Hajj ${localizeSeason('2026–2027', lang)} Caravans`
            : `হজ ${localizeSeason('2026–2027', lang)} কাফেলা`}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
          {lang === 'en' ? 'Hajj Packages' : 'হজ প্যাকেজসমূহ'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          {lang === 'en'
            ? 'Pre-registration currently open • Transparent pricing • Choose the journey that fits you best'
            : 'প্রাক-নিবন্ধন চলছে • কোনো গোপন খরচ নেই • আপনার প্রয়োজন অনুযায়ী সেরা প্যাকেজ বেছে নিন'}
        </p>
      </div>

      {/* Real-time Search & Filter Toolbar */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 soft-shadow mb-8 relative">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3.5 justify-between">
          {/* Keyword Search Bar with History Dropdown */}
          <div ref={searchContainerRef} className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit(searchQuery);
                  setIsSearchFocused(false);
                }
              }}
              placeholder={
                lang === 'en'
                  ? 'Search by hotel, budget, VIP, duration or features...'
                  : 'হোটেল, বাজেট, ভিআইপি, মেয়াদ বা সুবিধা লিখে খুঁজুন...'
              }
              className="w-full pl-9 pr-14 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer z-10"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 shadow-2xs pointer-events-none">
                /
              </kbd>
            )}

            {/* Search History Dropdown / Floating Pills */}
            {isSearchFocused && searchHistory.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-3 z-30 animate-in fade-in-50">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-400 mb-2 px-1">
                  <div className="flex items-center gap-1">
                    <History className="w-3 h-3 text-blue-500" />
                    <span>{lang === 'en' ? 'Recent Searches' : 'সাম্প্রতিক অনুসন্ধান'}</span>
                  </div>
                  <button
                    onClick={handleClearAllHistory}
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 font-semibold transition cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{lang === 'en' ? 'Clear All' : 'সব মুছুন'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {searchHistory.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectHistoryKeyword(item)}
                      className="group flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 border border-slate-200/80 dark:border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveHistoryItem(e, item)}
                        className="text-slate-400 group-hover:text-rose-500 p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        title={lang === 'en' ? 'Remove search term' : 'মুছে ফেলুন'}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold flex-shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Price:' : 'বাজেট:'}</span>
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRange)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="all">{lang === 'en' ? 'All Budgets' : 'সকল বাজেট'}</option>
              <option value="under600k">
                {lang === 'en' ? 'Under ৳ 6,00,000' : '৳ ৬,০০,০০০ এর নিচে'}
              </option>
              <option value="600kTo1m">
                {lang === 'en' ? '৳ 6,00,000 – ৳ 10,00,000' : '৳ ৬,০০,০০০ – ১০,০০,০০০'}
              </option>
              <option value="above1m">
                {lang === 'en' ? 'Above ৳ 10,00,000 (VIP)' : '৳ ১০,০০,০০০+ (ভিআইপি)'}
              </option>
            </select>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold flex-shrink-0 ml-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'en' ? 'Sort:' : 'সাজান:'}</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="recommended">{lang === 'en' ? 'Recommended' : 'প্রস্তাবিত'}</option>
              <option value="priceLowHigh">{lang === 'en' ? 'Price: Low to High' : 'মূল্য: কম থেকে বেশি'}</option>
              <option value="priceHighLow">{lang === 'en' ? 'Price: High to Low' : 'মূল্য: বেশি থেকে কম'}</option>
              <option value="duration">{lang === 'en' ? 'Duration: Short to Long' : 'মেয়াদ: কম থেকে বেশি'}</option>
              <option value="durationDesc">{lang === 'en' ? 'Duration: Long to Short' : 'মেয়াদ: বেশি থেকে কম'}</option>
            </select>
          </div>
        </div>

        {/* Quick Search History Pill Bar (When not focused, for rapid access) */}
        {searchHistory.length > 0 && !isSearchFocused && !searchQuery && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1">
              <History className="w-3 h-3" />
              <span>{lang === 'en' ? 'Recent:' : 'সাম্প্রতিক:'}</span>
            </span>
            {searchHistory.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(item)}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 border border-slate-200/80 dark:border-slate-700 px-2 py-0.5 rounded-md text-[11px] font-semibold transition cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Category Pills & Result Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-700/70">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'all' && !selectedTag
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'en' ? 'All Packages' : 'সকল প্যাকেজ'}
            </button>
            <button
              onClick={() => handleFilterChange('budget')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'budget'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'en' ? 'Budget Saver' : 'সাশ্রয়ী'}
            </button>
            <button
              onClick={() => handleFilterChange('economy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'economy'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'en' ? 'Economy' : 'ইকোনমি'}
            </button>
            <button
              onClick={() => handleFilterChange('standard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'standard'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'en' ? '★ Standard' : '★ স্ট্যান্ডার্ড'}
            </button>
            <button
              onClick={() => handleFilterChange('vip')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'vip'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'en' ? 'VIP & Royal Luxury' : 'ভিআইপি ও লাক্সারি'}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            {selectedTag && (
              <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                <Tag className="w-3 h-3" />
                <span>Tag: {selectedTag}</span>
                <button onClick={() => setSelectedTag(null)} className="hover:text-blue-950 dark:hover:text-white ml-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <span>
              {lang === 'en'
                ? `Showing ${filteredPackages.length} of ${hajjPackages.length} packages`
                : `${localizeNumber(hajjPackages.length, lang)}টির মধ্যে ${localizeNumber(filteredPackages.length, lang)}টি প্যাকেজ দেখানো হচ্ছে`}
            </span>
            {(searchQuery || priceRange !== 'all' || activeFilter !== 'all' || selectedTag || sortBy !== 'recommended') && (
              <button
                onClick={clearFilters}
                className="text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
              >
                {lang === 'en' ? 'Reset Filters' : 'ফিল্টার রিসেট'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Package Cards Grid or Loading Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <PackageCardSkeleton count={4} />
        ) : filteredPackages.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'en' ? 'No Hajj Packages Match Your Search' : 'আপনার পছন্দের কোনো হজ প্যাকেজ খুঁজে পাওয়া যায়নি'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              {lang === 'en'
                ? 'Try adjusting your search query, price filter, or clear filters to view all available Hajj packages.'
                : 'অন্য কি-ওয়ার্ড বা বাজেট ফিল্টার পরিবর্তন করে চেষ্টা করুন অথবা সকল প্যাকেজ দেখতে রিসেট করুন।'}
            </p>
            <button
              onClick={clearFilters}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
            >
              {lang === 'en' ? 'Show All Packages' : 'সকল প্যাকেজ দেখুন'}
            </button>
          </div>
        ) : (
          filteredPackages.map((pkg) => {
            const isPop = pkg.isPopular;
            const isVip = pkg.category === 'vip' || pkg.category === 'vvip';
            const isCompared = comparedPackageIds.includes(pkg.id);
            const categoryTags = lang === 'en' ? (pkg.categoryTagsEn || []) : (pkg.categoryTagsBn || []);

            return (
              <div
                key={pkg.id}
                className={`bg-white dark:bg-slate-800/90 rounded-3xl p-6 border flex flex-col justify-between soft-shadow transition-all duration-300 relative group hover:scale-[1.025] hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(59,130,246,0.22)] dark:hover:shadow-[0_0_25px_rgba(96,165,250,0.28)] ${
                  isCompared
                    ? 'border-2 border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20'
                    : isPop
                    ? 'border-2 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/10 hover:border-blue-500'
                    : isVip
                    ? 'border-purple-200 dark:border-purple-800/80 hover:border-purple-500'
                    : 'border-slate-200/80 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              >
                {/* Popular / VIP Corner Badge */}
                {isPop && (
                  <div className="absolute -top-3.5 right-6 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{lang === 'en' ? '★ Most Popular' : '★ সেরা পছন্দ'}</span>
                  </div>
                )}

                {pkg.category === 'vvip' && (
                  <div className="absolute -top-3.5 right-6 bg-slate-900 dark:bg-purple-900 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1 border border-amber-400/30">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{lang === 'en' ? 'Royal Platinum' : 'রয়েল প্ল্যাটিনাম'}</span>
                  </div>
                )}

                <div>
                  {/* Top Bar: Category pill + Compare Checkbox */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide inline-block ${
                        isPop
                          ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300'
                          : isVip
                          ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {lang === 'en' ? pkg.badgeEn : pkg.badgeBn}
                    </span>

                    {/* Compare Checkbox */}
                    {onToggleCompare && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompare(pkg);
                        }}
                        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg transition cursor-pointer ${
                          isCompared
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title={lang === 'en' ? 'Select to compare' : 'তুলনা করতে নির্বাচন করুন'}
                      >
                        {isCompared ? (
                          <CheckSquare className="w-3.5 h-3.5" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                        <span>{lang === 'en' ? 'Compare' : 'তুলনা'}</span>
                      </button>
                    )}
                  </div>

                  {/* Availability Badge Indicator */}
                  <div className="mb-2.5">
                    {renderAvailabilityBadge(pkg)}
                  </div>

                  {/* Clickable Category Tags */}
                  {categoryTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      {categoryTags.map((tag, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagClick(tag);
                          }}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition cursor-pointer ${
                            selectedTag === tag
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                          }`}
                          title={lang === 'en' ? `Filter by ${tag}` : `${tag} দিয়ে ফিল্টার করুন`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                    {lang === 'en' ? pkg.nameEn : pkg.nameBn}
                  </h3>

                  <div className="text-xs text-slate-400 dark:text-slate-400 font-medium mb-3">
                    {localizeDuration(lang === 'en' ? pkg.durationEn : pkg.durationBn, lang)}
                  </div>

                  {/* Price Display */}
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-4 tracking-tight font-mono">
                    {lang === 'en' ? pkg.priceEn : pkg.priceBn}
                  </div>

                  {/* Key Bullet Highlights */}
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/80 pt-4">
                    {(lang === 'en' ? pkg.highlightsEn : pkg.highlightsBn).slice(0, 4).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenPreReg(lang === 'en' ? pkg.nameEn : pkg.nameBn)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-center bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition cursor-pointer"
                    >
                      {lang === 'en' ? 'Enquire / Book' : 'বুকিং আবেদন'}
                    </button>

                    <button
                      onClick={() => onViewPackageDetails(pkg)}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition cursor-pointer flex-shrink-0 border border-slate-200/80 dark:border-slate-700"
                      title={lang === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {onSharePackage && (
                      <button
                        onClick={() => onSharePackage(pkg)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition cursor-pointer flex-shrink-0 border border-slate-200/80 dark:border-slate-700"
                        title={lang === 'en' ? 'Share Package' : 'প্যাকেজ শেয়ার করুন'}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

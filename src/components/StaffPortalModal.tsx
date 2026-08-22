import React, { useState } from 'react';
import { X, Lock, CheckCircle2, Megaphone, Key, LogOut, TrendingUp, BarChart3, Users, Eye, Sparkles, Flame } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Language, NoticeItem } from '../types';

interface StaffPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentNotice: NoticeItem | null;
  onSaveNotice: (notice: NoticeItem | null) => void;
}

// Sample inquiry dataset aggregated by package
const PACKAGE_INQUIRY_DATA = [
  { nameEn: 'VIP Platinum Hajj', nameBn: 'ভিআইপি প্লাটিনাম হজ', inquiries: 142, bookings: 38, fillRate: 95, color: '#3b82f6' },
  { nameEn: 'Economy Saver Hajj', nameBn: 'ইকোনমি সেভার হজ', inquiries: 215, bookings: 84, fillRate: 100, color: '#10b981' },
  { nameEn: 'Executive Shifting', nameBn: 'এক্সিকিউটিভ শিফটিং হজ', inquiries: 98, bookings: 24, fillRate: 80, color: '#f59e0b' },
  { nameEn: 'Ramadan 15D Umrah', nameBn: 'রমজান ১৫ দিন ওমরাহ', inquiries: 186, bookings: 62, fillRate: 90, color: '#8b5cf6' },
  { nameEn: 'Standard Family Umrah', nameBn: 'স্ট্যান্ডার্ড ফ্যামিলি ওমরাহ', inquiries: 124, bookings: 45, fillRate: 75, color: '#ec4899' },
  { nameEn: 'Express 7D Umrah', nameBn: 'এক্সপ্রেস ৭ দিন ওমরাহ', inquiries: 76, bookings: 29, fillRate: 60, color: '#06b6d4' },
];

export const StaffPortalModal: React.FC<StaffPortalModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentNotice,
  onSaveNotice,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'broadcast'>('analytics');
  const [noticeEn, setNoticeEn] = useState(
    currentNotice?.textEn || 'Hajj 2026–2027 Pre-Registration is now open! Limited slots available.'
  );
  const [noticeBn, setNoticeBn] = useState(
    currentNotice?.textBn || 'হজ ২০২৬–২০২৭ এর প্রাক-নিবন্ধন চলছে! সীমিত আসন সংখ্যা।'
  );
  const [isActive, setIsActive] = useState(currentNotice ? currentNotice.active : true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === 'staff123' || pin.trim() === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg(lang === 'en' ? 'Incorrect PIN! Try "admin123" or "staff123"' : 'ভুল পিন নম্বর! (admin123 বা staff123 ব্যবহার করুন)');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: NoticeItem = {
      id: 'staff-notice-' + Date.now(),
      textEn: noticeEn,
      textBn: noticeBn,
      active: isActive,
      type: 'urgent',
      date: new Date().toISOString(),
    };
    onSaveNotice(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleDisableNotice = () => {
    onSaveNotice(null);
    setIsActive(false);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    onClose();
  };

  const totalInquiries = PACKAGE_INQUIRY_DATA.reduce((acc, curr) => acc + curr.inquiries, 0);
  const totalBookings = PACKAGE_INQUIRY_DATA.reduce((acc, curr) => acc + curr.bookings, 0);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-backdrop-fade">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-6 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white animate-modal-slide-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
              {lang === 'en' ? 'Staff & Admin Portal' : 'অফিস স্টাফ ও অ্যাডমিন প্যানেল'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1 mb-6">
              {lang === 'en'
                ? 'Enter PIN to view Package Popularity analytics and broadcast urgent notices.'
                : 'প্যাকেজের চাহিদা বিশ্লেষণ ও জরুরি নোটিশ প্রচার করতে পিন কোড দিন (যেমন: admin123)'}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'en' ? 'Security PIN Code' : 'সিকিউরিটি পিন কোড'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="Enter PIN (admin123)"
                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:bg-slate-800"
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
                {errorMsg && <p className="text-[11px] text-red-500 mt-1 font-semibold">{errorMsg}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'en' ? 'Unlock Portal' : 'লগইন করুন'}</span>
              </button>

              <div className="text-[10px] text-slate-400 dark:text-slate-400 text-center">
                Hint: Use <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-slate-600 dark:text-slate-300">admin123</code> or <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-slate-600 dark:text-slate-300">staff123</code>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Header & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 pr-10">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{lang === 'en' ? 'Staff Command & Analytics' : 'স্টাফ ম্যানেজমেন্ট ও অ্যানালিটিক্স'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'en' ? 'Real-time pilgrim inquiry metrics and live announcement manager.' : 'রিয়েল-টাইম প্যাকেজ আগ্রহ ও লাইভ নোটিশ নিয়ন্ত্রণ।'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Tab Switcher */}
                <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                      activeTab === 'analytics'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Popularity Chart' : 'চাহিদা চার্ট'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('broadcast')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                      activeTab === 'broadcast'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Live Notice' : 'জরুরি নোটিশ'}</span>
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-xs text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TAB 1: Package Popularity Recharts Visualization */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                
                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {lang === 'en' ? 'Total Inquiries' : 'মোট অনুসন্ধান'}
                    </span>
                    <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                      {totalInquiries}
                    </div>
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> +18% this month
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {lang === 'en' ? 'Pre-Bookings' : 'কনফার্ম বুকিং'}
                    </span>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      {totalBookings}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      ~34% conversion rate
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {lang === 'en' ? 'Top Demand Package' : 'সর্বোচ্চ চাহিদাসম্পন্ন'}
                    </span>
                    <div className="text-sm font-black text-amber-600 dark:text-amber-400 truncate mt-0.5 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Economy Saver Hajj</span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      215 Inquiries (100% capacity)
                    </span>
                  </div>
                </div>

                {/* Recharts Bar Chart Container */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                        {lang === 'en' ? 'Package Popularity & Inquiry Volume' : 'প্যাকেজ অনুযায়ী গ্রাহক অনুসন্ধানের পরিমাণ'}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {lang === 'en' ? 'Inquiry and booking intent counts recorded via website & hotline' : 'ওয়েবসাইট ও হটলাইনে প্রাপ্ত অনুসন্ধান ও বুকিং আগ্রহের সংখ্যা'}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      Live Recharts
                    </span>
                  </div>

                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={PACKAGE_INQUIRY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis
                          dataKey={lang === 'en' ? 'nameEn' : 'nameBn'}
                          interval={0}
                          tick={({ x, y, payload }) => (
                            <g transform={`translate(${x},${y})`}>
                              <text
                                x={0}
                                y={0}
                                dy={12}
                                textAnchor="end"
                                fill="#94a3b8"
                                transform="rotate(-25)"
                                fontSize={10}
                                fontWeight={600}
                              >
                                {payload.value.length > 15 ? payload.value.slice(0, 15) + '...' : payload.value}
                              </text>
                            </g>
                          )}
                        />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1">
                                  <div className="font-bold text-amber-300">
                                    {lang === 'en' ? data.nameEn : data.nameBn}
                                  </div>
                                  <div className="text-slate-300">
                                    Inquiries: <strong className="text-white font-mono">{data.inquiries}</strong>
                                  </div>
                                  <div className="text-slate-300">
                                    Bookings: <strong className="text-emerald-400 font-mono">{data.bookings}</strong>
                                  </div>
                                  <div className="text-[10px] text-blue-400">
                                    Slot Fill Rate: {data.fillRate}%
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="inquiries" radius={[6, 6, 0, 0]}>
                          {PACKAGE_INQUIRY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Live Notice Broadcast */}
            {activeTab === 'broadcast' && (
              <div>
                {savedSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {lang === 'en' ? 'Announcement Updated Successfully!' : 'নোটিশ সফলভাবে সংরক্ষিত ও লাইভ হয়েছে!'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'en' ? 'Notice Text (English)' : 'নোটিশের বিবরণ (ইংরেজি)'}
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={noticeEn}
                        onChange={(e) => setNoticeEn(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:bg-slate-800"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'en' ? 'Notice Text (Bangla)' : 'নোটিশের বিবরণ (বাংলা)'}
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={noticeBn}
                        onChange={(e) => setNoticeBn(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:bg-slate-800"
                      ></textarea>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {lang === 'en' ? 'Keep Banner Visible on Website Header' : 'ওয়েবসাইটের শীর্ষে ব্যানার প্রদর্শন সক্রিয় রাখুন'}
                      </span>
                    </label>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-sm transition cursor-pointer"
                      >
                        {lang === 'en' ? 'Save & Publish Live' : 'লাইভ সেভ করুন'}
                      </button>
                      <button
                        type="button"
                        onClick={handleDisableNotice}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-3 rounded-xl transition cursor-pointer"
                      >
                        {lang === 'en' ? 'Clear' : 'মুছে ফেলুন'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

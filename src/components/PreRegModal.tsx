import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface PreRegModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialPackage?: string;
}

export const PreRegModal: React.FC<PreRegModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialPackage,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pkg, setPkg] = useState('Hajj 2026–2027 (Pre-Register)');
  const [pilgrims, setPilgrims] = useState('1');
  const [forwardWhatsApp, setForwardWhatsApp] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialPackage) {
      setPkg(initialPackage);
    }
  }, [initialPackage]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (forwardWhatsApp) {
      const msg = `*Pre-registration / Consultation Request*\n*Name:* ${name}\n*Phone:* ${phone}\n*Package:* ${pkg}\n*Pilgrims:* ${pilgrims}\n*Date:* ${new Date().toLocaleDateString()}`;
      const url = `https://wa.me/8801711258708?text=${encodeURIComponent(msg)}`;
      setTimeout(() => {
        window.open(url, '_blank');
      }, 500);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-backdrop-fade">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 dark:border-slate-800 animate-modal-slide-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'en' ? 'Pre-Registration Submitted!' : 'প্রাক-নিবন্ধন সফল হয়েছে!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'en'
                ? `Alhamdulillah! We have logged your request for "${pkg}". Our senior Hajj coordinator will contact you at ${phone}.`
                : `আলহামদুলিল্লাহ! "${pkg}" এর জন্য আপনার আবেদন সংরক্ষিত হয়েছে। আমাদের সিনিয়র কর্মকর্তা দ্রুত আপনার সাথে যোগাযোগ করবেন।`}
            </p>
            <button
              onClick={handleReset}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
            >
              {lang === 'en' ? 'Done' : 'সম্পন্ন'}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                {lang === 'en' ? 'Ministry Verified Process' : 'সরকারি নিয়ম মেনে প্রাক-নিবন্ধন'}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2">
                {lang === 'en' ? 'Pre-Register for Hajj & Umrah' : 'হজ ও ওমরাহ প্রাক-নিবন্ধন'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'en'
                  ? 'Limited caravan slots. Get priority package allocation and a free 1-on-1 advisor consultation.'
                  : 'সীমিত আসন সংখ্যা। এখনই তথ্য জমা দিয়ে অগ্রাধিকার ও ফ্রি পরামর্শ গ্রহণ করুন।'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'en' ? 'Full Name *' : 'আপনার পুরো নাম *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Al-Haj Abdullah Rahman' : 'আপনার নাম লিখুন'}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'en' ? 'Mobile / WhatsApp Number *' : 'মোবাইল / হোয়াটসঅ্যাপ নম্বর *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'en' ? 'Package Interested' : 'পছন্দের প্যাকেজ'}
                  </label>
                  <select
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value)}
                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:bg-slate-800 font-medium cursor-pointer"
                  >
                    <option value="Hajj 2026–2027 (Pre-Register)">Hajj 2026–2027 (Pre-Register)</option>
                    <option value="সাশ্রয়ী ফুল প্যাকেজ (৳ ৫,১৩,৬৪৮)">সাশ্রয়ী ফুল প্যাকেজ (৳ ৫,১৩,৬৪৮)</option>
                    <option value="ইকোনমি প্যাকেজ (৳ ৫,৪০,০০০)">ইকোনমি প্যাকেজ (৳ ৫,৪০,০০০)</option>
                    <option value="স্ট্যান্ডার্ড প্যাকেজ (৳ ৬,৪০,০০০)">স্ট্যান্ডার্ড প্যাকেজ (৳ ৬,৪০,০০০)</option>
                    <option value="ভি. আই. পি প্যাকেজ (৳ ৯,৯৫,০০০)">ভি. আই. পি প্যাকেজ (৳ ৯,৯৫,০০০)</option>
                    <option value="ভি. ভি. আই. পি রয়েল প্যাকেজ (৳ ১৯,৫০,০০০)">ভি. ভি. আই. পি প্যাকেজ (৳ ১৯,৫০,০০০)</option>
                    <option value="August/September Umrah (৳ ১৬০,০০০)">August/September Umrah (৳ ১৬০,০০০)</option>
                    <option value="Umrah Express (৳ ১৬৫,০০০)">Umrah Express (৳ ১৬৫,০০০)</option>
                    <option value="Umrah Comfort Family (৳ ২১৫,০০০)">Umrah Comfort Family (৳ ২১৫,০০০)</option>
                    <option value="Umrah Royal 5★ (৳ ৩২৫,০০০)">Umrah Royal 5★ (৳ ৩২৫,০০০)</option>
                    <option value="Custom Family Package">Custom Family Package</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'en' ? 'No. of Persons' : 'যাত্রীর সংখ্যা'}
                  </label>
                  <select
                    value={pilgrims}
                    onChange={(e) => setPilgrims(e.target.value)}
                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:bg-slate-800 font-medium cursor-pointer"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons (Couple/Partners)</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons (Family)</option>
                    <option value="5+">5+ Persons (Group)</option>
                  </select>
                </div>
              </div>

              {/* WhatsApp Toggle */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={forwardWhatsApp}
                  onChange={(e) => setForwardWhatsApp(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {lang === 'en'
                    ? 'Also send copy directly to MASK Hajj WhatsApp'
                    : 'একই সাথে আমাদের অফিশিয়াল হোয়াটসঅ্যাপে মেসেজ পাঠান'}
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'en' ? 'Submit Pre-Registration' : 'প্রাক-নিবন্ধন জমা দিন'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-semibold text-center cursor-pointer"
              >
                {lang === 'en' ? 'Cancel / Maybe Later' : 'বাতিল / পরে করব'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

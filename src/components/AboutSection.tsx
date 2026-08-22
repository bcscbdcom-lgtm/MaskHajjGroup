import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  HeartHandshake, 
  Shield, 
  Sparkles, 
  Award, 
  Calendar, 
  Users, 
  MessageSquare, 
  Mail, 
  Phone, 
  ExternalLink,
  ShieldCheck,
  Compass,
  GraduationCap,
  Clock
} from 'lucide-react';
import { Language, LeadershipMember } from '../types';
import { agencyLeadershipData } from '../data/leadership';
import { VerifiedCertificateModal } from './VerifiedCertificateModal';

interface AboutSectionProps {
  lang: Language;
  onOpenPreReg: (packageName?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, onOpenPreReg }) => {
  const [selectedCertMember, setSelectedCertMember] = useState<LeadershipMember | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const handleDirectInquiry = (member: LeadershipMember) => {
    const title = lang === 'en' 
      ? `Consultation with ${member.nameEn} (${member.roleEn})`
      : `${member.nameBn}-এর সাথে পরামর্শ ও সাক্ষাৎ`;
    onOpenPreReg(title);
  };

  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        
        {/* Left Decorative & Info Card */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white dark:bg-slate-800/90 p-4 rounded-3xl soft-shadow border border-slate-200/80 dark:border-slate-700 relative z-10">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center shadow-inner">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl shadow-sm flex items-center justify-center text-blue-400 text-3xl">
                <HeartHandshake className="w-9 h-9 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold text-white">
                {lang === 'en' ? 'MASK Hajj Group' : 'মাস্ক হজ গ্রুপ'}
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Dedicated to your spiritual peace, safety, and comfortable holy journey since 2005.'
                  : 'পবিত্র মক্কা ও মদিনায় হাজীদের আত্মিক প্রশান্তি ও নিখুঁত আরামদায়ক সেবায় নিবেদিত।'}
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700/80 flex items-center justify-center gap-6 text-left">
                <div>
                  <div className="text-lg font-extrabold text-blue-400 font-mono">15630</div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'en' ? 'Govt Licence' : 'সরকারি লাইসেন্স'}
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-700"></div>
                <div>
                  <div className="text-lg font-extrabold text-blue-400 font-mono">100%</div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'en' ? 'Sunnah Guided' : 'সুন্নাহ সম্মত'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Experience Badge */}
          <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 z-20">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-sm font-mono">
              11+
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {lang === 'en' ? 'Years of Excellence' : 'বছরের নির্ভরযোগ্য সেবা'}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Since 2005 in Dhaka' : '২০০৫ সাল থেকে ঢাকায়'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Descriptive Content */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            {lang === 'en' ? 'About MASK Hajj Group' : 'মাস্ক হজ গ্রুপ পরিচিতি'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            {lang === 'en'
              ? 'Guiding thousands of families to the Two Holy Mosques with honour and care.'
              : '১১+ বছর ধরে পবিত্র দুই মসজিদে পরিবারসমূহের বিশ্বস্ত ও নির্ভরযোগ্য পথপ্রদর্শক।'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-8">
            {lang === 'en'
              ? 'From the first consultation in our Dhaka office to your safe return home, we provide transparent and compassionate support for every single step of your Hajj or Umrah journey. Our caravans combine ministry-approved logistical excellence, authentic Islamic scholars, and meticulous on-ground care for senior citizens and families.'
              : 'প্রথম পরামর্শ সভা ও পাসপোর্ট জমাদান থেকে শুরু করে পবিত্র সফর সম্পন্ন করে দেশে নিরাপদে ফেরা পর্যন্ত প্রতিটি ধাপে আমরা নিশ্চিত করি নিখুঁত ও নির্ভরযোগ্য সেবা। অভিজ্ঞ আলেম ও নিবেদিত মুয়াল্লিমদের সার্বক্ষণিক দিকনির্দেশনায় পরিবার ও প্রথমবার সফরকারী হাজীদের জন্য আমাদের কাফেলা অত্যন্ত প্রশান্তিদায়ক।'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-semibold text-slate-700 dark:text-slate-200 mb-8">
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{lang === 'en' ? 'Ministry Verified Visa & Direct Flights' : 'মন্ত্রণালয় অনুমোদিত ভিসা ও সরাসরি বিমান টিকিট'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{lang === 'en' ? 'Premium Close-to-Haram Hotels' : 'হারামের কাছে উন্নতমানের হোটেল আবাসন'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{lang === 'en' ? 'In-depth Pre-departure Training' : 'হজপূর্ব বিশেষ প্রশিক্ষণ কর্মশালা ও সহীহ বই'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{lang === 'en' ? '24/7 Dedicated Mu\'allim & Doctor Team' : 'সার্বক্ষণিক অভিজ্ঞ মুয়াল্লিম ও চিকিৎসা সহায়তা'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPreReg('General Inquiry')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition cursor-pointer"
            >
              {lang === 'en' ? 'Speak with our Advisor' : 'আমাদের উপদেষ্টার সাথে কথা বলুন'}
            </button>
            <a
              href="#leadership"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Meet Agency Leadership →' : 'সংস্থার পরিচালনা পর্ষদ দেখুন →'}
            </a>
          </div>
        </div>

      </div>

      {/* Agency Leadership & Key Personnel Gallery Section */}
      <div id="leadership" className="pt-10 border-t border-slate-200/80 dark:border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Agency Leadership & Key Personnel' : 'সংস্থার পরিচালনা ও বিজ্ঞ আলেম পর্ষদ'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' 
              ? 'Experienced Leadership, Spiritual Authority & Dedicated Care'
              : 'অভিজ্ঞ পরিচালনা, শরিয়াহ বিশেষজ্ঞ ও নিবেদিত দিকনির্দেশনা'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {lang === 'en'
              ? 'Meet the seasoned scholars, healthcare practitioners, and aviation logistics directors steering every caravan with utmost integrity and Sunnah authenticity.'
              : 'হজ ও ওমরাহর প্রতিটি ধাপকে সুন্নাহসম্মত ও নিখুঁত করতে আমাদের সার্বক্ষণিক অভিজ্ঞ পরিচালক, বিজ্ঞ আলেম ও বিশেষজ্ঞ চিকিৎসকদের পরিচিতি।'}
          </p>
        </div>

        {/* Leadership Cards Grid with Staggered Entrance Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {agencyLeadershipData.map((member, index) => {
            const isHovered = hoveredMemberId === member.id;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between soft-shadow hover:shadow-xl transition-all duration-300 relative group"
              >
                <div>
                  {/* Photo Container with Hover-card / Popup Effect */}
                  <div 
                    className="relative mb-5"
                    onMouseEnter={() => setHoveredMemberId(member.id)}
                    onMouseLeave={() => setHoveredMemberId(null)}
                  >
                    <div className="relative w-full aspect-square max-h-56 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
                      <img
                        src={member.image}
                        alt={member.nameEn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/scholars/khalilur-rahman.svg';
                        }}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                      {/* Floating Experience Tag inside photo */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="bg-slate-900/85 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700/80 flex items-center gap-1 shadow-sm">
                          <Clock className="w-3 h-3" />
                          <span>{member.yearsOfService}+ {lang === 'en' ? 'Yrs Service' : 'বছরের অভিজ্ঞতা'}</span>
                        </span>

                        <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm font-mono">
                          <Users className="w-3 h-3" />
                          <span>{member.hajjCaravansLed}+ {lang === 'en' ? 'Caravans' : 'কাফেলা'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Interactive Hover-Card Popup */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-30 inset-x-2 -bottom-2 sm:-bottom-4 bg-slate-900/95 backdrop-blur-md border border-amber-400/40 text-white p-3.5 rounded-2xl shadow-2xl pointer-events-none"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-700/80 mb-2">
                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 flex items-center gap-1">
                              <Compass className="w-3 h-3" />
                              {lang === 'en' ? 'Guiding Profile & Record' : 'অভিজ্ঞতা ও খিদমত রেকর্ড'}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold">
                              {member.hajjCaravansLed}+ {lang === 'en' ? 'Hajj Groups' : 'হজ কাফেলা'}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-300 leading-tight mb-2">
                            {lang === 'en'
                              ? `${member.yearsOfService}+ continuous years serving Bangladeshi pilgrims directly in Makkah, Mina & Madinah.`
                              : `টানা ${member.yearsOfService}+ বছর ধরে মক্কা, মিনা ও মদিনায় হাজীদের সার্বক্ষণিক সেবা প্রদানে নিয়োজিত।`}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {(lang === 'en' ? member.specialtiesEn : member.specialtiesBn).slice(0, 2).map((spec, i) => (
                              <span key={i} className="text-[9px] bg-slate-800 border border-slate-700 text-slate-200 px-2 py-0.5 rounded-md font-medium">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Header & Badges */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {lang === 'en' ? member.nameEn : member.nameBn}
                      </h4>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                        {lang === 'en' ? member.roleEn : member.roleBn}
                      </p>
                    </div>

                    {/* Verified Credentials Badge (especially for Maulana Khalilur Rahman) */}
                    {member.hasVerifiedCertificate && (
                      <button
                        onClick={() => setSelectedCertMember(member)}
                        title={lang === 'en' ? 'View Official MORA Certificate' : 'মন্ত্রণালয় সনদ দেখুন'}
                        className="flex-shrink-0 bg-amber-50 dark:bg-amber-950/70 hover:bg-amber-100 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-xl transition flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>{lang === 'en' ? 'Verified Credential' : 'অনুমোদিত সনদ'}</span>
                      </button>
                    )}
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {lang === 'en' ? member.bioEn : member.bioBn}
                  </p>

                  {/* Credentials / Accreditations Bullet List */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/80 mb-5">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-blue-500" />
                      <span>{lang === 'en' ? 'Key Credentials & Certifications' : 'যোগ্যতা ও অনুমোদনসমূহ'}</span>
                    </div>
                    {(lang === 'en' ? member.credentialsEn : member.credentialsBn).slice(0, 3).map((cred, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleDirectInquiry(member)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Direct Inquiry' : 'সরাসরি পরামর্শ'}</span>
                  </button>

                  {member.hasVerifiedCertificate && (
                    <button
                      onClick={() => setSelectedCertMember(member)}
                      className="bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold p-2.5 rounded-xl transition flex items-center justify-center cursor-pointer"
                      title={lang === 'en' ? 'View Certificate' : 'সনদপত্র দেখুন'}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Official Verified Certificate Modal */}
      <VerifiedCertificateModal
        lang={lang}
        isOpen={Boolean(selectedCertMember)}
        onClose={() => setSelectedCertMember(null)}
        member={selectedCertMember}
      />
    </section>
  );
};

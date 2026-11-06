import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PackageItem, UmrahSchedule, NoticeItem } from '../types';
import { hajjPackages as hajjDefault } from '../data/hajjPackages';
import { umrahPackages as umrahDefault, upcomingUmrahSchedules as scheduleDefault } from '../data/umrahPackages';
import { LEADS_ENDPOINT } from '../config/site';
import { toBengaliNumber } from '../utils/dateFormatter';

/**
 * Google Sheet থেকে লাইভ কনটেন্ট (দাম, তারিখ, নোটিশ)।
 * শিটে বদলালে ১–২ মিনিটের মধ্যে সাইটে বদলে যায়; শিট না পেলে কোডের ডিফল্ট তথ্য দেখায়।
 * শিটের কলাম-নামগুলো docs/CONTENT_SHEET.md-এ ব্যাখ্যা করা আছে।
 */

type Row = Record<string, string>;

interface LiveContentData {
  hajjPackages: PackageItem[];
  umrahPackages: PackageItem[];
  schedules: UmrahSchedule[];
  notice: NoticeItem | null; // null = শিটে কিছু নেই → কোডের ডিফল্ট ব্যবহার হবে
  loadedFromSheet: boolean;
}

const LiveContentContext = createContext<LiveContentData>({
  hajjPackages: hajjDefault,
  umrahPackages: umrahDefault,
  schedules: scheduleDefault,
  notice: null,
  loadedFromSheet: false,
});

const yes = (v?: string) => {
  const s = (v || '').trim().toLowerCase();
  return s === '' || s === 'yes' || s === 'y' || s === 'true' || s === 'হ্যাঁ' || s === '1';
};

/** 513648 → "5,13,648" (বাংলাদেশি লাখ-গ্রুপিং) */
function formatLakh(n: number): string {
  const s = Math.round(n).toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  const parts: string[] = [];
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) parts.unshift(rest);
  return parts.join(',') + ',' + last3;
}

const AVAIL: Record<string, PackageItem['availability']> = {
  open: 'open',
  limited: 'limited',
  fast_filling: 'fast_filling',
  fast: 'fast_filling',
  sold_out: 'sold_out',
  sold: 'sold_out',
};

const DEFAULT_BADGE: Record<string, { en: string; bn: string }> = {
  open: { en: 'Open for Booking', bn: 'বুকিং উন্মুক্ত' },
  limited: { en: 'Limited Seats', bn: 'সীমিত আসন' },
  fast_filling: { en: 'Filling Fast', bn: 'দ্রুত পূরণ হচ্ছে' },
  sold_out: { en: 'Sold Out', bn: 'আসন শেষ' },
};

/** কোডের প্যাকেজের ওপর শিটের সারি বসিয়ে নতুন তালিকা তৈরি */
function mergePackages(defaults: PackageItem[], rows: Row[] | undefined): PackageItem[] {
  if (!rows || rows.length === 0) return defaults;
  const byId = new Map(rows.map((r) => [(r.id || '').trim(), r]));
  const out: PackageItem[] = [];
  for (const pkg of defaults) {
    const r = byId.get(pkg.id);
    if (!r) {
      out.push(pkg);
      continue;
    }
    if (!yes(r.show)) continue; // show = no → সাইটে দেখাবে না
    const p: PackageItem = { ...pkg };
    const priceRaw = (r.price || '').toString().replace(/[^\d]/g, '');
    if (priceRaw) {
      const n = parseInt(priceRaw, 10);
      if (n > 0) {
        p.priceNumeric = n;
        p.priceEn = `৳ ${formatLakh(n)}`;
        p.priceBn = `৳ ${toBengaliNumber(formatLakh(n))}`;
      }
    }
    if (r.name_en?.trim()) p.nameEn = r.name_en.trim();
    if (r.name_bn?.trim()) p.nameBn = r.name_bn.trim();
    if (r.duration_en?.trim()) p.durationEn = r.duration_en.trim();
    if (r.duration_bn?.trim()) p.durationBn = r.duration_bn.trim();
    const st = AVAIL[(r.status || '').trim().toLowerCase()];
    if (st) {
      p.availability = st;
      p.availabilityBadgeEn = DEFAULT_BADGE[st].en;
      p.availabilityBadgeBn = DEFAULT_BADGE[st].bn;
    }
    if (r.badge_en?.trim()) p.availabilityBadgeEn = r.badge_en.trim();
    if (r.badge_bn?.trim()) p.availabilityBadgeBn = r.badge_bn.trim();
    const seats = parseInt((r.seats_left || '').toString(), 10);
    if (!isNaN(seats) && seats >= 0) p.seatsRemaining = seats;
    if (r.departure_en?.trim()) p.departureDatesEn = r.departure_en.trim();
    if (r.departure_bn?.trim()) p.departureDatesBn = r.departure_bn.trim();
    if (r.popular?.trim()) p.isPopular = yes(r.popular);
    out.push(p);
  }
  return out;
}

function mapSchedules(rows: Row[] | undefined): UmrahSchedule[] | null {
  if (!rows || rows.length === 0) return null;
  const list = rows
    .filter((r) => yes(r.show) && (r.month_en || r.month_bn))
    .map((r) => ({
      monthEn: (r.month_en || r.month_bn || '').trim(),
      monthBn: (r.month_bn || r.month_en || '').trim(),
      datesEn: (r.dates_en || r.dates_bn || '').trim(),
      datesBn: (r.dates_bn || r.dates_en || '').trim(),
      statusEn: (r.status_en || 'Booking Open').trim(),
      statusBn: (r.status_bn || 'বুকিং উন্মুক্ত').trim(),
      badgeColor: (r.color || 'bg-emerald-500 text-white').trim(),
    }));
  return list.length ? list : null;
}

function mapNotice(rows: Row[] | undefined): NoticeItem | null {
  if (!rows || rows.length === 0) return null;
  const r = rows.find((x) => yes(x.active) && (x.text_bn || x.text_en));
  if (!r) return null;
  const type = (r.type || 'urgent').trim().toLowerCase();
  return {
    id: 'sheet-notice',
    textEn: (r.text_en || r.text_bn || '').trim(),
    textBn: (r.text_bn || r.text_en || '').trim(),
    active: true,
    type: type === 'info' || type === 'success' ? (type as NoticeItem['type']) : 'urgent',
    date: new Date().toISOString(),
  };
}

export const LiveContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [raw, setRaw] = useState<Record<string, Row[]> | null>(null);

  useEffect(() => {
    if (!LEADS_ENDPOINT) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    fetch(`${LEADS_ENDPOINT}?action=content&t=${Date.now()}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.ok && json.data) setRaw(json.data);
      })
      .catch(() => {
        /* শিট না পেলে কোডের ডিফল্ট থাকবে */
      })
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const value = useMemo<LiveContentData>(() => {
    if (!raw) {
      return { hajjPackages: hajjDefault, umrahPackages: umrahDefault, schedules: scheduleDefault, notice: null, loadedFromSheet: false };
    }
    return {
      hajjPackages: mergePackages(hajjDefault, raw.HajjPackages),
      umrahPackages: mergePackages(umrahDefault, raw.UmrahPackages),
      schedules: mapSchedules(raw.Schedule) || scheduleDefault,
      notice: mapNotice(raw.Notice),
      loadedFromSheet: true,
    };
  }, [raw]);

  return <LiveContentContext.Provider value={value}>{children}</LiveContentContext.Provider>;
};

export const useLiveContent = () => useContext(LiveContentContext);

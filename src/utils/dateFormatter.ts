import { Language } from '../types';

// Bengali digit mapping
const BN_DIGITS: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const EN_DIGITS: { [key: string]: string } = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

// Month translations
const BN_MONTHS_FULL = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const BN_MONTHS_SHORT = [
  'জানু',
  'ফেব্রু',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টে',
  'অক্টো',
  'নভে',
  'ডিসে',
];

const EN_MONTHS_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const EN_MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Converts English digits (0-9) to Bengali digits (০-৯)
 */
export function toBengaliNumber(value: number | string): string {
  if (value === undefined || value === null) return '';
  return String(value).replace(/[0-9]/g, (digit) => BN_DIGITS[digit] || digit);
}

/**
 * Converts Bengali digits (০-৯) to English digits (0-9)
 */
export function toEnglishNumber(value: string): string {
  if (!value) return '';
  return String(value).replace(/[০-৯]/g, (digit) => EN_DIGITS[digit] || digit);
}

/**
 * Localizes any number string based on language
 */
export function localizeNumber(value: number | string, lang: Language): string {
  return lang === 'bn' ? toBengaliNumber(value) : String(value);
}

/**
 * Formats a Date object or ISO date string consistently in English and Bengali
 */
export function formatLocalizedDate(
  dateInput: Date | string | number,
  lang: Language,
  format: 'full' | 'medium' | 'short' = 'medium'
): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'object' ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    // If not a standard parseable date, localize numerals directly
    return localizeNumber(String(dateInput), lang);
  }

  const day = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();

  if (lang === 'bn') {
    const bnDay = toBengaliNumber(day);
    const bnYear = toBengaliNumber(year);
    if (format === 'full') {
      return `${bnDay} ${BN_MONTHS_FULL[monthIdx]}, ${bnYear}`;
    }
    if (format === 'short') {
      const padDay = day < 10 ? `০${bnDay}` : bnDay;
      const padMonth = monthIdx + 1 < 10 ? `০${toBengaliNumber(monthIdx + 1)}` : toBengaliNumber(monthIdx + 1);
      return `${padDay}/${padMonth}/${bnYear}`;
    }
    return `${bnDay} ${BN_MONTHS_SHORT[monthIdx]} ${bnYear}`;
  }

  // English formatting
  if (format === 'full') {
    return `${day} ${EN_MONTHS_FULL[monthIdx]}, ${year}`;
  }
  if (format === 'short') {
    const padDay = day < 10 ? `0${day}` : day;
    const padMonth = monthIdx + 1 < 10 ? `0${monthIdx + 1}` : monthIdx + 1;
    return `${padDay}/${padMonth}/${year}`;
  }
  return `${day} ${EN_MONTHS_SHORT[monthIdx]} ${year}`;
}

/**
 * Parses dates formatted as "DD/MM/YYYY TO DD/MM/YYYY" and returns clean localized string
 */
export function localizeDateRange(rangeStr: string, lang: Language): string {
  if (!rangeStr) return '';

  // Pattern: "DD/MM/YYYY TO DD/MM/YYYY" or "DD/MM/YYYY to DD/MM/YYYY"
  const regex = /(\d{2})\/(\d{2})\/(\d{4})\s*(?:TO|to|-|থেকে)\s*(\d{2})\/(\d{2})\/(\d{4})/;
  const match = rangeStr.match(regex);

  if (match) {
    const [, d1, m1, y1, d2, m2, y2] = match;
    const date1 = new Date(Number(y1), Number(m1) - 1, Number(d1));
    const date2 = new Date(Number(y2), Number(m2) - 1, Number(d2));

    if (!isNaN(date1.getTime()) && !isNaN(date2.getTime())) {
      if (lang === 'bn') {
        const d1Bn = toBengaliNumber(d1);
        const d2Bn = toBengaliNumber(d2);
        const m1Bn = BN_MONTHS_SHORT[date1.getMonth()];
        const m2Bn = BN_MONTHS_SHORT[date2.getMonth()];
        const yBn = toBengaliNumber(y2);

        if (m1 === m2 && y1 === y2) {
          return `${d1Bn} – ${d2Bn} ${m1Bn} ${yBn}`;
        }
        return `${d1Bn} ${m1Bn} – ${d2Bn} ${m2Bn} ${yBn}`;
      } else {
        const m1En = EN_MONTHS_SHORT[date1.getMonth()];
        const m2En = EN_MONTHS_SHORT[date2.getMonth()];
        if (m1 === m2 && y1 === y2) {
          return `${d1} – ${d2} ${m1En} ${y2}`;
        }
        return `${d1} ${m1En} – ${d2} ${m2En} ${y2}`;
      }
    }
  }

  // Fallback for custom formatted strings
  return localizeNumber(rangeStr, lang);
}

/**
 * Formats duration strings consistently e.g., "15 Days" -> "১৫ দিন", "35–40 Days" -> "৩৫–৪০ দিন"
 */
export function localizeDuration(durationStr: string, lang: Language): string {
  if (!durationStr) return '';
  if (lang === 'en') return durationStr;

  let result = toBengaliNumber(durationStr);
  result = result
    .replace(/Days|Day/gi, 'দিন')
    .replace(/Nights|Night/gi, 'রাত')
    .replace(/Weeks|Week/gi, 'সপ্তাহ')
    .replace(/Months|Month/gi, 'মাস');
  return result;
}

/**
 * Localizes season year ranges e.g. "2026–2027" -> "২০২৬–২০২৭"
 */
export function localizeSeason(seasonStr: string, lang: Language): string {
  if (!seasonStr) return '';
  return lang === 'bn' ? toBengaliNumber(seasonStr) : seasonStr;
}

/**
 * Localizes price strings formatted like "৳ 5,13,648" or number 513648
 */
export function localizeCurrency(amount: number | string, lang: Language): string {
  if (typeof amount === 'number') {
    const formatted = new Intl.NumberFormat('en-IN').format(amount);
    return lang === 'bn' ? `৳ ${toBengaliNumber(formatted)}` : `৳ ${formatted}`;
  }
  return lang === 'bn' ? toBengaliNumber(amount) : String(amount);
}

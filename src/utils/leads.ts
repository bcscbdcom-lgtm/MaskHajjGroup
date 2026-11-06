import { LEADS_ENDPOINT, WHATSAPP_NUMBER } from '../config/site';

export interface Lead {
  /** কোন ফর্ম থেকে এসেছে: consultation | prereg | scholar */
  source: string;
  name: string;
  phone: string;
  interest?: string;
  pilgrims?: string;
  message?: string;
  email?: string;
  extra?: string;
}

/**
 * লিড Google Sheet-এ পাঠায় (Apps Script Web App-এর মাধ্যমে)।
 * ব্যর্থ হলেও ইউজারকে আটকায় না — WhatsApp সবসময় খুলবে।
 */
export async function saveLead(lead: Lead): Promise<boolean> {
  if (!LEADS_ENDPOINT) return false;
  try {
    const body = new URLSearchParams({
      source: lead.source,
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      interest: lead.interest || '',
      pilgrims: lead.pilgrims || '',
      message: lead.message || '',
      email: lead.email || '',
      extra: lead.extra || '',
      page: typeof window !== 'undefined' ? window.location.href : '',
      lang: typeof document !== 'undefined' ? document.documentElement.lang || '' : '',
    });
    // mode: 'no-cors' — Apps Script CORS হেডার দেয় না, তাই রেসপন্স পড়া যায় না; কিন্তু ডেটা পৌঁছে যায়।
    await fetch(LEADS_ENDPOINT, { method: 'POST', mode: 'no-cors', body });
    return true;
  } catch {
    return false;
  }
}

/** WhatsApp-এ পাঠানোর জন্য প্রস্তুত বার্তা ও লিংক তৈরি করে */
export function buildWhatsAppUrl(lead: Lead, lang: 'en' | 'bn' = 'bn'): string {
  const lines =
    lang === 'en'
      ? [
          'Assalamu Alaikum, MASK Hajj Group.',
          `*Name:* ${lead.name}`,
          `*Phone:* ${lead.phone}`,
          lead.interest ? `*Interested in:* ${lead.interest}` : '',
          lead.pilgrims ? `*Pilgrims:* ${lead.pilgrims}` : '',
          lead.message ? `*Message:* ${lead.message}` : '',
          `*Sent from:* website (${lead.source})`,
        ]
      : [
          'আসসালামু আলাইকুম, মাস্ক হজ গ্রুপ।',
          `*নাম:* ${lead.name}`,
          `*ফোন:* ${lead.phone}`,
          lead.interest ? `*আগ্রহ:* ${lead.interest}` : '',
          lead.pilgrims ? `*যাত্রী সংখ্যা:* ${lead.pilgrims}` : '',
          lead.message ? `*বার্তা:* ${lead.message}` : '',
          `*পাঠানো হয়েছে:* ওয়েবসাইট (${lead.source})`,
        ];
  const text = lines.filter(Boolean).join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** ফর্ম সাবমিট: শিটে সেভ + WhatsApp খোলা — এক কলেই */
export async function submitLeadAndOpenWhatsApp(lead: Lead, lang: 'en' | 'bn' = 'bn'): Promise<boolean> {
  // WhatsApp ট্যাব আগে খুলি (ইউজার ক্লিকের সাথে সাথে), যাতে পপ-আপ ব্লকার না আটকায়
  const url = buildWhatsAppUrl(lead, lang);
  const win = typeof window !== 'undefined' ? window.open(url, '_blank', 'noopener') : null;
  const saved = await saveLead(lead);
  if (!win && typeof window !== 'undefined') {
    // পপ-আপ ব্লক হলে একই ট্যাবে খুলি
    window.location.href = url;
  }
  return saved;
}

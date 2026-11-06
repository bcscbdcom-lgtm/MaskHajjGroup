/**
 * আইনি/নীতি পেজের লেখা — সহজ ভাষায়, মালিক/অফিস পড়ে ঠিক করে নিতে পারবেন।
 * এখানে যা লেখা আছে তা সাধারণ চর্চা; চূড়ান্ত শর্ত হাজীর সাথে স্বাক্ষরিত লিখিত চুক্তি অনুযায়ী প্রযোজ্য।
 */
export type LegalTab = 'terms' | 'privacy' | 'refund';

export interface LegalSection {
  headingEn: string;
  headingBn: string;
  pointsEn: string[];
  pointsBn: string[];
}

export interface LegalDoc {
  id: LegalTab;
  titleEn: string;
  titleBn: string;
  introEn: string;
  introBn: string;
  updated: string; // YYYY-MM-DD
  sections: LegalSection[];
}

export const legalDocs: LegalDoc[] = [
  {
    id: 'terms',
    titleEn: 'Terms & Conditions',
    titleBn: 'শর্তাবলী',
    updated: '2026-11-06',
    introEn:
      'These terms explain, in plain language, how MASK Hajj Group (Ministry of Religious Affairs Hajj Agency Licence No. 15630, Dhaka) works with pilgrims. The written agreement you sign at our office is the final document; this page summarises the usual terms.',
    introBn:
      'এই পাতায় সহজ ভাষায় বলা আছে মাস্ক হজ গ্রুপ (ধর্ম বিষয়ক মন্ত্রণালয় হজ এজেন্সি লাইসেন্স নং ১৫৬৩০, ঢাকা) হাজীদের সাথে কীভাবে কাজ করে। অফিসে আপনি যে লিখিত চুক্তিতে স্বাক্ষর করবেন সেটিই চূড়ান্ত; এই পাতা সাধারণ শর্তগুলোর সারসংক্ষেপ।',
    sections: [
      {
        headingEn: 'Booking & registration',
        headingBn: 'বুকিং ও নিবন্ধন',
        pointsEn: [
          'A booking is confirmed only after the written agreement is signed and the advance stated in it is paid to the official MASK Hajj Group bank account or office receipt. Do not pay any middleman.',
          'Hajj registration is done in the Government e-Hajj system under the package you choose; the government pre-registration fee and registration deposit follow the rules of the Ministry of Religious Affairs for that year.',
          'You must provide a passport valid for the period required by the government for that season, NID/birth certificate, photos and any medical certificate asked for. Wrong or late documents can delay or cancel your travel.',
        ],
        pointsBn: [
          'লিখিত চুক্তিতে স্বাক্ষর এবং চুক্তিতে উল্লিখিত অগ্রিম টাকা মাস্ক হজ গ্রুপের অফিসিয়াল ব্যাংক হিসাবে বা অফিস রসিদের মাধ্যমে জমা দেওয়ার পরই বুকিং নিশ্চিত হয়। কোনো দালাল/মধ্যস্থকে টাকা দেবেন না।',
          'হজের নিবন্ধন আপনার বেছে নেওয়া প্যাকেজে সরকারি ই-হজ সিস্টেমে করা হয়; প্রাক-নিবন্ধন ফি ও নিবন্ধনের জমা ওই বছরের ধর্ম বিষয়ক মন্ত্রণালয়ের নিয়ম অনুযায়ী হয়।',
          'ওই মৌসুমের জন্য সরকার-নির্ধারিত মেয়াদের পাসপোর্ট, NID/জন্মসনদ, ছবি এবং চাওয়া হলে মেডিকেল সনদ দিতে হবে। ভুল বা দেরিতে দেওয়া কাগজে সফর বিলম্বিত বা বাতিল হতে পারে।',
        ],
      },
      {
        headingEn: 'Package price & what is included',
        headingBn: 'প্যাকেজের দাম ও কী কী অন্তর্ভুক্ত',
        pointsEn: [
          'Prices shown on the website are per person, in Bangladeshi Taka, and may change with airfare, Saudi hotel rates, government fees and exchange rates. The price in your signed agreement is the one that applies.',
          'Each package page lists what is included (e.g. visa, return airfare, hotel, meals, transport, Mina/Arafat services, Qurbani) and what is not (e.g. personal shopping, extra tours, excess baggage). Anything not listed as included is paid separately.',
          'No private package is offered below the minimum package set by the Government of Bangladesh for private agencies.',
        ],
        pointsBn: [
          'ওয়েবসাইটে দেখানো দাম জনপ্রতি, বাংলাদেশি টাকায়, এবং বিমানভাড়া, সৌদি হোটেলের দর, সরকারি ফি ও বিনিময় হারের সাথে বদলাতে পারে। আপনার স্বাক্ষরিত চুক্তির দামই প্রযোজ্য।',
          'প্রতিটি প্যাকেজে কী অন্তর্ভুক্ত (যেমন ভিসা, রিটার্ন বিমানভাড়া, হোটেল, খাবার, যাতায়াত, মিনা/আরাফাতের সেবা, কোরবানি) ও কী নয় (যেমন ব্যক্তিগত কেনাকাটা, বাড়তি ট্যুর, অতিরিক্ত লাগেজ) তা লেখা থাকে। "অন্তর্ভুক্ত" লেখা নেই এমন সবকিছু আলাদাভাবে পরিশোধযোগ্য।',
          'বাংলাদেশ সরকার বেসরকারি এজেন্সির জন্য যে সর্বনিম্ন প্যাকেজ নির্ধারণ করে, তার নিচে কোনো প্যাকেজ দেওয়া হয় না।',
        ],
      },
      {
        headingEn: 'Payment',
        headingBn: 'পেমেন্ট',
        pointsEn: [
          'Pay only to the official bank account named in your agreement or at our office against a printed receipt. Keep every receipt.',
          'Instalments, if agreed, must be paid by the dates written in the agreement; the final balance must be cleared before the government or airline deadline so that visa and tickets can be issued.',
        ],
        pointsBn: [
          'শুধু চুক্তিতে উল্লিখিত অফিসিয়াল ব্যাংক হিসাবে বা অফিসে ছাপানো রসিদের বিপরীতে টাকা দিন। প্রতিটি রসিদ সংরক্ষণ করুন।',
          'কিস্তিতে পরিশোধের সুযোগ থাকলে চুক্তিতে লেখা তারিখে কিস্তি দিতে হবে; ভিসা ও টিকিট ইস্যুর জন্য সরকারি বা এয়ারলাইনের শেষ তারিখের আগে সম্পূর্ণ টাকা পরিশোধ করতে হবে।',
        ],
      },
      {
        headingEn: 'Travel, conduct & health',
        headingBn: 'সফর, আচরণ ও স্বাস্থ্য',
        pointsEn: [
          'Pilgrims must follow the instructions of the group Mu’allim, Saudi authorities and the Bangladesh Hajj Mission, and the laws of Saudi Arabia.',
          'Pilgrims are responsible for declaring their health conditions truthfully and for carrying their own regular medicines. The government may declare certain illnesses ineligible for Hajj; we will inform you of the rules in force for your season.',
          'MASK Hajj Group is not responsible for delays or changes caused by airlines, weather, government decisions, Saudi authorities or events beyond its control, but will do its best to arrange alternatives.',
        ],
        pointsBn: [
          'হাজীদের গ্রুপ মুয়াল্লিম, সৌদি কর্তৃপক্ষ ও বাংলাদেশ হজ মিশনের নির্দেশনা এবং সৌদি আরবের আইন মেনে চলতে হবে।',
          'নিজের স্বাস্থ্যের অবস্থা সঠিকভাবে জানানো এবং নিয়মিত ওষুধ সাথে রাখা হাজীর দায়িত্ব। সরকার কিছু অসুস্থতাকে হজের জন্য অযোগ্য ঘোষণা করতে পারে; আপনার মৌসুমে কী নিয়ম আছে তা আমরা জানিয়ে দেব।',
          'এয়ারলাইন, আবহাওয়া, সরকারি সিদ্ধান্ত, সৌদি কর্তৃপক্ষ বা নিয়ন্ত্রণের বাইরের ঘটনার কারণে দেরি বা পরিবর্তনের দায় মাস্ক হজ গ্রুপের নয়; তবে বিকল্প ব্যবস্থার জন্য আমরা সর্বোচ্চ চেষ্টা করি।',
        ],
      },
      {
        headingEn: 'Complaints',
        headingBn: 'অভিযোগ',
        pointsEn: [
          'First contact our office: +88 01713-009567 / +88 01711-258708, maskbd99@gmail.com, or visit China Town (East Tower), 20th floor, Suite 21/2, 67/1 Naya Paltan, Dhaka-1000 (10 AM–7 PM daily).',
          'Hajj matters are also governed by the Ministry of Religious Affairs and HAAB, where a pilgrim may lodge a complaint under the government Hajj policy.',
        ],
        pointsBn: [
          'প্রথমে আমাদের অফিসে যোগাযোগ করুন: +88 01713-009567 / +88 01711-258708, maskbd99@gmail.com, অথবা সরাসরি আসুন চায়না টাউন (ইস্ট টাওয়ার), ২০ তলা, স্যুট ২১/২, ৬৭/১ নয়াপল্টন, ঢাকা-১০০০ (প্রতিদিন সকাল ১০টা–সন্ধ্যা ৭টা)।',
          'হজ সংক্রান্ত বিষয় ধর্ম বিষয়ক মন্ত্রণালয় ও HAAB-এর নিয়মেও পরিচালিত হয়; সরকারি হজ নীতিমালা অনুযায়ী হাজী সেখানেও অভিযোগ জানাতে পারেন।',
        ],
      },
    ],
  },
  {
    id: 'refund',
    titleEn: 'Refund & Cancellation Policy',
    titleBn: 'রিফান্ড ও বাতিল নীতি',
    updated: '2026-11-06',
    introEn:
      'We know plans can change. This page explains what normally happens when a booking is cancelled. The exact amounts are set out in your signed agreement and depend on what has already been paid to the government, airline and hotels on your behalf.',
    introBn:
      'পরিকল্পনা বদলাতে পারে, আমরা বুঝি। বুকিং বাতিল হলে সাধারণত কী হয় তা এখানে বলা আছে। সঠিক অঙ্ক আপনার স্বাক্ষরিত চুক্তিতে থাকে এবং নির্ভর করে আপনার পক্ষে সরকার, এয়ারলাইন ও হোটেলকে ইতিমধ্যে কত টাকা দেওয়া হয়েছে তার ওপর।',
    sections: [
      {
        headingEn: 'Hajj',
        headingBn: 'হজ',
        pointsEn: [
          'Government pre-registration and registration money is refunded according to the rules of the Ministry of Religious Affairs for that year (the government keeps a fixed processing charge and refunds the rest through the e-Hajj system).',
          'Amounts already paid for airline tickets, Saudi hotel bookings, Mina/Arafat services and visa fees are refunded only to the extent those parties refund us.',
          'If you cancel before any money has been paid out on your behalf, only the agency service charge stated in the agreement is deducted.',
          'If you are unable to travel for a serious reason (illness, death in the family), a replacement pilgrim may be arranged where the government rules of that season allow it.',
        ],
        pointsBn: [
          'সরকারি প্রাক-নিবন্ধন ও নিবন্ধনের টাকা ওই বছরের ধর্ম বিষয়ক মন্ত্রণালয়ের নিয়ম অনুযায়ী ফেরত দেওয়া হয় (সরকার নির্দিষ্ট প্রক্রিয়াকরণ চার্জ রেখে বাকিটা ই-হজ সিস্টেমের মাধ্যমে ফেরত দেয়)।',
          'বিমান টিকিট, সৌদি হোটেল বুকিং, মিনা/আরাফাতের সেবা ও ভিসা ফি বাবদ ইতিমধ্যে দেওয়া টাকা ততটুকুই ফেরত হয়, যতটুকু ওই পক্ষগুলো আমাদের ফেরত দেয়।',
          'আপনার পক্ষে কোনো টাকা পরিশোধের আগে বাতিল করলে শুধু চুক্তিতে উল্লিখিত এজেন্সি সার্ভিস চার্জ কাটা হয়।',
          'গুরুতর কারণে (অসুস্থতা, পরিবারে মৃত্যু) যেতে না পারলে ওই মৌসুমের সরকারি নিয়মে সুযোগ থাকলে বদলি হাজীর ব্যবস্থা করা যায়।',
        ],
      },
      {
        headingEn: 'Umrah',
        headingBn: 'ওমরাহ',
        pointsEn: [
          'Umrah visa fees, once applied for, are generally non-refundable because the Saudi system charges them immediately.',
          'Airline tickets follow the airline’s own cancellation rules (group fares are often non-refundable or carry a penalty); hotel nights follow the hotel’s rules. We refund whatever we recover, minus the agency service charge in the agreement.',
          'Cancellations made well before departure usually recover more; cancellations within a few days of departure usually recover very little. Please tell us as early as possible.',
        ],
        pointsBn: [
          'ওমরাহ ভিসার জন্য আবেদন হয়ে গেলে ভিসা ফি সাধারণত ফেরতযোগ্য নয়, কারণ সৌদি সিস্টেম তা সাথে সাথে কেটে নেয়।',
          'বিমান টিকিট এয়ারলাইনের নিজস্ব বাতিল-নিয়মে চলে (গ্রুপ ভাড়া প্রায়ই অফেরতযোগ্য বা জরিমানাসহ); হোটেলের রাত হোটেলের নিয়মে। আমরা যা ফেরত পাই তা চুক্তির এজেন্সি সার্ভিস চার্জ বাদ দিয়ে ফেরত দিই।',
          'যাত্রার অনেক আগে বাতিল করলে সাধারণত বেশি ফেরত পাওয়া যায়; যাত্রার কয়েক দিন আগে বাতিল করলে খুব কমই পাওয়া যায়। তাই যত দ্রুত সম্ভব আমাদের জানান।',
        ],
      },
      {
        headingEn: 'How refunds are paid',
        headingBn: 'রিফান্ড কীভাবে দেওয়া হয়',
        pointsEn: [
          'Submit a written cancellation request at our office (or by email from the address on file) with your receipts.',
          'Refunds are paid by bank transfer or cheque to the pilgrim named in the agreement, normally within 15–30 working days after the airline/hotel/government refund reaches us.',
        ],
        pointsBn: [
          'রসিদসহ লিখিত বাতিলের আবেদন আমাদের অফিসে (বা নথিভুক্ত ইমেইল থেকে) জমা দিন।',
          'রিফান্ড চুক্তিতে নাম থাকা হাজীর ব্যাংক হিসাবে ট্রান্সফার বা চেকে দেওয়া হয়; এয়ারলাইন/হোটেল/সরকারের ফেরত আমাদের কাছে পৌঁছানোর পর সাধারণত ১৫–৩০ কর্মদিবসের মধ্যে।',
        ],
      },
    ],
  },
  {
    id: 'privacy',
    titleEn: 'Privacy Policy',
    titleBn: 'গোপনীয়তা নীতি',
    updated: '2026-11-06',
    introEn:
      'We collect only the information needed to arrange your pilgrimage and we do not sell it to anyone.',
    introBn:
      'আপনার সফরের ব্যবস্থা করতে যতটুকু তথ্য দরকার শুধু ততটুকুই আমরা নিই, এবং কারও কাছে বিক্রি করি না।',
    sections: [
      {
        headingEn: 'What we collect',
        headingBn: 'আমরা কী তথ্য নিই',
        pointsEn: [
          'From the website forms: your name, mobile number, the package you are interested in and your message. This is sent to our office WhatsApp and saved in a private Google Sheet that only MASK Hajj Group management can open.',
          'At the office, for booking: passport and NID copies, photos, date of birth, address, emergency contact, health information required by the Hajj authorities, and payment records.',
        ],
        pointsBn: [
          'ওয়েবসাইটের ফর্ম থেকে: আপনার নাম, মোবাইল নম্বর, আগ্রহের প্যাকেজ ও বার্তা। এটি আমাদের অফিসের WhatsApp-এ যায় এবং একটি ব্যক্তিগত Google Sheet-এ জমা হয়, যা শুধু মাস্ক হজ গ্রুপের ব্যবস্থাপনা খুলতে পারে।',
          'অফিসে, বুকিংয়ের জন্য: পাসপোর্ট ও NID-র কপি, ছবি, জন্মতারিখ, ঠিকানা, জরুরি যোগাযোগ, হজ কর্তৃপক্ষের চাওয়া স্বাস্থ্য-তথ্য এবং পেমেন্টের রেকর্ড।',
        ],
      },
      {
        headingEn: 'How we use it',
        headingBn: 'আমরা কীভাবে ব্যবহার করি',
        pointsEn: [
          'To contact you about your enquiry, to register you with the Government e-Hajj system, to apply for your visa, to book flights and hotels, and to keep the records the law requires.',
          'We share your details only with the Ministry of Religious Affairs / Hajj Office, Saudi visa and Nusuk systems, airlines, hotels and our Saudi service partners — and only as needed for your journey.',
          'We may send you WhatsApp or SMS updates about your booking and new packages. Reply “STOP” or tell our office to stop receiving promotional messages.',
        ],
        pointsBn: [
          'আপনার জিজ্ঞাসার উত্তর দিতে, সরকারি ই-হজ সিস্টেমে নিবন্ধন করতে, ভিসার আবেদন করতে, ফ্লাইট ও হোটেল বুক করতে এবং আইনে বাধ্যতামূলক রেকর্ড রাখতে।',
          'আপনার তথ্য শুধু ধর্ম বিষয়ক মন্ত্রণালয়/হজ অফিস, সৌদি ভিসা ও নুসুক সিস্টেম, এয়ারলাইন, হোটেল ও আমাদের সৌদি সেবা-অংশীদারদের সাথে শেয়ার করা হয় — শুধু আপনার সফরের প্রয়োজনে।',
          'বুকিং ও নতুন প্যাকেজ নিয়ে WhatsApp/SMS বার্তা পাঠাতে পারি। প্রচারমূলক বার্তা বন্ধ করতে চাইলে "STOP" লিখুন বা অফিসে জানান।',
        ],
      },
      {
        headingEn: 'Security & your rights',
        headingBn: 'নিরাপত্তা ও আপনার অধিকার',
        pointsEn: [
          'Documents are kept in locked office files and password-protected accounts. Passport or NID details are never posted on the website.',
          'You can ask to see, correct or delete your information by contacting our office; we keep booking records for as long as the law and the Hajj authorities require.',
          'The website uses no advertising cookies. It uses YouTube embeds and Google Maps, which follow Google’s privacy policy.',
        ],
        pointsBn: [
          'কাগজপত্র অফিসের তালাবদ্ধ ফাইলে ও পাসওয়ার্ড-সুরক্ষিত অ্যাকাউন্টে রাখা হয়। পাসপোর্ট বা NID-র তথ্য কখনো ওয়েবসাইটে দেওয়া হয় না।',
          'অফিসে যোগাযোগ করে আপনি নিজের তথ্য দেখতে, সংশোধন বা মুছে ফেলার অনুরোধ করতে পারেন; আইন ও হজ কর্তৃপক্ষ যত দিন চায় তত দিন বুকিংয়ের রেকর্ড রাখা হয়।',
          'ওয়েবসাইটে কোনো বিজ্ঞাপন-কুকি নেই। ইউটিউব ভিডিও ও গুগল ম্যাপ ব্যবহার করা হয়, যা গুগলের গোপনীয়তা নীতি অনুসরণ করে।',
        ],
      },
    ],
  },
];

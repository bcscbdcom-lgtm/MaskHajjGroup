# ওয়েবসাইটের ফর্ম → Google Sheet সেটআপ (একবার করলেই হবে, ~৫ মিনিট)

ওয়েবসাইটের ৩টি ফর্ম (পরামর্শ ফর্ম, প্রাক-নিবন্ধন ফর্ম, আলেমকে প্রশ্ন) থেকে প্রতিটি সাবমিশন
আপনার Google Sheet-এর **Leads** ট্যাবে এক লাইনে জমা হবে। সাথে WhatsApp-ও খুলবে।

## ধাপ ১ — শিট তৈরি
1. ব্রাউজারে যান: **sheets.google.com** (bcscbd.com@gmail.com দিয়ে লগইন)
2. **Blank spreadsheet** খুলুন → ওপরে বামে নাম দিন: `MASK Hajj Leads`
3. নিচে ট্যাবের নাম `Sheet1`-এ ডাবল-ক্লিক করে নাম দিন: `Leads`

## ধাপ ২ — Apps Script বসানো
1. ওই শিটে ওপরের মেনু **Extensions → Apps Script** ক্লিক করুন (নতুন ট্যাব খুলবে)
2. এডিটরে যা লেখা আছে সব মুছে, `docs/leads-apps-script.gs` ফাইলের পুরো কোড পেস্ট করুন
3. ওপরে 💾 (Save) চাপুন; প্রজেক্টের নাম চাইলে দিন: `MASK Leads`

## ধাপ ৩ — Web App হিসেবে Deploy
1. ওপরে ডানে নীল **Deploy → New deployment**
2. বামে ⚙️ আইকন → **Web app** বেছে নিন
3. সেটিংস:
   - Description: `leads v1`
   - Execute as: **Me**
   - Who has access: **Anyone**  ← এটা জরুরি, নইলে ওয়েবসাইট পাঠাতে পারবে না
4. **Deploy** চাপুন → "Authorize access" → আপনার Gmail বেছে নিন →
   "Google hasn't verified this app" এলে **Advanced → Go to MASK Leads (unsafe)** → **Allow**
   (এটা আপনার নিজের স্ক্রিপ্ট, তাই নিরাপদ)
5. শেষে একটা **Web app URL** দেখাবে, এরকম: `https://script.google.com/macros/s/AKfycb.../exec`
   → **Copy** চাপুন

## ধাপ ৪ — ওয়েবসাইটে URL বসানো
1. কোডের ফাইল `src/config/site.ts` খুলুন
2. এই লাইনে:
   `export const LEADS_ENDPOINT = '';`
   দুই কোটেশনের মাঝে URL-টা পেস্ট করুন:
   `export const LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfycb.../exec';`
3. সেভ → GitHub Desktop-এ Commit (`Connect lead forms to Google Sheet`) → Push

## ধাপ ৫ — পরীক্ষা
সাইট আপডেট হওয়ার পর (১–২ মিনিট) ওয়েবসাইটের ফর্মে নিজের নাম দিয়ে একটা টেস্ট পাঠান।
শিটের **Leads** ট্যাবে এক লাইন জমা হলে কাজ শেষ। (প্রথম লাইনে শিরোনাম নিজে থেকেই আসবে।)

## পরে কোড বদলালে
Apps Script-এর কোড বদলালে আবার **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**
করতে হয়; URL একই থাকে।

## নোট
- শিটটা শুধু আপনার অ্যাকাউন্টে থাকবে; "Anyone" মানে ফর্ম থেকে লেখা যাবে, কিন্তু কেউ শিট পড়তে পারবে না।
- `স্ট্যাটাস` কলামে আপনি হাতে লিখতে পারেন: নতুন / কল করা হয়েছে / বুকিং / বাতিল।


## দুটি আলাদা ফাইল (সিদ্ধান্ত ০৬ নভেম্বর ২০২৬)
- **MASK Hajj Leads** (`14H6YBr0Uxr-p7YuGCELKhPR8mMdRQMXvZHt8wFBiLiI`) — গ্রাহকের তথ্য; শেয়ার শুধু মালিক + SMS। Apps Script এই ফাইলে বসানো।
- **MASK Website Content** (`1-P7zzOj26tbEfZLK8gGrCUPU935ngvJl4Mxw1RId3ic`) — দাম/তারিখ/নোটিশ; অফিস স্টাফকে edit দেওয়া যায়। স্ক্রিপ্ট এটি ID দিয়ে পড়ে।

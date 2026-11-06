# ওয়েবসাইটের দাম/তারিখ/নোটিশ — Google Sheet থেকে চালানো

ফাইল: **MASK Website Content** (লিডের ফাইল থেকে আলাদা — https://docs.google.com/spreadsheets/d/1-P7zzOj26tbEfZLK8gGrCUPU935ngvJl4Mxw1RId3ic)। ৪টি ট্যাব সাইট পড়ে: `HajjPackages`, `UmrahPackages`, `Schedule`, `Notice`।
শিটে কিছু বদলে Enter চাপলে **১–২ মিনিটের মধ্যে** সাইটে বদলে যায়। কোনো ঘর খালি রাখলে কোডের ডিফল্ট মান দেখায়।

**নিয়ম**: প্রথম সারির ইংরেজি কলাম-নাম বদলাবেন না। কোনো সারি সাময়িকভাবে বন্ধ রাখতে `show` ঘরে `no` লিখুন।

## HajjPackages / UmrahPackages ট্যাব
| কলাম | কী লিখবেন | উদাহরণ |
|---|---|---|
| id | বদলাবেন না (কোডের সাথে মেলে) | hajj-budget |
| name_bn / name_en | প্যাকেজের নাম (খালি = ডিফল্ট) | সাশ্রয়ী ফুল প্যাকেজ |
| price | শুধু সংখ্যা, টাকা | 513648 |
| duration_bn / duration_en | দিন | ৩৫–৪০ দিন / 35–40 Days |
| status | open, limited, fast_filling, sold_out — এর একটি | limited |
| badge_bn / badge_en | ব্যাজের লেখা (খালি = status অনুযায়ী) | সীমিত আসন |
| seats_left | আসল বাকি আসন (সংখ্যা), জানা না থাকলে খালি | 12 |
| departure_bn / departure_en | ছাড়ার তারিখ | ১৬ জানুয়ারি ২০২৭ |
| popular | yes হলে "★ জনপ্রিয়" ট্যাগ | yes |
| show | yes/no — সাইটে দেখাবে কি না | yes |

বর্তমান id-গুলো: হজ → `hajj-budget`, `hajj-economy`, `hajj-standard`, `hajj-vip`, `hajj-vvip`; ওমরাহ → `umrah-august`, `umrah-express`, `umrah-comfort`, `umrah-royal`।
নতুন প্যাকেজ যোগ করতে হলে আগে কোডে যোগ করতে হয় (Claude-কে বলুন), তারপর শিটে সারি।

## Schedule ট্যাব (ওমরাহ গ্রুপ ডিপারচার)
| কলাম | উদাহরণ |
|---|---|
| month_bn / month_en | নভেম্বর ২০২৬ / NOVEMBER 2026 |
| dates_bn / dates_en | ২১/১১/২০২৬ থেকে ০৫/১২/২০২৬ / 21/11/2026 TO 05/12/2026 |
| status_bn / status_en | বুকিং উন্মুক্ত / Booking Open |
| color | bg-emerald-500 text-white (সবুজ), bg-amber-500 text-white (হলুদ), bg-purple-600 text-white (বেগুনি) |
| show | yes/no |

যত সারি, তত গ্রুপ। পেরিয়ে যাওয়া তারিখের সারিতে `show` = no লিখুন বা মুছে দিন।

## Notice ট্যাব (সাইটের ওপরের হলুদ ব্যানার)
| কলাম | উদাহরণ |
|---|---|
| active | yes/no |
| text_bn | 📢 হজ ২০২৮-এর প্রাক-নিবন্ধন চলছে… |
| text_en | 📢 Hajj 2028 Pre-Registration is open… |
| type | urgent (লাল/হলুদ), info (নীল), success (সবুজ) |

`active` = yes এমন প্রথম সারিটাই দেখায়। কোনো সারি active না থাকলে কোডের ডিফল্ট নোটিশ দেখায়।

## Apps Script আপডেট করলে
কোড বদলানোর পর Apps Script-এ: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**। URL একই থাকে।

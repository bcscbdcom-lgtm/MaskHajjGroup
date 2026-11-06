/**
 * MASK Hajj Group — ওয়েবসাইট লিড → Google Sheet
 * এই কোডটি Google Sheet-এর Extensions → Apps Script-এ পেস্ট করে Web App হিসেবে Deploy করতে হয়।
 * সেটআপ গাইড: docs/LEADS_SETUP.md
 */

var SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'সময় (Dhaka)', 'উৎস', 'নাম', 'ফোন', 'আগ্রহ', 'যাত্রী সংখ্যা',
        'বার্তা', 'ইমেইল', 'অতিরিক্ত', 'পেজ', 'ভাষা', 'স্ট্যাটাস'
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    var p = (e && e.parameter) ? e.parameter : {};
    var now = Utilities.formatDate(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd HH:mm:ss');
    sheet.appendRow([
      now,
      p.source || '',
      p.name || '',
      "'" + (p.phone || ''),   // ফোন নম্বরের সামনের 0 যেন না হারায়
      p.interest || '',
      p.pilgrims || '',
      p.message || '',
      p.email || '',
      p.extra || '',
      p.page || '',
      p.lang || '',
      'নতুন'
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ব্রাউজারে URL খুলে চেক করার জন্য
function doGet() {
  return ContentService.createTextOutput('MASK Hajj Group leads endpoint is live.');
}

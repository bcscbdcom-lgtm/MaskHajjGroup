/**
 * MASK Hajj Group — Google Sheet ↔ ওয়েবসাইট
 *  - doPost : ওয়েবসাইটের ফর্ম থেকে লিড → "Leads" ট্যাবে জমা
 *  - doGet  : ?action=content → HajjPackages / UmrahPackages / Schedule / Notice ট্যাবের তথ্য JSON হিসেবে সাইটে পাঠায়
 * সেটআপ গাইড: docs/LEADS_SETUP.md, কলাম-ব্যাখ্যা: docs/CONTENT_SHEET.md
 */

var LEADS_SHEET = 'Leads';
var CONTENT_TABS = ['HajjPackages', 'UmrahPackages', 'Schedule', 'Notice'];

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(LEADS_SHEET);
    if (!sheet) {
      sheet = ss.insertSheet(LEADS_SHEET);
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
      "'" + (p.phone || ''),
      p.interest || '',
      p.pilgrims || '',
      p.message || '',
      p.email || '',
      p.extra || '',
      p.page || '',
      p.lang || '',
      'নতুন'
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || '';
  if (action !== 'content') {
    return ContentService.createTextOutput('MASK Hajj Group leads endpoint is live.');
  }
  try {
    // ৬০ সেকেন্ড ক্যাশ — শিটে বদলালে সর্বোচ্চ ১ মিনিটে সাইটে বদলায়
    var cache = CacheService.getScriptCache();
    var cached = cache.get('content_v1');
    if (cached) {
      return json_(JSON.parse(cached));
    }
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = {};
    CONTENT_TABS.forEach(function (name) {
      var sh = ss.getSheetByName(name);
      data[name] = sh ? readTab_(sh) : [];
    });
    var payload = { ok: true, updatedAt: new Date().toISOString(), data: data };
    cache.put('content_v1', JSON.stringify(payload), 60);
    return json_(payload);
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** প্রথম সারি = কলামের নাম (ইংরেজি key); বাকি সারি = ডেটা। "#" দিয়ে শুরু সারি/খালি id বাদ। */
function readTab_(sheet) {
  var values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  var keys = values[0].map(function (k) { return String(k).trim(); });
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var row = {};
    var empty = true;
    for (var c = 0; c < keys.length; c++) {
      if (!keys[c]) continue;
      var v = String(values[i][c] == null ? '' : values[i][c]).trim();
      if (v) empty = false;
      row[keys[c]] = v;
    }
    if (empty) continue;
    if (String(values[i][0]).trim().charAt(0) === '#') continue;
    rows.push(row);
  }
  return rows;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

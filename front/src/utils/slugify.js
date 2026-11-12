export function slugify(text) {
  return text
    .toString()
    .trim()
    .replace(/\s+/g, "_")       // فاصله → -
    .replace(/[^\w\u0600-\u06FF-]+/g, "") // حذف کاراکتر غیرمجاز (پشتیبانی فارسی)
    .toLowerCase();
}

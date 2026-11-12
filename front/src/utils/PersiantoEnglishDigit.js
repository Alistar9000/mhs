export const convertPersianNumbersToEnglish = (input) => {
  // اگر ورودی undefined یا null بود
  if (!input || input === '') return '';
  
  // تبدیل به رشته
  const str = String(input);
  
  // فقط اعداد فارسی را به انگلیسی تبدیل کن
  return str.replace(/[۰-۹]/g, (char) => 
    String('۰۱۲۳۴۵۶۷۸۹'.indexOf(char))
  );
};
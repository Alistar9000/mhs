export const persian_date = (date)=>{

const dates = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const date2 = date?.split("/");
  const d = date2 && date2[2];
  const m = date2 && date2[1];
  const D = date2 && d + " " + dates[m - 1] + " " + date2[0].slice(2);
return D;
}
export const persian_date_full = (date)=>{

    const dates = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ];
      const date2 = date?.split("/");
      const d = date2 && date2[2];
      const m = date2 && date2[1];
      const D = date2 && d + " " + dates[m - 1] + " " + date2[0];
    return D;
    }
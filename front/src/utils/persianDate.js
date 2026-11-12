import moment from "moment-jalaali";
export function to_persian_date(date){
    return moment(date, "YYYY-MM-DD").format("jYYYY/jMM/jDD")
}
export function to_persian_date_Xaxis(date){
    return moment(date, "YYYY-MM-DD").format("jYYYY/jMM")
}


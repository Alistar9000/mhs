import { LucideUserPlus, Plus, UserPlus, UserPlus2, UserRoundPlus } from "lucide-react";
import Breadcrumb from "../layouts/Breadcrumb";
import CreatePortfolioModal from "../portfolios/add/CreatePortfolioModal";
import { useState } from "react";
import Toast from "../ui/Toast";
import { useDate } from "../../store/store";
import moment from "moment-jalaali";
import { to_persian_date } from "../../utils/persianDate";

export default function DashboardTitleBar() {
 
  // const {date} = useDate()

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center pr-6 pl-10 py-4 sm:pb-1  text-sm text-gray-500">
      <Toast/>
      {/* <div className="h-full flex flex-col justify-between gap-6"> */}

      <Breadcrumb />
      {/* <span className="text-xs text-slate-400">بروزرسانی : {to_persian_date(localStorage.getItem('date'))}</span> */}
      {/* </div> */}
     
    </div>
  );
}

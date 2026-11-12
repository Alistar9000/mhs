import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Plus } from "lucide-react";
import CreatePortfolioModal from "../portfolios/add/CreatePortfolioModal";
import { slugify } from "../../utils/slugify";
import { useCrumbs } from "../../store/store";

const breadcrumbMap = {
  dashboard: "داشبورد",
  portfolios: "سبدها",
  symbols:"نمادها",
  active: "سبد فعال",
  transactions: "تراکنش‌ها",
  reports: "گزارش‌ها",
  settings: "تنظیمات",
  profile: "پروفایل کاربر",
};

export default function Breadcrumb() {
  // const location = useLocation();
  const {crumbs} = useCrumbs();
  // const pathParts = location.pathname.split("/").filter(Boolean); // ["dashboard", "portfolio", ...]
  // console.log("pathParts:",pathParts)
  // const buildPath = (index) => "/" + pathParts.slice(0, index + 1).join("/");
  // console.log("crumbs:",crumbs)
  return (
    
      <div className="flex gap-2">
        
        {crumbs?.map((part, index) => (
          <React.Fragment key={index}>
            <Link to={part?.path} className="hover:text-gray-700">
              {part?.label}
            </Link>
           {
            index !== crumbs?.length -1 &&
           <span>/</span>
           } 
          </React.Fragment>
        ))}
      </div>
     
  
  );
}

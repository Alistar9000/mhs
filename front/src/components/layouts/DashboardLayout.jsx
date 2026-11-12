import React, { useEffect, useState } from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import { Outlet, useOutlet, Link } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import DashboardTitleBar from "../dashboard/DashboardTitleBar";
import { to_persian_date } from "../../utils/persianDate";
import { LucideUserPlus, Plus } from "lucide-react";
import CreatePortfolioModal from "../portfolios/add/CreatePortfolioModal";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   
   
  const hasOutlet = useOutlet();
  return (
    <div className="w-screen h-screen sm:overflow-x-hidden" dir="ltr">
     
      <div dir="rtl" className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          collapsed={isSidebarCollapsed}
          setCollapsed={setIsSidebarCollapsed}
        />

        <main className={`sm:flex-1 bg-bg  flex flex-col p-6  ${!isSidebarCollapsed ? 'lg:mr-60' : 'lg:mr-16'} mr-0`}>
       
          <div className="w-full flex items-center sm:items-end justify-between mb-5 text-xs">
          {/* <DashboardTitleBar /> */}
            
           
           <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
         
      
      
          </div>
          <div className="overflow-y-auto relative h-full">
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

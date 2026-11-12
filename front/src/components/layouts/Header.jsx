import React, { useEffect, useState } from "react";
import {
  Bell,
  User,
  ChevronDown,
  LogOut,
  Settings,
  TimerIcon,
  Badge,
  BadgeAlert,
  BadgeCheck,
  BadgePercent,
  Hamburger,
  HamburgerIcon,
  Menu,
  UserCircle,
  User2,
  UserX2,
  User2Icon,
  Plus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import ExitLoader from "../ui/ExitLoarder";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { useDueDateList } from "../../hooks/useDashboard";
import { to_persian_date } from "../../utils/persianDate";
import Toast from "../ui/Toast";
import CreatePortfolioModal from "../portfolios/add/CreatePortfolioModal";


export default function Header({ onToggleSidebar }) {
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBellListOpen, setIsBellListOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(null);
  const navigate = useNavigate();
  const [exitLoading, setExitLoading] = useState(false);
  const { data: due_date_list, updateMut } = useDueDateList();
  const [date, setDate] = useState(null);
   
   useEffect(() => {
    //  if(!localStorage.getItem('date')) return
    
    const timeout = setTimeout(() => {
      setDate(localStorage.getItem('date'))
    }, 3000);
    
    return () => clearTimeout(timeout)
   }, [])
  const handleExit = () => {
    // navigate('/')
    setIsProfileOpen(false);
    setExitLoading(true);
    setTimeout(() => {
      setExitLoading(false);
      logout(false);
      navigate("/");
    }, 1000);
  };

  return (
    <header className="flex items-center w-full mb-5 justify-between">
      {exitLoading && <ExitLoader />}
      
      <div className="flex items-center gap-4">
         <Toast />
        <Menu onClick={onToggleSidebar} className="sm:hidden cursor-pointer" />
       <Link to="/dashboard" className="font-extrabold text-xl  items-center gap-2 hidden sm:flex text-gray-700">
               
                 مدیریت سبدگردانی
               </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button
        onClick={() => setIsCreateModalOpen(true)}
        className="px-5 w-max py-2.5 hover:-translate-y-px text-[13px] font-semibold flex border-none outline-none rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 hover:shadow-lg transition text-white items-center gap-0.5 hover:bg-blue-600"
        >
          <Plus size={15} />
        {/* <LucideUserPlus size={15} /> */}
        افزودن سبد
      </button>
        <div className="text-nowrap rounded-xl2 px-4 py-2 bg-white text-muted w-max border flex items-center gap-1">

            <p>بروزرسانی:</p>
             
             {date ? 
             <p>
               {to_persian_date(date)}
             </p>
             :
              <div className={`*:w-0.5 *:rounded-full  flex items-center gap-1 *:show-date-anim  *:bg-neutral-500 *:aspect-square`}>
            <div className="show-date-anim1 delay-0"></div>
            <div className="show-date-anim2 delay-75"></div>
            <div className="show-date-anim3 delay-100"></div>
            <div className="show-date-anim4 delay-150"></div>
           </div>
             
             }
           </div> 
        
           
        <div className="relative">
          <button
            onClick={() => {
              isProfileOpen && setIsProfileOpen(false);
              setIsBellListOpen((e) => !e);
            }}
            className="relative bg-white  p-2 rounded-md"
          >
            <Bell size={18} />
            {due_date_list?.length > 0 && (
              <div
                className="absolute flex justify-center items-center pt-0.5 text-xs rounded-full animate-pulse w-1.5 h-1.5 aspect-square text-white top-[5px] left-2 bg-red-500"
                size={15}
              >
                {/* {due_date_list?.length} */}
              </div>
            )}
            {/* بعدا badge count اضافه می‌کنیم */}
          </button>
          {
            isBellListOpen && due_date_list?.length > 0 && (
              //  <div className="fixed inset-0 bg-slate-50 " onClick={()=>setIsBellListOpen(false)}>
             <div className="fixed inset-0 pointer-events-none px-4 z-50 sm:px-16 md:px-40 justify-center sm:justify-end flex  mt-12 items-start">

            
              <div 
                onClick={(e) => e.stopPropagation()}
                className={` w-full xl:w-1/2 pointer-events-auto rounded-md py-2 mt-1 border shadow-xl bg-white`}
              >
                <ul className=" h-full px-2 *:text-sm *:border-b last:border-b-0">
                  {due_date_list?.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between p-2 gap-2 items-center"
                    >
                      <div className="flex flex-col gap-3">
                        <span className="text-wrap">
                          سررسید سبد{" "}
                          <span
                            className={`${item?.return_amount > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {" "}
                            {item?.portfolio.name}{" "}
                          </span>
                          فرا رسیده{" "}
                        </span>
                        <p className=" flex gap-1 items-center text-slate-400 text-xs">
                          <TimerIcon size={14} />
                          سررسید :{" "}
                          <span>{to_persian_date(item?.due_date)}</span>{" "}
                        </p>
                      </div>
                      <button
                        onClick={() => updateMut.mutate(item?.portfolio_id)}
                        className={`px-3 py-1 cursor-pointer rounded-md ${item?.return_amount > 0 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white `}
                      >
                        تمدید
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
               </div>
            )
            //  </div>
          }
        </div>   
        {/* Profile */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-white rounded-full p-2 "
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              isBellListOpen && setIsBellListOpen(false);
            }}
          >
            <User2Icon size={18} />
            {/* <UserCircle size={18} /> */}
            {/* <span className="text-sm">{user?.name}</span> */}
            {/* <ChevronDown size={14} /> */}
          </button>

          {isProfileOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2 z-50">
              <Link
                to="/dashboard/profile"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-50 rounded-md"
              >
                <User size={16} /> پروفایل
              </Link>
              <Link
                to="/dashboard/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-50 rounded-md"
              >
                <Settings size={16} /> تنظیمات
              </Link>
              <button
                onClick={handleExit}
                className="flex items-center gap-2 px-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md w-full text-left"
              >
                <LogOut size={16} /> خروج
              </button>
            </div>
          )}
        </div>
      
      {isCreateModalOpen && (
        <CreatePortfolioModal onClose={() => setIsCreateModalOpen(false)} />
      )}
        

       
      </div>
    </header>
  );
}

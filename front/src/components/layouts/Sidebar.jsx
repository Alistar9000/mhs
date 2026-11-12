import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  FileText,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ChartArea,
  Users,
  UserSquare,
  UsersRound,
  Users2,
} from "lucide-react";

export default function Sidebar({ isOpen, collapsed, setCollapsed }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState('/dashboard');
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [path,setPath] = useState('')
  const location = useLocation()
  
  useEffect(() => {
    setPath(location.pathname)  
   
  }, [location.pathname])
  
  const isExpanded = !collapsed || isHovered;

  const toggleSubmenu = (title) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const SectionTitle = ({ children }) =>
    isExpanded ? (
      <div className="text-xs font-bold text-gray-400 px-4 mt-6 mb-2 select-none">
        {children}
      </div>
    ) : null;

  const renderMenuItem = (item) => {
    const Icon = item.icon;

    if (item.submenu) {
      const isOpen = openSubmenus[item.title];
      return (
        <div key={item.title}>
          <button
            className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50`}
            onClick={() => toggleSubmenu(item.title)}
          >
            <div className="flex items-center gap-2">
              <Icon size={18} />
              {isExpanded && <span>{item.title}</span>}
            </div>
            {isExpanded &&
              (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>

          {isOpen && (
            <div className="flex flex-col pl-10 mt-1">
              {item.submenu.map((sub) => (
                <NavLink
                  to={sub.path}
                  key={sub.title}
                  onClick={()=>setIsActive(sub.path)}
                  className={
                    `px-2 py-1 rounded-md text-sm font-medium ${
                      isActive === sub.path
                        ? "bg-blue-100  border-r-4 border-blue-500"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {sub.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        to={item.path}
        key={item.title}
        // onClick={()=>setIsActive(path)}
        className={
          `flex items-center mt-4 sm:w-[90%] w-fit gap-2 ${!collapsed ? 'px-4 py-2':''} rounded-md text-sm font-medium ${
            path === item.path
              ? "bg-blue-100 text-slate-700 hover:text-slate-700"
              : "text-gray-300 hover:text-slate-600 hover:bg-gray-50"
          }`
        }
      >
        <Icon size={18} />
        {isExpanded && <span>{item.title}</span>}
      </NavLink>
    );
  };

  return (
    <aside
      // onMouseEnter={() => collapsed && setIsHovered(true)}
      // onMouseLeave={() => collapsed && setIsHovered(false)}
      className={`
                bg-slate-700 hidden sm:flex flex-col
                transition-all duration-200
                fixed top-0 h-full right-4 z-40
                ${isExpanded ? "w-60" : "w-16"}
                ${
                  isOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }
            `}
    >
      {/* Collapse toggle */}
      <div className="flex justify-end p-2">
        <button
          className="p-1 outline-none border-none hover:bg-gray-100 rounded-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          {!collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>
      <div className="justify-center mb-5 w-full flex ">
        <div className="aspect-square rounded-full ring-4 ring-blue-100 w-10 overflow-hidden">

         <img src="/mhs2.png" className="object-cover" />
        </div>
      </div>
      <nav className="flex-1 px-2 flex flex-col gap-2">
        {menuItems.map((section) => (
          <div className="" key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.items.map(renderMenuItem)}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// menuItems array (can be moved to separate file)
const menuItems = [
  {
    // title: "هسته سیستم",
    items: [{ title: "داشبورد", icon: LayoutDashboard, path: "/dashboard" }],
  },
  {
    title: "سرمایه‌گذاری",
    items: [
      // { title: "پرتفوی", icon: PieChart, path: "/dashboard/portfolios" },
      {
        title: "سبدها",
        icon: Users,
        path: "/dashboard/portfolios",
        // submenu: [
        //     { title: "فعال", path: "/dashboard/portfolio/active" },
        //     { title: "غیرفعال", path: "/dashboard/portfolio/transactions" },
        // ],
      },
      {
        title: "نمادها",
        icon: PieChart,
        path: "/dashboard/symbols",
      },
    ],
  },
  {
    title: "چک لیست",
    items: [
      { title: "واچ لیست", icon: FileText, path: "/dashboard/watch_list" },
      { title: "واچ لیست هفتگی", icon: FileText, path: "/dashboard/watch_list_weekly" }
    
    ],
    
  },
];

import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ErrorIcon, toast } from "react-hot-toast";
import { usePortfolios } from "../../hooks/usePortfolios";
import PortfolioTable from "./PortfolioTable";
import { PortfoliosRowSkeleton } from "../ui/skeleton/PortfoliosRowSkeleton";
import useDebounce from "../../hooks/useDebounce";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  CircleAlert,
  FileWarning,
  Home,
  ServerCrash,
  SortAscIcon,
  SortDescIcon,
} from "lucide-react";
import { ErrorBar } from "recharts";
import Toast from "../ui/Toast";
import { useCrumbs } from "../../store/store";

const filters = [
  // {id:"all",name: "کل سبدها" },
  // {id:"active", name: "سبدهای فعال" },
  // {id:"inactive", name: "سبدهای غیرفعال" },
  { id: "0", name: "portfolio_value", text: "بیشترین ارزش", order: "desc" },
  { id: "1", name: "portfolio_value", text: "کمترین ارزش", order: "asc" },
  { id: "2", name: "return_amount", text: "بیشترین بازدهی", order: "desc" },
  { id: "3", name: "return_amount", text: "کمترین بازدهی", order: "asc" },
  { id: "4", name: "return_percent", text: "بیشترین درصد", order: "desc" },
  { id: "5", name: "return_percent", text: "کمترین درصد", order: "asc" },
  {
    id: "6",
    name: "manager_share",
    text: "بیشترین سهم سبدگردان",
    order: "desc",
  },
  { id: "7", name: "manager_share", text: "کمترین سهم سبدگردان", order: "asc" },
  { id: "8", name: "due_date", text: "نزدیک ترین سررسید", order: "asc" },
  { id: "9", name: "due_date", text: "دیرترین سررسید", order: "desc" },
];

export default function PortfolioPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [isSortLayoutOpen,setIsSortLayoutOpen] = useState(false);
  const { setCrumbs } = useCrumbs();
  const [localFiltered, setLocalFiltered] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | inactive
  const [sortBy, setSortBy] = useState({
    name: "return_percent",
    order: "desc",
  });
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    error,
    TAKE,
  } = usePortfolios({
    search: debouncedSearch,
    status: statusFilter,
    sortBy: sortBy?.name,
    order: sortBy?.order,
  });
  const portfolios = data?.pages?.flatMap((page) => page.data) || [];
  const total = data?.pages?.[0]?.total || 0;
  // ✅ useInView برای اسکرول خودکار بعد از کلیک "بیشتر"
  const { ref, inView } = useInView({ threshold: 0.3 });
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(false);

  useEffect(() => {
    if (!data) return;

    setCrumbs([
      {
        path: "/dashboard",
        label: (
          <div className="flex items-center gap-1">
            <Home size={16} /> داشبورد
          </div>
        ),
      },
      {
        path: "/dashboard/portfolios",
        label: "سبدها",
      },
    ]);
  }, []);

  React.useEffect(() => {
    if (autoLoadEnabled && inView && hasNextPage && !isFetchingNextPage) {
      const timeout = setTimeout(() => {
        fetchNextPage().catch(() => toast.error("خطا در لود سبدهای بیشتر"));
      }, 800); // تاخیر طبیعی برای لود
      return () => clearTimeout(timeout);
    }
  }, [autoLoadEnabled, inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ✅ وقتی اولین بار کلیک روی "بیشتر" انجام شد
  const handleLoadMoreClick = async () => {
    try {
      await loadMore();
      setAutoLoadEnabled(true);
    } catch (err) {
      toast.error("خطا در دریافت داده‌ها");
    }
  };

  // const handleSearch = useCallback(
  //   debounce((value) => {
  //     setDebouncedSearch(value);
  //   }, 600),
  //   []
  // );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    // handleSearch(value);
  };

  // useEffect(() => {
  //   if (!search) {
  //     setLocalFiltered(null);
  //     return;
  //   }

  //   const found = portfolios.filter((item) =>
  //     item?.name?.toLowerCase().includes(search.toLowerCase())
  //   );

  //   if (found.length > 0) {
  //     console.log('search found:',found)
  //     setLocalFiltered(null);
  //   } else {
  //     setLocalFiltered(null); // یعنی باید از API بیاد
  //   }
  // }, [search, portfolios]);

  // if (isLoading && !debouncedSearch )
  //   return (

  //   );

  // if (isError)
  //   return (

  //   );
//  console.log('portfolios:',portfolios)
  return (
    <div className="p-0 sm:p-4 space-y-3">
      {/* ✅ هدر اطلاعات */}

      <div className="flex flex-col sm:flex-row bg-gray-50 z-50 gap-5 sm:gap-0  sm:items-center sm:justify-between mb-2">
        <h1 className="text-xl font-bold">لیست سبدها</h1>
        <span className="text-sm text-gray-500">
          {portfolios.length} از {total} سبد نمایش داده شده
        </span>
      </div>
      <div className="bg-white w-full  dark:bg-gray-900 shadow-sm rounded-2xl  border border-gray-100 dark:border-gray-700">
        <div className="p-4 bg-white  z-40  rounded-t-2xl  border-b border-gray-100 dark:border-gray-700 flex  flex-col  justify-between gap-3">
          <input
            type="text"
            placeholder="جستجو بر اساس نام سبد..."
            value={search}
            onChange={onSearchChange}
            className="w-full  md:w-1/3 border md:min-w-80 h-fit border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm bg-transparent focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="flex xl:items-center flex-wrap text-[.7em]  gap-0 sm:gap-1">
            <span onClick={() => setIsSortLayoutOpen(e=>!e)} className=" text-gray-400 sm:pointer-events-none cursor-pointer sm:cursor-auto items-center flex gap-1 p-2  w-fit  min-w-fit pt-1.5">
              <SortDescIcon size={13} className="mt-0.5" />
              مرتب سازی
            
                <ChevronLeft size={10} className={`${isSortLayoutOpen && '-rotate-90'} sm:hidden transition-transform duration-300`} />
            </span>
            <div className={`${!isSortLayoutOpen ? 'grid grid-rows-[0fr] sm:block opacity-0 pointer-events-none sm:pointer-events-auto sm:opacity-100' : 'grid grid-rows-[1fr] opacity-100'} transition-all duration-300`}>
            <div className="overflow-hidden">
           
            <ul className={`flex *:grow *:sm:grow-0 flex-wrap gap-2 py-1`}>
              {filters?.map((item, index) => (
                <li
                  key={item.id}
                  className={`  ${
                    sortBy.name === item.name && sortBy.order === item.order
                      ? " text-red-400 border-red-400 border"
                      : "text-gray-400"
                  }  border rounded-xl  text-center  py-1 px-2  cursor-pointer`}
                  onClick={() =>
                    setSortBy({ name: item.name, order: item.order })
                  }
                >
                  {item.text}
                </li>
              ))}
            </ul>
               </div>
             </div>
           
          </div>
        </div>
        {/* ✅ جدول سبدها */}

        <PortfolioTable
          portfolios={localFiltered || portfolios}
          isLoading={isLoading}
          error={isError}
          sortBy={statusFilter}
        />

        {/* ✅ کنترل بارگذاری */}
        {!autoLoadEnabled && hasNextPage && (
          <div className="flex justify-center py-4">
            <button
              onClick={handleLoadMoreClick}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              مشاهده بیشتر
            </button>
          </div>
        )}

        {autoLoadEnabled && (
          <div ref={ref} className="flex justify-center py-4">
            {isFetchingNextPage ? (
              <div className="flex gap-2 items-center space-x-2 text-gray-500 text-sm">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>در حال بارگذاری...</span>
              </div>
            ) : (
              hasNextPage && (
                <span className="text-gray-400 text-sm animate-pulse">
                  اسکرول کنید برای مشاهده بیشتر...
                </span>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

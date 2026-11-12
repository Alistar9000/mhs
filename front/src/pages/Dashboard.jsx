import { useAuthStore } from "../store/auth";
import { useEffect, useState } from "react";

import DashboardLayout from "../components/layouts/DashboardLayout";
import KpiCard from "../components/dashboard/KpiCard";
import { TrendingUp, PieChart, ArrowUpRight, Wallet, Home, TrendingDown } from "lucide-react";
import DashboardChart from "../components/charts/DashboardChart";
import TopPortfolioTable from "../components/dashboard/TopPortfolioTable";
import TopSymbolTable from "../components/dashboard/TopSymbolTable";
import { Outlet } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { DashboardSkeleton } from "../components/ui/skeleton/ِDashboardSkeleton";
import Toast from "../components/ui/Toast";
import { useCrumbs } from "../store/store";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
export default function Dashboard() {
  const { updateActivity, checkIdleTimeout } = useAuthStore();
  const { crumbs, setCrumbs } = useCrumbs();

  useEffect(() => {
    if (crumbs.lenght == 0) return;

    setCrumbs([
      {
        path: "/dashboard",
        label: (
          <div className="flex items-center gap-1">
            <Home size={16} /> داشبورد
          </div>
        ),
      },
    ]);
  }, []);
  // useEffect(() => {
  //   // هر کلیک، حرکت موس یا تاچ => به‌روز رسانی آخرین فعالیت
  //   const update = () => updateActivity();
  //   window.addEventListener("click", update);
  //   window.addEventListener("mousemove", update);
  //   window.addEventListener("keydown", update);
  //   window.addEventListener("scroll", update);

  //   const interval = setInterval(() => checkIdleTimeout(), 5 * 60 * 1000);
  //   // const interval = setInterval(() => checkIdleTimeout(), 10000);

  //   return () => {
  //     window.removeEventListener("click", update);
  //     window.removeEventListener("mousemove", update);
  //     window.removeEventListener("keydown", update);
  //     window.removeEventListener("scroll", update);
  //     clearInterval(interval);
  //   };
  // }, []);
  const { data, isLoading, isError } = useDashboard();
  // const data = {
  //   totalValue: "۱۲۵ میلیارد تومان",
  //   totalReturn: "1.2 میلیارد تومان",
  //   totalReturnPct: "501.2",
  //   initialValue:"10 میلیارد تومان",
  //   positive: 23,
  //   negative: 5,
  //   managerShare: "۵.۲ میلیارد تومان",
  //   negativeValues: "۱ میلیارد تومان",
  // };

  // const topSymbols = [
  //   {
  //     id: 1,
  //     name: "خودرو",
  //     share: 28,
  //     value: "۳.۵ میلیارد ",
  //     lastPrice: "-2.3",
  //     updatedAt: "2025-10-21",
  //   },
  //   {
  //     id: 2,
  //     name: "شپنا",
  //     share: 22,
  //     value: "۲.۸ میلیارد ",
  //     lastPrice: "-0.5",
  //     updatedAt: "2025-10-21",
  //   },
  //   {
  //     id: 3,
  //     name: "فارس",
  //     share: 18,
  //     value: "۲.۳ میلیارد ",
  //     lastPrice: "-1.2",
  //     updatedAt: "2025-10-21",
  //   },
  //   {
  //     id: 4,
  //     name: "سصوفی",
  //     share: 12,
  //     value: "۱.۵ میلیارد ",
  //     lastPrice: "2.99",
  //     updatedAt: "2025-10-21",
  //   },
  //   {
  //     id: 5,
  //     name: "وبملت",
  //     share: 10,
  //     value: "۱.۲ میلیارد ",
  //     lastPrice: "3.99",
  //     updatedAt: "2025-10-21",
  //   },
  // ];

  // const topPortfolios = [
  //   {
  //     id: 1,
  //     customer: "مشتری ۱",
  //     totalValue: "۱۲ میلیارد ",
  //     return: "+888.5%",
  //     updatedAt: "2025-10-21",
  //     chartData: [100, 102, 101, 104, 108, 107, 110], // mock sparkline
  //   },
  //   {
  //     id: 2,
  //     customer: "مشتری ۲",
  //     totalValue: "۹.۵ میلیارد ",
  //     return: "-17.2%",
  //     updatedAt: "2025-10-21",
  //     chartData: [80, 82, 81, 85, 86, 88, 90],
  //   },
  //   {
  //     id: 3,
  //     customer: "مشتری ۳",
  //     totalValue: "۸.۲ میلیارد ",
  //     return: "+6.8%",
  //     updatedAt: "2025-10-21",
  //     chartData: [70, 72, 71, 73, 74, 75, 76],
  //   },
  //   {
  //     id: 4,
  //     customer: "مشتری ۴",
  //     totalValue: "۷.۹ میلیارد ",
  //     return: "+6.1%",
  //     updatedAt: "2025-10-21",
  //     chartData: [60, 62, 61, 63, 64, 65, 66],
  //   },
  //   {
  //     id: 5,
  //     customer: "مشتری ۵",
  //     totalValue: "۷.۵ میلیارد ",
  //     return: "-5.9%",
  //     updatedAt: "2025-10-21",
  //     chartData: [55, 56, 57, 58, 59, 60, 61],
  //   },
  // ];

  if (isLoading) return <DashboardSkeleton />;
  if (isError)
    return (
      <div className="h-screen flex justify-center items-start">
        خطا در دریافت داده از سمت سرور!
      </div>
    );

  return (
    
      <div className="">
        <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] mb-5 gap-4">

      
        <KpiCard
          title="ارزش کل سبدها"
          value={data?.summary?.total_value?.toLocaleString()}
          icon={Wallet}
          sub={`آورده : ${data?.summary?.total_initial?.toLocaleString()}`}
        />

        <KpiCard
          title="بازدهی کل"
          value={data?.summary?.total_return?.toLocaleString()}
          icon={TrendingUp}
          sub={data?.summary?.total_return_percent}
          trend={ data?.trend === 'up' ? (
                            <TrendingUp size={15} className="text-green-500 " />
                          ) : (
                            <TrendingDown size={15} className="text-red-500" />
                          )}
        />

        <KpiCard
          title="سبدهای مثبت / منفی"
          value={[
            data?.summary?.portfolioStatus?.pos,
            data?.summary?.portfolioStatus?.neg,
          ]}
          icon={PieChart}
          sub={`${data.summary?.total_value_negs?.toLocaleString()}`}
        />

        <KpiCard
          title="سهم سبدگردان"
          value={data?.summary?.total_manager_share?.toLocaleString()}
          icon={ArrowUpRight}
          sub={'از مجموع ارزش سبدها'}
        />
        </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-5">
         <DashboardChart />
        <TopPortfolioTable data={data?.top_portfolios} />
        
      </div>
     <TopSymbolTable data={data?.top_symbols} />
    </div>
  );
}

import React, { useState, useMemo, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import SymbolPortfolioModal from "./SymbolPortfolioModal";
import { useSymbols } from "../../hooks/useSymbol";
import SymbolsPieChart from "../charts/SymbolsPieChart";
import SymbolSkeleton from "../ui/skeleton/SymbolsSkeleton";
import { useCrumbs } from "../../store/store";
import { Home } from "lucide-react";

export default function SymbolsPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("value");
  const [sortDir, setSortDir] = useState("desc");
  const {setCrumbs} = useCrumbs()

  const {data , isLoading, isError,isSuccess} = useSymbols()
  const totalMarketValue = useMemo(
    () => (data || []).reduce((sum, s) => sum + s.value, 0),
    [data]
  );
  
  
const filtered = useMemo(() => {
    return (data || []).filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
      
  }, [data, search, sortKey, sortDir]);

  const finalData = filtered.map(item => ({
        ...item,
        share: ((item.value / totalMarketValue) * 100).toFixed(1),
      })).sort((a, b) =>sortDir === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey] );;

  const pieData = filtered?.map((s) => ({
    name: s.name,
    value: s.value,
  }));

  const generateColors = (count) =>
    Array.from({ length: count }, (_, i) => {
      const hue = Math.round((360 / count) * i);
      return `hsl(${hue},70%,55%)`;
    });

  const COLORS = generateColors(pieData?.length);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  useEffect(()=>{
    if(!data) return

    setCrumbs([
      {
            path:'/dashboard',
            label: <div className="flex items-center gap-1"><Home size={16} /> داشبورد</div>
          },
          {
            path:'/dashboard/symbols',
            label: 'نمادها'
          }
    ])
  },[])

   if(isLoading)
    return <SymbolSkeleton />
  
  //  if(isSuccess)
  //   return <SymbolSkeleton />
  
  if(isError)
    return "خطا در بارگزاری نمادها"
 
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            مدیریت نمادها
          </h1>
          <p className="text-gray-500 text-sm">
            داشبورد تجمیعی نمادهای همه سبدها
          </p>
        </div>

        <input
          type="text"
          placeholder="جستجو نماد..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full sm:w-auto rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white shadow-md lg:col-span-2">
          <div className="p-6">
            <h2 className="font-semibold mb-4">
              سهم هر نماد از کل دارایی‌ها
            </h2>
            <div className="flex w-full justify-end">

              <SymbolsPieChart portfolioWithValue={pieData} />
            </div>
          
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-md">
          <div className="p-6 space-y-4">
            <div>
              <p className="text-gray-500 text-sm">
                ارزش کل همه پرتفوها
              </p>
              <p className="text-2xl font-bold mt-2">
                {totalMarketValue.toLocaleString()} تومان
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                تعداد نمادهای فیلتر شده
              </p>
              <p className="text-2xl font-bold mt-2">
                {filtered.length}
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* Table */}
      <div className="rounded-2xl overflow-hidden w-full bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            لیست نمادها
          </h2>

          <div className="overflow-auto w-full max-h-96">
            <table className="w-full  text-sm">
              <thead>
                <tr className="text-gray-500 *:text-start sm:*:text-center *:bg-slate-50">
                  <th className="cursor-pointer py-2">نام نماد</th>
                  <th onClick={() => toggleSort("quantity")} className="cursor-pointer">تعداد کل</th>
                  <th onClick={() => toggleSort("value")} className="cursor-pointer">ارزش کل <span className="text-xs">(تومان)</span></th>
                  <th onClick={() => toggleSort("share")} className="cursor-pointer">سهم (%)</th>
                  <th onClick={() => toggleSort("last_price_pct")} className="cursor-pointer !text-end sm:!text-center">قیمت (%)</th>
                </tr>
              </thead>
              <tbody>
                {finalData.map((s, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelected(s)}
                    className="border-b last:border-none *:min-w-20 sm:*:min-w-0 *:text-start hover:bg-slate-50 cursor-pointer sm:*:text-center"
                  >
                    <td className="py-3 font-semibold">{s.name}</td>
                    <td>{Number(s.quantity).toLocaleString()}</td>
                    <td className="!min-w-32 sm:!min-w-0">{s.value.toLocaleString()}</td>
                     <td className="">
                <div className="bg-gray-200 rounded-full h-2 w-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${s.share}%` }}
                  ></div>
                </div>
                <span className="text-xs">{s.share}%</span>
              </td>
                    <td dir="ltr"
                      className={`font-medium !text-start sm:!text-center pl-4 sm:pl-0 ${
                        s.last_price_pct >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {s.last_price_pct}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer */}
     <SymbolPortfolioModal selected={selected} setSelected={setSelected} />
    </div>
  );
}

import { PieChartIcon } from "lucide-react";
import moment from "moment-jalaali";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PieChart } from "recharts";

export default function TopSymbolTable({ data }) {
  const navigate = useNavigate();
  // const total_value = [...data].map(symbol => (

  // ))
  return (
    <div className="bg-white shadow-card lg:col-span-3  rounded-xl2 p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-[15px] font-bold flex items-center gap-2">
          {/* <PieChartIcon className="w-5 h-5 text-blue-500" /> */}
          نمادهای با بیشترین سهم از دارایی کل
        </p>
        {/* <Link
          to={"/dashboard/symbols"} // روت کامل نمادها
          className="text-blue-500 text-xs hover:underline"
        >
          مشاهده بیشتر
        </Link> */}
      </div>
      <div className="">

      <table className="min-w-full table-fixed divide-y divide-gray-200 ">
        <thead>
          <tr className="text-xs *:text-right *:py-2.5 *:w-1/4 text-gray-400">
            <th className="">نماد</th>
            <th className="">سهم (%)</th>
            <th className="">
              ارزش <span className="">(تومان)</span>
            </th>
            <th className=""> قیمت (%)</th>
          </tr>
        </thead>
        <tbody className="divide-y text-[13px]  divide-gray-100">
          {data?.map((s) => (
            <tr key={s.code} className="hover:bg-gray-50  *:py-4">
              <td className="font-bold">{s.name}</td>
              <td className="">
                <div className="bg-gray-200 rounded-full h-2 w-1/2">
                  <div
                    className="bg-good h-2 rounded-full"
                    style={{ width: `${s.percent}%` }}
                  ></div>
                </div>
                <span className="text-sm">{s.percent}%</span>
              </td>
              <td className="">{s.value.toLocaleString()}</td>
              <td dir=""
                className={`  ${
                  s.last_price_pct < 0
                    ? "text-bad"
                    : "text-good"
                }`}
              >
                {Math.abs(s.last_price_pct)}%
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

import React from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Link } from "react-router-dom";
import moment from "moment-jalaali";
import PortfolioMiniChart from "../charts/PortfolioMiniChart";
import { TrendingUp } from "lucide-react";
import { slugify } from "../../utils/slugify";

export default function TopPortfolioTable({ data }) {

  return (
    <div className="bg-white lg:col-span-4 shadow-card rounded-xl2 p-6 gap-6 flex-1 flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className=" text-[15px] font-bold flex items-center gap-2">
          {/* <TrendingUp className="w-5 h-5 text-green-500" /> */}
          سبدهای برتر
        </h3>
        {/* <Link
          to="/dashboard/portfolios" // روت کامل سبدها
          className="text-blue-500 text-xs hover:underline"
        >
          مشاهده بیشتر
        </Link> */}
      </div>
      {/* <div className="overflow-auto  scrollbar-hide w-full"> */}

      
      <table className="min-w-full  divide-y divide-gray-200 text-sm">
        {/* <thead>
          <tr className="text-nowrap">
            <th className="px-4 py-2 text-right">مشتری</th>
            <th className="px-4 py-2 text-right">
              ارزش<span className="text-xs">(تومان)</span>
            </th>
            <th className="px-4 py-2 text-right">بازدهی (%)</th>
           
            <th className="px-4 py-2 text-right">نمودار ۱ ماهه</th>
          </tr>
        </thead> */}
        <tbody className="divide-y divide-gray-100">
          {data?.map((p) => (
            <tr key={p.values.portfolio.id} className="hover:bg-gray-50 *:py-3 *:text-nowrap">
              <td className="">
                <Link className="font-normal text-black hover:text-black"  to={`/dashboard/portfolios/${p.values.portfolio.id}/${slugify(
                                      p.values.portfolio.name
                                    )}`}>
                {p.values.portfolio.name}
                <div className="flex gap-1 font-normal text-xs  mt-2 text-gray-500 items-center">

                <p>

                {p.values.portfolio_value.toLocaleString()}
               
                </p>
                تومان
                </div>
                </Link>
                </td>
              {/* <td className="px-4 py-2 text-right">{p.values.portfolio_value.toLocaleString()}</td> */}
              <td dir="ltr" className="px-4 py-2 w-32 h-12">
                <PortfolioMiniChart  data={p.chart_data} dashboard={true} />
              </td>
              <td dir="ltr"
                className={`px-4 py-2 font-bold text-[13px] text-left
                   ${
                  p.values.return_amount < 0 ? "text-bad" : "text-good"
                }`}
                  
              >
                {Math.abs(p.values.return_percent)}%
              </td>
              {/* <td className="px-4 py-2">
                {moment(p.updated_at, "YYYY-MM-DD").format("jYYYY/jMM/jDD")}
              </td> */}
              
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
}

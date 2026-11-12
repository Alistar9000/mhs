import { PieChart, TrendingUp, Wallet } from "lucide-react";

export default function KpiCard({ title, value, icon, sub, trend }) {
  const Icon = icon;
  return (
    <div className="bg-white relative overflow-hidden p-6 rounded-xl2 shadow-card after:content-[''] after:absolute after:top-0 after:left-0 after:w-1 after:h-full after:bg-gradient-to-b after:to-green-500 after:from-blue-500">
    
     <h4 className="text-xs mb-2.5 text-muted">{title}</h4>
    
      {icon == PieChart ? (
        <div className="text-[19px] *:rounded-lg *:py-0.5 *:font-semibold *:px-2.5 flex items-center gap-2 font-extrabold text-gray-700">
          <span className="text-good bg-good-soft">{value[0]}</span> /
          <span className="text-bad bg-bad-soft">{" " + value[1]}</span>
        </div>
      ) : (
        <div className="text-[19px] flex items-center gap-2 ">
          <span dir="ltr" className="font-extrabold text-gray-700">
            {value}
            </span>
         <span className="text-xs text-gray-400">تومان</span></div>
      )}
      {sub && icon == TrendingUp ? (
        <div
          className={`text-xs ${sub >= 0 ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"} rounded-lg px-2.5 w-fit mt-2.5 py-1 flex gap-2`}
        >
          {trend}
          <p dir="ltr" className={``}>{sub}%</p>
        </div>
      ) : (
        <div className={`text-[11.5px] text-muted `}>
          {icon == PieChart ? 
          <div className="flex gap-1 w-full mt-2.5 items-center">
           <span>زیان سبدهای منفی: </span>
          <span dir="ltr" className="">{sub}</span> 
           <span className="text-[.6rem] text-gray-400">تومان</span>
          </div>
          
          : sub &&  <div className="flex mt-2.5 gap-1 items-center">
            {sub}
            <span className="text-gray-400 text-[0.6rem]">تومان</span>
          </div>
              }
          
        </div>
      )}
    </div>
  );
}

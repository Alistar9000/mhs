import { useSelector } from "react-redux";
import TopThreeUsersChart from "../userheader/users/chart";
import "./index.css";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { Comma } from "../../../../comma";
import { MdMoney } from "react-icons/md";
import { BiDollar, BiDollarCircle, BiSolidDollarCircle } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import { FaDollarSign } from "react-icons/fa";

const DashboardData = () => {
  const rdata = useSelector((e) => e.data.value);
  const trend = rdata.allchartdata30.trend;
  let negS =0;
  const negUsers = rdata.data.map(e=>e.gain<0 && e.status == 0 ? negS+=e.gain:0)
  const data = [...rdata.toolbar];
  const percent = (((data[0][1] - data[0][0]) / data[0][0]) * 100).toFixed(2);
  return (
    <div
    dir="rtl"
     
      className=" grid grid-rows-[2vh_12vh_4vh] col-span-2 sm:col-span-1 sm:rounded-lg h-full py-2  px-4 bg-white"
    >
      <div
        className="text-gray-800 flex gap-x-2 place-items-center font-bold byekan sm:text-[.9em] text-[1.1em]"
        
      >
        <BiDollarCircle className=" text-[1.2em] text-gray-500" />
        دارایی کل
      </div>
      <div className=" grid place-items-center ">
      <div className="">
      <div className="grid grid-cols-6">

        
<div className="flex justify-end col-start-5" style={{}}>
  <span
  
    className="py-0.5 px-2 rounded-md  font-bold sm:text-[.7em] text-[.9em] text-slate-400 "
  >
    بازدهی
  </span>
</div>
</div>
<div
dir="ltr"
  className="px-2 sm:text-[1.4em] text-[1.6em] font-bold place-items-center flex gap-x-2 justify-center"
  
>
   <span className="text-[.6em] text-slate-400">ریال</span>
  {percent >= 0 ? "+" + Comma(+data[0][2]) : "-" + Comma(+data[0][2])}
 

  {percent >= 0 ? (
    <span
      className="rounded-md flex place-items-center bg-green-100/25 text-green-600 text-[.5em] gap-x-1 px-2 py-.5"
     
    >
      {Math.abs(percent)} 
      {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
    </span>
  ) : (
    <span
      className="rounded-md bg-rose-100/35 text-[red] text-[.6em] flex place-items-center gap-x-1 px-2 py-.5"
      
    >
      {Math.abs(percent)}
      {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown  className="text-[red]" />}
    </span>
  )}
 
</div>
      </div>
        <div dir="ltr" className="grid sm:grid-cols-5 grid-cols-6 px-4 w-full h-full text-[.8em]  sm:text-[.6em]">
          <div className=" text-gray-400 sm:col-span-1  col-start-2 sm:col-start-1 flex place-items-center ">سبدهای منفی</div>
          <div className=" col-span-3   text-[red] flex  place-items-center   px-2 sm:text-[1.5em] text-[1.3em]">
          <div className="flex gap-x-1 px-2 rounded-lg bg-rose-50/60 py-0.5 place-items-center">
          <span className="sm:text-[.6em] text-[.8em] ">ریال</span>{Comma(Math.abs(negS))}
          </div>
         
          
          </div>
        </div>
      </div>
     <div className="grid place-items-end ">
      <div className="flex justify-between  w-full  sm:text-[.7em]  " >
        <div
          className="font-semibold  h-full w-full flex gap-x-2 place-items-center text-slate-500"
          
        >
            <span className="bg-gray-100 sm:text-[.9em] text-[.8em] text-slate-600 rounded-md py-0.5 byekan  px-2">ارزش </span>
          {Comma(+data[0][1])}{" "}
        </div>
        <div
          style={{  }}
          className="flex gap-x-2  text-slate-500 place-items-center font-bold"
        >
          <span  className="bg-gray-100 sm:text-[.9em] text-[.8em] text-slate-600 rounded-md py-0.5 byekan  px-2">آورده</span>
           {Comma(+data[0][0])}
        </div>
      
      </div>
      </div>
    </div>
  );
};

export default DashboardData;

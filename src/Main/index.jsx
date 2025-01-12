import { NavLink, Outlet } from "react-router-dom";
import Toolbar from "../Toolbar/index";
import "./index.css";
import SymbolList from "../Toolbar/symbols";
import {
  BiDollar,
  BiFirstAid,
  BiFirstPage,
  BiInfinite,
  BiMoney,
  BiVial,
} from "react-icons/bi";
import { FaV, FaVault } from "react-icons/fa6";
import { CiMoneyBill, CiVault } from "react-icons/ci";
import { PiCurrencyDollar, PiMoney, PiVectorTwoFill } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { persian_date, persian_date_full } from "../persian_date";
const Main = () => {
  const data = useSelector((e) => e.data.value);
  const name = data.headername;

 const chartdata = data.allchartdata30?.data;
//  const chartdata = allchart.data;
//  const chartdata = [...allchart.data];
  const index = chartdata?.length-1;
  const date =chartdata && chartdata[index]?.date;
  // const date =''
  return (
    <div
      className="grid overflow-hidden bg-[#f6f6f6]  sm:grid-rows-[14vh_83.5vh] grid-rows-[12vh_76vh] gap-2"
      
    >
      <div className="grid  sm:grid-rows-[7vh_7vh] grid-rows-[6vh_6vh]">
        <SymbolList />
        <div  className=" border-t-2 h-full w-full sm:bg-white  grid sm:grid-cols-[40%_60%] grid-cols-[35%_65%] ">
          <div className=" px-4  flex place-items-end pb-1 w-full  sm:w-1/2 ">
            <NavLink to={"/add"}>
              <button
                className="rounded-lg px-3 py-1 byekan bg-sky-500 sm:text-[.85em] text-[.6em] text-white flex place-items-center justify-center gap-x-2 font-bold"
                
              >
                {" "}
                سبد جدید <span className="mt-1">+</span>
              </button>
            </NavLink>
          </div>
          <div dir="rtl"
            className="flex place-items-end  gap-x-4 sm:text-[1em]  pr-4 sm:px-6 w-full"
            
          >
            <span
              className="text-gray-800 byekan sm:text-[1.3em] sm:w-auto text-[1.1em] font-bold"
              
            >
              {name}
            </span>
            <div
             
              className="text-gray-500 pb-1 sm:w-auto  sm:text-[.75em]  text-[.7em]"
            >
              آخرین بروزرسانی : <span>{persian_date_full(date)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home sm:px-2    overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;

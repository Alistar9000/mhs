import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import TopThreeUsersChart from "../userheader/users/chart";
import { useState } from "react";
import Userlist from "./user";
import { BiSolidLike } from "react-icons/bi";
import { FiArrowUpLeft } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { setUserListMoreIndex } from "../../../../redux/initialData";

const DashboardUserList = () => {
  const rdata = useSelector((e) => e.data.value);
  const data = [...rdata.data];
  const [changemore,setChangeMore] = useState(false)
  const dispatch = useDispatch();
  const chartdata = [...rdata.chartdata];
  const enableData = data.filter(e=>e.status == 0);
  
  return (
    <div
    dir="rtl"
      className="sm:rounded-lg overflow-auto grid  sm:grid-rows-[4vh_36vh] grid-rows-[4vh_44.5vh]  h-full col-span-2 row-span-1 sm:row-span-2 pt-2 px-2 pb-0 bg-white"
    >
      <div className="grid text-[.8em] sm:text-[.75em]   sm:grid-cols-[1.2fr_.9fr_.8fr_.9fr_.7fr] grid-cols-[.9fr_1.1fr_.8fr_.5fr] bg-gray-100  rounded-t-lg py-1 px-2">
        <div className="byekan  flex sm:pr-10 place-items-center font-bold sm:justify-start justify-center text-slate-500">نام</div>
        <div className="byekan font-bold flex justify-center place-items-center text-slate-500">
          بازدهی
        </div>
        <div className="byekan font-bold flex justify-center place-items-center  text-slate-500">درصد</div>
        
        <div className=" hidden sm:flex byekan font-bold  justify-center place-items-center text-slate-500">ارزش</div>
       
        

        <div className="sm:flex w-full sm:justify-end ">
          <NavLink to={"/userss"}>
            <span className="byekan text-[.85em]  rounded-lg flex gap-x-2 place-items-center font-semibold bg-rose-100 px-2 py-0.5 cursor-pointer text-rose-500">
              مشاهده همه <FiArrowUpLeft  className="text-[1.2em]  sm:text-[1em]"/>
            </span>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-flow-row">
        {enableData
          .sort((a, b) => (a.sabadValue < b.sabadValue ? 1 : -1))
          .map((e, i) => i > 1 && i <= 7 && <Userlist id={e.id} data={e} click={()=>dispatch(setUserListMoreIndex(e.id))} index={i} chartdata={chartdata} enableData={enableData} />)}
      </div>
    </div>
  );
};
export default DashboardUserList;

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./index.css";
import { useSelector } from "react-redux";
import { FcDislike, FcLike } from "react-icons/fc";
import { BiDislike, BiGroup, BiLike, BiSolidDislike, BiSolidGroup, BiSolidLike, BiSolidUserAccount, BiUser, BiUserCheck } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { FaUserSecret, FaUserShield, FaUserSlash } from "react-icons/fa";
import { PiUserList, PiUserListBold, PiUserListDuotone, PiUserListFill, PiUserSound, PiUserSquare, PiUserSwitch } from "react-icons/pi";
import { CgUserList } from "react-icons/cg";
import { FaGroupArrowsRotate, FaObjectGroup } from "react-icons/fa6";
import { MdGroup, MdGroups, MdGroups2, MdGroups3, MdOutlineGroups } from "react-icons/md";
import { RxGroup } from "react-icons/rx";

const DashboardSabadCount = ({ d }) => {
  const rdata = useSelector((e) => e.data.value);
  const countref = useRef();
  const COLORS = ["#30E61C", "#FF585B"];
  const data = [...rdata.toolbar];
  let array = [];
  array.push({ value: data[0][4] }, { value: data[0][5] });
  const count = array[0].value + array[1].value;
  const [sabadcount, setSabadCount] = useState(0);
  const posP = ((array[0].value / count) * 100).toFixed(2);
  const negP = ((array[1].value / count) * 100).toFixed(2);
  let i = 0;
  useEffect(() => {
    setTimeout(() => {
      sabadcount < count && setSabadCount((e) => sabadcount + 1);
      sabadcount > count && setSabadCount(0);
    }, 10);
  }, [sabadcount, count]);

  return (
    <div
      dir="rtl"
      className="font-bold byekan grid grid-rows-[15%_85%]  sm:rounded-lg col-span-2 sm:col-span-1 w-full h-full  py-2 px-4 bg-white"
    >
      <div className="font-bold flex gap-x-2 place-items-center text-gray-800 sm:text-[.9em] text-[1.2em] byekan">
        <BiGroup className="text-[1.2em] text-gray-500" />
        سبدها
      </div>
      <div className="grid grid-cols-2 text-[.8em] px-2">

      <div className=" h-full w-full hidden sm:flex justify-center gap-y-3 flex-col">
          <div className="w-full flex flex-col  place-items-end">
            <div className="flex w-[90%]" style={{lineHeight: "20px" }}>
              <div
                className="text-end text-slate-400 flex-[60%]"
                
              >
                {"% " + posP}
              </div>
              <div className="flex justify-end flex-[40%]">
                <BiSolidLike
                  className="text-[var(--green-color)] text-[1.5em]"
                 
                />
              </div>
            </div>
            <div className="flex w-full justify-end  place-items-center  gap-x-2">
              <div className="text-end text-[1.2em] flex-[10%] ">
                {data[0][4]}
              </div>
              <div
               
                className="h-[.4em] w-full flex-[90%] bg-gray-200 relative rounded-xl"
              >
                <div
                  className={`absolute h-full  rounded-xl left-0 top-0`}
                  style={{width:posP+'%',background:COLORS[0]}}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col  place-items-end">
            <div className="flex w-[90%] " style={{lineHeight: "20px" }}>
              <div
                className="text-end text-slate-400 flex-[60%]"
                
              >
                {"% " + negP}
              </div>
              <div className="flex justify-end flex-[40%]">
                <BiSolidDislike
                  className="text-[red] text-[1.5em]"
                 
                />
              </div>
            </div>
            <div className="flex w-full justify-end  place-items-center  gap-x-2">
              <div className="text-end text-[1.2em] flex-[10%] ">
                {data[0][5]}
              </div>
              <div
               
                className="h-[.4em] w-full flex-[90%] bg-gray-200 relative rounded-xl"
              >
                <div
                  className={`absolute h-full rounded-xl left-0 top-0`}
                  style={{width:negP+'%',background:COLORS[1]}}
                ></div>
              </div>
            </div>
          </div>
         
       
        </div>
      <div className=" justify-center flex sm:place-items-start place-items-center">
        <div className="">  
          <div className=" flex  justify-center text-[.9em]">
            <span className=" text-slate-400 rounded-lg py-0.5 px-2  ">
              تعداد
            </span>
          </div>
          <div
            ref={countref}
            className="text-center  sm:text-[2em] text-[2.5em]"
            
          >
            {sabadcount + " سبد"}
          </div>
          </div>
        </div>
        <div className=" h-full w-full flex sm:hidden justify-center gap-y-3 flex-col">
          <div className="w-full flex flex-col  place-items-end">
            <div className="flex w-[90%]" style={{lineHeight: "20px" }}>
              <div
                className="text-end text-gray-500 text-[1.2em] flex-[60%]"
                
              >
                {"% " + posP}
              </div>
              <div className="flex justify-end flex-[40%]">
                <BiSolidLike
                  className="text-[var(--green-color)] text-[1.5em]"
                 
                />
              </div>
            </div>
            <div className="flex w-full justify-end  place-items-center  gap-x-2">
              <div className="text-end text-[1.5em]  flex-[10%] ">
                {data[0][4]}
              </div>
              <div
               
                className="h-1 w-full flex-[90%] bg-gray-200 relative rounded-xl"
              >
                <div
                  className={`absolute h-full  rounded-xl left-0 top-0`}
                  style={{width:posP+'%',background:COLORS[0]}}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col  place-items-end">
            <div className="flex w-[90%] " style={{lineHeight: "20px" }}>
              <div
                className="text-end text-gray-500 text-[1.2em] flex-[60%]"
                
              >
                {"% " + negP}
              </div>
              <div className="flex justify-end flex-[40%]">
                <BiSolidDislike
                  className="text-[red] text-[1.5em]"
                 
                />
              </div>
            </div>
            <div className="flex w-full justify-end  place-items-center  gap-x-2">
              <div className="text-end text-[1.5em] flex-[10%] ">
                {data[0][5]}
              </div>
              <div
               
                className="h-1 w-full flex-[90%] bg-gray-200 relative rounded-xl"
              >
                <div
                  className={`absolute h-full rounded-xl left-0 top-0`}
                  style={{width:negP+'%',background:COLORS[1]}}
                ></div>
              </div>
            </div>
          </div>
         
       
        </div>
       
      </div>
    </div>
  );
};

export default DashboardSabadCount;

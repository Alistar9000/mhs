import { FiUsers } from "react-icons/fi";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import TopThreeUsers from "./users";
import { useState } from "react";
// import { setHideUserMoreWindow } from "../../../../redux/initialData";
import { MdRealEstateAgent } from "react-icons/md";
import { Comma } from "../../../../comma";
// import { Comma } from "../../../../comma";

const DashboardUserHeader = () => {
  const dispatch = useDispatch()
  const data = useSelector((e) => e.data.value);
  const agentpart = data.toolbar[0][3];
  // const [selectedIndex,setSelectIndex] = useState(null)
  const userData =data.data;
  
  const d = [...userData].filter(e=>e.status == 0).sort((a, b) => (a.sabadValue < b.sabadValue ? 1 : -1))
  
  return (
    <div
      dir="rtl"
      className="sm:rounded-lg  sm:text-[.9em] text-[1.1em]   col-span-2 grid grid-rows-[12vh_20vh_20vh] sm:grid-rows-1  sm:grid-cols-3 gap-y-2 sm:gap-y-0  sm:gap-x-2"
    >
      <div className="sm:rounded-lg  grid  grid-rows-[4vh_8vh] sm:grid-rows-[5vh_13vh] bg-white  ">
        <div className="flex gap-x-2 byekan px-4  font-bold text-orange-500  place-items-center"><MdRealEstateAgent className="text-orange-400 text-[1.1em] "/>سهم سبدگردان کل</div>
        <div dir="ltr" className="flex place-items-center  justify-center font-bold text-green-600 gap-x-2   text-[1.4em]"><span className="sm:text-[.5em] text-[.7em]">ریال</span>{Comma(+agentpart)}</div>
      </div>
<div className="bg-white rounded-lg">{d && <TopThreeUsers data={d[0]} id={d[0]?.id} index ={0}/>}</div>
<div className="bg-white rounded-lg">{d && <TopThreeUsers data={d[1]} id={d[1]?.id} index ={1}/>}</div>
    </div>
  );
};

export default DashboardUserHeader;

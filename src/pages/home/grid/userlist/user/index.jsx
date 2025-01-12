import { useDispatch, useSelector } from "react-redux";
import TopThreeUsersChart from "../../userheader/users/chart";
import {
  FiDelete,
  FiEdit,
  FiMoreHorizontal,
  FiMoreVertical,
  FiTrash,
  FiTrendingDown,
  FiTrendingUp,
  FiUserX,
} from "react-icons/fi";

import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { DisableCard } from "../../../../userdetail/data/userinfo";
import { NavLink } from "react-router-dom";
import UserMoreWindow from "../../../../../MoreWindow";
import { Comma } from "../../../../../comma";
import { setUserIndex, setUserListMoreIndex } from "../../../../../redux/initialData";
// import { Comma } from "../../../../../comma";
const Userlist = ({ data, chartdata,enableData ,index,id,click,changemore}) => {
  const {name, gain, percent, sabadValue, initial_money ,status,trend} = data;
  
  const dispatch = useDispatch()
  const d = useSelector(e=>e.data.value)
  const change = d.userlistmoreindex;
  let arraychart = [];
  const chart = chartdata.filter(e=>e.name === name);
  const c = chart[0]?.data.map((e, i) => {
    i >= chart[0]?.data.length - 30 &&
      arraychart.push({ value: e.value / 1000000000 });
  });
  // console.log("chartdata in uselist :", JSON.stringify(chartdata));
  return (
    <div
      className={`grid relative text-[1em] sm:text-[.8em]  bg-[#f6f6f6] sm:grid-cols-[1.2fr_.9fr_.8fr_.9fr_.7fr] grid-cols-[1fr_1.1fr_.8fr_.7fr]  ${index == 0 && ''} pt-0.5    text-slate-600 `}
     
    >
      <UserMoreWindow name={name} id={id} status={status} index={id} parent={"dashboard_userlist"}/>
      <div
        className={`overflow-hidden text-[.9em]  ml-0.5 rounded-sm transition-all duration-200  font-bold flex  byekan px-1 bg-white place-items-center text-gray-800 gap-x-2`}
       
      >
      
        <div className={`flex gap-x-2 place-items-center w-full transition-all duration-300 ${change == id && 'sm:-translate-x-1/2 -translate-x-full'}`} to={"/users"}>
       
        
        {/* <BiSolidUser
          style={{ color: "#A285C2", width: "25px", height: "25px" }}
        />{" "} */}
       {
      <FiMoreVertical onClick={()=>dispatch(setUserListMoreIndex(id))} className="user-more-window cursor-pointer hover:text-orange-400"/>
        
        // <CgClose onClick={()=>setChangeMore(!changemore)} className="cursor-pointer text-[.85rem] hover:text-orange-400"/>

       }
        <NavLink className="byekan" to={`/userdetail/${id}`} onClick={()=>dispatch(setUserIndex(id))}>
        {name}
        </NavLink>
        
        </div>
       
      </div>
      <div dir="ltr" className="bg-white rounded-sm px-1 ml-0.5 justify-center flex place-items-center ">
        {Comma(gain)}
       
      </div>
      <div className="bg-white rounded-sm ml-0.5 flex px-1 justify-center place-items-center">
      {percent < 0 ? (
        <span
          className={` rounded-md py-0.5 px-2 flex text-[red] bg-rose-100/35   place-items-center gap-x-1`}
          
        >
           {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
          {Math.abs(percent)}
        </span>
      ) : (
        <span
          className={` rounded-md py-0.5 px-2 text-green-600  bg-green-100/25 flex place-items-center gap-x-1`}
          
        >
           {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
          {Math.abs(percent)}
        </span>

      )}
      </div>
     
      <div className=" hidden sm:flex bg-white rounded-sm ml-0.5 px-1 justify-center place-items-center">
        {Comma(sabadValue)}
      </div>
      
   <div className="">
   <div className="bg-white w-full h-full hidden sm:block rounded-sm px-1">
<TopThreeUsersChart data={arraychart} mg={[-50,5,15,-25]} />
</div>
<div className="bg-white w-full h-full  sm:hidden rounded-sm px-1">
<TopThreeUsersChart data={arraychart} mg={[-60,15,5,-18]} />
</div>
    </div>   

      

      
    </div>
  );
};

export default Userlist;

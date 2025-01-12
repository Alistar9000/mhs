import { useEffect, useState } from "react";
import {
  FiMoreHorizontal,
  FiTrendingDown,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import TopThreeUsersChart from "./chart";
import { NavLink } from "react-router-dom";
import { setUserHeaderMoreIndex, setUserIndex } from "../../../../../redux/initialData";
import UserMoreWindow from "../../../../../MoreWindow";
import { Comma } from "../../../../../comma";
// import { Comma } from "../../../../../comma";


const TopThreeUsers = ({ data, index,id }) => {
  const dispatch = useDispatch();
  const rdata = useSelector((e) => e.data.value);
  const chartdata = [...rdata.chartdata];
  // const selectedIndex = data.hideusermorewindow;
  const show = rdata.userheadermoreindex;
  const [sshow, setShow] = useState(show);
  let arraychart = [];
  
  const chart =chartdata.filter((e) => data?.name === e.name);
 
  const c =chart[0]?.data.map(
    (e, i) =>
      i >= chart[0].data?.length - 30 && arraychart.push({ value: e.value })
  );
 
  const handleClick = () => {

    dispatch(setUserHeaderMoreIndex(show !== index ? index : null));
  };
  return (
    <div
      
      className={`sm:rounded-xl relative grid grid-rows-[4vh_12vh_3vh] bg-white `}
    >
      <UserMoreWindow name={data?.name} id={id}  status={data?.status} index={index} parent="header" />

      <div>
        <NavLink
          to={`/userdetail/${id}`}
          onClick={()=>dispatch(setUserIndex(id))}
          className=" byekan text-[1em] font-bold py-2 px-4 text-slate-800  flex gap-x-2 place-items-center"
       
        >
          <FiUser className="text-gray-500"/>
          {data?.name}
        </NavLink>
      </div>
      <div
        className=" px-10 sm:px-0 grid grid-cols-[30%_70%]"
        
      >
        <div className="  flex justify-end place-items-center ">
        <div className="hidden h-[50%] w-[80%]  sm:flex ">
          <TopThreeUsersChart data={arraychart} mg={[-60, 0,0, -30]} />
        </div>
        <div className="sm:hidden h-full w-full flex justify-center place-items-center">
          <TopThreeUsersChart data={arraychart} mg={[-60, 15, 15, -12]} />
        </div>
        </div>
       
        <div className="">
          <div
           
            className="text-slate-400 text-[.7em] py-1 px-6 text-end"
          >
            {" "}
            بازدهی
          </div>
          <div
            className="flex sm:text-[1.1em] text-[1.3em] place-items-center gap-y-1 flex-col justify-center"
           
          >
            <div dir="ltr" className="font-bold flex text-gray-800 place-items-center">
              {data ? Comma(data?.gain):''}
             
            </div>

            <div
              className={`text-[.85em] ${data?.percent>=0? 'bg-green-100/25  text-green-600':'bg-rose-100/35  text-[red]'} rounded-md flex gap-x-1 place-items-center py-.5 px-2`}
             
            >
              {data?.trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
              <p>{Math.abs(data?.percent)}</p>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 h-full flex justify-between place-items-center">
        <div
          className="flex sm:text-[.85em] text-[.85em] h-full text-slate-500 font-semibold  place-items-center gap-x-2"
          
        >
          <span
            className="rounded-md byekan text-[.8em] py-0.5 px-2 bg-gray-100 text-gray-600"
            
          >
            ارزش{" "}
          </span>
          {data ? Comma(data?.sabadValue):''}
        </div>
        <FiMoreHorizontal
         
          className="w-[15px] h-[15px] cursor-pointer user-more-window"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default TopThreeUsers;

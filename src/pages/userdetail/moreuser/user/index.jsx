import { useDispatch, useSelector } from "react-redux";
import { persian_date } from "../../../../persian_date";
import TopThreeUsersChart from "../../../home/grid/userheader/users/chart";
import { FiArrowDownRight, FiArrowUpRight, FiMoreHorizontal, FiMoreVertical, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import UserMoreWindow from "../../../../MoreWindow";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import { Comma } from "../../../../comma";
import { setUserIndex, setUsersMoreIndex } from "../../../../redux/initialData";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import './index.css';
import { BiCloset } from "react-icons/bi";
import axios from "axios";
import { FetchData } from "../../../../fetchdata";
const UserInMoreUser = ({ index,data, parent ,showMore,setShowMore,clickMore,fulldata,setDataAfterClick,dataafterclick}) => {
  const {id, name, gain, sabadValue, percent,commision,commision_date,comm_date_color,initial_money,agentpart,status,trend } = data;
  const rdata = useSelector((e) => e.data.value);
  const chartdata = rdata.chartdata;
 
  const [enabletooltip,setEnabletooltip] = useState(false)
  const datachart = chartdata.filter((e) => e.name === name);
 
  const dispatch = useDispatch()
  const [comm_date_close,setCommDateClose] = useState(false)
 
  const handleCommDate = async ()=>{
   
   const URL = `/comm_date?id=${id}&date=${commision_date}`;
  //  const URL = `http://www.signal365.ir/pm/comm_date_update.php?id=${id}&date=${commision_date}`;
   const response =await axios.get(URL);
   const res = response.data;
   console.log('data after update comm_date :',JSON.stringify(res));
   if(res != false){
    
     FetchData(dispatch,0,res);
     setCommDateClose(true);
   }
 }
  // const convert_date = {
  //   '1':'01',
  //   '2':'02',
  //   '3':'03',
  //   '4':'04',
  //   '5':'05',
  //   '6':'06',
  //   '7':'07',
  //   '8':'08',
  //   '9':'09',
    
  // }
  // let comm_date = commision_date.split('/');
  // comm_date =comm_date[2]<10 ? comm_date[0]+'/'+comm_date[1]+'/'+convert_date[comm_date[2]] : commision_date;
  
  let c2 = [];
  datachart[0]?.data.map((e, i) => {
    c2.push({ date: persian_date(e.date), value: e.value / 1000000000 });
  });
  // grid-cols-[.2fr_1fr_1fr_.6fr_.7fr_.2fr]
  return (
    <div className={`   sm:text-[.8em] text-[.7em] relative  *:place-items-center sm:border-t  grid ${parent ==="users" ? 'h-[7vh] sm:grid-cols-[.2fr_1.2fr_.8fr_.8fr_.8fr_.8fr_.7fr_.7fr_.5fr_.7fr] grid-cols-[10vw_40vw_30vw_30vw_30vw_30vw_30vw_30vw_20vw_25vw]' : 'h-[6.5vh]  grid-cols-[1.2fr_1fr_.8fr_.5fr] sm:grid-cols-[1.2fr_.9fr_.8fr_.9fr_.7fr]'}`}>
     {parent==='users' && <div className="justify-center flex sm:border-none border-t text-gray-800">{id}</div>}
      <div className={`text-[.9em] flex  *:cursor-pointer rounded-sm sm:border-none border-t   text-gray-800 font-bold `}>
      {
      parent==='users' ? <NavLink  to={`/userdetail/${id}`} onClick={()=>dispatch(setUserIndex(id))} className={'byekan flex gap-x-2 place-items-center  relative text-[1.09em] '}>{name}
        {status == 0 ? <BsFillCheckCircleFill onMouseOver={()=>setEnabletooltip(true)} onMouseLeave={()=>setEnabletooltip(false)} className="text-green-400 " />
       : <RiCloseCircleFill onMouseOver={()=>setEnabletooltip(true)} onMouseLeave={()=>setEnabletooltip(false)} className="text-[1.2em] text-rose-500" />
      }       
      <div className={`${!enabletooltip && 'opacity-0'} transition-opacity duration-200 absolute ${status == 0 ?'-left-12':'-left-14'} top-0  flex rounded-lg text-[.7em] -bottom-1 h-full px-1  justify-center place-items-center bg-black text-white`}>
            {status == 0 ? 'سبد فعال':'سبد غیرفعال'}
          </div>
      </NavLink>:
      <NavLink to={`/userdetail/${id}`}  className={'byekan '} onClick={()=>{dispatch(setUserIndex(id));setDataAfterClick(fulldata.filter(e=>e.name !== name))}}>{name}</NavLink>
      } 
      </div>
      <div className="rounded-sm sm:border-none border-t text-gray-800 flex justify-start ">
        <span dir="ltr">{Comma(gain)}</span>
      </div>
      <div className="rounded-sm  flex  sm:border-none border-t  ">
        {percent >= 0 ? (
          <span className="rounded-lg  px-2 py-1 flex gap-x-1 place-items-center  bg-green-100/25 text-green-600">
           {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
            {Math.abs(percent)}
          </span>
        ) : (
          <span className="rounded-lg px-2  py-1 flex gap-x-1 place-items-center  bg-rose-100/35 text-[red]">
            {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
            {Math.abs(percent)}
          </span>
        )}
      </div>
      
      <div className={`rounded-sm ${parent!=='users' && 'sm:flex hidden' } flex sm:border-none border-t text-gray-800 `}>{Comma(sabadValue)}</div>
{  parent==="users" &&  <>
      <div className="rounded-sm  flex sm:border-none border-t text-gray-800 ">{Comma(initial_money)}</div>
      <div className="rounded-sm  flex sm:border-none border-t  text-green-600">{Comma(agentpart)}</div>
      <div className="rounded-sm  gap-x-1 flex sm:border-none border-t text-gray-800 ">
        {/* <div className="*:rounded-lg *:px-2  justify-center flex  text-amber-500 px-4"> */}
        <div className={`px-2 py-1 rounded-xl border  ${comm_date_color == 0 ? 'border-green-500 text-green-600':comm_date_color == 1 ? 'border-rose-500 text-rose-600':'comm_date_anim border-amber-500 text-amber-600'}`}>
        {commision_date === '' ? '-' : commision_date}
        
        </div>
        {/* <div className={`${comm_date2_color == 0 ? 'bg-green-50 text-green-500':comm_date2_color == 1 ? 'bg-rose-50 text-rose-500':'comm_date_anim text-amber-500'}`}>{commision_date === ''? '-' : commision_date.split(' ')[1]}</div> */}
        
        
        {/* </div> */}
       {comm_date_color == 1 && !comm_date_close && <CgClose onClick={handleCommDate} className="text-[red] cursor-pointer"/>}
        
        </div>
      </>
}
{/* <div className="h-full w-full"> */}
{/* <div className="rounded-sm  sm:flex hidden h-full ">
        <TopThreeUsersChart data={c2} mg={[-30, 5, 5, -22]} />
      </div> */}
      <div className="rounded-sm sm:flex sm:border-none border-t w-full h-full ">
        <div className="h-full w-full sm:flex hidden">
        <TopThreeUsersChart data={c2} mg={[-30, 5, 5, -22]} />
        </div>
        <div className="h-full w-full sm:hidden">
        <TopThreeUsersChart data={c2} mg={[-50, 10, 10, -20]} />
        </div>
      </div>
{/* </div> */}
      
      {
         parent==="users" && <div className={` h-full sm:border-none border-t relative transition-all duration-200 justify-center flex place-items-center `}>
         {
        <FiMoreVertical className={`cursor-pointer  user-more-window `} onClick={clickMore}/>
        

         }
         {/* <div className="absolute w-[90%] left-0 bg-lime-200 transition-all duration-200 top-0 h-full"> */}
         <UserMoreWindow id={id} name={name} index={index} status={status} showMore={showMore} parent={'users_userlist'}/>

         {/* </div> */}
          </div>
      }
    </div>
  );
};

export default UserInMoreUser;

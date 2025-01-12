import { useState } from "react";
import { BiCheckCircle, BiDetail, BiEdit, BiSolidDiscount, BiTrash, BiUser } from "react-icons/bi";
import { FiDelete, FiMoreHorizontal, FiMoreVertical, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import UserMoreWindow from "../../../../MoreWindow";
import { Comma } from "../../../../comma";
import { CgCheck } from "react-icons/cg";
import { BsFillCheckCircleFill, BsFillDiscFill, BsFillDoorClosedFill, BsFillUnlockFill } from "react-icons/bs";
import { RiCloseCircleFill, RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setUserdetailMoreIndex } from "../../../../redux/initialData";





const MainDivInUserDetail = ({data}) => {
    const [enabletooltip,setEnabletooltip] = useState(false)
    const {name,gain,sabadValue,initial_money,percent,status,id,garanty,trend} = data?data:{};
    const dispatch = useDispatch()
    const rdata = useSelector(e=>e.data.value)
    const moreflag = rdata.setUserdetailMoreIndex
    const [garantytooltip,setGarantyTooltip] = useState(false)
    const [showmore,setShowMore] = useState(false)
    return ( 
        <div
        
       
        className={` h-[20vh] sm:h-full grid relative grid-rows-[5vh_12vh_2vh]  sm:rounded-lg  px-4  bg-white  `}
      >
        <div
          className="  text-gray-700 font-bold justify-between flex  place-items-center"
          
        >
          <div className=" flex gap-x-2 place-items-center overflow-hidden text-[.9em] text-nowrap byekan">
          
          <BiUser className="text-gray-500" />
          {name}
          <div className="relative  w-6">
          {
  status == 0 ? <BsFillCheckCircleFill onMouseOver={()=>setEnabletooltip(true)} onMouseLeave={()=>setEnabletooltip(false)} className="text-green-400 text-[.8em]" />
 : <RiCloseCircleFill onMouseOver={()=>setEnabletooltip(true)} onMouseLeave={()=>setEnabletooltip(false)} className=" text-rose-500" />
          
          }
          <div className={`${!enabletooltip && 'opacity-0'} transition-opacity duration-200 absolute right-0 translate-y-full rounded-lg text-[.7em] -bottom-1 ${status == 0 ? 'w-12':'w-16'} px-1 py-0.5 bg-black text-white`}>
            {status == 0 ? 'سبد فعال':'سبد غیرفعال'}
          </div>
          </div>
         
          <div onMouseOver={()=>setGarantyTooltip(true)} onMouseLeave={()=>setGarantyTooltip(false)} className="flex place-items-center justify-center px-2  relative rounded-lg byekan bg-amber-300 text-gray-600 text-[.7em]">{garanty}
            <div className={`absolute rounded-lg ${!garantytooltip && 'hidden'} bg-black text-white px-1 py-0.5 top-full mt-1 right-2`}>تضمین</div>
          </div>
        
          </div>
        
       <FiMoreVertical className="user-more-window cursor-pointer" onClick={()=>dispatch(setUserdetailMoreIndex(true))} />
       <UserMoreWindow status={status} id={id} name={name} parent="userdetail" show={showmore}/>
        
        
        </div>
        <div dir="ltr" className=" flex place-items-start justify-center">
          <div className="">
          <div className="grid grid-cols-5">
         <div className="flex  col-start-1">
            <span
              
              className="py-0.5 px-2 rounded-md text-[.65em] font-bold  text-slate-400 "
            >
              بازدهی
            </span>
          </div>
         </div>
         
          <div
         
            className="px-2 text-[1.4em] font-bold place-items-center flex gap-x-2 justify-center"
            
          >
            {gain?Comma(gain):''}

            {percent >= 0 ? (
              <span 
                className="text-green-600 text-[.65em] rounded-md bg-green-100/25 flex place-items-center gap-x-1 px-2 py-.5"
                
              >
                {Math.abs(percent)}  {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
              </span>
            ) : (
              <span 
                className="bg-rose-100/35 text-[red] text-[.7em] rounded-md flex place-items-center gap-x-1 px-2 py-.5"
                
              >
                {Math.abs(percent)}
                {trend === 'up' ? <FiTrendingUp className="text-green-600" /> : <FiTrendingDown className="text-[red]" />}
              </span>
            )}
          </div>
          </div>
        
        </div>


        <div
          className="flex justify-between text-[.8em]  gap-2  "
         
        >
          <div className="font-bold flex place-items-center gap-x-2 text-[.9em] text-gray-600">
            <span
              
              className="bg-gray-100 text-[.8em] text-gray-600 rounded-md py-0.5   px-2"
            >
              ارزش{" "}
            </span>
            {data?Comma(+sabadValue):''}{" "}
          </div>
          <div
           
            className="flex gap-x-2 place-items-center text-[.9em] text-gray-600  font-bold"
          >
            <span
              
              className="bg-gray-100 text-[.8em] text-gray-600 rounded-md py-0.5   px-2"
            >
              آورده
            </span>
            {data?Comma(+initial_money):''}
          </div>
        </div>
      </div>
     );
}
 
export default MainDivInUserDetail;
import { BsListUl } from "react-icons/bs";
import { Comma } from "../../../comma";
import { useDispatch } from "react-redux";
import { setUserIndex } from "../../../redux/initialData";
import { NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { useState } from "react";

const UsersSymbolslist = ({data,close,setClose}) => {
   
   const dispatch = useDispatch()
  //  let s = {name:symboldata?.name,users:symboldata?.users}
    return ( <div className={` gap-2  p-2 sm:p-5 sm:static absolute text-[.95em] left-0 top-[15%] h-[50vh] ease-in-out sm:h-full sm:translate-x-0 ${close ? '-translate-x-0':'-translate-x-full'}  transition-transform duration-300   border sm:border-none sm:w-full w-[75%] grid sm:grid-rows-[5%_5%_90%] grid-rows-[10%_10%_80%] rounded-md bg-white`}>
<div className="flex justify-between place-items-center">
<div className="flex gap-x-2 place-items-center  byekan text-[.9em] text-gray-800 font-bold"><BsListUl />لیست سهامداران در هر سهم</div>
<CgClose className="text-gray-400 cursor-pointer sm:hidden" onClick={()=>setClose(false)} />
</div>
    <div className="flex place-items-center">
    <div className={`${!close && 'hidden'} byekan font-semibold rounded-lg h-full  flex place-items-center  text-gray-600 justify-center bg-slate-100 px-4`}>{data.name}</div>   

    </div>

  <div className="w-full flex justify-center">
  <div className="grid sm:grid-rows-[5%_95%] grid-rows-[9%_91%] sm:w-[80%]  overflow-hidden">
    <div className="grid grid-cols-2 *:flex px-5 *:place-items-center rounded-t-lg *:font-semibold  *:text-[.8em] *:text-slate-400 bg-slate-100 w-full">
        
        <div className="byekan">نام</div>
        <div className="byekan justify-center">تعداد سهم</div>
    </div>
    <div className="w-full symbol-list overflow-auto sm:h-[60vh] h-[33vh]">
        <div className="">
      {data.users.sort((a,b)=>+a.count < +b.count ? 1:-1).map((e,i)=>
        <div className="grid sm:*:text-[.85em] *:text-[.7em] hover:bg-slate-200  h-10 p-2 border-b grid-cols-2">
            <NavLink to={`/userdetail/${e.id}`} onClick={()=>{dispatch(setUserIndex(e.id))}} className="byekan font-bold text-gray-600">{e.name}</NavLink>
            <div className="flex justify-center text-gray-800">{Comma(e.count)}</div>
        </div>
      )}
      </div>
    </div>
</div>
  </div>

{/* </div> */}

    </div> );
}
 
export default UsersSymbolslist;
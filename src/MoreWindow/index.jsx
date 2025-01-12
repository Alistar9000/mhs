import { NavLink } from "react-router-dom";
import { FiDelete, FiEdit, FiMoreHorizontal, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import DisableCard from "./disablecard";
import MoreWindowTooltip from "./tooltip";
import { setFloatingsearchId, showDeleteDialoge, showDisableDialoge } from "../redux/initialData";

const UserMoreWindow = ({
  parent,
  showMore,
  show,
  index,
  id,
  status,
  name
}) => {
    const data = useSelector((e) => e.data.value);
    const headerflag = data.userheadermoreindex;
    const usersflag = data.usersmoreindex;
    const userdetailflag = data.userdetailmoreindex;
    const userlistflag = data.userlistmoreindex;
   const [disable,setDisable]= useState(status)
   const [showtooltip,setShowTooltip]= useState(null)
    // console.log('userlistflag:',userlistflag,'index :',index);
  const items=[
    'ویرایش','حذف','فعال'
  ]
  const dispatch = useDispatch()
  const handleDelete = ()=>{
    dispatch(showDeleteDialoge({flag:true,id:id,name:name}))
  }
  const disableClick = ()=>{
    console.log('click on disable btn');
    dispatch(showDisableDialoge({flag:true,id:id,name:name,status:status}))
  }
  return (
  
    
   
   <>
  {parent ==='dashboard_userlist' || parent ==='users_userlist' ? 
   <div className={`${(userlistflag!=index && parent==='dashboard_userlist') ? 'opacity-0 translate-x-full':usersflag!=index && parent==='users_userlist' && 'hidden sm:block sm:opacity-100 sm:-translate-x-full bg-white'}   bg-amber-100 h-full flex place-items-center user-more-window transition-width duration-300 absolute top-0  ${parent==='dashboard_userlist' ? 'px-2 right-0 ':'px-1 sm:px-4 left-0'} `}>
    <ul className={`*:relative flex ${parent==='dashboard_userlist'?'gap-x-2':'sm:gap-x-4 gap-x-1'} *:text-[.85rem] h-full w-full  *:cursor-pointer place-items-center`}>
    { items.map((e,i)=><MoreWindowTooltip disableClick={disableClick} deleteClick={handleDelete} disable={status} setDisable={setDisable} id={id} index={i} name={e} onMouseLeave={()=>setShowTooltip(null)} onMouseOver={()=>setShowTooltip(e=>e!==i?i:null)} show={i===showtooltip}/>) 
  }
     
    </ul>
    </div>
    :
<div
      className={`user-more-window absolute  z-40  text-[.9rem] left-7 bg-white px-1 ${
        parent === "header" ? "bottom-3 w-1/2 h-2/3" : "top-3 w-1/3"
      } rounded-lg   border ${
       parent === 'header' ? headerflag!==index && 'hidden' : !userdetailflag  && 'hidden'}`}
    >
      <ul
        dir="rtl"
        className="py-2 *:flex *:place-items-center  font-normal *:gap-x-2 list-none *:cursor-pointer *:rounded-lg *:text-[.7em] *:text-gray-400 *:py-1 *:px-2"
      >
       
        <li className="hover:bg-slate-200" >
          <NavLink
            to={"/edit"}
            onClick={()=>dispatch(setFloatingsearchId(id))}
            className={"flex place-items-center w-full gap-x-2"}
          >
            <FiEdit className="text-orange-400  text-[.85rem]" /> 
           ویرایش
           
          </NavLink>
        </li>
        <li onClick={handleDelete} className="hover:bg-slate-200" >
          <FiTrash   className="text-rose-400  text-[.85rem]" />
          حذف
        </li>

        <li className="user-more-window" >
          
          <DisableCard disableClick={disableClick} setDisable={setDisable} disable={status}/>
          {disable == 1 ? "غیرفعال" : "فعال"}
        </li>
      </ul>
    </div>
}
  
    </> 
  );
};

export default UserMoreWindow;

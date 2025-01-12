import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import MenuItems from "./items";
import { useRef, useState } from "react";
import { RxDashboard, RxDoubleArrowLeft } from "react-icons/rx";
import { FiEdit, FiList, FiLogOut, FiUserPlus, FiUsers } from "react-icons/fi";
import { BiChevronLeft, BiMessageSquareDetail } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { MdDoubleArrow, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import './index.css';
const Menu = () => {
  const dispatch = useDispatch();
  const data = useSelector(e=>e.data.value)
  const index = data.userindex
  const [showChevron,setShowChevron] = useState(false)
  const menu = useRef()
  const items = [
{name:'داشبورد',nav:'dashboard',icon:<RxDashboard className="sm:text-[1.2rem] text-[.8rem]" />},
{name:'سبدها',nav:'userss',icon:<FiUsers className="sm:text-[1.2rem]  text-[.8rem]" />},
{name:'جزئیات سبد',nav:`userdetail/${index}`,icon:<BiMessageSquareDetail className="sm:text-[1.2rem] text-[.8rem]" />},
{name:'سبد جدید',nav:'add',icon:<FiUserPlus className="sm:text-[1.2rem] text-[.8rem]" />},
{name:'ویرایش سبد',nav:'edit',icon:<FiEdit className="sm:text-[1.2rem] text-[.8rem]" />},
{name:'نمادها',nav:'symbols',icon:<FiList className="sm:text-[1.2rem] text-[.8rem]" />},  
// {name:'خروج',nav:'login',icon:<FiLogOut  className="text-[1.2rem]" />},
];
  
  return (
    // <div className="">
    <div className="overflow-hidden relative h-full w-full">
      <MdKeyboardDoubleArrowLeft onClick={()=>menu.current.scrollLeft -= menu.current.scrollWidth} className={`cursor-pointer ${showChevron && 'hidden'} sm:hidden absolute text-[1.2em] text-gray-400  left-1 top-2`}/>
      <div dir="rtl" onScroll={(e)=>Math.abs(Math.round(menu.current.scrollLeft)) ===2* Math.round(menu.current.scrollLeft) + menu.current.scrollWidth ? setShowChevron(true):setShowChevron(false)} ref={menu} className="overflow-auto menu-scroll sm:h-1/2 h-full sm:w-full w-[100vw] snap-x grid scroll-smooth sm:grid-cols-1 sm:grid-flow-dense grid-flow-col bg-white  sm:place-items-center sm:text-[.75em] text-[.75em] text-gray-500">
      
       {items.map((e, i) => (
          <MenuItems
            item={e}
            index={i}
          />
        ))}
       </div>
     
     </div>
    // </div>
  );
};

export default Menu;

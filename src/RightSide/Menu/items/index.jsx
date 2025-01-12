import { BiMessageSquareDetail } from "react-icons/bi";
import { FiEdit, FiList, FiLogOut, FiUserPlus, FiUsers } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const MenuItems = ({ item, index, click }) => {
     const {name,nav,icon} = item ;
  return (
    <NavLink to={nav} onClick={click} className={` sm:border-none  border-t`}>
        {({isActive})=>
      <div
        className={`${
          isActive  && "bg-[var(--bg-color-l)] sm:rounded-lg   text-white"
        }  p-2 w-[25vw] h-full snap-start sm:w-32 text-[1em] text-gray-400 place-items-center sm:place-items-start  grid sm:grid-cols-[30%_70%]`}
      >
       {icon}
        <span className={`${!isActive ? 'text-slate-500':'text-white'} `}>{name}</span>
      </div>
      }
    </NavLink>
  );
};

export default MenuItems;

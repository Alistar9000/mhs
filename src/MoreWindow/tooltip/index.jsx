import { FiEdit, FiTrash } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import DisableCard from "../disablecard";
import { useDispatch } from "react-redux";
import { setFloatingsearchId } from "../../redux/initialData";

const MoreWindowTooltip = ({deleteClick,disableClick,show,id,name,onMouseOver,index,disable,setDisable,onMouseLeave}) => {
    // console.log('tooltipName:',tooltipName);
    const dispatch = useDispatch()
    return ( 
        <>
        
<li onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
{index ==0 ?<NavLink to={'/edit'} onClick={()=>dispatch(setFloatingsearchId(id))}>
 
 <FiEdit className="text-[orange] h-3/4 w-3/4 sm:h-full sm:w-full"/>
   </NavLink>:index==1 ? <FiTrash onClick={deleteClick} className="text-[red] h-3/4 w-3/4 sm:h-full sm:w-full"/>
   : <DisableCard parent={'dashboard_userlist'} disableClick={disableClick} disable={disable} setDisable={setDisable} />

   }

<span className={`${!show && 'opacity-0'} transition-all duration-200 text-[.7em] absolute -top-1 z-50 left-0 -translate-y-full py-0.5 px-1 rounded-md bg-black text-white`}>
{name}
   
       </span>
       </li>
     {/* <li onMouseOver={onMouseOver} ><FiTrash className="text-[red]"/><MoreWindowTooltip tooltipName={tooltipName}/></li>
     <li onMouseOver={onMouseOver} ><DisableCard parent={'dashboard_userlist'} disable={disable} setDisable={setDisable} /><MoreWindowTooltip  tooltipName={tooltipName}/></li>
   
    </li> */}
    </>
    );
   
}
 
export default MoreWindowTooltip;
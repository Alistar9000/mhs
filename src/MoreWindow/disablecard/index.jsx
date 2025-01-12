import { useDispatch } from "react-redux";
import { showDisableDialoge } from "../../redux/initialData";

const DisableCard = ({disable,disableClick,parent,status})=>{
    const dispatch = useDispatch()
    return(
      <div onClick={disableClick} className={`rounded-xl ring-1 ${parent==='dashboard_users' ? 'h-2.5 w-5' :'sm:h-3 sm:w-6 h-2 w-4'} relative px-1 py-0.5 cursor-pointer bg-white`}>
        <div className={`rounded-full absolute top-0 mt-[1px] left-0.5  transition-transform  duration-300 ${parent==='dashboard_users' ? 'h-2 w-2' :'sm:h-2.5 sm:w-2.5 h-1.5 w-1.5'} ${disable == 0 ? 'bg-indigo-500 translate-x-full' : 'bg-gray-300'}`}></div>
      </div>
    );
  }
export default DisableCard;
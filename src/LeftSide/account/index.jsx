import { useState } from "react";
import { FaChevronLeft, FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import img_man from './man2.png';
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setscreenSnipper } from "../../redux/initialData";
const Account = () => {
    const [click,SetClick] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mobilescreen = useMediaQuery({query:"(max-width:600px)"});
    const handleclick = () => {
        SetClick(!click);
        // console.log(click);
    }
   const handleExit = ()=>{
        dispatch(setscreenSnipper(true));
        setTimeout(() => {
            dispatch(setscreenSnipper(false));
            localStorage.clear();
            navigate('/login');
        }, 1000);
    }

    return ( <div  dir="rtl" className={`sm:h-10 sm:w-full h-[5.5vh]  w-1/3 relative`} >
        <span to={'/login'} onClick={handleExit} className={`absolute cursor-pointer ${click ? 'opacity-100 delay-300 z-0 transition-opacity duration-200' :'z-[-1]'} opacity-0  gap-x-2 hover:rounded-md hover:bg-slate-100 text-gray-500 flex place-items-center text-[.8em] sm:top-0 top-2 left-1/4  sm:h-full   rounded-lg p-1  `}>
        <FiLogOut className="text-[red]" />خروج
             
        </span>
        {/* <div dir="rtl" onClick={handleclick} className={` flex cursor-pointer gap-x-4  place-items-center`}> */}
           
          <img className={`absolute sm:top-0 top-2 ${click ? 'right-2':'right-1/3'} transition-all duration-500 sm:h-full h-2/3 p-0.5 w-7 sm:w-10 border-2 border-purple-200 rounded-full`} src={img_man} />
            
          <FaChevronLeft onClick={handleclick} className={`absolute cursor-pointer text-zinc-400 w-3 transition-rotate duration-500 h-3  top-1/3  ${click ? 'rotate-180 left-2':'left-1/4'}`}  />
            {/* <FaUserCircle className="text-zinc-400" style={{height:"4vh",width:"3vw"}}/> */}
        {/* </div> */}
       
        
    </div> );
}
 
export default Account;
import { BsArrow90DegUp, BsArrowDown, BsArrowUp } from "react-icons/bs";
import { Comma } from "../../../../comma";
import './index.css';
import { BiArrowFromTop } from "react-icons/bi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaArrowDown19 } from "react-icons/fa6";
import { RiArrowRightDownFill } from "react-icons/ri";
import { PiArrowBendRightDown } from "react-icons/pi";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
const SymbolslistItem = ({data,click,setClose}) => {
    const {name,count,value,price,percent} = data;
    return ( <div className="px-2 py-1 *:flex sm:*:text-[.85em] *:text-[.7em] hover:bg-slate-200 *:place-items-center *:justify-center border-b h-10  w-full grid sm:grid-cols-[10%_20%_20%_25%_25%] grid-cols-[10%_20%_30%_20%_20%]">
     <div onClick={click} className="byekan cursor-pointer font-bold text-gray-800">{name}</div>
     <div className="text-gray-800">{Comma(count)}</div>
     <div className="text-gray-800 felx gap-x-1 place-items-center">
        {price>=0 ? <FiArrowUpRight className="text-green-600 text-[.85em]"/> : <FiArrowDownRight className="text-[red] text-[.85em]"/>}
        {Comma(value)}
     </div>
     <div className="flex justify-center">
     <div className={`rounded-lg px-2 py-0.5 ${price>=0 ? 'text-green-600 bg-green-100/25' :'text-[red] bg-red-100/35'}`}>{Math.abs(price)}</div>

     </div>
     <div className="text-gray-400 px-2 py-1">
        <div className="w-full h-6 rounded-lg bg-gray-100 relative">
<div className={`absolute syombol-list-percent text-white sm:flex hidden justify-center place-items-center rounded-r-lg rounded-l-sm px-2 h-full bg-emerald-400`} style={{width:percent<8 && percent>6 ? (+percent/24*100)+'%' :percent<=6 ? '15%' :(+percent/30*100)+'%'}}>
    {percent}
</div>
<div className={`absolute sm:hidden syombol-list-percent text-white flex w-full  justify-center place-items-center rounded-lg px-2 h-full bg-sky-300`} >
    {percent}
</div>
        </div>
        </div>
    </div> );
}
 
export default SymbolslistItem;
import SymbolslistItem from "./item";
import { RxSymbol } from "react-icons/rx";
import './index.css';
const Symbolslist = ({data,setUserSymbol,setClose}) => {
   

    return ( <div className="w-full h-full sm:rounded-md p-5 text-[.95em] grid grid-rows-[5%_95%] gap-2 bg-white">
        <div className="byekan flex gap-x-2 place-items-center text-[.9em] text-gray-800 font-bold">
            <RxSymbol />
            سهم نمادها از دارایی کل
        </div>
        <div className="w-full grid overflow-hidden h-full grid-rows-[5%_95%] ">
            <div className="px-2 bg-slate-100 rounded-t-md  *:text-slate-400 *:font-semibold sm:*:text-[.7em] *:text-[.7em] *:place-items-center grid  *:justify-center sm:grid-cols-[10%_20%_20%_25%_25%] grid-cols-[10%_20%_30%_20%_20%]">
            <div className="byekan flex ">نماد</div>
            <div className="byekan flex">تعداد</div>
            <div className="byekan flex">ارزش</div>
            <div className="byekan sm:flex hidden">آخرین (درصد)</div>
            <div className="byekan flex sm:hidden">آخرین</div>
            <div className="byekan flex">درصد از دارایی</div>
            </div>
            <div className="symbol-list overflow-auto sm:h-[65vh] h-[54vh]">
           
            { data.map((e,i) => <SymbolslistItem data={e}  click ={()=>{setUserSymbol({name:e.name,users:e.users});setClose(true)}}/>)}
           {/* {data[0]?.name} */}
            </div>
       
        </div>
       
    </div> );
}
 
export default Symbolslist;
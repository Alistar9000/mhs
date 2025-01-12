import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { Comma } from "../../../../comma";

const Portfo = ({pportfo,i,length}) => {
    const {name,percent,count,value} = pportfo
   
    return ( 
        
              <div
                className={`w-full byekan *:text-gray-800 text-[.75em] py-2 grid grid-cols-[1fr_1fr_.9fr_1fr] ${
                  i !== length && "border-b"
                }`}
              >
                <div className=" byekan font-semibold flex place-items-center ">
                  {name}
                </div>
                <div className=" flex place-items-center  text-gray-600">
                  {count ? Comma(count):''}
                </div>
                <div className="flex   place-items-center">
                  {percent >= 0 ? (
                    <span className="justify-center bg-green-100/25 text-green-600  flex place-items-center px-2  gap-x-1 rounded-lg ">
                      {percent? percent:''}{" "}
                    </span>
                  ) : (
                    <span className="justify-center text-[red]  bg-rose-100/35 flex place-items-center w-10 rounded-lg p-0.5">
                      {percent ? Math.abs(percent):''}
                    </span>
                  )}
                </div>
  
                <div className=" flex place-items-center gap-x-1 text-gray-600">
                  {percent >= 0 ? (
                    <FiArrowUpRight className="text-green-600" />
                  ) : (
                   percent && <FiArrowDownRight className="text-[red]"  />
                  )}
                  {value? Comma(value):''}
                </div>
              </div>
           
     );
}
 
export default Portfo;
import { BsTriangle } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiTriangle } from "react-icons/fi";
import { PiTriangle, PiTriangleFill } from "react-icons/pi";
import { useSelector } from "react-redux";

const FormErrorMessages = ({ data,type }) => {
  const d = useSelector((e) => e.data.value);
  const empty = d.floatingsearch;
  const flags = d.formemptycheck;
  const portfo_check = d.portfoemptycheck;
  const repeat = d.repeatUser;
  // console.log('flags',flags[0].empty);
  return (
    <>
    {repeat ? <div className="flex flex-col ">
      <ul className="sm:text-[.75em]  text-[.65em] *:flex *:gap-x-2 *:place-items-center *:text-[red] *:italic">
     <li className="">
           <div className="h-2 w-2 bg-[red] rounded-full"></div>
سبد مورد نظر در حال حاضر موجود می باشد <br></br> لطفا ورودی "نام" را تغییر بدهید
         </li>
    </ul>
    </div>:
     <div className="flex flex-col">
    
    {portfo_check && <ul className="sm:text-[.75em]  text-[.65em] *:flex *:gap-x-2 *:place-items-center *:text-[red] *:italic">
     <li className="">
           <div className="h-2 w-2 bg-[red] rounded-full"></div>
           در قسمت پرتفو ورودی خالی وجود دارد!
         </li>
    </ul>}
     { ((empty != 0 && type==='edit') || type!=='edit') ? <ul className="sm:text-[.75em] text-[.65em] *:flex *:gap-x-2 *:place-items-center *:text-[red] *:italic">
       {flags[0].empty && (
         <li>
           <div className="h-2 w-2 bg-[red] rounded-full"></div>
           {data[0]}
         </li>
       )}
       {!flags[0].digit && (
         <li>
           <PiTriangleFill className=" w-2.5 h-2.5 "/>
           {data[3]}
         </li>
       )}
       {flags[1].empty && (
         <li>
           <div className="h-2 w-2 bg-[red] rounded-full"></div>
           {data[1]}
         </li>
       )}
       {!flags[1].digit && (
         <li>
           <PiTriangleFill className=" w-2.5 h-2.5 "/>
           {/* <div className="h-2 w-2 bg-[red] rounded-full"></div> */}
           {data[4]}
         </li>
       )}
       {flags[2].empty && (
         <li>
           <div className="h-2 w-2 bg-[red] rounded-full"></div>
           {data[2]}
         </li>
       )}
        {!flags[2].digit && (
         <li>
           <PiTriangleFill className=" w-2.5 h-2.5 "/>
           {data[5]}
         </li>
       )}
     </ul>
   : type === 'edit' &&  <div className="text-[red]  pt-3  italic text-[.75em]">ابتدا نام سبد را جستجو نمایید!</div>
   }
     </div>
}
    </>
  
  );
};

export default FormErrorMessages;

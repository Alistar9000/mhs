import {
  BiCoin,
  BiDollar,
  BiExclude,
  BiExport,
  BiImport,
  BiInfoCircle,
  BiLink,
  BiLock,
  BiMoney,
  BiSolidFileImport,
  BiUser,
} from "react-icons/bi";
import AddInfoInput from "./inputs";
import { MdDateRange, MdNumbers, MdRealEstateAgent } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { PiPhone } from "react-icons/pi";
import { GiIdCard } from "react-icons/gi";
import "./index.css";
import { Calendar } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import FloatingSearch from "./floatingsearch";
import { useDispatch, useSelector } from "react-redux";
import { sethidefloatingsearch } from "../../../redux/initialData";
import { useMediaQuery } from "react-responsive";
const AddInfo = ({type,formData,setFormData}) => {
  
  const [searchinput,setSearchInput] = useState('')
  const dispatch = useDispatch()
  const data = useSelector(e=>e.data.value)
  const floatingsearch = data.floatingsearch
  const hidefloatingsearch = data.hidefloatingsearch
  const mobilescreen = useMediaQuery({query:'(max-width:600px)'});
  let outlineColor;
  type==='edit' ? outlineColor='outline-amber-300':outlineColor='outline-sky-300'
  const inputs = [
    {
      name: "نام",
      objectName:'name',
      value:formData.name,
      type: "text",
      width: `${mobilescreen ? 'w-1/2':'w-2/3'}`,
      icon: <BiUser className="text-[.9em]" />,
      outline:outlineColor
    },
    {
      name: "شماره ملی",
      objectName:'national_code',
      value:formData.national_code,
      type: "text",
      width: "w-1/2",
      icon: <MdNumbers className="text-[.9em]" />,
      outline:outlineColor
    },
    {
      name: "تلفن",
      objectName:'phone_number',
      value:formData.phone_number,
      type: "text",
      width: `${mobilescreen ? 'w-1/2':'w-2/3'}`,
      icon: <PiPhone className="text-[.9em]" />,
      outline:outlineColor
    },
    {
      name: "آدرس",
      objectName:'address',
      value:formData.address,
      type: "text",
      width: "w-full",
      icon: <CiLocationOn className="text-[.9em]" />,
      outline:outlineColor
    },
    {
      name: "آورده",
      objectName:'initial_money',
      value:formData.initial_money,
      type: "text",
      width: `${mobilescreen ? 'w-1/2':'w-2/3'}`,
      icon: <BiDollar className="text-[.9em]" />,
      outline:outlineColor
    },
    {
      name: "کارگزاری",
      objectName:'broker',
      value:formData.broker,
      type: "text",
      width: "w-full",
      icon: <BiLink className="text-[.9em]" />,
      outline:outlineColor
    },
    {
      name: "کارمزد",
      objectName:'commision',
      value:formData.commision,
      type: "text",
      width: "w-1/3",
      icon: <MdRealEstateAgent className="text-[.9em]" />,
      outline:outlineColor
    },
    [{
      name: "تاریخ قرارداد",
      objectName:'certificate_date',
      value:formData.certificate_date,
      type: "text",
      width: "w-1/2",
      icon: <MdDateRange className="text-[.9em]" />,
      outline:outlineColor
    },
   
    {
      name: "تضمین",
      objectName:'garanty',
      value:formData.garanty,
      type: "text",
      width: "w-1/2",
      icon: <BiLock className="text-[.9em]" />,
      outline:outlineColor
    }],
   
    
  ];
   type === 'edit' && inputs.push(
    {
      name: "برداشت",
      objectName:'sabad_bardasht',
      value:formData.sabad_bardasht,
      type: "text",
      width: "w-2/3",
      icon: <BiExport className="text-[.9em]" />,
      outline:outlineColor
  },{
    name: "سود سهام",
    objectName:'symbol_gain',
    value:formData.symbol_gain,
    type: "text",
    width: "w-1/2",
    icon: <BiCoin className="text-[.9em]" />,
    outline:outlineColor
  })
  return (
    <div className={`grid px-4 col-span-3  ${type==='edit' ? 'sm:grid-rows-[15%_85%]' : 'sm:grid-rows-[13%_87%] '} sm:h-[83.5vh] bg-white rounded-lg`}>
      {type==='edit'?
      <div className="w-full grid py-2 sm:py-0 justify-center grid-cols-[40%_60%]">
 <div className="flex   byekan text-gray-800 font-semibold gap-x-2 text-[.9em] place-items-center">
         {" "}
         <BiInfoCircle /> مشخصات
         
       </div>
<div className="flex place-items-center relative z-50">
 
  <div className="grid w-2/3 sm:mt-0 mt-2 relative z-0 add-info opacity-0">
    {/* <label htmlFor="" className="mb-2 byekan text-[1.1em] text-gray-400">جستجوی سبد</label> */}
    <input value={hidefloatingsearch} onChange={e=>{dispatch(sethidefloatingsearch(e.target.value))}}  type="text" placeholder="جستجوی سبد" className=" input-search-user placeholder:opacity-50 w-full border border-amber-300 sm:h-10 h-8 rounded-md outline-amber-300 px-2 text-gray-500 text-[.8em]" name="edit-search-user" />
    <FloatingSearch value={searchinput} show={floatingsearch !== ''  } setSearchInput={setSearchInput} />
  </div>
         </div>
      </div>
        
      :
      <div className="flex font-semibold  py-2 sm:py-0 byekan text-gray-800 gap-x-2 text-[.9em] place-items-center">
      {" "}
      <BiInfoCircle /> مشخصات
    </div>
      }
   
      <div className="add-info opacity-0 grid sm:grid-cols-[40%_60%]   sm:grid-rows-5">
        {inputs.map((e, i) => (
          <AddInfoInput data={e} index={i} typee={type} formData={formData} setFormData={setFormData}/>
        ))}

       
      </div>
    </div>
  );
};

export default AddInfo;

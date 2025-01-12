import { BiInfoCircle } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { LiaLinkSolid } from "react-icons/lia";
import { PiPhone } from "react-icons/pi";
import { RxIdCard } from "react-icons/rx";

const PersonalInfo = ({ data }) => {
  const { national_code, phone_number, address, broker } = data;
  return (
    <div
      className="bg-white sm:rounded-lg grid  grid-rows-[20%_80%]"
     
    >
      {/* <div className="w-full h-full"> */}
      <div className="font-bold text-gray-800 py-2 px-4  flex gap-x-2 place-items-center byekan text-[.8em]">
        <BiInfoCircle
         
          className="text-slate-500 "
        />
        اطلاعات فردی
      </div>

      <div className="px-2  grid grid-rows-[5vh_7vh_2vh]">
        <div className="grid  grid-cols-2">
          <div className="flex gap-x-2 font-bold p-2 place-items-center">
            <div className="text-slate-400 ">
              <RxIdCard className="" />
            </div>
            <div className="text-gray-600" style={{ fontSize: ".7em" }}>
              {national_code}
            </div>
          </div>
          <div className="flex gap-x-2 font-bold p-2 place-items-center">
            <div className="text-slate-400 ">
              {" "}
              <PiPhone />
            </div>
            <div className="text-slate-600" style={{ fontSize: ".7em" }}>
              {phone_number}
            </div>
          </div>
        </div>
        <div className="flex  gap-x-2 text-slate-500 font-bold p-2  ">
         
            <CiLocationOn />
          
          <p className="text-gray-600 text-wrap text-[.65em]">
            {address}
          </p>
        </div>
        <div className="flex gap-x-2 text-slate-400 px-2 font-bold place-items-center  ">
            <LiaLinkSolid />
            <a href={broker} className="text-sky-500 text-[.65em]" target="_blank">
              {broker}
            </a>
          
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default PersonalInfo;

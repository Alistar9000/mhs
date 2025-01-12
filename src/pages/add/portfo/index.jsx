import { FiList } from "react-icons/fi";
import AddPortfoItem from "./item";

import { BiCheckSquare, BiPlus, BiPlusCircle } from "react-icons/bi";

import "./index.css";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { PiListNumbers, PiNumberCircleEight } from "react-icons/pi";

let counter = 1;

const AddPortfo = ({formData,setFormData}) => {
 
  const [rows, setRows] = useState([{ id: 0, name: "", count: "" }]);
 
  const addRow = () => {
    // const portfo = JSON.parse(formData.portfo)
    const c = [...formData.portfo, { id: counter++, name: "", count: "" }];
    setFormData({...formData,portfo:c});
    // console.log("formdata with portfo: ", JSON.stringify(formData));
  };

  const handleSumbit = () => {
    console.log("submit rows:", rows);
  };
  return (
    <div className=" grid  text-[.9em] overflow-hidden ">
      <div className="bg-white sm:rounded-t-lg grid grid-rows-[13%_87%]">
        <div
          dir="rtl"
          className="byekan text-gray-800 font-semibold p-4 flex  place-items-center gap-x-2"
        >
          <div className="">
            <FiList />
          </div>
          پرتفو
        </div>
        <div className=" sm:h-[60vh] h-[50vh] opacity-0 add-portfo   grid grid-rows-[10%_90%]">
          <div className="grid *:flex *:place-items-center text-gray-600 text-[.95em] *:justify-center grid-cols-2">
            <div className="byekan pr-10 w-[100%]">
              نماد 
            </div>
            <div className="byekan w-[40%]">
              تعداد 
            </div>
          </div>

          <div className="grid grid-cols-[15%_85%]">
            <div className="h-full flex justify-center text-[1.8em] pt-3 font-bold text-[var(--green-color)]">
              <div
                onClick={addRow}
                className="cursor-pointer h-5 w-5 text-[.8em] rounded-full flex place-items-center justify-center  text-emerald-400 bg-white border-2 border-emerald-300"
              >
                <BiPlus />
              
              </div>
            </div>
            <div className=" pb-2 pl-2  overflow-hidden">
              <div className="h-[90%] overflow-auto add-portfo-scroll">
                <div className="grid  gap-y-2">
                  {[...formData.portfo].map((e, i) => (
                    <AddPortfoItem
                      key={formData.portfo.id}
                      data={e}
                      index={i}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>

     
    </div>
  );
};

export default AddPortfo;

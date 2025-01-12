import { useRef } from "react";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";

const AddPortfoItem = ({index,data,formData,setFormData}) => {
    const {name,count,id} =data
    const rdata = useSelector(e=>e.data.value);
    const portfo_check = rdata.portfoemptycheck;
    const nname = useRef();
    const ccount = useRef();
    const handleChange = (e)=>{
        const name2 = e.target.name;
        const value = e.target.value;
        const newR = [...formData.portfo];
        newR[index][name2] = value;
       setFormData({...formData,portfo:newR})
     
    }  

    const delRow = ()=>{
        const n = [...formData.portfo].filter(e=>e.id !== id);
        setFormData({...formData,portfo:n});
      }

  return (
    
      <div className="h-9 text-[.9em]  w-full grid grid-cols-[40%_40%_20%]">
        <div className=" flex place-items-center justify-center">
         
          <input ref={nname}
            type="text" onChange={handleChange} name="name" value={name}
            className={`px-2 outline-sky-300 ${portfo_check && nname.current?.value ==='' && 'border-red-400'}  border text-gray-600 h-full w-[90%] rounded-lg`}
          ></input>
        </div>
        <div className=" flex place-items-center justify-center">
        
          <input ref={ccount}
            type="text" onChange={handleChange} name="count" value={count}
            className={`px-2 outline-sky-300 ${portfo_check && ccount.current?.value ===''  && 'border-red-400'} border text-gray-600 w-[90%] h-full  rounded-lg`}
          ></input>
        </div>
        <div className="text-[1.3em] pr-2  flex place-items-center">
            <FiTrash onClick={delRow} className="cursor-pointer text-rose-400"/>
        </div>
     
    </div>
  );
};

export default AddPortfoItem;

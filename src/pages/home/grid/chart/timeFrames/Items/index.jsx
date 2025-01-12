import { useSelector } from "react-redux";

const ChartTimeFrameItems = ({index,name,handleClick,show,parent}) => {
  const data = useSelector(e=>e.data.value)
  const selectedIndexredux = data.charttimeindex;
    return ( 
   <>
   {parent ==='dashboard' ? <li
        onClick={handleClick}
        className={`byekan  ${ !show ? 'ring-0':'ring-1 bg-white'}  cursor-pointer rounded-lg text-slate-400 py-0.5 px-2`}
      >
       {name}
      </li>
     :
     <li
     onClick={handleClick}
     className={`byekan  ${ index !== selectedIndexredux ? 'ring-0':'ring-1 bg-white'}  cursor-pointer rounded-lg text-slate-400 py-0.5 px-2`}
   >
    {name}
   </li>
    }
   </>    
      
     );
}
 
export default ChartTimeFrameItems;
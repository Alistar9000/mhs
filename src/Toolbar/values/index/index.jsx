import { FaArrowUp, FaCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import ToolbarValuesItem from "../items";

const ToolbarValues = ({ data }) => {
  const mobilescreen = useMediaQuery({ query: "(max-width:600px)" });
  const toolbar = ["آورده کل", "ارزش کل", "بازدهی کل", "سهم سبدگردان", "سبد"];
  const gain = (((data[0][1] - data[0][0]) / data[0][0]) * 100).toFixed(2);
  return (
    // <div className=""
    // style={{gridColumn: "auto / span 2"}}
    // >
    <div className="px-2">
      <div
        className={`gap-1 p-2  rounded-xl grid w-full`}
        style={{background:'#21d2cc', direction: "rtl",gridTemplateColumns:'repeat(1,1fr)'}}
      >
        <div className=" rounded-t-xl pb-1 flex justify-center" style={{fontSize:'',fontFamily:'byekanbold'}}>وضعیت کلی</div>
        {toolbar.map((e, index) => (
         <ToolbarValuesItem label={e} gain={gain} value={data[0][index]} plus={data[0][5]} index={index}/>
        ))}
      </div>
      </div>
  );
};

export default ToolbarValues;

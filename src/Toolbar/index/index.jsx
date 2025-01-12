import { FaArrowUp, FaCircle } from "react-icons/fa";
import "./index.css";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import SymbolList from "../symbols";
import ToolbarValues from "../values/index";

const Toolbar = () => {
  const data_redux = useSelector((e) => e.data.value);
  const data = [...data_redux.toolbar];
  
 
  // console.log("toolbar:",JSON.stringify(data[0][0]));
 

  return (
    // <div
    //   className="grid"
    //   style={{ gridTemplateColumns: "35% 65%", gridColumn: "auto / span 2" }}
    // >
      
    // <SymbolList data={data[1]} />
     
     <ToolbarValues data={data}/>

    // </div>
  );
};

export default Toolbar;

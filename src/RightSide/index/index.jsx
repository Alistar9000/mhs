import { FiLogOut } from "react-icons/fi";
import Brand from "../brand";
import Menu from "../Menu";
import "./index.css";
import { NavLink } from "react-router-dom";
import img from './rightside_img2.png';
import Account from "../../LeftSide/account";

const RightSide = () => {
  return (
    <div  className="sm:grid fixed sm:relative  bottom-0 bg-white w-full sm:grid-rows-[15vh_63vh_22vh]">
     <div className="hidden sm:block"> <Brand /></div>
      <Menu />
      
      <div className=" hidden sm:flex justify-end place-items-center">
       <Account />
        {/* <img src={img} style={{height:'60%',width:'80%'}} /> */}
      </div>
    </div>
  );
};

export default RightSide;

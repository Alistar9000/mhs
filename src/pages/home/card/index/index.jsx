import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import CardCheck from "../check";
import CardTable from "../portfo";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaMinimize } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { FcViewDetails } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";

const Card = ({ item, index, cardNumbers }) => {
  const [showheaderdata, setShowHeaderData] = useState(false);
  const [showPortfo, setShowPortfo] = useState(false);
  const [show, setShow] = useState(false);
  const {
    id,
    name,
    initial_money,
    commision,
    certificate_date,
    garanty,
    portfo,
    national_code,
    phone_number,
    address,
    broker,
    symbol_gain,
    sabad_bardasht,
    status,
    sabadValue,
    gain,
    agentpart,
    userpart,
    percent,
  } = item;
useEffect(()=>{
  setTimeout(() => {
    setShow(true);
  }, index+1000);
},[])
  return (
   

    <div
      className="relative rounded-xl p-3 bg-white card"
      style={{ height: "27vh" }}
    >
      <div
        className="absolute left-2  rounded-xl  w-1/3 h-1/3 grid grid-cols-1 justify-center place-items-center"
        style={{ fontSize: ".85em",background:percent>=0 ? '#21d2cc':'#fb8574' }}
      ></div>
      {/* <CardTable show={showPortfo} tabledata={[...JSON.parse(portfo)]} /> */}
      <div
        className="absolute left-1 top-3 rounded-xl  w-40 h-16 grid grid-cols-1 -rotate-2 justify-center place-items-center"
        style={{ fontSize: "1.5rem",background:'#fff',opacity:'100%',color:percent>=0 ? '#21d2cc':'red' }}
      >
        {Math.abs(percent)+'%'}
      </div>
      <div className="absolute rounded-t-xl top-4 bg-white w-1/2 h-1/2"></div>
      <div
        className="absolute   rounded-xl bottom-9 flex justify-center place-items-center rotate-12  text-slate-800  w-1/3 h-1/4"
        style={{ fontFamily: "byekan", fontSize: "1.2em",background:percent>=0 ? '#21d2cc':'#fb8574',fontWeight:'bold' }}
      >
        {name}
      </div>
      
      <div
        className="absolute flex-col  bottom-8 left-6 flex justify-center text-slate-600 place-items-center    h-1/4"
        style={{ fontFamily: "", fontSize: "1.4em",background:'' }}
      >
        {sabadValue}
        <span className="text-gray-500" style={{fontSize:'.65em'}}>{initial_money}</span>
      </div>
      <BsThreeDots/>
      <CardCheck status={status} name={name} id={id} />
    </div>
   
  );
};

export default Card;

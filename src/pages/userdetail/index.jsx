import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderName, setscreenSnipper, setUserdetailMoreIndex } from "../../redux/initialData";

import { CgFontSpacing } from "react-icons/cg";
import { persian_date } from "../../persian_date";
import Userchart from "./userchart";
import Moreuser from "./moreuser";
import Userdata from "./data";
import { FetchData } from "../../fetchdata";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../404";
import UserNotFound from "../404/user";

const UserDetail = () => {
  
  const dispatch = useDispatch();
  const data = useSelector((e) => e.data.value);
  const userindex = data.userindex;
  const navigate = useNavigate();
  let userdata=[];
  userdata = data?.data;
  // console.log('userdata in userdetail',JSON.stringify(userdata))
  let {id} = useParams();
  const chartdata = data.chartdata;
  let c=[];
   c = [...userdata].sort((a, b) => (a.sabadValue < b.sabadValue ? 1 : -1));
  //  console.log('c: ',JSON.stringify(c));
  let selectedUser= [{
    id:0,
    name:'',
    sabadValue:'',
    initial_money:'',
    commision:'',
    portfo:'',
    certificate_date:'',
    symbol_gain:'',
    garanty:'',
    national_code:'',
    phone_number:'',
    address:'',
    broker:'',
    sabad_bardasht:'',
    status:'',
    gain:'',
    percent:'',
    agentpart:'',
  }];
  selectedUser = [...userdata]?.filter((e) => e?.id == id);
 
  
  
  const datachart = chartdata.filter((e) => e.name === selectedUser[0]?.name);
  const name = selectedUser[0]?.name;

  let c2 = [];

  datachart[0]?.data.map((e, i) => {
    c2.push({ date: persian_date(e.date), value: e.value / 1000000000 });
  });

  useEffect(() => {

     dispatch(setscreenSnipper(true))
        setTimeout(() => {
          dispatch(setscreenSnipper(false))
        }, 500);
    dispatch(setHeaderName("جزئیات سبد"));
  }, [id]);
  
  const handleclick = (e)=> {
  !e.target.classList.contains('user-more-window') && dispatch(setUserdetailMoreIndex(false))
  }
  return (
    <>
   {
    id <= [...userdata]?.length && id > 0 ? 
    <div onClick={handleclick} className="grid gap-2 grid-cols-1 text-[1em]  sm:grid-cols-2  h-full">
    <div className="sm:hidden">{selectedUser[0] && <Userdata data={selectedUser[0]} />}</div>
      <div className="grid  sm:grid-rows-2 grid-rows-[40vh_42.5vh] gap-2"> 
        <Userchart data={c2} name={name} id={id} />
       <Moreuser idParam={id} data={c} parent="userdetail" />
    </div>
      <div className="sm:block hidden">{<Userdata data={selectedUser[0]} />}</div>
    </div>
     :<UserNotFound/>
}
    </>
  );
};

export default UserDetail;

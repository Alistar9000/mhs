import UserInMoreUser from "./user";
import { FiUsers } from "react-icons/fi";
import "./index.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import UsersPageing from "../../users/paging";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsersMoreIndex } from "../../../redux/initialData";
import UsersHeader from "./header";
import { useMediaQuery } from "react-responsive";
import { PiUserList } from "react-icons/pi";

const Moreuser = ({ data, parent,idParam }) => {
  
  const [selectedIndex, setSelectIndex] = useState(0);
  const [showmore, setShowMore] = useState(null);
  const [dataafterclick, setDataAfterClick] = useState([]);
  const mobilescreen = useMediaQuery({query:"(max-width:600px)"});
  const Size = mobilescreen ? 9 :10;
  const pageSize = Math.ceil([...data].length / Size);
  const moreflag = useSelector((e) => e.data.value);
  const mflag = moreflag.usersmoreindex;
  const rsort = moreflag.userssort;
  const pageArray = Array.from({ length: pageSize }, (_, i) => i);
  const [sort, setSort] = useState({ name: "", trend: "" });
  const [sortedData, setSortedData] = useState([]);
  const usersheader = [
    { name: "", sname: "id",width:'2vw' },
    { name: "نماد", sname: "name",width:'10vw' },
    { name: "بازدهی", sname: "gain",width:'10vw' },
    { name: "درصد", sname: "percent",width:'5vw' },
    { name: "ارزش", sname: "value",width:'10vw' },
    { name: "آورده", sname: "initial",width:'10vw' },
    { name: "سهم سبدگردان", sname: "agent",width:'10vw' },
    { name: "سر رسید", sname: "commision_date",width:'5vw' },
    { name: "", sname: "",width:'2vw' },
    { name: "", sname: "",width:'2vw' },
  ];

  const dispatch = useDispatch();

  const handleClick = (i) => {
    setSelectIndex(i);
  };
  useEffect(() => {
    // console.log("sort :", data);
    parent === 'userdetail' && !dataafterclick.length && setDataAfterClick(data.filter(e=>e.id!==idParam));
    switch (rsort.name) {
      case "id":
        setSortedData(
          rsort.trend === "up"
            ? [...data].sort((a, b) => (+a.id < +b.id ? 1 : -1))
            : [...data].sort((a, b) => (+a.id < +b.id ? -1 : 1))
        );

        break;
      case "commision_date":
        setSortedData(
          rsort.trend === "up"
            ? [...data].sort((a, b) => (a.commision_date < b.commision_date ? 1 : -1))
            : [...data].sort((a, b) => (a.commision_date < b.commision_date ? -1 : 1))
        );

        break;
      case "gain":
        setSortedData(
          rsort.trend === "up"
            ? [...data].sort((a, b) => (+a.gain < +b.gain ? 1 : -1))
            : [...data].sort((a, b) => (+a.gain < +b.gain ? -1 : 1))
        );

        break;
      case "percent":
        setSortedData(
          rsort.trend === "up"
            ? [...data].sort((a, b) => (+a.percent < +b.percent ? 1 : -1))
            : [...data].sort((a, b) => (+a.percent < +b.percent ? -1 : 1))
        );

        break;
      case "value":
        setSortedData(
          rsort.trend === "up"
            ? [...data].sort((a, b) => (+a.sabadValue < +b.sabadValue ? 1 : -1))
            : [...data].sort((a, b) => (+a.sabadValue < +b.sabadValue ? -1 : 1))
        );

        break;
      case "initial":
        setSortedData(
          rsort.trend === "up"
            ? [...data].sort((a, b) =>
                +a.initial_money < +b.initial_money ? 1 : -1
              )
            : [...data].sort((a, b) =>
                +a.initial_money < +b.initial_money ? -1 : 1
              )
        );

        break;
      case "agent":
        setSortedData(
          rsort.trend === "up"
            ? [...data].sort((a, b) => (+a.agentpart < +b.agentpart ? 1 : -1))
            : [...data].sort((a, b) => (+a.agentpart < +b.agentpart ? -1 : 1))
        );

        break;

      default:
        setSortedData(data);
    }
  }, [rsort, data]);
  const PrevhandleClick = () => {
    selectedIndex > pageArray[0] && setSelectIndex(selectedIndex - 1);
  };

  const NexthandleClick = () => {
    selectedIndex < pageArray.length - 1 && setSelectIndex(selectedIndex + 1);
  };

  const pageData = useMemo(() => {
    
    const a = selectedIndex * Size;
    const b = a + Size;
    return [...sortedData].slice(a, b);
  }, [selectedIndex, sortedData]);

  return (
    // <div className=" bg-white sm:h-full h-[20vh]  rounded-lg">
 <div
      dir="rtl"
      className={` bg-white sm:rounded-lg grid   ${
        parent !== "users"
          ? "grid-rows-[12%_88%] "
          : "p-2 sm:grid-rows-[75vh_5vh] grid-rows-[66vh_6vh] gap-y-2"
      } `}
    >
      {parent !== "users" && (
        <div className="font-bold  text-gray-800 py-2 px-4 flex place-items-center gap-x-2 byekan text-[.8em]">
          {" "}
          <PiUserList className="text-gray-500 text-[1.2em]" /> سایر سبدها
        </div>
      )}

     {parent==='users' ? <div className={`overflow-hidden  ${parent !== "users" && "px-2"}`}>
        <div className={`sm:overflow-hidden ${parent==='users' && 'overflow-auto'} sm:w-auto `}>
        <div
          className={`px-2 h-[3vh] sm:h-[3vh] user-header grid  *:font-bold *:text-slate-400 w-full text-[0.6em] ${parent === "users" ? "sm:grid-cols-[.2fr_1.16fr_.82fr_.8fr_.8fr_.8fr_.75fr_.75fr_.47fr_.63fr] grid-cols-[10vw_38vw_30vw_30vw_30vw_30vw_35vw_30vw_20vw_30vw]" : "sm:grid-cols-[1.2fr_.9fr_.8fr_.9fr_.7fr] grid grid-cols-[1.2fr_1fr_.8fr_.5fr]"} bg-slate-50 grid  rounded-t-lg`}
        >
          {parent === "users"
            ? usersheader.map((e,i) => (
                <UsersHeader
                  data={e}
                  parent="users"
                  sort={sort}
                  width={usersheader[i].width}
                  setSort={setSort}
                  index={i}
                />
              ))
            :mobilescreen ? usersheader
                .slice(1, 4)
                .map((e) => <UsersHeader data={e} parent="" />):
                usersheader
                .slice(1, 5)
                .map((e) => <UsersHeader data={e} parent="" />)
                }
         
        </div>
        <div
          className={` rounded-lg more-user-userdetail ${
            parent === "users" ? "h-[78vh]" : "overflow-auto sm:h-[32.5vh] h-full"
          }`}
        >
          {parent === "users"
            ? pageData.map((e, i) => (
                <UserInMoreUser
                  clickMore={() => dispatch(setUsersMoreIndex(e.id))}
                  showMore={i == showmore}
                  setShowMore={setShowMore}
                  parent={parent}
                  index={e.id}
                  data={e}
                />
              ))
            : dataafterclick
                .filter((e) => e.status == 0)
                .map((e, i) => (
                <UserInMoreUser
                    parent={parent}
                    index={e.id}
                    setDataAfterClick={setDataAfterClick}
                    dataafterclick={dataafterclick}
                    fulldata={data}
                    data={e}
                  />
                ))}
        </div>
        </div>
       

      </div>:
       <div className={`sm:overflow-hidden px-4 ${parent==='users' && 'overflow-auto'} sm:w-auto `}>
       <div
         className={`px-2 h-[3vh] sm:h-[3vh] user-header grid  *:font-bold *:text-slate-400 w-full text-[0.6em] ${parent === "users" ? "sm:grid-cols-[.2fr_1.2fr_.8fr_.8fr_.8fr_.8fr_.8fr_.5fr_.5fr_.7fr] grid-cols-[10vw_40vw_30vw_27vw_30vw_30vw_40vw_30vw_20vw_30vw]" : "sm:grid-cols-[1.2fr_.9fr_.8fr_.9fr_.7fr] grid grid-cols-[1.2fr_1fr_.8fr_.5fr]"} bg-slate-50 grid  rounded-t-lg`}
       >
         {parent === "users"
           ? usersheader.map((e,i) => (
               <UsersHeader
                 data={e}
                 parent="users"
                 sort={sort}
                 width={usersheader[i].width}
                 setSort={setSort}
                 index={i}
               />
             ))
           :mobilescreen ? usersheader
               .slice(1, 4)
               .map((e) => <UsersHeader data={e} parent="" />):
               usersheader
               .slice(1, 5)
               .map((e) => <UsersHeader data={e} parent="" />)
               }
        
       </div>
       <div
         className={` rounded-lg more-user-userdetail ${
           parent === "users" ? "h-[78vh]" : "overflow-auto sm:h-[32.5vh] h-[85%]"
         }`}
       >
         {parent === "users"
           ? pageData.map((e, i) => (
               <UserInMoreUser
                 clickMore={() => dispatch(setUsersMoreIndex(e.id))}
                 showMore={i == showmore}
                 setShowMore={setShowMore}
                 parent={parent}
                 index={e.id}
                 data={e}
               />
             ))
           : dataafterclick?.filter((e) => e.status == 0)
               .map((e, i) => (
               <UserInMoreUser
                   parent={parent}
                   index={e.id}
                   setDataAfterClick={setDataAfterClick}
                   dataafterclick={dataafterclick}
                   fulldata={data}
                   data={e}
                 />
               ))}
       </div>
       </div>
      
      
      }


      {parent === "users" && (
        <div className=" flex sm:place-items-center justify-center  py-1 px-2">
          <ul className="flex gap-x-2 *:rounded-md *:border *:h-full place-items-center text-gray-500 h-6 *:cursor-pointer *:w-6 *:p-.5 *:flex *:justify-center *:place-items-center *:text-[.8em] ">
            <li className="bg-white" onClick={PrevhandleClick}>
              {" "}
              <GrNext />{" "}
            </li>
            {pageArray.map((e) => (
              <UsersPageing
                handleClick={() => handleClick(e)}
                show={e === selectedIndex}
                value={e + 1}
              />
            ))}
            <li className="bg-white" onClick={NexthandleClick}>
              {" "}
              <GrPrevious />{" "}
            </li>
          </ul>
        </div>
      )}
    </div>
    
   
  );
};

export default Moreuser;

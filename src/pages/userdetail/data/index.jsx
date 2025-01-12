import { useEffect, useState } from "react";
import { BiCalendar, BiExit, BiExport, BiMoneyWithdraw } from "react-icons/bi";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { MdPayment, MdRealEstateAgent } from "react-icons/md";
import { RiListView } from "react-icons/ri";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { persian_date, persian_date_full } from "../../../persian_date";
import MainDivInUserDetail from "./userinfo";
import PersonalInfo from "./personalinfo";
import { Comma } from "../../../comma";
import { json } from "react-router-dom";
import Portfo from "./portfo";
// import "./index.css";
import { useMediaQuery } from "react-responsive";
const Userdata = ({ data }) => {
  const {
    id,
    name,
    sabadValue,
    initial_money,
    commision,
    portfo,
    certificate_date,
    commision_date,
    symbol_gain,
    garanty,
    national_code,
    phone_number,
    address,
    broker,
    sabad_bardasht,
    status,
    gain,
    percent,
    agentpart,
  } = data?data:{};
  let pportfo=[];
  pportfo = data?JSON.parse(data?.portfo):[];

  const comm = [
    { name: "a", value: 100, fill: "#eee" },
    { name: "b", value: data?commision:0, fill: "#ffc658" },
  ];
  const mobilescreen = useMediaQuery({query:'(max-width:600px)'});
  //   console.log('porfto2',JSON.stringify(portfo2.length));
  useEffect(() => {
    // const portfo2 = JSON.parse(portfo);
    // setPortfo(portfo2);
  }, []);
  return (
    <div
      dir="rtl"
      className=" rounded-lg grid h-full  sm:grid-rows-4  sm:grid-cols-3 gap-2"
    >
      
      <div className="sm:rounded-lg col-span-3  sm:gap-x-2 sm:gap-y-0 gap-y-2 grid  sm:grid-cols-2">
        <MainDivInUserDetail data={data?data:{}} />
        <PersonalInfo data={data?data:{}} />
      </div>

      <div className="grid sm:grid-cols-3 w-full col-span-3 bg-red-0 sm:row-span-3 sm:gap-y-0 gap-y-2 sm:gap-x-2">
        <div className=" sm:rounded-lg col-span-3 sm:col-span-2 px-4  bg-white h-full overflow-hidden">
         
            <div className="font-bold flex gap-x-2 place-items-center byekan text-[.8em] text-gray-800 py-2">
              <RiListView className="text-slate-500 mt-1" />
              پرتفو
            </div>
            <div className="w-full text-[.7em] font-semibold grid grid-cols-[1fr_1fr_.9fr_1fr]  bg-gray-50 h-8 text-slate-400 place-items-center rounded-t-lg">
              <div className="pr-2 w-full  byekan">نماد</div>
              <div className="w-full byekan">تعداد</div>
              <div className="w-full byekan">درصد</div>
              <div className="w-full pr-4 byekan">ارزش</div>
            </div>
            <div className="bg-white portfo overflow-auto  sm:h-[51.5vh]">
              {pportfo
                .sort((a, b) => (a.value < b.value ? 1 : -1))
                .map((e, i) => (
                  <Portfo pportfo={e} i={i} length={pportfo.length-1} />
                ))}
            </div>
         
        </div>

        <div className=" gap-y-2 gap-x-2 sm:gap-x-0 rounded-lg text-[.8em]  col-span-3 grid sm:col-span-1  grid-cols-2 w-full sm:grid-cols-1 sm:grid-rows-[10vh_13vh_8.8vh_9vh_8vh_8vh] grid-rows-[10vh_10vh_10vh]  h-full">
          <div className="bg-white sm:rounded-lg rounded-r-none rounded-lg  p-2">
            <div
              className="text-gray-800  byekan font-bold flex place-items-center gap-x-2"
             
            >
              {" "}
              <MdRealEstateAgent
                className="text-green-500"
               
              />{" "}
              سهم سبدگردان 
            </div>
            <div
              className="flex gap-x-2 place-items-center py-3 text-[1.3em] text-green-600 font-bold justify-center"
              
            >
              {Comma(+agentpart)} <span className="text-[.7em]">ریال</span>
            </div>
          </div>
          <div
            className="bg-white sm:rounded-lg rounded-l-none rounded-lg p-2 grid col-span-1 sm:col-span-1  row-span-1 sm:row-span-1 sm:grid-rows-1  grid-cols-2 sm:grid-cols-[30%_70%]"
            
          >
            <div
              className="font-bold  byekan text-gray-600 place-items-start flex"
            
            >
              <div className="flex place-items-center gap-x-2">
              <MdPayment
                className="text-orange-500 mt-1"
                
              />
              <span
                className="pt-0.5 byekan text-gray-800"
                
              >
                کارمزد
              </span>

              </div>
             
            </div>
            <div
              className="  relative flex place-items-center sm:text-[1.3em] text-[1.5em] justify-center text-gray-800  font-bold"
              
            >
              <span
                className="absolute sm:left-[7.9vh] sm:top-[3.7vh] sm:text-[1.1em] text-[.7em] z-50 "
               
              >
                {comm[1].value + "%"}
              </span>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius={`${mobilescreen ? '100%':'90%'}`}
                  outerRadius={`${mobilescreen ? '100%':'90%'}`}
                  barSize={`${mobilescreen ? 7 : 10}`}
                  data={comm}
                >
                  <RadialBar
                    // startAngle={180}
                    // isAnimationActive={true}
                    // endAngle={0}
                    cornerRadius={6}
                    background
                    clockWise
                    dataKey="value"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="sm:rounded-lg rounded-lg rounded-r-none grid sm:grid-rows-[4vh_4.8vh]  bg-white">
            <div
              className="font-bold text-gray-800 byekan p-2 flex gap-x-2 place-items-center"
            
            >
              <BiCalendar
               
                className="text-sky-500"
              />
              تاریخ عقد قرارداد
            </div>
            <div
              className="grid justify-center text-[1.1em] font-bold text-cyan-600 mt-1"
             
            >
              <div className="col-start-2 ">
              {certificate_date===''? 'تعریف نشده':persian_date_full(certificate_date)}
              </div>
             
            </div>
          </div>
          <div className="sm:rounded-lg rounded-lg rounded-l-none grid sm:grid-rows-[4vh_5vh]  bg-white">
            <div
              className="font-bold text-gray-800 byekan  p-2 flex gap-x-2 place-items-center"
            
            >
              <BiCalendar
               
                className="text-fuchsia-500"
              />
              تاریخ سر رسید
            </div>
            <div
              className="grid justify-center text-[1.1em]  font-bold text-fuchsia-600 mt-1"
             
            >
              <div className="col-start-2">
              {commision_date===''? 'تعریف نشده': persian_date_full(commision_date)}
              </div>
             
            </div>
          </div>
          <div className="sm:rounded-lg rounded-r-none rounded-lg grid sm:grid-rows-[4vh_4vh] bg-white">
            <div
              className="font-bold text-gray-800  byekan p-2 flex gap-x-2 place-items-center"
             
            >
              <BiMoneyWithdraw
                
                className="text-lime-500"
              />
              سود سهام
            </div>
            <div
              className="grid  justify-center text-[1.1em] font-bold text-green-600 "
              
            >
              <div className="col-start-2">
              {Comma(+symbol_gain)}
              </div>
              
            </div>
          </div>
          <div className="sm:rounded-lg rounded-l-none rounded-lg grid sm:grid-rows-[4vh_4vh] bg-white">
            <div
              className="font-bold  byekan   text-gray-800 p-2 flex gap-x-2 place-items-center"
              
            >
              <BiExport
               
                className="text-rose-500"
              />
              برداشت
            </div>
            <div
              className="grid justify-center text-[1.1em] font-bold  text-rose-500 "
              
            >
              <div className="col-start-2">
              {Comma(+sabad_bardasht)}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdata;

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,Line,Bar,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useMediaQuery } from "react-responsive";
import { FaIcicles, FaIdBadge, FaInfoCircle, FaPercent } from "react-icons/fa";
import { BiPackage, BiSolidPackage } from "react-icons/bi";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FaBasketShopping } from "react-icons/fa6";
import { FcPackage } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";


const ChartSymbolData = ({ data }) => {
  const mobilesize = useMediaQuery({ query: "(max-width:900px)" });

  //  const chartData = [...data];
  const [chartData, setChartData] = useState([]);

  //  useEffect(()=>{
  //   const chart = [...data];
  //   chart.map(e=>e.percent=+e.percent);
  //   setChartData(chart);

  //  },[data])

  //  const colors = [
  //   "#8884d8",
  //   "#83a6ed",
  //   "#8dd1e1",
  //   "#82ca9d",
  //   "#a4de6c",
  //   "#d0ed57",
  //   "#ffc658",
  // ];

  const data1 = [{}, {}, {}, {}, {}, {}, {}];
  data1.map((e, i) => {
    e["name"] = `a${i}`;
    // e["fill"] = colors[i];
    e["percent"] = i * 100;
  });

  // const style = {
  //   top: mobilesize ? "20%" : "50%",
  //   right: 0,
  //   transform: "translate(0, -50%)",
  //   lineHeight: "24px",
  // };
  return (
    <div
    dir="rtl"
     
      className="grid grid-rows-[15%_85%] rounded-lg relative w-full h-full sm:row-span-2  bg-white"
    >
      
      
      <div
       
        className="text-gray-800 byekan sm:text-[.9em] font-bold px-4 py-2 flex justify-between"
      >
        <div className="">
        <div className="flex gap-x-2 byekan place-items-center" >
   <BiPackage className="text-[1.2em] text-gray-500"/>
   سهم نمادها از دارایی کل
   </div>
   <div  className="mt-1.5 mr-7 byekan text-[.8em] text-sky-500 flex place-items-center justify-center rounded-lg bg-sky-50">نمادهای با بیشترین درصد</div>

      </div>
      <NavLink to={'/symbols'}>
          <span className='byekan text-[.8em] rounded-lg flex gap-x-2 place-items-center font-semibold bg-sky-50 px-2 py-0.5 cursor-pointer text-sky-500'>مشاهده همه <FiArrowUpLeft  /></span>

          </NavLink>
     {/* <div style={{color:'',fontSize:'.9em',fontFamily:'byekan'}} className="float-end cursor-pointer text-indigo-300">جزئیات بیشتر...</div> */}
      </div>
      
      
      <div
      // className={` grid ${mobilesize ? "grid-rows-2" : "grid-cols-2"}`}
      // style={{ gridTemplateColumns: !mobilesize && "40% 60%" }}
      >
        {/* <div
          style={{ direction: "rtl" }}
          className={`w-full pb-2 h-full  px-2 grid ${
            mobilesize && "grid-cols-2"
          }`}
        >
          {data.map(
            (e, index) =>
              index !== 0 && (
                <>
                  <div
                    className=" flex place-items-center gap-x-2 text-gray-500"
                    style={{ fontSize: ".9em" }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "3px",
                        background: e.fill,
                      }}
                    ></div>{" "}
                    {e.name}
                    <span
                      style={{
                        fontSize: ".95em",
                        background: "rgba(240,250,240,1)",
                        color: "rgba(10,190,10,1)",
                        
                      }}
                      className="rounded-xl bg-blue-50 px-1.5 py-0.5  text-blue-300"
                    >
                      {e.percent + "%"}
                    </span>
                  </div>
                </>
              )
          )}

          <div
            style={{ fontSize: ".8em" }}
            className="mt-1 pr-4 text-gray-400 absolute left-2 bottom-2 z-40 cursor-pointer"
          >
            جزئیات بیشتر ...
          </div>
        </div> */}
        <div className="w-full sm:h-full h-[90%]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          
          data={data}
          margin={{
            top: 40,
            // right: 30,
            left: 0,
            bottom: 15,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3" vertical={false} /> */}
          <XAxis tickLine={false} className="text-[.85em] text-[rgba(188,141,255,1)] byekan" axisLine={false} padding={{left:10,right:10}} dataKey="name" />
          {/* <YAxis tickLine={false} axisLine={false}/> */}
          <Tooltip content={<Tooltipbarformat/>}/>
          <Legend iconType="circle" content={()=><div className="flex justify-center place-items-center  text-gray-500"><div className="h-3 w-3 rounded-full mx-2" style={{background:'rgba(105,209,255,1)'}}></div>درصد</div>} />
          <Bar className="text-[.8em] sm:text-[1em]" radius={15} dataKey="percent" stackId="a" fill="var(--bg-color)">
            <LabelList  dataKey="percent"  position="middle" content={RenderCustomizedLabel} />
          </Bar>
          {/* <Bar dataKey="percent" stackId="a" fill="#ECAFFF" /> */}
        </BarChart>
      </ResponsiveContainer>
       
        </div>
      </div>
      
     
     
    </div>
  );
};
const Tooltipbarformat =(props)=>{
  const {active,label,payload} = props;
  return (
    <>
      {active && (
        <div
          style={{ background: "#fff" }}
          className="rounded-xl  py-2 px-3 text-slate-600"
        >
          <h4 className="text-gray-500">{label}</h4>
          <p style={{ direction: "ltr" }}>{`${payload[0]?.value
          }  : درصد`}</p>
        </div>
      )}
    </>
  );
 
}
const BarlabelFormat = (props)=>{
  const {value} = props;
  console.log('value',value);
  return(<g><text>{value}</text></g>
    );
  }
const RenderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;
  const mobilescreen = useMediaQuery({query:"(max-width:600px)"});
  return (
    
   <g>
      {/* <rect  x1={x + width / 2} y1={y - radius} x2={10} y2={10} r={radius} fill="#8884d8" /> */}
      
      <rect width={!mobilescreen?width*3/4+1:width} height={30+1} x={!mobilescreen?x+1/7*width-1:x} y={y-40-1} rx="10" ry="10" fill="rgb(102,176,255)" />
      <rect width={!mobilescreen?width*3/4-3:width-4} height={30-3} x={!mobilescreen?x+1/7*width+1:x+2} y={y-40+1} rx="8" ry="8" fill="#fff" />
      {/* <polygon points={`${x+1/6*width} ${y-40}},${x+1/6*width+15} ${y-40},${x+1/6*width+10} ${y-35}`} style={{fill:'red'}}/> */}
      <polygon points={`${x+width/2-5} ${y-10},${x+5+width/2} ${y-10},${x+width/2} ${y-5}`} style={{fill:'rgb(102,176,255)'}}/>
      {/* <polygon points={`${x+width/2-5} ${y-10},${x+5+width/2} ${y-10},${x+width/2} ${y-5}`} style={{fill:'blue'}}/> */}

      <text
        x={x + width / 2}
        y={y - 25}
        // fill="#eee"
        fontSize={mobilescreen ?'1em':'.8em'}
        
        fill="rgba(102,150,255,1)"
        textAnchor="middle"
        dominantBaseline="middle"
        
      >
        {value}
      </text>
     
    
    </g>
   
  );
};
export default ChartSymbolData;

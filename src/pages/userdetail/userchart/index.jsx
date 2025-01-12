
import { useEffect, useState } from "react";
import { Area,Tooltip, AreaChart, CartesianGrid, DefaultTooltipContent, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { persian_date } from "../../../persian_date";
import axios from "axios";
import ChartTimeFrames from "../../home/grid/chart/timeFrames";
import { useSelector } from "react-redux";
import { change_time } from "../../../changeTimeFrame";
import { BiDownload } from "react-icons/bi";
import { useParams } from "react-router-dom";

const Userchart = ({data,name,id}) => {
  // console.log('data in userchart:',JSON.stringify(data));
    const [chartdata,setChartData] = useState([])
    const [ischartdata,setIsChartData] = useState(false)
    const [allchartdata,setAllChartData] = useState([])
    const timeIndex = useSelector(e=>e.data.value)
    const timeindex = timeIndex.charttimeindex;
    
    useEffect(()=>{
    id && getAllData();
    //  const d =name && getAllData();
    //   setChartData(d);
      // getAllData();
    },[id]);

     const getAllData = ()=>{
    const c2=[];
    // console.log('run getAllData');
    const URL = `/pm/getfullchart.php?name=${name}&id=${id}`;
    // const URL = `http://www.signal365.ir/pm/getfullchart.php?name=${name}&id=${id}`;
    axios.get(URL).then(response=>
    {const data = response.data.data;
    data?.map((e, i) => {
      c2.push({ date: persian_date(e.date), value: e.value / 1000000000 });
    });
   
    setAllChartData(c2);
   switch(timeindex){
    case 0:c2.length > 30 ? setChartData(c2.slice(c2.length-30)):setChartData(c2);
    // case 0:setChartData(c2.slice(c2.length-30));
    break;
    case 1:
      setChartData(c2);
      break;
      case 2:
        setChartData(change_time(timeindex,c2));
        break;
        case 3:
      setChartData(change_time(timeindex,c2));
      break;
   }
   
  });}
    
    return ( 
    
    <div className="bg-white sm:rounded-lg  grid grid-rows-[12%_88%]">
       <div className="flex px-4 justify-between place-items-center">
       
      <div className="flex place-items-center justify-end text-[.85em]" dir="rtl">
<ChartTimeFrames data={data} name={name} chart={allchartdata} setChartData={setChartData}/>
</div>
<a href={`/pm/csv/${name}.csv`}>
      <BiDownload className="cursor-pointer text-[1.1em] text-[rgba(102,176,255,1)]"/>
      </a>
      </div>
<div className="w-full h-full">
<ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartdata}
            margin={{ left: -20, right: 20, top: 10 ,bottom:10}}
          >
            <defs>
              <linearGradient id="gradient" x1={0} x2={0} y1={0} y2={1}>
                <stop
                  offset={"0%"}
                  stopColor="rgba(102,176,255,.8)"
                  stopOpacity={0.5}
                />
                <stop
                  offset={"100%"}
                  stopColor="rgba(102,176,255,.2)"
                  stopOpacity={0.3}
                />
              </linearGradient>
            </defs>

            <XAxis
              padding={{ right: 10 }}
              fontSize={10}
              // padding="no-gap"
              minTickGap={20}
             tickMargin={10}
              dataKey={"date"}
              axisLine={false}
              style={{direction:'rtl'}}
              tickLine={false}
            />
            <YAxis
              fontSize={10}
              domain={[]}
              tickCount={10}
              axisLine={false}
              tickLine={false}
              tickFormatter={(e) => `${Math.floor(e)}B`}
            />
            <Area
              stroke="rgba(102,176,255,.8)"
              type={"monotone"}
              dataKey="value"
              fill="url(#gradient)"
              strokeWidth={3}
            />
           
           
            <CartesianGrid
              strokeDasharray={3.3}
              opacity={0.6}
              vertical={false}
            />
             <Tooltip content={<TooltipFormat />} />
          </AreaChart>
         
        </ResponsiveContainer>
</div>
     
       
    </div> );
}
const TooltipFormat = ({ active, payload, label }) => {

    return (
      <>
        {active && (
          <div
           
            className="rounded-xl bg-[rgba(102,176,255,.4)] sm:text-[.9em] text-[.7em] py-2 px-3 text-gray-800"
          >
            <h4 style={{direction:'rtl'}}>{label}</h4>
            <p style={{ direction: "rtl" }}>{`ارزش : ${Math.floor(
              payload[0]?.value
            )}B ریال`}</p>
          </div>
        )} 
      </>
    );
  };
export default Userchart;
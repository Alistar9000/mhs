import "./index.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  PieChart,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FiBarChart, FiBarChart2 } from "react-icons/fi";
import { BiChart, BiDownload } from "react-icons/bi";
import { persian_date } from "../../../../persian_date";
import ChartTimeFrames from "./timeFrames";
import { change_time } from "../../../../changeTimeFrame";
import { setAllChartdata } from "../../../../redux/initialData";
import axios from "axios";
import colors from "react-multi-date-picker/plugins/colors";

const DashboardChart = () => {
  const dispatch = useDispatch()
  const dates = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];


  const data = useSelector((e) => e.data.value);
  const chart = [];
  const allchartflag = data.allchartflag
  const chartData =data.allchartdata30.data;
  chartData?.map((e, i) => {
      chart.push({ date: persian_date(e.date), value: e.value / 1000000000 });
    });
  const index = data?.charttimeindex;
  const [chartdata, setChartData] = useState();
  const [weeklydata,setWeeklyData] = useState([]);
  // chartdata = change_time(index,chart);
  // const chart30= chart.length-30;

  useEffect(() => {

    // console.log('index in useeffect: ',index,'chart:',chart);
    setChartData(chart);
  }, [data]);

  return (
    <div
    dir="rtl"
      className=" text-[1.1em] sm:rounded-lg grid grid-rows-[12%_88%] relative w-full h-full sm:row-span-2 col-span-2  bg-white"
    >
      <div className="flex px-4 justify-between place-items-center">
<div className="flex gap-x-4">
{/* <div className="font-bold text-gray-700 flex  gap-x-2 place-items-center byekan"><FiBarChart2 style={{width:'15px',height:'15px'}} />نمودار دارایی کل</div> */}
      <a href="/pm/csv/all_sabad.csv">
      <BiDownload className="cursor-pointer text-[1em] text-[rgba(102,176,255,1)]"/>
      </a>

</div>

       <ChartTimeFrames parent="dashboard" weeklydata={weeklydata} setWeeklyData={setWeeklyData} chart={chart} chartdata={chartdata} setChartData={setChartData}/>
      </div>

      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartdata}
            margin={{ left: -30, right: 20, top: 10 ,bottom:10}}
            
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
              padding={{ left: 20, right: 10 }}
              
              fontSize={10}
              dataKey={"date"}
              minTickGap={50}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              domain={[]}
              tickMargin={10}
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
            {/* <Bar  type={"monotone"} dataKey="value" fill="url(#gradient)" strokeWidth={3}/> */}

            <Tooltip content={<TooltipFormat />} />
            <CartesianGrid
              strokeDasharray={3.3}
              opacity={0.6}
              vertical={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    // </div>
  );
};
const TooltipFormat = ({ active, payload, label }) => {
  return (
    <>
      {active && (
        <div
          className="rounded-xl sm:text-[.8em] text-[.7em] bg-[rgba(102,176,255,.4)] py-2 px-3 text-slate-600"
        >
          <h4>{label}</h4>
          <p style={{ direction: "rtl" }}>{`ارزش : ${Math.floor(
            payload[0]?.value
          )}B ریال`}</p>
        </div>
      )}
    </>
  );
};
export default DashboardChart;

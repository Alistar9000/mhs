import { useEffect, useState } from "react";
import ChartTimeFrameItems from "./Items";
import axios from "axios";
import { persian_date } from "../../../../../persian_date";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllChartdata,
  setAllChartFlag,
  setChartTimeIndex,
} from "../../../../../redux/initialData";
import { change_time } from "../../../../../changeTimeFrame";
import { FiDownload } from "react-icons/fi";
import { BiDownload } from "react-icons/bi";

const ChartTimeFrames = ({
  chart,
  name,
  setChartData,
  parent,
  chartdata,
  weeklydata,
  setWeeklyData,
}) => {
  const [selectedIndex, setSelectIndex] = useState(0);
  const names = ["30 روز آخر", "روزانه", "هفتگی", "ماهیانه"];
  const data = useSelector((e) => e.data.value);
  const allchartflag = data.allchartflag;
  const allchartdata = data.allchartdata;

  const dispatch = useDispatch();
  useEffect(() => {
    // setChartData(change_time(selectedIndex,chart));
    // change_time(selectedIndex);
  }, []);
  const getAllChart = (i, dispatch) => {
    const arr = [];
    let result = [];
    const URL="/allchart";
    
    fetch(URL)
      .then((e) => e.json())
      .then((e) => {
        e.data.map((e) =>
          arr.push({
            date: persian_date(e.date),
            value: Math.floor(e.value / 1000000000),
          })
        );
        result = change_time(i, arr);

        // console.log('result : ',result)
        // dispatch(setAllChartdata([arr,'',false]))
        setChartData(result);
        setWeeklyData(arr);
        // dispatch(setAllChartdata(arr))
        // dispatch(setAllChartFlag(true))
      });
  };

  const handleClick = (i) => {
    if (parent === "dashboard" && i != 0 && !allchartflag) {
      // console.log("in allchart flag");
      getAllChart(i, dispatch);
      dispatch(setAllChartFlag(true));
    }
    if (parent === "dashboard" && i != 0 && allchartflag) {
      weeklydata.length !== 0
        ? setChartData(change_time(i, weeklydata))
        : getAllChart(i, dispatch);
    }
    parent === "dashboard" && i == 0 && setChartData(chart);
    parent !== "dashboard" && dispatch(setChartTimeIndex(i));

    parent !== "dashboard" && setChartData(change_time(i, chart));

    setSelectIndex(i);

    // change_time(i);
  };

  return (
    <div
      className={`flex  border bg-zinc-100/50 rounded-lg ${
        parent !== "dashboard"
          ? "justify-between  text-[.8em] w-full"
          : " text-[.6em] justify-end"
      } place-items-center`}
    >
      <ul className="flex  gap-x-1">
        {names.map((e, i) => (
          <ChartTimeFrameItems
            handleClick={() => handleClick(i)}
            name={e}
            index={i}
            parent={parent}
            show={i === selectedIndex}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChartTimeFrames;

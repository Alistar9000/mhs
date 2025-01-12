import { useSelector } from "react-redux";
import ChartSymbolData from "./chart";
import "./index.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const DashboardSymbolData = () => {
  const data1 = useSelector((e) => e.data.value);
  const data = data1.data;
  const symboldata = GetSymbols(data,0);
  return (
    <div className="sm:row-span-2 col-span-2 bg-white sm:rounded-xl w-full h-full">
      <ChartSymbolData data={symboldata} />
    </div>
  );
};
export const GetSymbols = (data,t) => {
  
  let arr = [];
  let sum = 0;
 let i=0;
 const colors = ['#8884d8','#83a6ed','#8dd1e1','#82ca9d','#a4de6c','#d0ed57','#ffc658','#CA81D4'];
  [...data].filter(x=>x.status == 0).map((e) =>
    [...JSON.parse(e.portfo)].map((e1) => {
      const a = arr.filter((x) => x?.name === e1.name);

      const exist = arr.some((z) => z.name === e1.name);

      if (!exist && e1.name) {
        arr = [
          ...arr,
          {
            name: e1.name,
            count: +e1.count,
            value: +e1.value,
            price:e1.percent,
            percent: 0,
            users: [{id:e.id, name: e.name, count: e1.count }],
          },
        ];
        // console.log('i :',i);
        i++;
      } else {
       if(e1.name){
        a[0].users.push({ id:e.id,name: e.name, count: e1.count });
        a[0].value += +e1.value;
        a[0].count += +e1.count;
       }
      }
     if(e1.name)
      sum += +e1.value;
    })
  );
  // console.log('arr : ',JSON.stringify(arr));
  [...arr].map((e) => (e.percent = ((e.value / sum) * 100).toFixed(2)));
  arr.sort((a, b) => (a.value < b.value ? 1 : -1));
  
  const a = t==0 ? arr.slice(0,8) : arr;
  return a;
};

export default DashboardSymbolData;

import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setAllChartdata,
  setAllChartdata30,
  setChartdata,
  setData,
  setSnipper,
  setToolbar,
} from "./redux/initialData";
import getSymbols from "./getSymbols";

export async function FetchData(dispatch, flag, data2) {
  //  console.log('fetchData flag :',flag);
  const URL = "/pm/users.php";
  // const URL = "http://www.mhs365.ir/pm/users.php";
//  const URL = "http://www.signal365.ir/pm/users.php";
  let dataArray=[];
  const arr = []
  if (flag == 0) {
   
    const response = await axios.get(URL);
   const data = response.data;
   dataArray = data?.data;
    dispatch(setData(data.data?.userdata));
  dispatch(setChartdata(data.data?.chartdata));
  // console.log('fetchdata : ',data.data.allchartdata.data);
  dispatch(setAllChartdata30(data.data?.allchartdata));
  }else {
    
    dataArray =data2;
    dispatch(setData(data2.userdata));
    dispatch(setChartdata(data2.chartdata));
    dispatch(setAllChartdata30(data2.allchartdata));

  }
  

  let sum_init = 0,
    sum_value = 0,
    pos = 0,
    neg = 0,
    agentpart = 0;
    // console.log('dataArray userdata',JSON.stringify(dataArray));
  dataArray.userdata?.map((item) => {
    if (item.status == 0) {
      sum_value += +item.sabadValue;
      sum_init += +item.initial_money;
      +item.percent >= 0 ? (pos += 1) : (neg += 1);
      agentpart += +item.agentpart;
    }
  });


  dispatch(
    setToolbar([
      [
        sum_init,
        sum_value,
        Math.abs(sum_value - sum_init),
        agentpart,
        pos,
        neg,
      ],
      getSymbols(dataArray.userdata),
    ])
  );
  // dispatch(setSnipper(false));
}

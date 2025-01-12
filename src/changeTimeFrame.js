export const change_time = (t,chart) => {
    let result=[];  
    switch(t){
        case 0:
        result=chart.length>30 ? chart.slice(chart.length - 30):chart;
        // result = chart.slice(chart.length - 30);  
        // chart.length>30 ? result=chart.slice(chart.length - 30):result=chart;
          break;
          case 1:
           result = chart;
            break;
          case 2:
           result = wm(5,chart);

            break;
          case 3:
            result = wm(22,chart);
            break;    
      }

   
      // setChartData(array);
    return result;
  };
  const wm = (t,chart)=>{
    // t == 2 ? (t = 7) : (t = 30);
    let j = 0,
      s = 0;
    let d = "";
    let array = [];
    [...chart].map((e, i) => {
      if (i % t == 0) {
        array.push({ date: e.date, value: Math.floor(e.value) });
        // s += +e.value;
      } 
      // else {
      //   if (i === 0) s += +e.value;
      //   else {
      //     array.push({ date: e.date, value: Math.floor(s / t) });
      //     s = i;
      //   }
      // }
    });
    return array;
  }
export default function getSymbols(arr){
    let array = [];
    arr.map(e=>JSON.parse(e.portfo).map(e1=>{
   const flag = array.some(e=>e.name === e1.name)
      !flag &&  array.push({name:e1.name,percent:e1.percent})
    
    }))
   
    return array;
}
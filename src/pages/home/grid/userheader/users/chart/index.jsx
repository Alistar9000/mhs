import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const TopThreeUsersChart = ({data,mg}) => {
    return ( 
      
 <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} 
        margin={{left:mg[0],top:mg[1],right:mg[2],bottom:mg[3]}}
        >
        <defs>
            <linearGradient id="usergradient" x1={0} x2={0} y1={0} y2={1}>
                <stop offset={"0%"} stopColor="rgba(102,176,255,.8)"
          stopOpacity={0.5} />
           <stop offset={"100%"} stopColor="rgba(102,176,255,.2)"
          stopOpacity={0.3} />
            </linearGradient>
        </defs>
        <XAxis display='none'/>
        <YAxis  display='none' domain={[]}/>
        <Area  stroke="rgba(102,176,255,.8)"
      type={"monotone"}
      dataKey="value"
      
      fill="url(#usergradient)"
      strokeWidth={2}/>
        </AreaChart>
    </ResponsiveContainer>
     
       
     );
}
 
export default TopThreeUsersChart;
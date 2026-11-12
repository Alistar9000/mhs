import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function SymbolsPieChart({portfolioWithValue}){
     const sorted = [...portfolioWithValue].sort((a, b) => b.value - a.value);
    
      const MAX_ITEMS = 4;
      const topItems = sorted.slice(0, MAX_ITEMS);
      const others = sorted.slice(MAX_ITEMS);
    
      const othersValue = others.reduce((sum, i) => sum + i.value, 0);
    
      const finalDataRaw = [
        ...topItems.map(i => ({
          name: i.name,
          value: i.value,
        })),
        ...(others.length ? [{ name: "سایر", value: othersValue }] : []),
      ];
    
      const totalValue = finalDataRaw.reduce(
        (sum, item) => sum + item.value,
        0
      );
    
      const finalData = finalDataRaw.map(item => ({
        ...item,
        percent: ((item.value / totalValue) * 100).toFixed(1),
      }));
    
      // 🎨 Dynamic HSL Colors
      const generateColors = (count) =>
        Array.from({ length: count }, (_, i) => {
          const hue = Math.round((360 / count) * i);
          return `hsl(${hue}, 70%, 55%)`;
        });
    
      const COLORS = generateColors(finalData.length);
    
      return (
        <div className="2xl:w-3/4 w-full h-80 mt-5 sm:mt-0 sm:h-64 sm:justify-between flex-col sm:flex-row items-center sm:items-start  flex gap-5 sm:gap-2">
           
         
    
          {/* 🧾 Custom Legend */}
          <div className="flex flex-col h-full  justify-center gap-3 flex-wrap text-sm">
            {finalData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2  rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-gray-700 truncate max-w-[100px]">
                    {item.name} :
                  </span>
                </div>
    
                <span className="font-semibold text-gray-800">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>

           <ResponsiveContainer  width="60%" height={"100%"}>
            <PieChart>
              <Pie
                data={finalData}
                
                dataKey="value"
                nameKey="name"
                innerRadius={"0%"}
                outerRadius={"100%"}
                paddingAngle={3}
                isAnimationActive
              >
                {finalData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
    
              <Tooltip
                formatter={(value, name, props) => [
                  `${props.payload.percent}%`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
         
        </div>
      );
}
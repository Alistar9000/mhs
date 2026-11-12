import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


export default function PortfolioPieChart({ portfolioWithValue }) {
  const sorted = [...portfolioWithValue].sort((a, b) => b.value - a.value);
  const [maxLegendItems,setMaxLegendItems] = useState(false)

  const MAX_ITEMS = 4;
  const topItems = sorted.slice(0, MAX_ITEMS);
  const others = sorted.slice(MAX_ITEMS);

  const othersValue = others.reduce((sum, i) => sum + i.value, 0);

  const finalDataRaw = maxLegendItems ? 
   [...sorted.map(i => ({
      name: i.symbol.name,
      value: i.value,
    }))]
  :[
    ...topItems.map(i => ({
      name: i.symbol.name,
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
    <div className="w-full h-44 sm:h-full flex flex-col gap-2">
       
      <ResponsiveContainer  width="100%" height={"100%"}>
        <PieChart className="top-0 sticky">
          <Pie
            data={finalData}
            
            dataKey="value"
            nameKey="name"
            innerRadius={"70%"}
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

      {/* 💎 Center Total */}
      {/* <div className="-mt-40 text-center pointer-events-none">
        <p className="text-sm text-gray-400">ارزش کل سبد</p>
        <p className="text-lg font-bold text-gray-800 mt-1">
          {totalValue.toLocaleString()} تومان
        </p>
      </div> */}

      {/* 🧾 Custom Legend */}
      <div className="flex flex-wrap gap-3 max-h-12 overflow-auto  justify-center text-xs">
        {finalData.map((item, index) => (
          <div
            onClick={() => item.name === 'سایر' ? setMaxLegendItems(true) : null}
            key={index}
            className={`flex items-center gap-2 ${item.name === 'سایر' && 'cursor-pointer'}  rounded-lg`}
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
    </div>
  );
}

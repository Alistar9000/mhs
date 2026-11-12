import React, { useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { usePortfolios } from "../../hooks/usePortfolios";
import { usePortfolioChart } from "../../hooks/useChart";

export default function PortfolioMiniChart({ data = [],dashboard }) {
 
  const gradientId = useMemo(() => `miniGrad-${Math.random().toString(36).substr(2, 9)}`,[]);
  const min = Math.min([...data]);
  const max = Math.max([...data]);
  const padding = Math.max(1, Math.round((max - min) * 0.05));
  const domainMin = Math.max(0, Math.floor(min - padding));
  const domainMax = Math.ceil(max + padding);

  const isPositive = +data[dashboard ? data?.length-1 : 0]?.return_ >= +data[dashboard ? data?.length-2 : 1]?.return_  ;

  const strokeColor = isPositive ? "#16a34a" : "#dc2626"; // سبز/قرمز
  // console.log('mini chart data :',data)
  return (
    <ResponsiveContainer   width={dashboard ? "80%" : "60%"} height={dashboard ? "90%" : "60%"}>
      <AreaChart
        data={dashboard ? data : data.toReversed()}
        margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor} // خط اصلی
          strokeWidth={2}
          fill={`url(#${gradientId})`} // gradient زیر خط
          dot={false}
          isAnimationActive={false}
        />

        <YAxis hide domain={[domainMin, domainMax]} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

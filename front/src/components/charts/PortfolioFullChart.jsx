import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment-jalaali";
import { usePortfolioChart } from "../../hooks/useChart";
import {
  formatCurrency,
  formatReturn,
  formatReturnYaxis,
} from "../../utils/tickFormatter";
import {
  to_persian_date,
  to_persian_date_Xaxis,
} from "../../utils/persianDate";

export default function PortfolioFullChart({ id }) {
  const [selectedRange, setSelectedRange] = useState("1M");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("value"); // "nav" or "return"

  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  const { data = [], isLoading } = usePortfolioChart(id, selectedRange);
  const chartArray = data?.data ?? [];
  const chartPoints = useMemo(
    () =>
      chartArray.map((v, i, e) =>
        selectedMetric === "value" ? { v, i } : { v, e },
      ),
    [chartArray],
  );
  if (isLoading || !chartArray.length) {
    return null;
  }

  const min = Math.min([...chartArray]);
  const max = Math.max([...chartArray]);
  const padding = Math.max(1, Math.round((max - min) * 0.05));
  const domainMin = Math.max(0, Math.floor(min - padding));
  const domainMax = Math.ceil(max + padding);

  return (
    <div className="">
      {/* انتخاب بازه زمانی */}
      <div className="flex sm:justify-between px-6 flex-col sm:flex-row gap-2  sm:items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedMetric("value")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              selectedMetric === "value"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            ارزش
          </button>
          <button
            onClick={() => setSelectedMetric("return")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              selectedMetric === "return"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            بازدهی
          </button>
        </div>

        <div className="flex gap-2">
          {["1M", "3M", "6M", "1Y"].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedRange === range
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Toggle metric */}
      </div>

      {/* نمودار */}
      <div
        dir="ltr"
        className="overflow-auto mt-4 scrollbar-hide h-72 sm:h-64 pr-4 sm:px-6  w-full"
      >
        <ResponsiveContainer className={""} width="100%" height="100%">
          <LineChart
            data={chartArray}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => {
                return to_persian_date_Xaxis(dateStr);
              }}
              fontSize={10}
              tickMargin={10}
            />
            <YAxis
              fontSize={12}
              tickMargin={10}
              tickFormatter={
                selectedMetric === "value" ? formatCurrency : formatReturnYaxis
              }
              domain={[domainMin, domainMax]}
            />
            <Tooltip
              formatter={(value) => [
                selectedMetric === "return"
                  ? formatReturn(value)
                  : value.toLocaleString(),
                selectedMetric === "value" ? "ارزش" : "بازدهی",
              ]}
              labelFormatter={(label) => to_persian_date(label)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

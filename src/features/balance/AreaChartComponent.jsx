import { useSearchParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* eslint-disable react/prop-types */
function AreaChartComponent({ data, monthData }) {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const monthParam = searchParams.get("month") || "";

  if (!data) return null;
  let adjustedData = {};

  if (time === "month" || monthParam) {
    adjustedData = monthData;
  } else adjustedData = data;

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;

    const { day, monthYear, balance } = payload[0].payload;
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    const [year, month] = monthParam.split("-");
    const monthLong = new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
    });

    return (
      <div className="bg-lightBg px-5 py-2 rounded-md border border-stone-200">
        {time === "month" || monthParam ? (
          <p>
            {day} {currentMonth}
          </p>
        ) : monthParam ? (
          <p>
            {day} {monthLong}
          </p>
        ) : (
          <p>{monthYear}</p>
        )}
        <p className="text-green-500">Balance: {balance.toLocaleString()}€</p>{" "}
        <p className="text-red-500"></p>
      </div>
    );
  }

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.balance));
    const dataMin = Math.min(...data.map((i) => i.balance));

    if (dataMax <= 0) {
      return 0;
    } else if (dataMin >= 0) {
      return 1;
    } else {
      return dataMax / (dataMax - dataMin);
    }
  };

  const off = gradientOffset();
  console.log(adjustedData);

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={adjustedData}
          margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
        >
          {time === "month" || monthParam ? (
            <XAxis dataKey="day" />
          ) : (
            <XAxis dataKey="monthYear" />
          )}
          <YAxis tickFormatter={euroFormatter} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={renderTooltip} />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartComponent;

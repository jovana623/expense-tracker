import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* eslint-disable react/prop-types */
function AreaChartComponent({ data, timeValue, monthData }) {
  if (!data) return null;
  let adjustedData = {};

  if (timeValue === "month") {
    adjustedData = monthData;
  } else adjustedData = data;

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;

    const { day, month, balance } = payload[0].payload;
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

    return (
      <div className="bg-lightBg px-5 py-2 rounded-md border border-stone-200">
        {timeValue === "month" ? (
          <p>
            {day} {currentMonth}
          </p>
        ) : (
          <p>{month}</p>
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

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <AreaChart
        width={500}
        height={250}
        data={adjustedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {timeValue === "month" ? (
          <XAxis dataKey="day" />
        ) : (
          <XAxis dataKey="month" />
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
    </div>
  );
}

export default AreaChartComponent;

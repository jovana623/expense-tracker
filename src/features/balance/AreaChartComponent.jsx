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
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
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
  );
}

export default AreaChartComponent;

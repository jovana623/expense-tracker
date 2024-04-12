import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* eslint-disable react/prop-types */
function LineChartComponent({ data }) {
  if (!data) return null;
  return (
    <div className="pl-0 ml-[-2.3rem]">
      <LineChart
        width={650}
        height={300}
        data={data}
        margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#22c55e" />
        <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
      </LineChart>
    </div>
  );
}

export default LineChartComponent;

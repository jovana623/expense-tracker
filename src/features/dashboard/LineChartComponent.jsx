import { useSearchParams } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* eslint-disable react/prop-types */
function LineChartComponent({ data, monthData }) {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";

  if (!data) return null;
  let adjustedData = {};

  if (time === "month" || month) {
    adjustedData = monthData;
  } else adjustedData = data;

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;

    const { day, month, income, expenses } = payload[0].payload;
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

    return (
      <div className="bg-lightBg px-0 py-2 rounded-md border border-stone-200 w-full">
        {time === "month" ? (
          <p>
            {day} {currentMonth}
          </p>
        ) : (
          <p>{month}</p>
        )}
        <p className="text-green-500">Income: {income.toLocaleString()}€</p>{" "}
        <p className="text-red-500">Expenses: {expenses.toLocaleString()}€</p>
      </div>
    );
  }

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={adjustedData}
          margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {time === "month" ? (
            <XAxis dataKey="day" />
          ) : (
            <XAxis dataKey="month" />
          )}

          <YAxis tickFormatter={euroFormatter} />
          <Tooltip content={renderTooltip} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22c55e" />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;

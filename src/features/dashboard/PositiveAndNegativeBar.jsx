import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

/* eslint-disable react/prop-types */
function PositiveAndNegativeBar({ data, timeValue, monthData }) {
  let adjustedData = {};

  if (timeValue === "month") {
    adjustedData = monthData;
  } else adjustedData = data;

  const finalData = adjustedData.map((item) => ({
    ...item,
    expenses: item.expenses,
  }));

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;

    const { day, month, income, expenses } = payload[0].payload;
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
        <p className="text-green-500">Income: {income.toLocaleString()}€</p>{" "}
        <p className="text-red-500">
          Expenses: {Math.abs(expenses).toLocaleString()}€
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={finalData}
        stackOffset="sign"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {timeValue === "month" ? (
          <XAxis dataKey="day" />
        ) : (
          <XAxis dataKey="month" />
        )}
        <YAxis tickFormatter={euroFormatter} />
        <Tooltip content={renderTooltip} />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="income" fill="#22c55e" stackId="stack" />
        <Bar dataKey="expenses" fill="#ef4444" stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PositiveAndNegativeBar;

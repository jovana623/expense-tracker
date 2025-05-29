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
import { prepareData } from "../../helpers/savingsFunctions";
import { formatDate } from "../../helpers/dateFunctions";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function SavingsGoalChart({ saving, payments, currency }) {
  const today = new Date();
  const { chartData, endDate } = prepareData(saving, payments, today);

  const lastPaymentIndex = chartData.findIndex((item, index) => {
    return index > 0 && item.total !== chartData[index - 1].total;
  });

  const solidData = chartData.slice(0, lastPaymentIndex + 1);
  const dottedData = chartData.slice(lastPaymentIndex);

  const formattedCurrency = getCurrencyEntity(currency);

  const currencyFormatter = (tick) =>
    `${tick.toLocaleString()}${formattedCurrency}`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;
    const { date, total, goal } = payload[0].payload;

    return (
      <div
        className="bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200
                   dark:bg-gray-700 dark:border-gray-600"
      >
        <p>{date}</p>
        <p className="text-red-500 font-medium">
          Goal: {goal.toLocaleString()}
          {formattedCurrency}
        </p>
        <p className="text-green-500 font-medium">
          Saved: {total.toLocaleString()}
          {getCurrencyEntity(currency)}
        </p>{" "}
      </div>
    );
  }

  return (
    <div className="pl-0 ml-[-2rem] text-sm">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="stroke-gray-300 dark:stroke-gray-500"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            type="category"
            domain={[chartData[0]?.date, endDate]}
            tick={{ fill: "currentColor" }}
            className="dark:text-white"
          />
          <YAxis
            tickFormatter={currencyFormatter}
            tick={{ fill: "currentColor" }}
            className="dark:text-white"
          />
          <Tooltip content={renderTooltip} />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingBottom: "10px" }}
            payload={[
              { value: "Progress", type: "square", color: "#22c55e" },
              { value: "Goal", type: "square", color: "#ef4444" },
            ]}
          />
          <Line
            type="monotone"
            dataKey="goal"
            stroke="#f87171"
            strokeWidth={2}
            dot={false}
            name="Goal"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            data={solidData}
            dataKey="total"
            stroke="#ffffff"
            dot={false}
            name="Cumulative Savings"
            strokeWidth={0}
          />
          <Line
            type="monotone"
            data={dottedData}
            dataKey="total"
            stroke="#4ade80"
            name="Total payments"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SavingsGoalChart;

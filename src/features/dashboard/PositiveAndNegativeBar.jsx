import { useSearchParams } from "react-router-dom";
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
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function PositiveAndNegativeBar({ data, monthData, currency }) {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const monthParam = searchParams.get("month") || "";
  const formattedCurrency = getCurrencyEntity(currency);

  let adjustedData = {};

  if (time === "month" || monthParam) {
    adjustedData = monthData;
  } else adjustedData = data;

  const finalData = adjustedData.map((item) => ({
    ...item,
    expenses: item.expenses,
  }));

  const currencyFormatter = (tick) =>
    `${tick.toLocaleString()}${formattedCurrency}`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;

    const { day, monthYear, income, expenses } = payload[0].payload;
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    const [year, month] = monthParam.split("-");
    const monthLong = new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
    });

    return (
      <div
        className="bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200
                   dark:bg-gray-700 dark:border-gray-600"
      >
        {time === "month" ? (
          <p className="text-gray-700 dark:text-gray-200 font-semibold">
            {day} {currentMonth}
          </p>
        ) : monthParam ? (
          <p className="text-gray-700 dark:text-gray-200 font-semibold">
            {day} {monthLong}
          </p>
        ) : (
          <p className="text-gray-700 dark:text-gray-200 font-semibold">
            {monthYear}
          </p>
        )}
        <p className="text-green-500 font-medium">
          Income: {income.toLocaleString()}
          {formattedCurrency}
        </p>{" "}
        <p className="text-red-500 font-medium">
          Expenses: {Math.abs(expenses).toLocaleString()}
          {formattedCurrency}
        </p>
      </div>
    );
  }

  return (
    <div className="text-sm">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          width={500}
          height={300}
          data={finalData}
          stackOffset="sign"
          margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="stroke-gray-300 dark:stroke-gray-500"
          />

          <XAxis
            dataKey={time === "month" || monthParam ? "day" : "monthYear"}
            interval={time === "month" || monthParam ? 5 : "preserveStartEnd"}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b7280" }}
            className="dark:text-gray-300"
          />
          <YAxis
            tickFormatter={currencyFormatter}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor" }}
            className="dark:text-gray-300"
          />
          <Tooltip content={renderTooltip} />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingBottom: "10px" }}
            payload={[
              { value: "Income", type: "square", color: "#22c55e" },
              { value: "Expenses", type: "square", color: "#ef4444" },
            ]}
          />
          <ReferenceLine
            y={0}
            strokeDasharray="3 3"
            className="stroke-gray-400 dark:stroke-gray-500"
          />

          <Bar
            dataKey="income"
            fill="#22c55e"
            stackId="stack"
            data-testid="income-bar"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            fill="#ef4444"
            stackId="stack"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PositiveAndNegativeBar;

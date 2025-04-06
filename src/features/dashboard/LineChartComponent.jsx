import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function LineChartComponent({ data, monthData, currency }) {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const monthParam = searchParams.get("month") || "";

  const formattedCurrency = useMemo(
    () => getCurrencyEntity(currency),
    [currency]
  );

  const adjustedData = useMemo(() => {
    if (!data) return [];

    let modifiedData = time === "month" || monthParam ? monthData : data;
    return modifiedData.map((item) => ({
      ...item,
      expenses: Math.abs(item.expenses),
    }));
  }, [data, monthData, time, monthParam]);

  if (!data) return null;

  const currencyFormatter = (tick) =>
    `${tick.toLocaleString()}${formattedCurrency}`;

  const renderTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload[0]) return null;

    const { day, monthYear, income, expenses } = payload[0].payload;
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    const [year, month] = monthParam.split("-");
    const monthLong = new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
    });

    return (
      <div className="bg-lightBg px-5 py-2 rounded-md border border-stone-200 dark:bg-gray-800 dark:border-stone-600">
        {time === "month" ? (
          <p className="dark:text-gray-200">
            {day} {currentMonth}
          </p>
        ) : monthParam ? (
          <p className="dark:text-gray-200">
            {day} {monthLong}
          </p>
        ) : (
          <p className="dark:text-gray-200">{monthYear}</p>
        )}
        <p className="text-green-500">
          Income: {income.toLocaleString()}
          {formattedCurrency}
        </p>
        <p className="text-red-500">
          Expenses: {expenses.toLocaleString()}
          {formattedCurrency}
        </p>
      </div>
    );
  };

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={adjustedData}
          margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="stroke-gray-300 dark:stroke-gray-500"
          />
          <XAxis
            dataKey={time === "month" || monthParam ? "day" : "monthYear"}
            interval={time === "month" || monthParam ? 5 : "preserveStartEnd"}
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
              { value: "Income", type: "square", color: "#22c55e" },
              { value: "Expenses", type: "square", color: "#ef4444" },
            ]}
          />
          <ReferenceLine
            y={0}
            className="stroke-gray-800 dark:stroke-gray-400"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#f87171"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;

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
import { formatMonthYear } from "../../helpers/dateFunctions";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function CategoryChart({ data, currency }) {
  const formattedData = data.map((item) => ({
    month: formatMonthYear(`${item.date__year}-${item.date__month}-01`),
    total: item.total,
  }));
  const formattedCurrency = getCurrencyEntity(currency);

  const currencyFormatter = (tick) =>
    `${tick.toLocaleString()}${formattedCurrency}`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;
    const { total, month } = payload[0].payload;
    return (
      <div
        className="bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200
                   dark:bg-gray-700 dark:border-gray-600"
      >
        <p className="text-gray-700 dark:text-gray-200 font-semibold">
          {month}
        </p>
        <p className="text-blue-400 font-medium">
          Amount: {total.toLocaleString()}
          {formattedCurrency}
        </p>
      </div>
    );
  }

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="stroke-gray-300 dark:stroke-gray-500"
            vertical={false}
          />
          <XAxis
            dataKey="month"
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
            payload={[{ value: "Amount", type: "square", color: "#87CEEB" }]}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#87CEEB"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;

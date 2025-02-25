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
      <div className="bg-lightBg px-0 py-2 rounded-md border border-stone-200 w-full">
        <p>{month}</p>
        <p className="text-blue-300">
          Amount: {total.toLocaleString()}
          {formattedCurrency}
        </p>
      </div>
    );
  }

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={currencyFormatter} />
          <Tooltip content={renderTooltip} />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingBottom: "10px" }}
            payload={[{ value: "Amount", type: "square", color: "#87CEEB" }]}
          />
          <Line type="monotone" dataKey="total" stroke="#87CEEB" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;

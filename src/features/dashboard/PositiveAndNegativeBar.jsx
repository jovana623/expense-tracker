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
      <div className="bg-lightBg px-5 py-2 rounded-md border border-stone-200">
        {time === "month" ? (
          <p>
            {day} {currentMonth}
          </p>
        ) : monthParam ? (
          <p>
            {day} {monthLong}
          </p>
        ) : (
          <p>{monthYear}</p>
        )}
        <p className="text-green-500">
          Income: {income.toLocaleString()}
          {formattedCurrency}
        </p>{" "}
        <p className="text-red-500">
          Expenses: {Math.abs(expenses).toLocaleString()}
          {formattedCurrency}
        </p>
      </div>
    );
  }

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <ResponsiveContainer width="104%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={finalData}
          stackOffset="sign"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {time === "month" || monthParam ? (
            <XAxis dataKey="day" />
          ) : (
            <XAxis dataKey="monthYear" />
          )}
          <YAxis tickFormatter={currencyFormatter} />
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
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey="income"
            fill="#22c55e"
            stackId="stack"
            data-testid="income-bar"
          />
          <Bar dataKey="expenses" fill="#ef4444" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PositiveAndNegativeBar;

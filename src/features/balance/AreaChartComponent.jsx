import { useSearchParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function AreaChartComponent({ dailyBalance, monthlyBalance, currency }) {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const monthParam = searchParams.get("month") || "";
  const formattedCurrency = getCurrencyEntity(currency);

  let balance = [];

  if (time === "month" || monthParam) {
    balance = dailyBalance;
  } else balance = monthlyBalance;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;
    const { date, balance } = payload[0].payload;
    const [year, month, day] = date.split("-");
    const monthLong = new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
    });

    return (
      <div className="bg-lightBg px-5 py-2 rounded-md border border-stone-200">
        <p>
          {day} {monthLong} {year}
        </p>
        <p className="text-green-500">
          Balance: {balance.toLocaleString()}
          {formattedCurrency}
        </p>
      </div>
    );
  }
  const euroFormatter = (tick) =>
    `${tick.toLocaleString()}${formattedCurrency}`;

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    if (!day) {
      const monthLong = new Date(year, month - 1).toLocaleString("en-US", {
        month: "long",
      });
      return `${monthLong} ${year}`;
    }
    const monthLong = new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
    });
    return `${parseInt(day)} ${monthLong} ${year}`;
  };

  return (
    <div className="pl-0 ml-[-3rem] text-sm">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={balance}
          margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
        >
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis tickFormatter={euroFormatter} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={renderTooltip} />
          <Area type="monotone" dataKey="balance" fill="green" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartComponent;

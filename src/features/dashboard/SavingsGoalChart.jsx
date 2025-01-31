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

/* eslint-disable react/prop-types */
function SavingsGoalChart({ data }) {
  const { chartData, endDate } = prepareData(data);

  console.log(chartData);

  const lastPaymentIndex = chartData.findIndex((item, index) => {
    return index > 0 && item.total !== chartData[index - 1].total;
  });

  const solidData = chartData.slice(0, lastPaymentIndex + 1);
  const dottedData = chartData.slice(lastPaymentIndex);

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;
    const { date, total, goal } = payload[0].payload;
    const [month, day, year] = date.split("/");
    const monthLong = new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
    });

    return (
      <div className="bg-lightBg px-5 py-2 rounded-md border border-stone-200">
        <p>
          {day} {monthLong} {year}
        </p>
        <p className="text-red-500">Goal: {goal.toLocaleString()}€</p>
        <p className="text-green-500">Saved: {total.toLocaleString()}€</p>{" "}
      </div>
    );
  }

  return (
    <div className="pl-0 ml-[-2rem] text-sm">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            type="category"
            domain={[chartData[0]?.date, endDate]}
          />
          <YAxis tickFormatter={euroFormatter} />
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
            stroke="red"
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
          />

          <Line
            type="monotone"
            data={dottedData}
            dataKey="total"
            stroke="#008000"
            name="Total payments"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SavingsGoalChart;

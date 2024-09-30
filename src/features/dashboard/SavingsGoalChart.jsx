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

/* eslint-disable react/prop-types */
function SavingsGoalChart({ data }) {
  const { chartData, endDate } = prepareData(data);

  const lastPaymentIndex = chartData.findIndex((item, index) => {
    return index > 0 && item.total !== chartData[index - 1].total;
  });

  const solidData = chartData.slice(0, lastPaymentIndex + 1);
  const dottedData = chartData.slice(lastPaymentIndex);

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  return (
    <div className="pl-0 ml-[-2rem] text-sm">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
            type="category"
            domain={[chartData[0]?.date, endDate]}
          />
          <YAxis tickFormatter={euroFormatter} />
          <Tooltip />
          <Legend align="right" verticalAlign="bottom" />
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

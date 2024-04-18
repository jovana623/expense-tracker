import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateTotalAmount } from "../../helpers/sortTransactions";

/* eslint-disable react/prop-types */
function HorizontalBarChart({ data, color }) {
  const maxValue = calculateTotalAmount(data);

  function calculatePercentage(value, maxValue) {
    return ((value * 100) / maxValue).toFixed(0);
  }
  const adjustedData = data.map((item) => ({
    ...item,
    percentage: `${calculatePercentage(item.amount, maxValue)}%`,
  }));

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  function renderTooltip({ active, payload }) {
    if (!active || !payload || !payload[0]) return null;

    const { typeName, amount } = payload[0].payload;

    return (
      <div className="bg-lightBg px-5 py-2 rounded-md border border-stone-200">
        <p>{typeName}</p>
        <p>{amount.toLocaleString()}€</p>{" "}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={adjustedData}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          domain={[0, maxValue]}
          tickFormatter={euroFormatter}
        />
        <YAxis dataKey="typeName" type="category" />
        <Tooltip content={renderTooltip} />
        <Bar dataKey="amount" fill={color}>
          <LabelList dataKey="percentage" position="right" fill={color} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default HorizontalBarChart;

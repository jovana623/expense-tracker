import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatMonthYear } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function CategoryChart({ data }) {
  const formattedData = data.map((item) => ({
    month: formatMonthYear(`${item.date__year}-${item.date__month}-01`), // Using the first day of the month
    total: item.total,
  }));

  const euroFormatter = (tick) => `${tick.toLocaleString()}€`;

  return (
    <LineChart
      width={600}
      height={300}
      data={formattedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis tickFormatter={euroFormatter} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total" stroke="#8884d8" />
    </LineChart>
  );
}

export default CategoryChart;

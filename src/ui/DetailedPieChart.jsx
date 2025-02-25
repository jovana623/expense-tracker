import Legend from "./Legend";
import PieChartComponent from "./PieChartComponent";

/* eslint-disable react/prop-types */
function DetailedPieChart({ data, currency }) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4  sm:flex-row sm:items-center sm:justify-center">
      <PieChartComponent data={data} />
      <Legend data={data} currency={currency} />
    </div>
  );
}

export default DetailedPieChart;

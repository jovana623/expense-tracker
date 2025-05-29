import { useSavings } from "../savings/useSavings";
import Spinner from "../../ui/Spinner";
import RadialBarChart from "./RadialBarChart";
import RadialChartTable from "./RadialChartTable";
import ChartCard from "../../ui/ChartCard";

/* eslint-disable react/prop-types */
function SavingsContainer({ currency }) {
  const { savings, isLoading } = useSavings();

  if (!savings) return null;
  const adjustedData = savings.map((item) => ({
    ...item,
    percentage: parseFloat(((item.amount / item.goal) * 100).toFixed(1)),
    fill: item.color,
  }));

  return (
    <ChartCard title="Saving goals">
      <p></p>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex">
          <RadialBarChart data={adjustedData} />
          <RadialChartTable data={adjustedData} currency={currency} />
        </div>
      )}
    </ChartCard>
  );
}

export default SavingsContainer;

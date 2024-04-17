import { useSavings } from "../savings/useSavings";
import Spinner from "../../ui/Spinner";
import RadialBarChartComponent from "./RadialBarChart";
import RadialChartTable from "./RadialChartTable";

function SavingsContainer() {
  const { savings, isLoading } = useSavings();

  if (!savings) return null;
  const adjustedData = savings.map((item) => ({
    ...item,
    percentage: ((item.amount / item.goal) * 100).toFixed(1),
    fill: item.color,
  }));

  console.log(adjustedData);
  if (isLoading) return <Spinner />;

  return (
    <div className="rounded-md shadow h-[100%] flex flex-col px-4 py-7">
      <p className="font-semibold text-xl text-center">Saving goals</p>
      <RadialBarChartComponent data={adjustedData} />
      <RadialChartTable data={adjustedData} />
    </div>
  );
}

export default SavingsContainer;

import { useSavings } from "../savings/useSavings";
import Spinner from "../../ui/Spinner";
import RadialBarChart from "./RadialBarChart";
import RadialChartTable from "./RadialChartTable";

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
    <div className="rounded-md shadow h-[100%] flex flex-col px-4 py-7 dark:bg-gray-700">
      <p className="font-semibold text-xl text-center dark:text-gray-200">
        Saving goals
      </p>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <RadialBarChart data={adjustedData} />
          <RadialChartTable data={adjustedData} currency={currency} />
        </>
      )}
    </div>
  );
}

export default SavingsContainer;

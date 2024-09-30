import { useState } from "react";
import {
  getCurrentMonthData,
  OneMonth,
  sortByMonth,
} from "../../helpers/sortTransactions";
import Spinner from "../../ui/Spinner";
import { useTransactions } from "../transactions/useTransactions";
import LineChartComponent from "./LineChartComponent";
import ChartCard from "../../ui/ChartCard";
import PositiveAndNegativeBar from "./PositiveAndNegativeBar";
import { useSearchParams } from "react-router-dom";
import SelectCharts from "../../ui/SelectCharts";
import SelectSaving from "../../ui/SelectSaving";
import { useSaving } from "../savings/useSaving";
import SavingsGoalChart from "./SavingsGoalChart";
function Overview() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const savingParam = searchParams.get("saving") || 4;
  const { transactions, isLoading: isLoadingTransactions } = useTransactions(
    time,
    month
  );

  const { saving, isLoading: isLoadingSaving } = useSaving(savingParam);

  const [chart, setChart] = useState("bar");

  let monthData = [];

  if (isLoadingTransactions || isLoadingSaving) return <Spinner />;

  const sortedByMonth = sortByMonth(transactions);

  if (!month) monthData = getCurrentMonthData(transactions);
  else monthData = OneMonth(transactions);

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <ChartCard>
        <SelectCharts onSetChart={setChart} />
        {chart === "bar" ? (
          <PositiveAndNegativeBar
            data={sortedByMonth}
            monthData={monthData}
          ></PositiveAndNegativeBar>
        ) : (
          <LineChartComponent data={sortedByMonth} monthData={monthData} />
        )}
      </ChartCard>
      <ChartCard>
        <SelectSaving />
        <SavingsGoalChart data={saving} />
      </ChartCard>
    </div>
  );
}

export default Overview;

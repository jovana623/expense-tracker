import { useState } from "react";
import {
  getCurrentMonthData,
  OneMonth,
  sortByMonth,
} from "../../helpers/sortTransactions";

import { useTransactions } from "../transactions/useTransactions";
import { useSearchParams } from "react-router-dom";
import { useSaving } from "../savings/useSaving";
import { useSavings } from "../savings/useSavings";

import SavingsGoalChart from "./SavingsGoalChart";
import Select from "../../ui/Select";
import PositiveAndNegativeBar from "./PositiveAndNegativeBar";
import LineChartComponent from "./LineChartComponent";
import ChartCard from "../../ui/ChartCard";
import ChartSkeleton from "../../ui/ChartSkeleton";
import { useCurrentUser } from "../authentification/useCurrentUser";

const charts = [
  { id: 1, value: "bar", name: "Bar chart" },
  { id: 2, value: "line", name: "Line chart" },
];

function Overview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [chart, setChart] = useState(1);

  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const savingParam = searchParams.get("saving") || 4;
  const { transactions, isLoading: isLoadingTransactions } = useTransactions(
    time,
    month
  );

  const { saving, isLoading: isLoadingSaving } = useSaving(savingParam);
  const { savings, isLoading: isLoadingSavings } = useSavings();
  const { data: currectUser, isLoading: isLoadingUser } = useCurrentUser();

  let monthData = [];
  let sortedByMonth = [];

  if (!isLoadingTransactions) {
    sortedByMonth = sortByMonth(transactions);
    if (!month) monthData = getCurrentMonthData(transactions);
    else monthData = OneMonth(transactions, month);
  }

  function handleSavingChange(e) {
    searchParams.set("saving", e.target.value);
    setSearchParams(searchParams);
  }

  function handleGraphChange(e) {
    setChart(Number(e.target.value));
  }

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <ChartCard title="Income vs. Expenses">
        <Select data={charts} onChange={handleGraphChange} />
        {isLoadingTransactions || isLoadingUser ? (
          <ChartSkeleton />
        ) : (
          <>
            {chart === 1 ? (
              <PositiveAndNegativeBar
                data={sortedByMonth}
                monthData={monthData}
                currency={currectUser.currency}
              ></PositiveAndNegativeBar>
            ) : (
              <LineChartComponent
                data={sortedByMonth}
                monthData={monthData}
                currency={currectUser.currency}
              />
            )}
          </>
        )}
      </ChartCard>
      <ChartCard title="Savings progress">
        {isLoadingSavings ? (
          <div></div>
        ) : (
          <Select data={savings} onChange={handleSavingChange} />
        )}
        {isLoadingSaving || isLoadingUser ? (
          <ChartSkeleton />
        ) : (
          <SavingsGoalChart data={saving} currency={currectUser.currency} />
        )}
      </ChartCard>
    </div>
  );
}

export default Overview;

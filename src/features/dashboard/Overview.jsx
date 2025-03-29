import React, { Suspense, useMemo, useState } from "react";
import { sortByMonth, sortMonthData } from "../../helpers/sortTransactions";
import { getCurrentMonthAndYear } from "../../helpers/dateFunctions";

import { useTransactions } from "../transactions/useTransactions";
import { useSearchParams } from "react-router-dom";
import { useSaving } from "../savings/useSaving";
import { useSavings } from "../savings/useSavings";
import { usePayments } from "../payments/usePayments";

import Select from "../../ui/Select";
import ChartCard from "../../ui/ChartCard";
import ChartSkeleton from "../../ui/ChartSkeleton";

const SavingsGoalChart = React.lazy(() => import("./SavingsGoalChart"));
const IncomeExpenseChart = React.lazy(() => import("./IncomeExpenseChart"));

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

  const { savings, isLoading: isLoadingSavings } = useSavings();
  const { saving } = useSaving(savingParam);
  const { payments } = usePayments(savingParam);

  const currency = localStorage.getItem("currency");

  const { monthData, sortedByMonth } = useMemo(() => {
    let sortedByMonth = [];
    let monthData = [];
    const currentDate = getCurrentMonthAndYear();

    if (!isLoadingTransactions) {
      sortedByMonth = sortByMonth(transactions);
      if (!month) monthData = sortMonthData(transactions, currentDate);
      else monthData = sortMonthData(transactions, month);
    }

    return { monthData, sortedByMonth };
  }, [transactions, month, isLoadingTransactions]);

  console.log(monthData);

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
        <Suspense fallback={<ChartSkeleton />}>
          <IncomeExpenseChart
            chart={chart}
            sortedByMonth={sortedByMonth}
            monthData={monthData}
          />
        </Suspense>
      </ChartCard>
      <ChartCard title="Savings progress">
        {isLoadingSavings ? (
          <div></div>
        ) : (
          <Select data={savings} onChange={handleSavingChange} />
        )}

        <Suspense fallback={<ChartSkeleton />}>
          {saving && payments ? (
            <SavingsGoalChart
              saving={saving}
              payments={payments}
              currency={currency}
            />
          ) : (
            <ChartSkeleton />
          )}
        </Suspense>
      </ChartCard>
    </div>
  );
}

export default Overview;

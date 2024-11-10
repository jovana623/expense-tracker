import { useSearchParams } from "react-router-dom";
import {
  calculateBalance,
  calculateDailyBalance,
  getCurrentMonthData,
  OneMonth,
  sortByMonth,
} from "../../helpers/sortTransactions";
import Spinner from "../../ui/Spinner";
import { useTransactions } from "../transactions/useTransactions";

import AreaChartComponent from "./AreaChartComponent";
import ChartCard from "../../ui/ChartCard";

function Balance() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";

  const { transactions, isLoading } = useTransactions(time, month);
  let monthData = [];
  let sortedByMonth = [];

  if (isLoading) return <Spinner />;

  if (!isLoading) {
    sortedByMonth = sortByMonth(transactions);
    if (!month) monthData = getCurrentMonthData(transactions);
    else monthData = OneMonth(transactions, month);
  }

  const dailyBalance = calculateDailyBalance(monthData);
  const balance = calculateBalance(sortedByMonth);

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <ChartCard>
        <div></div>
        <AreaChartComponent
          data={balance}
          timeValue={time}
          monthData={dailyBalance}
        />
      </ChartCard>
      <ChartCard></ChartCard>
      <div></div>
    </div>
  );
}

export default Balance;

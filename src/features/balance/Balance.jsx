import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import {
  calculateBalance,
  calculateDailyBalance,
  getCurrentMonthData,
  sortByMonth,
} from "../../helpers/sortTransactions";
import AreaChartComponent from "./AreaChartComponent";
import { useTransactions } from "../transactions/useTransactions";
import ChartCard from "../../ui/ChartCard";

function Balance() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";

  const { transactions, isLoading } = useTransactions(time, month);

  if (isLoading) return <Spinner />;

  const sortedByMonth = sortByMonth(transactions);

  const monthData = getCurrentMonthData(transactions);
  const adjustedMonthData = calculateDailyBalance(monthData);
  const balance = calculateBalance(sortedByMonth);

  console.log(monthData);

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <ChartCard>
        <AreaChartComponent
          data={balance}
          timeValue={time}
          monthData={adjustedMonthData}
        />
      </ChartCard>
      <ChartCard></ChartCard>
      <div></div>
    </div>
  );
}

export default Balance;

import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import {
  calculateBalance,
  calculateDailyBalance,
  getCurrentMonthData,
  sortByMonth,
} from "../../helpers/sortTransactions";
import PieChartCard from "../dashboard/PieChartCard";
import AreaChartComponent from "./AreaChartComponent";
import { useTransactions } from "../transactions/useTransactions";

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
    <div className="flex gap-12 h-80">
      <PieChartCard>
        <AreaChartComponent
          data={balance}
          timeValue={time}
          monthData={adjustedMonthData}
        />
      </PieChartCard>
      <PieChartCard></PieChartCard>
      <div></div>
    </div>
  );
}

export default Balance;

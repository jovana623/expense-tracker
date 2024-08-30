import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import {
  calculateBalance,
  calculateDailyBalance,
  getCurrentMonthData,
  monthySummary,
} from "../../helpers/sortTransactions";
import PieChartCard from "../dashboard/PieChartCard";
import AreaChartComponent from "./AreaChartComponent";
import { useTransactions } from "../transactions/useTransactions";

function Balance() {
  const [searchParams] = useSearchParams();
  const { transactions, isLoading } = useTransactions();

  if (isLoading) return <Spinner />;

  const sortedByMonth = monthySummary();
  const timeValue = searchParams.get("time");
  const monthData = getCurrentMonthData(transactions);
  const adjustedMonthData = calculateDailyBalance(monthData);
  const balance = calculateBalance(sortedByMonth);

  return (
    <div className="flex gap-12 h-80">
      <PieChartCard>
        <AreaChartComponent
          data={balance}
          timeValue={timeValue}
          monthData={adjustedMonthData}
        />
      </PieChartCard>
      <PieChartCard></PieChartCard>
      <div></div>
    </div>
  );
}

export default Balance;

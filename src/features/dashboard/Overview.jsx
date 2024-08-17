import {
  getCurrentMonthData,
  monthySummary,
} from "../../helpers/sortTransactions";
import Spinner from "../../ui/Spinner";
import { useTransactions } from "../transactions/useTransactions";
import LineChartComponent from "./LineChartComponent";
import PieChartCard from "./PieChartCard";
import PositiveAndNegativeBar from "./PositiveAndNegativeBar";
import { useSearchParams } from "react-router-dom";

function Overview() {
  const [searchParams] = useSearchParams();
  const { transactions, isLoading: isLoadingTransactions } = useTransactions();

  if (isLoadingTransactions) return <Spinner />;

  const sortedByMonth = transactions ? monthySummary(transactions) : [];
  const timeValue = searchParams.get("time");
  const monthData = getCurrentMonthData(transactions);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-10">
      <PieChartCard title="Income vs. Expenses bar">
        <PositiveAndNegativeBar
          data={sortedByMonth}
          timeValue={timeValue}
          monthData={monthData}
        ></PositiveAndNegativeBar>
      </PieChartCard>
      <PieChartCard title="Income vs. Expenses line">
        <LineChartComponent
          data={sortedByMonth}
          timeValue={timeValue}
          monthData={monthData}
        />
      </PieChartCard>
    </div>
  );
}

export default Overview;

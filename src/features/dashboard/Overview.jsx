import {
  getCurrentMonthData,
  OneMonth,
  sortByMonth,
} from "../../helpers/sortTransactions";
import Spinner from "../../ui/Spinner";
import { useTransactions } from "../transactions/useTransactions";
import LineChartComponent from "./LineChartComponent";
import PieChartCard from "./PieChartCard";
import PositiveAndNegativeBar from "./PositiveAndNegativeBar";
import { useSearchParams } from "react-router-dom";

function Overview() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const { transactions, isLoading: isLoadingTransactions } = useTransactions(
    time,
    month
  );

  let monthData = [];

  if (isLoadingTransactions) return <Spinner />;

  const sortedByMonth = sortByMonth(transactions);

  if (!month) monthData = getCurrentMonthData(transactions);
  else monthData = OneMonth(transactions);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-10">
      <PieChartCard title="Income vs. Expenses bar">
        <PositiveAndNegativeBar
          data={sortedByMonth}
          monthData={monthData}
        ></PositiveAndNegativeBar>
      </PieChartCard>
      <PieChartCard title="Income vs. Expenses line">
        <LineChartComponent data={sortedByMonth} monthData={monthData} />
      </PieChartCard>
    </div>
  );
}

export default Overview;

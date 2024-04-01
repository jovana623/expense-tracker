import {
  monthySummary,
  summarizeAmountsByCategory,
} from "../../helpers/sortTransactions";
import PieChartComponent from "../../ui/PieChartComponent";
import Spinner from "../../ui/Spinner";
import LineChartComponent from "./LineChartComponent";
import PieChartCard from "./PieChartCard";
import { useTransactions } from "./useTransactions";

function Overview() {
  const { isLoading, transactions } = useTransactions();

  const summarizedByCategory = transactions
    ? summarizeAmountsByCategory(transactions)
    : [];

  const sortedByMonth = transactions ? monthySummary(transactions) : [];
  console.log(sortedByMonth);

  if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-14">
      <PieChartCard>
        <PieChartComponent data={summarizedByCategory}></PieChartComponent>
      </PieChartCard>
      <PieChartCard>
        <LineChartComponent data={sortedByMonth} />
      </PieChartCard>
    </div>
  );
}

export default Overview;

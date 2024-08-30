import Spinner from "../../ui/Spinner";
import PieChartCard from "../dashboard/PieChartCard";
import PieChartComponent from "../../ui/PieChartComponent";
import Table from "../../ui/Table";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import { useIncomeTransactions } from "../transactions/useIncomeTransactions";
import { useSearchParams } from "react-router-dom";

function Income() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";

  const { incomeTransactions, isLoading } = useIncomeTransactions(time);

  const summary = summarizeAmountsByType(incomeTransactions);
  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex gap-12 h-80">
        <PieChartCard>
          <PieChartComponent data={summary}></PieChartComponent>
        </PieChartCard>
        <Table data={incomeTransactions} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Income;

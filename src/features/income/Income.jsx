import Spinner from "../../ui/Spinner";
import PieChartCard from "../dashboard/PieChartCard";
import PieChartComponent from "../../ui/PieChartComponent";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import Table from "../../ui/Table";
import { useIncomeTransactions } from "./useIncomeTransactions";

function Income() {
  const { incomeTransactions, isLoading } = useIncomeTransactions();

  const summary = incomeTransactions
    ? summarizeAmountsByType(incomeTransactions)
    : [];

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

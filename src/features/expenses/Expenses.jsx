import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import PieChartComponent from "../../ui/PieChartComponent";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PieChartCard from "../dashboard/PieChartCard";
import { useExpensesTransactions } from "./useExpensesTransactions";

function Expenses() {
  const { expensesTransactions, isLoading } = useExpensesTransactions();

  const summarizedByType = expensesTransactions
    ? summarizeAmountsByType(expensesTransactions)
    : [];

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex gap-12 h-80">
        <PieChartCard>
          <PieChartComponent data={summarizedByType}></PieChartComponent>
        </PieChartCard>
        <div className="h-80 w-full">
          <Table data={expensesTransactions} isLoading={isLoading}></Table>
        </div>
      </div>
    </div>
  );
}

export default Expenses;

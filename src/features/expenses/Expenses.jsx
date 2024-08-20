import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import PieChartComponent from "../../ui/PieChartComponent";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PieChartCard from "../dashboard/PieChartCard";
import { useExpenseTransactions } from "../transactions/useExpenseTransactions";

function Expenses() {
  const { expenseTransactions, isLoading } = useExpenseTransactions();

  if (isLoading) return <Spinner />;
  console.log(expenseTransactions);

  const summarizedByType = summarizeAmountsByType(expenseTransactions);

  return (
    <div>
      <div className="flex gap-12 h-80">
        <PieChartCard>
          <PieChartComponent data={summarizedByType}></PieChartComponent>
        </PieChartCard>
        <div className="h-80 w-full">
          <Table data={expenseTransactions} isLoading={isLoading}></Table>
        </div>
      </div>
    </div>
  );
}

export default Expenses;

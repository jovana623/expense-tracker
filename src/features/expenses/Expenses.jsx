import { useExpenseTransactions } from "../transactions/useExpenseTransactions";
import { useSearchParams } from "react-router-dom";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import PieChartComponent from "../../ui/PieChartComponent";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PieChartCard from "../dashboard/PieChartCard";

function Expenses() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";

  const { expenseTransactions, isLoading } = useExpenseTransactions(time);

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

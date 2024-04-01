import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import PieChartComponent from "../../ui/PieChartComponent";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PieChartCard from "../dashboard/PieChartCard";
import { useTransactions } from "../dashboard/useTransactions";
import { FiArrowUpRight } from "react-icons/fi";

function Expenses() {
  const { isLoading, transactions: expenseTransactions } =
    useTransactions("Expense");

  const summarizedByType = summarizeAmountsByType(expenseTransactions);
  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex gap-12 h-80">
        <PieChartCard>
          <PieChartComponent data={summarizedByType}></PieChartComponent>
        </PieChartCard>
        <Table
          data={expenseTransactions}
          isLoading={isLoading}
          arrow={<FiArrowUpRight />}
        ></Table>
      </div>
    </div>
  );
}

export default Expenses;

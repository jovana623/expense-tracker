import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import {
  calculateBalance,
  calculateDailyBalance,
  findLargestIncomeAndExpense,
  getCurrentMonthData,
  monthySummary,
} from "../../helpers/sortTransactions";
import PieChartCard from "../dashboard/PieChartCard";
import AreaChartComponent from "./AreaChartComponent";
import { useIncomeTransactions } from "../transactions/useIncomeTransactions";
import { useExpenseTransactions } from "../transactions/useExpenseTransactions";

function Balance() {
  const [searchParams] = useSearchParams();
  const { incomeTransactions, isLoading: isLoadingIncome } =
    useIncomeTransactions();

  const { expensesTransactions, isLoading: isLoadingExpenses } =
    useExpenseTransactions();

  if (isLoadingIncome || isLoadingExpenses) return <Spinner />;

  const allTransactions = incomeTransactions?.concat(expensesTransactions);
  const sortedByMonth = allTransactions ? monthySummary(allTransactions) : [];
  const timeValue = searchParams.get("time");
  const monthData = getCurrentMonthData(allTransactions);
  const adjustedMonthData = calculateDailyBalance(monthData);
  const balance = calculateBalance(sortedByMonth);
  const { largestIncome, largestExpense } =
    findLargestIncomeAndExpense(allTransactions);
  console.log(largestExpense, largestIncome);

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

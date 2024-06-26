import StatisticFilter from "../features/statistics/StatisticFilter";
import { useIncomeTransactions } from "../features/income/useIncomeTransactions";
import {
  calculateTotalAmount,
  summarizeAmountsByType,
} from "../helpers/sortTransactions";
import Spinner from "../ui/Spinner";
import { useExpensesTransactions } from "../features/expenses/useExpensesTransactions";
import StatisticsContainer from "../features/statistics/StatisticsContainer";
import InfoCards from "../features/statistics/InfoCards";
import SavingsContainer from "../features/statistics/SavingsContainer";

function Statistic() {
  const { incomeTransactions, isLoading: isLoadingIncome } =
    useIncomeTransactions();

  const { expensesTransactions, isLoading: isLoadingExpenses } =
    useExpensesTransactions();

  if (!incomeTransactions || !expensesTransactions) return null;

  const totalIncome = calculateTotalAmount(incomeTransactions);
  const incomeByType = summarizeAmountsByType(incomeTransactions);

  const totalExpense = calculateTotalAmount(expensesTransactions);
  const expenseByType = summarizeAmountsByType(expensesTransactions);

  if (isLoadingIncome || isLoadingExpenses) return <Spinner />;
  return (
    <div className="py-2 px-7">
      <div className="flex justify-end ">
        <StatisticFilter />
      </div>
      <div className="grid grid-cols-[2fr_1.5fr_1fr] gap-10 h-[100%]">
        <div className="flex flex-col gap-5">
          <InfoCards totalIncome={totalIncome} totalExpense={totalExpense} />
          <div>
            <StatisticsContainer
              incomeByType={incomeByType}
              expenseByType={expenseByType}
            />
          </div>
        </div>
        <div className="py-4">
          <SavingsContainer />
        </div>
        <div>Child 3</div>
      </div>
    </div>
  );
}

export default Statistic;

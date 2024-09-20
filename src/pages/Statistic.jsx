import { useSearchParams } from "react-router-dom";
import { useIncomeTransactions } from "../features/transactions/useIncomeTransactions";
import { useExpenseTransactions } from "../features/transactions/useExpenseTransactions";

import { summarizeAmountsByType } from "../helpers/sortTransactions";
import Spinner from "../ui/Spinner";
import MonthFilter from "../ui/MonthFilter";
import InfoCards from "../features/statistics/InfoCards";
import StatisticsContainer from "../features/statistics/StatisticsContainer";
import SavingsContainer from "../features/statistics/SavingsContainer";
import TimeFilter from "../ui/TimeFilter";

function Statistic() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";

  const {
    incomeTransactions,
    totalIncome,
    isLoading: isLoadingIncome,
  } = useIncomeTransactions(time, month, {
    fetchRegular: true,
    fetchPaginated: false,
  });

  const {
    expenseTransactions,
    totalExpense,
    isLoading: isLoadingExpense,
  } = useExpenseTransactions(time, month, {
    fetchRegular: true,
    fetchPaginated: false,
  });

  if (isLoadingIncome || isLoadingExpense) return <Spinner />;

  const incomeByType = summarizeAmountsByType(incomeTransactions);
  const expenseByType = summarizeAmountsByType(expenseTransactions);

  return (
    <div className="py-2 px-7">
      <div className="flex justify-end gap-4">
        <MonthFilter />
        <TimeFilter />
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

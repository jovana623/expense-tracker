import { useExpenseTransactions } from "../features/transactions/useIncomeTransactions";
import { subMonths, format } from "date-fns";

export function useExpenseDifference(time, month) {
  let prevTime, prevMonth;
  let percentage = 0;

  if (month) {
    const [year, currentMonth] = month.split("-").map(Number);
    const previousMonthDate = subMonths(new Date(year, currentMonth - 1), 1);
    prevMonth = format(previousMonthDate, "yyyy-MM");
  } else if (time === "month") {
    const currentDate = new Date();
    const previousMonthDate = subMonths(currentDate, 1);
    prevMonth = format(previousMonthDate, "yyyy-MM");
    month = format(currentDate, "yyyy-MM");
  } else if (time === "year") {
    const currentDate = new Date();
    const lastYear = currentDate.getFullYear() - 1;
    prevTime = "year";
    month = `${currentDate.getFullYear()}-01`;
    prevMonth = `${lastYear}-01`;
  }

  const { totalExpense: thisMonthExpense, isLoading } = useExpenseTransactions(
    time,
    month
  );
  const { totalExpense: lastMonthExpense, isLoading: isLoadingPrev } =
    useExpenseTransactions(prevTime || time, prevMonth);

  if (lastMonthExpense !== undefined && lastMonthExpense > 0) {
    percentage =
      ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100;
  } else if (lastMonthExpense === 0) {
    percentage = thisMonthExpense > 0 ? 100 : 0;
  }
  return {
    percentage: percentage.toFixed(0),
    isLoading: isLoading || isLoadingPrev,
  };
}
import { useIncomeTransactions } from "../features/transactions/useIncomeTransactions";
import { subMonths, format } from "date-fns";

export function useIncomeDifference(time, month) {
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

  const { totalIncome: thisMonthIncome, isLoading } = useIncomeTransactions(
    time,
    month
  );
  const { totalIncome: lastMonthIncome, isLoading: isLoadingPrev } =
    useIncomeTransactions(prevTime || time, prevMonth);

  if (
    isLoading ||
    isLoadingPrev ||
    thisMonthIncome === undefined ||
    lastMonthIncome === undefined
  ) {
    return { percentage: "0", isLoading: true };
  }

  const thisIncome = parseFloat(thisMonthIncome) || 0;
  const prevIncome = parseFloat(lastMonthIncome) || 0;

  if (prevIncome > 0) {
    percentage = ((thisIncome - prevIncome) / prevIncome) * 100;
  } else if (prevIncome === 0) {
    percentage = thisIncome > 0 ? 100 : 0;
  }

  return {
    percentage: percentage.toFixed(0),
    isLoading: false,
  };
}

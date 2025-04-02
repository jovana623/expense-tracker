import { useMemo } from "react";
import { calculatePercentage } from "../../../helpers/statistics";

export function useBalancePercentage(
  monthlyBalance,
  isLoadingBalance,
  time = "month"
) {
  const date = new Date();
  const month_param = String(date.getMonth() + 1).padStart(2, "0");
  const year_param = date.getFullYear();
  const currentMonth = `${year_param}-${month_param}`;

  const lastMonth =
    month_param === "01"
      ? `${year_param - 1}-12`
      : `${year_param}-${String(date.getMonth()).padStart(2, "0")}`;

  const lastYear = year_param - 1;
  const lastYearMonths = monthlyBalance
    ? monthlyBalance
        .filter((item) => item.date.startsWith(`${lastYear}-`))
        .map((item) => item.date)
        .sort()
        .reverse()
    : [];

  const lastYearMonth = lastYearMonths.length > 0 ? lastYearMonths[0] : null;

  const { currentMonthBalance, balancePercentage } = useMemo(() => {
    if (isLoadingBalance || !monthlyBalance) {
      return { currentMonthBalance: 0, balancePercentage: 0 };
    }

    const currentBalance =
      monthlyBalance.find((item) => item.date === currentMonth)?.balance || 0;

    let previousBalance = 0;
    if (time === "month") {
      previousBalance =
        monthlyBalance.find((item) => item.date === lastMonth)?.balance || 0;
    } else if (time === "year" && lastYearMonth) {
      previousBalance =
        monthlyBalance.find((item) => item.date === lastYearMonth)?.balance ||
        0;
    }

    return {
      currentMonthBalance: currentBalance,
      balancePercentage: calculatePercentage(
        currentBalance,
        previousBalance
      ).toFixed(2),
    };
  }, [
    monthlyBalance,
    isLoadingBalance,
    currentMonth,
    lastMonth,
    lastYearMonth,
    time,
  ]);

  return { currentMonthBalance, balancePercentage };
}

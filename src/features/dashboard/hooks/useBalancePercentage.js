import { useState, useEffect } from "react";

export function useBalancePercentage(monthlyBalance, isLoadingBalance) {
  const [balancePercentage, setBalancePercentage] = useState(0);
  const [currentMonthBalance, setCurrentMonthBalance] = useState(0);

  const date = new Date();
  const month_param = String(date.getMonth() + 1).padStart(2, "0");
  const year_param = date.getFullYear();
  const currentMonth = `${year_param}-${month_param}`;

  let lastMonth =
    month_param === "01"
      ? `${year_param - 1}-12`
      : `${year_param}-${month_param - 1}`;

  useEffect(() => {
    if (!isLoadingBalance) {
      const currentBalance = monthlyBalance.find(
        (item) => item.date === currentMonth
      )?.balance;

      const lastMonthBalance = monthlyBalance.find(
        (item) => item.date === lastMonth
      )?.balance;

      setCurrentMonthBalance(currentBalance || 0);

      if (lastMonthBalance !== undefined && lastMonthBalance !== 0) {
        setBalancePercentage(
          ((currentBalance - lastMonthBalance) / lastMonthBalance) * 100
        );
      } else {
        setBalancePercentage(100);
      }
    }
  }, [monthlyBalance, isLoadingBalance, currentMonth, lastMonth]);

  return { currentMonthBalance, balancePercentage };
}

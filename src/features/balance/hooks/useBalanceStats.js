import { useEffect, useState } from "react";
import {
  calculateAverageBalance,
  calculateBestBalance,
  calculatePercentageDifference,
  calculateWorstBalance,
} from "../../../helpers/balanceFunctions";

export function useBalanceStats(monthlyBalance, dailyBalance, time, isLoading) {
  const [bestBalance, setBestBalance] = useState();
  const [worstBalance, setWorstBalance] = useState();
  const [averageBalance, setAverageBalance] = useState();
  const [bestBalanceDiff, setBestBalanceDiff] = useState();
  const [worstBalanceDiff, setWorstBalanceDiff] = useState();

  let balance;

  const isMonthlyBalance = time === "year" || time === "all" ? true : false;

  useEffect(() => {
    if (!isLoading) {
      const balance = isMonthlyBalance ? monthlyBalance : dailyBalance;

      const best = calculateBestBalance(balance);
      const worst = calculateWorstBalance(balance);
      const average = calculateAverageBalance(balance);

      setBestBalance(best);
      setWorstBalance(worst);
      setAverageBalance(average);

      if (best && average) {
        setBestBalanceDiff(
          calculatePercentageDifference(best.balance, average)
        );
      }
      if (worst && average) {
        setWorstBalanceDiff(
          calculatePercentageDifference(worst.balance, average)
        );
      }
    }
  }, [isLoading, balance, isMonthlyBalance, monthlyBalance, dailyBalance]);

  return {
    isMonthlyBalance,
    bestBalance,
    worstBalance,
    averageBalance,
    bestBalanceDiff,
    worstBalanceDiff,
  };
}

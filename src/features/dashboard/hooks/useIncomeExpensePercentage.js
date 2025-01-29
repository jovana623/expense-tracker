import { useEffect, useState } from "react";
import {
  calculateMonthlyPercentageChange,
  calculateTwoMonthsPercentageChange,
  calculateYearlyPercentageChange,
} from "../../../helpers/statistics";

export function useIncomeExpensePercentage(
  time,
  month,
  monthlyIncome,
  monthlyExpense,
  yearlyIncome,
  yearlyExpense
) {
  const [incomePercentage, setIncomePercentage] = useState(0);
  const [expensePercentage, setExpensePercentage] = useState(0);
  useEffect(() => {
    if (month) {
      setIncomePercentage(
        calculateTwoMonthsPercentageChange(monthlyIncome, month)
      );
      setExpensePercentage(
        calculateTwoMonthsPercentageChange(monthlyExpense, month)
      );
    } else if (time === "month") {
      setIncomePercentage(calculateMonthlyPercentageChange(monthlyIncome));
      setExpensePercentage(calculateMonthlyPercentageChange(monthlyExpense));
    } else if (time === "year") {
      setIncomePercentage(calculateYearlyPercentageChange(yearlyIncome));
      setExpensePercentage(calculateYearlyPercentageChange(yearlyExpense));
    } else {
      setIncomePercentage(calculateMonthlyPercentageChange(monthlyIncome));
      setExpensePercentage(calculateMonthlyPercentageChange(monthlyExpense));
    }
  }, [time, month, monthlyIncome, monthlyExpense, yearlyIncome, yearlyExpense]);

  return { incomePercentage, expensePercentage };
}

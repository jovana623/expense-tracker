import { useEffect, useState } from "react";
import { calculatePercentage } from "../../../helpers/statistics";

export function useIncomeExpensePercentage(
  time,
  month,
  monthlyData,
  yearlyData,
  isLoading
) {
  const [incomePercentage, setIncomePercentage] = useState(0);
  const [expensePercentage, setExpensePercentage] = useState(0);

  useEffect(() => {
    if (isLoading || !monthlyData || !yearlyData) return;
    let previousIncome = 0;
    let previousExpense = 0;
    let currentIncome = 0;
    let currentExpense = 0;

    if (time === "month") {
      const currentMonth = new Date().toISOString().slice(0, 7);
      const currentMonthData = monthlyData.find(
        (data) => data.month === currentMonth
      );
      currentIncome = currentMonthData?.total_income || 0;
      currentExpense = currentMonthData?.total_expense || 0;

      const prevDate = new Date();
      prevDate.setMonth(prevDate.getMonth() - 1);
      const previousMonth = prevDate.toISOString().slice(0, 7);
      const previousMonthData = monthlyData.find(
        (data) => data.month === previousMonth
      );
      previousIncome = previousMonthData?.total_income || 0;
      previousExpense = previousMonthData?.total_expense || 0;
    } else if (time === "year") {
      const currentYear = new Date().getFullYear().toString();
      const currentYearData = yearlyData.find(
        (data) => data.year === parseInt(currentYear)
      );
      currentIncome = currentYearData?.total_income || 0;
      currentExpense = currentYearData?.total_expense || 0;

      const previousYear = (parseInt(currentYear) - 1).toString();
      const previousYearData = yearlyData.find(
        (data) => data.year === parseInt(previousYear)
      );
      previousIncome = previousYearData?.total_income || 0;
      previousExpense = previousYearData?.total_expense || 0;
    } else if (month) {
      const currentMonthData = monthlyData.find((data) => data.month === month);
      currentIncome = currentMonthData?.total_income || 0;
      currentExpense = currentMonthData?.total_expense || 0;

      const currentMonth = new Date().toISOString().slice(0, 7);
      const previousMonthData = monthlyData.find(
        (data) => data.month === currentMonth
      );
      previousIncome = previousMonthData?.total_income || 0;
      previousExpense = previousMonthData?.total_expense || 0;
    }

    setIncomePercentage(
      calculatePercentage(currentIncome, previousIncome).toFixed(2)
    );
    setExpensePercentage(
      calculatePercentage(currentExpense, previousExpense).toFixed(2)
    );
  }, [time, month, monthlyData, yearlyData, isLoading]);

  return { incomePercentage, expensePercentage };
}

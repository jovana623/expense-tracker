import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../services/apiTransactions";

export function useDashboardData(time, month) {
  const { data, isLoading } = useQuery({
    queryFn: () => getDashboardData(time, month),
    queryKey: ["dashboard_data"],
  });

  const monthlyData = data?.monthlyData;
  const yearlyData = data?.yearlyData;
  const totalIncome = data?.total_income;
  const totalExpense = data?.total_expense;

  return {
    monthlyData,
    yearlyData,
    totalIncome,
    totalExpense,
    isLoading,
  };
}

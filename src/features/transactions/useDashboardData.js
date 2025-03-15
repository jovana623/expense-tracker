import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../services/apiTransactions";

export function useDashboardData(time, month) {
  const { data, isLoading } = useQuery({
    queryFn: () => getDashboardData(time, month),
    queryKey: ["dashboard_data"],
  });

  const totalIncome = data?.total_income || 0;
  const totalExpense = data?.total_expense || 0;

  return {
    totalIncome,
    totalExpense,
    isLoading,
  };
}

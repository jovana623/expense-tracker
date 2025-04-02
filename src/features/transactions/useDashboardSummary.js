import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../../services/apiTransactions";

export function useDashboardSummary(time, month) {
  const { data, isLoading } = useQuery({
    queryFn: () => getDashboardSummary(time, month),
    queryKey: ["dashboard_summary", time, month],
  });

  const totalIncome = data?.total_income;
  const totalExpense = data?.total_expense;

  return {
    totalIncome,
    totalExpense,
    isLoading,
  };
}

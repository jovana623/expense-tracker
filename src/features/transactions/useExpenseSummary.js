import { useQuery } from "@tanstack/react-query";
import { getExpenseSummary } from "../../services/apiTransactions";

export function useExpenseSummary() {
  const { data, isLoading } = useQuery({
    queryFn: getExpenseSummary,
    queryKey: ["expense_summary"],
  });
  const monthlyExpense = data?.monthly_expense || [];
  const yearlyExpense = data?.yearly_expense || [];

  return { monthlyExpense, yearlyExpense, isLoading };
}

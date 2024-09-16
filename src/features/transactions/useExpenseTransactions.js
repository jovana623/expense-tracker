import { useQuery } from "@tanstack/react-query";
import { getExpenseTransactions } from "../../services/apiTransactions";

export function useExpenseTransactions(time, month, sortBy) {
  const { data: expenseTransactions, isLoading } = useQuery({
    queryFn: () => getExpenseTransactions(time, month, sortBy),
    queryKey: ["expense", time, month, sortBy],
  });
  const totalExpense =
    expenseTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    ) || 0;

  return { expenseTransactions, totalExpense, isLoading };
}

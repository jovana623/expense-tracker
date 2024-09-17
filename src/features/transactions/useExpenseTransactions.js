import { useQuery } from "@tanstack/react-query";
import { getExpenseTransactions } from "../../services/apiTransactions";

export function useExpenseTransactions(time, month, sortBy, page, pageSize) {
  const { data: expenseTransactions } = useQuery({
    queryFn: () => getExpenseTransactions(time, month, sortBy),
    queryKey: ["expense", time, month, sortBy],
  });
  const { data: paginatedTransactions } = useQuery({
    queryFn: () => getExpenseTransactions(time, month, sortBy, page, pageSize),
    queryKey: ["expense", time, month, sortBy, page, pageSize],
  });
  const totalExpense =
    expenseTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    ) || 0;

  return {
    expenseTransactions,
    paginatedTransactions,
    totalExpense,
    isLoading: !expenseTransactions || !paginatedTransactions,
  };
}

import { useQuery } from "@tanstack/react-query";
import { getExpenseTransactions } from "../../services/apiTransactions";

export function useExpenseTransactions(
  time,
  month,
  sortBy,
  page,
  pageSize,
  options = { fetchRegular: true, fetchPaginated: true }
) {
  const { data: expenseTransactions } = useQuery({
    queryFn: () => getExpenseTransactions(time, month, sortBy),
    queryKey: ["expense", time, month, sortBy],
    enabled: options.fetchRegular,
  });
  const { data: paginatedTransactions } = useQuery({
    queryFn: () => getExpenseTransactions(time, month, sortBy, page, pageSize),
    queryKey: ["expense", time, month, sortBy, page, pageSize],
    enabled: options.fetchPaginated,
  });

  const totalExpense =
    expenseTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    ) || 0;

  const isLoading =
    (options.fetchRegular && !expenseTransactions) ||
    (options.fetchPaginated && !paginatedTransactions);

  return {
    expenseTransactions,
    paginatedTransactions,
    totalExpense,
    isLoading,
  };
}

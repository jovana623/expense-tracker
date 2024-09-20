import { useQuery } from "@tanstack/react-query";
import { getIncomeTransactions } from "../../services/apiTransactions";

export function useIncomeTransactions(
  time,
  month,
  sortBy,
  page,
  pageSize,
  options = { fetchRegular: true, fetchPaginated: true }
) {
  const { data: incomeTransactions } = useQuery({
    queryFn: () => getIncomeTransactions(time, month, sortBy),
    queryKey: ["income", time, month, sortBy],
    onError: (error) => {
      console.error("React Query error:", error.message);
    },
    enabled: options.fetchRegular,
  });

  const { data: paginatedTransactions } = useQuery({
    queryFn: () => getIncomeTransactions(time, month, sortBy, page, pageSize),
    queryKey: ["income", time, month, sortBy, page, pageSize],
    onError: (error) => {
      console.error("React Query error:", error.message);
    },
    enabled: options.fetchPaginated,
  });
  const totalIncome =
    incomeTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    ) || 0;

  const isLoading =
    (options.fetchRegular && !incomeTransactions) ||
    (options.fetchPaginated && !paginatedTransactions);
  return {
    incomeTransactions,
    totalIncome,
    paginatedTransactions,
    isLoading,
  };
}

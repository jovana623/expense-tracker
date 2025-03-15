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
    enabled: options.fetchRegular,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("React Query error:", error.message);
    },
  });

  const { data: paginatedTransactions } = useQuery({
    queryFn: () => getIncomeTransactions(time, month, sortBy, page, pageSize),
    queryKey: ["income", time, month, sortBy, page, pageSize],
    enabled: options.fetchPaginated,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("React Query error:", error.message);
    },
  });

  const isLoading =
    (options.fetchRegular && !incomeTransactions) ||
    (options.fetchPaginated && !paginatedTransactions);
  return {
    incomeTransactions,
    paginatedTransactions,
    isLoading,
  };
}

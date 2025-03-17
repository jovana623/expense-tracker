import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions(
  time,
  month,
  sortBy,
  search,
  page,
  pageSize,
  type
) {
  const { data: transactions, isLoading } = useQuery({
    queryFn: () =>
      getTransactions(time, month, sortBy, search, page, pageSize, type),
    queryKey: [
      "transactions",
      time,
      month,
      sortBy,
      search,
      page,
      pageSize,
      type,
    ],
  });

  return { transactions, isLoading };
}

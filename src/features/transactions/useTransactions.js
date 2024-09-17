import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions(time, month, sortBy, search, page, pageSize) {
  const { data: transactions, isLoading } = useQuery({
    queryFn: () => getTransactions(time, month, sortBy, search, page, pageSize),
    queryKey: ["transactions", time, month, sortBy, search, page, pageSize],
  });

  return { transactions, isLoading };
}

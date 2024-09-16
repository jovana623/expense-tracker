import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions(time, month, sortBy) {
  const { data: transactions, isLoading } = useQuery({
    queryFn: () => getTransactions(time, month, sortBy),
    queryKey: ["transactions", time, month, sortBy],
  });

  return { transactions, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions(time, month, sortBy, search) {
  const { data: transactions, isLoading } = useQuery({
    queryFn: () => getTransactions(time, month, sortBy, search),
    queryKey: ["transactions", time, month, sortBy, search],
  });

  return { transactions, isLoading };
}

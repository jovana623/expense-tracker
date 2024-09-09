import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions(time, month) {
  const { data: transactions, isLoading } = useQuery({
    queryFn: () => getTransactions(time, month),
    queryKey: ["transactions", time, month],
  });

  return { transactions, isLoading };
}

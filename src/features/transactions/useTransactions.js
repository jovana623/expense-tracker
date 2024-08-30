import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions(time) {
  const { data: transactions, isLoading } = useQuery({
    queryFn: () => getTransactions(time),
    queryKey: ["transactions", time],
  });
  return { transactions, isLoading };
}

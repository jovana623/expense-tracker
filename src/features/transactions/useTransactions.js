import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions() {
  const { data: transactions, isLoading } = useQuery({
    queryFn: getTransactions,
    queryKey: ["transactions"],
  });
  return { transactions, isLoading };
}

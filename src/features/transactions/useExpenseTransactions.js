import { useQuery } from "@tanstack/react-query";
import { getExpenseTransactions } from "../../services/apiTransactions";

export function useExpenseTransactions() {
  const { data: expenseTransactions, isLoading } = useQuery({
    queryFn: getExpenseTransactions,
    queryKey: ["expense"],
  });
  return { expenseTransactions, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getExpenseTransactions } from "../../services/apiTransactions";

export function useExpenseTransactions(time) {
  const { data: expenseTransactions, isLoading } = useQuery({
    queryFn: () => getExpenseTransactions(time),
    queryKey: ["expense", time],
  });
  return { expenseTransactions, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getExpenseTransactions } from "../../services/apiTransactions";

export function useExpenseTransactions(time, month) {
  const { data: expenseTransactions, isLoading } = useQuery({
    queryFn: () => getExpenseTransactions(time, month),
    queryKey: ["expense", time, month],
  });
  return { expenseTransactions, isLoading };
}

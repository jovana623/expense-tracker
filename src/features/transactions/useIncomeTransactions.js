import { useQuery } from "@tanstack/react-query";
import { getIncomeTransactions } from "../../services/apiTransactions";

export function useIncomeTransactions(time, month, sortBy) {
  const { data: incomeTransactions, isLoading } = useQuery({
    queryFn: () => getIncomeTransactions(time, month, sortBy),
    queryKey: ["income", time, month, sortBy],
    onError: (error) => {
      console.error("React Query error:", error.message);
    },
  });
  const totalIncome =
    incomeTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    ) || 0;
  return { incomeTransactions, totalIncome, isLoading };
}

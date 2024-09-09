import { useQuery } from "@tanstack/react-query";
import { getIncomeTransactions } from "../../services/apiTransactions";

export function useIncomeTransactions(time, month) {
  const { data: incomeTransactions, isLoading } = useQuery({
    queryFn: () => getIncomeTransactions(time, month),
    queryKey: ["income", time, month],
  });
  const totalIncome =
    incomeTransactions?.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    ) || 0;
  return { incomeTransactions, totalIncome, isLoading };
}

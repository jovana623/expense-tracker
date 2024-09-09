import { useQuery } from "@tanstack/react-query";
import { getIncomeTransactions } from "../../services/apiTransactions";

export function useIncomeTransactions(time, month) {
  const { data: incomeTransactions, isLoading } = useQuery({
    queryFn: () => getIncomeTransactions(time, month),
    queryKey: ["income", time, month],
  });
  return { incomeTransactions, isLoading };
}

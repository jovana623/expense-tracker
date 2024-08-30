import { useQuery } from "@tanstack/react-query";
import { getIncomeTransactions } from "../../services/apiTransactions";

export function useIncomeTransactions(time) {
  const { data: incomeTransactions, isLoading } = useQuery({
    queryFn: () => getIncomeTransactions(time),
    queryKey: ["income", time],
  });
  return { incomeTransactions, isLoading };
}

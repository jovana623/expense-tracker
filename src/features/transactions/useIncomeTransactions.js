import { useQuery } from "@tanstack/react-query";
import { getIncomeTransactions } from "../../services/apiTransactions";

export function useIncomeTransactions() {
  const { data: incomeTransactions, isLoading } = useQuery({
    queryFn: getIncomeTransactions,
    queryKey: ["income"],
  });
  return { incomeTransactions, isLoading };
}

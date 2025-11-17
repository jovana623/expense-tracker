import { useQuery } from "@tanstack/react-query";
import { getMonthlyBalance } from "../../services/apiTransactions";

export function useMonthlyBalance(time, month) {
  const { data: monthlyBalance, isLoading } = useQuery({
    queryFn: () => getMonthlyBalance(time, month),
    queryKey: ["monthly-balance", time],
  });

  return { monthlyBalance, isLoading };
}

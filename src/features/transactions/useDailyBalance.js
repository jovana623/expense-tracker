import { useQuery } from "@tanstack/react-query";
import { getDailyBalance } from "../../services/apiTransactions";

export function useDailyBalance(month) {
  const { data: dailyBalance, isLoading } = useQuery({
    queryFn: () => getDailyBalance(month),
    queryKey: ["daily-balace", month],
  });
  return { dailyBalance, isLoading };
}

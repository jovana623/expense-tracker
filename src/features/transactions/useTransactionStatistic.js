import { useQuery } from "@tanstack/react-query";
import { getTransactionStatistic } from "../../services/apiTransactions";

export function useTransactionStatistic(time, month) {
  const { data: statistic, isLoading } = useQuery({
    queryFn: () => getTransactionStatistic(time, month),
    queryKey: ["statistic", time, month],
  });
  return { statistic, isLoading };
}

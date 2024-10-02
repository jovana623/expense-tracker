import { useQuery } from "@tanstack/react-query";
import { getTransactionStatistic } from "../../services/apiTransactions";

export function useTransactionStatistic(time) {
  const { data: statistic, isLoading } = useQuery({
    queryFn: () => getTransactionStatistic(time),
    queryKey: ["statistic", time],
  });
  return { statistic, isLoading };
}

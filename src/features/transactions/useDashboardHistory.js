import { useQuery } from "@tanstack/react-query";
import { getDashboardHistory } from "../../services/apiTransactions";

export function useDashboardHistory() {
  const { data, isLoading } = useQuery({
    queryFn: getDashboardHistory,
    queryKey: ["dashboard_history"],
  });

  const monthlyData = data?.monthly_data;
  const yearlyData = data?.yearly_data;

  return {
    monthlyData,
    yearlyData,
    isLoading,
  };
}

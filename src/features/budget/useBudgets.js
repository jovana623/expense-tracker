import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudget";

export function useBudgets() {
  const { data: budgets, isLoading } = useQuery({
    queryFn: getBudgets,
    queryKey: ["budgets"],
  });
  return { budgets, isLoading };
}

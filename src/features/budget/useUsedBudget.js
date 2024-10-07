import { useQuery } from "@tanstack/react-query";
import { getUsedBudget } from "../../services/apiBudget";

export function useUsedBudget() {
  const { data: usedBudget, isLoading } = useQuery({
    queryFn: getUsedBudget,
    queryKey: ["used_budget"],
  });
  return { usedBudget, isLoading };
}

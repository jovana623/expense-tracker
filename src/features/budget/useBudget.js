import { useQuery } from "@tanstack/react-query";
import { getBudget } from "../../services/apiBudget";

export function useBudget() {
  const { data: budget, isLoading } = useQuery({
    queryFn: getBudget,
    queryKey: ["budget"],
  });

  return { budget, isLoading };
}

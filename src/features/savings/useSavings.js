import { useQuery } from "@tanstack/react-query";
import { getSavings } from "../../services/apiSavings";

export function useSavings() {
  const { data: savings, isLoading } = useQuery({
    queryFn: getSavings,
    queryKey: ["savings"],
  });

  return { savings, isLoading };
}

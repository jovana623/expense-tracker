import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavings } from "../../services/apiSavings";

export function useSavings() {
  const queryClient = useQueryClient();
  const { data: savings, isLoading } = useQuery({
    queryFn: () => getSavings(),
    queryKey: ["savings"],
    staleTime: 30 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return {
    savings,
    isLoading,
    refetch: () => queryClient.invalidateQueries(["savings"]),
  };
}

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./auth";

export function useCurrentUser() {
  const { data, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["current-user"],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading };
}

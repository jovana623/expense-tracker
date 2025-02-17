import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./auth";

export function useCurrentUser() {
  const { data, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["current-user"],
  });
  return { data, isLoading };
}

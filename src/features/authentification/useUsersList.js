import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./auth";

export function useUsersList(search) {
  const { data: users, isLoading } = useQuery({
    queryFn: () => getUsers(search),
    queryKey: ["users", search],
  });
  return { users, isLoading };
}

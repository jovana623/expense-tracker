import { useQuery } from "@tanstack/react-query";
import { getMyThreads } from "../../services/apiSupport";

export function useMyThreads() {
  const {
    data: myThreads,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getMyThreads,
    queryKey: ["my-threads"],
  });
  return { myThreads, isLoading, refetch };
}

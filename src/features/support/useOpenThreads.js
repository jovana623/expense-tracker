import { useQuery } from "@tanstack/react-query";
import { getOpenThreads } from "../../services/apiSupport";

export function useOpenThreads() {
  const {
    data: openThreads,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getOpenThreads,
    queryKey: ["open-threads"],
    enabled: false,
  });
  return { openThreads, isLoading, refetch };
}

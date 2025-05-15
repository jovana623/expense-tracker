import { useQuery } from "@tanstack/react-query";
import { getThread } from "../../services/apiSupport";

export function useThread(threadId) {
  const { data: thread, isLoading } = useQuery({
    queryFn: () => getThread(threadId),
    queryKey: ["thread", threadId],
    enabled: !!threadId,
  });
  return { thread, isLoading };
}

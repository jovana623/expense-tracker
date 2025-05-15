import { useQuery } from "@tanstack/react-query";
import { getThreadMessages } from "../../services/apiSupport";

export function useThreadMessages(threadId) {
  const { data: threadMessages, isLoading } = useQuery({
    queryFn: () => getThreadMessages(threadId),
    queryKey: ["thread-messages", threadId],
    enabled: !!threadId,
  });
  return { threadMessages, isLoading };
}

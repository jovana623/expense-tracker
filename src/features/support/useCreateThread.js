import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread as createThreadApi } from "../../services/apiSupport";

export function useCreateThread() {
  const queryClient = useQueryClient();
  const { mutate: createThread, isLoading } = useMutation({
    mutationFn: createThreadApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["my-threads"]);
    },
  });
  return { createThread, isLoading };
}

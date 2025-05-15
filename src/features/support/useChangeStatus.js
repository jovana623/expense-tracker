import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus as changeStatusApi } from "../../services/apiSupport";

export function useChangeStatus() {
  const queryClient = useQueryClient();
  const { mutate: changeStatus } = useMutation({
    mutationFn: ({ id, status }) => changeStatusApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["open-threads"]);
      queryClient.invalidateQueries(["my-threads"]);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  return { changeStatus };
}

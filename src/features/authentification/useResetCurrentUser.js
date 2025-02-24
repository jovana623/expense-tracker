import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetCurrentUser as resetCurrentUserApi } from "./auth";
import toast from "react-hot-toast";

export function useResetCurrentUser() {
  const queryClient = useQueryClient();
  const { mutate: resetCurrentUser, isLoading } = useMutation({
    mutationFn: resetCurrentUserApi,
    onSuccess: () => {
      toast.success("Account reseted");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { resetCurrentUser, isLoading };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCurrentUser as deleteCurrentUserApi } from "./auth";
import toast from "react-hot-toast";

export function useDeleteCurrentUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteCurrentUser, isLoading } = useMutation({
    mutationFn: deleteCurrentUserApi,
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      localStorage.removeItem("accessToken");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteCurrentUser, isLoading };
}

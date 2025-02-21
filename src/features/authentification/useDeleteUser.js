import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "./auth";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteUser, isLoading };
}

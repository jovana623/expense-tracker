import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "./auth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = new QueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ id, username, email, avatar, is_staff }) =>
      updateUserApi(id, username, email, avatar, is_staff),
    onSuccess: () => {
      toast.success("Transaction updated");
      queryClient.invalidateQueries(["transactions"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isLoading };
}

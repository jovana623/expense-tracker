import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "./auth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: (userData) => updateUserApi(userData),
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isLoading };
}

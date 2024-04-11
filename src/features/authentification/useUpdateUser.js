import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updatedUser, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      toast.success("User successfully updated");
      queryClient.setQueryData(["user"], user);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updatedUser, isLoading };
}

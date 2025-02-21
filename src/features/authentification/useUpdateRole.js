import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole as updateRoleApi } from "./auth";
import toast from "react-hot-toast";

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const { mutate: updateRole, isLoading } = useMutation({
    mutationFn: ({ id, is_staff }) => updateRoleApi(id, is_staff),
    onSuccess: () => {
      toast.success("Role updated");
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      console.error("Error Response:", error.response?.data);
      toast.error(error.message);
    },
  });
  return { updateRole, isLoading };
}

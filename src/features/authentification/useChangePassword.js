import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword as changePasswordApi } from "./auth";
import toast from "react-hot-toast";

export function useChangePassword() {
  const queryClient = useQueryClient();
  const { mutate: changePassword, isLoading } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success("Password updated");
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      console.error("Error Response:", error.response?.data);
      const errors = error.response?.data;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key]);
        });
      } else {
        toast.error("Old password wrong or passwords do not match");
      }
    },
  });
  return { changePassword, isLoading };
}

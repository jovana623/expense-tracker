import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSavingStatus } from "../../services/apiSavings";
import toast from "react-hot-toast";

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: savingStatus, isLoading } = useMutation({
    mutationFn: ({ id, status }) => updateSavingStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries("saving");
    },
    onError: (error) => {
      console.error("Error Response:", error.response?.data);
      toast.error(error.message);
    },
  });
  return { savingStatus, isLoading };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSaving as updateSavingApi } from "../../services/apiSavings";
import toast from "react-hot-toast";

export function useUpdateSaving() {
  const queryClient = useQueryClient();
  const { mutate: updateSaving, isLoading } = useMutation({
    mutationFn: ({ id, name, goal, target_date, description, color }) =>
      updateSavingApi(id, name, goal, target_date, description, color),
    onSuccess: () => {
      toast.success("Saving updated");
      queryClient.invalidateQueries("savings");
    },
    onError: (error) => {
      console.error("Error Response:", error.response?.data);
      toast.error(error.message);
    },
  });

  return { updateSaving, isLoading };
}

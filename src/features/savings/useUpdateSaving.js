import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSaving as updateSavingApi } from "../../services/apiSavings";
import toast from "react-hot-toast";

export function useUpdateSaving() {
  const queryClient = useQueryClient();
  const { mutate: updateSaving, isLoading } = useMutation({
    mutationFn: ({
      newName,
      newGoal,
      newAmount,
      newStatus,
      newDate,
      newDescription,
    }) =>
      updateSavingApi(
        newName,
        newGoal,
        newAmount,
        newStatus,
        newDate,
        newDescription
      ),
    onSuccess: () => {
      toast.success("Saving updated");
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
    onErorr: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSaving, isLoading };
}

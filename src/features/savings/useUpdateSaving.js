import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSaving as updateSavingApi } from "../../services/apiSavings";
import toast from "react-hot-toast";

export function useUpdateSaving() {
  const queryClient = useQueryClient();
  const { mutate: updateSaving, isLoading } = useMutation({
    mutationFn: ({
      id,
      name,
      amount,
      goal,
      target_date,
      description,
      userId,
    }) =>
      updateSavingApi(id, name, amount, goal, target_date, description, userId),
    onSuccess: () => {
      toast.success("Saving updated");
      queryClient.invalidateQueries("savings");
    },
    onErorr: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSaving, isLoading };
}

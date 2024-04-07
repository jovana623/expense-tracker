import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSaving as updateSavingApi } from "../../services/apiSavings";

export function useUpdateSaving() {
  const queryClient = useQueryClient();
  const { mutate: updateSaving, isLoading } = useMutation({
    mutationFn: ({ newAmount, id, newStatus }) =>
      updateSavingApi(newAmount, id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  return { updateSaving, isLoading };
}

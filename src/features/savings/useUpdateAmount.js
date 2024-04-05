import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSavingAmount as updateSavingAmountApi } from "../../services/apiSavings";

export function updateAmount() {
  const queryClient = useQueryClient();
  const { mutate: updateSavingAmount, isLoading } = useMutation({
    mutationFn: ({ newAmount, id }) => updateSavingAmountApi(newAmount, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  return { updateSavingAmount, isLoading };
}

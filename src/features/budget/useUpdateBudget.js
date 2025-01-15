import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBudget as updateBudgetAPI } from "../../services/apiBudget";
import toast from "react-hot-toast";

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  const { mutate: updateBudget, isLoading } = useMutation({
    mutationFn: ({ id, amount, period }) => updateBudgetAPI(id, amount, period),
    onSuccess: () => {
      toast.success("Budget updated");
      queryClient.invalidateQueries(["budgets"]);
    },
  });
  return { updateBudget, isLoading };
}

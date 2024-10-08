import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget as deleteBudgetAPI } from "../../services/apiBudget";
import toast from "react-hot-toast";

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  const { mutate: deleteBudget, isLoading } = useMutation({
    mutationFn: deleteBudgetAPI,
    onSuccess: () => {
      toast.success("Budget deleted");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
  return { deleteBudget, isLoading };
}

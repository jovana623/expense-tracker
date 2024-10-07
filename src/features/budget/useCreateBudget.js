import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBudget as createBudgetAPI } from "../../services/apiBudget";

export function useCreateBudget() {
  const queryClient = useQueryClient();
  const { mutate: createBudget, isLoading } = useMutation({
    mutationFn: createBudgetAPI,
    onSuccess: () => {
      toast.success("Budget created");
      queryClient.invalidateQueries(["budgets"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBudget, isLoading };
}

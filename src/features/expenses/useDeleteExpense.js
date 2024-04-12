import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense as deleteExpenseApi } from "../../services/apiExpenses";
import toast from "react-hot-toast";

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const { mutate: deleteExpense, isLoading } = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      toast.success("Expense deleted");
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteExpense, isLoading };
}

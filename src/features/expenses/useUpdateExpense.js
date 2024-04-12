import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateExpense as updateExpenseApi } from "../../services/apiExpenses";

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  const { mutate: updateExpense, isLoading } = useMutation({
    mutationFn: ({ id, name, date, typeId, amount, description, userId }) =>
      updateExpenseApi({ id, name, date, typeId, amount, description, userId }),
    onSuccess: () => {
      toast.success("Expense updated");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateExpense, isLoading };
}

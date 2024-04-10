import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../../services/apiTransactions";
import toast from "react-hot-toast";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  const { mutate: updatedTransaction, isLoading } = useMutation({
    mutationFn: ({ newTransaction, id, UserId }) =>
      updateTransaction(newTransaction, id, UserId),
    onSuccess: () => {
      toast.success("Transaction updated");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Could not update transaction");
    },
  });
  return { updatedTransaction, isLoading };
}

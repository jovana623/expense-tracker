import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTransaction as deleteTransactionAPI } from "../../services/apiTransactions";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { mutate: deleteTransaction, isLoading } = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      toast.success("Transaction deleted");
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteTransaction, isLoading };
}

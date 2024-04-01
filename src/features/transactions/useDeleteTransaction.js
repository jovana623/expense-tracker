import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction as deleteTransactionApi } from "../../services/apiTransactions";
import toast from "react-hot-toast";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { mutate: deleteTransaction, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: () => {
      toast.success("Transaction successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteTransaction, isDeleting };
}

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "react-query";
import { updateTransaction as updateTransactionAPI } from "../../services/apiTransactions";
import toast from "react-hot-toast";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  const { mutate: updateTransaction, isLoading } = useMutation({
    mutationFn: updateTransactionAPI,
    onSuccess: () => {
      toast.success("Transaction updated");
      queryClient.invalidateQueries(["transactions"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateTransaction, isLoading };
}

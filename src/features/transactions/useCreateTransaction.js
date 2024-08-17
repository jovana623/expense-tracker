import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction as createTransactionAPI } from "../../services/apiTransactions";
import toast from "react-hot-toast";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const { mutate: createTransaction, isLoading } = useMutation({
    mutationFn: createTransactionAPI,
    onSuccess: () => {
      toast.success("Transaction created");
      queryClient.invalidateQueries(["transactions"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createTransaction, isLoading };
}

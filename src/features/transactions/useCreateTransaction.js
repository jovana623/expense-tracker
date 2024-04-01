import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewTransaction } from "../../services/apiTransactions";

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const { mutate: createTransaction, isLoading: isCreating } = useMutation({
    mutationFn: createNewTransaction,
    onSuccess: () => {
      toast.success("New transaction created");
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createTransaction };
}

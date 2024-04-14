import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPayment } from "../../services/apiPayments";
import toast from "react-hot-toast";

export function useCreateSavingPayment() {
  const queryClient = useQueryClient();
  const { mutate: createPayment, isLoading } = useMutation({
    mutationFn: createNewPayment,
    onSuccess: () => {
      toast.success("New payment added");
      queryClient.invalidateQueries("payments");
      queryClient.invalidateQueries("savings");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createPayment, isLoading };
}

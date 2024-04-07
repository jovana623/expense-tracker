import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewPayment } from "../../services/apiPayments";

export function useCreateSavingPayment() {
  const queryClient = useQueryClient();
  const { mutate: createPayment, isLoading } = useMutation({
    mutationFn: createNewPayment,
    onSuccess: () => {
      toast.success("Payment created");
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createPayment, isLoading };
}

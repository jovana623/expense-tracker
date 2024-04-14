import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePayment as deletePaymentApi } from "../../services/apiPayments";
import toast from "react-hot-toast";

export function useDeletePayment() {
  const queryClient = useQueryClient();
  const { mutate: deletePayment, isLoading: isDeletingPayment } = useMutation({
    mutationFn: deletePaymentApi,
    onSuccess: () => {
      toast.success("Payment successfully deleted");
      queryClient.invalidateQueries("payments");
      queryClient.invalidateQueries("savings");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deletePayment, isDeletingPayment };
}

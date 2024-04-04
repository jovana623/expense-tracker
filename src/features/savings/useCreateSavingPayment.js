import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewSavingPayment } from "../../services/apiSavings";
import toast from "react-hot-toast";

export function useCreateSavingPayment() {
  const queryClient = useQueryClient();
  const { mutate: createPayment, isLoading } = useMutation({
    mutationFn: createNewSavingPayment,
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

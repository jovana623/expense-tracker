import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserCurrency as updateUserCurrencyApi } from "./auth";
import toast from "react-hot-toast";

export function useUpdateUserCurrency() {
  const queryClient = useQueryClient();
  const { mutate: updateUserCurrency, isLoading } = useMutation({
    mutationFn: updateUserCurrencyApi,
    onSuccess: () => {
      toast.success("Currency updated");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUserCurrency, isLoading };
}

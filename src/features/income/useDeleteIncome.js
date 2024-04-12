import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIncome as deleteIncomeApi } from "../../services/apiIncome";
import toast from "react-hot-toast";

export function useDeleteIncome() {
  const queryClient = useQueryClient();
  const { mutate: deleteIncome, isLoading } = useMutation({
    mutationFn: deleteIncomeApi,
    onSuccess: () => {
      toast.success("Income deleted");
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteIncome, isLoading };
}

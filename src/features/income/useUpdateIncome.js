import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncome as updateIncomeApi } from "../../services/apiIncome";
import toast from "react-hot-toast";

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  const { mutate: updateIncome, isLoading } = useMutation({
    mutationFn: ({ id, name, date, typeId, amount, description, userId }) =>
      updateIncomeApi({ id, name, date, typeId, amount, description, userId }),
    onSuccess: () => {
      toast.success("Income updated");
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateIncome, isLoading };
}

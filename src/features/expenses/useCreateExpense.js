import { createNewExpense } from "../../services/apiExpenses";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useCreateExpense() {
  const queryClient = useQueryClient();

  const { mutate: createExpense, isLoading } = useMutation({
    mutationFn: createNewExpense,
    onSuccess: () => {
      toast.success("New expense transaction successfully created");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createExpense, isLoading };
}

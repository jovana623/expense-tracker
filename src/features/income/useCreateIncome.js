import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewIncome } from "../../services/apiIncome";

export function useCreateIncome() {
  const queryClient = useQueryClient();
  const { mutate: createIncome, isLoading } = useMutation({
    mutationFn: createNewIncome,
    onSuccess: () => {
      toast.success("New income transaction successfully created");
      queryClient.invalidateQueries({
        queryKey: ["income"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
    },
  });

  return { createIncome, isLoading };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSaving as createSavingAPI } from "../../services/apiSavings";
import toast from "react-hot-toast";

export function useCreateSaving() {
  const queryClient = useQueryClient();
  const { mutate: createSaving, isLoading } = useMutation({
    mutationFn: createSavingAPI,
    onSuccess: () => {
      toast.success("New saving goal added");
      queryClient.invalidateQueries({
        queryKey: ["savings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createSaving, isLoading };
}

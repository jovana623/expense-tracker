import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSaving } from "../../services/apiSavings";
import toast from "react-hot-toast";

export default function useDeleteSaving() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteSaving,
    onSuccess: () => {
      toast.success("Saving successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading };
}

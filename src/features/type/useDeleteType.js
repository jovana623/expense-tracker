import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteType as deleteTypeApi } from "../../services/apiType";
import toast from "react-hot-toast";

export function useDeleteType() {
  const queryClient = useQueryClient();
  const { mutate: deleteType, isLoading } = useMutation({
    mutationFn: deleteTypeApi,
    onSuccess: () => {
      toast.success("Type deleted");
      queryClient.invalidateQueries({
        queryKey: ["types"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteType, isLoading };
}

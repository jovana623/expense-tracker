import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateType as updateTypeApi } from "../../services/apiType";

export function useUpdateType() {
  const queryClient = useQueryClient();
  const { mutate: updateType, isLoading } = useMutation({
    mutationFn: ({ id, name, category, color }) =>
      updateTypeApi(id, name, category, color),
    onSuccess: () => {
      toast.success("Type updated");
      queryClient.invalidateQueries(["types"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateType, isLoading };
}

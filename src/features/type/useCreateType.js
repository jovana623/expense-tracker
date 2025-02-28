import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createType as createTypeApi } from "../../services/apiType";
import toast from "react-hot-toast";

export function useCreateType() {
  const queryClient = useQueryClient();
  const { mutate: createType, isLoading } = useMutation({
    mutationFn: createTypeApi,
    onSuccess: () => {
      toast.success("Type created");
      queryClient.invalidateQueries(["types"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createType, isLoading };
}

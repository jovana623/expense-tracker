import { useQuery } from "@tanstack/react-query";
import { getTypes } from "../../services/apiType";

export function useTypes() {
  const { data: types, isLoading } = useQuery({
    queryFn: getTypes,
    queryKey: ["types"],
  });
  return { types, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getType } from "../../services/apiType";

export function useType() {
  const { data: types, isLoading } = useQuery({
    queryKey: ["types"],
    queryFn: getType,
  });

  return { types, isLoading };
}

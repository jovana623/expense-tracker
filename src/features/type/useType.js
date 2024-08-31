import { useQuery } from "@tanstack/react-query";
import { getType } from "../../services/apiType";

export function useType(typeId) {
  const { data: type, isLoading } = useQuery({
    queryKey: ["type"],
    queryFn: () => getType(typeId),
  });

  return { type, isLoading };
}

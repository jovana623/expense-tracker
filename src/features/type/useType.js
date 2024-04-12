import { useQuery } from "@tanstack/react-query";
import { getType } from "../../services/apiType";

export function useType() {
  const { data: type, isLoading } = useQuery({
    queryKey: ["type"],
    queryFn: getType,
  });

  return { type, isLoading };
}

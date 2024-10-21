import { useQuery } from "@tanstack/react-query";
import { getTypeByMonth } from "../../services/apiTransactions";

export function useTypeByMonth(type) {
  const { data, isLoading } = useQuery({
    queryFn: () => getTypeByMonth(type),
    queryKey: ["type_month", type],
  });
  return { data, isLoading };
}

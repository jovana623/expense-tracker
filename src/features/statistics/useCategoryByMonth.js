import { useQuery } from "@tanstack/react-query";
import { getCategoriesByMonth } from "../../services/apiTransactions";

export function useCategoryByMonth(type) {
  const { data, isLoading } = useQuery({
    queryFn: () => getCategoriesByMonth(type),
    queryKey: ["category_month", type],
  });
  return { data, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getTransactionsByCategory } from "../../services/apiTransactions";

export function useCategoryOfTransactions(categoryName) {
  const { isLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactionsByCategory(categoryName),
  });

  return { isLoading, transactions };
}

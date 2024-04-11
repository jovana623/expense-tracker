import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../services/apiExpenses";
import { useSearchParams } from "react-router-dom";

export function useExpensesTransactions() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("time");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "time", value: filterValue };

  const { data: expensesTransactions, isLoading } = useQuery({
    queryKey: ["expenses", filter],
    queryFn: () => getExpenses({ filter }),
  });

  return { expensesTransactions, isLoading };
}

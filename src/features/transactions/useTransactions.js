import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useSearchParams } from "react-router-dom";

export function useTransactions(categoryName = null, userId) {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("time");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "time", value: filterValue };

  const { isLoading, data: transactions } = useQuery({
    queryKey: ["transactions", filter],
    queryFn: () => getTransactions({ categoryName, filter, userId }),
  });

  return { isLoading, transactions };
}

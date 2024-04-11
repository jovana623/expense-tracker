import { useQuery } from "@tanstack/react-query";
import { getIncome } from "../../services/apiIncome";
import { useSearchParams } from "react-router-dom";

export function useIncomeTransactions() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("time");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "time", value: filterValue };

  const { data: incomeTransactions, isLoading } = useQuery({
    queryKey: ["income", filter],
    queryFn: () => getIncome({ filter }),
  });

  return { incomeTransactions, isLoading };
}

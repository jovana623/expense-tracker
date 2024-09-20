import { useQuery } from "@tanstack/react-query";
import { getIncomeSummary } from "../../services/apiTransactions";

export function useIncomeSummary() {
  const { data, isLoading } = useQuery({
    queryFn: getIncomeSummary,
    queryKey: ["income_summary"],
  });
  const monthlyIncome = data?.monthly_income || [];
  const yearlyIncome = data?.yearly_income || [];

  return { monthlyIncome, yearlyIncome, isLoading };
}

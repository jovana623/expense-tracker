import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/apiSavings";

export function usePayments() {
  const { data: payments, isLoading } = useQuery({
    queryFn: getPayments,
    queryKey: ["payments"],
  });

  return { payments, isLoading };
}

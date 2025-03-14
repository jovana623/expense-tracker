import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/apiPayments";

export function usePayments(saving) {
  const { data: payments, isLoading } = useQuery({
    queryFn: () => getPayments(saving),
    queryKey: ["payments", saving],
  });

  return { payments, isLoading };
}

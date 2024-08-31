import { useQuery } from "@tanstack/react-query";
import { getSaving } from "../../services/apiSavings";

/* eslint-disable react/prop-types */
export function useSaving(savingId) {
  const { data: saving, isLoading } = useQuery({
    queryFn: () => getSaving(savingId),
    queryKey: ["saving", savingId],
  });

  return { saving, isLoading };
}

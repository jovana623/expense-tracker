import { useQuery } from "@tanstack/react-query";
import { getSaving } from "../../services/apiSavings";

/* eslint-disable react/prop-types */
export function useSaving(savingId) {
  const { data: saving, isLoading } = useQuery({
    queryFn: getSaving,
    queryKey: ["saving", savingId],
  });

  return { saving, isLoading };
}

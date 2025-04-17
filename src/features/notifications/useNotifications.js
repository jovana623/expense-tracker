import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotifications";

export function useNotifications() {
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getNotifications,
    queryKey: ["notifications"],
  });
  return { notifications, isLoading, refetch };
}

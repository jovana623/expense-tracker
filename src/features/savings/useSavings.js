import { useQuery } from "@tanstack/react-query";
import { getSavings } from "../../services/apiSavings";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";

export function useSavings() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await getCurrentUser();
        setUserId(userData.user.id);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserId();
  }, []);
  const { data: savings, isLoading } = useQuery({
    queryFn: () => getSavings({ userId }),
    queryKey: ["savings", userId],
  });

  return { savings, isLoading };
}

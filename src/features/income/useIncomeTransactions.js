import { useQuery } from "@tanstack/react-query";
import { getIncome } from "../../services/apiIncome";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";

export function useIncomeTransactions() {
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await getCurrentUser();
        setUserId(userData.user.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId();
  }, []);

  const filterValue = searchParams.get("time");
  const monthValue = searchParams.get("month");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "time", value: filterValue };

  const monthFilter = !monthValue
    ? null
    : { field: "month", value: monthValue };

  const { data: incomeTransactions, isLoading } = useQuery({
    queryKey: ["income", filter, userId, monthFilter],
    queryFn: () => getIncome({ filter, userId, monthFilter }),
  });

  return { incomeTransactions, isLoading };
}

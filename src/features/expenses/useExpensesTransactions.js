import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../services/apiExpenses";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";
import { getCurrentMonthAndYear } from "../../helpers/dateFunctions";

export function useExpensesTransactions() {
  const [searchParams] = useSearchParams();
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

  const filterValue = searchParams.get("time");
  const monthValue = searchParams.get("month");

  const currentMonthAndYear = getCurrentMonthAndYear();

  const monthFilter = !monthValue
    ? null
    : { field: "month", value: monthValue };

  const filter =
    !filterValue || filterValue === "all"
      ? { field: "month", value: currentMonthAndYear }
      : { field: "time", value: filterValue };

  const { data: expensesTransactions, isLoading } = useQuery({
    queryKey: ["expenses", filter, userId, monthFilter],
    queryFn: () => getExpenses({ filter, userId, monthFilter }),
  });

  return { expensesTransactions, isLoading };
}

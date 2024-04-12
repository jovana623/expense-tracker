import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";

export function useTransactions() {
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState("");

  const currentPath = window.location.pathname;
  const path = currentPath.split("/");
  const categoryName =
    path[path.length - 1].charAt(0).toUpperCase() +
    path[path.length - 1].slice(1);

  console.log(categoryName);

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

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "time", value: filterValue };

  const { isLoading, data: transactions } = useQuery({
    queryKey: ["transactions", filter, categoryName],
    queryFn: () => getTransactions({ filter, userId, categoryName }),
  });

  return { transactions, isLoading };
}

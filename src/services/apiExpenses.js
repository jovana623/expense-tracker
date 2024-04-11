import {
  getTransactionsThisMonth,
  getTransactionsThisYear,
} from "../helpers/filterTransactions";
import supabase from "./supabase";

export async function getExpenses({ filter }) {
  let query = supabase.from("Expenses").select("*,Type(*)");

  const { data, error } = await query;

  let filteredData = data;
  if (filter && filter.value === "month") {
    filteredData = getTransactionsThisMonth(data);
  } else if (filter && filter.value === "year") {
    filteredData = getTransactionsThisYear(data);
  }

  if (error) throw new Error(error.message);

  return filteredData;
}

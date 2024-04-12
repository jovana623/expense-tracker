import {
  getTransactionsThisMonth,
  getTransactionsThisYear,
} from "../helpers/filterTransactions";
import supabase from "./supabase";

export async function getTransactions({ filter, userId, categoryName }) {
  let query = supabase
    .from("Transactions")
    .select("*,Categories!inner(*), Type(*)")
    .eq("userId", userId)
    .eq("Categories.name", categoryName);

  const { data, error } = await query;

  //Filter by time
  let filteredData = data;
  if (filter && filter.value === "month") {
    filteredData = getTransactionsThisMonth(data);
  } else if (filter && filter.value === "year") {
    filteredData = getTransactionsThisYear(data);
  }

  if (error) {
    console.log(error);
    throw new Error("Transactions could not be loaded");
  }

  return filteredData;
}

export async function createNewTransaction({ newTransaction, UserId }) {
  const { data, error } = await supabase
    .from("Transactions")
    .insert([{ ...newTransaction, UserId }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("New transaction could not be created");
  }

  return data;
}

export async function updateTransaction(newTransaction, id, UserId) {
  let query = supabase.from("Transactions");

  if (id)
    query = query.update({ ...newTransaction, UserId: UserId }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Error while updating transaction");
  }

  return data;
}

export async function deleteTransaction(id) {
  const { data, error } = await supabase
    .from("Transactions")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Error deleting transaction:", error);
    throw new Error("Could not delete transaction");
  }

  return data;
}

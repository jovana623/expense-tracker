import {
  getTransactionsThisMonth,
  getTransactionsThisYear,
} from "../helpers/filterTransactions";
import { getTransactionsByMonth } from "../helpers/statistics";
import supabase from "./supabase";

export async function getExpenses({ filter, userId, monthFilter }) {
  let query = supabase
    .from("Expenses")
    .select("*,Type(*)")
    .eq("userId", userId);

  const { data, error } = await query;

  let filteredData = data;
  if (filter && filter.value === "month") {
    filteredData = getTransactionsThisMonth(data);
  } else if (filter && filter.value === "year") {
    filteredData = getTransactionsThisYear(data);
  }

  if (monthFilter && monthFilter.field === "month") {
    filteredData = getTransactionsByMonth(data, monthFilter.value);
  }

  if (error) throw new Error(error.message);

  return filteredData;
}

export async function createNewExpense({
  name,
  date,
  typeId,
  amount,
  description,
  userId,
}) {
  const { data, error } = await supabase
    .from("Expenses")
    .insert([
      {
        name: name,
        typeId: typeId,
        amount: amount,
        description: description,
        userId: userId,
        date: date,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateExpense({
  id,
  name,
  date,
  typeId,
  amount,
  description,
  userId,
}) {
  const { data, error } = await supabase
    .from("Expenses")
    .update({
      name: name,
      typeId: typeId,
      amount: amount,
      description: description,
      userId: userId,
      date: date,
    })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteExpense(id) {
  const { data, error } = await supabase.from("Expenses").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}

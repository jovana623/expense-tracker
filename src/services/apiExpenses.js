import supabase from "./supabase";

export async function getExpenses() {
  const { data, error } = await supabase.from("Expenses").select("*,TypeId(*)");

  if (error) throw new Error(error.message);

  return data;
}

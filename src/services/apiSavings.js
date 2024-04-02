import supabase from "./supabase";

export async function getSavings() {
  const { data, error } = await supabase.from("Savings").select("*");

  if (error) {
    throw new Error("Savings could not be loaded");
  }

  return data;
}

export async function getSaving(id) {
  const { data, error } = await supabase
    .from("Savings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Savings could not be loaded");
  }

  return data;
}

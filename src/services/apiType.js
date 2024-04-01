import supabase from "./supabase";

export async function getType() {
  let { data, error } = await supabase.from("Type").select("*");

  if (error) {
    throw new Error("Categories could not be loaded");
  }

  return data;
}

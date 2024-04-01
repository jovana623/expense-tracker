import supabase from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("Categories").select("*");

  if (error) {
    console.log(error);
    throw new Error("Categories could not be loaded");
  }

  return data;
}

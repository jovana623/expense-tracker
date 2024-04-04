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
    .select("*,SavingPayment(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Savings could not be loaded");
  }

  return data;
}

export async function getPayments() {
  const { data, error } = await supabase.from("SavingPayment").select("*");

  if (error) {
    throw new Error("Payments could not be loaded");
  }

  return data;
}

export async function createNewSavingPayment(amount, date, savingId) {
  const { data, error } = await supabase
    .from("SavingPayment")
    .insert([{ Amount: amount, Date: date, SavingId: savingId }])
    .select();

  if (error) {
    throw new Error("Savings could not be added");
  }

  return data;
}

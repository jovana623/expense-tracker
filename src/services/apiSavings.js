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

export async function createNewSaving(newSaving) {
  const { data, error } = await supabase
    .from("Savings")
    .insert([newSaving])
    .select();

  console.log(newSaving);

  if (error) {
    throw new Error("Savings could not be added");
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

export async function createNewSavingPayment(newPayment) {
  const { data, error } = await supabase
    .from("SavingPayment")
    .insert([newPayment])
    .select();

  if (error) {
    throw new Error("Payment could not be added");
  }

  return data;
}

export async function updateSavingAmount(newAmount, id) {
  const { data, error } = await supabase
    .from("Savings")
    .update({ Amount: supabase.sql`Amount + ${newAmount}` })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Saving amount could not be updated");
  }

  return data;
}

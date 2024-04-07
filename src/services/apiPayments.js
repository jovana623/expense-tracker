import supabase from "./supabase";

export async function getPayments() {
  const { data, error } = await supabase.from("SavingPayment").select("*");

  if (error) {
    throw new Error("Payments could not be loaded");
  }

  return data;
}

export async function createNewPayment(newPayment) {
  const { data, error } = await supabase
    .from("SavingPayment")
    .insert([newPayment])
    .select();

  if (error) {
    throw new Error("Payment could not be added");
  }

  return data;
}

export async function deletePayment(id) {
  console.log("Deleting payment with ID:", id);
  const { data, error } = await supabase
    .from("SavingPayment")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Payment could not be deleted");
  }

  return data;
}

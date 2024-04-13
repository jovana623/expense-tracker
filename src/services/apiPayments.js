import supabase from "./supabase";

export async function getPayments() {
  const { data, error } = await supabase.from("Payments").select("*");

  if (error) {
    throw new Error("Payments could not be loaded");
  }

  return data;
}

export async function deletePayment(id) {
  console.log("Deleting payment with ID:", id);
  const { data, error } = await supabase.from("Payments").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Payment could not be deleted");
  }

  return data;
}

export async function createNewPayment({ amount, date, savingId }) {
  const { data, error } = await supabase
    .from("Payments")
    .insert([{ amount: amount, date: date, savingId: savingId }])
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

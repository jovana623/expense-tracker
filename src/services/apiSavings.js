import axios from "axios";
import supabase from "./supabase";

export async function getSavings() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/savings/");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSaving(id) {
  const { data, error } = await supabase
    .from("Savings")
    .select("*,Payments(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Savings could not be loaded");
  }

  return data;
}

export async function createNewSaving({
  name,
  goal,
  target_Date,
  description,
  userId,
}) {
  const { data, error } = await supabase
    .from("Savings")
    .insert([
      {
        name: name,
        amount: 0,
        goal: goal,
        target_Date: target_Date,
        status: "In progress",
        description: description,
        userId: userId,
      },
    ])
    .select();

  if (error) {
    throw new Error("Savings could not be added");
  }

  return data;
}

export async function updateSaving(
  id,
  name,
  amount,
  goal,
  target_Date,
  description,
  userId
) {
  const { data, error } = await supabase
    .from("Savings")
    .update({
      name: name,
      amount: amount,
      goal: goal,
      target_Date: target_Date,
      status: "In progress",
      description: description,
      userId: userId,
    })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Saving could not be updated");
  }

  return data;
}

export async function deleteSaving(id) {
  const { data, error } = await supabase.from("Savings").delete().eq("id", id);

  if (error) {
    throw new Error("Saving amount could not be deleted");
  }

  return data;
}

import supabase from "./supabase";

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function register({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    fullName,
    options: {
      avatar: "",
    },
  });

  console.log(fullName, email, password);

  if (error) throw new Error(error);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUser({ password }) {
  let updateData;
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error);

  return data;
}
